//object that establishes paramaters and functions
//for students (the enemy units that approach from the left)
function student(row) {
	this.name = String(field.students_seen);
	field.students_seen += 1;
	this.x = field.field_left;
	this.row = row;
	this.size = 120; //field.object_size;
	this.y = field.field_top + (row * field.row_height);
	this.quadrant = get_quadrant(this.x, this.y, this.row);
	this.x_center = this.x + (this.size / 2);
	this.y_center = this.y + (field.row_height / 2);
	this.speed = 10;
	//this.direction = "right";
	this.health = 1
	this.health_bar = new student_health_bar(this);
	this.just_knocked_back = false;
	this.stand_or_walk = 0;
	
	this.random_student_type = function() {
		var type_num = Math.floor(Math.random() * 4.99);
		return type_num;	
	}
	this.student_type = this.random_student_type();
	this.sprite_x = this.student_type * 120;
	//this.space_between_sprites = 60;
	//draws student on the field
	this.draw_student = function () {
		/*ctx.fillStyle = "#FF0000";
		ctx.fillRect(this.x, this.y, this.size, field.row_height);
		ctx.strokeRect(this.x, this.y, this.size, field.row_height);*/
		var studentSprites = new Image();
		studentSprites.src = "spriteSheet.png";
		ctx.drawImage(studentSprites, this.sprite_x, ((this.stand_or_walk % 4) * 120), 100, 120, this.x, this.y, field.row_height, field.row_height);
		this.stand_or_walk++;
	}
  
  //This function takes the number of projectiles in three consecutive 
  //rows and returns the row number with the fewest projectiles
  this.get_row_with_min_projectiles = function (projs_in_row_below, 
                          projs_in_row, projs_in_row_above, row_num) {
    var largeNumber = 10000;
    if (projs_in_row_below === -1) {
		projs_in_row_below = largeNumber;
	}
    if (projs_in_row_above === -1) {
		projs_in_row_above = largeNumber;
	}
    if (projs_in_row_below < projs_in_row && projs_in_row_below <= projs_in_row_above) {
		console.log("dodged.");
		return (row_num + 1);
    }
    else if (projs_in_row_above < projs_in_row && projs_in_row_above <= projs_in_row_below) {
		console.log("dodged.");
		return (row_num - 1);
    }  
    else {       
		return (row_num);
    }
  }

	//updates a student's location on the field
	this.update = function () {
    //This section with "projs_in_rows" controls the student's ability
    //to gauge how many projectile are in a row in order to change
    //rows accordingly.
		this.quadrant = get_quadrant(this.x, this.y, this.row);
		var projs_in_row = field.num_projectiles_per_row[this.row][this.quadrant];
		if ((projs_in_row >= 2) && (this.x >= 0)){
			//The value of -1 marks a row that can't be moved to, such 
			//as a row above the top of the board or below the bottom
			var projs_in_row_above = -1;
			if (this.row !== 0) {
				var quadrant_of_above_row = get_quadrant(this.x, this.y - field.row_height, this.row - 1);
				projs_in_row_above = field.num_projectiles_per_row[this.row - 1][quadrant_of_above_row];
			
			}
			var projs_in_row_below = -1;
			if (this.row !== (field.num_rows - 1)) {
				var quadrant_of_below_row = get_quadrant(this.x, this.y + field.row_height, this.row + 1);
				projs_in_row_below = field.num_projectiles_per_row[this.row + 1][quadrant_of_below_row];
			} 
			var new_row = this.get_row_with_min_projectiles(projs_in_row_below, 
							  projs_in_row, projs_in_row_above, this.row);
			this.row = new_row;
			this.y = field.field_top + (this.row * field.row_height);
			this.y_center = this.y + (field.row_height / 2);
			this.quadrant = get_quadrant(this.x, this.y, this.row);
			
		}
		if ((this.x + this.size) < field.field_right) {
			var should_move = true;
			
			//NOTE: the following commented-out code is for if we want to have 
			//students be able to move backwards for some reason.
			/*if (this.direction === "right") {
				this.x += this.speed;
			}
			else this.x -= this.speed;*/
			
			for (var i = 0; i < field.obstruction_count; i++){
				if (field.obstructions[String(i)] !== undefined) {
					var obstruction = field.obstructions[String(i)];
					if (this.y === obstruction.y) {
						if (((this.x + this.size) >= obstruction.x) && ((this.x + size) <= (obstruction.x + obstruction.size))){
							should_move = false;
							if (this.just_knocked_back === true) {
								this.x = obstruction.x - this.size;
								this.draw_student();
								this.just_knocked_back = false;
								obstruction.health -= .333;
								obstruction.health_bar.current_health -= .333;
								if (obstruction.health_bar.current_health <= 0) {
									console.log("destroyed");
									destroy_obstruction(obstruction);
								}
								break;
							}
							else {
								this.x = obstruction.x - (1.5 * this.size);
								this.draw_student();
								this.just_knocked_back = true;
								break;						
							}
						}
					}
				}
			}
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

//selects a random row, used for choosing a student's spawn row.
function random_row() {
	var rand_num = Math.random();
	var rand_row = rand_num * (field.num_rows - .01);
	return Math.floor(rand_row);
}

//called when a student reaches the far right side of the field.
//despawns that student, and deals damage to player health.
function graduate_student(student) {
	field.students[student.name] = undefined;
	if (student.health_bar !== undefined) {
		field.healths[student.health_bar.name] = undefined;	
	}
	your_health.current_health -= .2;
	if (your_health.current_health > 0) {
		ctx.fillStyle = "rgba(255, 0, 0, .5)";
		ctx.fillRect(0, 0, canvas.width, canvas.height);
	}

}

