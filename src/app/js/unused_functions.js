

///// NOTES for this function /////
/*
	- This function was used to create the tags similarity matrix
	- It still works if moved inside the "create_tags_similarity_visualizations()" function (the function used to create MDS, t-SNE and chord diagram plots)
	- It is not used anymore because the tags similarity matrix had to be 428x428 in sizze, and thus it was too big to be displayed in the viewport, even with a scaled up app cell on hover
*/
/**
 * Creates the tags similarity matrix
 */
function create_similarity_matrix(container_svg) {

	// Create the container "g" group
	let similarity_matrix_container = container_svg
		.append("g")
		.attr("class", "similarity-matrix-outer-container");

	// The matrix is a "correlation matrix" between the tags, with a rect for each pair of tags
	// The matrix is a square matrix, with size equal to the number of tags (stored in the TOTAL_NUMBER_OF_TAGS)

	// Margins in percentage
	let matrix_margins = {
		top: 0,
		right: 0,
		bottom: 0,
		left: 0
	}
	let matrix_width = 100 - (matrix_margins.left + matrix_margins.right);
	let matrix_height = 100 - (matrix_margins.top + matrix_margins.bottom);

	// Create a new container element for the actual matrix
	let matrix_container = similarity_matrix_container
		.append("g")
		.attr("class", "similarity-matrix-container")
		.attr("transform", "translate(" + matrix_margins.left + "," + matrix_margins.top + ")");

	// Create an NxN matrix composed of groups translated to the correct position
	let matrix_size = TOTAL_NUMBER_OF_TAGS;
	let matrix_single_cell_size = matrix_width / matrix_size;

	// Tags as ordered in the STATE["filtered_tags_info"] list
	let tag_names = Object.keys(STATE["all_tags_filter_infos"]);
	// Tags as ordered in the actual matrix to display (for now simply an alphabetical order)
	let tag_names_matrix_order = tag_names.slice().sort((a, b) => a.localeCompare(b));

	// let tags_rect_stroke_width = 0.1;
	// let tags_rect_stroke_color = color_scheme["viewport_cells"];

	// Iterate over tags in the matrix order
	for (let i = 0; i < tag_names_matrix_order.length; i++) {

		let max_possible_similarity_value = TAGS_SIMILARITY_MATRIX[tag_names_matrix_order[i]][tag_names_matrix_order[i]];

		for (let j = 0; j < tag_names_matrix_order.length; j++) {

			// Show only the lower triangular matrix
			if (j > i) break;

			let tag_name_horizontal = tag_names_matrix_order[i];
			let tag_name_vertical = tag_names_matrix_order[j];

			let tag_horizontal_actual_index = tag_names.indexOf(tag_names_matrix_order[i]);
			let tag_vertical_actual_index = tag_names.indexOf(tag_names_matrix_order[j]);

			// Equal to the number of games having this tag
			let similarity_value = TAGS_SIMILARITY_MATRIX[tag_name_horizontal][tag_name_vertical] / max_possible_similarity_value;
			if (tag_name_horizontal == tag_name_vertical) similarity_value = 1;

			// Create a group for the current tag
			let group_pos_x = i * matrix_single_cell_size;
			let group_pos_y = j * matrix_single_cell_size;
			let tag_group = matrix_container
				.append("g")
				.attr("class", "matrix-tag-group")
				.attr("tag-col-index", tag_horizontal_actual_index)
				.attr("tag-row-index", tag_vertical_actual_index)
				.attr("transform", "translate(" + group_pos_x + "," + group_pos_y + ")");
			// Add a rect to the group
			let rect_size = matrix_single_cell_size;
			let color = get_gradient_color(similarity_value, false);
			let rect = tag_group
				.append("rect")
				.attr("class", "matrix-tag-rect")
				.attr("width", rect_size)
				.attr("height", rect_size)
				.attr("fill", color);
			// .attr("stroke", "black")
			// .attr("stroke-width", tags_rect_stroke_width)
			// .attr("stroke-color", tags_rect_stroke_color);

		}
	}

	// Add a group to contain the tag text labels

	// Return the created matrix container
	return matrix_container;

}



///// NOTES for this function /////
/*
	- This function was used to create the indexed lists of game indexes, sorted by various criteria
	- It was removed because the list of indexed games was pre-baked and stored in the "data/app_indexed_games.json" file
*/
/** Create the lists of game indexes, inexed by the various sorting criterias for games */
function create_indexed_game_indexes_list() {

	console.log("Creating indexed game lists...");

	// NOTE: all sorting criterias are descending (except for the "alphabetical" one)
	let attribute_indexing_criterias = [
		// All games are already sorted by release date (descending)
		"release_date",
		"alphabetical",
		"price",
		"copies_sold",
		"revenue",
		// NOTE: the "review rating" is NOT an attribute of the games, it should be computed using the "positive reviews" and "negative_reviews" game attributes
		"review_rating"
	];

	function game_objects_sorting_function(game_object_1, game_object_2, sorting_criteria) {
		if (sorting_criteria == "release_date") {
			// Sorting by release date (descending)
			if (game_object_1["release_date"]["year"] > game_object_2["release_date"]["year"]) return -1;
			else if (game_object_1["release_date"]["year"] < game_object_2["release_date"]["year"]) return 1;
			// Years are equal
			if (game_object_1["release_date"]["month"] > game_object_2["release_date"]["month"]) return -1;
			else if (game_object_1["release_date"]["month"] < game_object_2["release_date"]["month"]) return 1;
			// Months are equal
			if (game_object_1["release_date"]["day"] > game_object_2["release_date"]["day"]) return -1;
			else if (game_object_1["release_date"]["day"] < game_object_2["release_date"]["day"]) return 1;
			// Days are equal
			return 0;
		} else if (sorting_criteria == "review_rating") {
			// Sorting by review rating
			let game_1_rating = -1;	// -1 corresponds to "None"
			if (game_object_1["positive_reviews"] + game_object_1["negative_reviews"] > 0) game_1_rating = game_object_1["positive_reviews"] / (game_object_1["positive_reviews"] + game_object_1["negative_reviews"]);
			let game_2_rating = -1;
			if (game_object_2["positive_reviews"] + game_object_2["negative_reviews"] > 0) game_2_rating = game_object_2["positive_reviews"] / (game_object_2["positive_reviews"] + game_object_2["negative_reviews"]);
			if (game_1_rating > game_2_rating) return -1;
			else if (game_1_rating < game_2_rating) return 1;
			// Ratings are equal
			return 0;
		} else if (sorting_criteria == "alphabetical") {
			// Sorting alphabetically (ascending)
			if (game_object_1["name"] < game_object_2["name"]) return -1;
			else if (game_object_1["name"] > game_object_2["name"]) return 1;
			// Names are equal
			return 0;
		} else {
			if (game_object_1[sorting_criteria] < game_object_2[sorting_criteria]) return -1;
			if (game_object_1[sorting_criteria] > game_object_2[sorting_criteria]) return 1;
			return 0;
		}
	}

	let games_list_copy = GAMES.slice();

	// Create N lists of indexes for games, where N is the number of attribute_indexing_criterias, and each list is sorted by the corresponding criteria
	let indexed_game_indexes_lists = {};
	for (let i = 0; i < attribute_indexing_criterias.length; i++) {
		let attribute_indexing_criteria = attribute_indexing_criterias[i];
		indexed_game_indexes_lists[attribute_indexing_criteria] = games_list_copy.sort(function (game_object_1, game_object_2) {
			return game_objects_sorting_function(game_object_1, game_object_2, attribute_indexing_criteria);
		}).map(game_object => games_list_copy.indexOf(game_object));
	}

	// Store the lists in the STATE value
	// STATE["indexed_games"] = indexed_game_indexes_lists;
	INDEXED_GAMES_LISTS = indexed_game_indexes_lists;

	console.log("> Indexed game lists created");

}

///// NOTES for these 2 functions /////
/*
	- These 2 functions were used to create the "polyline" element's "path" strings and the smoothed lines of "path" element's "d" string for the tags time series plots
	- They were removed because I am now using a "path" element rather than a polyline, and because I am NOT smoothinng lines anymore
*/

/** 
 * Returns a string to assign to the "points" attribute of a "polyline" element to draw a line for the given tag given a tag attribute (e.g. "number_of_games") to consider
*/
function get_time_series_line_points_string_for_single_tag(tag_index, tag_attribute_to_consider) {

	let points_string = "";
	let tag_name = TAG_NAMES_LIST[tag_index];
	let points_list = Object.values(STATE["all_tags_filter_infos"][tag_name]["list_of_point_values_by_attribute"][tag_attribute_to_consider]);

	// let max_value = STATE["visualization_states"]["TAGS_TIME_SERIES"]["tags_time_series_max_values"][tag_attribute_to_consider];

	let number_of_bins = get_tags_time_series_number_of_bins();
	if (points_list.length != number_of_bins) console.log("ERROR: points_list.length != number_of_bins");
	for (let i = 0; i < points_list.length; i++) {
		let point_value = points_list[i];
		let point_pos_x = (i / (points_list.length - 1)) * time_series_width;
		let point_pos_y = (1 - point_value / max_value) * time_series_height;
		points_string += point_pos_x + "," + point_pos_y + " ";
	}
	return points_string;
}
/** Returns a string representing the "d" attribute of a "path" element to draw a line for the given tag given a tag attribute (e.g. "number_of_games") to consider */
function get_time_series_line_smoothed_points_string_for_single_tag(tag_index, tag_attribute_to_consider) {
	// Properties of a line 
	// I:  - pointA (array) [x,y]: coordinates
	//     - pointB (array) [x,y]: coordinates
	// O:  - (object) { length: l, angle: a }: properties of the line
	const line = (pointA, pointB) => {
		const lengthX = pointB[0] - pointA[0]
		const lengthY = pointB[1] - pointA[1]
		return {
			length: Math.sqrt(Math.pow(lengthX, 2) + Math.pow(lengthY, 2)),
			angle: Math.atan2(lengthY, lengthX)
		}
	}
	// Position of a control point 
	// I:  - current (array) [x, y]: current point coordinates
	//     - previous (array) [x, y]: previous point coordinates
	//     - next (array) [x, y]: next point coordinates
	//     - reverse (boolean, optional): sets the direction
	// O:  - (array) [x,y]: a tuple of coordinates
	const controlPoint = (current, previous, next, reverse) => {
		// When 'current' is the first or last point of the array
		// 'previous' or 'next' don't exist.
		// Replace with 'current'
		const p = previous || current
		const n = next || current
		// The smoothing ratio
		let smoothing = 0.125;
		// Properties of the opposed-line
		const o = line(p, n)
		// If is end-control-point, add PI to the angle to go backward
		const angle = o.angle + (reverse ? Math.PI : 0)
		// update smoothing ratio
		if (p[1] == current[1] || n[1] == current[1] || current[1] <= 0 || current[1] >= time_series_height) smoothing *= 2;
		const length = o.length * smoothing
		// The control point position is relative to the current point
		const x = current[0] + Math.cos(angle) * length
		const y = current[1] + Math.sin(angle) * length
		// If the previous point is in the samae y position as the current point, make the control point stay in the same y position
		if (p[1] == current[1]) return [x, current[1]]
		// If the next point is in the samae y position as the current point, make the control point stay in the same y position
		if (n[1] == current[1]) return [x, current[1]]
		// If the point is at the max or min y value, make the control points not go out of the svg
		if (current[1] <= 0) return [x, 0];
		if (current[1] >= time_series_height) return [x, time_series_height];
		// Return the normal control point
		return [x, y]
	}
	// Create the bezier curve command 
	// I:  - point (array) [x,y]: current point coordinates
	//     - i (integer): index of 'point' in the array 'a'
	//     - a (array): complete array of points coordinates
	// O:  - (string) 'C x2,y2 x1,y1 x,y': SVG cubic bezier C command
	const bezierCommand = (point, i, a) => {
		// start control point
		const [cpsX, cpsY] = controlPoint(a[i - 1], a[i - 2], point);
		// end control point
		const [cpeX, cpeY] = controlPoint(point, a[i - 1], a[i + 1], true);
		return `C ${cpsX},${cpsY} ${cpeX},${cpeY} ${point[0]},${point[1]} `;
	}

	const svgPath = (points, command) => {
		// build the d attributes by looping over the points
		const d = points.reduce(
			function (acc, point, i, a) {
				if (i === 0) {
					// if first point
					return `M ${point[0]},${point[1]} `
				} else {
					// if (a[i - 1][1] === point[1]) {
					// 	// if the the next point is at the same y coordinate as this point, return a line 
					// 	return `${ acc } L ${ point[0] },${ point[1] } `
					// } else if (point[1] == 0 || point[1] == time_series_height) {
					// 	// If the point is at the max or min y value, make the control points not go out of the svg
					// 	return `${ acc } ${ command([point[0], point[1] + (a[i - 1][1] - point[1]) / 2], i, a) } `

					// } else {
					// 	// else return a bezier curve
					// 	return `${ acc } ${ command(point, i, a) } `
					// }
					return `${acc} ${command(point, i, a)} `
				}
			}, '')
		return d;
	}
	let svg_path_string = svgPath(get_tag_points_list(tag_index, tag_attribute_to_consider), bezierCommand);
	return svg_path_string;
}

