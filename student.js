//object that establishes paramaters and functions
//for students (the enemy units that approach from the left)
function student(row) {
	field.students_seen += 1;
	this.x = field.field_left;
	this.row = row;
	this.height = field.row_heights[field.row_heights.length - 1 - row];
	this.size = 1.15 * this.height;
	this.y = field.field_top;
	for (var i = 0; i < this.row; i++) {
		var new_row_val = field.row_heights[field.row_heights.length - 1 - i];
		this.y += new_row_val;
	}
	this.x_center = this.x + (this.size / 2);
	this.y_center = this.y + (this.size / 2);
	this.speed = 10;
	this.health = 1
	this.health_bar = new student_health_bar(this);
	this.just_knocked_back = false;
	this.student_type = Math.floor(Math.random() * 6);
	this.stand_or_walk = 0;
	this.dodge_cooldown = 3;
	
	this.random_student_type = function() {
		var type_num = Math.floor(Math.random() * 4.99);
		return type_num;	
	}
	this.student_type = this.random_student_type();
	this.sprite_x = this.student_type * 120;
	
	//draws student on the field
	this.draw_student = function () {
		ctx.drawImage(field.studentSprites, this.sprite_x, ((this.stand_or_walk % 4) * 120), 100, 120, this.x, this.y - (.15 * this.height), this.size, this.size);
		this.stand_or_walk++;
		ctx.strokeRect(this.x, this.y - (.15 * this.height), 250, this.size);
	}
  
  //This function takes the number of projectiles in three consecutive 
  //rows and returns the row number with the fewest projectiles

	//updates a student's location on the field
	this.update = function () {
		if ((this.x >= field.field_left) && (this.x <= field.field_right - 100)) {
			//console.log(this.dodge_cooldown);
			if (this.dodge_cooldown <= 0) {
				new_row = change_row_using_line_of_sight(this, this.row);
				if (new_row !== this.row) {
					if (can_change_rows(new_row, this)) {
						console.log("dodge!");
						this.dodge_cooldown = 5;
						this.row = new_row;
						this.size = field.student_height_for_a_row(this.row);
						this.draw_student();
					}
				}			
				this.y = field.field_top;
				for (var i = 0; i < this.row; i++) {
					this.y += field.row_heights[field.row_heights.length - 1 - i];
				}
				this.y_center = this.y + (this.size / 2);

			}
			else {
				this.dodge_cooldown -= 1;
				console.log(this.dodge_cooldown);
				//this.x += this.speed;
			}
		}
		if (this.dodge_cooldown !== 5) {
			//console.log("24601");
			this.dodge_cooldown -= 1;
			if ((this.x + this.size) < field.field_right) {
				var should_move = true;
				//this.x += this.speed;
				student_obstruction_collision_check(this);
				if (should_move === true) {
					this.x += this.speed;
					this.x_center = this.x + (this.size / 2);
					this.draw_student();
				}
			}
			else {
				graduate_student(this)		
			}
		}
	}
}
//prevents student from laterally moving onto obstructions... maybe also on to other students?
function can_change_rows(new_row, student) {
	if (new_row < student.row) {
		student.size *= field.ratio_of_row_to_next_row_behind;
	}
	else {
		student.size /= field.ratio_of_row_to_next_row_behind;
	}
	for (var i = 0; i < field.obstruction_list.length; i++) {
		var obstruction = field.obstruction_list[i];
		if (obstruction.row === new_row) {
			if ((student.x >= obstruction.x) && (student.x <= (obstruction.x + (obstruction.size / 2)))) {
				return false;
			}
			if (((student.x + student.size) >= obstruction.x) && ((student.x + student.size) <= (obstruction.x + (obstruction.size / 2)))) {
				return false;
			}		
		}	
	}
	return true;
}

function student_obstruction_collision_check(student) {
	for (var i = 0; i < field.obstruction_list.length; i++){
			var obstruction = field.obstruction_list[i];
			if (student.row === obstruction.row) {
				if (((student.x + student.size) >= obstruction.x) && ((student.x + size) <= (obstruction.x + obstruction.size/2))){
					should_move = false;
					if (student.just_knocked_back === true) {
						student.x = obstruction.x - student.size;
						student.just_knocked_back = false;
						obstruction.health -= .333;
						obstruction.health = Math.max(obstruction.health, 0);
						obstruction.health_bar.current_health -= .333;
						obstruction.health_bar.current_health = Math.max(obstruction.health_bar.current_health, 0);
						if (obstruction.health_bar.current_health <= 0) {
							destroy_obstruction(i);
						}
						break;
					}
					else {
						student.x = obstruction.x - (1.5 * student.size);
						student.just_knocked_back = true;
						break;						
					}
				}
			}
	}
}

//selects a random row, used for choosing a student's spawn row.
function random_row() {
	var rand_num = Math.random();
	var rand_row = rand_num * (field.num_rows - .01);
	return Math.floor(rand_row);
}

function should_graduate(index) {
	var student = field.student_list[index];
	if (student.x >= field.field_right) {
		return true;	
	}
}

//called when a student reaches the far right side of the field.
//despawns that student, and deals damage to player health.
function graduate_student(student) {
	var student_index = field.student_list.indexOf(student);
	var health_bar = student.health_bar;
	graduate_health_bar(health_bar);
	field.student_list.splice(student_index, 1);
	field.students_despawned += 1;
	if (field.students_despawned === max_students_on_this_level) {
		field.ending_sequence = true;
	}
	your_health.current_health -= .2;
	if (your_health.current_health > 0) {
		ctx.fillStyle = "rgba(255, 0, 0, .5)";
		ctx.fillRect(0, 0, canvas.width, canvas.height);
	}
}

function graduate_health_bar(health_bar) {
	console.log("graduated");
	var health_bar_index = field.health_list.indexOf(health_bar);
	field.health_list.splice(health_bar_index, 1);

}

