//object that establishes paramaters and functions
//for students (the enemy units that approach from the left)
function student(row) {
	field.students_seen += 1;
	this.x = field.field_left;
	this.row = row;
	this.size = 120; //field.object_size;
	this.y = field.field_top + (row * field.row_height);
	this.x_center = this.x + (this.size / 2);
	this.y_center = this.y + (field.row_height / 2);
	this.speed = 10;
	this.health = 1
	this.health_bar = new student_health_bar(this);
	this.just_knocked_back = false;
	this.stand_or_walk = 0;
	this.dodge_cooldown = 5;
	
	this.random_student_type = function() {
		var type_num = Math.floor(Math.random() * 4.99);
		return type_num;	
	}
	this.student_type = this.random_student_type();
	this.sprite_x = this.student_type * 120;
	
	//draws student on the field
	this.draw_student = function () {
		var studentSprites = new Image();
		studentSprites.src = "spriteSheet.png";
		ctx.drawImage(studentSprites, this.sprite_x, ((this.stand_or_walk % 4) * 120), 100, 120, this.x, this.y, field.row_height, field.row_height);
		this.stand_or_walk++;
	}
  
  //This function takes the number of projectiles in three consecutive 
  //rows and returns the row number with the fewest projectiles

	//updates a student's location on the field
	this.update = function () {
		if ((this.x >= field.field_left + 50) && (this.x <= field.field_right - 100)) {
			//this.row = change_row_using_line_of_sight(this, this.row);
			if (this.dodge_cooldown === 0) {
				new_row = change_row_using_line_of_sight(this, this.row);
				if (can_change_rows(new_row, this)) {
					if (new_row !== this.row) {
						this.dodge_cooldown = 5;
						this.row = new_row;
					}
				}			
				this.y = field.field_top + (this.row * field.row_height);
				this.y_center = this.y + (field.row_height / 2);
			}
			else {
				this.dodge_cooldown -= 1;
			}
		}
		if ((this.x + this.size) < field.field_right) {
			var should_move = true;
			student_obstruction_collision_check(this);
			if (should_move === true)
				this.x += this.speed;
				this.x_center = this.x + (this.size / 2);
				this.draw_student();
		}
		else {
			graduate_student(this)		
		}
	}
}
//prevents student from laterally moving onto obstructions... maybe also on to other students?
function can_change_rows(new_row, student) {
	var student_next_x_position_left = student.x + student.speed;
	var student_next_x_position_right = student.x + student.speed + student.size;
	for (var i = 0; i < field.obstruction_list.length; i++) {
		var obstruction = field.obstruction_list[i];
		if (obstruction.row === new_row) {
			if ((student_next_x_position_left >= obstruction.x) && (student_next_x_position_left <= (obstruction.x + obstruction.size))) {
				return false;
			}
			if ((student_next_x_position_right >= obstruction.x) && (student_next_x_position_right <= (obstruction.x + obstruction.size))) {
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
				if (((student.x + student.size) >= obstruction.x) && ((student.x + size) <= (obstruction.x + obstruction.size))){
					should_move = false;
					if (student.just_knocked_back === true) {
						student.x = obstruction.x - student.size;
						student.draw_student();
						student.just_knocked_back = false;
						obstruction.health -= .333;
						obstruction.health_bar.current_health -= .333;
						if (obstruction.health_bar.current_health <= 0) {
							destroy_obstruction(i);
						}
						break;
					}
					else {
						student.x = obstruction.x - (1.5 * student.size);
						student.draw_student();
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
	
	//var student = field.student_list[index];
	//var health = student.health_bar;
	//has_graduated = true;
	//field.student_list.splice(index, 1); //should remove current student's info from tracking
	//student.health_bar.graduate(student_index);
	
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
