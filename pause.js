function Button(button, funct, default_position) {
	button.funct = funct;
	button.default_position = default_position;
	button.position = button.default_position;
	button.color = "#000000";
	button.inverted_color = "#ffffff";
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
			}
			else {
				ctx.fillStyle = button.inverted_color;
			}
			ctx.fillRect(button.x, button.y, button.size, button.size);
			ctx.fillStyle = "#000000";
			ctx.strokeRect(button.x, button.y, button.size, button.size);
		}
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