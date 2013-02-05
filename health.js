//establishes parameters for player's health and health bar and then 
//calls health_bar function to draw it
function player_health() {
	this.max_health = 1;
	this.current_health = 1; //percent health remaining (max is 1, min, before game over, is 0)
	this.width = .75 * canvas.width;
	this.height = field.object_size;
	this.start_x = .125 * canvas.width;
	this.start_y = canvas.height - field.object_size * 2;
	this.name = "0";
	field.healths_recorded++;
	health_bar(this);
	this.update_health_bar = function() {
		if (this.current_health > 0) {
			health_bar(this);
		}
		else {
			field.game_is_over = true;
			console.log("end step");
			end_game();
		}
	}
	field.health_list.push(this);
}

function student_health_bar(student) {
	this.student = student;
	this.current_health = student.health;
	this.width = 1.25 * student.size;
	this.height = .1 * student.size;
	this.start_x = student.x - (.25 * student.size);
	this.start_y = student.y - (.15 * student.size);
	field.healths_recorded++;
	this.name = String(field.healths_recorded);
	this.has_graduated = false;
	this.graduate = function (student_index){
		var health_index = field.health_list.indexOf(this);
		field.health_list.splice(health_index, 1);
		field.student_list.splice(student_index, 1);	
	}
	this.update_health_bar = function(health_index) {
		this.start_x = this.student.x - (.125 * this.student.size);
		this.start_y = this.student.y - (.15 * this.student.size);
		if (this.current_health <= 0){
			field.health_list.splice(health_index, 1);
		}
		else if (this.current_health < 1){
			health_bar(this);
		}
	}
	field.health_list.push(this);
}

function obstruction_health(obstruction) {
	this.current_health = obstruction.health;
	this.width = .75 * obstruction.size;
	this.height = .1 * obstruction.size;
	this.start_x = obstruction.x - (.125 * obstruction.size);
	this.start_y = obstruction.y - (.15 * obstruction.size);
	this.name = String(field.healths_recorded);
	field.healths_recorded++;
	this.update_health_bar = function(index) {
		this.start_x = obstruction.x - (.125 * obstruction.size);
		if (this.current_health <= 0) {
			field.health_list.splice(index, 1);
		}
		if (this.current_health < 1){
			health_bar(this);
		}	
	}
		


}

//handles the drawing of given health bars, both for the player and (yet unimplemented) for NPC's.
function health_bar(bar) {
	ctx.fillStyle = "#000000"; //black
	ctx.fillRect(bar.start_x, bar.start_y, bar.width, bar.height);
	ctx.fillStyle = "#8C8C8C"; //gray
	var offset_x = .005 * bar.width;
	var offset_y = .1 * bar.height;
	ctx.fillRect(bar.start_x + offset_x, bar.start_y + offset_y, bar.width - (2 * offset_x), bar.height - (2 * offset_y));
	if (bar.current_health >= .66) {
		ctx.fillStyle = "#66FF00"; //green
	}
	else if (bar.current_health >= .33) {
		ctx.fillStyle = "#FFFF00"; //yellow
	}
	else {
		ctx.fillStyle = "#FF0000"; //red
	}
	ctx.fillRect(bar.start_x + offset_x, bar.start_y + offset_y, bar.current_health * (bar.width - (2 * offset_x)), bar.height - (2 * offset_y));
}
