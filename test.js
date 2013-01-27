	this.test_function = function(v, u, d, h) {
		var non_sqrt_val = Math.pow(h,2) * u * v;
		//console.log("non_sqrt: " + non_sqrt_val);			
		var val_1 = Math.pow(d, 4) * Math.pow(u, 4);
		//console.log(" val_1: " + val_1);
		var val_2 = Math.pow(d, 2) * Math.pow(h, 2) * Math.pow(u, 4);
		//console.log(" val_2: " + val_2);
		var val_3 = (-1) * Math.pow(d, 2) * Math.pow(h, 2) * Math.pow(u, 2) * Math.pow(v, 2);
		//console.log(" val_3: " + val_3);
		var sqrt_val = Math.sqrt(val_1 + val_2 + val_3);
		//console.log(" sqrt: " + sqrt_val);
		
		var numerator1 = non_sqrt_val - sqrt_val;
		//console.log(" num1: " + numerator1);
		var numerator2 = non_sqrt_val + sqrt_val;
		//console.log(" num2: " + numerator2);
		//console.log("num_1: " + numerator1 + " num_2: " + numerator2);
		
		var denominator = (Math.pow(d,2) * Math.pow(u, 2)) + (Math.pow(h, 2) * Math.pow(u, 2))
		//console.log("denom: " + denominator);
		
		var final_val_1 = numerator1 / denominator;
		var final_val_2 = numerator2 / denominator;
		//console.log("final 1: " + final_val_1 + " final 2: " + final_val_2);
		
		var launch_angle_1 = Math.asin(final_val_1);
		var launch_angle_2 = Math.asin(final_val_2);
		
		return launch_angle_1;
		
		//console.log("angle 1: " + launch_angle_1);
		//console.log(" angle 2: " + launch_angle_2);
		
		//var final_val = Math.acos(numerator/denominator)
		//var launch_angle = (-1) * final_val;
		//return launch_angle_1;
	
	}
