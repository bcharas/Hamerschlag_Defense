//establishes parameters for player's health and health bar and then 
//calls health_bar function to draw it
function player_health() {
	this.max_health = 1;
	this.current_health = 1; //percent health remaining (max is 1, min, before game over, is 0)
	this.width = .75 * canvas.width;
	this.height = .33 * (canvas.height - field.field_bottom)
	this.start_x = .125 * canvas.width;
	this.start_y = field.field_bottom + .33 * (canvas.height - field.field_bottom);
	health_bar(this);
}


//handles the drawing of given health bars, both for the player and (yet unimplemented) for NPC's.
function health_bar(bar) {
	ctx.fillStyle = "#000000"; //black
	ctx.fillRect(bar.start_x, bar.start_y, bar.width, bar.height);
	ctx.fillStyle = "#8C8C8C"; //gray
	var offset_x = .01 * bar.width;
	var offset_y = .2 * bar.height;
	ctx.fillRect(bar.start_x + offset_x, bar.start_y + offset_y, bar.width - (2 * offset_x), bar.height - (2 * offset_y));
	ctx.fillStyle = "#66FF00"; //green
	ctx.fillRect(bar.start_x + offset_x, bar.start_y + offset_y, bar.current_health * (bar.width - (2 * offset_x)), bar.height - (2 * offset_y));
}
