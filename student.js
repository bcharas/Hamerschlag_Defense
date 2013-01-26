//object that establishes paramaters and functions
//for students (the enemy units that approach from the left)
function student(row) {
	this.name = String(field.students_seen);
	field.students_seen += 1;
	this.x = field.field_left;
	this.row = row;
	this.size = 50;
	this.y = field.field_top + (row * field.row_height);
	this.speed = 10;
	//this.direction = "right";
	this.health = 1
	this.health_bar = new student_health_bar(this);
	
	//draws student on the field
	this.draw_student = function () {
		ctx.fillStyle = "#FF0000";
		ctx.fillRect(this.x, this.y, this.size, field.row_height);
		ctx.strokeRect(this.x, this.y, this.size, field.row_height);
	}
  
  //This function takes the number of projectiles in three consecutive 
  //rows and returns the row number with the fewest projectiles
  this.get_row_with_min_projectiles = function (x, y, z, row_param) {
    var largeNumber = 10000;
    if (x === -1) 
      x = largeNumber;
    if (z === -1)
      z = largeNumber;
    if (x < y && x <= z) {
      return (row_param + 1);
    }
    else if (z < y && z <= x) {
      return (row_param);
    }  
    else {       
      return (row_param);
    }
  }

	//updates a student's location on the field
	this.update = function () {
    //This section with "projs_in_rows" controls the student's ability
    //to gauge how many projectile are in a row in order to change
    //rows accordingly.
     var projs_in_row = field.num_projectiles_per_row[this.row];
    if (projs_in_row >= 2) {
      //The value of -1 marks a row that can't be moved to, such 
      //as a row above the top of the board or below the bottom
      var projs_in_row_above = -1;
      if (this.row !== 0) {
        projs_in_row_above = field.num_projectiles_per_row[this.row - 1];
      }
      var projs_in_row_below = -1;
      if (this.row !== (field.num_rows - 1)) {
       projs_in_row_below = field.num_projectiles_per_row[this.row + 1];
      } 
      var new_row = this.get_row_with_min_projectiles(projs_in_row_below, 
                          projs_in_row, projs_in_row_above, this.row);
      this.row = new_row;
      this.y = field.field_top + (this.row * field.row_height);
    }
		if ((this.x + this.size) < field.field_right) {
			
			//NOTE: the following commented-out code is for if we want to have 
			//students be able to move backwards for some reason.
			/*if (this.direction === "right") {
				this.x += this.speed;
			}
			else this.x -= this.speed;*/
			
			this.x += this.speed;
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


//possible bug: it looks like sometimes when the projectile grazes a student corner it doesnt consider it a collision....
//this might be find if we make sprites
//possible cause is that collisions only take place at center of the student?
//NOTE: Watch out for this... but it doesn't always seem to occur... perhaps only for lower left corner?
