function place_obstruction(x, y) {
	var is_valid = function(x, y) {
		if ((x > field.field_right + 50) || (x <= 0)) {
			return false;
		}
		if ((y > field.field_top) && (y < field.field_bottom)) {
			for (var i = 0; i < field.num_rows; i++) {
				var row_top = field.field_top + (i * field.row_height)
				var row_bottom = row_top + field.row_height;
				if ((y >= row_top) && (y < row_bottom)) { //I suppose, in rare case of tie, bias to upper row
						var obstruction = new Obstruction(x, i);
						field.obstructions[String(field.obstruction_count)] = obstruction;
						field.obstruction_count++;
						field.healths[obstruction.health_bar.name] = obstruction.health_bar;
						return true;
				}
			}
		}
		return false;
	}
	is_valid(x,y);
}


function Obstruction(x, row) {
	this.name = String(field.obstruction_count);
	this.x = x;
	this.row = row;
	this.y = field.field_top + (this.row * field.row_height);
	this.size = 50;
	this.health = 1;
	this.health_bar = new obstruction_health(this);
	this.color = "#76766E";
	this.update_obstruction = function() {
		ctx.fillStyle = this.color;
		ctx.fillRect(this.x, this.y, this.size, field.row_height);
		ctx.fillStyle = "#000000";
		ctx.strokeRect(this.x, this.y, this.size, field.row_height);
	}
}

function destroy_obstruction(obstruction) {
	console.log("health num" + obstruction.health_bar.name);
	console.log("obst num" + obstruction.name);
	field.healths[obstruction.health_bar.name] = undefined;
	field.obstructions[obstruction.name] = undefined;
}

function obstruction_spawner(x, y){
	this.x = x;
	this.y = y;
	this.size = 50;
	this.placing_mode = false;
	this.update = function() {
		if (this.placing_mode === false) {
			ctx.fillStyle = "#000000";
			ctx.textAlign = "center";
			ctx.fillText("Click to pick up an obstruction.", 325, 25);
		}
		else {
			ctx.fillStyle = "#ffffff";
			ctx.textAlign = "center";
			ctx.fillText("Now click on the board to place it.", 325, 25);
		}
		ctx.fillRect(this.x, this.y, this.size, this.size);	
		ctx.fillStyle = "#000000";
		ctx.strokeRect(this.x, this.y, this.size, this.size);	
	}
}
