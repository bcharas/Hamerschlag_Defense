function Auto_turret(x, y) {
	this.x = x;
	this.y = y;
	Turret(this.x, this.y);
	this.turret_type = "auto turret";
	this.size = 50;
	this.x_center = this.x + (this.size / 2);
	this.y_center = this.y + (this.size / 2);
	this.target = new Target(0, canvas.height/2);
	this.nearest_student = undefined;
	this.nearest_student_distance = undefined;
	this.nearest_student_x_distance = undefined;
	this.nearest_student_y_distance = undefined;
	this.projectile_speed = 10;	
	this.find_nearest_student = function() {
		var min_distance = undefined;
		for (var i = 0; i < field.students_seen; i++){
				if (field.students[String(i)] !== undefined) {
					var this_student = field.students[String(i)];
					//field.students[String(i)].update();
					//var x_distance = Math.abs(this_student.x - this.x_center);
					var x_distance = (this_student.x - this.x_center);
					var y_distance = Math.abs(this_student.y_center - this.y_center);
					var distance = Math.sqrt(Math.pow(x_distance, 2) + Math.pow(y_distance, 2));
					if ((min_distance === undefined) || (distance < min_distance)){
						this.nearest_student_distance = distance;
						this.nearest_student = this_student;
						this.nearest_student_x_distance = x_distance;
						this.nearest_student_y_distance = y_distance;
					}
				}
		}	
	}
	

	//returns necessary launch angle
	this.get_launch_angle = function() { 
		if(this.nearest_student !== undefined) {
			var v = this.nearest_student.speed;
			var h = this.nearest_student.y_center - this.y_center;
			var d = this.nearest_student.x_center - this.x_center;
			var u = this.projectile_speed;
			var non_sqrt_val = Math.pow(h,2) * u * v;
			var val_1 = Math.pow(d, 4) * Math.pow(u, 4);
			var val_2 = Math.pow(d, 2) * Math.pow(h, 2) * Math.pow(u, 4);
			var val_3 = (-1) * Math.pow(d, 2) * Math.pow(h, 2) * Math.pow(u, 2) * Math.pow(v, 2);
			var sqrt_val = Math.sqrt(val_1 + val_2 + val_3);
			var numerator1 = non_sqrt_val - sqrt_val;
			var numerator2 = non_sqrt_val + sqrt_val;
			var denominator = (Math.pow(d,2) * Math.pow(u, 2)) + (Math.pow(h, 2) * Math.pow(u, 2))
			var final_val_1 = numerator1 / denominator;
			var final_val_2 = numerator2 / denominator;
			var launch_angle_1 = Math.asin(final_val_1);
			var launch_angle_2 = Math.asin(final_val_2);
			return launch_angle_1;			
		}
	}
	
	this.update_turret = function() {
		//this.find_nearest_student();
		ctx.fillStyle = "#551A8B"; //purple
		ctx.fillRect(this.x, this.y, this.size, this.size);
		ctx.strokeRect(this.x, this.y, this.size, this.size);
	}
	ctx.fillStyle = "#551A8B"; //purple
	ctx.fillRect(this.x, this.y, this.size, this.size);
	ctx.strokeRect(this.x, this.y, this.size, this.size);
	//console.log("trace");
}


function Auto_projectile(launch_x, launch_y, launch_angle) {
	this.size = 5;
	this.speed = 10;
	this.damage = .25; 
	this.launch_x = launch_x;
	this.launch_y = launch_y;
	this.x_speed = this.speed * Math.sin(launch_angle);
	this.y_speed = this.speed * Math.cos(launch_angle);
	this.x = launch_x;
	this.y = launch_y;
	this.name = String(field.projectiles_fired);
	field.projectiles_fired++;
	
	this.row = Math.floor((this.y - field.field_top) / field.row_height);
	field.num_projectiles_per_row[this.row]++;	    
	//This code checks if a projectile has changed rows. If so, it adjusts 
    //the values of projectiles in each row accordingly 
    this.check_for_row_change = function() {
		var new_row = Math.floor((this.y - field.field_top) / field.row_height);
		if (new_row !== this.row || this.x <= 0) {
		  field.num_projectiles_per_row[this.row]--;
		  
		  if (new_row !== -1 && new_row !== this.row && this.x >= 0)
			field.num_projectiles_per_row[new_row]++;
		}
		this.row = new_row;
	}
	
	

	//This function first calls collision_check to see if a collision has
	//occurred.If it has not, it moves the projectile according to it's speed
	//and then draws it at it's new position. See collision_check() for the
	//case when a collision occurs.
	this.update_projectile = function() {		
		this.check_for_row_change();
		this.collision_check();
		this.x += this.x_speed;
		this.y += this.y_speed;
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
					if ((this.y >= this_student.y) && (this.y <= (this_student.y + field.row_height))){	
							collide(this, this_student);
							break;
					}
				}
			}
		}
	}
}
