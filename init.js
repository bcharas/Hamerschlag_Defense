
//This is the function that is called every interval, and is the function that
//ensures all updates are occuring as necessary.
//Once the round has started, all functions are 
//called from either here or an event listener.
function step() {
	make_field();
	spawn_handler();
	for (var i = 0; i < field.students_seen; i++){
		if (field.students[String(i)] !== undefined) {
			field.students[String(i)].update();
		}
	}
	/*for (var i = 0; i < health.length; i++) {
		health_bar(health[i]);	
	}*/
	for (var i = 0; i < field.healths_recorded; i++){
		//console.log("trace");
		//console.log(field.healths[String(i)]);
		if (field.healths[String(i)] !== undefined) {
			field.healths[String(i)].update_health_bar();	
		}
	}
	for (var i = 0; i < field.projectiles_fired; i++){
		if (field.projectiles[String(i)] !== undefined) {
			field.projectiles[String(i)].update_projectile();	
		}
	}
	ctx.fillStyle = "#000000";
	ctx.font = "20px Arial";
	ctx.textAlign = "center";
	var spawn_time = String(field.time_until_student_spawn/ 1000);
	var spawn_msg = "Time to next spawn: ";
	ctx.fillText(spawn_msg.concat(spawn_time), canvas.width / 2, field.field_top / 2);
	player_turret.update_turret();
	player_turret.target.update_target();
	//console.log("traceC");
}

//TODO: MAKE THIS A FUNCTION

//This function sets up a round by establishing parameters and calling
//necessary set-up functions (e.g. making player turret object).
//Once it completes set-up, further updates are handled by step
var timerDelay = 100;
var field = new Grid();
var player_turret = new Turret(canvas.width - 50, (canvas.height - 50)/2);
make_field();
spawn_handler();
var first_student = new student(2);
field.students["0"] = first_student;
//var health = new Array();
//var health = new Object();
your_health = new player_health();
field.healths["0"] = your_health;
field.healths_recorded++;
field.healths["1"] = first_student.health_bar;
field.healths_recorded++;
//console.log("trace");
setInterval(step, timerDelay);
