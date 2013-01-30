function spawn_timer() {
	ctx.fillStyle = "#000000";
	ctx.font = "20px Arial";
	ctx.textAlign = "center";
	var students_remaining = "Students Remaining: " + (max_students_on_this_level - field.students_despawned);
	ctx.fillText(students_remaining, canvas.width / 2, (field.field_top / 2) - 75);
}

function update_money() {
	ctx.fillStyle = "#000000";
	ctx.font = field.font_size + "px Arial";
	ctx.textAlign = "right";
	ctx.fillText("Money:", canvas.width - field.object_size, field.object_size);
	ctx.fillText("$" + field.money + "K", canvas.width - field.object_size, field.object_size + 25);

}

function pause_handler() {
	field.pause_button.update_button();
	ctx.fillStyle = "#ffffff";
	var pause_bar_width = (1 / 9) * field.pause_button.size;
	var space_between_bars = pause_bar_width;
	var pause_bar_height = (2 / 3) * field.pause_button.size;
	var left_offset = (1 / 3) * field.pause_button.size;
	var top_offset = (1 / 6) * field.pause_button.size;
	ctx.fillRect(field.pause_button.x + left_offset, field.pause_button.y + top_offset, pause_bar_width, pause_bar_height);
	ctx.fillRect((field.pause_button.x + left_offset + (2 * space_between_bars)), field.pause_button.y + top_offset, pause_bar_width, pause_bar_height);
}

function draw_play_button() {
	ctx.fillStyle = "#000000";
	var top_offset = field.pause_button.size * (1 / 9);
	var left_offset = field.pause_button.size * (1 / 3);
		
	var height_of_symbol = field.pause_button.size - (2 * top_offset);
	var width_of_symbol = field.pause_button.size - (2 * left_offset);
	
	var top_y = field.pause_button.y + top_offset;
	var bottom_y = top_y + height_of_symbol;
	var midway_y = (top_y + bottom_y) / 2;
	var left_x = field.pause_button.x + left_offset;
	var right_x = left_x + width_of_symbol;
	
	ctx.beginPath();
	ctx.moveTo(left_x, top_y);
	ctx.lineTo(left_x, bottom_y);
	ctx.lineTo(right_x, midway_y); 
	ctx.fill();
}


//This is the function that is called every interval, and is the function that
//ensures all updates are occuring as necessary.
//Once the round has started, all functions are 
//called from either here or an event listener.
function step() {
	if (field.ending_sequence === true) {
		make_field();
		update_handler();
		spawn_timer();
		pause_handler();
		field.obstruction_spawner.update();
		field.ending_sequence_length -= 1;
		if (field.ending_sequence_length === 0) {
			field.ending_sequence = false;
			pausingForTransition = true;
		}
	}
	else if (pausingForTransition === true) {
		if (field.pause_timer < 30) {
			field.pause_timer++;
			ctx.fillStyle = "rgba(0, 0, 0, .5)";
			ctx.fillRect(0, 0, canvas.width, canvas.height);
	ctx.fillText("Another semester comes to a close...", canvas.width / 2, canvas.height / 2);
		}
		else {
		  pausingForTransition = false;
		  field.pause_timer = 0;
		  var max_students_on_next_level = Math.floor(max_students_on_this_level + 1.5 * num_levels_played);
		  clearInterval(timer);
		  next_level(max_students_on_next_level);
		}
	}
	else { 
		your_health.update_health_bar();

		if (field.game_is_over === false) { //represents whether a leveal has been cleared of students.
		  if (no_students_on_grid_at_end_of_level() == true) {
			num_levels_played++;
			//If this is true, the player won the game!
			if (num_levels_played >= max_num_levels) {
			  ctx.fillStyle = "rgba(0, 0, 0, .5)";
			  ctx.fillRect(0, 0, canvas.width, canvas.height);
			  ctx.fillStyle = "#FFFFFF";
			  ctx.font = "50px Arial";
			  ctx.textAlign = "center";
			  ctx.fillText("You've defeated the student " + 
						  "body!", canvas.width / 2, canvas.height / 2); 
			}
			else {
			  pausingForTransition = true;
			}  
		  }
		  else {
			if (field.paused === false) {
			  make_field();
			  spawn_handler();
			  update_handler();
			  spawn_timer();
			  update_money();
			  pause_handler();
			  field.obstruction_spawner.update();
			  field.just_paused = false;				
			}
			else {
				if (field.just_paused === false) {
					field.just_paused = true;
					ctx.fillStyle = "rgba(0, 0, 0, .5)";
					ctx.fillRect(0, 0, canvas.width, canvas.height);
					ctx.fillStyle = "#FFFFFF";
					ctx.font = "50px Arial";
					ctx.textAlign = "center";
					ctx.fillText("Paused!", canvas.width / 2, canvas.height / 2);
					draw_play_button();
			  }
			}
		  }
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

//This function sets up a round by establishing parameters and calling
//necessary set-up functions (e.g. making player turret object).
//Once it completes set-up, further updates are handled by step
function init() {
	make_field();
	spawn_handler();
	your_health = new player_health();
	field.health_list.push(your_health);
	field.pause_button = new pause_button();
	field.obstruction_spawner = new obstruction_spawner(canvas.width - field.object_size * 4, field.object_size - field.font_size);
	timer = setInterval(step, timerDelay);
}

function next_level(max_num_students) { 
//Below are some necessary globals for this to function.
  timerDelay = 100;
  field = new Grid();
  player_turret = new Turret(canvas.width - 100, (canvas.height - 50)/2);
  auto_turret_1 = new Auto_turret(.75 *  canvas.width, field.field_top / 3);
  field.turret_list.push(player_turret);
  field.turret_list.push(auto_turret_1);
  first_student = new student(random_row());
  field.student_list.push(first_student);
  field.health_list.push(first_student.health_bar);
  max_students_on_this_level = max_num_students;
  init();
}

function load_images() {
	skyImage = new Image();
	skyImage.src = 'sky.jpg';
	grassImage = new Image();
	grassImage.src = 'grass.jpg';
	bakerImage = new Image();
	bakerImage.src = 'baker.png';
	hamerschlagImage = new Image();
	hamerschlagImage.src = "hamerschlag.png";
	dohertyImage = new Image();
	dohertyImage.src = 'doherty.png';
	paperBallImage = new Image();
	paperBallImage.src = "crumpled_paper.png";
	carnegieImage = new Image();
	carnegieImage.src = "carnegie.png";
	targetImage = new Image();
	targetImage.src = "carnegie_mellon_seal.gif";
	noSymbol = new Image();
	noSymbol.src = "no_symbol.gif";
	carnegie_mouth_top = new Image();
	carnegie_mouth_top.src = "carnegie_open_mouth_top.gif";
	carnegie_mouth_bottom = new Image();
	carnegie_mouth_bottom.src = "carnegie_open_mouth_bottom.gif";
	carnegie_mouth_inside = new Image();
	carnegie_mouth_inside.src = "inside_mouth.jpg";

}

function main_menu() {
  ctx.drawImage(hamerschlagMenuImage, 0, 0, canvas.width, canvas.height);
  ctx.font = "70px Arial";
  ctx.textAlign = 'center';
  ctx.fillText("Hamerschlag Defense", canvas.width / 2, canvas.height / 6, 
              canvas.width / 2, canvas.height / 2);
  for (var i = 0; i < 6; i++) {
	ctx.drawImage(studentSprites, i * 120, 120, 120, 120, i * canvas.width / 8 + 200, canvas.height * 0.72, 120, 120);
  }
  load_images();
	function start_button() {
	  this.size = 100;
	  this.x = canvas.width / 2 - this.size / 2;
	  this.y = 7 * canvas.height / 8;
	  this.funct = function () { 
		next_level(num_students_on_first_level);
	  }
	  Button(this, this.funct, false);
	}
	
	function Button(button, funct, default_position) {
	button.funct = funct;
	button.default_position = default_position;
	button.position = button.default_position;
	button.color = "#000000";
	button.inverted_color = "#ffffff";
	button.press = function() {
		if (field.game_is_over === false) {
			button.funct();
			button.position = !button.position;
			button.update_button();
		}
	}
		button.update_button = function() {
			if (button.position === button.default_position) {
				ctx.fillStyle = button.color;
			}
			else {
				ctx.fillStyle = button.inverted_color;
			}
			ctx.fillRect(button.x, button.y, button.size, button.size);
		}
	}
  
  
  start = new start_button();
  start.update_button();
  ctx.font = "30px Arial";
  ctx.fillStyle = "#FFFFFF";
  ctx.fillText("Play!", canvas.width / 2, 15 * canvas.height / 16, 
              canvas.width / 2, 7 * canvas.height / 8);
}

function play_game(num_levels, num_students_first_level) {
  moveToNextLevel = false;
  pausingForTransition = false;
  num_levels_played = 0;
  num_students_on_first_level = num_students_first_level;
  max_num_levels = num_levels;
  displayingMainMenu = true;
  studentSprites = new Image();
  studentSprites.src = "sprite_sheet.png";
  hamerschlagMenuImage = new Image();
  hamerschlagMenuImage.src = "hamerschlag_front.jpg";
  hamerschlagMenuImage.onload = function() {
    main_menu();
  }
}

play_game(4, 16);
