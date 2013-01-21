var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");

//THIS SECTION SETS BASIC DETAILS OF DRAWING THE BACKGROUND / "GAME BOARD"
function Grid() {
	this.ground_color = "#78AB46";
	this.num_rows = 5; //number of rows students approach in
	this.field_width = (canvas.width * .9) + 50;
	this.field_height = canvas.height * .75;
	//this.field_left = (canvas.width - this.field_width) / 2;
	this.field_left = -50;
	this.field_right = this.field_left + this.field_width;
	this.field_top = (canvas.height - this.field_height) / 2;
	this.field_bottom = this.field_top + this.field_height;
	this.row_height = this.field_height / this.num_rows;
	this.row_width = this.field_width;
	this.time_to_student = 10000;
	//this.students = new Array();
	this.students = new Object();
	this.students_seen = 0;
	//this.target = new Target(0, canvas.height / 2);
	this.projectiles_currently_in_air = 0;
	this.projectiles_fired = 0;
	this.projectiles = new Object();
	//this.students = new Object();
	//this.num_students = 0;
}

function make_field() {
	ctx.fillStyle = field.ground_color;
	for (var row = 0; row < 5; row++) {
			var y_position = field.field_top + (row * field.row_height);
			ctx.fillRect(field.field_left, y_position, field.row_width, field.row_height);
			ctx.strokeRect(field.field_left, y_position, field.row_width, field.row_height);
	}
}

function make_grid() {
	field.time_to_student -= timerDelay;
	player_turret.time_to_fire -= timerDelay;
	var sky_color = "#00ccFF";
	ctx.fillStyle = sky_color;
	ctx.fillRect(0, 0, canvas.width, canvas.height);
	make_field();
	if (field.time_to_student <= 0) {
		field.time_to_student = 10000;
		var mob = new student(random_row());
		field.students[mob.name] = mob;
		//field.num_students += 1;
	}
	if (player_turret.time_to_fire  <= 0) {
		//make a new projectile
		player_turret.time_to_fire = 1000;
		var homework_shot = new Projectile(player_turret.x - 50, player_turret.y, player_turret.target.x, player_turret.target.y);
		field.projectiles[homework_shot.name] = homework_shot;
		field.projectiles_currently_in_air += 1;	
	}
}

function circle(ctx, cx, cy, radius) {
    ctx.arc(cx, cy, radius, 0, 2*Math.PI, true);
}
// END GRID SECTION