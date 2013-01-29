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
	return is_valid(x,y);
}


function Obstruction(x, row) {
	this.name = String(field.obstruction_count);
	this.x = x;
	this.row = row;
	//ADD 2 TO PROJS FOR THIS ROW
	this.y = field.field_top + (this.row * field.row_height);
	this.quadrant = get_quadrant(this.x, this.y, this.row);
	this.decision_value = 3 //how much a student will try to avoid the obstruction, in terms of how many projectiles it's worth
	//field.num_projectiles_per_row[this.row][this.quadrant] += 2;
	for (var i = 0; i < this.decision_value; i++) {
		increment_quadrants(this.row, this.quadrant);	
	}
	increment_quadrants(this.row, this.quadrant);
	this.size = field.object_size;
	this.health = 1;
	this.health_bar = new obstruction_health(this);
	this.update_obstruction = function() {
		var booksImage = new Image();
		booksImage.src = 'books.png';
		ctx.drawImage(booksImage, this.x, this.y, this.size, field.row_height);
	}
}

function destroy_obstruction(obstruction) {
	console.log("health num" + obstruction.health_bar.name);
	console.log("obst num" + obstruction.name);
	//field.num_projectiles_per_row[this.row] += 2;
	for (var i = 0; i < obstruction.decision_value; i++) {
		decrement_quadrants(obstruction.row, obstruction.quadrant);	
	}
	//REMOVE 2 TO PROJS FOR THIS ROW
	field.healths[obstruction.health_bar.name] = undefined;
	field.obstructions[obstruction.name] = undefined;
}

function obstruction_spawner(x, y){
	this.x = x;
	this.y = y;
	this.size = field.object_size;
	this.placing_mode = false;
	this.update = function() {
		if(field.books_timeout > 0){
			ctx.fillStyle = '#ff0000';
			var books_text = "Not enough money";
			field.books_timeout--;
		}
		else if (this.placing_mode === false) {
			ctx.fillStyle = "#000000";
			var books_text = "Buy books";
		}
		else {
			ctx.fillStyle = "#ffffff";
			var books_text = "Click to place books";
		}
		ctx.textAlign = 'center';
		ctx.fillText(books_text, canvas.width - field.object_size * 3.5, field.object_size + this.size);
		ctx.fillRect(this.x, this.y, this.size, this.size);
		ctx.strokeRect(this.x, this.y, this.size, this.size);
	}
}
