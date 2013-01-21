//THIS IS THE FUNCTION FOR STUDENTS
function student(row) {
	this.name = String(field.students_seen);
	field.students_seen += 1;
	this.x = field.field_left;
	this.row = row;
	this.size = 50;
	this.y = field.field_top + (row * field.row_height);
	this.speed = 10;
	this.direction = "right";
	this.health = 1
	this.draw = function () {
		ctx.fillStyle = "#FF0000";
		ctx.fillRect(this.x, this.y, this.size, field.row_height);
		ctx.strokeRect(this.x, this.y, this.size, field.row_height);
	}
	this.update = function () {
		if ((this.x + this.size) < field.field_right) {
			if (this.direction === "right") {
				this.x += this.speed;
			}
			else this.x -= this.speed;
			this.draw();
		}
		//TODO: MAKE A FUNCTION THAT DAMAGES PLAYER HEALTH AND REMOVES INFO ON REMOVED STUDENT
		//make students a dictionary instead of an array?
		else {
			graduate_student(this)		
		}
	}
}
//END

//PERHAPS ADD THIS TO FIELD, BUT FOR NOW JUST PUT IT WITH STUDENTS
function random_row() {
	var rand_num = Math.random();
	var rand_row = rand_num * 4.99;
	return Math.floor(rand_row);
}

function graduate_student(student) {
	field.students[student.name] = undefined;
	your_health.current_health -= .2;
	ctx.fillStyle = "rgba(255, 0, 0, .5)";
	ctx.fillRect(0, 0, canvas.width, canvas.height);

}
//END