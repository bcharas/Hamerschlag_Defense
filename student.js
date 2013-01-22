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
	
	//draws student on the field
	this.draw_student = function () {
		ctx.fillStyle = "#FF0000";
		ctx.fillRect(this.x, this.y, this.size, field.row_height);
		ctx.strokeRect(this.x, this.y, this.size, field.row_height);
	}
	//updates a student's location on the field
	this.update = function () {
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
	your_health.current_health -= .2;
	ctx.fillStyle = "rgba(255, 0, 0, .5)";
	ctx.fillRect(0, 0, canvas.width, canvas.height);

}


//possible bug: it looks like sometimes when the projectile grazes a student corner it doesnt consider it a collision....
//this might be find if we make sprites
//possible cause is that collisions only take place at center of the student?
//NOTE: Watch out for this... but it doesn't always seem to occur... perhaps only for lower left corner?