//gets ID of canvas for later use
var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");

//This function sets up the parameters for the "game field" i.e. the space 
//enemies (called students) approach through.
//It is divided into "rows", which are paths on which a student is spawned, 
//and the student moves along to reach their goal at the right side of the player screen.
function Grid() {
	this.ground_color = "#78AB46";
	this.num_rows = 5;

	this.field_width = (canvas.width * .9) + 50;
	this.field_height = canvas.height * .75;
 
  //This declaration and for loop initializes the 
  //number of projectiles in each row as 0 to start 
  this.num_projectiles_per_row = Array(this.num_rows);
  for (var i = 0; i < this.num_rows; i++) {
    this.num_projectiles_per_row[i] = 0;
  }
 
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
		var homework_shot = new Projectile(player_turret.x, player_turret.y + (player_turret.size / 2), player_turret.target.x, player_turret.target.y);
		field.projectiles[homework_shot.name] = homework_shot;
		field.projectiles_currently_in_air += 1;	
	}
}
/*
//function for drawing circles
function circle(ctx, cx, cy, radius) {
    ctx.arc(cx, cy, radius, 0, 2*Math.PI, true);
}
*/
