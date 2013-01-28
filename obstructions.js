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
						//var obstruction = new Obstruction(x, i);
						//field.obstructions[String(field.obstruction_count)] = obstruction;
						//field.obstruction_count++;
						var obstruction = new Obstruction(x, i);
						field.obstruction_list.push(obstruction);
						field.health_list.push(obstruction.health_bar);
						//field.healths[obstruction.health_bar.name] = obstruction.health_bar;
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
	//ADD 2 TO PROJS FOR THIS ROW
	this.y = field.field_top + (this.row * field.row_height);
	//this.quadrant = get_quadrant(this.x, this.y, this.row);
	this.decision_value = 3 //how much a student will try to avoid the obstruction, in terms of how many projectiles it's worth
	//field.num_projectiles_per_row[this.row][this.quadrant] += 2;
	/*for (var i = 0; i < this.decision_value; i++) {
		increment_quadrants(this.row, this.quadrant);	
	}
	increment_quadrants(this.row, this.quadrant);*/
	this.size = field.object_size;
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

function destroy_obstruction(obstruction_index) {
	//field.num_projectiles_per_row[this.row] += 2;
	var obstruction = field.obstruction_list[obstruction_index];
	/*for (var i = 0; i < obstruction.decision_value; i++) {
		decrement_quadrants(obstruction.row, obstruction.quadrant);	
	}*/
	//REMOVE 2 TO PROJS FOR THIS ROW
	//field.healths[obstruction.health_bar.name] = undefined;
	//field.obstructions[obstruction.name] = undefined;
	field.obstruction_list.splice(obstruction_index, 1);
}

function obstruction_spawner(x, y){
	this.x = x;
	this.y = y;
	this.size = field.object_size;
	this.placing_mode = false;
	this.update = function() {
		if (this.placing_mode === false) {
			ctx.fillStyle = "#000000";
			ctx.textAlign = "center";
			ctx.fillText("Click to pick up an obstruction.", 150, canvas.height - 15);
		}
		else {
			ctx.fillStyle = "#ffffff";
			ctx.textAlign = "center";
			ctx.fillText("Now click on the board to place it.", 150, canvas.height - 15);
		}
		ctx.fillRect(this.x, this.y, this.size, this.size);	
		ctx.fillStyle = "#000000";
		ctx.strokeRect(this.x, this.y, this.size, this.size);	
	}
}
