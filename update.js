//the following functions use splicing for dramatically improved efficiency, memory usage

function update_all_students() {
	for (var i = 0; i < field.student_list.length; i++) {
		var this_student = field.student_list[i];
		if (should_graduate(i)) {
			graduate_student(i);
		}
		else {
			collision_check(i);
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

function update_all_turret_spots(){
	for (var i = 0; i < field.turret_spots.length; i++){
		if (field.turret_spots[i]) {
			field.turret_spots[i].update_turret_spot();
		}
	}
}

function update_all_health() {
	for (var i = 0; i < field.health_list.length; i++) {
		var this_health_bar = field.health_list[i];
		var max_start_x = field.field_right - this_health_bar.width;
		this_health_bar.update_health_bar(i);	
	}	
}

function update_all_images() {
	for (var i = 0; i < field.image_list.length; i++) {
		var this_image = field.image_list[i];
		this_image.draw();	
	}
}





function update_handler() {
	update_all_projectiles();
	player_turret.update_turret();
	player_turret.target.update_target();
	//update_all_turrets();
	update_all_obstructions();	
	update_all_students();
//<<<<<<< HEAD
//=======
	update_all_turrets();
	update_all_turret_spots();
	// Doherty is drawn here to put it on top of projectiles
	for(var i = 0; i < 4; i++){
		ctx.drawImage(dohertyImage, (400 * i) - 320, 670, 704, 231);
	}
//>>>>>>> d7d923849a10a0905be46e4de77bfe544889b432
	update_all_health();
}
