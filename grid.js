//gets ID of canvas for later use
var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");


function field_size_info(field) {
	field.field_left = -50;
	field.field_width = (canvas.width * .9) + 50;
	field.field_height = canvas.height * .5;
	field.field_right = field.field_left + field.field_width;
	field.field_top = (canvas.height - field.field_height) / 2;
	field.field_bottom = field.field_top + field.field_height;
	field.num_rows = 5; 
	field.row_height = field.field_height / field.num_rows;
	field.row_width = field.field_width;
	field.mid_x = field.field_width / 2;
	field.mid_y = (field.field_bottom - field.field_top) / 2;
}

function color_pallete(field) {
	field.ground_color = "#78AB46";
	field.sky_color = "#00ccFF"

}

function object_storage_lists(field) {
	field.student_list = [ ];
	field.health_list = [ ];
	field.projectile_list = [ ];
	field.obstruction_list = [ ];
	field.turret_list = [ ];
}

function game_info(field) {
	field.projectile_speed = 10;
	field.object_size = 50;
	field.just_paused = false;
	field.max_time_until_student_spawn = 5000;
	field.time_until_student_spawn = field.max_time_until_student_spawn;
	field.game_is_over = false;
	field.paused = false;
	field.students_seen = 0;
	field.students_despawned = 0;
	field.pause_timer = 0;
	field.ending_sequence = false;
	field.ending_sequence_length = 10;
}

//This function sets up the parameters for the "game field" i.e. the space 
//enemies (called students) approach through.
//It is divided into "rows", which are paths on which a student is spawned, 
//and the student moves along to reach their goal at the right side of the player screen.
function Grid() {
	this.turretImage = new Image();
	color_pallete(this);
	field_size_info(this);
	game_info(this);	
	this.pause_button = undefined;
	this.button_check = function(x, y) {
		if ((x >= field.pause_button.x) && (x <= (field.pause_button.x + field.pause_button.size))) {
			if ((y >= field.pause_button.y) && (y <= (field.pause_button.y + field.pause_button.size))) {
				field.pause_button.press();
			}
		}
	}
	this.obstruction_spawner = undefined;
	object_storage_lists(this);
}

function no_students_on_grid_at_end_of_level() {
	if (field.students_despawned >= max_students_on_this_level) {
		return true;
	}
	return false;
}

//draws the game background and rows that the students approach along
function make_field() {
	var sky_color = "#00ccFF";
	ctx.fillStyle = sky_color;
	ctx.fillRect(0, 0, canvas.width, canvas.height);
	var skyImage = new Image();
	skyImage.src = 'sky.jpg';
	ctx.drawImage(skyImage, 0, 0);
	//ctx.fillStyle = field.ground_color;
	ctx.fillStyle = "#78AB46";
	ctx.fillRect(field.field_left, field.field_top, field.field_width, field.field_height);
	ctx.fillStyle = "#000000";
	for (var i = 0; i < field.num_rows; i++) {
		ctx.strokeRect(field.field_left, (field.field_top + (field.row_height * i)), field.field_width, field.row_height);	
	}
}


//spawns new students (in a random row) and new projectiles (aimed at 
//player target) on an interval
function spawn_handler() {
	if ((field.ending_sequence === false) && (pausingForTransition === false)) {
	//if (pausingForTransition === false) {
		if (field.students_seen <= max_students_on_this_level){
			field.time_until_student_spawn -= timerDelay;
			player_turret.time_between_shots_fired -= timerDelay;
		}
		if (field.time_until_student_spawn <= 0
			&& field.students_seen < max_students_on_this_level) {
			
			field.time_until_student_spawn = field.max_time_until_student_spawn;
			var mob = new student(random_row());
			field.student_list.push(mob);
		}
		if (player_turret.time_between_shots_fired  <= 0) {
			player_turret.time_between_shots_fired = 1000;
			for (var i = 0; i < field.turret_list.length; i++){			
				var current_turret = field.turret_list[i];
				if (current_turret.turret_type === "controlled turret") {
					var projectile = new Projectile(current_turret.x_center, current_turret.y_center, current_turret.target.x, current_turret.target.y);
					field.projectile_list.push(projectile);
					
				}
				else if (current_turret.turret_type === "auto turret") {
					current_turret.find_nearest_student();
					var launch_angle = current_turret.get_launch_angle();
					var auto_projectile = new Auto_projectile(current_turret.x_center, current_turret.y_center, launch_angle);
					field.projectile_list.push(auto_projectile);
				}
			}
		}
	}
}

/*
//function for drawing circles
function circle(ctx, cx, cy, radius) {
    ctx.arc(cx, cy, radius, 0, 2*Math.PI, true);
}
*/
