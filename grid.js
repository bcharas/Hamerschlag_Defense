//gets ID of canvas for later use
var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");

//This function sets up the parameters for the "game field" i.e. the space 
//enemies (called students) approach through.
//It is divided into "rows", which are paths on which a student is spawned, 
//and the student moves along to reach their goal at the right side of the player screen.
function Grid() {
	this.ground_color = "#78AB46";
	this.sky_color = "#00ccFF";
	this.num_rows = 5; 
	this.field_width = (canvas.width * .9) + 50;
	this.field_height = canvas.height * .75;
	this.field_left = -50;
	this.field_right = this.field_left + this.field_width;
	this.field_top = (canvas.height - this.field_height) / 2;
	this.field_bottom = this.field_top + this.field_height;
	this.row_height = this.field_height / this.num_rows;
	this.row_width = this.field_width;
	this.time_until_student_spawn = 10000;
	this.students = new Object();
	this.students_seen = 0;
	this.projectiles_currently_in_air = 0;
	this.projectiles_fired = 0;
	this.projectiles = new Object();
	this.healths = new Object();
	this.healths_recorded = 0;
	this.game_is_over = false;
	this.turrets = new Object();
	this.turret_count = 1;
	this.paused = false;
	this.buttons = new Object();
	this.button_count = 0;
	this.pause_button = undefined;
	this.button_check = function(x, y) {
		if ((x >= field.pause_button.x) && (x <= (field.pause_button.x + field.pause_button.size))) {
			if ((y >= field.pause_button.y) && (y <= (field.pause_button.y + field.pause_button.size))) {
				field.pause_button.press();
			}
		}
	}
	this.obstruction_spawner = new obstruction_spawner(300, 50); //TODO: FIX ANY MAGIC NUMBERS
	this.obstructions = new Object();
	this.obstruction_count = 0;
	
}


//draws the game background and rows that the students approach along
function make_field() {
	var sky_color = "#00ccFF";
	ctx.fillStyle = sky_color;
	ctx.fillRect(0, 0, canvas.width, canvas.height);
	ctx.fillStyle = field.ground_color;
	for (var row = 0; row < 5; row++) {
			var y_position = field.field_top + (row * field.row_height);
			ctx.fillRect(field.field_left, y_position, field.row_width, field.row_height);
			ctx.strokeRect(field.field_left, y_position, field.row_width, field.row_height);
	}
}

//spawns new students (in a random row) and new projectiles (aimed at 
//player target) on an interval
function spawn_handler() {
	field.time_until_student_spawn -= timerDelay;
	player_turret.time_between_shots_fired -= timerDelay;
	if (field.time_until_student_spawn <= 0) {
		field.time_until_student_spawn = 10000;
		var mob = new student(random_row());
		field.students[mob.name] = mob;
		field.healths[mob.health_bar.name] = mob.health_bar;
		field.healths_recorded++;
	}
	if (player_turret.time_between_shots_fired  <= 0) {
		player_turret.time_between_shots_fired = 1000;
		for (var i = 0; i < field.turret_count; i++){
			if (field.turrets[String(i)] !== undefined) {
				var current_turret = field.turrets[String(i)];
				field.projectiles[String(field.projectiles_fired)] = new Projectile(current_turret.x_center, current_turret.y_center, current_turret.target.x, current_turret.target.y);
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