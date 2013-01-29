//gets ID of canvas for later use
var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
//console.log(window.innerWidth);

//This function sets up the parameters for the "game field" i.e. the space 
//enemies (called students) approach through.
//It is divided into "rows", which are paths on which a student is spawned, 
//and the student moves along to reach their goal at the right side of the player screen.
function Grid() {
	this.turretImage = new Image();
	this.projectile_speed = 10;
	this.object_size = 50; //size for buttons, turrets, etc.
	this.just_paused = false;
	
	this.ground_color = "#78AB46";
	this.num_rows = 5;

	this.sky_color = "#00ccFF";
	this.num_rows = 5; 
	this.field_width = (canvas.width * .9) + 50;
	this.field_height = canvas.height * .5;
 
  //This declaration and for loop initializes the 
  //number of projectiles in each row as 0 to start 
	this.num_projectiles_per_row = Array(this.num_rows);
	for (var i = 0; i < this.num_rows; i++) {
		this.num_projectiles_per_row[i] = new Object;
		this.num_projectiles_per_row[i]["top_left"] = 0;
		this.num_projectiles_per_row[i]["bottom_left"] = 0;
		this.num_projectiles_per_row[i]["whole_left"] = 0;
		this.num_projectiles_per_row[i]["top_right"] = 0;
		this.num_projectiles_per_row[i]["bottom_right"] = 0;
		this.num_projectiles_per_row[i]["whole_right"] = 0;
		this.num_projectiles_per_row[i]["out_of_bounds"] = 0;
	} //was originally 0, changed it to new object()
 
	this.field_left = -50;
	this.field_right = this.field_left + this.field_width;
	this.field_top = (canvas.height - this.field_height) / 2;
	this.field_bottom = this.field_top + this.field_height;
	this.row_height = this.field_height / this.num_rows;
	this.row_width = this.field_width;
	this.max_time_until_student_spawn = 5000;
	this.time_until_student_spawn = this.max_time_until_student_spawn;
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
	this.obstruction_spawner = undefined;
	//this.obstruction_spawner = new obstruction_spawner(300, 50); //TODO: FIX ANY MAGIC NUMBERS
	this.obstructions = new Object();
	this.obstruction_count = 0;
	this.mid_x = this.field_width / 2;
	this.mid_y = (this.field_bottom - this.field_top) / 2;
	this.money = 100;
	this.books_cost = 75;
	this.books_timeout = 0;
	this.font_size = 20;
	this.turret_spots = [];
	for(var i = 0; i < 3; i++){
		this.turret_spots.push(new Turret_placeholder(i * 376 + 264, 100));
	}
	this.turret_cost = 200;
}

function no_students_on_grid_at_end_of_level() {
  if (field.students_seen >= max_students_on_this_level) {
    for (var i = 0; i < field.students_seen; i++) {
      if (field.students[String(i)] !== undefined) {
        return false;
      }   
    }
    return true;
  }
  return false;
}

//draws the game background and rows that the students approach along
function make_field() {
	var sky_color = "#00ccFF";
	ctx.fillStyle = sky_color;
	ctx.fillRect(0, 0, canvas.width, canvas.height);
	//var skyImage = new Image();
	//skyImage.src = 'sky.jpg';
	ctx.drawImage(skyImage, 0, 0);
	//var grassImage = new Image();
	//grassImage.src = 'grass.jpg';
	ctx.drawImage(grassImage, 0, 200, field.field_width, 550);
	for (var i = 0; i < field.num_rows; i++) {
		ctx.strokeRect(field.field_left, (field.field_top + (field.row_height * i)), field.field_width, field.row_height);	
	}
	//var bakerImage = new Image();
	//bakerImage.src = 'baker.png';
	ctx.drawImage(bakerImage, -230, 44, 1600, 180);
	//field.turretImage.src = "hamerschlag.png";
	//ctx.drawImage(field.turretImage, 1190, 180, 417, 578);
	ctx.drawImage(hamerschlagImage, 1190, 180, 417, 578);
	//var dohertyImage = new Image();
	//dohertyImage.src = 'doherty.png';
	for(var i = 0; i < 4; i++){
		ctx.drawImage(dohertyImage, (400 * i) - 320, 670, 704, 231);
	}
}


//spawns new students (in a random row) and new projectiles (aimed at 
//player target) on an interval
function spawn_handler() {
  if (field.students_seen <= max_students_on_this_level){
    field.time_until_student_spawn -= timerDelay;
    player_turret.time_between_shots_fired -= timerDelay;
	}
  if (field.time_until_student_spawn <= 0 
      && field.students_seen < max_students_on_this_level) {
    if (field.students_seen <= 3) {
		  field.time_until_student_spawn = field.max_time_until_student_spawn;
    }
    else if (field.students_seen >= (2 * max_students_on_this_level / 3)) {
      field.time_until_student_spawn = 1000;   
    }
    else if (field.students_seen >= (1 * max_students_on_this_level / 2)) {
      field.time_until_student_spawn = 6000;   
    }
    else if (field.students_seen >= (max_students_on_this_level / 3)) {
      field.time_until_student_spawn = 1000;  
    }
    else {
      field.time_until_student_spawn = 4000;
    }
		//field.time_until_student_spawn = 10000;
		//var mob = new student(random_row());
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
				if (current_turret.turret_type === "controlled turret") {
					//console.log(current_turret.turret_type);
					field.projectiles[String(field.projectiles_fired)] = new Projectile(current_turret.x_center, current_turret.y_center, current_turret.target.x, current_turret.target.y);
				}
				else if (current_turret.turret_type === "auto turret") {
					//console.log(current_turret.turret_type);
					current_turret.find_nearest_student();
					var launch_angle = current_turret.get_launch_angle();
					field.projectiles[String(field.projectiles_fired)] = new Auto_projectile(current_turret.x_center, current_turret.y_center, launch_angle);
				}
			}
		}

	}
}

//DO I NEED TO REDO THIS WITHOUT THE MIDPOINT COUNTING DOUBLE?
function get_quadrant(x, y, row) {
	if ((x <= 0) || (y <= field.field_top) || (y >= field.field_bottom)) {
		return "out_of_bounds";
	}
	var mid_x = field.field_right / 2;
	var mid_y = field.field_top + (field.field_height / 2);
	var middle_row = undefined;
	if ((field.num_rows / 2) !== Math.floor(field.num_rows / 2)) {
		middle_row = Math.floor(field.num_rows / 2);
	}
	if (middle_row !== undefined) {
		if (x < mid_x) {
			if (row < middle_row) {
				return "top_left";			
			}
			else if (row > middle_row) {
				return "bottom_left";			
			}
			else {
				return "whole_left";
			}		
		}
		else {
			if (row < middle_row) {
				return "top_right";			
			}
			else if (row > middle_row) {
				return "bottom_right";			
			}
			else {
				return "whole_right";
			}		
			}		
		}
	else {
		if (x < mid_x) {
			if (y < mid_y) {
				return "top_left";			
			}
			else{
				return "bottom_left";			
			}
		}
		else {
			if (y < mid_y) {
				return "top_right";			
			}
			else {
				return "bottom_right";			
			}
		}		
	}
}

function increment_quadrants(row, quadrant) {
	if (field.num_projectiles_per_row[row] !== undefined)	{
		if (this.quadrant === "whole_left") {
			field.num_projectiles_per_row[row][quadrant]++;
			field.num_projectiles_per_row[row]["top_left"]++;
			field.num_projectiles_per_row[row]["bottom_left"]++;
			this.in_middle = true;
		}
		else if (this.quadrant === "whole_right") {
			field.num_projectiles_per_row[row][quadrant]++;
			field.num_projectiles_per_row[row]["top_right"]++;
			field.num_projectiles_per_row[row]["bottom_right"]++;
			this.in_middle = true;
		}
		else {
			field.num_projectiles_per_row[row][quadrant]++;
		}
	}
}

function decrement_quadrants(row, quadrant) {
	if (field.num_projectiles_per_row[row] !== undefined)	{
		if (this.quadrant === "whole_left") {
			field.num_projectiles_per_row[row][quadrant]--;
			field.num_projectiles_per_row[row]["top_left"]--;
			field.num_projectiles_per_row[row]["bottom_left"]--;
			this.in_middle = true;
		}
		else if (this.quadrant === "whole_right") {
			field.num_projectiles_per_row[row][quadrant]--;
			field.num_projectiles_per_row[row]["top_right"]--;
			field.num_projectiles_per_row[row]["bottom_right"]--;
			this.in_middle = true;
		}
		else {
			field.num_projectiles_per_row[row][quadrant]--;
		}
	}
}
/*
//function for drawing circles
function circle(ctx, cx, cy, radius) {
    ctx.arc(cx, cy, radius, 0, 2*Math.PI, true);
}
*/
