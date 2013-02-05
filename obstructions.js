function place_obstruction(x, y) {
	var is_valid = function(x, y) {
		if ((x > field.field_right - 50) || (x <= 0)) {
			//console.log("what are you doing...");
			return false;
		}
		var row_top = field.field_top;
		var row_bottom = row_top + field.row_heights[field.row_heights.length - 1];
		if ((y >= field.field_top) && (y < field.field_bottom)) {
			//console.log("check1");
			for (var i = 1; i < field.num_rows; i++) {
				//console.log("y: " + y);
				//console.log("row_top: " + row_top);
				//console.log("row_bottom: " + row_bottom);
				if ((y >= row_top) && (y < row_bottom)) { //I suppose, in rare case of tie, bias to upper row
						//console.log("check3");
						var obstruction = new Obstruction(x, (i - 1));						
						field.obstruction_list.push(obstruction);
						field.health_list.push(obstruction.health_bar);
						return true;
				}
				else {
					var next_row_height = field.row_heights[field.row_heights.length - 1 - i];
					row_top = row_bottom;
					row_bottom += next_row_height;
				}
			}
		}
		//console.log("y: " + y);
		//console.log("row_top: " + row_top);
		//console.log("row_bottom: " + row_bottom);
		if ((y >= row_top) && (y < row_bottom)) {
			//console.log("check2");
			var obstruction = new Obstruction(x, (4));						
			field.obstruction_list.push(obstruction);
			field.health_list.push(obstruction.health_bar);
			return true;
		}
		//console.log("bleh");
		return false;
	}
	return is_valid(x,y);
}


function Obstruction(x, row) {
	this.name = String(field.obstruction_count);
	this.x = x;
	this.row = row;
	this.y = field.field_top;
	for (var i = 0; i < this.row; i++) {
		var new_row_val = field.row_heights[field.row_heights.length - 1 - i];
		this.y += new_row_val;
	}
	this.size = field.row_heights[field.row_heights.length - 1 - row];
	this.health = 1;
	this.health_bar = new obstruction_health(this);
	this.update_obstruction = function() {
		ctx.drawImage(field.booksImage, this.x, this.y, this.size / 2, this.size);
	}
}

function destroy_obstruction(obstruction_index) {
	field.obstruction_list.splice(obstruction_index, 1);
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
			var books_text = "Buy books for $" + String(field.books_cost) + "K";
		}
		else {
			ctx.fillStyle = "#ffffff";
			var books_text = "Click to place books";
		}
		ctx.textAlign = 'center';
		ctx.fillText(books_text, canvas.width - field.object_size * 3.5, field.object_size + this.size);
		ctx.fillRect(this.x, this.y, this.size, this.size);
		ctx.strokeRect(this.x, this.y, this.size, this.size);
		ctx.fillStyle = "#FFFFFF";
		ctx.fillText("$" + String(field.books_cost) + "K", this.x + this.size/2, this.y + this.size/2);
	}
}
