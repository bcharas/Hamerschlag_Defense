
//This is the function that is called every interval, and is the function that
//ensures all updates are occuring as necessary.
//Once the round has started, all functions are 
//called from either here or an event listener.
function step() {
	//canvas.clearRect(0, 0, 300, 300);
	your_health.update_health_bar();
	if (field.game_is_over === false){

			if (field.paused === false) {
				make_field();
				spawn_handler();
				
				for (var i = 0; i < field.students_seen; i++){
					if (field.students[String(i)] !== undefined) {
						field.students[String(i)].update();
					}
				}
				for (var i = 0; i < field.projectiles_fired; i++){
					if (field.projectiles[String(i)] !== undefined) {
						field.projectiles[String(i)].update_projectile();	
					}
				}
				for (var i = 0; i < field.healths_recorded; i++){
					if (field.healths[String(i)] !== undefined) {
						field.healths[String(i)].update_health_bar();	
					}
				}
				for (var i = 0; i < field.turret_count; i++){
					if (field.turrets[String(i)] !== undefined) {
						field.turrets[String(i)].update_turret();
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
				field.pause_button.update_button();
				ctx.fillStyle = "#000000";
				ctx.font = "15px Arial";
				ctx.fillText("Click to Pause", (field.pause_button.x + (field.pause_button.size / 2)), (field.pause_button.y + (1.5 * field.pause_button.size)));
			}
			else {
				ctx.fillStyle = field.sky_color;
				ctx.fillRect(0, field.pause_button.y + (1.25 * field.pause_button.size), 500, canvas.height - (field.pause_button.y + field.pause_button.size)); //very illegitimate temp. solution, keeps the pause messages from writing over each other.
				ctx.fillStyle = "#000000";
				ctx.font = "15px Arial";
				ctx.fillText("Paused!", (field.pause_button.x + (field.pause_button.size / 2)), (field.pause_button.y + (1.5 * field.pause_button.size)));
			}
	}
}

function end_game() {
	ctx.fillStyle = "rgba(0, 0, 0, .5)";
	ctx.fillRect(0, 0, canvas.width, canvas.height);
	ctx.fillStyle = "#FFFFFF";
	ctx.font = "50px Arial";
	ctx.textAlign = "center";
	ctx.fillText("Game Over", canvas.width / 2, canvas.height / 2);


}

//TODO: MAKE THIS A FUNCTION

//This function sets up a round by establishing parameters and calling
//necessary set-up functions (e.g. making player turret object).
//Once it completes set-up, further updates are handled by step
var timerDelay = 100;
var field = new Grid();
var player_turret = new Turret(canvas.width - 50, (canvas.height - 50)/2);
field.turrets["0"] = player_turret;
var auto_turret_1 = new Auto_turret(.75 *  canvas.width, field.field_top / 2);
field.turrets["1"] = auto_turret_1;

/*var auto_turret_2 = new Auto_turret(.33 *  canvas.width, field.field_top / 2);
field.turrets["2"] = auto_turret_2;

var auto_turret_3 = new Auto_turret(.125 *  canvas.width, field.field_top / 2);
field.turrets["3"] = auto_turret_3;*/
//field.turret_count++;
make_field();
spawn_handler();
var first_student = new student(random_row());
field.students["0"] = first_student;
your_health = new player_health();
field.healths["0"] = your_health;
field.healths_recorded++;
field.healths["1"] = first_student.health_bar;
field.healths_recorded++;

field.pause_button = new pause_button();
//field.buttons["0"] = new Button(
setInterval(step, timerDelay);
