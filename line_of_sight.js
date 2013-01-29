function change_row_using_line_of_sight(student, row) {
	//console.log("checking..");
	var view_distance = 500;
	var start_x = student.x + student.size;
	var end_x = start_x + view_distance;
	var how_dangerous_is_this_row = 0;
	var largeNumber = 999999;
	var how_dangerous_is_above_row = largeNumber;
	var how_dangerous_is_below_row = largeNumber;
	var danger_value_of_projectiles = 1;
	var danger_value_of_obstructions = 2;
	for (var i = 0; i < field.projectile_list.length; i++) {
		var projectile = field.projectile_list[i];
		if (projectile.row === row) {
			if ((projectile.x >= start_x) && (projectile.x <= end_x)) {
				how_dangerous_is_this_row += danger_value_of_projectiles;			
			}
		}
		else if ((projectile.row === (row + 1)) && (row !== (field.num_rows - 1))){
			if (how_dangerous_is_below_row === largeNumber) {
				how_dangerous_is_below_row = 0;
			}
		}
		else if ((projectile.x >= start_x) && (projectile.x <= end_x)) {
				how_dangerous_is_below_row += danger_value_of_projectiles;			
			
		}
		else if ((projectile.row === (row - 1)) && (row !== (0))){
			if (how_dangerous_is_above_row === largeNumber) {
				how_dangerous_is_above_row = 0;
			}
		}
		else if ((projectile.x >= start_x) && (projectile.x <= end_x)) {
				how_dangerous_is_above_row += danger_value_of_projectiles;			
			}
		}
	
	for (var i = 0; i < field.obstruction_list.length; i++) {
		var obstruction = field.obstruction_list[i];
		if (obstruction.row === row) {
			if ((obstruction.x >= start_x) && (obstruction.x <= end_x)) {
				how_dangerous_is_this_row += danger_value_of_obstructions;			
			}
		}
		if ((obstruction.row === (row + 1)) && (row !== (field.num_rows - 1))){
			if (how_dangerous_is_below_row === largeNumber) {
				how_dangerous_is_below_row = 0;
				//console.log("I'd be surprised if it got here.");
			}
			if ((obstruction.x >= start_x) && (obstruction.x <= end_x)) {
				how_dangerous_is_below_row += danger_value_of_obstructions;			
			}
		}
		if ((obstruction.row === (row - 1)) && (row !== (0))){
			if (how_dangerous_is_above_row === largeNumber) {
				how_dangerous_is_above_row = 0;
			}
			if ((obstruction.x >= start_x) && (obstruction.x <= end_x)) {
				how_dangerous_is_above_row += danger_value_of_obstructions;			
			}
		}	
	}
	var result = safest_row_option(how_dangerous_is_above_row, how_dangerous_is_this_row, how_dangerous_is_below_row, row);
	//print in like a week
	return result;
}
	
function safest_row_option(above_row_val, row_val, below_row_val, row) {
	//console.log("trace");
	if (above_row_val >= row_val) {
		if (below_row_val >= row_val) {
			return row;
		}
		else {
			return (row + 1);
		}
	}
	else {
		if (below_row_val >= row_val) {
			return (row - 1);
		}
		else {
			if (below_row_val <= above_row_val) {
				return (row + 1);
			}
			else {
				return (row - 1);
			}
		}
	}
	


}
	
	





