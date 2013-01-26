function Auto_turret(x, y) {
	this.x = x;
	this.y = y;
	Turret(this.x, this.y);
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
	this.projectile_speed = 10;
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
					var y_distance = Math.abs(this_student.y - this.y_center);
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
	
	this.target_student = function() {
		if (this.nearest_student !== undefined) {
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
		
	}
	
	this.update_turret = function() {
		this.find_nearest_student();
		this.target_student();
		this.target.update_target();
		ctx.fillStyle = "#551A8B"; //purple
		ctx.fillRect(this.x, this.y, this.size, this.size);
		ctx.strokeRect(this.x, this.y, this.size, this.size);
	}
	ctx.fillStyle = "#551A8B"; //purple
	ctx.fillRect(this.x, this.y, this.size, this.size);
	ctx.strokeRect(this.x, this.y, this.size, this.size);
	//console.log("trace");
}
