function step() {
//draw background, then ground. then update items, then draw items
	make_grid();
	//for (var i = 0; i < field.students.length; i++) {
	for (var i = 0; i < field.students_seen; i++){
		if (field.students[String(i)] !== undefined) {
			field.students[String(i)].update();	//TODO: needs to check if a student exists at that index
		}
	}
	for (var i = 0; i < health.length; i++) {
		health_bar(health[i]);	
	}
	for (var i = 0; i < field.projectiles_fired; i++){
		if (field.projectiles[String(i)] !== undefined) {
			field.projectiles[String(i)].update_projectile();	
			//console.log(String(i));
		}
	}
	ctx.fillStyle = "#000000";
	ctx.font = "20px Arial";
	ctx.textAlign = "center";
	var spawn_time = String(field.time_to_student / 1000);
	var spawn_msg = "Time to next spawn: ";
	ctx.fillText(spawn_msg.concat(spawn_time), canvas.width / 2, field.field_top / 2);
	player_turret.update_turret();
	player_turret.target.update_target();
}

//END

var timerDelay = 100;
var field = new Grid();
var player_turret = new Turret(canvas.width - 50, (canvas.height - 50)/2);
make_grid();
var first_student = new student(random_row());
field.students["0"] = first_student;
//field.students.push(ben);
var health = new Array();
your_health = new player_health();
health.push(your_health);
//END
setInterval(step, timerDelay);