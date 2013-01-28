function Button(button, funct, default_position) {
	button.funct = funct;
	button.default_position = default_position;
	button.position = button.default_position;
	button.color = "#00FFBB";
	button.inverted_color = "#ff0055";//TODO: Add color inverter function
	button.press = function() {
		if (field.game_is_over === false) {
			button.funct();
			button.position = !button.position;
			button.update_button();
		}
	}
	button.update_button = function() {
		if (field.game_is_over === false) {
			if (button.position === button.default_position) {
				ctx.fillStyle = button.color;
				ctx.fillRect(button.x, button.y, button.size, button.size);
			}
			else {
				ctx.fillStyle = button.inverted_color;
				ctx.fillRect(button.x, button.y, button.size, button.size);
			}
			//console.log("here!");
			ctx.fillStyle = "#000000";
			ctx.strokeRect(button.x, button.y, button.size, button.size);
		}
	}
}

function pause_button() {
	this.size = field.object_size;
	this.x = (field.field_right + ((canvas.width - field.field_right) / 2)) - (this.size / 2);
	this.y = .9 * canvas.height;
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