//adds event listener for mouse presses
canvas.addEventListener('mousedown', onMouseDown, false);

//called whenever a mouse push is detected, and calls a function to create
// a new projectile target for the player at the location of the click
function onMouseDown(event) {
    var x = event.pageX - canvas.offsetLeft;
    var y = event.pageY - canvas.offsetTop;
	field.button_check(x, y);
	if ((field.game_is_over === false) && (field.paused === false)) {
		player_turret.target = new Target(x, y);
	}
	
}


//object that establishes paramaters and functions
//for a turret object (origin points for projectiles
function Turret(x, y) {
	this.size = 50;
	this.x = x;
	this.y = y;
	this.x_center = this.x + this.size / 2;
	this.y_center = this.y + this.size / 2;
	this.time_between_shots_fired = 2000;
	this.target = new Target(0, canvas.height / 2);
	this.name = String(field.turret_count);
	field.turret_count++;
	
	//handles the drawing of turrets. Supports moving turrets, 
	//though there currently are none.
	this.update_turret = function() {
		ctx.fillStyle = "#551A8B"; //purple
		ctx.fillRect(this.x, this.y, this.size, this.size);
		ctx.strokeRect(this.x, this.y, this.size, this.size);
	}
	
}

//establishes parameters and functions for each projectile object fired by turrets
function Projectile(launch_x, launch_y, target_x, target_y) {
	//console.log("trace");
	this.size = 5;
	this.speed = 10;
	this.damage = .25; 
	//this.damage = 1;
	this.launch_x = launch_x;
	this.launch_y = launch_y;
	this.target_x = target_x;
	this.target_y = target_y;
	this.x = launch_x;
	this.y = launch_y;
	this.name = String(field.projectiles_fired);
	field.projectiles_fired++;
	this.x_distance = Math.abs(this.launch_x - this.target_x);
	this.y_distance = Math.abs(this.launch_y - this.target_y);
	this.launch_angle = Math.atan2(this.y_distance, this.x_distance);
	this.x_speed = this.speed * Math.cos(this.launch_angle);
	this.y_speed = this.speed * Math.sin(this.launch_angle);
	/*this.new_x = this.x - this.x_speed;
	this.down_y = this.y + this.y_speed;
	this.up_y = this.y - this.y_speed;*/
	
	//This function first calls collision_check to see if a collision has
	//occurred.If it has not, it moves the projectile according to it's speed
	//and then draws it at it's new position. See collision_check() for the
	//case when a collision occurs.
	this.update_projectile = function() {		
		this.collision_check();
		if (this.launch_y <= this.target_y) {
			if  (this.launch_x <= this.target_x) {
				//this.collision_check();
				this.x += this.x_speed;
				this.y += this.y_speed;
			}
			else {
				//this.collision_check();
				this.x -= this.x_speed;
				this.y += this.y_speed;
			
			}
		}
		else {
			if  (this.launch_x <= this.target_x) {
				//this.collision_check();
				this.x += this.x_speed;
				this.y -= this.y_speed;
			}
			else {
				//this.collision_check();
				this.x -= this.x_speed;
				this.y -= this.y_speed;
			
			}
				
		}
		ctx.fillStyle = "#551A8B"; //purple
		ctx.fillRect(this.x, this.y, this.size, this.size);
		ctx.strokeRect(this.x, this.y, this.size, this.size);
	
	}
	
	//this function, called whenever a projectile moves, checks if the
	//projectile should collide (i.e. they share the same space) with a
	//student, and if it should, calls the collide function.
	this.collision_check = function() {
		for (var i = 0; i < field.students_seen; i++) {
			if (field.students[String(i)] !== undefined) {
				var this_student = field.students[String(i)];
				if ((this.x >= this_student.x) && (this.x <= (this_student.x + this_student.size))){	
					if (this.launch_y <= this.target_y) {
						if ((this.y >= this_student.y) && (this.y <= (this_student.y + field.row_height))){	
							collide(this, this_student);
							break;
						}
					}
					//else if ((this.y >= this_student.y) && (this.y <= (this_student.y + this_student.size))) {
					else if ((this.y >= this_student.y) && (this.y <= (this_student.y + field.row_height))) {
						collide(this, this_student);
						break;
					}
				}
			}
		}
	}

}


//object that establishes paramaters and functions
//for a target object (each projectile is assigned a target that it is fired towards)
function Target(x, y) {
	this.size = 5;
	this.x = x;
	this.y = y;
	ctx.fillStyle = "#000000";
	ctx.fillRect(x, y, this.size, this.size);
	this.update_target = function() {
		ctx.fillStyle = "#000000";
		ctx.fillRect(this.x, this.y, this.size, this.size);
	}
}

//In the collision case, this function despawns the colliding projectile, and
//reduces the colliding student's health according to the damage value of the
//projectile. If the colliding student's health drops to or below zero, the
//colliding student is also despawned.
function collide(projectile, student) {
	field.projectiles[projectile.name] = undefined;
	student.health_bar.current_health -= projectile.damage;
	student.health -= projectile.damage;
	if (student.health_bar.current_health <= 0) {
		field.students[student.name] = undefined;
		if (student.health_bar !== undefined) {
			field.healths[student.health_bar.name] = undefined;
		}
	}
}
