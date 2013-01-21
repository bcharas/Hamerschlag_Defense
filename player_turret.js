//function that places/draws turret
//function that handles projectiles
//function that handles placing "targets"


function onMouseDown(event) {
    var x = event.pageX - canvas.offsetLeft;  // do not use event.x, it's not cross-browser!!!
    var y = event.pageY - canvas.offsetTop;
	player_turret.target = new Target(x, y);
    //ctx.fillStyle = "rgba(0,128,128,0.5)";
    //ctx.fillRect(x-25, y-25, 50, 50);
}

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

function Turret(x, y) {
	this.size = 50;
	this.x = x;
	this.y = y;
	this.time_to_fire = 2000;
	this.target = new Target(0, canvas.height / 2);
	this.update_turret = function() {
		ctx.fillStyle = "#551A8B"; //purple
		ctx.fillRect(this.x, this.y, this.size, this.size);
		ctx.strokeRect(this.x, this.y, this.size, this.size);
	}
	
}

function Projectile(launch_x, launch_y, target_x, target_y) {
	this.size = 5;
	this.speed = 10;
	this.damage = 1; 
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
	this.new_x = this.x - this.x_speed;
	this.down_y = this.y + this.y_speed;
	this.up_y = this.y - this.y_speed;
	
	this.collision_check = function() {
		for (var i = 0; i < field.students_seen; i++) {
			if (field.students[String(i)] !== undefined) {
				var this_student = field.students[String(i)];
				console.log("other test");
				if ((this.x >= this_student.x) && (this.x <= (this_student.x + this_student.size))){	
					console.log("test");
					if (this.launch_y <= this.target_y) {
						console.log("down_y");
						if ((this.y >= this_student.y) && (this.y <= (this_student.y + this_student.size))){	
							console.log("should have collided...");
							collide(this, this_student);
							break;
						}
					
					}
					else if ((this.y >= this_student.y) && (this.y <= (this_student.y + this_student.size))) {
						console.log("should have collided...");
						collide(this, this_student);
						break;
					}
				}
			}
		}
	}
	this.update_projectile = function() {		
		if (this.launch_y <= this.target_y) {
			this.collision_check();
			this.x -= this.x_speed;
			this.y += this.y_speed;
		}
		else {
			this.collision_check();
			this.x -= this.x_speed;
			this.y -= this.y_speed;
				
		}
		ctx.fillStyle = "#551A8B"; //purple
		ctx.fillRect(this.x, this.y, this.size, this.size);
		ctx.strokeRect(this.x, this.y, this.size, this.size);
	
	}
}

function collide(projectile, student) {
	field.projectiles[projectile.name] = undefined;
	student.health -= projectile.damage;
	if (student.health <= 0) {
		field.students[student.name] = undefined;
	}
}

canvas.addEventListener('mousedown', onMouseDown, false);
