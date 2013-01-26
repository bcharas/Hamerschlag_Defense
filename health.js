//establishes parameters for player's health and health bar and then 
//calls health_bar function to draw it
function player_health() {
	this.max_health = 1;
	this.current_health = 1; //percent health remaining (max is 1, min, before game over, is 0)
	this.width = .75 * canvas.width;
	this.height = .33 * (canvas.height - field.field_bottom)
	this.start_x = .125 * canvas.width;
	this.start_y = field.field_bottom + .33 * (canvas.height - field.field_bottom);
	this.name = "0";
	field.healths_recorded++;
	health_bar(this);
	this.update_health_bar = function() {
		if (this.current_health > 0) {
			health_bar(this);
		}
		else {
			field.game_is_over = true;
			end_game();
		}
	}
}

function student_health_bar(student) {
	this.current_health = student.health;
	this.width = 1.25 * student.size;
	this.height = .1 * student.size;
	this.start_x = student.x - (.25 * student.size);
	this.start_y = student.y - (.15 * student.size);
	field.healths_recorded++;
	this.name = String(field.healths_recorded);
	this.update_health_bar = function() {
	this.start_x = student.x - (.125 * student.size);
	this.start_y = student.y - (.15 * student.size);
	if (this.current_health < 1){
		this.start_x = student.x - (.125 * student.size);
	  this.start_y = student.y - (.15 * student.size);
		if (this.current_health < 1){
			health_bar(this);
		}	
	}
}

function obstruction_health(obstruction) {
	console.log("make health bar");
	this.current_health = obstruction.health;
	this.width = 1.25 * obstruction.size;
	this.height = .1 * obstruction.size;
	this.start_x = obstruction.x - (.25 * obstruction.size);
	this.start_y = obstruction.y - (.15 * obstruction.size);
	this.name = String(field.healths_recorded);
	field.healths_recorded++;
	this.update_health_bar = function() {
		this.start_x = obstruction.x - (.125 * obstruction.size);
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
	var offset_x = .01 * bar.width;
	var offset_y = .2 * bar.height;
	ctx.fillRect(bar.start_x + offset_x, bar.start_y + offset_y, bar.width - (2 * offset_x), bar.height - (2 * offset_y));
	if (bar.current_health >= .66) {
		ctx.fillStyle = "#66FF00"; //green
		ctx.fillRect(bar.start_x + offset_x, bar.start_y + offset_y, bar.current_health * (bar.width - (2 * offset_x)), bar.height - (2 * offset_y));
	}
	else if (bar.current_health >= .33) {
		ctx.fillStyle = "#FFFF00"; //yellow
		ctx.fillRect(bar.start_x + offset_x, bar.start_y + offset_y, bar.current_health * (bar.width - (2 * offset_x)), bar.height - (2 * offset_y));
	}
	else {
		ctx.fillStyle = "#FF0000"; //red
		ctx.fillRect(bar.start_x + offset_x, bar.start_y + offset_y, bar.current_health * (bar.width - (2 * offset_x)), bar.height - (2 * offset_y));
	}
}
