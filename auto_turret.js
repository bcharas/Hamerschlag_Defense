function Auto_turret(x, y) {
	this.x = x;
	this.y = y;
	Turret(this.x, this.y);
	this.turret_type = "auto turret";
	this.size = 50;
	//this.name = field.turret_count;
	//field.turret_count++;
	this.x_center = this.x + (this.size / 2);
	this.y_center = this.y + (this.size / 2);
	this.target = new Target(0, canvas.height/2);
	this.nearest_student = undefined;
	this.nearest_student_distance = undefined;
	this.nearest_student_x_distance = undefined;
	this.nearest_student_y_distance = undefined;
	this.projectile_speed = 20;
	//find nearest student
	//set target based on nearest student
	//fire at target
	/*this.decide_shooting_side = function() {
		var middle_x = canvas.width / 2;
		var middle_y = canvas.height / 2;
		var top_side = this.x;
		var left_side = this.y;
		this.bottom = this.x + this.size;
		this.right = this.y + this.size;
		var distance_between = function(point_a_x, point_a_y, point_b_x, point_b_y) {
			var x_change = Math.abs(point_a_x - point_b_x);
			var y_change = Math.abs(point_a_y - point_b_y);
			return Math.sqrt(Math.pow(x_change,2) + Math.pow(y_change,2));		
		}
		var mid_to_top = ...
	*/
	
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
	this.get_launch_angle = function() { //if this doesnt work, try putting turret in bottom middle?
		if(this.nearest_student !== undefined) {
			/*var a = this.nearest_student.speed;
			//var b = Math.abs(this.nearest_student.y_center - this.y_center); //do I need abs. value?
			var b = this.nearest_student.y_center - this.y_center;
			var c = this.x_center - this.nearest_student.x_center; //currently assumes student is to the left.
			var d = this.projectile_speed;
			//console.log("student_speed: " + a + " y_dist: " + b + " x_dist: " + c + " shot_speed: " + d);
			var val_1 = a * Math.pow(b, 2) * d;
			var val_2 = Math.pow(a*b*c*d, 2);
			var val_3 = Math.pow(b, 2) * Math.pow(c, 2) * Math.pow(d,4);
			var val_4 = (-1) * Math.pow(c,4) * Math.pow(d, 4);
			//console.log(val_4);
			var val_5 = Math.pow(b, 2) * Math.pow(d, 2);
			var val_6 = (-1) * Math.pow(c, 2) * Math.pow(d, 2);
			console.log("val 2: " + val_2 + " val 3: " + val_3 + " val 4: " + val_4 + " total: " + (val_2 + val_3 + val_4));
			var sqrt_val = val_2 + val_3 + val_4;
			console.log(sqrt_val);
			sqrt_val = Math.sqrt(Math.abs(sqrt_val));
			console.log(sqrt_val);
			sqrt_val = (-1) * sqrt_val;
			var final_val = val_1 + sqrt_val;
			final_val /= (val_5 + val_6);
			var launch_angle = Math.asin(final_val); //now just need a function to launch it at that angle
			console.log(launch_angle);
			return launch_angle;*/
			
			var v = this.nearest_student.speed;
			//var h = Math.abs(this.nearest_student.y_center - this.y_center);
			var h = this.nearest_student.y_center - this.y_center;
			//var d = x_dist...
			var d = this.nearest_student.x_center - this.x_center;
			/*if (this.nearest_student.x_center <= this.x_center) {
				var direction = "left";
				var d = this.x_center - this.nearest_student.x_center;
				//var d = (-1) * (this.x_center - this.nearest_student.x_center);
			}
			else {
				var direction = "right";
				var d = this.x_center - this.nearest_student.x_center;
				//var d = (-1) * (this.x_center - this.nearest_student.x_center);
			}*/
			
			var u = this.projectile_speed;
			
			/*var test = test_function(10, 10, -970, 418.75);
			console.log(test);*/
			
			var non_sqrt_val = Math.pow(h,2) * u * v;
			
			var val_1 = Math.pow(d, 4) * Math.pow(u, 4);
			var val_2 = Math.pow(d, 2) * Math.pow(h, 2) * Math.pow(u, 4);
			var val_3 = (-1) * Math.pow(d, 2) * Math.pow(h, 2) * Math.pow(u, 2) * Math.pow(v, 2);
			var sqrt_val = Math.sqrt(val_1 + val_2 + val_3);
			//console.log(sqrt_val);
			
			var numerator1 = non_sqrt_val - sqrt_val;
			var numerator2 = non_sqrt_val + sqrt_val;
			//console.log("num_1: " + numerator1 + " num_2: " + numerator2);
			
			var denominator = (Math.pow(d,2) * Math.pow(u, 2)) + (Math.pow(h, 2) * Math.pow(u, 2))
			//console.log("denom: " + denominator);
			
			var final_val_1 = numerator1 / denominator;
			var final_val_2 = numerator2 / denominator;
			//console.log("final 1: " + final_val_1 + " final 2: " + final_val_2);
			
			var launch_angle_1 = Math.asin(final_val_1);
			var launch_angle_2 = Math.asin(final_val_2);
			
			/*console.log("angle 1: " + launch_angle_1);
			console.log(" angle 2: " + launch_angle_2);*/
			
			//var final_val = Math.acos(numerator/denominator)
			//var launch_angle = (-1) * final_val;
			return launch_angle_1;
			
		}

		
		
	
	}
		/*if (this.nearest_student !== undefined) {
			//console.log(this.nearest_student.x);
			//var estimate_time_to_y_match = (this.nearest_student_y_distance / this.projectile_speed) + ; //VERY rough approximation
			var estimate_distance = this.nearest_student_y_distance / Math.cos(45);
			var estimate_time_to_y_match = estimate_distance / this.projectile_speed;
			
			this.estimate_lead = function (desired_lead, depth) {
				if (depth < 500) {
					//var desired_lead = 100;
					var desired_target_x = this.nearest_student.x_center + desired_lead;
					var required_x_to_target = this.x_center - desired_target_x
					//var desired_target_y = this.nearest_student.y_center;
					
					
					//var required_angle = Math.PI - Math.atan2(desired_lead, this.nearest_student_y_distance);
					var required_angle = Math.atan2(required_x_to_target, this.nearest_student_y_distance);
					
					//console.log(required_angle * (180 / Math.PI));
					
					//var distance_to_potential_target = desired_lead / Math.sin(required_angle);
					var distance_to_potential_target = required_x_to_target / Math.sin(required_angle);
					
					
					var time_to_potential_target = distance_to_potential_target / this.projectile_speed;
					var student_x_at_potential_impact_time = this.nearest_student.x + (this.nearest_student.speed * time_to_potential_target);
					if (desired_target_x >= student_x_at_potential_impact_time) {
						if (desired_target_x <= (student_x_at_potential_impact_time + this.nearest_student.size)) {
							return desired_target_x;					
						}
						else {
							return this.estimate_lead(desired_lead - 25);					
						}
					}
					else {
						return this.estimate_lead(desired_lead + 25);
					}			
				}
				else {
					return desired_lead;
				}
			}
			var rough_lead_size = this.nearest_student.speed * estimate_time_to_y_match;
			var guaranteed_lead_size = this.estimate_lead(rough_lead_size);
			guaranteed_lead_size -= 100;
			//var default_lead = 100; //this needs to be tested, find a relatively accurate base.
			var x_target = this.nearest_student.x_center + guaranteed_lead_size;
			//console.log(x_target);
			var y_target = this.nearest_student.y_center;
			this.target = new Target(Math.min(x_target, field.field_right - (this.nearest_student.size / 2)), y_target);
		}
		
	}*/
	
	this.update_turret = function() {
		this.find_nearest_student();
		/*this.target_student();
		this.target.update_target();*/
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
	this.speed = 20;
	this.damage = .25; 
	this.launch_x = launch_x;
	this.launch_y = launch_y;
	this.x_speed = this.speed * Math.sin(launch_angle);
	this.y_speed = this.speed * Math.cos(launch_angle);
	this.x = launch_x;
	this.y = launch_y;
	this.name = String(field.projectiles_fired);
	field.projectiles_fired++;
	/*this.x_distance = Math.abs(this.launch_x - this.target_x);
	this.y_distance = Math.abs(this.launch_y - this.target_y);
	this.launch_angle = Math.atan2(this.y_distance, this.x_distance);
	this.x_speed = this.speed * Math.cos(this.launch_angle);
	this.y_speed = this.speed * Math.sin(this.launch_angle);*/
	
	//This function first calls collision_check to see if a collision has
	//occurred.If it has not, it moves the projectile according to it's speed
	//and then draws it at it's new position. See collision_check() for the
	//case when a collision occurs.
	this.update_projectile = function() {		
		//console.log("trace");
		this.collision_check();
		this.x += this.x_speed;
		this.y += this.y_speed;
		//console.log(String(this.x) + ", " + String(this.y));
		
		/*if (this.launch_y <= this.target_y) {
			if  (this.launch_x <= this.target_x) {
				this.x += this.x_speed;
				this.y += this.y_speed;
			}
			else {
				this.x -= this.x_speed;
				this.y += this.y_speed;
			
			}
		}
		else {
			if  (this.launch_x <= this.target_x) {
				this.x += this.x_speed;
				this.y -= this.y_speed;
			}
			else {
				this.x -= this.x_speed;
				this.y -= this.y_speed;
			
			}
				
		}*/
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
					/*if (this.launch_y <= this.target_y) {
						if ((this.y >= this_student.y) && (this.y <= (this_student.y + field.row_height))){	
							collide(this, this_student);
							break;
						}
					}
					else if ((this.y >= this_student.y) && (this.y <= (this_student.y + field.row_height))) {
						collide(this, this_student);
						break;
					}*/
				}
			}
		}
	}
}
