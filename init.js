function spawn_timer() {
	ctx.fillStyle = "#000000";
	ctx.font = "20px Arial";
	ctx.textAlign = "center";
	//var spawn_time = Math.max(String(field.time_until_student_spawn/ 1000), 0);
	//var spawn_msg = "Time to next spawn: ";
	//ctx.fillText(spawn_msg.concat(spawn_time), canvas.width / 2, field.field_top / 2);
	var students_remaining = "Students Remaining: " + (max_students_on_this_level - field.students_despawned);
	ctx.fillText(students_remaining, canvas.width / 2, (field.field_top / 2) - 75);
}

function pause_handler() {
	field.pause_button.update_button();
	ctx.fillStyle = "#000000";
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
//<<<<<<< HEAD
	if (field.ending_sequence === true) {
		make_field();
		update_handler();
		spawn_timer();
		pause_handler();
		field.obstruction_spawner.update();
		//console.log(field.projectile_list.length);
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
			ctx.fillStyle = "#FFFFFF";
			ctx.font = "50px Arial";
			ctx.textAlign = "center";
			ctx.fillText("Onto the next level", canvas.width / 2, canvas.height / 2);
		}
		else {
		  pausingForTransition = false;
		  field.pause_timer = 0;
		  var max_students_on_next_level = max_students_on_this_level += 5;
		  clearInterval(timer);
		  next_level(max_students_on_next_level);
		}
	}
	else { 
		your_health.update_health_bar();

		if (field.game_is_over === false) {
		  /* If this is true, all the students on a level 
		   * have been cleared. 
		   */
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
			/* This block indicates that the game is moving to a harder 
			 * level.
			 */
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
			  player_turret.target.update_target();
			  pause_handler();
			  field.obstruction_spawner.update();
			  field.just_paused = false;				
			}
			else {
			  if (field.just_paused === false) {
				field.just_paused = true;
				ctx.fillStyle = "#000000";
				ctx.font = "15px Arial";
				ctx.fillText("Paused!", (field.pause_button.x + (field.pause_button.size / 2)), (field.pause_button.y + (1.5 * field.pause_button.size)));
				draw_play_button();
			  }
			}
		  }
		}

/*=======
	if (pausingForTransition === true) {
    if (pauseTimer < 30) {
      pauseTimer++;
      ctx.fillStyle = "rgba(0, 0, 0, .5)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = "#FFFFFF";
      ctx.font = "50px Arial";
      ctx.textAlign = "center";
      ctx.fillText("Onto the next level", canvas.width / 2, canvas.height / 2);
    }
    else {
      pausingForTransition = false;
      pauseTimer = 0;
      var max_students_on_next_level = max_students_on_this_level += 5;
      clearInterval(timer);
      next_level(max_students_on_next_level);
    }
  }
  else { 
    your_health.update_health_bar();
    if (field.game_is_over === false) {
      /* If this is true, all the students on a level 
       * have been cleared. */ /*
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
        /* This block indicates that the game is moving to a harder 
         * level.
         */ /*
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
          player_turret.update_turret();
          player_turret.target.update_target();
          pause_handler();
          field.obstruction_spawner.update();
          field.just_paused = false;
        }
        else {
          if (field.just_paused === false) {
            field.just_paused = true;
            ctx.fillStyle = "#000000";
            ctx.font = "15px Arial";
            ctx.fillText("Paused!", (field.pause_button.x + (field.pause_button.size / 2)), (field.pause_button.y + (1.5 * field.pause_button.size)));
            draw_play_button();
          }
        }
      }
    }
>>>>>>> 300e9a8638e6eabf4b54ee30cee8f9f7d97ea85b*/
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
	field.obstruction_spawner = new obstruction_spawner(((canvas.width - field.field_right) / 2), .9 * canvas.height);
	timer = setInterval(step, timerDelay);
}

function next_level(max_num_students) { 
//Below are some necessary globals for this to function.
  timerDelay = 100;
  field = new Grid();
  player_turret = new Turret(canvas.width - 100, (canvas.height - 50)/2);
  auto_turret_1 = new Auto_turret(.75 *  canvas.width, field.field_top / 2);
  field.turret_list.push(player_turret);
  field.turret_list.push(auto_turret_1);
  first_student = new student(random_row());
  field.student_list.push(first_student);
  field.health_list.push(first_student.health_bar);
  max_students_on_this_level = max_num_students;
  init();
}

function play_game(num_levels, num_students_first_level) {
  moveToNextLevel = false;
  //pauseTimer = 0;
  pausingForTransition = false;
  num_levels_played = 0;
  max_num_levels = num_levels;
  next_level(num_students_first_level);
}

play_game(2, 3);
