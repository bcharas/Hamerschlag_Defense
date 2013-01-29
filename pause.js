/*var field.button_check = function(x, y) {
	if (x >= field.pause_button.x) && (x <= (field.pause_button.x + field.pause_button.size) {
		if (y >= field.pause_button.y) && (y <= (field.pause_button.y + field.pause_button.size)) {
			field.pause_button.press();
		}
	}
		//then check y
		//then call press if both true
}
*/

function Button(button, funct, default_position) {
	button.funct = funct;
	button.default_position = default_position;
	button.position = button.default_position;
	button.color = "#000000";
	button.inverted_color = "#ffffff";
	button.press = function() {
		button.funct();
		button.position = !button.position;
		button.update_button();
	}
	button.update_button = function() {
		if (button.position === button.default_position) {
			ctx.fillStyle = button.color;
		}
		else {
			ctx.fillStyle = button.inverted_color;
		}
		ctx.fillRect(button.x, button.y, button.size, button.size);
		ctx.fillStyle = "#000000";
		ctx.strokeRect(button.x, button.y, button.size, button.size);
	}
}

function pause_button() {
	this.size = field.object_size;
	this.x = canvas.width - field.object_size * 2;
	this.y = canvas.height - field.object_size * 2;
	this.pause = function() {
		if (field.paused === true) {
			field.paused = false;
		}
		else {
			field.paused = true;
		}
	}
	Button(this, this.pause, false);
}

function start_button() {
  this.size = 100;
  this.x = canvas.width / 2;
  this.y = 7 * canvas.height / 8;
  this.funct = function () { 
    next_level(num_students_on_first_level);
  }
  Button(this, this.funct, false);
}
