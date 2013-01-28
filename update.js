//the following functions use splicing for dramatically improved efficiency, memory usage

function update_all_students() {
	for (var i = 0; i < field.student_list.length; i++) {
		var this_student = field.student_list[i];
		if (should_graduate(i)) {
			graduate_student(i);
		}
		else {
			collision_check(i);
			//move();
			this_student.update();	
		}
	}
}

function update_all_obstructions() {
	for (var i = 0; i < field.obstruction_list.length; i++) {
		var obstruction = field.obstruction_list[i];
		obstruction.update_obstruction();	
	}
}

function update_all_projectiles() {
	for (var i = 0; i < field.projectile_list.length; i++) {
		var projectile = field.projectile_list[i];
		projectile.update_projectile(i);		
	}
}

function update_all_turrets() {
	for (var i = 0; i < field.turret_list.length; i++) {
		var turret = field.turret_list[i];
		turret.update_turret();	
	}
}

function update_all_health() {
	for (var i = 0; i < field.health_list.length; i++) {
		var this_health_bar = field.health_list[i];
		/*if (this_health_bar.has_graduated === true) {
			field.health_list.splice(i, 1);
		}*/
		var max_start_x = field.field_right - this_health_bar.width;
		/*if (this_health_bar.start_x >= max_start_x) {
			console.log("traceB");
			field.health_list.splice(i, 1);
		}*/
		this_health_bar.update_health_bar(i);	
	}	
}





function update_handler() {
	update_all_obstructions();
	update_all_projectiles();
	update_all_students();
	update_all_turrets();
	player_turret.update_turret();
	player_turret.target.update_target();
	field.turretImage.src = "hamerschlag.png";
	ctx.drawImage(field.turretImage, 1190, 210);
	update_all_health();
}
