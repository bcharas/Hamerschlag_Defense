function update_all_students() {
	for (var i = 0; i < field.students_seen; i++){
		if (field.students[String(i)] !== undefined) {
			field.students[String(i)].update();
		}
	}

}

function update_all_obstructions() {
	for (var i = 0; i < field.obstruction_count; i++){
		if (field.obstructions[String(i)] !== undefined) {
			field.obstructions[String(i)].update_obstruction();
		}
	}
}		

function update_all_projectiles() {				
	for (var i = 0; i < field.projectiles_fired; i++){
		if (field.projectiles[String(i)] !== undefined) {
			field.projectiles[String(i)].update_projectile();	
		}
	}
}

function update_all_turrets() {
	for (var i = 0; i < field.turret_count; i++){
		if (field.turrets[String(i)] !== undefined) {
			field.turrets[String(i)].update_turret();
		}
	}
}

function update_all_health() {
	for (var i = 0; i < field.healths_recorded; i++){
		if (field.healths[String(i)] !== undefined) {
			field.healths[String(i)].update_health_bar();	
		}
	}
}

function update_handler() {
	update_all_students();
	update_all_obstructions();
	update_all_projectiles();
	update_all_turrets();
	update_all_health();
}