
/** Set to true to enable hover tooltips on element's hover (also set to true/false when clicking on the correspondinig system' button on the top left) */
let show_tooltips_on_hover = true;
/** Set to true to enable cell's scale up on hover over them (also set to true/false when clicking on the correspondinig system's button on the top left) */
let scale_up_app_cells_on_hover = false;


/** 
 * Max number of non-excluded tags to show names for when plotting tag scatterplot visualizations (for both tags simmilarity scatterplot and tags scatterplot / bubble chart visualizations)
 * 
 * Set to a high number (e.g. 500), to always show tag names underneath tag scatterplot points in tags scatterplot visualizations.
 */
let MAX_NUMBER_OF_TAGS_FOR_SHOWING_TAGS_SCATTERPLOTS_TEXT_LABELS = 10;
/** Set to true to disable the feature for which, for tags visualizations, filters on tags are ignored. */
let USE_TAGS_FILTERS_FOR_TAGS_VISUALIZATIONS = false;

/**
 * List of objects representing games
 *
 * List is in form [{...}, {...}, ...] where each object {...} is a game containing attributes "name", "tags" (as a list of tag names), ecc...
 * */
const GAMES = get_json_data('../app_database/app_games.json')['games'];
/**
 * Object containing the 3 tag categories as keys ("Genres", "Sub-Genres", "Features") and a list of tag object for each of these keys
 *
 * Object is in form {"Genres": [{...}, {...}, ...], "Sub-Genres": [{...}, {...}, ...], "Features": [{...}, {...}, ...]} where each object {...} is a tag containing attributes "name", ecc...
 *
 * NOTE: the actual ordering of categories (keys) in this object is "Features", "Genres", "Sub-Genres", but this ordering is NOT the same of the general indexes for tags (used for example to identify lines or bar elements representing tags in the various tag visualizations)
 *
 * The actual indexes of tags by category go as follows:
 *
 * Indexes of Genre tags: [413, 422]
 *
 * Indexes of Sub-Genre tags: [268, 412]
 *
 * Indexes of Feature tags: [0, 267]
 */
const TAGS_BY_CATEGORY = get_json_data('../app_database/app_tags.json');
/**
 * Object containing the tags similarity matrix as an object with {"tag_name": {...}, ...} where each object {...} contains in turn other tag names as keys and numerical values representing the similarity between the tags as values.
 *
 * NOTE: The similarity value between 2 tags is NOT normalized, and represents the number of games that have both tag1 and tag2 in the "matrix"
*/
const TAGS_SIMILARITY_MATRIX = get_json_data('../app_database/app_tags_similarity_matrix.json');
/**
 * Object containing the tags similarity matrix as an object with {"tag_name": {...}, ...} where each object {...} contains in turn other tag names as keys and numerical values representing the NORMALIZED similarity between the tags as values.
 *
 * The normalized similarity value between 2 tags is obtained by dividing the similarity value between the 2 tags by the min number of games between the 2 tags (i.e. the min number of games that have tag1 and tag2 in the "matrix")
 */
const TAGS_SIMILARITY_MATRIX_NORMALIZED = get_json_data('../app_database/app_tags_similarity_matrix_normalized.json');
// const TAGS_SIMILARITY_MATRIX_NORMALIZED = {};
// // Sort all the tags in the tags similarity matrix by similarity value (descending)
// for (let tag_name in TAGS_SIMILARITY_MATRIX) {
// 	// Sort the tags similarity matrix for the current tag by similarity value (descending)
// 	TAGS_SIMILARITY_MATRIX[tag_name] = Object.fromEntries(Object.entries(TAGS_SIMILARITY_MATRIX[tag_name]).sort((a, b) => b[1] - a[1]));
// 	// Get the noralized similarity values for each couple of tags based on the min value of the 2 tag's number of games (obtained as TAGS_SIMILARITY_MATRIX[tag_name][tag_name])
// 	TAGS_SIMILARITY_MATRIX_NORMALIZED[tag_name] = {};
// 	for (let other_tag_name in TAGS_SIMILARITY_MATRIX[tag_name]) {
// 		let tag_similarity_value = TAGS_SIMILARITY_MATRIX[tag_name][other_tag_name];
// 		let tag_number_of_games = TAGS_SIMILARITY_MATRIX[tag_name][tag_name];
// 		let other_tag_number_of_games = TAGS_SIMILARITY_MATRIX[other_tag_name][other_tag_name];
// 		let min_number_of_games = Math.min(tag_number_of_games, other_tag_number_of_games);
// 		let normalized_similarity_value = tag_similarity_value / min_number_of_games;
// 		TAGS_SIMILARITY_MATRIX_NORMALIZED[tag_name][other_tag_name] = normalized_similarity_value;
// 	}
// 	// Sort all the tags in the normalized tags similarity matrix by similarity value (descending)
// 	TAGS_SIMILARITY_MATRIX_NORMALIZED[tag_name] = Object.fromEntries(Object.entries(TAGS_SIMILARITY_MATRIX_NORMALIZED[tag_name]).sort((a, b) => b[1] - a[1]));
// }

// console.log(TAGS_SIMILARITY_PERCENTAGES_MATRIX);
/** List of all languages */
const LANGUAGES = [
	"English",
	"Simplified Chinese",
	"German",
	"Russian",
	"French",
	"Spanish (Spain)",
	"Japanese",
	"Italian",
	"Traditional Chinese",
	"Korean",
	"Portuguese (Brazil)",
	"Polish",
	"Turkish",
	"Spanish (Latin America)",
	"Dutch",
	"Portuguese",
	"Czech",
	"Swedish",
	"Ukrainian",
	"Arabic",
	"Hungarian",
	"Thai",
	"Danish",
	"Norwegian",
	"Finnish",
	"Romanian",
	"Greek",
	"Vietnamese",
	"Bulgarian",
	"Portuguese (Portugal)",
]
/** List of all content ratings */
const CONTENT_RATINGS = [
	"No rating",
	"Violent",
	"Gore",
	"Sexual Content",
	"Nudity",
	"Mature",
	"NSFW",
	"Blood",
]
/** List of all player modes */
const PLAYER_MODES = [
	"Single-player",
	"Multi-player",
	"PvP",
	"Co-op",
	"Online PvP",
	"Split Screen",
	"Online Co-op",
	"Split Screen PvP",
	"Split Screen Co-op",
	"Cross-Platform Multiplayer",
	"MMO",
	"LAN PvP",
	"LAN Co-op",
];

const INDEXED_GAMES_LISTS = get_json_data('../app_database/app_ranked_games.json');

/** Object containing, for each tag name, a list of games with that tag, as indexes of said games in the GAMES list */
const TAGS_GAME_INDEXES = get_json_data('../app_database/app_tags_games_indexes.json');

// Leave this to true, it might lead to errors otherwise...
let use_month_bins_for_released_games_by_date_visualization = true;

/*
	// Palette from https://colorbrewer2.org/#type=qualitative&scheme=Set1&n=9
	// colors = ["#e41a1c", "#377eb8", "#4daf4a", "#984ea3", "#ff7f00", "#ffff33", "#a65628", "#f781bf", "#999999"]
	// Red
	--color-1-red: #e6191d;
	--color-1-red-dark: #aa090c;
	// Blue
	--color-2-blue: #377eb8;
	--color-2-blue-dark: #1260a1;
	// Green
	--color-3-green: #4daf4a;
	--color-3-green-dark: #12a112;
	// Purple
	--color-4-purple: #984ea3;
	--color-4-purple-dark: #5912a1;
	// Orange
	--color-5-orange: #ff7f00;
	--color-5-orange-dark: #a15912;
	// Yellow
	--color-6-yellow: #ffff33;
	--color-6-yellow-dark: #a1a112;
	// Brown
	--color-7-brown: #a65628;
	--color-7-brown-dark: #a15912;
	// Pink
	--color-8-pink: #f781bf;
	--color-8-pink-dark: #a11259;
	// Gray
	--color-9-gray: #999999;
	--color-9-gray-dark: #595959;
*/
let colors = {
	// ...
	"red": "#e6191d",
	"red_dark": "#aa090c",
	// Used for general visualizations e.g. histogram bars)
	"blue": "#377eb8",
	"blue_dark": "#1260a1",
	// Used for tags (?)
	"green": "#4daf4a",
	"green_dark": "#12a112",
	"orange": "#ff7f00",
	"orange_dark": "#a15912",
	"pink": "#f781bf",
	"pink_dark": "#a11259",
	// Used for highlighting (?)
	"yellow": "#ffff33",
	"yellow_dark": "#a1a112",
	// ...
	"brown": "#a65628",
	"brown_dark": "#a15912",
	"purple": "#984ea3",
	"purple_dark": "#5912a1",

	// Neutral colors
	"gray": "#999999",
	"gray_dark": "#595959",
	"white": "#ffffff",
	"black": "#000000"
}

// Offset HSV for colors in the "colors" list
// let offset_color_hue_by = -5;	// In range [0, 360]
// let offset_all_colors_saturation_by = -5; // In range [0, 100]
// let offset_all_colors_value_by = 5; // In range [0, 100]
let offset_color_hue_by = -10;	// In range [0, 360]
let offset_all_colors_saturation_by = -5 + 3; // In range [0, 100]
let offset_all_colors_value_by = 8 - 12; // In range [0, 100]
// let offset_all_colors_value_by = -2; // In range [0, 100]
for (let color_name in colors) {
	// colors[color_name] = offset_hsv(colors[color_name], 0, 0, 0);
	colors[color_name] = offset_hsv(colors[color_name], offset_color_hue_by, offset_all_colors_saturation_by, offset_all_colors_value_by);
}

let color_scheme = {
	/** Used for app section's borders (and also as a "letterbox" for a non 16:9 aspect ratio) */
	"background": "#555558",
	/** Used as the background of each app section ("black" color) */
	"viewport_cells": "#0b0b0c",
	/** Used for text */
	"white": offset_saturation_and_value("#787881", 0, 10),
	"viewport_highlight_stroke_color": "#ffffffff",
	/** Color gradient used for vsualizing values percentages */
	"color_gradient": [
		// offset_saturation_and_value(colors.purple, 25, -33),		// Darker
		// offset_saturation_and_value(colors.purple, -22, 17),		// Lighter
		offset_saturation_and_value(colors.purple, 28, -32),		// Darker
		offset_saturation_and_value(colors.purple, -15, 25),		// Lighter
		// offset_saturation_and_value("#787881", 0, -20),		// Darker
		// offset_saturation_and_value("#787881", 0, 40),		// Lighter
	],
	/** Colors used for each tag category, in order ["Genres", "Sub-Genres", "Features"] */
	"tag_colors": [
		colors.red,			// Genres
		colors.green,		// Sub-Grenres
		colors.blue,		// Features
	]
}

// Offset HSV for colors in the "color_gradient" list (of the colors scheme)
let offset_hue = -5;
let offset_saturation = 0 + 2;
let offset_value = -10 + 8;
for (let i = 0; i < color_scheme["color_gradient"].length; i++) {
	color_scheme["color_gradient"][i] = offset_hsv(color_scheme["color_gradient"][i], offset_hue, offset_saturation, offset_value);
}

let initialized_app_state = false;

let TAG_NAMES_LIST = [];

let STATE = {
	/** All games respecting the given filters */
	"filtered_games": [

	],
	/**
	 * Object with ALL tag names as keys (sorted as "Features", "Sub-Genres" and "Genres", and, among all tags of a category, in the in the same order as TAG_NAMES_LIST) and the tag info attributes (most of them shown on parallel coordinate view)
	 *
	 * Ordering is the same as the TAG_NAMES_LIST list
	 *
	 * For each tag (each key) of this object, the value also contains the list of N point values (N is the number of bins, one per month of each year currently) for each attribute (e.g. "number_of_games", "total_revenue", ecc...) of the tag
	 */
	"all_tags_filter_infos": {},
	/** Contains a set of information for tags which will also include the filters on tags themselves (unlike the "all_tags_filter_infos" or "visualizatioo_states" objects of the STATE which do not take filters on tags into account to calculate tags information) */
	"filtered_results_tags_infos": {
		"number_of_games": {},
		"total_revenue": {},
		"average_revenue": {},
		"total_copies_sold": {},
		"average_copies_sold": {},
		"average_review_rating": {},
		"average_price": {},
		// Meta attribute
		"number_of_games_with_a_rating": {}
	},
	/** Visualization specific states */
	"visualization_states": {
		"RELEASED_GAMES_BY_LANGUAGE": {},
		"RELEASED_GAMES_BY_PLAYER_MODE": {},
		"RELEASED_GAMES_BY_CONTENT_RATING": {},
		"RELEASED_GAMES_BY_RELEASE_DATE": {},
		"RELEASED_GAMES_BY_COPIES_SOLD": {},
		"RELEASED_GAMES_BY_REVIEW_RATING": {},
		"RELEASED_GAMES_BY_PRICE": {},
		"TAGS_PARALLEL_COORDINATES": {},
		"TAGS_RANKING": {},
		"GAMES_RANKING": {
			/** Value in list ["release_date", "alphabetical", "price", "copies_sold", "revenue", "review_rating", "tags_relevance", "excluded"] */
			"current_sorting_criteria": "revenue",
			/** Value in list ["descending", "ascending"] */
			"current_sorting_type": "descending",
			/** Number representing the number of results currently shown in the visualization */
			"current_number_of_results": 10,
			/**
			 * Index of the last added result in the games results list shown in the visualization
			 *
			 * Used to continue iterating over the games results list when the user clicks on the "Show more" button
			 */
			"current_last_added_game_result_index": -1,
			/** Set of games that are excluded from the results (as indexes) */
			"excluded_games": new Set(),
		},
		"TAGS_SIMILARITY": {
			/** Value in list ["chord_diagram", "mds_plot", "tsne_plot"] representing the currently visible visualization */
			"active_visualization": "mds",
		},
		"TAGS_SCATTERPLOT": {
			"x_axis_attribute": "number_of_games",
			"y_axis_attribute": "total_revenue",
			"radius_attribute": "none",
			"use_x_axis_log_scale": true,
			"use_y_axis_log_scale": true
		},
		"TAGS_TIME_SERIES": {
			/**
			 * Active attribute to use as the key of STATE["all_tags_filter_infos"][tag_name]["list_of_point_values_by_attribute"][attribute_name] to get the current points list
			 *
			 * Contrary to the "active_attribute_secondary" of the STATE["TAGS_TIME_SERIES"] object, this attribute cannot be "none", as it is used to plot the main line of the time series visualization
			 */
			"active_attribute": "number_of_games",
			/**
			 * Active secondary attribute to use as the key of STATE["all_tags_filter_infos"][tag_name]["list_of_point_values_by_attribute"][attribute_name] to get the current points list
			 *
			 * Can also be "none" to indicate that no secondary line should be plotted (only the main one)
			 */
			"active_attribute_secondary": "none",
			/** The active time interval to group and visualize points for, one of ["day", "month", "quarter", "semester", "year"] */
			"time_interval": "month",
			/** Max bin value out of all tags for each attribute */
			"tags_time_series_max_values": {
				"number_of_games": 0,
				"total_revenue": 0,
				"average_revenue": 0,
				"total_copies_sold": 0,
				"average_copies_sold": 0,
				"average_review_rating": 0,
				"average_price": 0
			}
		},
		"TAGS_INFOS": {
			"tags_ranking_attribute": "alphabetical",
		}
	},
	/** Tag global infos (for filtered games) */
	"tag_global_infos": {
		"max_number_of_games": 0,
		"max_total_revenue": 0,
		"max_average_revenue": 0,
		"max_total_copies_sold": 0,
		"max_average_copies_sold": 0,
		"max_average_review_rating": 0,
		"max_average_price": 0,
	},
	/** Games global infos (for filtered games) */
	"games_global_infos": {
		// Max values
		"max_price": 0,
		"max_revenue": 0,
		"max_copies_sold": 0,
		"max_review_rating": 0,
		// Average values
		"average_price": 0,
		"average_revenue": 0,
		"average_copies_sold": 0,
		"average_review_rating": 0,
		// Total values
		"total_price": 0,	// Sum of all prices, used just to compute the average price
		"total_revenue": 0,
		"total_copies_sold": 0,
		"total_review_rating": 0,	// Sum of all review ratings, used just to compute the average review rating
		// Other values (used to compute averages)
		"number_of_games_with_a_rating": 0
	},
	/** ALL games infos (regardless of filtered games) */
	"all_games_infos": {
		// Average values
		"average_price": 0,
		"average_revenue": 0,
		"average_copies_sold": 0,
		"average_review_rating": 0,
		// Total values
		"total_revenue": 0,
		"total_copies_sold": 0,
	},

	/** List of tag names sorted by the various sorting criterias */
	"tags_ranking": {
		/** Sorting criteria currently active */
		"current_sorting_criteria": "number_of_games",
		/** Grouping criteria for the tags ranking (can be "none", "category" or "filters") */
		"current_grouping_criteria": "none",	// "none", "category", "filters"
		/** Lists of tag names and indexes sorted by the various sorting criterias */
		"tag_lists": {
			"number_of_games": [],
			"average_price": [],
			"total_copies_sold": [],
			"average_copies_sold": [],
			"total_revenue": [],
			"average_revenue": []
		},
		/** Set of tags to include (as names) */
		"tags_to_include": new Set(),
		/** Set of tags to exclude (as names) */
		"tags_to_exclude": new Set(),
	},
	// /** List of game indexes sorted by the various sorting criterias */
	// "indexed_games": {
	// 	/**
	// 	 * List of game indexes sorted by release date (descending)
	// 	 *
	// 	 * NOTE: All games in the "GAMES" object are already sorted by release date (descending)...
	// 	 */
	// 	"release_date": [],
	// 	/** List of game indexes sorted alphabetically (ascending) */
	// 	"alphabetical": [],
	// 	/** List of game indexes sorted by price (descending) */
	// 	"price": [],
	// 	/** List of game indexes sorted by copies sold (descending) */
	// 	"copies_sold": [],
	// 	/** List of game indexes sorted by revenue (descending) */
	// 	"revenue": [],
	// 	/** List of game indexes sorted by review rating (descending) */
	// 	"review_rating": []
	// },
}
function get_tag_name_by_index(tag_index) {
	return TAG_NAMES_LIST[tag_index];
}
function get_tag_index_by_name(tag_name) {
	return TAG_NAMES_LIST.indexOf(tag_name);
}
function get_tag_category_by_index(tag_index) {
	return STATE["all_tags_filter_infos"][get_tag_name_by_index(tag_index)]["category"];
	// let tag_categories = ["Features", "Sub-Genres", "Genres"];	// Order in which they appear in the TAGS_BY_CATEGORY object
	// let tag_category = "";
	// let tag_accumulator = 0;
	// for (let i = 0; i < tag_categories.length; i++) {
	// 	let current_tag_category = tag_categories[i];
	// 	let tag_accumulator_value = tag_accumulator + TAGS_BY_CATEGORY[current_tag_category].length;
	// 	if (tag_index < tag_accumulator_value) {
	// 		tag_category = current_tag_category;
	// 		break;
	// 	}
	// 	tag_accumulator += TAGS_BY_CATEGORY[current_tag_category].length;
	// }
	// if (tag_category == "") {
	// 	console.log("ERROR: Tag category not found for tag: " + get_tag_name_by_index(tag_index));
	// }
	// return tag_category;
}
function get_tag_cagtegory_by_name(tag_name) {
	return STATE["all_tags_filter_infos"][tag_name]["category"];
}

/** Total number of tags, hence also length of the STATE["all_tags_filter_infos"] object */
let TOTAL_NUMBER_OF_TAGS = undefined;
/** Total number of games, hence also length of the GAMES object */
let TOTAL_NUMBER_OF_GAMES = GAMES.length;

/* Tag attributes (in "filtered_tags") should be:
	- number of games
	- total revenue
	- average revenue
	- total copies sold
	- average copies sold
	- average review rating
	- average price

	- number_of_games_with_a_rating (dont show as a filter/rank criteria)
*/

let total_application_state_updates = 0;

/**
 * Get JSON data from the file at the given path or url
 */
function get_json_data(path_or_url) {
	let json_data = null;
	$.ajax({
		'async': false,
		'global': false,
		'url': path_or_url,
		'dataType': "json",
		'success': function (data) {
			json_data = data;
		}
	});
	return json_data;
}

let FILTERS = {
	// Category filters
	"LANGUAGES": LANGUAGES.slice(),	// Check if a game has at least one of the languages in the list
	"PLAYER_MODES": PLAYER_MODES.slice(),	// Check if a game has at least one of the player modes in the list
	"CONTENT_RATINGS": CONTENT_RATINGS.slice(),	// Check if a game has at least one of the content ratings in the list
	// Range filters
	"RELEASE_DATE": {	// Release date range to include in the visualization
		"min": "01/2017",
		"max": "12/2023"
	},
	"COPIES_SOLD": {	// Copies sold range to include in the visualization
		"min": 0,
		"max": -1
	},
	"REVIEW_RATING": {	// Review rating range to include in the visualization
		"min": "None",
		"max": "Over. Pos."
	},
	"PRICE": {	// Price range to include in the visualization
		"min": 0,
		"max": 1000
	},
	// Tag filters
	"TAGS": {
		"include_tags": [],	// Tags to include in the visualization
		"exclude_tags": []	// Tags to exclude in the visualization
	},
	// Excluded games (contains steam IDs of excluded games)
	"EXCLUDED_GAMES": []	// Games to exclude from the visualization
}

/**
 * MAIN Function to call whenever an interaction that should change app state and visualizations is performed
 *
 * Updates the "FILTERS" object based on the current visualization states in "STATE"
 */
function update_filters_based_on_visualization_states(update_app_state_in_the_end = true, update_visualizations_in_the_end = true) {
	// console.log(STATE["visualization_states"]);
	// Update release date
	let min_release_date = "01/2017";
	let max_release_date = "12/2023";
	let state_release_date_min = STATE["visualization_states"]["RELEASED_GAMES_BY_RELEASE_DATE"]["brush_start_value"];
	let state_release_date_max = STATE["visualization_states"]["RELEASED_GAMES_BY_RELEASE_DATE"]["brush_end_value"];
	if (state_release_date_min == null || state_release_date_min == undefined) state_release_date_min = min_release_date;
	if (state_release_date_max == null || state_release_date_max == undefined) state_release_date_max = max_release_date;
	FILTERS["RELEASE_DATE"]["min"] = state_release_date_min;
	FILTERS["RELEASE_DATE"]["max"] = state_release_date_max;
	// Update copies sold
	let min_copies_sold = 0;
	let max_copies_sold = -1;	// Use -1 to indicate no maximum value
	function get_copies_sold_vaule(bin_name, is_min) {
		// bin name could be "0", "1-99", "100-999", etc. or "0+", "1k+", "1M+", etc.
		if (bin_name == undefined || bin_name == null) return null;
		let bin_value = 0;
		if (bin_name == "0") {
			bin_value = 0;
		} else if (bin_name.endsWith("+")) {
			// Set this as if there was no maximum value
			bin_value = is_min ? parse_formatted_number_string(bin_name.substring(0, bin_name.length - 1)) : -1;
			// console.log("bin_name: " + bin_name + ", bin_value: " + bin_value);
		} else {
			bin_value = parse_formatted_number_string(bin_name.split("-")[is_min ? 0 : 1]);
		}
		return bin_value;
	}
	let state_copies_sold_min = get_copies_sold_vaule(STATE["visualization_states"]["RELEASED_GAMES_BY_COPIES_SOLD"]["brush_start_value"], true);
	let state_copies_sold_max = get_copies_sold_vaule(STATE["visualization_states"]["RELEASED_GAMES_BY_COPIES_SOLD"]["brush_end_value"], false);
	if (state_copies_sold_min == null || state_copies_sold_min == undefined) state_copies_sold_min = min_copies_sold;
	if (state_copies_sold_max == null || state_copies_sold_max == undefined) state_copies_sold_max = max_copies_sold;
	FILTERS["COPIES_SOLD"]["min"] = state_copies_sold_min;
	FILTERS["COPIES_SOLD"]["max"] = state_copies_sold_max;
	if (state_copies_sold_min == state_copies_sold_max && state_copies_sold_min != 0) {
		FILTERS["COPIES_SOLD"]["max"] = -1;
	}
	// Update review rating
	let min_review_rating = "None";
	let max_review_rating = "Over. Pos.";
	let state_review_rating_min = STATE["visualization_states"]["RELEASED_GAMES_BY_REVIEW_RATING"]["brush_start_value"];
	let state_review_rating_max = STATE["visualization_states"]["RELEASED_GAMES_BY_REVIEW_RATING"]["brush_end_value"];
	if (state_review_rating_min == null || state_review_rating_min == undefined) state_review_rating_min = min_review_rating;
	if (state_review_rating_max == null || state_review_rating_max == undefined) state_review_rating_max = max_review_rating;
	FILTERS["REVIEW_RATING"]["min"] = state_review_rating_min;
	FILTERS["REVIEW_RATING"]["max"] = state_review_rating_max;
	// Update price
	let min_price = 0;
	let max_price = -1;	// Use -1 to indicate no maximum value
	function get_price_value(bin_name, is_min) {
		// bin name could be "Free", "$0.01-$5", "$5.01-$10", etc.
		if (bin_name == undefined || bin_name == null) return null;
		let bin_value = 0;
		if (bin_name == "Free") {
			bin_value = 0;
		} else {
			let no_special_chars_string = bin_name.replaceAll("$", "");
			// console.log("no_special_chars_string: " + no_special_chars_string);
			bin_value = parse_formatted_number_string(no_special_chars_string.split("-")[is_min ? 0 : 1]);
		}
		// console.log("bin_name: " + bin_name + ", bin_value: " + bin_value);
		return bin_value;
	}
	let state_price_min = get_price_value(STATE["visualization_states"]["RELEASED_GAMES_BY_PRICE"]["brush_start_value"], true);
	let state_price_max = get_price_value(STATE["visualization_states"]["RELEASED_GAMES_BY_PRICE"]["brush_end_value"], false);
	if (state_price_min == null || state_price_min == undefined) state_price_min = min_price;
	if (state_price_max == null || state_price_max == undefined) state_price_max = max_price;
	FILTERS["PRICE"]["min"] = state_price_min;
	FILTERS["PRICE"]["max"] = state_price_max;
	if (state_price_min == state_price_max && state_price_min != 0) {
		FILTERS["PRICE"]["max"] = 1000;
	}
	// Update languages
	let languages = [];
	if (STATE["visualization_states"]["RELEASED_GAMES_BY_LANGUAGE"]["active"] != undefined) {
		for (let i = 0; i < STATE["visualization_states"]["RELEASED_GAMES_BY_LANGUAGE"]["active"].length; i++) {
			let language = STATE["visualization_states"]["RELEASED_GAMES_BY_LANGUAGE"]["active"][i];
			languages.push(language);
		}
	}
	// Set the filter value to all languages except the ones in the list
	FILTERS["LANGUAGES"] = LANGUAGES.filter(language => !languages.includes(language));
	// Update player modes
	let player_modes = [];
	if (STATE["visualization_states"]["RELEASED_GAMES_BY_PLAYER_MODE"]["active"] != undefined) {
		for (let i = 0; i < STATE["visualization_states"]["RELEASED_GAMES_BY_PLAYER_MODE"]["active"].length; i++) {
			let player_mode = STATE["visualization_states"]["RELEASED_GAMES_BY_PLAYER_MODE"]["active"][i];
			player_modes.push(player_mode);
		}
	}
	FILTERS["PLAYER_MODES"] = PLAYER_MODES.filter(player_mode => !player_modes.includes(player_mode));
	// Update content ratings
	let content_ratings = [];
	if (STATE["visualization_states"]["RELEASED_GAMES_BY_CONTENT_RATING"]["active"] != undefined) {
		for (let i = 0; i < STATE["visualization_states"]["RELEASED_GAMES_BY_CONTENT_RATING"]["active"].length; i++) {
			let content_rating = STATE["visualization_states"]["RELEASED_GAMES_BY_CONTENT_RATING"]["active"][i];
			content_ratings.push(content_rating);
		}
	}
	FILTERS["CONTENT_RATINGS"] = CONTENT_RATINGS.filter(content_rating => !content_ratings.includes(content_rating));
	// Update tags (include and exclude lists)
	FILTERS["TAGS"]["include_tags"] = Array.from(STATE["tags_ranking"]["tags_to_include"]);
	FILTERS["TAGS"]["exclude_tags"] = Array.from(STATE["tags_ranking"]["tags_to_exclude"]);

	// Empty all tag ranking lists
	for (let sorting_criteria in STATE["tags_ranking"]["tag_lists"]) {
		STATE["tags_ranking"]["tag_lists"][sorting_criteria] = [];
	}

	// Update excluded games
	let excluded_games_list = Array.from(STATE["visualization_states"]["GAMES_RANKING"]["excluded_games"]);
	FILTERS["EXCLUDED_GAMES"] = excluded_games_list.map(game_index => GAMES[game_index]["steam_id"]);

	// console.log("Updated filters: " + JSON.stringify(FILTERS));
	// console.log(FILTERS);

	// Update the app state (hence the visualization states, the games to filter, ecc...)
	if (update_app_state_in_the_end) {
		update_app_state(update_visualizations_in_the_end);
	}
}

/**
 * Returns true if the given game respects the given filters, false otherwise
 *
 * The given game must be an object {...}, as found in the GAMES list (e.g. pass "GAMES[index]" as a parameter)
 *
 * If exclude_filters is not empty, the filters included in the list won't be checked for the game
 *
 * The "exclude_filters" should include strings corresponding to the keys in the FILTERS object ("LANGUAGES", "PLAYER_MODES", "CONTENT_RATINGS", "RELEASE_DATE", "COPIES_SOLD", "REVIEW_RATING", "TAGS")
 *
 * If "check_all_filters" is true, all filters will be checked and the funcion will return an object indicating if the game respects all the filters, excluded filters and single filters, with the following structure:
 *
 *		{
 *			// List of filters that were excluded from the check
 *			"exclude_filters": [...],
 *			// True if the game respects all filters, regardless of the excluded filters
 *			"respects_all_filters": true,
 *			// True if the game respects all filters except the excluded ones
 *			"respects_all_filters_except_excluded": true,
 *			// Object indicating if the game respects the corresponding single filter (true if it does, false otherwise)
 *			"single_filter_results": {
 *				"LANGUAGES": true,
 *				"PLAYER_MODES": true,
 *				"CONTENT_RATINGS": true,
 *				"RELEASE_DATE": true,
 *				"COPIES_SOLD": true,
 *				"REVIEW_RATING": true,
 *				"PRICE": true,
 *				"TAGS": true,
 *				"EXCLUDED_GAMES": true
 *			}
 *		}
 *
 */
function game_respects_filters(game, exclude_filters = [], check_all_filters = false) {

	// Log all games that get excluded by the filters in the dev console if set to "true"
	let log_results = false;

	// Object to return indicating if the game respects the filters or not (regardless of the excluded filters)
	let game_respects_filters_object = {
		"exclude_filters": exclude_filters,	// List of filters that were excluded from the check
		"respects_all_filters": true,
		"respects_all_filters_except_excluded": true,
		"single_filter_results": {
			// Category filters
			"LANGUAGES": true,
			"PLAYER_MODES": true,
			"CONTENT_RATINGS": true,
			// Range filters
			"RELEASE_DATE": true,
			"COPIES_SOLD": true,
			"REVIEW_RATING": true,
			"PRICE": true,
			// Tag filters
			"TAGS": true,
			"EXCLUDED_GAMES": true
		}
	};

	// Check if the "exclude_filters" parameter is a string contained in the "single_filter_results" object
	if (exclude_filters.length > 0) {
		for (let i = 0; i < exclude_filters.length; i++) {
			let exclude_filter = exclude_filters[i];
			if (game_respects_filters_object["single_filter_results"][exclude_filter] == undefined) {
				console.log("ERROR: The filter \"" + exclude_filter + "\" to exclude from check is not a valid filter name");
				return undefined;
			}
		}
	}


	function set_game_does_not_respect_one_filter(filter_name) {
		game_respects_filters_object["respects_all_filters"] = false;
		if (!exclude_filters.includes(filter_name)) game_respects_filters_object["respects_all_filters_except_excluded"] = false;
		game_respects_filters_object["single_filter_results"][filter_name] = false;
	}

	// Check excluded games
	if (!exclude_filters.includes("EXCLUDED_GAMES") || check_all_filters) {
		// > If the game is in the list of excluded games, return false
		if (FILTERS["EXCLUDED_GAMES"].includes(game["steam_id"])) {
			if (log_results) console.log("~ FILTERING: Game " + game["name"] + " excluded because it's in the list of excluded games");
			// return false;
			set_game_does_not_respect_one_filter("EXCLUDED_GAMES");
		}
	}

	// Check tags
	if (!exclude_filters.includes("TAGS") || check_all_filters) {
		// > If the game contains any of the tags in the list of tags to exclude, return false
		if (game["tags"].length > 0) {
			// If the game has at least one tag, check if it or the others are in the list of tags to exclude
			if (FILTERS["TAGS"]["exclude_tags"].length > TAG_NAMES_LIST.length / 2) {
				// Lots of tags should be excluded, so it's faster to check if the game has any of them
				for (let i = 0; i < game["tags"].length; i++) {
					let tag_to_exclude = game["tags"][i];
					if (FILTERS["TAGS"]["exclude_tags"].includes(tag_to_exclude)) {
						if (log_results) console.log("~ FILTERING: Game " + game["name"] + " excluded because it has tag: " + tag_to_exclude);
						// return false;
						set_game_does_not_respect_one_filter("TAGS");
					}
				}
			} else {
				// List of tags to exclude is shorter than the list of all tags, so it's faster to check if the game has all of them
				for (let i = 0; i < FILTERS["TAGS"]["exclude_tags"].length; i++) {
					let tag_to_exclude = FILTERS["TAGS"]["exclude_tags"][i];
					if (game["tags"].includes(tag_to_exclude)) {
						if (log_results) console.log("~ FILTERING: Game " + game["name"] + " excluded because it has tag: " + tag_to_exclude);
						// return false;
						set_game_does_not_respect_one_filter("TAGS");
					}
				}
			}
		}
		// > If the game doesn't contain all the tags in the list of tags to include, return false
		let has_all_tags_to_include = true;
		if (game["tags"].length == 0 && FILTERS["TAGS"]["include_tags"].length > 0) {
			// If the game has no tags but some tags should be checked for, it doesn't respect the filter
			has_all_tags_to_include = false;
		} else {
			// If the game has at least one tag, check if it or the others are in the list of tags to include
			if (FILTERS["TAGS"]["include_tags"].length > game["tags"].length) {
				// Checking for a game that includes all N tags but has M<N tags, it cannot include all the N tags
				has_all_tags_to_include = false;
			} else if (FILTERS["TAGS"]["include_tags"].length > TAG_NAMES_LIST.length / 2) {
				// Lots of tags should be included, so it's faster to check if the game has all of them
				for (let i = 0; i < FILTERS["TAGS"]["include_tags"].length; i++) {
					let tag_to_include = FILTERS["TAGS"]["include_tags"][i];
					if (!game["tags"].includes(tag_to_include)) {
						has_all_tags_to_include = false;
						break;
					}
				}
			} else {
				// List of tags to include is shorter than the list of all tags, so it's faster to check if the game has all of them
				for (let i = 0; i < FILTERS["TAGS"]["include_tags"].length; i++) {
					let tag_to_include = FILTERS["TAGS"]["include_tags"][i];
					if (!game["tags"].includes(tag_to_include)) {
						has_all_tags_to_include = false;
						break;
					}
				}
			}
		}
		if (!has_all_tags_to_include) {
			if (log_results) console.log("~ FILTERING: Game " + game["name"] + " excluded because it doesn't have all the tags to include");
			// return false;
			set_game_does_not_respect_one_filter("TAGS");
		}
	}

	// Check release date
	// > If the game's release date is before the minimum release date or after the maximum release date, return false
	if (!exclude_filters.includes("RELEASE_DATE") || check_all_filters) {
		if (FILTERS["RELEASE_DATE"]["min"] == "01/2017" && FILTERS["RELEASE_DATE"]["max"] == "12/2023") {
			// No filter on release date is set, the game respects the filter
		} else {
			// Filter on release date is set, check if the game respects it
			let game_release_date = game["release_date"];
			let min_month = parseInt(FILTERS["RELEASE_DATE"]["min"].split("/")[0]);
			let min_year = parseInt(FILTERS["RELEASE_DATE"]["min"].split("/")[1]);
			let max_month = parseInt(FILTERS["RELEASE_DATE"]["max"].split("/")[0]);
			let max_year = parseInt(FILTERS["RELEASE_DATE"]["max"].split("/")[1]);
			if (game_release_date["year"] < min_year || (game_release_date["year"] == min_year && game_release_date["month"] < min_month)) {
				if (log_results) console.log("~ FILTERING: Game " + game["name"] + " excluded because it's release date is before the minimum release date (" + FILTERS["RELEASE_DATE"]["min"] + ")");
				// return false;
				set_game_does_not_respect_one_filter("RELEASE_DATE");
			}
			if (game_release_date["year"] > max_year || (game_release_date["year"] == max_year && game_release_date["month"] > max_month)) {
				if (log_results) console.log("~ FILTERING: Game " + game["name"] + " excluded because it's release date is after the maximum release date (" + FILTERS["RELEASE_DATE"]["max"] + ")");
				// return false;
				set_game_does_not_respect_one_filter("RELEASE_DATE");
			}
		}
	}
	// Check copies sold
	// > If the game's copies sold is before the minimum copies sold or after the maximum copies sold, return false
	if (!exclude_filters.includes("COPIES_SOLD") || check_all_filters) {
		if (FILTERS["COPIES_SOLD"]["min"] == 0 && FILTERS["COPIES_SOLD"]["max"] == -1) {
			// No filter on copies sold is set, the game respects the filter
		} else {
			if (FILTERS["COPIES_SOLD"]["min"] != -1 && game["copies_sold"] < FILTERS["COPIES_SOLD"]["min"]) {
				if (log_results) console.log("~ FILTERING: Game " + game["name"] + " excluded because it's copies sold is before the minimum copies sold (" + FILTERS["COPIES_SOLD"]["min"] + ")");
				// return false;
				set_game_does_not_respect_one_filter("COPIES_SOLD");
			}
			if (FILTERS["COPIES_SOLD"]["max"] != -1 && game["copies_sold"] > FILTERS["COPIES_SOLD"]["max"]) {
				if (log_results) console.log("~ FILTERING: Game " + game["name"] + " excluded because it's copies sold is after the maximum copies sold (" + FILTERS["COPIES_SOLD"]["max"] + ")");
				// return false;
				set_game_does_not_respect_one_filter("COPIES_SOLD");
			}
		}
	}
	// Check review rating
	// > If the game's review rating is before the minimum review rating or after the maximum review rating, return false
	if (!exclude_filters.includes("REVIEW_RATING") || check_all_filters) {
		if (FILTERS["REVIEW_RATING"]["min"] == "None" && FILTERS["REVIEW_RATING"]["max"] == "Over. Pos.") {
			// No filter on review rating is set, the game respects the filter
		} else {
			// let review_rating_bins = [[0, 19], [20, 39], [40, 69], [70, 79], [80, 94], [95, 100]];
			let reviews_rating_conversions = {
				"None": [-1, -1],
				"Negative": [0, 19],
				"Mostly Neg.": [20, 39],
				"Mixed": [40, 69],
				"Mostly Pos.": [70, 79],
				"Very Pos.": [80, 94],
				"Over. Pos.": [95, 100]
			}
			let game_rating = -1;
			let min_number_of_reviews_for_the_game_to_have_a_rating = 0;	// Should be 10 but leads to bad visual results...
			if (game["positive_reviews"] + game["negative_reviews"] > min_number_of_reviews_for_the_game_to_have_a_rating) {
				game_rating = Math.round((game["positive_reviews"] / (game["positive_reviews"] + game["negative_reviews"])) * 100);
			}
			let min_rating = reviews_rating_conversions[FILTERS["REVIEW_RATING"]["min"]][0];
			let max_rating = reviews_rating_conversions[FILTERS["REVIEW_RATING"]["max"]][1];
			if (min_rating == -1 && max_rating == -1) {
				// Only include games with a rating equal to "None"
				if (game_rating != -1) {
					if (log_results) console.log("~ FILTERING: Game " + game["name"] + " excluded because it's review rating is not equal to \"None\" and the filter is set to only include games with a rating equal to \"None\"");
					// return false;
					set_game_does_not_respect_one_filter("REVIEW_RATING");
				}
			} else {
				// Include games with a rating in the range [min_rating, max_rating]
				if (game_rating < min_rating || game_rating > max_rating) {
					// Game rating is not in the range [min_rating, max_rating]
					if (log_results) console.log("~ FILTERING: Game " + game["name"] + " excluded because it's review rating is not in the range [" + min_rating + ", " + max_rating + "]");
					// return false;
					set_game_does_not_respect_one_filter("REVIEW_RATING");
				}
			}
		}
	}
	// Check price
	// > If the game's price is before the minimum price or after the maximum price, return false
	if (!exclude_filters.includes("PRICE") || check_all_filters) {
		if (FILTERS["PRICE"]["min"] == 0 && FILTERS["PRICE"]["max"] == 1000) {
			// No filter on price is set, the game respects the filter
		} else {
			if (FILTERS["PRICE"]["min"] != -1 && game["price"] < FILTERS["PRICE"]["min"]) {
				if (log_results) console.log("~ FILTERING: Game " + game["name"] + " excluded because it's price is before the minimum price (" + FILTERS["PRICE"]["min"] + ")");
				// return false;
				set_game_does_not_respect_one_filter("PRICE");
			}
			if (FILTERS["PRICE"]["max"] != -1 && game["price"] > FILTERS["PRICE"]["max"]) {
				if (log_results) console.log("~ FILTERING: Game " + game["name"] + " excluded because it's price is after the maximum price (" + FILTERS["PRICE"]["max"] + ")");
				// return false;
				set_game_does_not_respect_one_filter("PRICE");
			}
		}
	}

	// Check languages
	// > Check if the game has at least one of the language in the list of languages to include
	if (!exclude_filters.includes("LANGUAGES") || check_all_filters) {
		let has_at_least_one_language = false;
		if (FILTERS["LANGUAGES"].length == 0) {
			// If no filter on languages is set, the game respects the filter
			has_at_least_one_language = true;
		} else {
			// Remove all game languages that are not in the LANGUAGES list
			let actual_game_languages = game["languages"].filter(language => LANGUAGES.includes(language));
			if (actual_game_languages.length == 0) {
				// Default to "English" if the game has no languages set...
				actual_game_languages = ["English"];
			}
			for (let i = 0; i < FILTERS["LANGUAGES"].length; i++) {
				if (actual_game_languages.includes(FILTERS["LANGUAGES"][i])) {
					has_at_least_one_language = true;
					break;
				}
			}
		}
		if (!has_at_least_one_language) {
			if (log_results) console.log("~ FILTERING: Game " + game["name"] + " excluded because it doesn't have any of the languages in the list of languages to include");
			// return false;
			set_game_does_not_respect_one_filter("LANGUAGES");
		}

	}
	// Check player modes
	// > Check if the game has at least one of the player modes in the list of player modes to include
	if (!exclude_filters.includes("PLAYER_MODES") || check_all_filters) {
		let has_at_least_one_player_mode = false;
		if (FILTERS["PLAYER_MODES"].length == 0) {
			// If no filter on player modes is set, the game respects the filter
			has_at_least_one_player_mode = true;
		} else {
			let actual_game_player_modes = game["player_mode"].filter(player_mode => PLAYER_MODES.includes(player_mode));
			if (actual_game_player_modes.length == 0) {
				// Default to "Single-player" if the game has no player modes set...
				actual_game_player_modes = ["Single-player"];
			}
			for (let i = 0; i < FILTERS["PLAYER_MODES"].length; i++) {
				if (actual_game_player_modes.includes(FILTERS["PLAYER_MODES"][i])) {
					has_at_least_one_player_mode = true;
					break;
				}
			}
		}
		if (!has_at_least_one_player_mode) {
			if (log_results) console.log("~ FILTERING: Game " + game["name"] + " excluded because it doesn't have any of the player modes in the list of player modes to include");
			// return false;
			set_game_does_not_respect_one_filter("PLAYER_MODES");
		}

	}
	// Check content ratings
	// > Check if the game has at least one of the content ratings in the list of content ratings to include
	if (!exclude_filters.includes("CONTENT_RATINGS") || check_all_filters) {
		let has_at_least_one_content_rating = false;
		if (FILTERS["CONTENT_RATINGS"].length == 0) {
			// If no filter on content ratings is set, the game respects the filter
			has_at_least_one_content_rating = true;
		} else {
			let actual_game_content_rating = game["content_rating"].filter(content_rating => CONTENT_RATINGS.includes(content_rating));
			if (actual_game_content_rating.length == 0) {
				actual_game_content_rating = ["No rating"];
			}
			for (let i = 0; i < FILTERS["CONTENT_RATINGS"].length; i++) {
				if (actual_game_content_rating.includes(FILTERS["CONTENT_RATINGS"][i])) {
					has_at_least_one_content_rating = true;
					break;
				}
			}
		}
		if (!has_at_least_one_content_rating) {
			if (log_results) console.log("~ FILTERING: Game " + game["name"] + " excluded because it doesn't have any of the content ratings in the list of content ratings to include");
			// return false;
			set_game_does_not_respect_one_filter("CONTENT_RATINGS");
		}
	}

	if (check_all_filters) {
		// Return the object indicating if the game respects the filters or not
		return game_respects_filters_object;
	} else {
		// Return true if the game respects all the filters (except the excluded ones), false otherwise
		return game_respects_filters_object["respects_all_filters_except_excluded"];
	}

}

/**
 * Given a filter object returned by the "game_respects_filters" function, return true if the game respects all the filters (except the excluded ones), false otherwise
 */
function game_respects_filters_from_check_filter_object(check_filter_object, exclude_filters = []) {
	if (check_filter_object == undefined || check_filter_object == null) {
		console.log("ERROR: check_filter_object is undefined or null");
		return false;
	}
	let to_ret = true;
	// If the check_filter_object's excluded filters list is the same as the given one, return the result of the check_filter_object
	let same_exclude_filters = false;
	if (check_filter_object["exclude_filters"].length == exclude_filters.length) {
		same_exclude_filters = true;
		for (let i = 0; i < check_filter_object["exclude_filters"].length; i++) {
			if (!exclude_filters.includes(check_filter_object["exclude_filters"][i])) {
				same_exclude_filters = false;
				break;
			}
		}
	}
	if (same_exclude_filters) {
		to_ret = check_filter_object["respects_all_filters_except_excluded"];
	} else {
		// For each filter in check_filter_object["single_filter_results"], check if the game respects it
		let check_filters_order = ["EXCLUDED_GAMES", "TAGS", "RELEASE_DATE", "COPIES_SOLD", "REVIEW_RATING", "PRICE", "LANGUAGES", "PLAYER_MODES", "CONTENT_RATINGS"];
		for (let i = 0; i < check_filters_order.length; i++) {
			let filter_name = check_filters_order[i];
			if (!exclude_filters.includes(filter_name)) {
				if (!check_filter_object["single_filter_results"][filter_name]) {
					// The game doesn't respect the filter
					to_ret = false;
					break;
				}
			}
		}
	}
	return to_ret;
}

/**
 * Interploates between value1 and value2 based on the given t value (in range [0, 1])
 */
function interpolate_between_values(value1, value2, t, clamp_t = true) {
	if (clamp_t) t = Math.max(0, Math.min(1, t));
	return value1 + (value2 - value1) * t;
}

/**
 * Given a value t inside the range [value1, value2], return the corresponding value inside the range [0, 1]
 */
function reverse_interpolate_between_values(value1, value2, t, clamp_t = true) {
	if (clamp_t) t = Math.max(value1, Math.min(value2, t));
	return (t - value1) / (value2 - value1);
}

/**
 * Given a hex color string, return an object with the rgb values (in range [0, 255])
 *
 * Accepts hex in the format "#RRGGBB" (or "RRGGBB")
 */
function hexToRgb(hex) {
	var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
	return result ? {
		r: parseInt(result[1], 16),
		g: parseInt(result[2], 16),
		b: parseInt(result[3], 16)
	} : null;
}

/**
 * Given a hex color string, return an object with the hsv values (in range [0, 360], [0, 100], [0, 100])
 *
 * Accepts hex in the format "#RRGGBB" (or "RRGGBB")
 */
function hexToHsv(hex) {
	let rgb = hexToRgb(hex);
	// console.log("rgb: " + JSON.stringify(rgb));
	return rgbToHsv(rgb.r, rgb.g, rgb.b);
}

/**
 * Given the rgb components of a color, return the corresponding hex color string
 *
 * Accepts r, g, b in range [0, 255]
 */
function rgbToHex(r, g, b) {
	function componentToHex(c) {
		var hex = c.toString(16);
		return hex.length == 1 ? "0" + hex : hex;
	}
	return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
}

/**
 * Given an rgb color string, return the h, s, v components (in range [0, 360], [0, 100], [0, 100])
 *
 * Accepts r, g, b in range [0, 255]
 */
function rgbToHsv(r, g, b) {
	let rabs, gabs, babs, rr, gg, bb, h, s, v, diff, diffc, percentRoundFn;
	rabs = r / 255;
	gabs = g / 255;
	babs = b / 255;
	v = Math.max(rabs, gabs, babs),
		diff = v - Math.min(rabs, gabs, babs);
	diffc = c => (v - c) / 6 / diff + 1 / 2;
	percentRoundFn = num => Math.round(num * 100) / 100;
	if (diff == 0) {
		h = s = 0;
	} else {
		s = diff / v;
		rr = diffc(rabs);
		gg = diffc(gabs);
		bb = diffc(babs);

		if (rabs === v) {
			h = bb - gg;
		} else if (gabs === v) {
			h = (1 / 3) + rr - bb;
		} else if (babs === v) {
			h = (2 / 3) + gg - rr;
		}
		if (h < 0) {
			h += 1;
		} else if (h > 1) {
			h -= 1;
		}
	}
	return {
		h: Math.round(h * 360),
		s: Math.round(percentRoundFn(s * 100)),
		v: Math.round(percentRoundFn(v * 100))
	};
}

/**
 * Given an hsv color string, return the r, g, b components (in range [0, 255])
 *
 * Accepts h in range [0, 360], s and v in range [0, 100]
 */
function hsvToRgb(h, s, v) {
	// Convert s and v to the range [0, 1]
	s /= 100;
	v /= 100;
	let f = (n, k = (n + h / 60) % 6) => v - v * s * Math.max(Math.min(k, 4 - k, 1), 0);
	return {
		r: Math.round(f(5) * 255),
		g: Math.round(f(3) * 255),
		b: Math.round(f(1) * 255)
	};
}

/**
 * Given a color hex string, return a new color hex string with the given saturation and value offsets
 *
 * Accepts hex in the format "#RRGGBB" (or "RRGGBB")
 *
 * Offsets refers to ranges [0, 100] for saturation and value
 */
function offset_saturation_and_value(color_hex_string, saturation_offset = 0, value_offset = 0) {
	return offset_hsv(color_hex_string, 0, saturation_offset, value_offset);
}

/**
 * Given a color hex string, return a new color hex string with the given hue, saturation and value offsets
 *
 * Accepts hex in the format "#RRGGBB" (or "RRGGBB")
 *
 * Offsets refers to ranges [0, 360] for hue, [0, 100] for saturation and value
 */
function offset_hsv(color_hex_string, h_offset = 0, s_offset = 0, v_offset = 0) {
	let hsv = hexToHsv(color_hex_string);
	// console.log("hsv: " + JSON.stringify(hsv));
	hsv.h += h_offset;
	hsv.s += s_offset;
	hsv.v += v_offset;
	// Clamp the values to the range [0, 100]
	hsv.h = Math.min(Math.max(hsv.h, 0), 360);
	hsv.s = Math.min(Math.max(hsv.s, 0), 100);
	hsv.v = Math.min(Math.max(hsv.v, 0), 100);
	let rgb = hsvToRgb(hsv.h, hsv.s, hsv.v);
	// console.log("rgb: " + JSON.stringify(rgb));
	return rgbToHex(rgb.r, rgb.g, rgb.b);
}

const FORMATTED_NUMBER_SEPARATOR = "\u2009";

/**
 * Given a number, return a string with the number formatted as "Nk", "NM", "NB", etc.
 */
function format_number_string(number, decimal_digits = 1) {
	// Convert number from int to float
	let number_2 = parseFloat(number.toString());
	// If the number of decimal digits to show for the number, plus 1, is equal to the total number of digits in the number, round the number to the nearest integer
	if (decimal_digits + 3 >= Math.floor(number_2).toString().length) {
		let toRet = number_2.toFixed(2).toString();
		if (toRet.endsWith(".00")) {
			toRet = toRet.substring(0, toRet.length - 3);
		} else if (toRet.endsWith(".0")) {
			toRet = toRet.substring(0, toRet.length - 2);
		} else if (toRet.endsWith(".")) {
			toRet = toRet.substring(0, toRet.length - 1);
		} else if (toRet.endsWith("0")) {
			toRet = toRet.substring(0, toRet.length - 1);
		}
		// Add a separator every 3 characters from right (only to the left of the decimal point)
		let separator = FORMATTED_NUMBER_SEPARATOR;
		let toRet_2 = "";
		let integer_part = toRet;
		let decimal_part = "";
		if (toRet.split(".").length > 1) {
			integer_part = toRet.split(".")[0];
			decimal_part = toRet.split(".")[1];
		}
		for (let i = integer_part.length - 1; i >= 0; i--) {
			toRet_2 = integer_part[i] + toRet_2;
			if ((integer_part.length - i) % 3 == 0 && i != 0) {
				toRet_2 = separator + toRet_2;
			}
		}
		if (toRet_2.startsWith(separator)) {
			toRet_2 = toRet_2.substring(1);
		}
		return toRet_2 + (decimal_part == "" ? "" : "." + decimal_part);
	} else {
		let suffixes = ["", "k", "M", "B", "T"];
		let suffix_index = 0;
		// Note that shis way 99999 will be formatted as "100k" instead of "99.9k"...
		while (number_2 >= 1000.0) {
			number_2 = number_2 / 1000.0;
			suffix_index++;
		}

		let number_string = Math.floor(number_2).toString() + "." + Math.floor((number_2 - Math.floor(number_2)) * Math.pow(10, decimal_digits)).toString().padStart(decimal_digits, "0");
		// if (number_string.endsWith(".0")) {
		if (number_string.endsWith(`.${"0".repeat(decimal_digits)}`)) {
			number_string = number_string.substring(0, number_string.length - 1 - decimal_digits);
		}
		return number_string + suffixes[suffix_index];
	}
}

/**
 * Given a string with a number formatted as "N.xk", "N.xM", "N.xB", etc. return the number as a float
 */
function parse_formatted_number_string(number_string) {
	let suffixes = ['', 'k', 'M', 'B', 'T'];
	let suffix_index = 0;
	// Remove any FORMATTED_NUMBER_SEPARATOR from the number string
	number_string = number_string.replaceAll(FORMATTED_NUMBER_SEPARATOR, "");
	for (let i = 0; i < suffixes.length; i++) {
		if (number_string[number_string.length - 1] == suffixes[i]) {
			suffix_index = i;
			break;
		}
	}
	let number_string_without_suffix = number_string.substring(0, number_string.length - suffixes[suffix_index].length);
	let number = parseFloat(number_string_without_suffix);
	for (let i = 0; i < suffix_index; i++) {
		number *= 1000.0;
	}
	// console.log("number_string: " + number_string + ", number: " + number, ", suffix_index: " + suffix_index);
	return number;
}

/**
 * Cycle through all games and update the "STATE" variable.
 *
 * Returns true if the application state was updated successfully, false otherwise.
 */
function update_app_state(update_visualizations_in_the_end = false) {

	// Increase the total number of application state updates and keep track of the current number of application state updates for this update iteration
	total_application_state_updates++;
	let current_number_of_application_state_updates = total_application_state_updates;

	console.log("Updating the application state (" + current_number_of_application_state_updates + ")...");

	STATE["filtered_games"] = [];

	// Functions and values for filters visualizatoin
	let copies_sold_bins = [[0], [1, 99], [100, 999], [1000, 9999], [10000, 99999], [100000, 999999], [1000000]];
	function get_copies_sold_bin_string(bin_index) {
		if (copies_sold_bins[bin_index].length == 1) {
			if (copies_sold_bins[bin_index][0] == 0) {
				return "0";
			} else {
				return format_number_string(copies_sold_bins[bin_index][0]) + "+";
			}
		} else {
			// return copies_sold_bins[bin_index][0] + "-" + copies_sold_bins[bin_index][1];
			// Return the string as "1k" instead of "1000", "1M" instead of "1000000", etc.
			return format_number_string(copies_sold_bins[bin_index][0]) + "-" + format_number_string(copies_sold_bins[bin_index][1]);

		}
	}
	let years = [2017, 2018, 2019, 2020, 2021, 2022, 2023];
	function get_release_date_bin_string(use_month_string, year, month) {
		if (!use_month_string) return year.toString();
		else return month.toString().padStart(2, "0") + "/" + year.toString();
	}
	let review_rating_bins = [[0, 19], [20, 39], [40, 69], [70, 79], [80, 94], [95, 100]];
	function get_review_rating_bin_string(bin_index) {
		let bin_names = ["Negative", "Mostly Neg.", "Mixed", "Mostly Pos.", "Very Pos.", "Over. Pos."];
		let toRet = bin_names[bin_index];
		if (toRet == undefined) {
			toRet = "None";
		}
		return toRet;
	}
	// let price_bins = [[0], [0, 5], [5, 10], [10, 20], [20, 30], [30, 50], [50, 70], [70, 1000]];
	let price_bins = [[0], [0, 5], [5, 10], [10, 15], [15, 20], [20, 25], [25, 30], [30, 35], [35, 40], [40, 45], [45, 50], [50, 55], [55, 60], [60, 65], [65, 70], [70, 1000]];
	function get_price_bin_string(bin_index) {
		if (price_bins[bin_index].length == 1) {
			if (price_bins[bin_index][0] == 0) {
				return "Free";
			} else {
				return "$" + price_bins[bin_index][0] + "+";
			}
		} else {
			let price_start_string = (price_bins[bin_index][0] + 0.01).toString();
			let price_end_string = price_bins[bin_index][1].toString();
			if (price_end_string == "1000") {
				price_end_string = "1k";
			}
			// return "$" + (price_bins[bin_index][0] + 0.01).toString() + "-" + price_bins[bin_index][1].toString();
			return "$" + price_start_string + "-$" + price_end_string;
		}
	}

	// Initialize the language bins
	STATE["visualization_states"]["RELEASED_GAMES_BY_LANGUAGE"]["total_games_based_on_other_filters"] = 0;
	if (STATE["visualization_states"]["RELEASED_GAMES_BY_LANGUAGE"]["bins"] == undefined) STATE["visualization_states"]["RELEASED_GAMES_BY_LANGUAGE"]["bins"] = {};
	for (let i = 0; i < LANGUAGES.length; i++) {
		STATE["visualization_states"]["RELEASED_GAMES_BY_LANGUAGE"]["bins"][LANGUAGES[i]] = 0;
	}
	// Initialize the player mode bins
	STATE["visualization_states"]["RELEASED_GAMES_BY_PLAYER_MODE"]["total_games_based_on_other_filters"] = 0;
	if (STATE["visualization_states"]["RELEASED_GAMES_BY_PLAYER_MODE"]["bins"] == undefined) STATE["visualization_states"]["RELEASED_GAMES_BY_PLAYER_MODE"]["bins"] = {};
	for (let i = 0; i < PLAYER_MODES.length; i++) {
		STATE["visualization_states"]["RELEASED_GAMES_BY_PLAYER_MODE"]["bins"][PLAYER_MODES[i]] = 0;
	}
	// Initialize the content rating bins
	STATE["visualization_states"]["RELEASED_GAMES_BY_CONTENT_RATING"]["total_games_based_on_other_filters"] = 0;
	if (STATE["visualization_states"]["RELEASED_GAMES_BY_CONTENT_RATING"]["bins"] == undefined) STATE["visualization_states"]["RELEASED_GAMES_BY_CONTENT_RATING"]["bins"] = {};
	for (let i = 0; i < CONTENT_RATINGS.length; i++) {
		STATE["visualization_states"]["RELEASED_GAMES_BY_CONTENT_RATING"]["bins"][CONTENT_RATINGS[i]] = 0;
	}

	// Initialize visualization bins
	// Release date bins
	STATE["visualization_states"]["RELEASED_GAMES_BY_RELEASE_DATE"]["total_games_based_on_other_filters"] = 0;
	if (STATE["visualization_states"]["RELEASED_GAMES_BY_RELEASE_DATE"]["month_bins"] == undefined) STATE["visualization_states"]["RELEASED_GAMES_BY_RELEASE_DATE"]["month_bins"] = {};
	if (STATE["visualization_states"]["RELEASED_GAMES_BY_RELEASE_DATE"]["year_bins"] == undefined) STATE["visualization_states"]["RELEASED_GAMES_BY_RELEASE_DATE"]["year_bins"] = {};
	if (STATE["visualization_states"]["RELEASED_GAMES_BY_RELEASE_DATE"]["month_bins"]["bins"] == undefined) STATE["visualization_states"]["RELEASED_GAMES_BY_RELEASE_DATE"]["month_bins"]["bins"] = {};
	if (STATE["visualization_states"]["RELEASED_GAMES_BY_RELEASE_DATE"]["year_bins"]["bins"] == undefined) STATE["visualization_states"]["RELEASED_GAMES_BY_RELEASE_DATE"]["year_bins"]["bins"] = {};
	for (let i = 0; i < years.length; i++) {
		let year = years[i];
		for (let month = 1; month <= 12; month++) {
			let release_date_bin_string = get_release_date_bin_string(true, year, month);
			STATE["visualization_states"]["RELEASED_GAMES_BY_RELEASE_DATE"]["month_bins"]["bins"][release_date_bin_string] = 0;
		}
		let release_date_bin_string = get_release_date_bin_string(false, year, -1);
		STATE["visualization_states"]["RELEASED_GAMES_BY_RELEASE_DATE"]["year_bins"]["bins"][release_date_bin_string] = 0;
	}
	// Initialize the release date bins for both years and months
	// Copies sold bins
	STATE["visualization_states"]["RELEASED_GAMES_BY_COPIES_SOLD"]["total_games_based_on_other_filters"] = 0;
	if (STATE["visualization_states"]["RELEASED_GAMES_BY_COPIES_SOLD"]["bins"] == undefined) STATE["visualization_states"]["RELEASED_GAMES_BY_COPIES_SOLD"]["bins"] = {};
	for (let i = 0; i < copies_sold_bins.length; i++) {
		let copies_sold_bin_string = get_copies_sold_bin_string(i);
		STATE["visualization_states"]["RELEASED_GAMES_BY_COPIES_SOLD"]["bins"][copies_sold_bin_string] = 0;
	}
	// Review rating bins
	STATE["visualization_states"]["RELEASED_GAMES_BY_REVIEW_RATING"]["total_games_based_on_other_filters"] = 0;
	if (STATE["visualization_states"]["RELEASED_GAMES_BY_REVIEW_RATING"]["bins"] == undefined) STATE["visualization_states"]["RELEASED_GAMES_BY_REVIEW_RATING"]["bins"] = {};
	STATE["visualization_states"]["RELEASED_GAMES_BY_REVIEW_RATING"]["bins"]["None"] = 0;
	for (let i = 0; i < review_rating_bins.length; i++) {
		let review_rating_bin_string = get_review_rating_bin_string(i);
		STATE["visualization_states"]["RELEASED_GAMES_BY_REVIEW_RATING"]["bins"][review_rating_bin_string] = 0;
	}
	// Price bins
	STATE["visualization_states"]["RELEASED_GAMES_BY_PRICE"]["total_games_based_on_other_filters"] = 0;
	if (STATE["visualization_states"]["RELEASED_GAMES_BY_PRICE"]["bins"] == undefined) STATE["visualization_states"]["RELEASED_GAMES_BY_PRICE"]["bins"] = {};
	for (let i = 0; i < price_bins.length; i++) {
		let price_bin_string = get_price_bin_string(i);
		STATE["visualization_states"]["RELEASED_GAMES_BY_PRICE"]["bins"][price_bin_string] = 0;
	}

	// Initialize tags
	STATE["all_tags_filter_infos"] = {};
	let tag_categories = ["Genres", "Sub-Genres", "Features"];
	for (let j = 0; j < tag_categories.length; j++) {
		let category_index = tag_categories.length - j - 1;
		for (let i = 0; i < TAGS_BY_CATEGORY[tag_categories[category_index]].length; i++) {

			let index_reverse = TAGS_BY_CATEGORY[tag_categories[category_index]].length - i - 1;

			let tag = TAGS_BY_CATEGORY[tag_categories[category_index]][index_reverse]["name"];

			/* Tag attributes (in "filtered_tags") should be:
			- number of games
			- total revenue
			- average revenue
			- total copies sold
			- average copies sold
			- average review rating
			- average price

			- number_of_games_with_a_rating (dont show as a filter/rank criteria)
			*/
			STATE["all_tags_filter_infos"][tag] = {
				/** Category of the tag */
				"category": tag_categories[category_index],
				// Main attributes
				"number_of_games": 0,
				"total_revenue": 0,
				"average_revenue": 0,
				"total_copies_sold": 0,
				"average_copies_sold": 0,
				"average_review_rating": 0,
				"average_price": 0,
				// Used to temporarily store the total number of games with a rating (to calculate average rating)
				"number_of_games_with_a_rating": 0,
				/** Lists of bins to consider for the tag's time series */
				"list_of_point_values_by_attribute": {
					"number_of_games": {},
					"total_revenue": {},
					"average_revenue": {},
					"total_copies_sold": {},
					"average_copies_sold": {},
					"average_review_rating": {},
					"average_price": {},
					"number_of_games_with_a_rating": {}
				}
			};

			// Initialize the STATE["filtered_results_tags_infos"] object
			STATE["filtered_results_tags_infos"]["number_of_games"][tag] = 0;
			STATE["filtered_results_tags_infos"]["total_revenue"][tag] = 0;
			STATE["filtered_results_tags_infos"]["average_revenue"][tag] = 0;
			STATE["filtered_results_tags_infos"]["total_copies_sold"][tag] = 0;
			STATE["filtered_results_tags_infos"]["average_copies_sold"][tag] = 0;
			STATE["filtered_results_tags_infos"]["average_review_rating"][tag] = 0;
			STATE["filtered_results_tags_infos"]["average_price"][tag] = 0;
			STATE["filtered_results_tags_infos"]["number_of_games_with_a_rating"][tag] = 0;

			// Add the tag to the TAG_NAMES_LIST
			if (!initialized_app_state) {
				TAG_NAMES_LIST.push(tag);
			}
		}
	}

	// Initialize STATE["tag_global_infos"]
	STATE["tag_global_infos"] = {
		"max_number_of_games": 0,
		"max_total_revenue": 0,
		"max_average_revenue": 0,
		"max_total_copies_sold": 0,
		"max_average_copies_sold": 0,
		"max_average_review_rating": 0,
		"max_average_price": 0,
	};
	// Initialize STATE["games_global_infos"]
	STATE["games_global_infos"] = {
		// Max values
		"max_price": 0,
		"max_revenue": 0,
		"max_copies_sold": 0,
		"max_review_rating": 0,
		// Average values
		"average_price": 0,
		"average_revenue": 0,
		"average_copies_sold": 0,
		"average_review_rating": 0,
		// Total values
		"total_price": 0,
		"total_revenue": 0,
		"total_copies_sold": 0,
		"total_review_rating": 0,
		// Other values (used to compute averages)
		"number_of_games_with_a_rating": 0
	};


	let tags_time_series_current_index = 0;

	// Iterate over all games
	for (let i = 0; i < TOTAL_NUMBER_OF_GAMES; i++) {

		// Interrupt the application state update if the number of application state updates changed
		if (total_application_state_updates != current_number_of_application_state_updates) {
			console.log(">>>>> Application state update interrupted");
			return false;
		}

		// Get the current game
		let game = GAMES[i];

		// Get an object with keys and values indicating if the game respects all / each filter or not
		let game_respects_filters_object = game_respects_filters(game, [], true);
		// console.log(
		// 	"game_respects_filters_object:\n" + JSON.stringify(game_respects_filters_object, null, 2) + "\n" +
		// 	"game_respects_filters_from_check_filter_object(game_respects_filters_object, ['TAGS', 'RELEASE_DATE']) = " + game_respects_filters_from_check_filter_object(game_respects_filters_object, ["TAGS", "RELEASE_DATE"])
		// );

		let game_respects_all_filters = game_respects_filters_from_check_filter_object(game_respects_filters_object);

		// Add the game to the filtered games and update games global infos
		if (game_respects_all_filters) {
			// if (game_respects_filters(game)) {
			// Add the game to the filtered games
			STATE["filtered_games"].push(game);
			// Update the max values for the global games info
			if (game["price"] > STATE["games_global_infos"]["max_price"]) STATE["games_global_infos"]["max_price"] = game["price"];
			if (game["revenue"] > STATE["games_global_infos"]["max_revenue"]) STATE["games_global_infos"]["max_revenue"] = game["revenue"];
			if (game["copies_sold"] > STATE["games_global_infos"]["max_copies_sold"]) STATE["games_global_infos"]["max_copies_sold"] = game["copies_sold"];
			let total_reviews = game["positive_reviews"] + game["negative_reviews"];
			if (total_reviews > 0) {
				if (game["positive_reviews"] / total_reviews > STATE["games_global_infos"]["max_review_rating"]) STATE["games_global_infos"]["max_review_rating"] = game["positive_reviews"] / total_reviews;
			}
			// Update the total values (plus the "number of games with a rating" meta value) for the global games info
			STATE["games_global_infos"]["total_price"] += game["price"];
			STATE["games_global_infos"]["total_revenue"] += game["revenue"];
			STATE["games_global_infos"]["total_copies_sold"] += game["copies_sold"];
			if (total_reviews > 0) {
				STATE["games_global_infos"]["total_review_rating"] += game["positive_reviews"] / total_reviews;
				STATE["games_global_infos"]["number_of_games_with_a_rating"] += 1;
			}
		}

		// Update the visualization specific states
		// Update the language bins
		if (game_respects_filters_from_check_filter_object(game_respects_filters_object, ["LANGUAGES"])) {
			// if (game_respects_filters(game, ["LANGUAGES"])) {
			STATE["visualization_states"]["RELEASED_GAMES_BY_LANGUAGE"]["total_games_based_on_other_filters"]++;
			for (let j = 0; j < game["languages"].length; j++) {
				let language = game["languages"][j];
				if (STATE["visualization_states"]["RELEASED_GAMES_BY_LANGUAGE"]["bins"][language] != undefined) {
					STATE["visualization_states"]["RELEASED_GAMES_BY_LANGUAGE"]["bins"][language]++;
				}
			}
		}
		// Update the game mode bins
		if (game_respects_filters_from_check_filter_object(game_respects_filters_object, ["PLAYER_MODES"])) {
			// if (game_respects_filters(game, ["PLAYER_MODES"])) {
			STATE["visualization_states"]["RELEASED_GAMES_BY_PLAYER_MODE"]["total_games_based_on_other_filters"]++;
			for (let j = 0; j < game["player_mode"].length; j++) {
				let player_mode = game["player_mode"][j];
				if (STATE["visualization_states"]["RELEASED_GAMES_BY_PLAYER_MODE"]["bins"][player_mode] != undefined) {
					STATE["visualization_states"]["RELEASED_GAMES_BY_PLAYER_MODE"]["bins"][player_mode]++;
				} else {
					console.log("player_mode: " + player_mode + " not found");
				}
			}
		}
		// Update the content rating bins
		if (game_respects_filters_from_check_filter_object(game_respects_filters_object, ["CONTENT_RATINGS"])) {
			// if (game_respects_filters(game, ["CONTENT_RATINGS"])) {
			STATE["visualization_states"]["RELEASED_GAMES_BY_CONTENT_RATING"]["total_games_based_on_other_filters"]++;
			if (game["content_rating"].length == 0) {
				STATE["visualization_states"]["RELEASED_GAMES_BY_CONTENT_RATING"]["bins"]["No rating"]++;
			} else {
				for (let j = 0; j < game["content_rating"].length; j++) {
					let content_rating = game["content_rating"][j];
					if (STATE["visualization_states"]["RELEASED_GAMES_BY_CONTENT_RATING"]["bins"][content_rating] != undefined) {
						STATE["visualization_states"]["RELEASED_GAMES_BY_CONTENT_RATING"]["bins"][content_rating]++;
					} else {
						console.log("content_rating: " + content_rating + " not found");
					}
				}
			}
		}

		// Update the release date bins (both "month/year" and "year")
		if (game_respects_filters_from_check_filter_object(game_respects_filters_object, ["RELEASE_DATE"])) {
			// if (game_respects_filters(game, ["RELEASE_DATE"])) {
			STATE["visualization_states"]["RELEASED_GAMES_BY_RELEASE_DATE"]["total_games_based_on_other_filters"]++;
			let release_date_year = game["release_date"]["year"];
			let release_date_month = game["release_date"]["month"];
			let release_date_year_bin = get_release_date_bin_string(false, release_date_year, release_date_month);
			let released_date_month_bin = get_release_date_bin_string(true, release_date_year, release_date_month);
			STATE["visualization_states"]["RELEASED_GAMES_BY_RELEASE_DATE"]["month_bins"]["bins"][released_date_month_bin]++;
			STATE["visualization_states"]["RELEASED_GAMES_BY_RELEASE_DATE"]["year_bins"]["bins"][release_date_year_bin]++;
		}
		// Update the copies sold bins
		if (game_respects_filters_from_check_filter_object(game_respects_filters_object, ["COPIES_SOLD"])) {
			// if (game_respects_filters(game, ["COPIES_SOLD"])) {
			STATE["visualization_states"]["RELEASED_GAMES_BY_COPIES_SOLD"]["total_games_based_on_other_filters"]++;
			let copies_sold_bin = "";
			for (let i = 0; i < copies_sold_bins.length; i++) {
				let current_copies_sold_bin = copies_sold_bins[i];
				if (current_copies_sold_bin.length == 1) {
					if (current_copies_sold_bin[0] == 0) {
						if (game["copies_sold"] == 0) {
							copies_sold_bin = get_copies_sold_bin_string(i);
							break;
						}
					} else if (current_copies_sold_bin[0] <= game["copies_sold"]) {
						copies_sold_bin = get_copies_sold_bin_string(i);
						break;
					}
				} else if (current_copies_sold_bin[0] <= game["copies_sold"] && game["copies_sold"] <= current_copies_sold_bin[1]) {
					copies_sold_bin = get_copies_sold_bin_string(i);
					break;
				}
			}
			STATE["visualization_states"]["RELEASED_GAMES_BY_COPIES_SOLD"]["bins"][copies_sold_bin]++;
			// Print a warning if the number of copies sold of the game is greater than 1 but the total reviews of the game is 0
			if (copies_sold_bin != "0" && game["positive_reviews"] + game["negative_reviews"] == 0) {
				console.log("WARNING: game " + game["name"] + " has " + game["copies_sold"] + " copies sold but 0 reviews");
			}
		}
		// Update the review rating bins
		if (game_respects_filters_from_check_filter_object(game_respects_filters_object, ["REVIEW_RATING"])) {
			// if (game_respects_filters(game, ["REVIEW_RATING"])) {
			STATE["visualization_states"]["RELEASED_GAMES_BY_REVIEW_RATING"]["total_games_based_on_other_filters"]++;
			let review_rating_bin = "";
			let total_game_reviews = game["positive_reviews"] + game["negative_reviews"];
			let game_rating_percentage = -1;
			if (total_game_reviews != 0) {
				game_rating_percentage = Math.round(100 * game["positive_reviews"] / (game["positive_reviews"] + game["negative_reviews"]))
			}
			if (game_rating_percentage == -1) {
				review_rating_bin = "None";
			} else {
				for (let i = 0; i < review_rating_bins.length; i++) {
					let current_review_rating_bin = review_rating_bins[i];
					if (current_review_rating_bin[0] <= game_rating_percentage && game_rating_percentage <= current_review_rating_bin[1]) {
						review_rating_bin = get_review_rating_bin_string(i);
						break;
					}
				}
			}
			STATE["visualization_states"]["RELEASED_GAMES_BY_REVIEW_RATING"]["bins"][review_rating_bin]++;
		}
		// Update the price bins
		if (game_respects_filters_from_check_filter_object(game_respects_filters_object, ["PRICE"])) {
			// if (game_respects_filters(game, ["PRICE"])) {
			STATE["visualization_states"]["RELEASED_GAMES_BY_PRICE"]["total_games_based_on_other_filters"]++;
			let price_bin = "";
			for (let i = 0; i < price_bins.length; i++) {
				let current_price_bin = price_bins[i];
				if (current_price_bin.length == 1) {
					if (current_price_bin[0] == 0) {
						if (game["price"] == 0) {
							price_bin = get_price_bin_string(i);
							break;
						}
					} else if (current_price_bin[0] >= game["price"]) {
						price_bin = get_price_bin_string(i);
						break;
					}
				} else if (current_price_bin[0] < game["price"] && game["price"] <= current_price_bin[1]) {
					price_bin = get_price_bin_string(i);
					break;
				}
			}
			STATE["visualization_states"]["RELEASED_GAMES_BY_PRICE"]["bins"][price_bin]++;
		}

		// Update the tags
		if (game_respects_filters_from_check_filter_object(game_respects_filters_object, ["TAGS", "RELEASE_DATE"])) {
			// if (game_respects_filters(game, ["TAGS", "RELEASE_DATE"])) {

			for (let j = 0; j < game["tags"].length; j++) {

				let tag = game["tags"][j];

				// Update the tag's infos for the current game
				let filters_to_exclude = (USE_TAGS_FILTERS_FOR_TAGS_VISUALIZATIONS ? [] : ["TAGS"]);
				if (game_respects_filters_from_check_filter_object(game_respects_filters_object, filters_to_exclude)) {
					// if (game_respects_filters_from_check_filter_object(game_respects_filters_object, ["TAGS"])) {
					// if (game_respects_filters_from_check_filter_object(game_respects_filters_object)) {
					if (STATE["all_tags_filter_infos"][tag] != undefined) {
						/* Tag attributes should be:
							- number of games
							- total revenue
							- average revenue
							- total copies sold
							- average copies sold
							- average review rating
							- average price

							- number_of_games_with_a_rating (dont show as a filter/rank criteria)
						*/
						STATE["all_tags_filter_infos"][tag]["number_of_games"]++;
						STATE["all_tags_filter_infos"][tag]["total_revenue"] += game["revenue"];
						STATE["all_tags_filter_infos"][tag]["total_copies_sold"] += game["copies_sold"];
						// Temporarily store average values as sums, they will be divided by the number of games in the end
						if (game["positive_reviews"] + game["negative_reviews"] > 0) {
							STATE["all_tags_filter_infos"][tag]["number_of_games_with_a_rating"]++;
							STATE["all_tags_filter_infos"][tag]["average_review_rating"] += game["positive_reviews"] / (game["positive_reviews"] + game["negative_reviews"]);
						}
						STATE["all_tags_filter_infos"][tag]["average_price"] += game["price"];
					} else {
						// console.log("WARNING: tag " + tag + " not found in the list of filtered tags");
					}
				}

				// Update the tags time series
				// Calculate the index for the current game
				// NOTE: using "quarters of a year", hence increment the index by 1 every 3 months
				let current_game_release_date = game["release_date"];

				let current_game_release_date_index = get_time_series_index_from_game_object_release_date(current_game_release_date);
				if (current_game_release_date_index > tags_time_series_current_index) {
					// console.log("current_game_release_date_index: " + current_game_release_date_index + ", tags_time_series_current_index: " + tags_time_series_current_index + ", game index: " + i);
					tags_time_series_current_index += 1;
				}
				if (STATE["all_tags_filter_infos"][tag]["list_of_point_values_by_attribute"]["number_of_games"][tags_time_series_current_index] == undefined) {
					// Create the new values for the tag
					STATE["all_tags_filter_infos"][tag]["list_of_point_values_by_attribute"]["number_of_games"][tags_time_series_current_index] = 0;
					STATE["all_tags_filter_infos"][tag]["list_of_point_values_by_attribute"]["total_revenue"][tags_time_series_current_index] = 0;
					STATE["all_tags_filter_infos"][tag]["list_of_point_values_by_attribute"]["average_revenue"][tags_time_series_current_index] = 0;
					STATE["all_tags_filter_infos"][tag]["list_of_point_values_by_attribute"]["total_copies_sold"][tags_time_series_current_index] = 0;
					STATE["all_tags_filter_infos"][tag]["list_of_point_values_by_attribute"]["average_copies_sold"][tags_time_series_current_index] = 0;
					STATE["all_tags_filter_infos"][tag]["list_of_point_values_by_attribute"]["average_review_rating"][tags_time_series_current_index] = 0;
					STATE["all_tags_filter_infos"][tag]["list_of_point_values_by_attribute"]["average_price"][tags_time_series_current_index] = 0;
					STATE["all_tags_filter_infos"][tag]["list_of_point_values_by_attribute"]["number_of_games_with_a_rating"][tags_time_series_current_index] = 0;
					// // Finally calculate the average values for the previous bin
					// let total_games_in_previous_bin = STATE["all_tags_filter_infos"][tag]["list_of_point_values_by_attribute"]["number_of_games"][tags_time_series_current_index - 1];
					// let total_games_with_a_rating_in_previous_bin = STATE["all_tags_filter_infos"][tag]["list_of_point_values_by_attribute"]["number_of_games_with_a_rating"][tags_time_series_current_index - 1];
					// if (total_games_in_previous_bin > 0) {
					// 	STATE["all_tags_filter_infos"][tag]["list_of_point_values_by_attribute"]["average_revenue"][tags_time_series_current_index - 1] = STATE["all_tags_filter_infos"][tag]["list_of_point_values_by_attribute"]["total_revenue"][tags_time_series_current_index - 1] / total_games_in_previous_bin;
					// 	STATE["all_tags_filter_infos"][tag]["list_of_point_values_by_attribute"]["average_copies_sold"][tags_time_series_current_index - 1] = STATE["all_tags_filter_infos"][tag]["list_of_point_values_by_attribute"]["total_copies_sold"][tags_time_series_current_index - 1] / total_games_in_previous_bin;
					// 	if (total_games_with_a_rating_in_previous_bin > 0) STATE["all_tags_filter_infos"][tag]["list_of_point_values_by_attribute"]["average_review_rating"][tags_time_series_current_index - 1] = STATE["all_tags_filter_infos"][tag]["list_of_point_values_by_attribute"]["average_review_rating"][tags_time_series_current_index - 1] / total_games_with_a_rating_in_previous_bin;
					// 	STATE["all_tags_filter_infos"][tag]["list_of_point_values_by_attribute"]["average_price"][tags_time_series_current_index - 1] = STATE["all_tags_filter_infos"][tag]["list_of_point_values_by_attribute"]["average_price"][tags_time_series_current_index - 1] / total_games_in_previous_bin;
					// }
				}
				STATE["all_tags_filter_infos"][tag]["list_of_point_values_by_attribute"]["number_of_games"][tags_time_series_current_index] += 1;
				STATE["all_tags_filter_infos"][tag]["list_of_point_values_by_attribute"]["total_revenue"][tags_time_series_current_index] += game["revenue"];
				STATE["all_tags_filter_infos"][tag]["list_of_point_values_by_attribute"]["average_revenue"][tags_time_series_current_index] += game["revenue"];
				STATE["all_tags_filter_infos"][tag]["list_of_point_values_by_attribute"]["total_copies_sold"][tags_time_series_current_index] += game["copies_sold"];
				STATE["all_tags_filter_infos"][tag]["list_of_point_values_by_attribute"]["average_copies_sold"][tags_time_series_current_index] += game["copies_sold"];
				if (game["positive_reviews"] + game["negative_reviews"] > 0) {
					STATE["all_tags_filter_infos"][tag]["list_of_point_values_by_attribute"]["number_of_games_with_a_rating"][tags_time_series_current_index] += 1;
					STATE["all_tags_filter_infos"][tag]["list_of_point_values_by_attribute"]["average_review_rating"][tags_time_series_current_index] += game["positive_reviews"] / (game["positive_reviews"] + game["negative_reviews"]);
				}
				STATE["all_tags_filter_infos"][tag]["list_of_point_values_by_attribute"]["average_price"][tags_time_series_current_index] += game["price"];

				// Update the STATE["filtered_results_tags_infos"] object (with the number of games for the current tag)
				// NOTE: this only considers games that respect ALL the filters, hence also the active filters on tags
				if (game_respects_filters_from_check_filter_object(game_respects_filters_object)) {
					STATE["filtered_results_tags_infos"]["number_of_games"][tag] += 1;
					STATE["filtered_results_tags_infos"]["total_revenue"][tag] += game["revenue"];
					STATE["filtered_results_tags_infos"]["average_revenue"][tag] += game["revenue"];
					STATE["filtered_results_tags_infos"]["total_copies_sold"][tag] += game["copies_sold"];
					STATE["filtered_results_tags_infos"]["average_copies_sold"][tag] += game["copies_sold"];
					STATE["filtered_results_tags_infos"]["average_price"][tag] += game["price"];
					if (game["positive_reviews"] + game["negative_reviews"] > 0) {
						STATE["filtered_results_tags_infos"]["number_of_games_with_a_rating"][tag] += 1;
						STATE["filtered_results_tags_infos"]["average_review_rating"][tag] += game["positive_reviews"] / (game["positive_reviews"] + game["negative_reviews"]);
					}

				}

			}
		}

	}
	// Update the average values for the tags in the STATE["filtered_tags"] object
	tags_time_series_current_index += 1;
	let tags_time_series_max_values = {
		"number_of_games": 0,
		"total_revenue": 0,
		"average_revenue": 0,
		"total_copies_sold": 0,
		"average_copies_sold": 0,
		"average_review_rating": 0,
		"average_price": 0,
		"number_of_games_with_a_rating": 0
	};
	for (let tag in STATE["all_tags_filter_infos"]) {

		// Update STATE["filtered_tags"] with the average values
		let total_number_of_games = STATE["all_tags_filter_infos"][tag]["number_of_games"];
		let total_number_of_games_with_a_rating = STATE["all_tags_filter_infos"][tag]["number_of_games_with_a_rating"];
		if (total_number_of_games > 0) {
			STATE["all_tags_filter_infos"][tag]["average_revenue"] = STATE["all_tags_filter_infos"][tag]["total_revenue"] / STATE["all_tags_filter_infos"][tag]["number_of_games"];
			STATE["all_tags_filter_infos"][tag]["average_copies_sold"] = STATE["all_tags_filter_infos"][tag]["total_copies_sold"] / STATE["all_tags_filter_infos"][tag]["number_of_games"];
			STATE["all_tags_filter_infos"][tag]["average_price"] = STATE["all_tags_filter_infos"][tag]["average_price"] / STATE["all_tags_filter_infos"][tag]["number_of_games"];
			if (total_number_of_games_with_a_rating > 0) STATE["all_tags_filter_infos"][tag]["average_review_rating"] = STATE["all_tags_filter_infos"][tag]["average_review_rating"] / STATE["all_tags_filter_infos"][tag]["number_of_games_with_a_rating"];
		}

		// Update STATE["tag_global_infos"]
		if (STATE["all_tags_filter_infos"][tag]["number_of_games"] > STATE["tag_global_infos"]["max_number_of_games"]) STATE["tag_global_infos"]["max_number_of_games"] = STATE["all_tags_filter_infos"][tag]["number_of_games"];
		if (STATE["all_tags_filter_infos"][tag]["total_revenue"] > STATE["tag_global_infos"]["max_total_revenue"]) STATE["tag_global_infos"]["max_total_revenue"] = STATE["all_tags_filter_infos"][tag]["total_revenue"];
		if (STATE["all_tags_filter_infos"][tag]["total_copies_sold"] > STATE["tag_global_infos"]["max_total_copies_sold"]) STATE["tag_global_infos"]["max_total_copies_sold"] = STATE["all_tags_filter_infos"][tag]["total_copies_sold"];
		if (STATE["all_tags_filter_infos"][tag]["average_revenue"] > STATE["tag_global_infos"]["max_average_revenue"]) STATE["tag_global_infos"]["max_average_revenue"] = STATE["all_tags_filter_infos"][tag]["average_revenue"];
		if (STATE["all_tags_filter_infos"][tag]["average_copies_sold"] > STATE["tag_global_infos"]["max_average_copies_sold"]) STATE["tag_global_infos"]["max_average_copies_sold"] = STATE["all_tags_filter_infos"][tag]["average_copies_sold"];
		if (STATE["all_tags_filter_infos"][tag]["average_review_rating"] > STATE["tag_global_infos"]["max_average_review_rating"]) STATE["tag_global_infos"]["max_average_review_rating"] = STATE["all_tags_filter_infos"][tag]["average_review_rating"];
		if (STATE["all_tags_filter_infos"][tag]["average_price"] > STATE["tag_global_infos"]["max_average_price"]) STATE["tag_global_infos"]["max_average_price"] = STATE["all_tags_filter_infos"][tag]["average_price"];

		// Update the average values for the tags time series
		// Add all the missing values for the bins
		let total_number_of_bins = get_tags_time_series_number_of_bins();
		for (let i = 0; i < total_number_of_bins; i++) {
			if (STATE["all_tags_filter_infos"][tag]["list_of_point_values_by_attribute"]["number_of_games"][i] == undefined) {
				STATE["all_tags_filter_infos"][tag]["list_of_point_values_by_attribute"]["number_of_games"][i] = 0;
				STATE["all_tags_filter_infos"][tag]["list_of_point_values_by_attribute"]["total_revenue"][i] = 0;
				STATE["all_tags_filter_infos"][tag]["list_of_point_values_by_attribute"]["average_revenue"][i] = 0;
				STATE["all_tags_filter_infos"][tag]["list_of_point_values_by_attribute"]["total_copies_sold"][i] = 0;
				STATE["all_tags_filter_infos"][tag]["list_of_point_values_by_attribute"]["average_copies_sold"][i] = 0;
				STATE["all_tags_filter_infos"][tag]["list_of_point_values_by_attribute"]["average_review_rating"][i] = 0;
				STATE["all_tags_filter_infos"][tag]["list_of_point_values_by_attribute"]["average_price"][i] = 0;
				STATE["all_tags_filter_infos"][tag]["list_of_point_values_by_attribute"]["number_of_games_with_a_rating"][i] = 0;
			}
			// Update the average values for the bin
			let total_games_in_bin = STATE["all_tags_filter_infos"][tag]["list_of_point_values_by_attribute"]["number_of_games"][i];
			let total_games_with_a_rating_in_bin = STATE["all_tags_filter_infos"][tag]["list_of_point_values_by_attribute"]["number_of_games_with_a_rating"][i];
			if (total_games_in_bin > 0) {
				STATE["all_tags_filter_infos"][tag]["list_of_point_values_by_attribute"]["average_revenue"][i] = STATE["all_tags_filter_infos"][tag]["list_of_point_values_by_attribute"]["total_revenue"][i] / total_games_in_bin;
				STATE["all_tags_filter_infos"][tag]["list_of_point_values_by_attribute"]["average_copies_sold"][i] = STATE["all_tags_filter_infos"][tag]["list_of_point_values_by_attribute"]["total_copies_sold"][i] / total_games_in_bin;
				if (total_games_with_a_rating_in_bin > 0) STATE["all_tags_filter_infos"][tag]["list_of_point_values_by_attribute"]["average_review_rating"][i] = STATE["all_tags_filter_infos"][tag]["list_of_point_values_by_attribute"]["average_review_rating"][i] / total_games_with_a_rating_in_bin;
				STATE["all_tags_filter_infos"][tag]["list_of_point_values_by_attribute"]["average_price"][i] = STATE["all_tags_filter_infos"][tag]["list_of_point_values_by_attribute"]["average_price"][i] / total_games_in_bin;
			}
			// Update the max values
			let tag_is_excluded = STATE["tags_ranking"]["tags_to_exclude"].has(tag);
			if (!tag_is_excluded) {
				// console.log("Considering tag: " + tag);
				if (STATE["all_tags_filter_infos"][tag]["list_of_point_values_by_attribute"]["number_of_games"][i] > tags_time_series_max_values["number_of_games"]) tags_time_series_max_values["number_of_games"] = STATE["all_tags_filter_infos"][tag]["list_of_point_values_by_attribute"]["number_of_games"][i];
				if (STATE["all_tags_filter_infos"][tag]["list_of_point_values_by_attribute"]["total_revenue"][i] > tags_time_series_max_values["total_revenue"]) tags_time_series_max_values["total_revenue"] = STATE["all_tags_filter_infos"][tag]["list_of_point_values_by_attribute"]["total_revenue"][i];
				if (STATE["all_tags_filter_infos"][tag]["list_of_point_values_by_attribute"]["average_revenue"][i] > tags_time_series_max_values["average_revenue"]) tags_time_series_max_values["average_revenue"] = STATE["all_tags_filter_infos"][tag]["list_of_point_values_by_attribute"]["average_revenue"][i];
				if (STATE["all_tags_filter_infos"][tag]["list_of_point_values_by_attribute"]["total_copies_sold"][i] > tags_time_series_max_values["total_copies_sold"]) tags_time_series_max_values["total_copies_sold"] = STATE["all_tags_filter_infos"][tag]["list_of_point_values_by_attribute"]["total_copies_sold"][i];
				if (STATE["all_tags_filter_infos"][tag]["list_of_point_values_by_attribute"]["average_copies_sold"][i] > tags_time_series_max_values["average_copies_sold"]) tags_time_series_max_values["average_copies_sold"] = STATE["all_tags_filter_infos"][tag]["list_of_point_values_by_attribute"]["average_copies_sold"][i];
				if (STATE["all_tags_filter_infos"][tag]["list_of_point_values_by_attribute"]["average_review_rating"][i] > tags_time_series_max_values["average_review_rating"]) tags_time_series_max_values["average_review_rating"] = STATE["all_tags_filter_infos"][tag]["list_of_point_values_by_attribute"]["average_review_rating"][i];
				if (STATE["all_tags_filter_infos"][tag]["list_of_point_values_by_attribute"]["average_price"][i] > tags_time_series_max_values["average_price"]) tags_time_series_max_values["average_price"] = STATE["all_tags_filter_infos"][tag]["list_of_point_values_by_attribute"]["average_price"][i];
				if (STATE["all_tags_filter_infos"][tag]["list_of_point_values_by_attribute"]["number_of_games_with_a_rating"][i] > tags_time_series_max_values["number_of_games_with_a_rating"]) tags_time_series_max_values["number_of_games_with_a_rating"] = STATE["all_tags_filter_infos"][tag]["list_of_point_values_by_attribute"]["number_of_games_with_a_rating"][i];
			}
		}

		// Update the STATE["filtered_results_tags_infos"] object 
		// Add the tag to the list of tags if it does not exist
		if (STATE["filtered_results_tags_infos"]["number_of_games"][tag] == undefined) STATE["filtered_results_tags_infos"]["number_of_games"][tag] = 0;
		if (STATE["filtered_results_tags_infos"]["total_revenue"][tag] == undefined) STATE["filtered_results_tags_infos"]["total_revenue"][tag] = 0;
		if (STATE["filtered_results_tags_infos"]["average_revenue"][tag] == undefined) STATE["filtered_results_tags_infos"]["average_revenue"][tag] = 0;
		if (STATE["filtered_results_tags_infos"]["total_copies_sold"][tag] == undefined) STATE["filtered_results_tags_infos"]["total_copies_sold"][tag] = 0;
		if (STATE["filtered_results_tags_infos"]["average_copies_sold"][tag] == undefined) STATE["filtered_results_tags_infos"]["average_copies_sold"][tag] = 0;
		if (STATE["filtered_results_tags_infos"]["average_review_rating"][tag] == undefined) STATE["filtered_results_tags_infos"]["average_review_rating"][tag] = 0;
		if (STATE["filtered_results_tags_infos"]["average_price"][tag] == undefined) STATE["filtered_results_tags_infos"]["average_price"][tag] = 0;
		if (STATE["filtered_results_tags_infos"]["number_of_games_with_a_rating"][tag] == undefined) STATE["filtered_results_tags_infos"]["number_of_games_with_a_rating"][tag] = 0;
		// Update the average values
		if (STATE["filtered_results_tags_infos"]["number_of_games"][tag] > 0) {
			STATE["filtered_results_tags_infos"]["average_revenue"][tag] = STATE["filtered_results_tags_infos"]["total_revenue"][tag] / STATE["filtered_results_tags_infos"]["number_of_games"][tag];
			STATE["filtered_results_tags_infos"]["average_copies_sold"][tag] = STATE["filtered_results_tags_infos"]["total_copies_sold"][tag] / STATE["filtered_results_tags_infos"]["number_of_games"][tag];
			STATE["filtered_results_tags_infos"]["average_price"][tag] = STATE["filtered_results_tags_infos"]["average_price"][tag] / STATE["filtered_results_tags_infos"]["number_of_games"][tag];
			if (STATE["filtered_results_tags_infos"]["number_of_games_with_a_rating"][tag] > 0) STATE["filtered_results_tags_infos"]["average_review_rating"][tag] = STATE["filtered_results_tags_infos"]["average_review_rating"][tag] / STATE["filtered_results_tags_infos"]["number_of_games_with_a_rating"][tag];
		}


	}
	// Set the max values for the tags time series
	STATE["visualization_states"]["TAGS_TIME_SERIES"]["tags_time_series_max_values"] = tags_time_series_max_values;
	// console.log("Final tags_time_series_max_values:\n" + JSON.stringify(tags_time_series_max_values, null, 2));

	// Update the average values in the STATE["games_global_infos"] object
	let total_games_in_filters = STATE["filtered_games"].length;
	if (total_games_in_filters > 0) {
		STATE["games_global_infos"]["average_price"] = STATE["games_global_infos"]["total_price"] / total_games_in_filters;
		STATE["games_global_infos"]["average_revenue"] = STATE["games_global_infos"]["total_revenue"] / total_games_in_filters;
		STATE["games_global_infos"]["average_copies_sold"] = STATE["games_global_infos"]["total_copies_sold"] / total_games_in_filters;
		if (STATE["games_global_infos"]["number_of_games_with_a_rating"] > 0) {
			STATE["games_global_infos"]["average_review_rating"] = STATE["games_global_infos"]["total_review_rating"] / STATE["games_global_infos"]["number_of_games_with_a_rating"];
		}
		else {
			STATE["games_global_infos"]["average_review_rating"] = 0;
		}
	} else {
		STATE["games_global_infos"]["average_price"] = 0;
		STATE["games_global_infos"]["average_revenue"] = 0;
		STATE["games_global_infos"]["average_copies_sold"] = 0;
		STATE["games_global_infos"]["average_review_rating"] = 0;
	}

	// console.log(STATE["all_tags_filter_infos"])

	// If the application state was updated and it was not yet initialized, set the "max_bins" values for all bins to be the same of the current values for "bins" for each visualization state
	if (!initialized_app_state) {

		initialized_app_state = true;

		TOTAL_NUMBER_OF_TAGS = Object.keys(STATE["all_tags_filter_infos"]).length;

		// Initialize the language bins
		STATE["visualization_states"]["RELEASED_GAMES_BY_LANGUAGE"]["max_bins"] = {};
		for (let language in STATE["visualization_states"]["RELEASED_GAMES_BY_LANGUAGE"]["bins"]) {
			STATE["visualization_states"]["RELEASED_GAMES_BY_LANGUAGE"]["max_bins"][language] = STATE["visualization_states"]["RELEASED_GAMES_BY_LANGUAGE"]["bins"][language];
		}
		// Initialize the player mode bins
		STATE["visualization_states"]["RELEASED_GAMES_BY_PLAYER_MODE"]["max_bins"] = {};
		for (let player_mode in STATE["visualization_states"]["RELEASED_GAMES_BY_PLAYER_MODE"]["bins"]) {
			STATE["visualization_states"]["RELEASED_GAMES_BY_PLAYER_MODE"]["max_bins"][player_mode] = STATE["visualization_states"]["RELEASED_GAMES_BY_PLAYER_MODE"]["bins"][player_mode];
		}
		// Initialize the content rating bins
		STATE["visualization_states"]["RELEASED_GAMES_BY_CONTENT_RATING"]["max_bins"] = {};
		for (let content_rating in STATE["visualization_states"]["RELEASED_GAMES_BY_CONTENT_RATING"]["bins"]) {
			STATE["visualization_states"]["RELEASED_GAMES_BY_CONTENT_RATING"]["max_bins"][content_rating] = STATE["visualization_states"]["RELEASED_GAMES_BY_CONTENT_RATING"]["bins"][content_rating];
		}
		// Initialize the release date bins
		STATE["visualization_states"]["RELEASED_GAMES_BY_RELEASE_DATE"]["month_bins"]["max_bins"] = {};
		STATE["visualization_states"]["RELEASED_GAMES_BY_RELEASE_DATE"]["year_bins"]["max_bins"] = {};
		for (let release_date_bin in STATE["visualization_states"]["RELEASED_GAMES_BY_RELEASE_DATE"]["month_bins"]["bins"]) {
			STATE["visualization_states"]["RELEASED_GAMES_BY_RELEASE_DATE"]["month_bins"]["max_bins"][release_date_bin] = STATE["visualization_states"]["RELEASED_GAMES_BY_RELEASE_DATE"]["month_bins"]["bins"][release_date_bin];
		}
		for (let release_date_bin in STATE["visualization_states"]["RELEASED_GAMES_BY_RELEASE_DATE"]["year_bins"]["bins"]) {
			STATE["visualization_states"]["RELEASED_GAMES_BY_RELEASE_DATE"]["year_bins"]["max_bins"][release_date_bin] = STATE["visualization_states"]["RELEASED_GAMES_BY_RELEASE_DATE"]["year_bins"]["bins"][release_date_bin];
		}
		// Initialize the copies sold bins
		STATE["visualization_states"]["RELEASED_GAMES_BY_COPIES_SOLD"]["max_bins"] = {};
		for (let copies_sold_bin in STATE["visualization_states"]["RELEASED_GAMES_BY_COPIES_SOLD"]["bins"]) {
			STATE["visualization_states"]["RELEASED_GAMES_BY_COPIES_SOLD"]["max_bins"][copies_sold_bin] = STATE["visualization_states"]["RELEASED_GAMES_BY_COPIES_SOLD"]["bins"][copies_sold_bin];
		}
		// Initialize the review rating bins
		STATE["visualization_states"]["RELEASED_GAMES_BY_REVIEW_RATING"]["max_bins"] = {};
		for (let review_rating_bin in STATE["visualization_states"]["RELEASED_GAMES_BY_REVIEW_RATING"]["bins"]) {
			STATE["visualization_states"]["RELEASED_GAMES_BY_REVIEW_RATING"]["max_bins"][review_rating_bin] = STATE["visualization_states"]["RELEASED_GAMES_BY_REVIEW_RATING"]["bins"][review_rating_bin];
		}
		// Initialize the price bins
		STATE["visualization_states"]["RELEASED_GAMES_BY_PRICE"]["max_bins"] = {};
		for (let price_bin in STATE["visualization_states"]["RELEASED_GAMES_BY_PRICE"]["bins"]) {
			STATE["visualization_states"]["RELEASED_GAMES_BY_PRICE"]["max_bins"][price_bin] = STATE["visualization_states"]["RELEASED_GAMES_BY_PRICE"]["bins"][price_bin];
		}

		// Also set the average, total and max values for all games (by simply copying the values from the current STATE["games_global_infos"] object)
		STATE["all_games_infos"]["average_price"] = STATE["games_global_infos"]["average_price"];
		STATE["all_games_infos"]["average_revenue"] = STATE["games_global_infos"]["average_revenue"];
		STATE["all_games_infos"]["average_copies_sold"] = STATE["games_global_infos"]["average_copies_sold"];
		STATE["all_games_infos"]["average_review_rating"] = STATE["games_global_infos"]["average_review_rating"];
		STATE["all_games_infos"]["total_revenue"] = STATE["games_global_infos"]["total_revenue"];
		STATE["all_games_infos"]["total_copies_sold"] = STATE["games_global_infos"]["total_copies_sold"];

	}
	// Calculate the sorting list of indexes for the tags for the currently active sorting criteria
	let current_sorting_criteria = STATE["tags_ranking"]["current_sorting_criteria"];
	STATE["tags_ranking"]["tag_lists"][current_sorting_criteria] = get_sorted_tags_list(current_sorting_criteria);

	console.log("> Application state updated (" + total_application_state_updates + ")");

	if (update_visualizations_in_the_end) {
		update_visualizations();
	}

	return true;

}

/**
 * Returns a list of {name, index} tag objects sorted by the given tag attribute
 *
 * The index is the index of the tag as found in the TAGS_BY_CATEGORY object and in the STATE["all_tags_filter_infos"] object
 */
function get_sorted_tags_list(tag_attribute) {
	let tags_list = [];
	let tag_names = Object.keys(STATE["all_tags_filter_infos"]);
	for (let i = 0; i < tag_names.length; i++) {
		let tag_name = tag_names[i];
		let tag_index = i;
		let tag = {
			"name": tag_name,
			"index": tag_index
		};
		tags_list.push(tag);
	}
	tags_list.sort(function (tag_1, tag_2) {
		return (STATE["all_tags_filter_infos"][tag_2["name"]][tag_attribute] - STATE["all_tags_filter_infos"][tag_1["name"]][tag_attribute]);
	});
	return tags_list;
}


// String constants used to recognize special lines of text in the tooltip
const TOOLTIP_LINE_SEPARATOR = "_TOOLTIP_LINE_SEPARATOR_";
const TOOLTIP_LINE_SPACING = "_TOOLTIP_LINE_SPACING_";

/**
 * Makes the tooltip appear for the given title and text at the given translate position (with coordinates in range [-1, 1])
 *
 * The "tooltip_element" parameter is the either a jquery selection or an HTML element to which the tooltip is attached (if trying to attach a tooltip to a d3 selection, pass "d3_selection.node()"" or "d3_selection[0].node()")
 *
 * Position is relative to the whole document, and should be given as an object { "x": float, "y": float }
 *
 * The "texts" parameter is a list of strings to set as text sections of the tooltip (pass a list of one element if the tooltip should only contain one title and one sub-text section)
 *
 * Text may also be TOOLTIP_LINE_SEPARATOR or TOOLTIP_LINE_SPACING to add a line separator or a line spacing
 *
 * The "translate_tooltip_position" parameter is a list of 2 values representing the X and Y coordinates, which defines whether to translate the tooltip position or not:
 * * If "translate_tooltip_position" is [0,0], the tooltip position is not translated;
 * * If "translate_tooltip_position" is [X, Y] and X is not 0, then the +1 or -1 values are used to calculate wethe to show the tooltip on the left or on the right of the element, and the tooltip arrow is adjusted to point in the correct direction;
 * * If "translate_tooltip_position" is [X, Y] and Y is in range [-0.5,0.5] then the tooltip is translated upwards or downwards with respect to the element's position but the arrow is kept at the center of the tooltip (vertically);
 * * If "translate_tooltip_position" is [X, Y] and Y is greater than 0.5 (in absolute value, usually either 1 or -1) then the tooltip is translated upwards or downwards with respect to the element's position and the arrow is moved to the top or to the bottom of the tooltip accordingly.
 *
 * The "additional_tooltip_translation" translates the tooltip by the given [A,B] multiplied by the element's width and height respectively after calculating the final tooltip position
 */
function set_tooltip(tooltip_element, title, texts, translate_tooltip_position = [0, 0], additional_tooltip_translation = [0, 0], use_wide_tooltip = false, force_activate_tooltip = false) {
	// If tooltips are not enabled, return
	if (!show_tooltips_on_hover && !force_activate_tooltip) return;
	// Function to calculate the tooltip element's center position and width
	let element_bounding_box = $(tooltip_element).get(0).getBoundingClientRect();
	let element_width = element_bounding_box["width"];
	let element_height = element_bounding_box["height"];
	let element_center_position = {
		"x": element_bounding_box["x"] + element_width / 2,
		"y": element_bounding_box["y"] + element_height / 2
	};
	let tooltip = d3.select(".tooltip");
	tooltip.selectAll("*").remove();
	if (use_wide_tooltip) tooltip.classed("wide-tooltip", true);
	else tooltip.classed("wide-tooltip", false);
	// Create the tooltip container div
	let tooltip_content_container = document.createElement("div");
	// Create the tooltip title
	let title_element = document.createElement("div");
	title_element.innerHTML = title;
	title_element.style.fontWeight = "bold";
	title_element.style.fontSize = "1.25em";
	tooltip_content_container.appendChild(title_element);
	// Create a div for each text in the texts list
	if (typeof texts == "string") texts = [texts];
	for (let i = 0; i < texts.length; i++) {
		if (texts[i] == TOOLTIP_LINE_SEPARATOR) {
			// Add a div with a line separator
			let line_separator_element = document.createElement("div");
			line_separator_element.style.backgroundColor = "#ffffffaa"
			line_separator_element.style.height = "0.05em";
			line_separator_element.style.marginTop = "0.4em";
			line_separator_element.style.marginBottom = "0.4em";
			tooltip_content_container.appendChild(line_separator_element);
		} else if (texts[i] == TOOLTIP_LINE_SPACING) {
			// Add a div with a line spacing
			let line_spacing_element = document.createElement("div");
			line_spacing_element.style.height = "0.325em";
			tooltip_content_container.appendChild(line_spacing_element);
		} else {
			let text_to_set = texts[i];
			let text_element = document.createElement("div");
			text_element.innerHTML = text_to_set;
			tooltip_content_container.appendChild(text_element);
		}
	}
	// Calculate the "translate string", default is:
	// 		transform: translate(0.5em, -50%);
	let padding_for_tooltip_arrow = 0;	// Use a margin to account for the tooltip arrow
	let default_padding_for_tooltip_arrow = 0.875;
	let tooltip_translate_percentage_y = 50;
	let actual_translate_tooltip_position_y = 0;
	if (translate_tooltip_position[1] > 0.75) {
		// Translate the tooltip downwards
		tooltip_translate_percentage_y = 100;
		padding_for_tooltip_arrow = -1 * default_padding_for_tooltip_arrow;
		actual_translate_tooltip_position_y = 1;
	} else if (translate_tooltip_position[1] < -0.75) {
		// Translate the tooltip upwards
		tooltip_translate_percentage_y = 0;
		padding_for_tooltip_arrow = default_padding_for_tooltip_arrow;
		actual_translate_tooltip_position_y = -1;
	}
	// let tooltip_translate_percentage_y = ((translate_tooltip_position[1] + 1) / 2) * 100;
	// if (tooltip_translate_percentage_y < 10) padding_for_tooltip_arrow = default_padding_for_tooltip_arrow;
	// if (tooltip_translate_percentage_y > 90) padding_for_tooltip_arrow = -1 * default_padding_for_tooltip_arrow;
	let padding_for_tooltip_arrow_string = (padding_for_tooltip_arrow >= 0 ? "+ " : "- ") + Math.abs(padding_for_tooltip_arrow / 4).toString() + "em";
	// let padding_for_tooltip_arrow_string = (padding_for_tooltip_arrow < 0 ? "+ " : "- ") + Math.abs(padding_for_tooltip_arrow).toString() + "em";
	let tooltip_translate_x_string = "calc(" + (translate_tooltip_position[0] > -0.01 ? "" : "-") + "0.5em)";
	let tooltip_translate_y_string = "calc(" + tooltip_translate_percentage_y + "% - 100% " + padding_for_tooltip_arrow_string + ")";
	let translate_string = "translate(" + tooltip_translate_x_string + " , " + tooltip_translate_y_string + ")";
	tooltip.style("transform", translate_string);
	// console.log("translate_string: " + translate_string);
	// Set the "arrow-left" or "arrow-right" class to the tooltip depending on the translate_tooltip_position value
	let translate_tooltip_position_multiplier_left = 1;	// Defaults to a tooltip showing on the right side of the element
	let translate_tooltip_position_multiplier_top = 0;	// Defaults to a tooltip centered vertically on the element
	if (translate_tooltip_position[0] > -0.001) {
		tooltip.classed("arrow-on-right", false);
		tooltip.classed("arrow-on-left", true);
		translate_tooltip_position_multiplier_left = 1;
	} else {
		tooltip.classed("arrow-on-left", false);
		tooltip.classed("arrow-on-right", true);
		translate_tooltip_position_multiplier_left = -1;
	}
	if (translate_tooltip_position[1] > 0.25) {
		translate_tooltip_position_multiplier_top = 1;
	} else if (translate_tooltip_position[1] < -0.25) {
		translate_tooltip_position_multiplier_top = -1;
	} else {
		translate_tooltip_position_multiplier_top = 0;
	}
	// Set css variable "--tooltip-arrow-translate" to the padding_for_tooltip_arrow value
	// tooltip.style("--tooltip-arrow-translate", "calc(" + (-1 * padding_for_tooltip_arrow) + "em" + " - 50% * " + translate_tooltip_position[1] + ")");
	tooltip.style("--tooltip-arrow-translate", "calc(" + (-1 * padding_for_tooltip_arrow) + "em" + " - 50% * " + actual_translate_tooltip_position_y + ")");
	// Append the tooltip container div to the actual tooltip
	tooltip.node().appendChild(tooltip_content_container);
	// Set the tooltip position
	let translate_tooltip_x = 0;
	let anchor_horizontal = "left";
	if (translate_tooltip_position[0] < 0) {
		anchor_horizontal = "right";
	}
	let anchor_horizontal_opposite = (anchor_horizontal == "left" ? "right" : "left");
	let tooltip_margin_size = 0.125; // In em
	let tooltip_margin_string = (translate_tooltip_position[0] >= 0 ? "- " : "+ ") + tooltip_margin_size.toString() + "em";
	let tooltip_absolute_position_horizontal = element_center_position.x + (0.5 * element_width) * translate_tooltip_position_multiplier_left;
	// Recaltulate the position as the width of the parent of the tooltip minus the computed position if the tooltip is on the left side of the element
	if (translate_tooltip_position[0] < 0) tooltip_absolute_position_horizontal = tooltip.node().parentNode.getBoundingClientRect().width - tooltip_absolute_position_horizontal;
	let tooltip_absolute_position_vertical = element_center_position.y - (0.5 * element_height) * translate_tooltip_position_multiplier_top;

	tooltip_absolute_position_horizontal -= additional_tooltip_translation[0] * element_width;
	tooltip_absolute_position_vertical -= additional_tooltip_translation[1] * element_height;

	tooltip_margin_string = "";
	tooltip.style(anchor_horizontal, "calc(" + tooltip_absolute_position_horizontal + "px " + tooltip_margin_string + ")");
	tooltip.style(anchor_horizontal_opposite, "auto");
	// let additional_tooltip_top_position_based_on_tooptip_arrow_offset_string = "+ 0em";
	// if (
	// 	(translate_tooltip_position_multiplier_top < 0.01 && translate_tooltip_position_multiplier_top > -0.01)
	// 	|| translate_tooltip_position[1] > 0.75
	// 	|| translate_tooltip_position[1] < -0.75
	// 	// || true
	// ) {
	// 	// additional_tooltip_top_position_based_on_tooptip_arrow_offset_string = (padding_for_tooltip_arrow < 0 ? "+ " : "- ") + Math.abs(padding_for_tooltip_arrow / 4).toString() + "em";
	// 	additional_tooltip_top_position_based_on_tooptip_arrow_offset_string = (padding_for_tooltip_arrow < 0 ? "+ " : "- ") + Math.abs(padding_for_tooltip_arrow / 2).toString() + "em";
	// }
	// tooltip.style("top", "calc(" + tooltip_absolute_position_vertical + "px " + additional_tooltip_top_position_based_on_tooptip_arrow_offset_string + ")");
	tooltip.style("top", "calc(" + tooltip_absolute_position_vertical + "px)");

	// console.log(anchor_horizontal + ": " + tooltip.style(anchor_horizontal));
	// console.log("top: " + tooltip_absolute_position_top + "px");
	// Show the tooltip
	tooltip.style("opacity", 1);
}
/**
 * Hides the tooltip
 */
function hide_tooltip() {
	let tooltip = d3.select(".tooltip");
	tooltip.style("opacity", 0);
}

/**
 * Returns [X, Y] where X and Y are one of the values in [-1, 0, 1] based on if the tooltip container element is in the top, left or right position of the screen and also in the left or right position of the screen
 */
function calculate_tooltip_optimal_translate_position(element) {
	// Get the positions relative to the viewport as a range from 0 to 100
	let element_bounding_box = element.get(0).getBoundingClientRect();
	let element_center_position = {
		"x": element_bounding_box["x"] + element_bounding_box["width"] / 2,
		"y": element_bounding_box["y"] + element_bounding_box["height"] / 2
	};
	// Set positions to be in range [-1, 1]
	let x = (element_center_position["x"] / window.innerWidth) * 2 - 1;
	let y = (element_center_position["y"] / window.innerHeight) * 2 - 1;
	// Set x to be -1, 0 or 1 based on the position of the element (if its in the first third, second third or last third of the screen)
	if (x < -0.333) x = -1;
	else if (x < 0.333) x = 0;
	else x = 1;
	// Set y to be -1, 0 or 1 based on the position of the element (if its in the first third, second third or last third of the screen)
	if (y < -0.333) y = -1;
	else if (y < 0.333) y = 0;
	else y = 1;
	// Return the calculated positions
	return [-1 * x, -1 * y];
}

/**
 * Create histograms for range filters (released games by month/year, copies sold, review rating, price)
 */
function create_released_games_by_feature_histogram(
	attribute_bins, section_element_selector,
	bins_sorting_function = undefined,
	brush_update_function = undefined,
	get_current_brush_values_function = undefined,
	show_x_axis_labels_every_n_bins = 1,
	highlight_x_axis_labels_every_n_shown_bins = 1,
) {

	let container_div_element_selector = section_element_selector + " .content";

	// Set colors
	// let bar_color = color_scheme["histogram_bars"];
	// let bar_highlight_color = offset_saturation_and_value(bar_color, -10, 10);
	let bar_disabled_opacity = 0.425;
	// Use the bins in the "STATE" games by release date visualization state
	let attribute_bins_keys = Object.keys(attribute_bins["bins"]);
	let attribute_bins_values = Object.values(attribute_bins["bins"]);
	let attribute_bins_data = [];
	for (let i = 0; i < attribute_bins_keys.length; i++) {
		let bin_key = attribute_bins_keys[i];
		let bin_value = attribute_bins_values[i];
		attribute_bins_data.push({
			"bin": bin_key,
			"count": bin_value
		});
	}
	// Sort bins
	if (bins_sorting_function != null) {
		attribute_bins_data.sort(function (a, b) {
			return bins_sorting_function(a["bin"], b["bin"]);
		});
	}
	let container_div_element = $(container_div_element_selector);
	// Check if the container div element contains the svg element
	let svg_element = container_div_element.find("svg");
	if (svg_element.length == 0) {
		// Create the svg element
		svg_element = document.createElementNS("http://www.w3.org/2000/svg", "svg");
		svg_element.classList.add("svg-element");
		svg_element.setAttribute("width", "100%");
		svg_element.setAttribute("height", "100%");
		// Make the svg scale with the container div element preserving the aspect ratio
		// svg_element.setAttribute("preserveAspectRatio", "xMidYMid meet");
		// svg_element.setAttribute("preserveAspectRatio", "xMidYMid meet");
		svg_element.setAttribute("viewBox", "0 0 100 100");
		// Append the svg element to the container div element
		container_div_element.append(svg_element);
	} else {
		// Clear the svg element
		svg_element.empty();
	}
	svg_element = d3.select(svg_element);
	// Set with and height
	// let container_div_element_width = container_div_element.width();
	// let container_div_element_height = container_div_element.height();
	let container_div_aspect_ratio = $(container_div_element).width() / $(container_div_element).height();
	let container_size = 80;
	let container_div_element_height = container_size;
	let container_div_element_width = container_size * container_div_aspect_ratio;
	// Set the margin, width and height
	let margin = { top: 2, right: 20, bottom: 1.625, left: -39 },
		width = container_div_element_width - margin.left - margin.right,
		height = container_div_element_height - margin.top - margin.bottom;
	// Create the histogram using d3.js
	let x = d3.scaleBand()
		.range([0, width])
		.padding(0.02);
	let y = d3.scaleLinear()
		.range([height, 0]);
	let histogram_container = svg_element.append("g")
		.attr("class", "histogram-container")
		.attr("transform", "translate(" + margin.left + "," + margin.top + ")");
	// Add a stroke to the histogram container
	// histogram_container.append("rect")
	// 	.attr("width", width)
	// 	.attr("height", height)
	// 	.attr("fill", "#00000000")
	// 	.attr("stroke", "#f00")
	// 	.attr("stroke-width", 3);
	x.domain(attribute_bins_data.map(function (d) { return d["bin"]; }));
	let y_max_value = d3.max(attribute_bins_data, function (d) { return d["count"]; });
	let y_max_value_offset_portion = 0.0;
	if (y_max_value == 0) y_max_value = 1;
	y.domain([0, y_max_value * (1 + y_max_value_offset_portion)]);
	let x_labels_angle = -25;
	let x_labels_font_size = 0.5;
	let text_delta = {
		"dx": -0.5 * x_labels_font_size * Math.cos(Math.PI * x_labels_angle / 180),
		"dy": -2 * x_labels_font_size * Math.sin(Math.PI * x_labels_angle / 180)
	}
	histogram_container.append("g")
		.attr("class", "axis axis--x")
		.attr("transform", "translate(0," + height + ")")
		// Show the x axis as a single line
		.call(d3.axisBottom(x)
			// Hide thicks for start and end of the x axis
			.tickSizeOuter(0)
			.tickSizeInner(2.5)
		)
		.selectAll("text")
		.attr("transform", "rotate(" + x_labels_angle + ")")
		.style("text-anchor", "end")
		.attr("dx", `${text_delta["dx"]}em`)
		.attr("dy", `${text_delta["dy"]}em`)
		.style("font-size", `${x_labels_font_size}em`);

	let non_highlighted_x_axis_ticks_opacity = 0.7;
	// Hide the x axis ticks lines every n bins
	histogram_container.selectAll(".axis--x .tick line")
		// .attr("stroke", "none");
		.filter(function (d, i) {
			// Always show the first and last tick lines
			if (i == 0 || i == attribute_bins_data.length - 1) return false;
			return i % show_x_axis_labels_every_n_bins != 0;
		})
		.attr("fill", "none")
		.attr("stroke", "none");
	// Make the x axis thicks shorter every n shown bins
	histogram_container.selectAll(".axis--x .tick line")
		.filter(function (d, i) {
			// Always show the first and last tick lines
			if (i == 0 || i == attribute_bins_data.length - 1) return false;
			return i % (show_x_axis_labels_every_n_bins * highlight_x_axis_labels_every_n_shown_bins) != 0;
		})
		// .attr("y2", "0.125em");
		.attr("opacity", non_highlighted_x_axis_ticks_opacity);
	// Show the x axis labels every n bins
	histogram_container.selectAll(".axis--x .tick text")
		// Hide the x axis labels every n bins
		.filter(function (d, i) {
			if (i == 0 || i == attribute_bins_data.length - 1) return false;
			return i % show_x_axis_labels_every_n_bins != 0;
		})
		.attr("fill", "none")
		.attr("stroke", "none");
	// Highlight every x axis label every n shown bins
	histogram_container.selectAll(".axis--x .tick text")
		.filter(function (d, i) {
			if (i == 0 || i == attribute_bins_data.length - 1) return false;
			return i % (show_x_axis_labels_every_n_bins * highlight_x_axis_labels_every_n_shown_bins) != 0;
		})
		// .style("font-size", `${x_labels_font_size * 0.75}em`);
		.attr("opacity", non_highlighted_x_axis_ticks_opacity);
	// Create the y axis
	let y_labels_font_size = x_labels_font_size;
	histogram_container.append("g")
		.attr("class", "axis axis--y")
		.call(
			// d3.axisLeft(y).ticks(10, "")
			// Make the y axis show numbers using a sintax "1k" instead of "1000", "1M" instead of "1000000", etc.
			d3.axisLeft(y)
				.tickFormat(function (d) {
					if (d > y_max_value * (1 + y_max_value_offset_portion / 1.5)) {
						return "";
					}
					// If the number is not an integer, hide it
					if (d % 1 != 0) return "";
					return format_number_string(d, 1);
				})
				.tickSize(2)
				// Show a maximum of 5 ticks
				.ticks(7)
		)
		.selectAll("text")
		.style("font-size", `${y_labels_font_size}em`);
	// Hide the non integer y axis thicks and labels
	histogram_container.selectAll(".axis--y .tick line")
		.filter(function (d, i) {
			// Always show the first tick line
			if (i == 0) return false;
			return d % 1 != 0;
		})
		.attr("fill", "none")
		.attr("stroke", "none");
	histogram_container.selectAll(".axis--y .tick text")
		.filter(function (d, i) {
			// Always show the first tick label
			if (i == 0) return false;
			return d % 1 != 0;
		})
		.attr("fill", "none")
		.attr("stroke", "none");
	// Add the y axis label
	// histogram_container.append("text")
	// 	// .attr("transform", "rotate(-90)")
	// 	.attr("y", 6)
	// 	// .attr("dy", "0.5em")
	// 	.attr("dx", "0.5em")
	// 	.attr("fill", bar_color)
	// 	.attr("text-anchor", "start")
	// 	.text("Games")
	// 	.style("font-size", `${y_labels_font_size}em`);
	// Create horizontal lines for each y tick to act as separators for bars
	// let horizontal_lines = histogram_container.selectAll(".horizontal-line")
	// 	.data(y.ticks())
	// 	.enter().append("line")
	// 	.attr("class", "horizontal-line")
	// 	.attr("x1", function (d) { return x(attribute_bins_data[0]["bin"]); })
	// 	.attr("x2", function (d) { return x(attribute_bins_data[attribute_bins_data.length - 1]["bin"]); })
	// 	.attr("y1", function (d) { return y(d); })
	// 	.attr("y2", function (d) { return y(d); })
	// 	.attr("stroke", "#ffffff")
	// 	.attr("stroke-width", 0.375)
	// 	.attr("opacity", 0.25);
	// Append a container for the bars
	let bars_container = histogram_container.append("g")
		.attr("class", "bars-container");
	// create a linear gradient going from a white to a transparent color from bottom to top
	let bar_gradient_color = "#ffffff";
	let bar_gradient = bars_container.append("linearGradient")
		.attr("id", "bar-gradient")
		.attr("gradientUnits", "userSpaceOnUse")
		.attr("x1", "0%").attr("y1", "0%")
		.attr("x2", "0%").attr("y2", "100%")
		.selectAll("stop")
		.data([
			{ offset: "0%", color: bar_gradient_color + "00" },
			{ offset: "40%", color: bar_gradient_color + "00" },
			{ offset: "100%", color: bar_gradient_color + "28" }
		])
		.enter()
		.append("stop")
		.attr("offset", function (d) { return d.offset; })
		.attr("stop-color", function (d) { return d.color; });
	// Add the bars
	bars_container.selectAll(".bar")
		.data(attribute_bins_data)
		.enter()
		.append("rect")
		.attr("class", "bar")
		.attr("x", function (d) { return x(d["bin"]); })
		.attr("y", function (d) { return y(d["count"]); })
		.attr("width", x.bandwidth())
		.attr("height", function (d) { return height - y(d["count"]); })
		// .style("fill", bar_color)	// Color will be set later
		.attr("fill", function (d) { return get_bar_color(d3.select(this)); })
		.attr("value-bin", function (d) { return d["bin"]; })
		.attr("value-count", function (d) { return d["count"]; })
		.attr("pointer-events", "none")
		.attr("stroke", "#00000000")
		.attr("stroke-width", 1)
		.lower()
		// Add another bar for the tooltip (same as the previous ones but with a transparent fill and height that covers the whole histogram)
		.each(function (d) {
			let current_bar = d3.select(this);
			bars_container.append("rect")
				.attr("class", "bar-for-tooltip")
				.attr("x", current_bar.attr("x"))
				.attr("y", 0)
				.attr("width", current_bar.attr("width"))
				.attr("height", height)
				.style("fill", "url(#bar-gradient)")
				.style("opacity", 0)
				.attr("value-bin", current_bar.attr("value-bin"))
				.attr("value-count", current_bar.attr("value-count"))
				.attr("cursor", "pointer")
				.lower();
		});

	// Create vertical lines for each bin to act as separators for bars
	let vertical_lines_container = histogram_container.append("g")
		.attr("class", "vertical-lines-container")
		.attr("pointer-events", "none");
	let vertical_lines = vertical_lines_container.selectAll(".vertical-line")
		.data(attribute_bins_data)
		.enter().append("line")
		.attr("class", "vertical-line")
		.attr("x1", function (d) { return x(d["bin"]); })
		.attr("x2", function (d) { return x(d["bin"]); })
		.attr("y1", function (d) { return y(0); })
		.attr("y2", function (d) { return y(y_max_value * (1 + y_max_value_offset_portion)); })
		.attr("stroke", "#ffffff")
		.attr("stroke-width", 0.375)
		.attr("opacity", 0.2)
		// .attr("stroke-dasharray", "3.5, 2.5")
		.attr("pointer-events", "none")
		.lower();
	// Hide every vertical line every n bins (show_x_axis_labels_every_n_bins) and every n full opacity x axis labels (highlight_x_axis_labels_every_n_shown_bins)
	vertical_lines_container.selectAll(".vertical-line")
		.filter(function (d, i) {
			// Never show the first vertical line
			if (i == 0) return false;
			// Always show the last vertical lines
			if (i == attribute_bins_data.length - 1) return false;
			// return i % (show_x_axis_labels_every_n_bins * highlight_x_axis_labels_every_n_shown_bins) != 0;
			return i % (show_x_axis_labels_every_n_bins) != 0;
		})
		.attr("opacity", 0);

	bars_container.raise();

	// // Print the width and height of the svg element
	// console.log("width: " + $(container_div_element).width());
	// console.log("height: " + $(container_div_element).height());
	// // Print the svg element width and height (in pixels)
	// console.log("svg width: " + svg_element.attr("width"));
	// console.log("svg height: " + svg_element.attr("height"));
	// // Print the histogram container width and height (in pixels)
	// console.log("histogram container width: " + bars_container.node().getBBox().width);
	// console.log("histogram container height: " + bars_container.node().getBBox().height);

	// Add a rectangle going from the start to the end of the histogram to allow brushing
	let brush_rectangle = bars_container.append("rect")
		.attr("class", "brush-rectangle")
		.attr("x", 0)
		.attr("y", 0)
		.attr("width", width)
		.attr("height", height)
		.style("fill", "#ffffff30")
		.style("stroke", "#ffffff40")
		.attr("pointer-events", "none");

	let selected_range_borders = bars_container.append("g")
		.attr("class", "selected-range-borders")
		.lower();
	// Append 2 vertical lines to show the start and end of the selected range
	let selected_range_lines_color = "#ffffff20";
	let selected_rectangle_gradient_color = "#ffffff";	// Don't use opacity here, it's appended later
	// selected_range_borders.append("line")
	// 	.attr("class", "selected-range-border-start")
	// 	.attr("x1", 0)
	// 	.attr("y1", 0)
	// 	.attr("x2", 0)
	// 	.attr("y2", height)
	// 	.style("stroke", selected_range_lines_color)
	// 	.style("stroke-width", 1)
	// 	.style("opacity", 0)
	// 	.attr("pointer-events", "none");
	// selected_range_borders.append("line")
	// 	.attr("class", "selected-range-border-end")
	// 	.attr("x1", 0)
	// 	.attr("y1", 0)
	// 	.attr("x2", 0)
	// 	.attr("y2", height)
	// 	.style("stroke", selected_range_lines_color)
	// 	.style("stroke-width", 1)
	// 	.style("opacity", 0)
	// 	.attr("pointer-events", "none");
	// Also append a gradient from #ffffff30 to #ffffff00 to #ffffff30 to show the selected range
	selected_range_borders.append("linearGradient")
		.attr("class", "selected-range-rectangle-gradient")
		.attr("id", "selected-range-rectangle-gradient")
		.attr("x1", "0%")
		.attr("y1", "0%")
		.attr("x2", "100%")
		.attr("y2", "0%")
		.selectAll("stop")
		.data([
			{ offset: "0%", color: selected_rectangle_gradient_color + "15" },
			{ offset: "15%", color: selected_rectangle_gradient_color + "09" },
			{ offset: "85%", color: selected_rectangle_gradient_color + "09" },
			{ offset: "100%", color: selected_rectangle_gradient_color + "15" }
		])
		.enter()
		.append("stop")
		.attr("offset", function (d) { return d.offset; })
		.attr("stop-color", function (d) { return d.color; });
	// Append a rectangle to show the selected range
	selected_range_borders.append("rect")
		.attr("class", "selected-range-rectangle")
		.attr("x", 0)
		.attr("y", 0)
		.attr("width", 0)
		.attr("height", height)
		.style("fill", "url(#selected-range-rectangle-gradient)")
		.style("stroke", selected_range_lines_color)
		.style("stroke-width", 1)
		.style("opacity", 0)
		.attr("pointer-events", "none");


	// Used to set the bars' opacity based on the current brushing state
	function set_bars_opacity(start_bin, end_bin) {
		// console.log("start_bin: " + start_bin + ", end_bin: " + end_bin);
		bars_container.selectAll(".bar")
			.style("opacity", function (d) {
				let current_bar = d3.select(this);
				let current_bar_bin = current_bar.attr("value-bin");
				if (start_bin != null && end_bin != null) {
					// Use the sorting function to check if the current bar bin is between the start and end bins
					if (bins_sorting_function(start_bin, current_bar_bin) <= 0 && bins_sorting_function(current_bar_bin, end_bin) <= 0) {
						return 1;
					} else {
						return bar_disabled_opacity;
					}
				} else {
					return 1;
				}
			});
	}

	// Set the selected range borders and rectangle
	function set_selected_range_borders(start_bin, end_bin) {
		function hide_selected_range_borders_and_rectangle() {
			// selected_range_borders.select(".selected-range-border-start")
			// 	.style("opacity", 0);
			// selected_range_borders.select(".selected-range-border-end")
			// 	.style("opacity", 0);
			selected_range_borders.select(".selected-range-rectangle")
				.style("opacity", 0);
		}
		if (
			(start_bin == null || end_bin == null)
			|| (start_bin == attribute_bins_keys[0] && end_bin == attribute_bins_keys[attribute_bins_keys.length - 1])
		) {
			// hide the selected range borders and rectangle
			hide_selected_range_borders_and_rectangle();
		} else {
			// Assume start_bin <= end_bin and also assumes start_bin != null and end_bin != null
			// Get the start and end bin elements
			let start_bin_element = d3.select(".bar[value-bin='" + start_bin + "']");
			let end_bin_element = d3.select(".bar[value-bin='" + end_bin + "']");
			// Get the start and end bin element x positions
			let start_bin_element_x = parseFloat(start_bin_element.attr("x"));
			let end_bin_element_x = parseFloat(end_bin_element.attr("x"));
			// Consider the width as the bandwith of the x axis
			let x_bandwidth = parseFloat(x.bandwidth());
			// Set the selected range borders and rectangle
			selected_range_borders.select(".selected-range-border-start")
				.attr("x1", start_bin_element_x)
				.attr("x2", start_bin_element_x)
				.style("opacity", 1);
			selected_range_borders.select(".selected-range-border-end")
				.attr("x1", end_bin_element_x + x_bandwidth)
				.attr("x2", end_bin_element_x + x_bandwidth)
				.style("opacity", 1);
			selected_range_borders.select(".selected-range-rectangle")
				.attr("x", start_bin_element_x)
				.attr("width", end_bin_element_x + x_bandwidth - start_bin_element_x)
				.style("opacity", 1);
		}
	}

	// Initially set the bar opacity to 1 and the selected range borders and rectangle to be hidden
	set_bars_opacity(null, null);
	set_selected_range_borders(null, null);

	function update_brush_rectangle_final(use_previous_brush_values = false, force_values_reset = false) {
		// Get the current brush values
		let start_value = null;
		let end_value = null;
		if (!force_values_reset) {
			let current_brush_values = get_current_brush_values_function(use_previous_brush_values);
			start_value = current_brush_values["start_value"];
			end_value = current_brush_values["end_value"];
		}
		// console.log("current_brush_values: " + JSON.stringify(current_brush_values));
		// Update the brush rectangle
		// console.log("current_brush_values: " + start_value + ", " + end_value);
		// update_brush_rectangle(start_value, end_value);
		if (start_value != null && end_value != null) {
			brush_rectangle.attr("x", x(start_value));
			brush_rectangle.attr("width", x(end_value) - x(start_value) + x.bandwidth());
		} else {
			brush_rectangle.attr("x", 0);
			brush_rectangle.attr("width", 0);
		}
		// Update bar colors and selected range borders and rectangle
		// console.log("start_value: " + start_value + ", end_value: " + end_value);
		set_bars_opacity(start_value, end_value);
		set_selected_range_borders(start_value, end_value);
		// Hide the brush rectangle at the end
		brush_rectangle.transition()
			.duration(100)
			.style("opacity", 0);
	}
	function update_brush_rectangle(start_bin, end_bin) {
		// Show the brush rectangle
		brush_rectangle.style("opacity", 1);
		if (end_bin != null) {
			// let brushing_right = true;
			// Update the rectangle width to go from the start of the end bin to the end of the end bin
			let current_brush_values = get_current_brush_values_function();
			let current_brush_start_value = current_brush_values["start_value"];
			// If the current start brush value is more than the end bin, then swap the start and end values
			// NOTE: use the sorting function to check if the current bar bin is between the start and end bins
			// if (current_brush_start_value != null && current_brush_start_value > end_bin) {
			if (current_brush_start_value != null && bins_sorting_function(current_brush_start_value, end_bin) > 0) {
				let temp = current_brush_start_value;
				current_brush_start_value = end_bin;
				end_bin = temp;
				// brushing_right = false;
			}
			brush_rectangle.attr("x", x(current_brush_start_value));
			brush_rectangle.attr("width", x(end_bin) - x(current_brush_start_value) + x.bandwidth());
		} else if (start_bin != null) {
			// Make the rectangle go from the start of the start bin to the end of the start bin
			brush_rectangle.attr("x", x(start_bin));
			brush_rectangle.attr("width", x.bandwidth());
		}
	}

	// Initially disable the brush rectangle
	update_brush_rectangle_final();

	// Allow brushing on the various histogram bars (i.e. the bars for tooltip) and save the start and end bins for each histogram
	if (brush_update_function != undefined) {
		// Make it so that if the user clicks on a .bar-for-tooltip element, the brush is started, then updated with the newly hovered bar, then ended if the user removes the mouse from the bar
		// On mouse click, start the brush
		bars_container.selectAll(".bar-for-tooltip")
			.on("mousedown", function (event, d) {
				// Check if mouse button is the right one
				if (event.button == 0) {
					// Prevent the default behavior
					// event.preventDefault();
					// Get the currently selected bin
					let current_bar_for_tooltip = d3.select(this);
					let current_bar = d3.select(".bar[value-bin='" + current_bar_for_tooltip.attr("value-bin") + "']");
					let current_bin = current_bar.attr("value-bin");
					brush_update_function(current_bin, null);
					update_brush_rectangle(current_bin, null);
					// Reset the bars opacity and selected range borders and rectangle
					set_bars_opacity(null, null);
					set_selected_range_borders(null, null);
				}
			})
			.on("mouseup", function (event, d) {
				if (event.button == 0) {
					// Prevent the default behavior
					// event.preventDefault();
					// Get the currently selected bin
					let current_bar_for_tooltip = d3.select(this);
					let current_bar = d3.select(".bar[value-bin='" + current_bar_for_tooltip.attr("value-bin") + "']");
					let current_bin = current_bar.attr("value-bin");
					brush_update_function(null, current_bin);
					update_brush_rectangle_final();
				}
			});
		// // On mouse over, update the brush if the mouse is down
		// bars_container.selectAll(".bar-for-tooltip")
		// 	.on("mousemove", function (event, d) {
		// 		if (d3.event.buttons == 1) {
		// 			// Get the currently selected bin
		// 			let current_bar_for_tooltip = d3.select(this);
		// 			let current_bar = d3.select(".bar[value-bin='" + current_bar_for_tooltip.attr("value-bin") + "']");
		// 			let current_bin = current_bar.attr("value-bin");
		// 			brush_update_function(current_bin, current_bin);
		// 		}
		// 	});
		// On exit from the histogram container, end the brush
		svg_element.on("mouseleave", function (event, d) {
			let current_brush_values = get_current_brush_values_function();
			let was_brushing = current_brush_values["is_brushing"];
			if (was_brushing) {
				// Cancel brushing 
				// update_brush_rectangle_final(true);
				// brush_update_function(null, null);

				// Make it so that if the mouse exits the svg element from the right side, the brush is ended with the end brush value being the last bin,
				//		if instead the mouse exits the svg element from the left side, the brush is ended with the start brush value being the first bin
				// 		If ultimately the mouse exits the svg element from the top or bottom, the brush is calceled
				// let current_brush_start_value = current_brush_values["start_value"];
				let current_brush_end_value = current_brush_values["end_value"];
				// If the mouse position x is less than the svg element width, then the mouse exited from the left side
				let mouse_pos_x = event.offsetX;
				let actual_svg_width = 100 * container_div_aspect_ratio;
				if (mouse_pos_x <= 0) {
					// Mouse exited from left
					current_brush_end_value = attribute_bins_keys[0];
				} else if (event.offsetX >= actual_svg_width) {
					// Mouse exited from right
					current_brush_end_value = attribute_bins_keys[attribute_bins_keys.length - 1];
				} else {
					// Cancel brushing (this should never happen)
					current_brush_end_value = null;
				}
				brush_update_function(null, current_brush_end_value);
				update_brush_rectangle_final();
				// console.log("actual_svg_width: " + actual_svg_width + ", mouse_pos_x: " + mouse_pos_x + ", mouse_pos_y: " + mouse_pos_y, ", mouse_angle: " + mouse_angle);
			}
		});

		// // Add a rect to the bars_container to see the bounds of the bars container
		// bars_container.append("rect")
		// 	.attr("x", 0)
		// 	.attr("y", 0)
		// 	.attr("width", width)
		// 	.attr("height", height)
		// 	.style("fill", "#00000000")
		// 	.style("stroke", "#f00")
		// 	.style("stroke-width", 3)
		// 	.style("pointer-events", "none");

	}

	function get_total_games_based_on_other_filters() {
		let total_games_based_on_other_filters = 0;
		if (get_range_filter_name_string(section_element_selector) == "release date") total_games_based_on_other_filters = STATE["visualization_states"]["RELEASED_GAMES_BY_RELEASE_DATE"]["total_games_based_on_other_filters"];
		else if (get_range_filter_name_string(section_element_selector) == "number of copies sold") total_games_based_on_other_filters = STATE["visualization_states"]["RELEASED_GAMES_BY_COPIES_SOLD"]["total_games_based_on_other_filters"];
		else if (get_range_filter_name_string(section_element_selector) == "rating") total_games_based_on_other_filters = STATE["visualization_states"]["RELEASED_GAMES_BY_REVIEW_RATING"]["total_games_based_on_other_filters"];
		else if (get_range_filter_name_string(section_element_selector) == "price") total_games_based_on_other_filters = STATE["visualization_states"]["RELEASED_GAMES_BY_PRICE"]["total_games_based_on_other_filters"];
		else total_games_based_on_other_filters = 0;
		return total_games_based_on_other_filters;
	}

	function get_bar_color(bar_element, highlight = false) {
		// Set the color of a bar element
		let bar_bin = bar_element.datum()["bin"];
		let bar_value = bar_element.datum()["count"];
		if (bar_value == null || bar_value == undefined || bar_bin == null || bar_bin == undefined) {
			console.log("bar_value or bar_bin is null or undefined: " + bar_value + ", " + bar_bin);
		}
		let max_for_bin = attribute_bins["max_bins"][bar_bin];
		let normalized_value = bar_value / max_for_bin;
		// if normalized value is NOT a number, set it to 0
		// if (isNaN(normalized_value) || normalized_value == null || normalized_value == undefined) {
		// 	console.log("normalized_value is null or undefined: " + normalized_value);
		// 	console.log("bar_value: " + bar_value + ", max_for_bin: " + max_for_bin);
		// }
		let bar_color = get_gradient_color(normalized_value);
		if (highlight) bar_color = offset_saturation_and_value(bar_color, -10, 10);
		// bar_element.style("fill", bar_color);
		return bar_color;
	}

	// Add a tooltip to the bars showing the bin and the number of games on mouse over
	// let tooltip = d3.select(".tooltip");
	bars_container.selectAll(".bar-for-tooltip")
		.on("mouseover", function (event, d) {
			// Get the current bar for the tooltip
			let current_bar_for_tooltip = d3.select(this);
			// Get the actual bar (the parent of the current bar for the tooltip)
			let current_bar = d3.select(".bar[value-bin='" + current_bar_for_tooltip.attr("value-bin") + "']");
			// Set the tooltip text
			// function get_tooltip_text_element(bin, count) {
			// 	let bin_element = document.createElement("div");
			// 	bin_element.innerHTML = bin;
			// 	bin_element.style.fontWeight = "bold";
			// 	bin_element.style.fontSize = "1.25em";
			// 	let count_element = document.createElement("div");
			// 	count_element.innerHTML = count + " games";
			// 	let toRet = document.createElement("div");
			// 	toRet.appendChild(bin_element);
			// 	toRet.appendChild(count_element);
			// 	return toRet;
			// }
			// tooltip.selectAll("*").remove();
			// tooltip.node().appendChild(get_tooltip_text_element(current_bar.attr("value-bin"), current_bar.attr("value-count")));
			// Get the current bar top right corner position related to the whole document
			let bar_tr_corner = {
				"x": current_bar.node().getBoundingClientRect().x + current_bar.node().getBoundingClientRect().width,
				"y": current_bar.node().getBoundingClientRect().y
			};
			// Set the tooltip position
			// tooltip.style("left", bar_tr_corner.x + "px");
			// tooltip.style("top", bar_tr_corner.y + "px");
			// // Show the tooltip
			// tooltip.style("opacity", 1);

			// Set the tooltip text
			let title_append_string = "";
			if (get_range_filter_name_string() == "number of copies sold") title_append_string = "&nbsp;&nbsp;copies";
			// Get the percentage with 2 decimal digits
			let value_percentage_string_filtered_games = "0";
			if (get_total_games_based_on_other_filters() > 0) value_percentage_string_filtered_games = Math.round(current_bar.attr("value-count") / get_total_games_based_on_other_filters() * 10000) / 100;
			let value_percentage_string_all_games = "0";
			let percentage_of_all_games = Math.round(current_bar.attr("value-count") / attribute_bins["max_bins"][current_bar.attr("value-bin")] * 10000) / 100;
			if (percentage_of_all_games > 0) value_percentage_string_all_games = percentage_of_all_games;
			let percentage_string_all_games_append_string = "";
			if (get_range_filter_name_string() == "release date") percentage_string_all_games_append_string = " released on " + current_bar.attr("value-bin");
			else if (get_range_filter_name_string() == "number of copies sold") percentage_string_all_games_append_string = " that sold " + current_bar.attr("value-bin") + " copies";
			else if (get_range_filter_name_string() == "rating") percentage_string_all_games_append_string = " with this rating";
			else if (get_range_filter_name_string() == "price") percentage_string_all_games_append_string = " with this price";
			// let prepend_string = "=$nbsp;&nbsp;";
			// let prepend_string = "";
			let tooltip_texts = [
				current_bar.attr("value-count") + " games (" + value_percentage_string_filtered_games + "% of all filtered games).",
				// current_bar.attr("value-count") + " games.",
				// // prepend_string + value_percentage_string_all_games + "% of all games" + percentage_string_all_games_append_string + ".",
				// prepend_string + value_percentage_string_filtered_games + "% of all filtered games.",
				TOOLTIP_LINE_SEPARATOR,
				"The color of this histogram bar encodes the percentage of filtered games out of all games" + percentage_string_all_games_append_string + " (" + value_percentage_string_all_games + "%).",
				get_color_gradient_for_tooltip(0, 100, function (value) { return Math.round(value) + "%"; })
			]
			let tooltip_anchor_position = [0, 0.5];
			if (get_range_filter_name_string() == "release date") tooltip_anchor_position = [0, 1];
			set_tooltip(current_bar.node(), current_bar.attr("value-bin") + title_append_string, tooltip_texts, tooltip_anchor_position);

			// Highlight the bar
			// current_bar.style("fill", bar_highlight_color);
			current_bar.style("fill", get_bar_color(current_bar, true));
			if (!get_current_brush_values_function()["is_brushing"]) {
				current_bar.style("stroke", color_scheme["viewport_highlight_stroke_color"]);
				// Also set the opacity of the hover rectangle to 1 if the height of the bar is 0
				current_bar_for_tooltip.style("opacity", 1);
			}
			// Update brushing
			if (brush_update_function != undefined) {
				// Check if the mouse is down
				let currently_brushing = get_current_brush_values_function()["is_brushing"];
				if (currently_brushing) {
					// Get the currently selected bin
					let current_bin = current_bar.attr("value-bin");
					update_brush_rectangle(null, current_bin);
				}
			}
		})
		.on("mouseout", function (event, d) {
			// Hide the tooltip
			hide_tooltip();
			// Unhighlight the bar
			let current_bar_for_tooltip = d3.select(this);
			// Get the actual bar
			let current_bar = d3.select(".bar[value-bin='" + current_bar_for_tooltip.attr("value-bin") + "']");
			// current_bar.style("fill", bar_color);
			current_bar.style("fill", get_bar_color(current_bar, false));
			current_bar.style("stroke", "#ffffff00");
			// Also reset the opacity of the hover rectangle
			current_bar_for_tooltip.style("opacity", 0);
		});

	// On click on section_element_selector + " #section-reset-button", reset the brushing
	$(section_element_selector + " #section-reset-button").click(function (event) {
		// Reset the brushing
		update_brush_rectangle_final(false, true);
		brush_update_function(null, null);
	});
	// On right click on each bar's .bar-for-tooltip element, reset the brushing
	bars_container.selectAll(".bar-for-tooltip")
		.on("contextmenu", function (event, d) {
			// Prevent the default behavior
			event.preventDefault();
			// Reset the brushing
			update_brush_rectangle_final(false, true);
			brush_update_function(null, null);
		});

	// Make it so that, on each update, the bars change their height, value-bin and value-count attributes based on the new data, plus the y axis is rescaled to fit the new data
	// NOTE: this is done to avoid having to update the bars on each data update
	container_div_element.on("update", function (event) {

		// console.log("UPDATE");

		// console.log(event)

		// Get the new bins
		let new_attribute_bins_data = event.detail["attribute_bins_data"].reverse();

		// Update the bars (use the "update" event to update the bars without having to re-append them)
		// bars_container.selectAll(".bar")
		// 	.data(new_attribute_bins_data)
		// 	.dispatch("update");
		// Update the y axis
		let new_y_max_value = d3.max(new_attribute_bins_data, function (d) { return d["count"]; });
		if (new_y_max_value == 0) new_y_max_value = 1;
		y.domain([0, new_y_max_value * (1 + y_max_value_offset_portion)]);
		// Create the y axis
		let y_labels_font_size = x_labels_font_size;
		histogram_container.select(".axis--y")
			.transition()
			.duration(100)
			.call(
				// d3.axisLeft(y).ticks(10, "")
				// Make the y axis show numbers using a sintax "1k" instead of "1000", "1M" instead of "1000000", etc.
				d3.axisLeft(y)
					.tickFormat(function (d) {
						if (d > new_y_max_value * (1 + y_max_value_offset_portion / 1.5)) {
							return "";
						}
						return format_number_string(d, 1);
					})
					.tickSize(2)
					// Show a maximum of 5 ticks
					.ticks(7)
			)
		histogram_container.select(".axis--y")
			.selectAll("text")
			.style("font-size", `${y_labels_font_size}em`);
		// Hide the non integer y axis thicks and labels
		histogram_container.selectAll(".axis--y .tick line")
			.filter(function (d, i) {
				// Always show the first tick line
				if (i == 0) return false;
				return d % 1 != 0;
			})
			.attr("fill", "none")
			.attr("stroke", "none");
		histogram_container.selectAll(".axis--y .tick text")
			.filter(function (d, i) {
				// Always show the first tick label
				if (i == 0) return false;
				return d % 1 != 0;
			})
			.attr("fill", "none")
			.attr("stroke", "none");
		// Update the bars height and value-bin and value-count attributes
		bars_container.selectAll(".bar")
			.data(new_attribute_bins_data)
			.transition()
			.duration(100)
			.attr("y", function (d) { return y(d["count"]); })
			.attr("height", function (d) { return height - y(d["count"]); })
			.attr("value-bin", function (d) { return d["bin"]; })
			.attr("value-count", function (d) { return d["count"]; })
			.style("fill", function (d) { return get_bar_color(d3.select(this)); });
		// Update the bars-for-tooltip height
		bars_container.selectAll(".bar-for-tooltip")
			.data(new_attribute_bins_data)
			.transition()
			.duration(100)
			.attr("height", height);
		// Update the brush rectangle
		update_brush_rectangle_final();
	});


	// Returns the string "[category]" or "[categories]" based on the category names
	function get_range_filter_name_string() {
		let range_filter_name_string = "range filter";
		if (attribute_bins_keys.includes("01/2017") || attribute_bins_keys.includes("2017")) range_filter_name_string = "release date";
		else if (attribute_bins_keys.includes("0")) range_filter_name_string = "number of copies sold";
		else if (attribute_bins_keys.includes("None")) range_filter_name_string = "rating";
		else if (attribute_bins_keys.includes("Free")) range_filter_name_string = "price";
		else range_filter_name_string = "range filter";
		return range_filter_name_string;
	}
	// Returns [X, Y] where X and Y are integers in range [-1, 1] based on if the tooltip container element is in the top, left or right position of the screen and also in the left or right position of the screen
	function calculate_tooltip_optimal_translate_position(element) {
		// Get the positions relative to the viewport as a range from 0 to 100
		let element_bounding_box = element.get(0).getBoundingClientRect();
		let element_center_position = {
			"x": element_bounding_box["x"] + element_bounding_box["width"] / 2,
			"y": element_bounding_box["y"] + element_bounding_box["height"] / 2
		};
		// Set positions to be in range [-1, 1]
		let x = (element_center_position["x"] / window.innerWidth) * 2 - 1;
		let y = (element_center_position["y"] / window.innerHeight) * 2 - 1;
		// Set x to be -1, 0 or 1 based on the position of the element (if its in the first third, second third or last third of the screen)
		if (x < -0.333) x = -1;
		else if (x < 0.333) x = 0;
		else x = 1;
		// Set y to be -1, 0 or 1 based on the position of the element (if its in the first third, second third or last third of the screen)
		if (y < -0.333) y = -1;
		else if (y < 0.333) y = 0;
		else y = 1;
		// Return the calculated positions
		return [-1 * x, -1 * y];
	}
	// On hover over section buttons (info and reset buttons), make the tooltips appear with the text for "Info" or "Reset"
	$(section_element_selector + " .buttons-container #section-reset-button").on("mouseover", function (event) {
		let optimal_translate_position = calculate_tooltip_optimal_translate_position($(this));
		let translate_position_to_use = [optimal_translate_position[0], optimal_translate_position[1]];	// Should defalut to [0,1] to show tooltipp on top right of the element
		set_tooltip(this, "Reset", ["Reset all filters on games' " + get_range_filter_name_string() + "."], translate_position_to_use);
	});
	$(section_element_selector + " .buttons-container #section-reset-button").on("mouseleave", function (event) {
		hide_tooltip();
	});
	$(section_element_selector + " .buttons-container #section-info-button").on("mouseover", function (event) {
		let optimal_translate_position = calculate_tooltip_optimal_translate_position($(this));
		let translate_position_to_use = [optimal_translate_position[0], optimal_translate_position[1]]; // Should defalut to [0,1] to show tooltipp on top right of the element
		let filters_range_string = get_range_filter_name_string();
		let texts_to_show = [
			"Include in results only games with a " + filters_range_string + " in the selected range.",
			TOOLTIP_LINE_SEPARATOR,
			"Left click and drag on the histogram to select a " + filters_range_string + " range to filter games by.",
			"Right click on the histogram to reset the filter on games' " + filters_range_string + ".",
			// TOOLTIP_LINE_SEPARATOR,
			// "Click on the reset button to reset all filters on " + get_category_name_string(true)
		];
		if (filters_range_string == "number of copies sold") {
			// Add, as a second element of the texts_to_show array, the note_text
			let note_text = "NOTE: The number of copies sold for games with a 'Free' price corresponds to the number of owners of the game.";
			texts_to_show.splice(1, 0, note_text);
		}
		let tooltip_title = "Released Games By " + get_range_filter_name_string().split(" ").map(function (word) { return word.charAt(0).toUpperCase() + word.slice(1); }).join(" ");
		set_tooltip(
			this,
			tooltip_title,
			texts_to_show,
			translate_position_to_use
		);
	});
	$(section_element_selector + " .buttons-container #section-info-button").on("mouseleave", function (event) {
		hide_tooltip();
	});

}

/**
 * Update the released games by feature histogram
 */
function update_released_games_by_feature_histogram(
	attribute_bins, section_element_selector,
	bins_sorting_function = undefined,
) {

	let container_div_element_selector = section_element_selector + " .content";

	// Use the bins in the "STATE" games by release date visualization state
	let attribute_bins_keys = Object.keys(attribute_bins["bins"]);
	let attribute_bins_values = Object.values(attribute_bins["bins"]);
	let attribute_bins_data = [];
	for (let i = 0; i < attribute_bins_keys.length; i++) {
		let bin_key = attribute_bins_keys[i];
		let bin_value = attribute_bins_values[i];
		attribute_bins_data.push({
			"bin": bin_key,
			"count": bin_value
		});
	}
	// Sort bins
	if (bins_sorting_function != undefined) {
		attribute_bins_data.sort(function (a, b) {
			return bins_sorting_function(a["bin"], b["bin"]);
		});
	}
	let container_div_element = $(container_div_element_selector);

	// Update the histogram
	let event_to_dispatch = new CustomEvent("update", { "detail": { "attribute_bins_data": attribute_bins_data } });
	container_div_element[0].dispatchEvent(event_to_dispatch);

}


/**
 * Update the brushing state of the given visualization.app-cell
 *
 * Returns true if the brushing state was updated successfully, false otherwise.
 */
function update_state_brushing(state_visualization, start_value, end_value, bin_values_sorting_function = undefined) {

	let updated_state_brushing = false;

	// console.log("BRUSHING | start_value: " + start_value + ", end_value: " + end_value);
	let brushable_visualizations = [
		"RELEASED_GAMES_BY_RELEASE_DATE",
		"RELEASED_GAMES_BY_COPIES_SOLD",
		"RELEASED_GAMES_BY_REVIEW_RATING",
		"RELEASED_GAMES_BY_PRICE"
	];
	if (!brushable_visualizations.includes(state_visualization)) {
		console.log("ERROR: Trying to update the brushing state of a visualization that does not have a brush value: " + state_visualization);
		return false;
	}
	// Initialize the visualization state if it does not exist
	if (STATE["visualization_states"][state_visualization] == undefined) {
		STATE["visualization_states"][state_visualization] = {
			"is_brushing": false,
			"brush_start_value": null,
			"brush_end_value": null,
			"previous_brush_start_value": null,
			"previous_brush_end_value": null
		};
	}
	// Set "is_brushing" to true if start value is not null
	if (start_value != null) {
		STATE["visualization_states"][state_visualization]["is_brushing"] = true;
	}
	// Store the current brushing values (if not both null) in a temporary state variable
	let current_brush_start_value = STATE["visualization_states"][state_visualization]["brush_start_value"];
	let current_brush_end_value = STATE["visualization_states"][state_visualization]["brush_end_value"];
	if (current_brush_start_value != null && current_brush_end_value != null) {
		STATE["visualization_states"][state_visualization]["previous_brush_start_value"] = current_brush_start_value;
		STATE["visualization_states"][state_visualization]["previous_brush_end_value"] = current_brush_end_value;
	}
	if (start_value == null && end_value == null
	) {
		// If both start and end values are null
		if (STATE["visualization_states"][state_visualization]["is_brushing"]) {
			// If start and end are null and was brushing before, then the brushing ended (because the player went out of the histogram container while brushing)
			// not brushing anymore
			STATE["visualization_states"][state_visualization]["is_brushing"] = false;
			STATE["visualization_states"][state_visualization]["brush_start_value"] = STATE["visualization_states"][state_visualization]["previous_brush_start_value"];
			STATE["visualization_states"][state_visualization]["brush_end_value"] = STATE["visualization_states"][state_visualization]["previous_brush_end_value"];
			// console.log("Brushing ended: Reset the brushing state of " + state_visualization + " to the previous values (" + STATE["visualization_states"][state_visualization]["start_value"] + ", " + STATE["visualization_states"][state_visualization]["end_value"] + ")");
			updated_state_brushing = true;
		} else {
			// If start and end are null and was not brushing before, then player clicked on the "reset" button
			// Reset the brushing state
			STATE["visualization_states"][state_visualization]["brush_start_value"] = null;
			STATE["visualization_states"][state_visualization]["brush_end_value"] = null;
			// STATE["visualization_states"][state_visualization]["previous_brush_start_value"] = null;
			// STATE["visualization_states"][state_visualization]["previous_brush_end_value"] = null;
			// console.log("Reset the brushing state of " + state_visualization + " to null");
			updated_state_brushing = true;
		}
	} else {
		// Update the brushing state
		if (start_value != null) STATE["visualization_states"][state_visualization]["brush_start_value"] = start_value;
		STATE["visualization_states"][state_visualization]["brush_end_value"] = end_value;
		// if the end value is not null, then the brushing ended
		if (end_value != null) {
			// Done "brushing"
			STATE["visualization_states"][state_visualization]["is_brushing"] = false;
			// Swap the start and end values if the start value is greater than the end value
			if (bin_values_sorting_function != undefined && bin_values_sorting_function(STATE["visualization_states"][state_visualization]["brush_start_value"], STATE["visualization_states"][state_visualization]["brush_end_value"]) > 0) {
				let temp = STATE["visualization_states"][state_visualization]["brush_start_value"];
				STATE["visualization_states"][state_visualization]["brush_start_value"] = STATE["visualization_states"][state_visualization]["brush_end_value"];
				STATE["visualization_states"][state_visualization]["brush_end_value"] = temp;
			}
			// If the previuos brush values had the same start and end value, and the current brush value also have the same start and end value which is the same as the prevoius one, set both to null
			if (
				STATE["visualization_states"][state_visualization]["previous_brush_start_value"] == STATE["visualization_states"][state_visualization]["previous_brush_end_value"]
				&& STATE["visualization_states"][state_visualization]["previous_brush_start_value"] == STATE["visualization_states"][state_visualization]["brush_start_value"]
				&& STATE["visualization_states"][state_visualization]["previous_brush_end_value"] == STATE["visualization_states"][state_visualization]["brush_end_value"]
			) {
				// Reset the filters in this case
				STATE["visualization_states"][state_visualization]["brush_start_value"] = null;
				STATE["visualization_states"][state_visualization]["brush_end_value"] = null;
				// Reset the previous brush values too
				STATE["visualization_states"][state_visualization]["previous_brush_start_value"] = null;
				STATE["visualization_states"][state_visualization]["previous_brush_end_value"] = null;
			}
			// console.log("Brushed " + state_visualization + " from " + STATE["visualization_states"][state_visualization]["brush_start_value"] + " to " + STATE["visualization_states"][state_visualization]["brush_end_value"]);
			updated_state_brushing = true;
		}
	}
	// Update the FILTERS object
	if (updated_state_brushing) {
		update_filters_based_on_visualization_states();
	}
	// updated_state_brushing = false;
	return updated_state_brushing;
}

/**
 * Update the STATE variables for category filters (languages, player modes and content ratings)
 */
function update_state_categories(state_visualization, categories, active_states) {

	let updated_state_categories = false;

	// Initialize the visualization state if it does not exist
	if (STATE["visualization_states"][state_visualization] == undefined) {
		STATE["visualization_states"][state_visualization] = {
			"active": []
		};
	} else if (STATE["visualization_states"][state_visualization]["active"] == undefined) {
		STATE["visualization_states"][state_visualization]["active"] = [];
	}
	// List of categories that are active
	let active_categories_list = STATE["visualization_states"][state_visualization]["active"];

	for (let i = 0; i < categories.length; i++) {
		let current_category = categories[i];
		// let current_category_is_active = active_categories_list.includes(current_category);
		let current_category_new_state = active_states[i];
		if (!current_category_new_state) {
			// Add the category to the list of active categories
			if (!active_categories_list.includes(current_category)) {
				active_categories_list.push(current_category);
				updated_state_categories = true;
			}
		} else {
			// Remove the category from the list of active categories
			if (active_categories_list.includes(current_category)) {
				active_categories_list.splice(active_categories_list.indexOf(current_category), 1);
				updated_state_categories = true;
			}
		}
	}
	// Update the FILTERS object
	if (updated_state_categories) {
		STATE["visualization_states"][state_visualization]["active"] = active_categories_list;
		// console.log("Updated " + state_visualization + " categories: " + JSON.stringify(active_categories_list));
		update_filters_based_on_visualization_states();
	}
	return updated_state_categories;
}


/**
 * Function to remap linear values in [0,1] to logarithmic values in [0,1] (and vice versa if "reverse_map_from_log_to_linear" is true)
 *
 * The given "value" should be in range [0, 1] (if not, it is clamped to be in that range and a "warning" message is printed to the console)
 *
 * The function maps values such that 0 and 1 are always mapped to 0 and 1, respectively
 *
 * If "reverse_map_from_log_to_linear" is true, then the function maps from logarithmic to linear values, otherwise it maps from linear to logarithmic values
 *
 * If "exponent" is overridden, then the function uses the given exponent instead of the default one (0.525):
 * 
 * - For the normal mapping (not reverse):
 * - an "exponent" > 1.25 behaves like an exponential value (i.e. the returned value starts by growing slowly, then grows faster and faster as the input "value" approaches 1)
 * - an "exponent" < 1.25 behaves like a logarithmic value (i.e. the returned value starts by growing fast, then grows slower and slower as the input "value" approaches 1)
 */
function map_linear_to_log_value(value, reverse_map_from_log_to_linear = false, exponent = 0.525) {
	// Clamp value to be in range [0, 1]
	if (value < 0 || value > 1) {
		if (value < 0) value = 0;
		if (value > 1) value = 1;
		console.log("WARNING: trying to map value" + value + " (outside of range [0, 1]) to linear/log");
	}
	if (!reverse_map_from_log_to_linear) {
		// Computes y = log2(x + 1)^p
		return Math.pow(Math.log2(value + 1), exponent);
		// NOTE: Visualize the function here: https://www.desmos.com/calculator/pbpixfepbk
	} else {
		function nthroot(x, n) {
			if (x < 0) {
				return -Math.pow(-x, 1 / n);
			} else {
				return Math.pow(x, 1 / n);
			}
		}
		// Computes y = 2^(x^(1/n)) - 1
		return Math.pow(2, nthroot(value, exponent)) - 1;
	}
}

/**
 * Given a value in [0, 1], return the corresponding color in the "color_scheme["color_gradient"]" (interpolated)
 *
 * If "use_logarithmic_scale" is true, then the function uses the "map_linear_to_log_value" function to map the value to a logarithmic scale and get a new value
 *
 * If a list of color strings (as hex values) is given to the "override_gradient" parameter, then the function uses that list of colors instead of the default one
 */
function get_gradient_color(value, use_logarithmic_scale = true, override_gradient = undefined) {
	// console.log("value: " + value);
	if (value < 0 || value > 1) {
		// console.log("WARNING: trying to get gradient color for value " + value + " (outside of range [0, 1])");
		if (value < 0) value = 0;
		if (value > 1) value = 1;
	}
	if (use_logarithmic_scale) {
		// Use a logarithmic scale (value is in [0, 1], should be mapped onto [0, 1])
		value = map_linear_to_log_value(value) / map_linear_to_log_value(1);
	}
	if (value < 0 || value > 1) {
		console.log("WARNING: the expression 'map_linear_to_log_value(value) / map_linear_to_log_value(1)' returned a value outside of range [0, 1]: " + value);
		if (value < 0) value = 0;
		if (value > 1) value = 1;
	}
	let color_gradient = color_scheme["color_gradient"];
	if (override_gradient != undefined) color_gradient = override_gradient;
	// Use color's hsv to interpolate between color values
	let closest_index_left = Math.floor(value * (color_gradient.length - 1));
	let closest_index_right = Math.ceil(value * (color_gradient.length - 1));
	// If any of the indices is out of bounds, set it to the closest valid index
	// if (closest_index_left < 0 || closest_index_left >= color_gradient.length || closest_index_right < 0 || closest_index_right >= color_gradient.length) {
	// 	console.log("ERROR: one index for given value " + value + " is outside of range [0, " + (color_gradient.length - 1) + "]: closest_index_left: " + closest_index_left + ", closest_index_right: " + closest_index_right);
	// }
	if (closest_index_left == closest_index_right) {
		return color_gradient[closest_index_left];
	} else {
		let left_col_hsv = hexToHsv(color_gradient[closest_index_left]);
		let right_col_hsv = hexToHsv(color_gradient[closest_index_right]);
		// console.log("left_col_hsv: " + JSON.stringify(left_col_hsv) + ", right_col_hsv: " + JSON.stringify(right_col_hsv));
		let interpolation_value = value * (color_gradient.length - 1) - closest_index_left; // In [0, 1]
		let interpolation_hsv = {
			"h": left_col_hsv["h"] + interpolation_value * (right_col_hsv["h"] - left_col_hsv["h"]),
			"s": left_col_hsv["s"] + interpolation_value * (right_col_hsv["s"] - left_col_hsv["s"]),
			"v": left_col_hsv["v"] + interpolation_value * (right_col_hsv["v"] - left_col_hsv["v"])
		};
		let color_rgb = hsvToRgb(interpolation_hsv["h"], interpolation_hsv["s"], interpolation_hsv["v"]);
		let gradient_color_hex = rgbToHex(color_rgb["r"], color_rgb["g"], color_rgb["b"]);
		return gradient_color_hex;
	}
}

function get_log_to_linear_scale_color_gradient() {
	// Take the 2 start and end points of the color gradient and sample 20 points from there with a log scale, then use those 20 points as the new color gradient
	let new_gradient = [];
	let points_to_sample = 5;	// Corresponding to [0, 0.25, 0.5, 0.75, 1.0]
	for (let i = 0; i < points_to_sample; i++) {
		let value = i / (points_to_sample - 1);
		let value_to_use = map_linear_to_log_value(value, true);
		let color = get_gradient_color(value_to_use, false);
		new_gradient.push(color);
	}
	return new_gradient;
}

/**
 * Create a gradient to be used as a general gradient legend in the general controls section
 */
function create_color_gradient_rectangle_for_general_controls_section() {

	let legend_container_element = document.querySelector("#general-gradient-legend");

	// console.log(legend_container_element);

	// let portions_to_show_on_gradient = [0.0, 0.25, 0.5, 0.75, 1.0];
	let portions_to_show_on_gradient = [0.0, 0.25, 0.5, 0.75, 1.0];

	let gradient_margins = { top: 5, right: 2.75, bottom: 20, left: 2.75 };

	let gradient_height_portion = 0.625;

	// let container_div_element_height = $(legend_container_element).height();
	// let gradient_container_aspect_ratio = $(legend_container_element).width() / $(legend_container_element).height();

	let gradient_container_aspect_ratio = $(legend_container_element).width() / $(legend_container_element).height();
	let container_size = 100;
	let gradient_container_element_height = container_size;
	let gradient_container_element_width = container_size * gradient_container_aspect_ratio;

	let use_linear_scale_for_gradient = true;
	let color_gradient_log = color_scheme["color_gradient"];
	let color_gradient_linear = get_log_to_linear_scale_color_gradient();
	let color_gradient_to_use = (use_linear_scale_for_gradient ? color_gradient_linear : color_gradient_log);

	let color_gradient_svg_height = gradient_container_element_height - (gradient_margins.top + gradient_margins.bottom);	// In %
	let color_gradient_svg_width = gradient_container_element_width - (gradient_margins.left + gradient_margins.right) * gradient_container_aspect_ratio;	// In %

	// Create an svg color gradient rectangle (use an svg with d3.js)
	let color_gradient_svg = d3.select(legend_container_element)
		.append("svg")
		.attr("id", "color-gradient-svg")
		.attr("width", "100%")
		.attr("height", "100%")
		.attr("viewBox", "0 0 100 100")
		.attr("preserveAspectRatio", "xMinYMin meet")
		.style("background-color", "#00000000")
		.attr("using-linear-scale", use_linear_scale_for_gradient)
		.attr("cursor", "pointer");
	// Crerate a container group for the color gradient svg
	let color_gradient_svg_container = color_gradient_svg.append("g")
		.attr("class", "color-gradient-svg-container")
		.attr("transform", "translate(" + gradient_margins.left * gradient_container_aspect_ratio + ", " + gradient_margins.top + ")");
	let color_gradient_svg_rect = color_gradient_svg_container.append("rect")
		.attr("x", 0)
		.attr("y", color_gradient_svg_height * (1 - gradient_height_portion))
		.attr("width", color_gradient_svg_width)
		.attr("height", color_gradient_svg_height * gradient_height_portion)
		.style("fill", "url(#color-gradient-svg-gradient)");
	let color_gradient_svg_gradient = color_gradient_svg_container.append("linearGradient")
		.attr("class", "color-gradient-svg-gradient")
		.attr("id", "color-gradient-svg-gradient")
		.attr("x1", (0 + gradient_margins.left) + "%")
		.attr("y1", "0%")
		.attr("x2", (100 - gradient_margins.right) + "%")
		.attr("y2", "0%");
	color_gradient_svg_gradient.selectAll("stop")
		.data(color_gradient_to_use.map(function (d, i) { return { "offset": i / (color_gradient_to_use.length - 1), "color": d }; }))
		.enter()
		.append("stop")
		.attr("offset", function (d) { return d.offset; })
		.attr("stop-color", function (d) { return d.color; });
	// Add thicks to the color gradient based on the map_log_value function
	let color_gradient_svg_ticks_g = color_gradient_svg_container.append("g")
		.attr("class", "color-gradient-svg-ticks-g")
		.attr("transform", "translate(0, 0)");
	function get_tick_position(value, use_linear_scale) {
		if (use_linear_scale) {
			return (value * color_gradient_svg_width);
		} else {
			return (map_linear_to_log_value(value, true) * color_gradient_svg_width);
		}
	}
	let color_gradient_svg_ticks = color_gradient_svg_ticks_g.selectAll(".color-gradient-svg-tick")
		.data(portions_to_show_on_gradient)
		.enter()
		.append("line")
		.attr("class", "color-gradient-svg-tick")
		.attr("x1", function (d) { return get_tick_position(d, use_linear_scale_for_gradient); })
		.attr("y1", 0)
		.attr("x2", function (d) { return get_tick_position(d, use_linear_scale_for_gradient); })
		.attr("y2", color_gradient_svg_height)
		.style("stroke", "#000000")
		.style("stroke-width", 2);
	// Add text to the color gradient based on the map_log_value function
	let color_gradient_svg_text_g = color_gradient_svg_container.append("g")
		.attr("class", "color-gradient-svg-text-g")
		.attr("transform", "translate(0, " + (color_gradient_svg_height * (1 - gradient_height_portion)) + ")");
	let color_gradient_svg_text = color_gradient_svg_text_g.selectAll(".color-gradient-svg-text")
		.data(portions_to_show_on_gradient)
		.enter()
		.append("text")
		.attr("class", "color-gradient-svg-text")
		.attr("x", function (d) { return get_tick_position(d, use_linear_scale_for_gradient); })
		.attr("y", "0")
		.attr("dy", "-0.45em")
		.style("text-anchor", function (d) { return d == 0 ? "start" : d == 1 ? "end" : "middle"; })
		.style("font-size", "24")
		.style("font-weight", "bold")
		.style("fill", color_scheme["white"])
		.text(function (d) { return (d * 100).toFixed(0) + "%"; });

	function update_color_gradient_svg_ticks_and_stop_positions() {
		let using_linear_scale = color_gradient_svg.attr("using-linear-scale") == "true";
		let new_color_gradient_to_use = (use_linear_scale_for_gradient ? color_gradient_linear : color_gradient_log);
		if (!using_linear_scale) {
			new_color_gradient_to_use = color_scheme["color_gradient"];
		} else {
			new_color_gradient_to_use = get_log_to_linear_scale_color_gradient();
		}
		function should_show_tick_with_value(value) {
			if (using_linear_scale) {
				return true;
			} else {
				return !(value >= 0.01 && value <= 0.45);
			}
		}
		// Update the ticks
		color_gradient_svg_ticks
			.transition()
			.duration(100)
			.attr("x1", function (d) { return get_tick_position(d, using_linear_scale); })
			.attr("x2", function (d) { return get_tick_position(d, using_linear_scale); })
			.style("opacity", function (d) { return should_show_tick_with_value(d) ? 1 : 0; });
		// Update the text
		color_gradient_svg_text
			.transition()
			.duration(100)
			.attr("x", function (d) { return get_tick_position(d, using_linear_scale); })
			.style("text-anchor", function (d) { return d == 0 ? "start" : d == 1 ? "end" : "middle"; })
			.text(function (d) { return (d * 100).toFixed(0) + "%"; })
			.style("opacity", function (d) { return should_show_tick_with_value(d) ? 1 : 0; });
		// Update the gradient stops
		color_gradient_svg_gradient.selectAll("stop")
			.data(new_color_gradient_to_use.map(function (d, i) { return { "offset": i / (new_color_gradient_to_use.length - 1), "color": d }; }))
			.transition()
			.duration(100)
			.attr("offset", function (d) { return d.offset; })
			.attr("stop-color", function (d) { return d.color; });
	}

	// On click on the gradient svg, toggle between linear and logarithmic scale, and on hover, show a tooltip
	$(color_gradient_svg.node())
		.on("click", function (event) {
			// Toggle between linear and logarithmic scale
			let using_linear_scale = color_gradient_svg.attr("using-linear-scale") == "true";
			color_gradient_svg.attr("using-linear-scale", !using_linear_scale);
			// Update the ticks and text
			update_color_gradient_svg_ticks_and_stop_positions();
		})
		.on("mouseover", function (event) {
			// Show a tooltip
			let tooltip_title = "Color Gradient Mapping";
			let tooltip_text = [
				"Color gradient mapping used to map values to colors in the various visualizations.",
				TOOLTIP_LINE_SEPARATOR,
				"Click on the gradient to toggle its aspect between a linear and a logarithmic scale map.",
				"NOTE: this doesn't affect the color mapping of the various visualizations.",
				TOOLTIP_LINE_SEPARATOR,
				"The gradient mapping is used in the following visualizations:",
				TOOLTIP_LINE_SPACING,
				"<b>1. GAME LANGUAGES, PLAYER MODES & CONTENT RATINGS</b>",
				"Used to map the percentage of all games meeting the filter criterias with a certain language, player mode or content rating to a color.",
				TOOLTIP_LINE_SPACING,
				"<b>2. RELEASED GAMES BY MONTH, COPIES SOLD, RATING & PRICE</b>",
				"Used to map the percentage of all games meeting the filter criterias released in a certain month, with a certain number of copies sold, with a certain rating or with a certain price, to a color, out of all games released in the same month, with the same number of copies sold, with the same rating or with the same price, respectively.",
				TOOLTIP_LINE_SPACING,
				"<b>3. GAMES RESULTS</b>",
				"Used to map the value for the revenue, copies sold, price and rating of each game to the a color representing the percentage of that value based on the corresponding maximum value out of all games that meet the filter criteria.",

			];
			set_tooltip(this, tooltip_title, tooltip_text, [1, 1]);
		})
		.on("mouseleave", function (event) {
			// Hide the tooltip
			hide_tooltip();
		});
}

function get_color_gradient_for_tooltip(min_value, max_value, format_gradient_ticks_text_labels_function = undefined) {
	let border_width = "0.15em";
	let min_width_string = "27.5em";
	let to_ret = "<div class='color-gradient-div-container' style='display: inline-flex; flex-direction: column; justify-content: space-between; align-items: center; width: 100%; min-width: " + min_width_string + "; font-size: 0.825em;'>";
	let linear_color_gradient = get_log_to_linear_scale_color_gradient();
	// Create a color gradient background style string
	let color_gradient_background_style = "background: linear-gradient(to right, ";
	for (let i = 0; i < linear_color_gradient.length; i++) {
		let color = linear_color_gradient[i];
		color_gradient_background_style += color + " " + (i / (linear_color_gradient.length - 1) * 100) + "%";
		if (i < linear_color_gradient.length - 1) color_gradient_background_style += ", ";
	}
	color_gradient_background_style += ");";
	// Add a color gradient with a white border around it and a div corresponding to the middle tick inside it
	// let color_gradient_div_element =
	// 	`<div class='color-gradient-div' style='${color_gradient_background_style} width: calc(100% - 2 * ${border_width}); height: 1.5em; border: ${border_width} solid #ffffff;'>
	// 		<div class='color-gradient-div-mid-tick' style='width:${border_width}; height: 100%; background: #ffffff;margin: auto;'>
	// 	</div>`;
	// Show 3 text values, corresponding to the min value, the mid value, and the max value
	// let color_Gradient_min_value_text = min_value;
	// if (format_gradient_ticks_text_labels_function != undefined) color_Gradient_min_value_text = format_gradient_ticks_text_labels_function(min_value);
	// let color_Gradient_mid_value_text = (min_value + max_value) / 2;
	// if (format_gradient_ticks_text_labels_function != undefined) color_Gradient_mid_value_text = format_gradient_ticks_text_labels_function(color_Gradient_mid_value_text);
	// let color_Gradient_max_value_text = max_value;
	// if (format_gradient_ticks_text_labels_function != undefined) color_Gradient_max_value_text = format_gradient_ticks_text_labels_function(max_value);
	// let color_gradient_text_div_element =
	// 	`
	// 	<div class='color-gradient-text-div' style='display: inline-flex; flex-direction: row; justify-content: space-between; width: 100%; margin-top: 0.1em'>
	// 		<div class='color-gradient-text-div-min-value' style='width: 33.33%; text-align: left;'>
	// 			${color_Gradient_min_value_text}
	// 		</div>
	// 		<div class='color-gradient-text-div-mid-value' style='width: 33.33%; text-align: center;'>
	// 			${color_Gradient_mid_value_text}
	// 		</div>
	// 		<div class='color-gradient-text-div-max-value' style='width: 33.33%; text-align: right;'>
	// 			${color_Gradient_max_value_text}
	// 		</div>
	// 	</div>
	// `
	// Show the gradient with N ticks and texts
	let ticks_to_show = 5;
	let color_gradient_div_element = `<div class='color-gradient-div' style='position: relative; ${color_gradient_background_style} width: calc(100% - 2 * ${border_width}); height: 1.5em; border: ${border_width} solid #ffffff;'>`;
	// let tick_div = "<div class='color-gradient-div-mid-tick' style='width:${border_width}; height: 100%; background: #ffffff;margin: auto;'>";
	for (let i = 0; i < ticks_to_show; i++) {
		if (i == 0 || i == ticks_to_show - 1) continue;	// Skip the first and last ticks
		let tick_position = (i / (ticks_to_show - 1) * 100);
		color_gradient_div_element += `<div class='color-gradient-div-tick' style='width: ${border_width}; height: 100%; background: #ffffff; margin: auto; position: absolute; left: ${tick_position}%;'></div>`;
	}
	color_gradient_div_element += "</div>";
	let color_gradient_text_div_element = "<div class='color-gradient-text-div' style='display: inline-flex; flex-direction: row; justify-content: space-between; width: 100%; margin-top: 0.1em'>";
	for (let i = 0; i < ticks_to_show; i++) {
		let value = min_value + (max_value - min_value) * (i / (ticks_to_show - 1));
		if (format_gradient_ticks_text_labels_function != undefined) value = format_gradient_ticks_text_labels_function(value);
		let text_align = "center";
		let width_percentage = 100 / (ticks_to_show - 1);
		if (i == 0) {
			text_align = "left";
			width_percentage /= 2;
		} else if (i == ticks_to_show - 1) {
			text_align = "right";
			width_percentage /= 2;
		}
		color_gradient_text_div_element += `<div class='color-gradient-text-div-tick' style='width: ${width_percentage}%; text-align: ${text_align};'>${value}</div>`;
	}
	color_gradient_text_div_element += "</div>";
	to_ret += color_gradient_div_element + color_gradient_text_div_element;
	to_ret += "</div>";
	return to_ret;
}


/**
 * Function to create the category based filter treemaps for the languages, player modes and content ratings
 */
async function create_category_based_filters_treemap_for_category(category_name) {
	if (category_name == "LANGUAGE") {
		// Create a cagtegory treemap for languages
		await create_category_based_filters_treemaps(
			STATE["visualization_states"]["RELEASED_GAMES_BY_LANGUAGE"],
			"#filters-categories-languages",
			// treemap_layout = [
			// 	// Total: 30
			// 	{ "1": 1.875 },
			// 	{ "2": 1.6 },
			// 	{ "2": 1.475 },
			// 	{ "3": 1.375 },
			// 	{ "4": 1.25 },
			// 	{ "5": 1.125 },
			// 	{ "6": 1 },
			// 	{ "7": 0.875 },
			// ],
			[
				// Default layout
				[1, 2, 2, 3, 4, 5, 6, 7],
				// Layout for when the difference between the first 2 categories is minimal
				[2, 2, 3, 4, 5, 6, 8],
				// Layout for when all categories are the same (e.g. no games should be shown)
				[5, 5, 5, 5, 5, 5]
			],
			category_update_function = function (categories, active_states) {
				return update_state_categories("RELEASED_GAMES_BY_LANGUAGE", categories, active_states);
			}
		);
	} else if (category_name == "PLAYER_MODE") {
		// Create category treemap for player modes
		// console.log(STATE["visualization_states"]["RELEASED_GAMES_BY_PLAYER_MODE"]);
		await create_category_based_filters_treemaps(
			STATE["visualization_states"]["RELEASED_GAMES_BY_PLAYER_MODE"],
			"#filters-categories-player-mode",
			// treemap_layout = [
			// 	// Total: 13
			// 	{ "1": 1.75 },
			// 	{ "3": 1.25 },
			// 	{ "4": 1 },
			// 	{ "5": 0.825 },
			// ],
			[
				// Default layout
				[1, 3, 4, 5],
				// Layout for when the difference between the first 2 categories is minimal
				[2, 3, 4, 4],
				// Layout for when all categories are the same (e.g. no games should be shown)
				[3, 3, 3, 4]
			],
			category_update_function = function (categories, active_states) {
				return update_state_categories("RELEASED_GAMES_BY_PLAYER_MODE", categories, active_states);
			}
		);
	} else if (category_name == "CONTENT_RATING") {
		// Create category treemap for content rating
		// console.log(STATE["visualization_states"]["RELEASED_GAMES_BY_CONTENT_RATING"]);
		await create_category_based_filters_treemaps(
			STATE["visualization_states"]["RELEASED_GAMES_BY_CONTENT_RATING"],
			"#filters-categories-content-rating",
			// treemap_layout = [
			// 	// Total: 9
			// 	{ "1": 1.75 },
			// 	{ "3": 1.125 },
			// 	{ "4": 0.875 },
			// ],
			[
				// Default layout
				[1, 3, 4,],
				// Layout for when the difference between the first 2 categories is minimal
				[2, 3, 3,],
				// Layout for when all categories are the same (e.g. no games should be shown)
				[4, 4,]
			],
			category_update_function = function (categories, active_states) {
				return update_state_categories("RELEASED_GAMES_BY_CONTENT_RATING", categories, active_states);
			}
		);
	}
	return true;
}

/**
 * Create a treemap based on the given data (for categoriy based filters, i.e. language, player mode and content rating)
 */
async function create_category_based_filters_treemaps(
	filter_categories, section_element_selector,
	possible_treemap_layouts = undefined,
	category_update_function = undefined
) {

	let container_div_element_selector = section_element_selector + " .content";

	// Empty the container div element
	let container_div_element = $(container_div_element_selector);
	container_div_element.empty();

	// Color gradient for the treemap
	// let color_gradient = color_scheme["color_gradient"].slice();
	// color_gradient.reverse();
	// Darken all colors in the color gradient
	// let darken_factor = 10;	// In [0, 100]
	// for (let i = 0; i < color_gradient.length; i++) {
	// 	color_gradient[i] = offset_saturation_and_value(color_gradient[i], 0, -darken_factor);
	// }


	// Set the opacity of selected (hence inactive) categories
	let selected_category_opacity = 0.5;

	// "margin" around each cell and width of the cell white highlight stroke
	let treemap_cells_stroke_width = 0.5;
	let treemap_cells_highlight_stroke_width = 0.625;

	// let max_iterations = 15;
	// for (let i = 0; i < max_iterations; i++) {
	// 	let interpolation_value = i / (max_iterations - 1);
	// 	let interpolation_color = get_gradient_col_hex(interpolation_value);
	// 	console.log("interpolation_value: " + interpolation_value + ", interpolation_color: " + interpolation_color);
	// }

	// let min_row_height = 1.15;	// In em
	// let max_row_height_multiplier = 2.25;

	// Get category names and values (note that categories are passed as an object of the form {"category_name": "category_value"})
	let category_names = [];
	let category_values = [];
	for (let category_name in filter_categories["bins"]) {
		category_names.push(category_name);
		category_values.push(filter_categories["bins"][category_name]);
	}
	// Sort category names and values by category values
	let category_values_sorted_indices = category_values.map(function (d, i) { return i; });
	category_values_sorted_indices.sort(function (a, b) { return category_values[a] - category_values[b]; });
	category_values_sorted_indices = category_values_sorted_indices.reverse();
	category_names = category_values_sorted_indices.map(function (d) { return category_names[d]; });
	category_values = category_values_sorted_indices.map(function (d) { return category_values[d]; });
	// console.log(category_names);
	// console.log(category_values);
	// Get the minimum and maximum category values
	// let min_category_value_to_consider = category_values[category_values.length - 1];
	let min_category_value_to_consider = 0;
	// let max_category_value_to_consider = 0;
	// if (get_category_name_string(true) == "languages") max_category_value_to_consider = STATE["visualization_states"]["RELEASED_GAMES_BY_LANGUAGE"]["total_games_based_on_other_filters"];
	// else if (get_category_name_string(true) == "player modes") max_category_value_to_consider = STATE["visualization_states"]["RELEASED_GAMES_BY_PLAYER_MODE"]["total_games_based_on_other_filters"];
	// else if (get_category_name_string(true) == "content ratings") max_category_value_to_consider = STATE["visualization_states"]["RELEASED_GAMES_BY_CONTENT_RATING"]["total_games_based_on_other_filters"];
	// else max_category_value_to_consider = 0;
	let max_category_value_to_consider = filter_categories["total_games_based_on_other_filters"];

	// Create a container svg element for the treemap
	let treemap_svg = d3.select(container_div_element_selector)
		.append("svg")
		.attr("id", "treemap-svg")
		.attr("width", "100%")
		.attr("height", "100%")
		.attr("viewBox", "0 0 100 100")
		// Align items left
		.attr("preserveAspectRatio", "xMinYMin meet")
		// .attr("preserveAspectRatio", "none")
		.style("background-color", "#00000000");
	// Get the aspect ratio as the ratio between the actual width of the container element and the actual height
	let container_div_aspect_ratio = $(container_div_element_selector).innerWidth() / $(container_div_element_selector).innerHeight();
	let container_size = 100;
	let container_div_element_height = container_size;
	let container_div_element_width = container_div_element_height * container_div_aspect_ratio;

	// Set margins
	let margin = { "top": 1, "right": 1, "bottom": 2, "left": 1 };
	let actual_width = container_div_element_width - (margin.left + margin.right) * container_div_aspect_ratio;
	let actual_height = container_div_element_height - (margin.top + margin.bottom);

	// Calculate the optimal treemap layout out of the ones given
	function calculate_optimal_treemap_layout(category_values_object, possible_layouts) {
		// Calculate the optimal treemap layout based on the category values
		// The "category_values" is an object containing as keys the names of the categories, and as values the number of games with that category (e.g. with that language, that player mode or that content rating)
		// The "default_rows" is the number of rows that the treemap should have by default (a min and max number of rows will be the defalut rows +/- 1)
		// console.log("Trying to calculate the optimal treemap layout based on the category values...");
		// Check if the second category, by number, is greater than 2 times the second category
		let sorted_categories = Object.keys(category_values_object).sort(function (a, b) { return category_values_object[b] - category_values_object[a]; });
		let category_values_list = Object.values(category_values_object);
		let max_category_values = Math.max(...category_values_list);
		let possible_layout_index = 0;
		if (max_category_values > 0) {
			while (true) {
				let first_row_sum = 0;
				let second_row_sum = 0;
				for (let i = 0; i < possible_layouts[possible_layout_index][0]; i++) {
					first_row_sum += category_values_object[sorted_categories[i]];
				}
				for (let i = 0; i < possible_layouts[possible_layout_index][1]; i++) {
					second_row_sum += category_values_object[sorted_categories[i + possible_layouts[possible_layout_index][0]]];
				}
				if (first_row_sum < second_row_sum * 0.666) {
					possible_layout_index += 1;
				} else {
					break;
				}
			}
		} else {
			possible_layout_index = possible_layouts.length - 1;
		}
		let final_layout = possible_layouts[possible_layout_index];
		// Recalculate rows height based on categories values
		let layout_to_return = [];
		let categories_index = 0;
		let min_row_height = 0.125;	// Rows height will be in range [0.5, 1]
		for (let i = 0; i < final_layout.length; i++) {
			let current_row_height = min_row_height;
			let current_row_num_of_cols = final_layout[i];
			if (max_category_values == 0) {
				// If there are no games, set the row height to all be the same (proportional to the number of categories)
				current_row_height = final_layout[final_layout.length - 1] / current_row_num_of_cols;
			} else {
				let categories_sum_for_this_row = category_values_list.slice(categories_index, categories_index + current_row_num_of_cols).reduce(function (a, b) { return a + b; }, 0);
				current_row_height = categories_sum_for_this_row / (max_category_values * final_layout[final_layout.length - 1]);
				if (current_row_height < min_row_height) current_row_height = min_row_height;
			}
			let current_row_num_of_cols_string = current_row_num_of_cols.toString();
			let obj = {
				[current_row_num_of_cols_string]: current_row_height
			}
			layout_to_return.push(obj);
			categories_index += current_row_num_of_cols;
		}
		// console.log(layout_to_return);
		return layout_to_return;
	}
	let treemap_layout = calculate_optimal_treemap_layout(filter_categories["bins"], possible_treemap_layouts);

	// Calculate unit height
	let total_height_portions = 0;
	for (let i = 0; i < treemap_layout.length; i++) {
		total_height_portions += treemap_layout[i][Object.keys(treemap_layout[i])[0]];
	}
	let height_portion_unit = actual_height / total_height_portions;

	let font_size_multiplier = 10.5 * container_div_aspect_ratio;

	let default_font_size = 0.55 * font_size_multiplier;	// In px
	let min_font_size = 0.25 * font_size_multiplier;	// In px
	let max_font_size = 0.675 * font_size_multiplier;	// In px

	// Create one line for each of the "treemap_layout" items, each with a number of column corresponding to the number of the "treemap_layout" element
	let treemap_layout_cols_per_row = treemap_layout.map(function (d) { return Object.keys(d)[0]; });
	// console.log("treemap_layout_cols_per_row: " + JSON.stringify(treemap_layout_cols_per_row));
	let treemap_layout_rows = treemap_layout.map(function (d) { return d[Object.keys(d)[0]]; });
	let treemap_layout_rows_heights = treemap_layout_rows.map(function (d) { return d; });
	// console.log("treemap_layout_rows_heights: " + JSON.stringify(treemap_layout_rows_heights));
	let treemap_layout_cells_heights = [];
	for (let i = 0; i < treemap_layout_rows.length; i++) {
		for (let j = 0; j < treemap_layout_cols_per_row[i]; j++) {
			treemap_layout_cells_heights.push(treemap_layout_rows[i]);
		}
	}
	// Create a treemap container (as a "g" element)
	let treemap_container = treemap_svg.append("g")
		.attr("class", "treemap-container")
		// .attr("width", actual_width)
		// .attr("height", actual_height)
		.attr("transform", "translate(" + margin.left * container_div_aspect_ratio + ", " + margin.top + ")");
	// Add rows to the treemap (as groups, "g")
	treemap_container.selectAll(".treemap-row")
		.data(treemap_layout_rows)
		.enter()
		.append("g")
		.attr("class", "treemap-row")
		// .attr("width", actual_width)
		// .attr("height", function (d, i) { return treemap_layout_rows_heights[i] * 10; })
		// .attr("viewBox", function (d, i) { return "0 0 100 100"; })
		// .attr("height", function (d, i) { return treemap_layout_rows_heights[i] * 10; })
		.attr("transform", function (d, i) {
			let y = 0;
			for (let j = 0; j < i; j++) {
				y += treemap_layout_rows_heights[j] * height_portion_unit;
			}
			return "translate(0, " + y + ")";
		});
	// Add cells to each row (as groups, "g")
	d3.selectAll(container_div_element_selector + " .treemap-row")
		.selectAll(".treemap-cell")
		.data(function (d, i) {
			let toRet = [];
			for (let j = 0; j < treemap_layout_cols_per_row[i]; j++) {
				toRet.push(treemap_layout_cols_per_row[i]);
			}
			return toRet;
		})
		.enter()
		.append("g")
		.attr("class", "treemap-cell")
		.attr("transform", function (d, i) {
			let x = 0;
			for (let j = 0; j < i; j++) {
				x += actual_width / d;
			}
			return "translate(" + x + ", 0)";
		});
	// Add class "cell-index-i" to each cell with i being the index of the cell
	d3.selectAll(container_div_element_selector + " .treemap-cell")
		.attr("class", function (d, i) { return "treemap-cell cell-index-" + i; });
	// Add a rectangle element to each cell (as a "rect" element)
	d3.selectAll(container_div_element_selector + " .treemap-cell")
		.append("rect")
		.attr("class", "treemap-cell-rect")
		.attr("x", 0)
		.attr("y", 0)
		// .attr("width", function (d, i) { return actual_width / d + ""; })
		.attr("height", function (d, i) { return treemap_layout_cells_heights[i] * height_portion_unit + "%"; })
		.style("stroke", color_scheme["viewport_cells"])
		.style("stroke-width", treemap_cells_stroke_width * container_div_aspect_ratio);
	// .style("fill", function (d, i) {
	// 	let current_category_value_normalized = Math.max(0, Math.min(1, (category_values[i] - min_category_value_to_consider) / (max_category_value_to_consider - min_category_value_to_consider)));
	// 	let current_category_color = get_gradient_col_hex(current_category_value_normalized);
	// 	return current_category_color;
	// });
	// Add a text element to each cell
	d3.selectAll(container_div_element_selector + " .treemap-cell")
		.append("text")
		.attr("class", "treemap-cell-text")
		.attr("dy", "0.35em")
		.style("text-anchor", "middle");
	// Add a container for hover cells (read later)
	let hover_cells_container = treemap_svg.append("g")
		.attr("class", "hover-cells-container")
		// .attr("width", "100%")
		// .attr("height", "100%")
		.attr("transform", "translate(" + margin.left * container_div_aspect_ratio + ", " + margin.top + ")")
		.attr("pointer-events", "none");

	/**
	 * Updates all the treemap cells based on the associated data to each cell.app-cell
	 *
	 * Data should already be associated to each .treemap-cell using d3.js and the "data([...])" function)
	 */
	function update_treemap_cells(category_names_to_use, category_values_to_use, min_category_value_to_use, max_category_value_to_use, currently_active_categories = undefined) {

		// console.log(">>>>> Should be updating treemap cells for " + section_element_selector + "\n" + JSON.stringify(category_names_to_use) + "\n" + JSON.stringify(category_values_to_use));

		if (min_category_value_to_use == max_category_value_to_use) {
			// Avoid dividing by 0
			max_category_value_to_use += 1;
			// Sort bins in reverse order
			category_names_to_use.reverse();
			category_values_to_use.reverse();
		}

		// Create a new list of values where the min value is 2 (to avoid cells with width 0)
		let min_value_to_use_for_cell_widths = 1;
		// let category_values_to_use_for_element_widths = category_values_to_use.map(function (d) { return (d < min_value_to_use_for_cell_widths ? min_value_to_use_for_cell_widths : d); });
		let category_values_to_use_for_element_widths = category_values_to_use.map(function (d) { return d + min_value_to_use_for_cell_widths; });

		// Update the text of each cell (also update its color)
		d3.selectAll(container_div_element_selector + " .treemap-cell-text")
			.attr("x", function (d, i) { return (actual_width / d) / 2 + "%"; })
			.attr("y", function (d, i) { return (treemap_layout_cells_heights[i] * height_portion_unit) / 2 + "%"; })
			.style("font-size", function (d, i) {
				let width_weight = 0.75;
				let height_weight = 1.5;
				let font_size = default_font_size * ((((actual_width / d) / 100) * width_weight) + (((treemap_layout_cells_heights[i] * height_portion_unit * treemap_layout_rows.length)) / (100 + 15)) * height_weight) / (width_weight + height_weight);
				if (font_size < min_font_size) {
					font_size = min_font_size;
				}
				if (font_size > max_font_size) {
					font_size = max_font_size;
				}
				return font_size + "px";	// We use px as using em caouses the text to scale 2 times along with the svg when zooming in, hence scale exponentially...
			})
			.style("fill", function (d, i) {
				let current_category_value_normalized = Math.max(0, Math.min(1, (category_values_to_use[i] - min_category_value_to_use) / (max_category_value_to_use - min_category_value_to_use)));
				let current_category_color = get_gradient_color(current_category_value_normalized);
				let current_category_color_hsv = hexToHsv(current_category_color);
				let current_category_color_saturation = current_category_color_hsv["s"] / 100;
				let current_category_color_brightness = current_category_color_hsv["v"] / 100;
				// let current_category_color_text_color = "#ffffff";
				let current_category_color_text_color = offset_saturation_and_value(color_scheme["white"], -20, 27);
				let saturation_threshold = 0.2;
				let brightness_threshold = 0.775;
				if (current_category_color_brightness > brightness_threshold && current_category_color_saturation < saturation_threshold) {
					current_category_color_text_color = color_scheme["viewport_cells"];	// Make text color black
				}
				return current_category_color_text_color;
			})
			.style("text-anchor", "middle")
			.text(function (d, i) { return category_names_to_use[i]; });
		// Add attributes with name and value for each cell
		d3.selectAll(container_div_element_selector + " .treemap-cell")
			.attr("cell-name", function (d, i) { return category_names_to_use[i]; })
			.attr("cell-value", function (d, i) { return category_values_to_use[i]; });
		// Make each cell have a width proportional to the value of the N associated categories values in the N cells of the row
		let cell_rows_values_sums = [];
		let total_cell_index = 0;
		for (let i = 0; i < treemap_layout_rows.length; i++) {
			let current_row_values_sum = 0;
			for (let j = 0; j < treemap_layout_cols_per_row[i]; j++) {
				current_row_values_sum += category_values_to_use_for_element_widths[total_cell_index];
				total_cell_index++;
			}
			cell_rows_values_sums.push(current_row_values_sum);
		}
		d3.selectAll(container_div_element_selector + " .treemap-row")
			.each(function (d, i) {
				let current_row = d3.select(this);
				let current_row_cells = current_row.selectAll(".treemap-cell");
				let current_row_cells_values = [];
				current_row_cells.each(function (d, i) {
					let current_cell = d3.select(this);
					let current_cell_value = parseFloat(current_cell.attr("cell-value"));
					// if (current_cell_value < min_value_to_use_for_cell_widths) current_cell_value = min_value_to_use_for_cell_widths;
					current_cell_value += min_value_to_use_for_cell_widths;
					current_row_cells_values.push(current_cell_value);
				});
				let current_row_cells_values_sum = cell_rows_values_sums[i];
				// Set the cell width and translate x, and the cell rect width, plus the text x
				let current_cell_index = 0;
				current_row_cells.each(function (d, i) {
					let current_cell = d3.select(this);
					// Calculate the width of the current cell
					let current_cell_value = current_row_cells_values[current_cell_index];
					let current_cell_new_width = (current_cell_value / current_row_cells_values_sum) * actual_width;
					// Calculate the x translation of the current cell
					let current_cell_new_x = 0;
					for (let j = 0; j < current_cell_index; j++) {
						current_cell_new_x += (current_row_cells_values[j] / current_row_cells_values_sum) * actual_width;
					}
					// console.log("current_cell_new_x: " + current_cell_new_x);
					// Set the cell width and translate x
					current_cell.attr("width", current_cell_new_width);
					current_cell.attr("transform", "translate(" + current_cell_new_x + ", 0)");
					// Set the cell rect width
					current_cell.select(".treemap-cell-rect")
						.attr("width", current_cell_new_width)
					// Set the cell text x
					current_cell.select(".treemap-cell-text")
						.attr("x", (current_cell_new_width / 2) + "%")
						.attr("dx", "0em");
					// Increment the cell index
					current_cell_index++;
				});
			});
		// For all rects, set the color to the color of the corresponding cell
		d3.selectAll(container_div_element_selector + " .treemap-cell-rect")
			.style("fill", function (d, i) {
				let current_cell = d3.select(this.parentNode);
				let current_cell_value_normalized = Math.max(0, Math.min(1, (category_values_to_use[i] - min_category_value_to_use) / (max_category_value_to_use - min_category_value_to_use)));
				let current_cell_color = get_gradient_color(current_cell_value_normalized);
				return current_cell_color;
			});
		// For all text that overflow, change the text alignment to left and add an ellipsis
		d3.selectAll(container_div_element_selector + " .treemap-cell")
			.each(function (d, i) {
				let current_cell = d3.select(this);
				let current_cell_text = current_cell.select(".treemap-cell-text");
				let current_cell_text_element = current_cell_text.node();
				let current_cell_text_element_width = current_cell_text_element.getBBox().width;
				let current_cell_rect = current_cell.select(".treemap-cell-rect");
				let current_cell_rect_element = current_cell_rect.node();
				let current_cell_rect_element_width = current_cell_rect_element.getBBox().width;
				let cell_rect_stroke_width = parseFloat(current_cell_rect.style("stroke-width"));
				if (current_cell_text_element_width > current_cell_rect_element_width - cell_rect_stroke_width * 2) {
					current_cell_text.style("text-anchor", "start");
					current_cell_text.attr("x", "0%");
					current_cell_text.attr("dx", "0.32em");
					// Truncate text to a length of a max number of characters based on the width of the cell
					let current_font_size = parseFloat(current_cell_text.style("font-size"));
					let average_single_char_width = 0.45 * current_font_size;
					// let actual_text = current_cell_text.text();
					// let expected_uppercase_character_frequency = 1 / 8.5;
					// let weight_for_lower_case = 1;
					// let weight_for_upper_case = 1.175;
					// let num_of_lower_case_chars = actual_text.split("").filter(function (d) { return d == d.toLowerCase(); }).length;
					// let num_of_upper_case_chars = actual_text.split("").filter(function (d) { return d == d.toUpperCase(); }).length;
					// let average_single_char_width = current_font_size * (0.45 / (1 + expected_uppercase_character_frequency)) * (num_of_lower_case_chars * weight_for_lower_case + num_of_upper_case_chars * weight_for_upper_case) / actual_text.length;
					let max_num_chars = Math.floor(current_cell_rect_element_width / average_single_char_width) - 3;
					// Add one more char every 1.5 "i"s found in the name, up until the max_num_chars
					let add_every_n_special_chars = 3;
					let num_of_special_chars = 0;
					let special_chars = ["i", " ", "l", "t", "j", "(", ")", "-"];
					for (let j = 0; j < category_names_to_use[i].length; j++) {
						if (j >= max_num_chars) break;
						if (special_chars.includes(category_names_to_use[i][j])) {
							num_of_special_chars++;
						}
					}
					max_num_chars += Math.ceil(num_of_special_chars / add_every_n_special_chars);
					// For each n uppercase chars, remove one char from the max_num_chars
					let num_of_uppercase_chars = 0;
					for (let j = 0; j < category_names_to_use[i].length; j++) {
						if (j >= max_num_chars) break;
						if (category_names_to_use[i][j] == category_names_to_use[i][j].toUpperCase()) {
							if (!special_chars.includes(category_names_to_use[i][j])) num_of_uppercase_chars++;
						}
					}
					let remove_every_n_uppercase_chars = 3;
					max_num_chars -= Math.floor(num_of_uppercase_chars / remove_every_n_uppercase_chars);
					// Set the final text
					let truncated_category_name = category_names_to_use[i].substring(0, max_num_chars);
					let append_ellipsis_text = "...";
					if (truncated_category_name == "") {
						// Align text to the center
						// current_cell_text.style("text-anchor", "middle");
						// current_cell_text.attr("x", "50%");
						// current_cell_text.attr("dx", "0em");
					}
					if (truncated_category_name == "" && ((append_ellipsis_text.length - 1.5) * average_single_char_width) > current_cell_rect_element_width - cell_rect_stroke_width * 2) {
						append_ellipsis_text = "";
					}
					current_cell_text.text(truncated_category_name + append_ellipsis_text);
					// Make text red (for debug)
					// current_cell_text.style("fill", "#ff0000");
				}
			});
		// Add a new rect for each cell, with the same size and position, but with a transparent fill and no stroke
		hover_cells_container.selectAll(".hover-cell-rect").remove();
		d3.selectAll(container_div_element_selector + " .treemap-cell")
			.each(function (d, i) {
				let current_cell = d3.select(this);
				let current_cell_parent = d3.select(this.parentNode);
				let current_cell_rect = current_cell.select(".treemap-cell-rect");
				let current_cell_transform_x = parseFloat(current_cell.attr("transform").split("(")[1].split(",")[0]);
				let parent_cell_transform_y = parseFloat(current_cell_parent.attr("transform").split("(")[1].split(",")[1].split(")")[0]);
				hover_cells_container.append("rect")
					.attr("class", "hover-cell-rect cell-index-" + i)
					.attr("width", current_cell_rect.attr("width"))
					.attr("height", current_cell_rect.attr("height"))
					.attr("transform", "translate(" + current_cell_transform_x + ", " + parent_cell_transform_y + ")")
					.style("fill", "#ffffff00")
					.style("stroke", "#ffffff00")
					.style("stroke-width", treemap_cells_highlight_stroke_width * container_div_aspect_ratio)
					.style("opacity", 1);
			});

		// on hover on each treemap cell, show a tooltip using "cell-name" and "cell-value" attributes
		d3.selectAll(container_div_element_selector + " .treemap-cell")
			.attr("cursor", "pointer")
			.on("mouseover", function (event, d) {
				let current_cell = d3.select(this);
				let current_cell_name = current_cell.attr("cell-name");
				let current_cell_value = current_cell.attr("cell-value");
				// let cell_absolute_position = current_cell.node().getBoundingClientRect();
				// let cell_left_center_position = {
				// 	"x": cell_absolute_position["x"] + cell_absolute_position["width"],
				// 	"y": cell_absolute_position["y"] + cell_absolute_position["height"] / 2
				// };
				// Set tooltip
				let value_percentage_string_all_games = "0";
				let value_percentage_string_filtered_games = (current_cell_value / max_category_value_to_use * 100).toFixed(2);
				if (value_percentage_string_filtered_games[value_percentage_string_filtered_games.length - 1] == "00") value_percentage_string_filtered_games = value_percentage_string_filtered_games.substring(0, value_percentage_string_filtered_games.length - 3);
				else if (value_percentage_string_filtered_games[value_percentage_string_filtered_games.length - 1] == "0") value_percentage_string_filtered_games = value_percentage_string_filtered_games.substring(0, value_percentage_string_filtered_games.length - 1);
				let percentage_of_all_games = Math.round(current_cell_value / filter_categories["max_bins"][current_cell_name] * 10000) / 100;
				if (percentage_of_all_games > 0) value_percentage_string_all_games = percentage_of_all_games;
				// let prepend_string = "=&nbsp;&nbsp;";
				// let prepend_string = "";
				let tooltip_texts = [
					current_cell_value + " games (" + value_percentage_string_all_games + "% of all games with this " + get_category_name_string(false) + ")",
					// current_cell_value + " games",
					// prepend_string + value_percentage_string_all_games + "% of all games with this " + get_category_name_string(false),
					// prepend_string + value_percentage_string_filtered_games + "% of filtered games",
					TOOLTIP_LINE_SEPARATOR,
					"The color of this cell encodes the percentage of filtered games that have this " + get_category_name_string(false) + " (" + value_percentage_string_filtered_games + "%).",
					get_color_gradient_for_tooltip(0, 100, function (value) { return Math.round(value) + "%"; })
				];
				set_tooltip(current_cell.node(), current_cell_name, tooltip_texts);

				// Underline the text
				// current_cell.select(".treemap-cell-text").style("text-decoration", "underline");
				// Select the corresponding hover cell and set its stroke color to "ffffff99" (use cell-index-i class)
				let current_cell_index_class = current_cell.attr("class").split(" ")[1];
				// let current_hover_cell = d3.select(".hover-cells-container").select(".hover-cell-rect" + "." + current_cell_index_class);
				let current_hover_cell = d3.select(container_div_element_selector + " .hover-cells-container").select(".hover-cell-rect" + "." + current_cell_index_class);
				let stroke_color = color_scheme["viewport_highlight_stroke_color"];
				current_hover_cell.style("stroke", stroke_color);

			})
			.on("mouseleave", function (event, d) {
				// Hide tooltip
				hide_tooltip();
				// Remove underline from the text
				// d3.select(this).select(".treemap-cell-text").style("text-decoration", "none");
				// Reset the stroke color of the corresponding hover cell
				let current_cell = d3.select(this);
				let current_cell_index_class = current_cell.attr("class").split(" ")[1];
				let current_hover_cell = d3.select(container_div_element_selector + " .hover-cells-container").select(".hover-cell-rect" + "." + current_cell_index_class);
				let stroke_color = "#ffffff00";
				current_hover_cell.style("stroke", stroke_color);
			});

		if (currently_active_categories != undefined) {

			let active_categories_names = Array.from(currently_active_categories);

			// Reset appearance of each cell to match the currently active categories
			for (let i = 0; i < category_names_to_use.length; i++) {

				let current_cell = d3.select(container_div_element_selector + " .treemap-cell.cell-index-" + i);

				let current_cell_name = current_cell.attr("cell-name");
				// let current_cell_value = current_cell.attr("cell-value");
				let current_cell_should_be_inactive = active_categories_names.includes(current_cell_name);
				// Set cell state
				if (current_cell_should_be_inactive) {
					// Set the cell to be inactive
					current_cell.classed("selected", true);
					current_cell.style("opacity", selected_category_opacity);
				} else {
					// Set the cell to be active
					current_cell.classed("selected", false);
					current_cell.style("opacity", 1);
				}
			}

		}

	}

	// Update the treemap cells (with the default values)
	// update_treemap_cells(category_names, category_values, min_category_value_to_consider, max_category_value_to_consider);
	update_treemap_visualization();

	/**
	 * Get the given cell's active state
	 */
	function get_cell_is_active(cell) {
		let current_cell = null;
		if (typeof cell == "number") {
			// If cell is an index, get the corresponding cell
			current_cell = d3.select(container_div_element_selector + " .treemap-cell.cell-index-" + cell);
		} else {
			// If cell is a d3 selection, use it
			current_cell = cell;
		}
		return !current_cell.classed("selected");
	}

	/**
	 * Toggle the active state of a cell (given as an index or as "d3.select" selection)
	 */
	function toggle_cell_active_state(cell) {
		let current_cell = null;
		if (typeof cell == "number") {
			// If cell is an index, get the corresponding cell
			current_cell = d3.select(container_div_element_selector + " .treemap-cell.cell-index-" + cell);
		} else {
			// If cell is a d3 selection, use it
			current_cell = cell;
		}
		if (current_cell.classed("selected")) {
			// If the cell is currently selected, set it to be unselected
			set_cell_active_state(current_cell, true);
		} else {
			// If the cell is currently unselected, set it to be selected
			set_cell_active_state(current_cell, false);
		}
	}

	/**
	 * Set a cell (given as an index or as "d3.select" selection) to be active or not
	 */
	function set_cell_active_state(cell, active, update_categories_for_filters = true) {
		let current_cell = null;
		if (typeof cell == "number") {
			// If cell is an index, get the corresponding cell
			current_cell = d3.select(container_div_element_selector + " .treemap-cell.cell-index-" + cell);
		} else {
			// If cell is a d3 selection, use it
			current_cell = cell;
		}
		let current_cell_state = get_cell_is_active(current_cell);
		let current_cell_name = current_cell.attr("cell-name");
		let current_cell_value = current_cell.attr("cell-value");
		// Set cell state
		if (!active) {
			// Set the cell to be inactive
			current_cell.classed("selected", true);
			current_cell.style("opacity", selected_category_opacity);
		} else {
			// Set the cell to be active
			current_cell.classed("selected", false);
			current_cell.style("opacity", 1);
		}
		let changed_cell_state = get_cell_is_active(current_cell) != current_cell_state;
		// Update the category
		if (update_categories_for_filters && changed_cell_state) category_update_function([current_cell_name], [active]);

		if (update_categories_for_filters && !changed_cell_state) {
			console.log(">>>>> Cell " + current_cell_name + " already has state " + active + ": not updating active categories.");
		}
	}

	/**
	 * Set all cells to be active or not
	 */
	function set_all_cells_active_state(active, except_cell = null, update_categories_for_filters = false) {
		let exclude_cell = null;
		if (except_cell != null) {
			if (typeof except_cell == "number") {
				// If cell is an index, get the corresponding cell
				exclude_cell = d3.select(container_div_element_selector + " .treemap-cell.cell-index-" + except_cell);
			} else {
				// If cell is a d3 selection, use it
				exclude_cell = except_cell;
			}
		}
		let all_cells = d3.selectAll(container_div_element_selector + " .treemap-cell");
		let except_cell_index_class = "";
		if (except_cell != null) except_cell_index_class = exclude_cell.attr("class").split(" ")[1];
		let updated_cells = [];
		let updated_cells_values = [];
		all_cells.each(function (d, i) {
			let other_cell = d3.select(this);
			let other_cell_class_index = other_cell.attr("class").split(" ")[1];
			if (other_cell_class_index == except_cell_index_class) return;
			set_cell_active_state(other_cell, active, false);
			updated_cells.push(other_cell.attr("cell-name"));
			updated_cells_values.push(active);
		});
		// Update the categories for filters
		if (update_categories_for_filters) {
			// Add the excluded cell to the list of updated cells
			if (except_cell != null) {
				updated_cells.push(exclude_cell.attr("cell-name"));
				updated_cells_values.push(!active);
			}
			category_update_function(updated_cells, updated_cells_values);
		}
	}

	/**
	 * Return -1 if all cells are inactive, 0 if some cells are active and 1 if all cells are active
	 */
	function check_all_cells_active_state(except_cell = null) {
		let exclude_cell = null;
		if (except_cell != null) {
			if (typeof except_cell == "number") {
				// If cell is an index, get the corresponding cell
				exclude_cell = d3.select(container_div_element_selector + " .treemap-cell.cell-index-" + except_cell);
			} else {
				// If cell is a d3 selection, use it
				exclude_cell = except_cell;
			}
		}
		let all_cells = d3.selectAll(container_div_element_selector + " .treemap-cell");
		let all_cells_active = true;
		let all_cells_inactive = true;
		let current_cell_index_class = "";
		if (except_cell != null) current_cell_index_class = exclude_cell.attr("class").split(" ")[1];
		all_cells.each(function (d, i) {
			let other_cell = d3.select(this);
			let other_cell_class_index = other_cell.attr("class").split(" ")[1];
			if (other_cell_class_index == current_cell_index_class) return;
			if (other_cell.classed("selected")) {
				all_cells_inactive = false;
			} else {
				all_cells_active = false;
			}
		});
		if (all_cells_active) return 1;
		if (all_cells_inactive) return -1;
		return 0;
	}

	// On click on a treemap cell, update the category_update_function with the cell name and set class "selected" to the cell
	d3.selectAll(container_div_element_selector + " .treemap-cell")
		.on("click", function (event, d) {
			let current_cell = d3.select(this);
			// Set class "selected" to the cell and also set its appearance
			toggle_cell_active_state(current_cell);
			// if (current_cell.classed("selected")) {
			// 	current_cell.classed("selected", false);
			// 	current_cell.style("opacity", 1);
			// } else {
			// 	current_cell.classed("selected", true);
			// 	current_cell.style("opacity", selected_category_opacity);
			// }
		});
	// On right click on a treemap cell, set the cell to not be selected and set all the other cells to be selected
	d3.selectAll(container_div_element_selector + " .treemap-cell")
		.on("contextmenu", function (event, d) {
			// Prevent the default right click menu from showing up
			event.preventDefault();
			// Set this cell and also other cell's selection state
			let current_cell = d3.select(this);
			let all_other_cells_active_state = check_all_cells_active_state(current_cell);
			if (all_other_cells_active_state == 0) {
				// Other cells do NOT all have the same state
				// console.log("Other cells do NOT all have the same state");

				// Set this cell to be active and other cells not to be active
				set_cell_active_state(current_cell, true, false);
				set_all_cells_active_state(false, current_cell, true);


			} else if (all_other_cells_active_state == -1) {
				// All other cells are active
				// console.log("All other cells are active...");

				if (get_cell_is_active(current_cell)) {
					// If this cell is active, set all other cells to be inactive
					// console.log("...but cell " + current_cell.attr("cell-name") + " is active");
					set_all_cells_active_state(false, current_cell, true);
				} else {
					// If this cell is NOT active, set it to be active and set all other cells to be inactive
					// console.log("...and cell " + current_cell.attr("cell-name") + " is NOT active either");
					set_cell_active_state(current_cell, true, false);
					set_all_cells_active_state(false, current_cell, true);
				}

			} else if (all_other_cells_active_state == 1) {
				// All other cells are NOT active
				// console.log("All other cells are NOT active...");

				if (get_cell_is_active(current_cell)) {
					// If this cell is active, set all cells to be active
					// console.log("...but cell " + current_cell.attr("cell-name") + " is active");
					set_all_cells_active_state(true, null, true);
				} else {
					// If this cell is NOT active, set it to be active
					// console.log("...and cell " + current_cell.attr("cell-name") + " is NOT active either");
					set_cell_active_state(current_cell, true);
				}

			}

			// let current_cell_class_index = current_cell.attr("class").split(" ")[1];
			// if (!current_cell.classed("selected")) {
			// 	// If the current cell is not selected, highlight it and make all other cells unselected
			// 	current_cell.classed("selected", false);
			// 	current_cell.style("opacity", 1);
			// 	// Set all the other cells to be selected
			// 	d3.selectAll(container_div_element_selector + " .treemap-cell").each(function (d, i) {
			// 		let other_cell = d3.select(this);
			// 		let other_cell_class_index = other_cell.attr("class").split(" ")[1];
			// 		if (other_cell_class_index == current_cell_class_index) return;
			// 		other_cell.classed("selected", true);
			// 		other_cell.style("opacity", selected_category_opacity);
			// 	});
			// } else {
			// 	// If the current cell is currently selected, reset all cells to not be selected
			// 	d3.selectAll(container_div_element_selector + " .treemap-cell").each(function (d, i) {
			// 		let other_cell = d3.select(this);
			// 		other_cell.classed("selected", false);
			// 		other_cell.style("opacity", 1);
			// 	});
			// }
		});

	// On click on section_element_selector + " #section-reset-button", reset all cells to be active
	$(section_element_selector + " #section-reset-button").click(function () {
		set_all_cells_active_state(true, null, true);
	});

	// Returns the string "[category]" or "[categories]" based on the category names
	function get_category_name_string(use_plural = false) {
		let category_name_strings = ["category", "categories"];
		if (category_names.includes("English")) category_name_strings = ["language", "languages"];
		else if (category_names.includes("Single-player")) category_name_strings = ["player mode", "player modes"];
		else if (category_names.includes("No rating")) category_name_strings = ["content rating", "content ratings"];
		if (use_plural) return category_name_strings[1];
		else return category_name_strings[0];
	}
	// On hover over section buttons (info and reset buttons), make the tooltips appear with the text for "Info" or "Reset"
	$(section_element_selector + " .buttons-container #section-reset-button").on("mouseover", function (event) {
		let optimal_translate_position = calculate_tooltip_optimal_translate_position($(this));
		let translate_position_to_use = [optimal_translate_position[0], optimal_translate_position[1]];	// Should defalut to [0,1] to show tooltip on top right of the element
		set_tooltip(this, "Reset", ["Reset all filters on " + get_category_name_string(true) + "."], translate_position_to_use);
	});
	$(section_element_selector + " .buttons-container #section-reset-button").on("mouseleave", function (event) {
		hide_tooltip();
	});
	$(section_element_selector + " .buttons-container #section-info-button").on("mouseover", function (event) {
		let optimal_translate_position = calculate_tooltip_optimal_translate_position($(this));
		let translate_position_to_use = [optimal_translate_position[0], optimal_translate_position[1]]; // Should defalut to [0,1] to show tooltipp on top right of the element
		let tooltip_title =
			set_tooltip(
				this,
				"Released Games By " + get_category_name_string().charAt(0).toUpperCase() + get_category_name_string().slice(1),
				[
					"Include in results only games that have at least one of the selected " + get_category_name_string(true) + ".",
					TOOLTIP_LINE_SEPARATOR,
					"Left click on a " + get_category_name_string(false) + " to include/exclude it.",
					"Right click on a " + get_category_name_string(false) + " to include/exclude it and exclude/include the other " + get_category_name_string(true) + ".",
					// TOOLTIP_LINE_SEPARATOR,
					// "Click on the reset button to reset all filters on " + get_category_name_string(true)
				],
				translate_position_to_use
			);
	});
	$(section_element_selector + " .buttons-container #section-info-button").on("mouseleave", function (event) {
		hide_tooltip();
	});

	function update_treemap_visualization() {

		// Update the treemap cells (width, color, position, etc..., hence reupdate the rows and cols)

		// Get category names and values (note that categories are passed as an object of the form {"category_name": "category_value"})
		let new_category_names = [];
		let new_category_values = [];
		for (let category_name in filter_categories["bins"]) {
			new_category_names.push(category_name);
			new_category_values.push(filter_categories["bins"][category_name]);
		}
		// Sort category names and values by category values
		let new_category_values_sorted_indices = new_category_values.map(function (d, i) { return i; });
		new_category_values_sorted_indices.sort(function (a, b) { return new_category_values[a] - new_category_values[b]; });
		new_category_values_sorted_indices = new_category_values_sorted_indices.reverse();
		new_category_names = new_category_values_sorted_indices.map(function (d) { return new_category_names[d]; });
		new_category_values = new_category_values_sorted_indices.map(function (d) { return new_category_values[d]; });
		// Get the minimum and maximum category values
		let new_min_category_value_to_consider = 0;
		// let new_max_category_value_to_consider = 0;
		// if (get_category_name_string(true) == "languages") new_max_category_value_to_consider = STATE["visualization_states"]["RELEASED_GAMES_BY_LANGUAGE"]["total_games_based_on_other_filters"];
		// else if (get_category_name_string(true) == "player modes") new_max_category_value_to_consider = STATE["visualization_states"]["RELEASED_GAMES_BY_PLAYER_MODE"]["total_games_based_on_other_filters"];
		// else if (get_category_name_string(true) == "content ratings") new_max_category_value_to_consider = STATE["visualization_states"]["RELEASED_GAMES_BY_CONTENT_RATING"]["total_games_based_on_other_filters"];
		// else new_max_category_value_to_consider = 0;
		let new_max_category_value_to_consider = filter_categories["total_games_based_on_other_filters"];

		// Uppdate associated data of each cell
		d3.selectAll(container_div_element_selector + " .treemap-row")
			.selectAll(".treemap-cell")
			.data(function (d, i) {
				let toRet = [];
				for (let j = 0; j < treemap_layout_cols_per_row[i]; j++) {
					toRet.push(treemap_layout_cols_per_row[i]);
				}
				return toRet;
			});

		// Update the cells
		let active_categories = filter_categories["active"];
		update_treemap_cells(new_category_names, new_category_values, new_min_category_value_to_consider, new_max_category_value_to_consider, active_categories);

	}

	// On "update" event of the "container_div_element" element, update the treemap cells (width, color, position, etc..., hence reupdate the rows and cols)
	$(container_div_element_selector).on("update", function (event) {
		// Get the new bins
		// let new_filter_categories = event.detail["filter_categories"];
		// Update the treemap visualization
		update_treemap_visualization();
	});

	return true;

}

async function update_category_based_filters_treemaps(
	filter_categories, section_element_selector,
	// treemap_layout = undefined
	// category_update_function = undefined
) {

	let container_div_element_selector = section_element_selector + " .content";

	// Set colors
	// let bar_color = color_scheme["histogram_bars"];
	// let bar_highlight_color = offset_saturation_and_value(bar_color, -10, 10);
	// let bar_disabled_opacity = 0.375;

	// Use the bins in the "STATE" games by release date visualization state
	// let attribute_bins_keys = Object.keys(filter_categories);
	// let attribute_bins_values = Object.values(filter_categories);
	// let filter_categories_data = [];
	// for (let i = 0; i < attribute_bins_keys.length; i++) {
	// 	let bin_key = attribute_bins_keys[i];
	// 	let bin_value = attribute_bins_values[i];
	// 	filter_categories_data.push({ bin_key: bin_value });
	// }
	// Sort bins by value
	// attribute_bins_data.sort(function (a, b) { return b["count"] - a["count"]; });

	// Rebuild the treemaps with the new layout
	// let possible_layouts = [];
	// let visualization_string = "";
	// if (section_element_selector == "#filters-categories-languages") {
	// 	// Total languages: 30
	// 	// Create a cagtegory treemap for languages
	// 	possible_layouts = [
	// 		// Default layout
	// 		[1, 2, 2, 3, 4, 5, 6, 7],
	// 		// Layout for when the difference between the first 2 categories is minimal
	// 		[2, 2, 3, 4, 5, 6, 8],
	// 		// Layout for when all categories are the same (e.g. no games should be shown)
	// 		[5, 5, 5, 5, 5, 5]
	// 	];
	// 	visualization_string = "RELEASED_GAMES_BY_LANGUAGE";
	// } else if (section_element_selector == "#filters-categories-player-mode") {
	// 	// Create category treemap for player modes
	// 	// Total player modes: 13
	// 	possible_layouts = [
	// 		// Default layout
	// 		[1, 3, 4, 5],
	// 		// Layout for when the difference between the first 2 categories is minimal
	// 		[2, 3, 4, 4],
	// 		// Layout for when all categories are the same (e.g. no games should be shown)
	// 		[3, 3, 3, 4]
	// 	];
	// 	visualization_string = "RELEASED_GAMES_BY_PLAYER_MODE";
	// } else if (section_element_selector == "#filters-categories-content-rating") {
	// 	// Create category treemap for content rating
	// 	// Total content ratings: 8
	// 	possible_layouts = [
	// 		// Default layout
	// 		[1, 3, 4,],
	// 		// Layout for when the difference between the first 2 categories is minimal
	// 		[2, 3, 3,],
	// 		// Layout for when all categories are the same (e.g. no games should be shown)
	// 		[4, 4,]
	// 	];
	// 	visualization_string = "RELEASED_GAMES_BY_CONTENT_RATING";
	// }
	// // Create the treemap (i.e. empty the old one and re-create the new one)
	// await create_category_based_filters_treemaps(
	// 	STATE["visualization_states"][visualization_string],
	// 	section_element_selector,
	// 	// treemap_layout = calculate_optimal_treemap_layout(filter_categories["bins"], possible_layouts),
	// 	possible_layouts,
	// 	category_update_function = function (categories, active_states) {
	// 		return update_state_categories(visualization_string, categories, active_states);
	// 	}
	// );

	if (section_element_selector == "#filters-categories-languages") {
		await create_category_based_filters_treemap_for_category("LANGUAGE")
	} else if (section_element_selector == "#filters-categories-player-mode") {
		await create_category_based_filters_treemap_for_category("PLAYER_MODE")
	} else if (section_element_selector == "#filters-categories-content-rating") {
		await create_category_based_filters_treemap_for_category("CONTENT_RATING")
	}



	// NOTE: commented because the treemaps are now recreated from scratch, hence they should not need an update after being recreated...
	// 		Uncomment if errors occur
	/*
	let container_div_element = $(container_div_element_selector);
	// console.log("Updating treemap visualization for " + section_element_selector + "\n" + JSON.stringify(filter_categories_data));
	// Update the histogram
	let event_to_dispatch = new CustomEvent("update", {
		"detail": {
			"filter_categories": filter_categories,
			"active_categories": filter_categories["active"],
		}
	});
	container_div_element[0].dispatchEvent(event_to_dispatch);
	*/

}

// Sorting functions for the released games by feature histograms
function released_games_bins_sorting_function(a, b) {
	if (a.includes("/") && b.includes("/")) {
		// Using the "month/year" format
		return a.split("/").reverse().join().localeCompare(b.split("/").reverse().join());
	} else {
		// Using the "year" format
		return parse_formatted_number_string(a) - parse_formatted_number_string(b);
	}
}
function copies_sold_bins_sorting_function(a, b) {
	let a_bin = a.split("-");
	let b_bin = b.split("-");
	if (a_bin.length == 1) {
		// A is "0" or "N+"
		if (b_bin.length == 1) {
			// B is "0" or "N+"
			return parse_formatted_number_string(a_bin[0]) - parse_formatted_number_string(b_bin[0]);
		} else {
			// B is NOT "0" nor "N+"
			if (a_bin[0].indexOf("+") != -1) {
				// A is "N+"
				return 1;
			} else {
				// A is "0"
				return -1;
			}
		}
	} else if (b_bin.length == 1) {
		// B is "0" or "N+"
		if (a_bin.length == 1) {
			// A is "0" or "N+"
			return parse_formatted_number_string(a_bin[0]) - parse_formatted_number_string(b_bin[0]);
		} else {
			// A is NOT "0" nor "N+"
			if (b_bin[0].indexOf("+") != -1) {
				// B is "N+"
				return -1;
			} else {
				// B is "0"
				return 1;
			}
		}
	} else {
		// A and B are not 0 nor N+
		return parse_formatted_number_string(a_bin[0]) - parse_formatted_number_string(b_bin[0]);
	}

	// if (a_bin.length == 1) {
	// 	if (a_bin[0] == "0") {
	// 		if (b_bin.length == 1) {
	// 			if (b_bin[0] == "0") {
	// 				return 0;
	// 			} else {
	// 				return -1;
	// 			}
	// 		}
	// 	} else {
	// 		if (b_bin.length == 1) {
	// 			if (b_bin[0] == "0") {
	// 				return 1;
	// 			} else {
	// 				return parse_formatted_number_string(a_bin[0]) - parse_formatted_number_string(b_bin[0]);
	// 			}
	// 		} else {
	// 			return -1;
	// 		}
	// 	}
	// } else if (b_bin.length == 1) {
	// 	if (b_bin[0] == "0") {
	// 		if (a_bin.length == 1) {
	// 			if (a_bin[0] == "0") {
	// 				return 0;
	// 			} else {
	// 				return 1;
	// 			}
	// 		}
	// 	} else {
	// 		if (a_bin.length == 1) {
	// 			return -1;
	// 		} else {
	// 			return 1;
	// 		}
	// 	}
	// } else {
	// 	a_bin[0] = a_bin[0].replace("+", "");
	// 	a_bin[1] = a_bin[1].replace("+", "");
	// 	b_bin[0] = b_bin[0].replace("+", "");
	// 	b_bin[1] = b_bin[1].replace("+", "");
	// 	return parse_formatted_number_string(a_bin[0]) - parse_formatted_number_string(b_bin[0]);
	// }
}
function review_rating_bins_sorting_function(a, b) {
	let bin_names_order = ["None", "Negative", "Mostly Neg.", "Mixed", "Mostly Pos.", "Very Pos.", "Over. Pos."];
	return bin_names_order.indexOf(a) - bin_names_order.indexOf(b);
}

// Create a histogram showing the number of games per price range using d3.js
function price_bins_sorting_function(a, b) {
	// Bins could be "Free" or "$N+" or "$N-M"
	if (a == "Free") {
		return -1;
	} else if (b == "Free") {
		return 1;
	} else if (a.indexOf("+") != -1) {
		return 1;
	} else if (b.indexOf("+") != -1) {
		return -1;
	} else {
		let a_bin_price_range = a.split("-");
		let b_bin_price_range = b.split("-");
		a_bin_price_range[0] = a_bin_price_range[0].replace("$", "");
		a_bin_price_range[1] = a_bin_price_range[1].replace("$", "");
		b_bin_price_range[0] = b_bin_price_range[0].replace("$", "");
		b_bin_price_range[1] = b_bin_price_range[1].replace("$", "");
		return parse_formatted_number_string(a_bin_price_range[0]) - parse_formatted_number_string(b_bin_price_range[0]);
	}
}

/**
 * Update the visualizations based on the current STATE["visualization_states"] values
 */
function update_visualizations() {

	// Empty the cached lists of elements for the previuos filter results
	CACHED_TAG_ELEMENTS_COLORS = null;
	CACHED_RELEVANT_TAGS_GAMES_INDEXES_LIST = null;
	CACHED_EXCLUDED_GAMES_FIRST_GAMES_INDEXES_LIST = null;
	CACHED_LIST_OF_TAG_INDEXES_SORTED_BY_TAG_ATTRIBUTE_FOR_GAMES_RESULTS = null;
	CACHED_LIST_OF_NON_EXCLUDED_TAGS_INDEXES = null;

	let delay_step = 20;	// Was 30
	let delay_accumulator = 0;

	let treemaps_delay_step_multiplier = 1;	// Was 1
	let histograms_delay_step_multiplier = 1;	// Was 1.125
	let parallel_coordinates_delay_step_multiplier = 1.25;	// Was 1.25
	let tags_ranking_delay_step_multiplier = 1.25;	// Was 2.9
	let filtered_games_ranking_step_multiplier = 1.25;	// Was 3.5
	let tags_similarity_visualization_step_multiplier = 1.25;	// Was not defined
	let tags_scatterplot_visualization_step_multiplier = 1.25;	// Was not defined
	let tags_time_series_visualization_step_multiplier = 1.25;	// Was not defined
	let tags_and_games_general_infos_step_multiplier = 0.5;	// Was not defined

	function execute_function_with_delay(function_to_execute, delay_step_multiplier = 1) {
		delay_accumulator += delay_step * delay_step_multiplier;
		let current_delay = delay_accumulator;
		setTimeout(function () {
			function_to_execute();
		}, current_delay);
	}

	// Update languages treemap visualization
	execute_function_with_delay(function () {
		update_category_based_filters_treemaps(
			STATE["visualization_states"]["RELEASED_GAMES_BY_LANGUAGE"],
			"#filters-categories-languages"
		);
	}, treemaps_delay_step_multiplier);
	// Update player mode treemap visualization
	execute_function_with_delay(function () {
		update_category_based_filters_treemaps(
			STATE["visualization_states"]["RELEASED_GAMES_BY_PLAYER_MODE"],
			"#filters-categories-player-mode"
		);
	}, treemaps_delay_step_multiplier);
	// Update content rating treemap visualization
	execute_function_with_delay(function () {
		update_category_based_filters_treemaps(
			STATE["visualization_states"]["RELEASED_GAMES_BY_CONTENT_RATING"],
			"#filters-categories-content-rating"
		);
	}, treemaps_delay_step_multiplier);

	// Update released games by date (month/year) histogram
	execute_function_with_delay(function () {
		update_released_games_by_feature_histogram(
			STATE["visualization_states"]["RELEASED_GAMES_BY_RELEASE_DATE"][(use_month_bins_for_released_games_by_date_visualization ? "month_bins" : "year_bins")],
			"#filters-ranges-date",
			// Sort bins by date
			released_games_bins_sorting_function
		)
	}, histograms_delay_step_multiplier);
	// Update released games by copies sold histogram
	execute_function_with_delay(function () {
		update_released_games_by_feature_histogram(
			STATE["visualization_states"]["RELEASED_GAMES_BY_COPIES_SOLD"],
			"#filters-ranges-copies-sold",
			// Sort bins by copies sold range
			copies_sold_bins_sorting_function
		);
	}, histograms_delay_step_multiplier);
	// Update released games by review rating histogram
	execute_function_with_delay(function () {
		update_released_games_by_feature_histogram(
			STATE["visualization_states"]["RELEASED_GAMES_BY_REVIEW_RATING"],
			"#filters-ranges-review-rating",
			// Sort bins by review rating range
			review_rating_bins_sorting_function
		);
	}, histograms_delay_step_multiplier);
	// Update released games by price histogram
	execute_function_with_delay(function () {
		update_released_games_by_feature_histogram(
			STATE["visualization_states"]["RELEASED_GAMES_BY_PRICE"],
			"#filters-ranges-price",
			// Sort bins by price range
			price_bins_sorting_function
		);
	}, histograms_delay_step_multiplier);

	// Update tag parallel view
	execute_function_with_delay(function () {
		update_tags_parallel_coordinates_view();
	}, parallel_coordinates_delay_step_multiplier);

	// Update tags ranking visualization
	execute_function_with_delay(function () {
		update_tags_rankings_visualization();
	}, tags_ranking_delay_step_multiplier);

	// Update chord diagram's shown tags
	execute_function_with_delay(function () {
		update_tags_similarity_visualizations();
	}, tags_similarity_visualization_step_multiplier);

	// Update time series visualization
	execute_function_with_delay(function () {
		update_tags_scatterplot_visualization();
	}, tags_scatterplot_visualization_step_multiplier);

	// Update time series visualization
	execute_function_with_delay(function () {
		update_tags_time_series_visualization();
	}, tags_time_series_visualization_step_multiplier);

	// Update games list
	execute_function_with_delay(function () {
		refresh_filtered_games_ranking();
	}, filtered_games_ranking_step_multiplier);

	// Update games and tags general infos
	execute_function_with_delay(function () {
		update_tags_and_games_infos_visualizations();
	}, tags_and_games_general_infos_step_multiplier);

	console.log("Updated visualizations (total delay: " + delay_accumulator + "ms)");

}

/** List contaning objects in format { "app_section": section_element, "title": title_element } */
let all_app_sections = [];

$(document).ready(function () {

	// Update colors of "body", "html" and "#app" elements
	$("body").css("background-color", color_scheme["background"]);
	$("html").css("background-color", color_scheme["background"]);
	$("#app").css("background-color", color_scheme["background"]);
	// Update default text color
	$("body").css("color", color_scheme["white"]);
	// Update the color of the "#app .app-cell" elements
	$("#app .app-cell").css("background-color", color_scheme["viewport_cells"]);


	/*
	Section reset button code
		<svg width="800px" height="800px" viewBox="-2.1 -2.1 25.20 25.20" xmlns="http://www.w3.org/2000/svg" fill="#ffffff" stroke="#ffffff" stroke-width="1.575" transform="rotate(0)">
			<g id="SVGRepo_bgCarrier" stroke-width="0"/>
			<g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round" stroke="#CCCCCC" stroke-width="0.08399999999999999"/>
			<g id="SVGRepo_iconCarrier"> <g fill="none" fill-rule="evenodd" stroke="#ffffff" stroke-linecap="round" stroke-linejoin="round" transform="matrix(0 1 1 0 2.5 2.5)"> <path d="m3.98652376 1.07807068c-2.38377179 1.38514556-3.98652376 3.96636605-3.98652376 6.92192932 0 4.418278 3.581722 8 8 8s8-3.581722 8-8-3.581722-8-8-8"/> <path d="m4 1v4h-4" transform="matrix(1 0 0 -1 0 6)"/> </g> </g>
		</svg>
	Section info button code
		<svg width="800px" height="800px" viewBox="-3.84 -3.84 31.68 31.68" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#ffffff" stroke-width="0.4800000000000001">
			<g id="SVGRepo_bgCarrier" stroke-width="0"/>
			<g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"/>
			<g id="SVGRepo_iconCarrier"> <path d="M12 17.75C12.4142 17.75 12.75 17.4142 12.75 17V11C12.75 10.5858 12.4142 10.25 12 10.25C11.5858 10.25 11.25 10.5858 11.25 11V17C11.25 17.4142 11.5858 17.75 12 17.75Z" fill="#ffffff"/> <path d="M12 7C12.5523 7 13 7.44772 13 8C13 8.55228 12.5523 9 12 9C11.4477 9 11 8.55228 11 8C11 7.44772 11.4477 7 12 7Z" fill="#ffffff"/> <path fill-rule="evenodd" clip-rule="evenodd" d="M1.25 12C1.25 6.06294 6.06294 1.25 12 1.25C17.9371 1.25 22.75 6.06294 22.75 12C22.75 17.9371 17.9371 22.75 12 22.75C6.06294 22.75 1.25 17.9371 1.25 12ZM12 2.75C6.89137 2.75 2.75 6.89137 2.75 12C2.75 17.1086 6.89137 21.25 12 21.25C17.1086 21.25 21.25 17.1086 21.25 12C21.25 6.89137 17.1086 2.75 12 2.75Z" fill="#ffffff"/> </g>
		</svg>
	*/

	// Create general controls section
	// NOTE: done before appending svgs to info and reset buttons because this section contains a reset button
	create_general_controls_section();

	// Update the application state (without updatinf the visualizations at the end)
	let updated_app_state = update_app_state(false);

	// Add class "scale-up" to "#app ".grid-cell" elements on mouse over
	$("#app .app-cell").on("mouseover", function (event) {
		if (scale_up_app_cells_on_hover) {
			$(this).addClass("scale-up");
		}
	});
	$("#app .app-cell").on("mouseleave", function (event) {
		if (scale_up_app_cells_on_hover) {
			$(this).removeClass("scale-up");
		}
	});

	// Create a general gradient legend
	create_color_gradient_rectangle_for_general_controls_section();

	// Create category based filters treemaps
	create_category_based_filters_treemap_for_category("LANGUAGE");
	create_category_based_filters_treemap_for_category("PLAYER_MODE");
	create_category_based_filters_treemap_for_category("CONTENT_RATING");


	// Create a histogram showing the number of games per month and year using d3.js
	create_released_games_by_feature_histogram(
		STATE["visualization_states"]["RELEASED_GAMES_BY_RELEASE_DATE"][(use_month_bins_for_released_games_by_date_visualization ? "month_bins" : "year_bins")],
		"#filters-ranges-date",
		// Sort bins by date
		released_games_bins_sorting_function,
		// Brush update function
		brush_update_function = function (start_bin, end_bin) {
			// console.log("BRUSHING | start_bin: " + start_bin + ", end_bin: " + end_bin);
			return update_state_brushing("RELEASED_GAMES_BY_RELEASE_DATE", start_bin, end_bin, released_games_bins_sorting_function);
		},
		// Get current brush values function
		get_current_brush_values_function = function (use_previous_brush_values = false) {
			let start_value = STATE["visualization_states"]["RELEASED_GAMES_BY_RELEASE_DATE"]["brush_start_value"];
			let end_value = STATE["visualization_states"]["RELEASED_GAMES_BY_RELEASE_DATE"]["brush_end_value"];
			// If the start and end value do NOT contain a "/", add "01/" to the start value and "12/" to the end value
			if (start_value != null && !start_value.includes("/")) start_value = "01/" + start_value;
			if (end_value != null && !end_value.includes("/")) end_value = "12/" + end_value;
			if (use_previous_brush_values) {
				start_value = STATE["visualization_states"]["RELEASED_GAMES_BY_RELEASE_DATE"]["previous_brush_start_value"];
				end_value = STATE["visualization_states"]["RELEASED_GAMES_BY_RELEASE_DATE"]["previous_brush_end_value"];
			}
			return {
				"is_brushing": STATE["visualization_states"]["RELEASED_GAMES_BY_RELEASE_DATE"]["is_brushing"],
				"start_value": start_value,
				"end_value": end_value
			};
		},
		// Show the x axis labels every 6 bins only
		(use_month_bins_for_released_games_by_date_visualization ? 6 : 1),
		// Highlight the x axis label every 2 shown bins
		(use_month_bins_for_released_games_by_date_visualization ? 2 : 1)
	);

	// Create a histogram showing the number of games per copies sold range using d3.js
	create_released_games_by_feature_histogram(
		STATE["visualization_states"]["RELEASED_GAMES_BY_COPIES_SOLD"],
		"#filters-ranges-copies-sold",
		// Sort bins by copies sold range
		copies_sold_bins_sorting_function,
		// Brush update function
		brush_update_function = function (start_bin, end_bin) {
			// console.log("BRUSHING | start_bin: " + start_bin + ", end_bin: " + end_bin);
			return update_state_brushing("RELEASED_GAMES_BY_COPIES_SOLD", start_bin, end_bin, copies_sold_bins_sorting_function);
		},
		// Get current brush values function
		get_current_brush_values_function = function (use_previous_brush_values = false) {
			let start_value = STATE["visualization_states"]["RELEASED_GAMES_BY_COPIES_SOLD"]["brush_start_value"];
			let end_value = STATE["visualization_states"]["RELEASED_GAMES_BY_COPIES_SOLD"]["brush_end_value"];
			if (use_previous_brush_values) {
				start_value = STATE["visualization_states"]["RELEASED_GAMES_BY_COPIES_SOLD"]["previous_brush_start_value"];
				end_value = STATE["visualization_states"]["RELEASED_GAMES_BY_COPIES_SOLD"]["previous_brush_end_value"];
			}
			return {
				"is_brushing": STATE["visualization_states"]["RELEASED_GAMES_BY_COPIES_SOLD"]["is_brushing"],
				"start_value": start_value,
				"end_value": end_value
			};
		}
	);

	// Create a histogram showing the number of games per review rating range using d3.js
	create_released_games_by_feature_histogram(
		STATE["visualization_states"]["RELEASED_GAMES_BY_REVIEW_RATING"],
		"#filters-ranges-review-rating",
		// Sort bins by review rating range
		review_rating_bins_sorting_function,
		// Brush update function
		brush_update_function = function (start_bin, end_bin) {
			// console.log("BRUSHING | start_bin: " + start_bin + ", end_bin: " + end_bin);
			return update_state_brushing("RELEASED_GAMES_BY_REVIEW_RATING", start_bin, end_bin, review_rating_bins_sorting_function);
		},
		// Get current brush values function
		get_current_brush_values_function = function (use_previous_brush_values = false) {
			let start_value = STATE["visualization_states"]["RELEASED_GAMES_BY_REVIEW_RATING"]["brush_start_value"];
			let end_value = STATE["visualization_states"]["RELEASED_GAMES_BY_REVIEW_RATING"]["brush_end_value"];
			if (use_previous_brush_values) {
				start_value = STATE["visualization_states"]["RELEASED_GAMES_BY_REVIEW_RATING"]["previous_brush_start_value"];
				end_value = STATE["visualization_states"]["RELEASED_GAMES_BY_REVIEW_RATING"]["previous_brush_end_value"];
			}
			return {
				"is_brushing": STATE["visualization_states"]["RELEASED_GAMES_BY_REVIEW_RATING"]["is_brushing"],
				"start_value": start_value,
				"end_value": end_value
			};
		}
	);

	create_released_games_by_feature_histogram(
		STATE["visualization_states"]["RELEASED_GAMES_BY_PRICE"],
		"#filters-ranges-price",
		// Sort bins by price range
		price_bins_sorting_function,
		// Brush update function
		brush_update_function = function (start_bin, end_bin) {
			// console.log("BRUSHING | start_bin: " + start_bin + ", end_bin: " + end_bin);
			return update_state_brushing("RELEASED_GAMES_BY_PRICE", start_bin, end_bin, price_bins_sorting_function);
		},
		// Get current brush values function
		get_current_brush_values_function = function (use_previous_brush_values = false) {
			let start_value = STATE["visualization_states"]["RELEASED_GAMES_BY_PRICE"]["brush_start_value"];
			let end_value = STATE["visualization_states"]["RELEASED_GAMES_BY_PRICE"]["brush_end_value"];
			if (use_previous_brush_values) {
				start_value = STATE["visualization_states"]["RELEASED_GAMES_BY_PRICE"]["previous_brush_start_value"];
				end_value = STATE["visualization_states"]["RELEASED_GAMES_BY_PRICE"]["previous_brush_end_value"];
			}
			return {
				"is_brushing": STATE["visualization_states"]["RELEASED_GAMES_BY_PRICE"]["is_brushing"],
				"start_value": start_value,
				"end_value": end_value
			};
		}
	);

	// console.log(STATE["visualization_states"]);
	// console.log(FILTERS);

	// Create the tags parallel coordinates
	create_tags_parallel_coordinates_view_and_tags_ranking();

	// Create the tags ranking visualization
	create_filtered_games_ranking();

	// Create the tags similarity visualizations
	create_tags_similarity_visualizations();

	// Create the tags scatterplot visualization
	create_tags_scatterplot_visualization();

	// Create the tags time series visualization
	create_tags_time_series_visualization();

	// Create general game info section
	create_general_game_infos_section();

	// Create general tags info section
	create_general_tags_infos_section();

	// To all elements ".buttons-container #section-reset-button" and ".buttons-container #section-info-button" add the corresponding svg
	$(".app-cell #section-reset-button").append(
		'<svg width="100%" height="100%" viewBox="-2.1 -2.1 25.20 25.20"  xmlns="http://www.w3.org/2000/svg" fill="#ffffff" stroke="#ffffff" stroke-width="1.575" transform="rotate(0)"> \
			<g fill="none" fill-rule="evenodd" stroke="#ffffff" stroke-linecap="round" stroke-linejoin="round" transform="matrix(0 1 1 0 2.5 2.5)"> \
					<path d="m3.98652376 1.07807068c-2.38377179 1.38514556-3.98652376 3.96636605-3.98652376 6.92192932 0 4.418278 3.581722 8 8 8s8-3.581722 8-8-3.581722-8-8-8"/> \
					<path d = "m4 1v4h-4" transform = "matrix(1 0 0 -1 0 6)"/> \
				</g> \
			</g> \
		</svg > '
	);
	$(".app-cell #section-info-button").append(
		// '<svg width="100%" height="100%" viewBox="-3.84 -3.84 31.68 31.68"  xmlns="http://www.w3.org/2000/svg" fill="none" stroke="#ffffff" stroke-width="0.4800000000000001"> \
		// 	<g id="SVGRepo_iconCarrier"> \
		// 		<path d="M12 17.75C12.4142 17.75 12.75 17.4142 12.75 17V11C12.75 10.5858 12.4142 10.25 12 10.25C11.5858 10.25 11.25 10.5858 11.25 11V17C11.25 17.4142 11.5858 17.75 12 17.75Z" fill="#ffffff"/> \
		// 		<path d="M12 7C12.5523 7 13 7.44772 13 8C13 8.55228 12.5523 9 12 9C11.4477 9 11 8.55228 11 8C11 7.44772 11.4477 7 12 7Z" fill="#ffffff"/> \
		// 		<path fill-rule="evenodd" clip-rule="evenodd" d="M1.25 12C1.25 6.06294 6.06294 1.25 12 1.25C17.9371 1.25 22.75 6.06294 22.75 12C22.75 17.9371 17.9371 22.75 12 22.75C6.06294 22.75 1.25 17.9371 1.25 12ZM12 2.75C6.89137 2.75 2.75 6.89137 2.75 12C2.75 17.1086 6.89137 21.25 12 21.25C17.1086 21.25 21.25 17.1086 21.25 12C21.25 6.89137 17.1086 2.75 12 2.75Z" fill="#ffffff"/> \
		// 	</g> \
		//  </svg>'
		// Append an svg "?" text with a circle around it
		'<svg width="100%" height="100%" viewBox="0 0 100 100"  xmlns="http://www.w3.org/2000/svg" fill="none" stroke="#ffffff" stroke-width="0.2"> \
			<text x="50%" y="55.25%" dominant-baseline="middle" text-anchor="middle" font-size="55"  fill="#ffffff">?</text> \
			<circle cx="50%" cy="50%" r="35%" stroke="#ffffff" stroke-width="5%" fill="none" /> \
		</svg>'
	);

	// Populate the "all_app_sections" list
	$(".app-cell").each(function (index, element) {
		let section = $(element);
		let title = $(element).find(".sub-section > .title > .title-text");
		if (title != undefined && title.length > 0) {
			// Check for normal section titles
			$(title).each(function (index, title_element) {
				let section_name = $(title_element).text();
				if (section_name.toUpperCase().indexOf("GAME RESULTS") > -1) {
					// Adjust the title element to the actual title element for the GAME RESULTS section (which also includes other infos in the title)
					title_element = $(title_element).find(".actual-title");
					section_name = "GAME RESULTS";
				}
				all_app_sections.push(
					{
						"app_section": section,
						"title": $(title_element),
						"section_name": section_name
					}
				);
			});
		} else {
			// Check for alternative section titles (e.g. tags similarity visualization title or general info sections titles)
			let alternative_title = $(element).find(".alternative-section-title");
			if (alternative_title != undefined) {
				$(alternative_title).each(function (index, title_element) {
					let section_name = $(title_element).text().trim();
					all_app_sections.push(
						{
							"app_section": section,
							"title": $(title_element),
							"section_name": section_name
						}
					);
				});
			}
		}
	});

	// For each section, add a function to the title on click (scale up the section)
	for (let i = 0; i < all_app_sections.length; i++) {
		let section = all_app_sections[i];
		let section_title_element = section["title"];
		let section_element = section["app_section"];
		let section_name = section["section_name"];
		section_title_element
			.on("click", function (event) {
				if (!scale_up_app_cells_on_hover) {
					let section_is_scaled_up = section_element.hasClass("scale-up");
					// Remove class "scale-up" from all "app-cell" elements and add class "scale-up" to the section
					for (let j = 0; j < all_app_sections.length; j++) {
						if (j != i) all_app_sections[j]["app_section"].removeClass("scale-up");
					}
					if (!section_is_scaled_up) {
						section_element.addClass("scale-up");
						console.log("Section scaled up: " + section_name);
						// If we are scaling up the game results section, add 10 extra results to the game results div
						if (section_name.toUpperCase() == "GAME RESULTS") {
							// Add 10 extra results to the game results div
							load_more_results_in_filtered_games_ranking(10);
						}
					} else {
						section_element.removeClass("scale-up");
					}
					// Hide the tooltip
					hide_tooltip();
					// Show the cursor as a default
					$(this).css("cursor", "default");
					// Remove the underline from the title
					section_title_element.css("text-decoration", "none");
				}
			})
			.on("mouseover", function (event) {
				if (!scale_up_app_cells_on_hover) {
					// Show a tooltip with the section title
					let section_is_scaled_up = section_element.hasClass("scale-up");
					let optimal_tooltip_position = calculate_tooltip_optimal_translate_position($(this));
					let tooltip_texts = [];
					if (!section_is_scaled_up) {
						tooltip_texts.push("Click to scale up this section");
						tooltip_texts.push("Click again or click anywhere outside this section to scale it back down");
					} else {
						tooltip_texts.push("Click to scale down this section");
					}
					set_tooltip($(this), section_name.toUpperCase(), tooltip_texts, optimal_tooltip_position, [0, 0], true);
					// Show the cursor as a pointer
					$(this).css("cursor", "pointer");
					// Underline the title
					section_title_element.css("text-decoration", "underline");
				}
			})
			.on("mouseleave", function (event) {
				if (!scale_up_app_cells_on_hover) {
					// Hide the tooltip
					hide_tooltip();
					// Show the cursor as a default
					$(this).css("cursor", "default");
					// Remove the underline from the title
					section_title_element.css("text-decoration", "none");
				}
			});
	}
	// Add a function to the "#app-cover" element on click (scale down all sections)
	$("#app-cover").on("click", function (event) {
		if (!scale_up_app_cells_on_hover) {
			// Remove class "scale-up" from all "app-cell" elements
			for (let i = 0; i < all_app_sections.length; i++) {
				all_app_sections[i]["app_section"].removeClass("scale-up");
			}
			// Hide the tooltip
			hide_tooltip();
		}
	});

	// Add function to the custom select buttons
	add_function_to_select_buttons();

	// Add class ".loaded" to the "#loading-screen" after 150ms
	setTimeout(function () {
		$("#loading-screen").addClass("loaded");
		// Add class ".can-click" after 100ms
		setTimeout(function () {
			$("#loading-screen").addClass("can-click");
		}, 100);
	}, 250);

});

let CACHED_TAG_ELEMENTS_COLORS = null;

// Offsets for category and value of the color gradient to show tag lines with (to easily distinguish between lines)
let tag_category_color_max_saturation_offset = 25;
let tag_category_color_min_saturation_offset = -30;
let tag_category_color_max_value_offset = 16;
let tag_category_color_min_value_offset = -3;

/**
 * Returns a list of colors associated to each index for each tag element
 */
function get_associated_tag_element_colors() {
	if (CACHED_TAG_ELEMENTS_COLORS != null) return CACHED_TAG_ELEMENTS_COLORS;
	let num_of_visible_tags_per_category = [0, 0, 0];
	let num_of_visible_tags = 0;
	let tag_categories = ["Genres", "Sub-Genres", "Features"];
	for (let i = 0; i < TAG_NAMES_LIST.length; i++) {
		let tag_name = TAG_NAMES_LIST[i];
		let tag_category = STATE["all_tags_filter_infos"][tag_name]["category"];
		let tag_is_excluded = STATE["tags_ranking"]["tags_to_exclude"].has(tag_name);
		if (!tag_is_excluded) {
			num_of_visible_tags_per_category[tag_categories.indexOf(tag_category)]++;
			num_of_visible_tags++;
		}
	}
	let tag_lines_categories_count = [0, 0, 0];
	let tag_lines_colors = [];
	for (let i = 0; i < TAG_NAMES_LIST.length; i++) {
		// for (let i = 0; i < all_tag_lines.size(); i++) {
		// let element = d3.select(all_tag_lines.nodes()[i]);
		// let tag_name = element.datum();
		let tag_name = TAG_NAMES_LIST[i];
		let tag_category = STATE["all_tags_filter_infos"][tag_name]["category"];
		let tag_is_excluded = STATE["tags_ranking"]["tags_to_exclude"].has(tag_name);
		let category_index = tag_categories.indexOf(tag_category);
		let main_color = color_scheme["tag_colors"][category_index];
		let tag_color = main_color;
		if (!tag_is_excluded) {
			tag_lines_categories_count[category_index] = tag_lines_categories_count[category_index] + 1;
			let categories_count = tag_lines_categories_count[category_index];
			if (num_of_visible_tags_per_category[category_index] > 1) {
				let gradient_to_use = [
					offset_saturation_and_value(main_color, tag_category_color_min_saturation_offset, tag_category_color_max_value_offset),
					offset_saturation_and_value(main_color, tag_category_color_max_saturation_offset, tag_category_color_min_value_offset)
				];
				let tag_amongst_category_value = (categories_count - 1) / (num_of_visible_tags_per_category[category_index] - 1);
				tag_color = get_gradient_color(tag_amongst_category_value, false, gradient_to_use);
			}
		}
		tag_lines_colors.push(tag_color);
	}
	CACHED_TAG_ELEMENTS_COLORS = tag_lines_colors;
	return tag_lines_colors;
}

/** List of indexes of non excluded tags */
let CACHED_LIST_OF_NON_EXCLUDED_TAGS_INDEXES = null;

/**
 * Returns a list of indexes of non-excluded tags
 */
function get_non_excluded_tags_indexes() {
	if (CACHED_LIST_OF_NON_EXCLUDED_TAGS_INDEXES != null) return CACHED_LIST_OF_NON_EXCLUDED_TAGS_INDEXES;
	let visible_tags_indexes = [];
	for (let i = 0; i < TAG_NAMES_LIST.length; i++) {
		let tag_name = TAG_NAMES_LIST[i];
		let tag_is_excluded = STATE["tags_ranking"]["tags_to_exclude"].has(tag_name);
		if (!tag_is_excluded) {
			visible_tags_indexes.push(i);
		}
	}
	CACHED_LIST_OF_NON_EXCLUDED_TAGS_INDEXES = visible_tags_indexes;
	return CACHED_LIST_OF_NON_EXCLUDED_TAGS_INDEXES;
}

/** List containing, for each tag, the corresponding div element */
let tags_ranking_div_elements = [];
/** List containing, for each tag name, objects with keys { "tag_index", "ranking_index", "ranking_index_for_grouping" } */
let tags_ranking_objects = {};
/** Include all button in the tags ranking */
let tags_ranking_header_button_include_all = undefined;
/** Exclude all button in the tags ranking */
let tags_ranking_header_button_exclude_all = undefined;
/**
 * Create the tags parallel coordinates view and the tags ranking
 */
function create_tags_parallel_coordinates_view_and_tags_ranking() {

	let container_element_selector = "#filter-tags-parallel-coordinates";

	let container_element = $(container_element_selector);

	// Width of tag lines (one line for each tag)
	let tag_lines_width = 0.45;
	// Width of axes lines, thick size and number of thicks to show
	let axes_lines_width = 0.75;
	let tick_size = 2;
	let num_of_thicks = 5;
	// Padding on the sides of the first and last vertical lines
	let padding_on_parallel_coordinates_container_sides = 19;

	// Calculate the width and height of the container element
	let container_element_aspect_ratio = container_element.innerWidth() / container_element.innerHeight();
	let container_element_size = 100;
	let container_element_width = container_element_size * container_element_aspect_ratio;
	let container_element_height = container_element_size;

	let margin = { top: 4, right: 0, bottom: 3, left: 0 };

	let actual_width = container_element_width - (margin.left + margin.right) * container_element_aspect_ratio;
	let actual_height = container_element_height - (margin.top + margin.bottom);

	let parallel_coordinates_height_portion = 0.83;
	let text_labels_height_portion = (1 - parallel_coordinates_height_portion);

	let parallel_coordinates_height = parallel_coordinates_height_portion * actual_height;
	let text_labels_height = text_labels_height_portion * actual_height;

	// Attributes to show in parallel coordinates (attribute of each "STATE["filter_tags"][tag_name]" object to consider)
	let tag_attributes_to_consider = [
		"number_of_games",
		"total_copies_sold",
		"total_revenue",
		"average_copies_sold",
		"average_revenue",
		"average_price",
		// "average_review_rating",
	];

	// Create the svg element
	let svg_parallel_coordinates_element = d3.select(container_element_selector)
		.append("svg")
		.attr("width", "100%")
		.attr("height", "100%")
		.attr("viewBox", "0 0 100 100")
		.attr("preserveAspectRatio", "xMinYMin meet");
	// Create the parallel coordinates
	let parallel_coordinates_container = svg_parallel_coordinates_element.append("g")
		.attr("class", "parallel-coordinates-container")
		.attr("transform", "translate(" + margin.left * container_element_aspect_ratio + "," + margin.top + ")")
		.attr("font-size", "9");
	// Create the tag attribute vertical lines
	let tag_attribute_vertical_lines = parallel_coordinates_container.append("g")
		.attr("class", "tag-attribute-vertical-lines")
		.attr("pointer-events", "none");
	/**
	 * Returns the x position (in the svg) of the vertical line for the given tag attribute
	 */
	function get_tag_attribute_svg_x_position(tag_attribute) {
		let index = tag_attributes_to_consider.indexOf(tag_attribute);
		return padding_on_parallel_coordinates_container_sides + (index / (tag_attributes_to_consider.length - 1)) * (actual_width - padding_on_parallel_coordinates_container_sides * 2);
	}
	/**
	 * Returns the y position (in the svg) of the vertical line for the given tag attribute
	 *
	 * Also returns a bool value indicating if the y position is visible or not (based on the zoom value)
	 *
	 * The zoom_value and zoom_origin parameters are used to zoom in/out the y coordinate of the tag attribute
	 *
	 * The zoom_origin parameter is a value in [0,1] that represents the position of the zoom origin on the y axis (0 is the top, 1 is the bottom)
	 */
	function get_tag_attribute_y_coordinate(tag_object, tag_attribute, zoom_value = 1, zoom_origin = 0.5) {
		// Get the max value for this attribute among all tags (to set the y axis range)
		let max_tag_attribute_value = STATE["tag_global_infos"]["max_" + tag_attribute];
		if (max_tag_attribute_value == 0) max_tag_attribute_value = 1;	// Avoid division by 0
		// Get the value of the attribute for the current tag
		let tag_attribute_value = tag_object[tag_attribute];
		// Consider y axis from a min to a max value of the attribute for all tags
		let min_y_axis_value = 0;
		let max_y_axis_value = max_tag_attribute_value;
		// Recalculate min and max y axis value based on zoom
		let zoomed_y_axis_range = max_y_axis_value - min_y_axis_value;
		let zoom_scale_factor = 1 / zoom_value;
		let zoomed_min_y_axis_value = min_y_axis_value + zoomed_y_axis_range * (1 - zoom_scale_factor) * zoom_origin;
		let zoomed_max_y_axis_value = max_y_axis_value - zoomed_y_axis_range * (1 - zoom_scale_factor) * (1 - zoom_origin);
		// Calculate the y coordinate of the tag attribute
		let attribute_value = (tag_attribute_value - zoomed_min_y_axis_value) / (zoomed_max_y_axis_value - zoomed_min_y_axis_value);
		// if (isNaN(parallel_coordinates_height - attribute_value * parallel_coordinates_height)) {
		// 	console.log("ERROR | tag_attribute: " + tag_attribute + ", tag_attribute_value: " + tag_attribute_value + ", zoomed_min_y_axis_value: " + zoomed_min_y_axis_value + ", zoomed_max_y_axis_value: " + zoomed_max_y_axis_value + ", attribute_value: " + attribute_value + ", parallel_coordinates_height: " + parallel_coordinates_height + ", zoom_value: " + zoom_value + ", zoom_origin: " + zoom_origin);
		// }
		let point_is_inside_viewport = (attribute_value >= 0 && attribute_value <= 1);
		return [parallel_coordinates_height - attribute_value * parallel_coordinates_height, point_is_inside_viewport];
	}
	// Append the tag attribute lines
	tag_attribute_vertical_lines.selectAll(".tag-attribute-vertical-line")
		.data(tag_attributes_to_consider)
		.enter()
		.append("line")
		.attr("class", "tag-attribute-vertical-line")
		.attr("x1", function (d, i) { return get_tag_attribute_svg_x_position(d); })
		.attr("y1", 0)
		.attr("x2", function (d, i) { return get_tag_attribute_svg_x_position(d); })
		.attr("y2", parallel_coordinates_height + tick_size * 0.75)
		.attr("stroke", function (d, i) { return color_scheme["white"]; })
		.attr("stroke-width", axes_lines_width)
		// Make line caps rounded
		.attr("stroke-linecap", "round")
		.attr("stroke-linejoin", "round");

	// Append 5 horizontal thicks for each vertical line (evenly spaced, with no labels)
	let tag_attribute_thicks = parallel_coordinates_container.append("g")
		.attr("class", "tag-attribute-thicks")
		.attr("pointer-events", "none");
	tag_attribute_thicks.selectAll(".tag-attribute-vertical-line-ticks-container")
		.data(tag_attributes_to_consider)
		.enter()
		.append("g")
		.attr("class", "tag-attribute-vertical-line-ticks-container")
		.selectAll(".tag-attribute-vertical-line-thick")
		.data(function (d, i) {
			let toRet = [];
			for (let j = 0; j < num_of_thicks; j++) {
				toRet.push(j);
			}
			return toRet;
		})
		.enter()
		.append("line")
		.attr("class", "tag-attribute-vertical-line-thick")
		.attr("x1", function (d, i) { return get_tag_attribute_svg_x_position(d3.select(this.parentNode).datum()) + tick_size / 2; })
		.attr("y1", function (d, i) { return (i) * parallel_coordinates_height / (num_of_thicks - 1); })
		.attr("x2", function (d, i) { return get_tag_attribute_svg_x_position(d3.select(this.parentNode).datum()) - tick_size / 2; })
		.attr("y2", function (d, i) { return (i) * parallel_coordinates_height / (num_of_thicks - 1); })
		.attr("stroke", function (d, i) { return color_scheme["white"]; })
		.attr("stroke-width", axes_lines_width);
	// Append empty texts as labels of each thick to the ".tag-attribute-vertical-line-ticks-container" groups
	tag_attribute_thicks.selectAll(".tag-attribute-vertical-line-ticks-container")
		.selectAll(".tag-attribute-vertical-line-thick-label")
		.data(function (d, i) {
			let toRet = [];
			for (let j = 0; j < num_of_thicks; j++) {
				toRet.push(j);
			}
			return toRet;
		})
		.enter()
		.append("text")
		// Remove the shadow of the text (add class "no-shadow" to the text)
		.attr("class", "tag-attribute-vertical-line-thick-label no-shadow")
		.attr("x", function (d, i) { return get_tag_attribute_svg_x_position(d3.select(this.parentNode).datum()) - tick_size * 1.5; })
		.attr("y", function (d, i) { return (i) * parallel_coordinates_height / (num_of_thicks - 1); })
		.attr("dy", "0.25em")
		.attr("text-anchor", "end")
		.attr("font-size", "0.425em")
		.attr("fill", function (d, i) { return color_scheme["white"]; })
		// Add a stroke around the text, outside of it, with the same color of the viewport cells in the color_Scheme
		.attr("stroke", color_scheme["viewport_cells"])
		.attr("stroke-width", "0.25em")
		.attr("stroke-opacity", 0.625)
		.attr("stroke-linecap", "round")
		.attr("stroke-linejoin", "round")
		.attr("paint-order", "stroke")
		.attr("pointer-events", "none")
		.text("");

	// Tag categories stored in the "category" attribute of each tag
	let tag_categories = ["Genres", "Sub-Genres", "Features"];

	// Create one line with N-1 segments, hence N points, for each tag (N = number of attributes to consider), initialized in the middle of the svg
	let tag_lines_outer_container = parallel_coordinates_container.append("g")
		.attr("class", "tag-lines-outer-container")
		.attr("pointer-events", "none")
		// Make the element hide every overflowing content outside of its bounds (use a clicp path to do so)
		.attr("clip-path", "url(#tag-lines-clip)");
	// Create the clip path
	let tag_lines_clip_path = parallel_coordinates_container.append("clipPath")
		.attr("id", "tag-lines-clip");
	// Append the clip path rect
	tag_lines_clip_path.append("rect")
		.attr("x", padding_on_parallel_coordinates_container_sides)
		.attr("y", 0)
		.attr("width", actual_width - padding_on_parallel_coordinates_container_sides * 2)
		.attr("height", parallel_coordinates_height);
	// Append the tag lines outer container
	let tag_lines = tag_lines_outer_container.append("g")
		.attr("class", "tag-lines")
		// .attr("transform", "scale(1,1)")
		.attr("zoom-value", 1)
		.attr("zoom-origin", 0.5)
		// .attr("opacity", 0.25)
		.attr("absolute-pointed-position", 0.5)
		.attr("pointer-events", "none");
	// Append a group for highlighted tag lines
	let higlighted_tag_lines_container = tag_lines_outer_container.append("g")
		.attr("class", "higlighted-tag-lines-container")
		.attr("pointer-events", "none");
	// Append the tag lines (NOTE: tags are sorted by total number of games for the tag when no filters are applied, in descending order)
	let tag_names = Object.keys(STATE["all_tags_filter_infos"]);
	tag_lines.selectAll(".tag-line")
		.data(tag_names)
		.enter()
		.append("polyline")
		.attr("class", function (d, i) { return "tag-line tag-line-index-" + i; })
		.attr("fill", "none")
		.attr("stroke-opacity", 1)
		.attr("stroke-width", tag_lines_width)
		// Set the stroke color
		.attr("stroke", function (d, i) {
			let tag_category = STATE["all_tags_filter_infos"][d]["category"];
			let tag_category_index = tag_categories.indexOf(tag_category);
			return offset_saturation_and_value(color_scheme["tag_colors"][tag_category_index], 1, 5);
		});

	// Add text labels as rects below the parallel coordinates
	let tag_attribute_text_labels = parallel_coordinates_container.append("g")
		.attr("class", "tag-attribute-text-labels-container");
	// Append the tag attributes text labels on bottom of parallel coordinates
	let labels_font_size = 5.125;
	tag_attribute_text_labels.selectAll(".tag-attribute-text-label")
		.data(tag_attributes_to_consider)
		.enter()
		.append("text")
		.attr("class", function (d, i) { return "tag-attribute-text-label tag-attribute-text-label-index-" + i; })
		.attr("x", function (d, i) { return get_tag_attribute_svg_x_position(d); })
		.attr("y", parallel_coordinates_height + labels_font_size * 1.5)
		.attr("dy", "0.35em")
		.attr("text-anchor", "middle")
		.attr("font-size", labels_font_size)
		// .attr("font-size", "0.5em")
		.attr("fill", function (d, i) { return color_scheme["white"]; })
		.attr("pointer-events", "none");
	// .text(function (d, i) {
	// 	let name = d.replaceAll("_", " ").toUpperCase();
	// 	// Replace the first " " with "\n"
	// 	return name;
	// });
	// Append 2 tspan elements to each text label with the first word of the attribute name in the first tspan and the remaining words in the second tspan
	tag_attribute_text_labels.selectAll(".tag-attribute-text-label")
		.append("tspan")
		.attr("class", function (d, i) { return "tag-attribute-text-label-first-word tag-attribute-text-label-first-word-index-" + i; })
		.attr("x", function (d, i) { return get_tag_attribute_svg_x_position(d); })
		.attr("dy", "0.35em")
		.attr("text-anchor", "middle")
		.attr("fill", function (d, i) { return color_scheme["white"]; })
		.text(function (d, i) {
			let name = d.replaceAll("_", " ").toUpperCase();
			return name.split(" ")[0];
		});
	tag_attribute_text_labels.selectAll(".tag-attribute-text-label")
		.append("tspan")
		.attr("class", function (d, i) { return "tag-attribute-text-label-second-word tag-attribute-text-label-second-word-index-" + i; })
		.attr("x", function (d, i) { return get_tag_attribute_svg_x_position(d); })
		.attr("dy", "1em")
		.attr("text-anchor", "middle")
		.attr("fill", function (d, i) { return color_scheme["white"]; })
		.text(function (d, i) {
			let name = d.replaceAll("_", " ").toUpperCase();
			return name.split(" ").slice(1).join(" ");
		});

	// Add a box underneath each label
	let border_radius = 3;
	// let label_box_stroke_width = 0.625;
	let label_box_stroke_width = 0;
	let label_box_width = 39 - label_box_stroke_width * 2;
	let label_box_height = 13.5 - label_box_stroke_width * 2;
	let label_box_height_for_active_attribute = label_box_height + 20;	// NOTE: setting the height to a higher value than the "bbox.heifht+padding_vertical * 2" makes it possible to make the box look line only the top corners are rounded...
	let label_box_background_color = offset_saturation_and_value(color_scheme["viewport_cells"], 0, 11);
	let label_box_background_color_hover = offset_saturation_and_value(color_scheme["viewport_cells"], 0, 5);
	// let label_box_active_background_color = "#ffffff35";
	tag_attribute_text_labels.selectAll(".tag-attribute-text-label")
		.each(function (d, i) {
			let bbox = d3.select(this).node().getBBox();
			d3.select(this.parentNode)
				.append("rect")
				.attr("class", "tag-attribute-text-label-box tag-attribute-text-label-box-index-" + i)
				.attr("x", bbox.x - label_box_width / 2 + bbox.width / 2)
				.attr("y", bbox.y - label_box_height / 2 + bbox.height / 2)
				.attr("width", label_box_width)
				.attr("height", label_box_height)
				.attr("rx", border_radius)
				.attr("ry", border_radius)
				.attr("fill", "none")
				// .attr("stroke", label_box_background_color)
				// .attr("stroke-width", label_box_stroke_width)
				.attr("cursor", "pointer")
		});
	tag_attribute_text_labels.selectAll(".tag-attribute-text-label")
		.raise();
	// On hover over one of the "tag-attribute-text-label-box" elements, set its background as the active background color
	tag_attribute_text_labels.selectAll(".tag-attribute-text-label-box")
		.on("mouseover", function (event) {
			let box = d3.select(this);
			let is_active_ranking_mode = box.classed("active");
			// if (box.classed("active")) return;
			if (!is_active_ranking_mode) box.attr("fill", label_box_background_color_hover);
			// Make tooltip appear
			let attribute_index = parseInt(box.attr("class").split("tag-attribute-text-label-box-index-")[1]);
			// console.log("attribute_index: " + attribute_index);
			let attribute_name = tag_attributes_to_consider[attribute_index];
			// console.log("attribute_name: " + attribute_name);
			let label_text = attribute_name.toString().replaceAll("_", " ");
			let tooltip_texts = [
				label_text.charAt(0).toUpperCase() + label_text.slice(1) + " of tags calculated considering games that match the current filters and that are tagged with the corresponding tag."
			];
			if (!is_active_ranking_mode) {
				tooltip_texts.push(TOOLTIP_LINE_SEPARATOR);
				tooltip_texts.push("Click to sort the tags below by " + label_text + " (descending order).");
			}
			// Find the tag-attribute-text-label-index-<attribute_index> element
			let actual_text_label_element = $(this.parentNode).find(".tag-attribute-text-label-index-" + attribute_index);
			// let optimal_tooltip_position = calculate_tooltip_optimal_translate_position($(actual_text_label_element));
			set_tooltip(
				actual_text_label_element,
				"Tags " + label_text,
				tooltip_texts,
				[-1, 0]
			);
		})
		.on("mouseleave", function (event) {
			let box = d3.select(this);
			if (box.classed("active")) return;
			box.attr("fill", "#ffffff00");
			// Make tooltip disappear
			hide_tooltip();
		})
	// Add 2 "rounded corner" rects at the sides of each label box, on the bottom, with a width and height of "border_radius"
	tag_attribute_text_labels.selectAll(".tag-attribute-text-label-box")
		.each(function (d, i) {
			let bbox = d3.select(this).node().getBBox();
			let new_rect_size = border_radius * 3;
			let new_rect_corner_size = new_rect_size / 2;
			// Append the right rect
			d3.select(this.parentNode)
				.append("rect")
				.attr("class", "tag-attribute-text-label-box-rounded-corner-rect tag-attribute-text-label-box-rounded-corner-rect-right tag-attribute-text-label-box-index-corner-rect-" + i)
				.attr("x", bbox.x + bbox.width)
				.attr("y", bbox.y + bbox.height - new_rect_size * (5 / 6))
				.attr("width", new_rect_size)
				.attr("height", new_rect_size)
				.attr("rx", new_rect_size / 2)
				.attr("ry", new_rect_size / 2)
				.attr("pointer-events", "none")
				.attr("fill", color_scheme["viewport_cells"])
			d3.select(this.parentNode)
				.append("rect")
				.attr("class", "tag-attribute-text-label-box-rounded-corner-rect tag-attribute-text-label-box-rounded-corner-rect-right tag-attribute-text-label-box-index-corner-rect-" + i)
				.attr("x", bbox.x + bbox.width)
				.attr("y", bbox.y + bbox.height - new_rect_corner_size * (1 / 2))
				.attr("width", new_rect_corner_size)
				.attr("height", new_rect_corner_size)
				.attr("pointer-events", "none")
				.attr("fill", label_box_background_color);
			// Append the left rect
			d3.select(this.parentNode)
				.append("rect")
				.attr("class", "tag-attribute-text-label-box-rounded-corner-rect tag-attribute-text-label-box-rounded-corner-rect-left tag-attribute-text-label-box-index-corner-rect-" + i)
				.attr("x", bbox.x - new_rect_size)
				.attr("y", bbox.y + bbox.height - new_rect_size * (5 / 6))
				.attr("width", new_rect_size)
				.attr("height", new_rect_size)
				.attr("rx", new_rect_size / 2)
				.attr("ry", new_rect_size / 2)
				.attr("pointer-events", "none")
				.attr("fill", color_scheme["viewport_cells"]);
			d3.select(this.parentNode)
				.append("rect")
				.attr("class", "tag-attribute-text-label-box-rounded-corner-rect tag-attribute-text-label-box-rounded-corner-rect-left tag-attribute-text-label-box-index-corner-rect-" + i)
				.attr("x", bbox.x - new_rect_corner_size)
				.attr("y", bbox.y + bbox.height - new_rect_corner_size * (1 / 2))
				.attr("width", new_rect_corner_size)
				.attr("height", new_rect_corner_size)
				.attr("pointer-events", "none")
				.attr("fill", label_box_background_color);
		});

	// Set "#filter-tags-ranking" background color to be exactly the same as the "label_box_background_color" variable
	$("#filter-tags-ranking").css("background-color", label_box_background_color)

	/**
	 * Set one of the attributes as the active attributes, highlighting it (also set all other attributes as inactive)
	 */
	function set_tags_attribute_as_active(attribute_name) {
		// Calculate the index of the attribute in the "tag_attributes_to_consider" array
		let tag_attribute_index = tag_attributes_to_consider.indexOf(attribute_name);
		// Function to set the state of a single "tag-attribute-text-label-box" element
		function set_single_attribute_label_element_state(element, active) {
			let current_tag_attribute_index = parseInt(element.attr("class").split("tag-attribute-text-label-box-index-")[1]);
			if (active) {
				element.classed("active", true);
				element.attr("height", label_box_height_for_active_attribute);
				element.attr("fill", label_box_background_color);
				// element.attr("stroke", label_box_background_color);
				// Set the ".tag-attribute-text-label-box-index-corner-rect-" + i elements as visible
				tag_attribute_text_labels.selectAll(".tag-attribute-text-label-box-index-corner-rect-" + current_tag_attribute_index)
					.each(function (d, i) {
						d3.select(this).attr("opacity", 1);
					});
			} else {
				element.classed("active", false);
				element.attr("height", label_box_height);
				element.attr("fill", "#ffffff00");
				// element.attr("stroke", label_box_background_color);
				// Set the ".tag-attribute-text-label-box-index-corner-rect-" + i elements as hidden
				tag_attribute_text_labels.selectAll(".tag-attribute-text-label-box-index-corner-rect-" + current_tag_attribute_index)
					.each(function (d, i) {
						d3.select(this).attr("opacity", 0);
					});
			}
		}
		// Find the "tag-attribute-text-label-box" element with the given index
		let tag_attribute_text_label_box = d3.select(".tag-attribute-text-label-box-index-" + tag_attribute_index);
		// Set the height and background color of the stroke
		set_single_attribute_label_element_state(tag_attribute_text_label_box, true);
		// Set all other "tag-attribute-text-label-box" elements as inactive
		tag_attribute_text_labels.selectAll(".tag-attribute-text-label-box")
			.filter(function (d, i) {
				return i != tag_attribute_index;
			})
			.each(function (d, i) {
				set_single_attribute_label_element_state(d3.select(this), false);
			});
		// Set attribute as active in the "STATE" variable
		STATE["tags_ranking"]["current_sorting_criteria"] = attribute_name;
		// if the STATE has no sorted list for the sorted criteria, create it
		if (STATE["tags_ranking"]["tag_lists"][attribute_name] == undefined || STATE["tags_ranking"]["tag_lists"][attribute_name].length == 0) {
			STATE["tags_ranking"]["tag_lists"][attribute_name] = get_sorted_tags_list(attribute_name);
		}
		// Update the tags ranking visualization
		update_tags_rankings_visualization();
	}

	// Initially set the "number_of_games" attribute as active
	set_tags_attribute_as_active("number_of_games");

	// On click on a "tag-attribute-text-label-box" element, set it as the active attribute
	tag_attribute_text_labels.selectAll(".tag-attribute-text-label-box")
		.on("click", function (event) {
			let box = d3.select(this);
			if (box.classed("active")) return;
			let text_label_attribute_index = parseInt(box.attr("class").split("tag-attribute-text-label-box-index-")[1]);
			let attribute_name = tag_attributes_to_consider[text_label_attribute_index];
			// console.log("CLICK | attribute_name: " + attribute_name);
			set_tags_attribute_as_active(attribute_name);
			// Reset zoom values (why?)
			// tag_lines.attr("zoom-value", 1);
			// tag_lines.attr("zoom-origin", 0.5);
			// Update the parallel coordinates (why? maybe not needed...)
			// update_tag_lines();
			// Hide tooltip (just in case)
			hide_tooltip();
			// Reset the tags ranking list scroll position
			// $("#filter-tags-ranking .tags-ranking-container").scrollTop(0);
			// Also trigger an update of the tags infos visualization
			// update_tags_and_games_infos_visualizations();
		});

	// Reset ordering of groups
	tag_attribute_thicks.raise();
	higlighted_tag_lines_container.lower();
	tag_lines.lower();
	tag_attribute_vertical_lines.lower();
	tag_attribute_text_labels.raise();
	// Lower tag-attribute-text-label-box-rounded-corner-rect elements
	tag_attribute_text_labels.selectAll(".tag-attribute-text-label-box-rounded-corner-rect")
		.lower();

	let tag_lines_out_of_view_opacity = 0.25;
	let tag_lines_inactive_opacity = 0.45;

	// Create N text strings (N is the number of attributes being shown -1) to show the names of the M<=N tags currently non-excluded
	let number_of_tag_names_to_show = tag_attributes_to_consider.length - 1;
	let tag_names_elements = [];
	for (let i = 0; i < number_of_tag_names_to_show; i++) {
		let tag_name_element = parallel_coordinates_container.append("text")
			.attr("class", "tag-name tag-name-" + (i + 1))
			// X should be at the start of each vertical line
			.attr("x", get_tag_attribute_svg_x_position(tag_attributes_to_consider[i]) + tick_size * 0.75)
			// Y should be set according to which tag the text refers to
			.attr("y", 0)
			.attr("font-size", "0.5em")
			.attr("fill", color_scheme["white"])
			.attr("pointer-events", "none")
			.attr("opacity", 0)
			.attr("stroke", color_scheme["viewport_cells"])
			.attr("stroke-width", "0.25em")
			.attr("stroke-opacity", 0.625)
			.attr("stroke-linecap", "round")
			.attr("stroke-linejoin", "round")
			.attr("paint-order", "stroke")
			.text("");
		tag_names_elements.push(tag_name_element);
	}
	function update_tag_name_elements(zoom_value = 1, zoom_origin = 0.5) {
		let number_of_tags_being_shown = tag_names.length - STATE["tags_ranking"]["tags_to_exclude"].size;
		function reset_tag_name_element(tag_name_element) {
			tag_name_element.text("");
			tag_name_element.attr("opacity", 0);
		}
		if (number_of_tags_being_shown > 0 && number_of_tags_being_shown <= number_of_tag_names_to_show) {
			let tag_element_colors = get_associated_tag_element_colors();
			for (let i = 0; i < number_of_tag_names_to_show; i++) {
				let indexes_of_tags_being_shown = get_non_excluded_tags_indexes();
				let tag_name_element = tag_names_elements[i];
				if (i < number_of_tags_being_shown) {
					let tag_index = indexes_of_tags_being_shown[i];
					let tag_name = tag_names[tag_index];
					let attribute = tag_attributes_to_consider[i];
					let tag_object = STATE["all_tags_filter_infos"][tag_name];
					let y_coordinate_info = get_tag_attribute_y_coordinate(tag_object, attribute, zoom_value, zoom_origin);
					let y_coordinate = y_coordinate_info[0];
					let point_is_inside_viewport = y_coordinate_info[1];
					if (point_is_inside_viewport) {
						let tag_name_to_display = tag_name;
						let allowed_string_length = "Music-Based Proce".length + 1;
						if (tag_name_to_display.length > allowed_string_length) tag_name_to_display = tag_name_to_display.substring(0, allowed_string_length - 1) + "...";
						tag_name_element.text(tag_name_to_display);
						tag_name_element.attr("fill", tag_element_colors[tag_index]);
						tag_name_element.attr("opacity", 1);
						// Set the Y to coincide with the point of the tag line in the corresponding attribute's vertical line
						let y_offset_up = -1;	// Offset from the point of the tag line going up
						let y_offset_down = 4.5;	// Offset from the point of the tag line going down (for when going up would make the text go out of the svg)
						let y_offset = y_offset_up;
						if (y_coordinate - 5 < 0) y_offset = y_offset_down;
						tag_name_element.attr("y", y_coordinate + y_offset);
					} else {
						reset_tag_name_element(tag_name_element);
					}
				} else {
					reset_tag_name_element(tag_name_element);
				}
			}
		} else {
			for (let i = 0; i < number_of_tag_names_to_show; i++) {
				let tag_name_element = tag_names_elements[i];
				reset_tag_name_element(tag_name_element);
			}
		}
	}

	// Raise the tag element horizontal line (which appears on hover)
	// parallel_coordinates_horizontal_line_container.raise();

	/**
	 * Update tag lines to actually show the data in parallel coordinates (NOTE: the tag lines "stroke-opacity" is set based on whether the tag line is inside the zoomed view or not)
	 *
	 * The "animate" parameter is used to animate the transition of the tag lines (set to false to set tag lines points positions instantly)
	 *
	 * The "zoom_value" parameter is used to zoom in/out the y coordinate of the tag attribute
	 *
	 * The "zoom_origin" parameter is a value in [0,1] that represents the position of the zoom origin on the y axis (0 is the top, 1 is the bottom)
	 */
	function update_tag_lines(animate = true, zoom_value = 1, zoom_origin = 0.5) {

		// console.log(">>>>> Updating tag lines...");

		// First get all the values of the tag attributes for all tags...

		// Get the texts
		let tag_attrubute_tick_text = tag_attribute_thicks.selectAll(".tag-attribute-vertical-line-ticks-container")
			.selectAll(".tag-attribute-vertical-line-thick-label");

		// Get the lines
		let all_tag_lines = d3.selectAll(".tag-line");

		// console.log("num_of_visible_tags_per_category:\n" + "Genres: " + num_of_visible_tags_per_category[0] + "\nSub-Genres: " + num_of_visible_tags_per_category[1] + "\nFeatures: " + num_of_visible_tags_per_category[2]);

		let tag_lines_associated_color = get_associated_tag_element_colors();

		// console.log(tag_lines_associated_color);

		// Get the lines points strings, exclude state and color
		let all_tag_lines_points_info = [];
		let all_tag_lines_exclude_state = [];
		// let all_tag_lines_color = [];
		all_tag_lines
			.each(function (d, i) {
				let element = d3.select(this);
				let tag_name = element.datum();
				// Get points info (line points string and bool that is true if at least one point is inside the current parallel coordinate viewport)
				let points_info = get_single_line_points(tag_name);
				all_tag_lines_points_info.push(points_info);
				// Get exclude state
				let tag_is_excluded = STATE["tags_ranking"]["tags_to_exclude"].has(tag_name);
				all_tag_lines_exclude_state.push(tag_is_excluded);
				// Get the tag line color to show
				// let category_index = tag_categories.indexOf(STATE["all_tags_filter_infos"][tag_name]["category"]);
				// tag_lines_categories_count[category_index] += 1;
				// let categories_count = tag_lines_categories_count[category_index];
				// let main_color = color_scheme["tag_colors"][category_index];
				// let tag_color = tag_lines_associated_color[i];
				// if (num_of_visible_tags_per_category[category_index] > 1) {
				// 	let gradient_to_use = [
				// 		offset_saturation_and_value(main_color, -15, 5),
				// 		offset_saturation_and_value(main_color, 10, -10)
				// 	];
				// 	let tag_amongst_category_value = (categories_count - 1) / (num_of_visible_tags_per_category[category_index] - 1);
				// 	tag_color = get_gradient_color(tag_amongst_category_value, false, gradient_to_use);
				// }
				// all_tag_lines_color.push(tag_color);
			});


		// Update the thicks text label based on the new min-max values
		tag_attrubute_tick_text
			.text(function (d, i) {
				let tag_attribute = d3.select(this.parentNode).datum();
				let max_tag_attribute_value = STATE["tag_global_infos"]["max_" + tag_attribute];
				// Consider y axis from a min to a max value of the attribute for all tags
				let min_y_axis_value = 0;
				let max_y_axis_value = max_tag_attribute_value;
				// Recalculate min and max y axis value based on zoom
				let zoomed_y_axis_range = max_y_axis_value - min_y_axis_value;
				let zoom_scale_factor = 1 / zoom_value;
				let zoomed_min_y_axis_value = min_y_axis_value + zoomed_y_axis_range * (1 - zoom_scale_factor) * zoom_origin;
				let zoomed_max_y_axis_value = max_y_axis_value - zoomed_y_axis_range * (1 - zoom_scale_factor) * (1 - zoom_origin);
				// Calculate the y coordinate of the tag attribute
				// let tag_attribute_value = max_tag_attribute_value * (num_of_thicks - 1 - i) / (num_of_thicks - 1);
				let tag_attribute_value = zoomed_min_y_axis_value + (zoomed_max_y_axis_value - zoomed_min_y_axis_value) * (num_of_thicks - 1 - i) / (num_of_thicks - 1);
				return format_number_string(tag_attribute_value);
			});

		// Function to get the "points" attribute string for the given tag name and also a bool that is true if at least one point is inside the current parallel coordinate viewport
		function get_single_line_points(tag_name) {
			let found_one_point_inside_viewport = false;
			// let points = [];
			let points_string = "";
			for (let j = 0; j < tag_attributes_to_consider.length; j++) {
				let x_coordinate = get_tag_attribute_svg_x_position(tag_attributes_to_consider[j]);
				let point_info = get_tag_attribute_y_coordinate(STATE["all_tags_filter_infos"][tag_name], tag_attributes_to_consider[j], zoom_value, zoom_origin);
				let y_coordinate = point_info[0];
				let point_is_inside_viewport = point_info[1];
				// Update the "found_one_point_inside_viewport" variable
				if (point_is_inside_viewport && !found_one_point_inside_viewport) found_one_point_inside_viewport = true;
				// points.push([x_coordinate, y_coordinate]);
				points_string += x_coordinate + "," + y_coordinate + " ";
			}
			// return [points.join(" "), found_one_point_inside_viewport];
			return [points_string, found_one_point_inside_viewport];
		}

		// Update the tag lines
		if (animate) {
			all_tag_lines
				.each(function (d, i) {
					let element = d3.select(this);
					let points_info = all_tag_lines_points_info[i];
					let tag_is_excluded = all_tag_lines_exclude_state[i];
					element
						// Set the "excluded" attribute based on wheter the tag is in the "exclude" tags list or not
						.attr("excluded", tag_is_excluded ? "true" : "false")
					element
						.transition()
						.duration(200)
						// Set the actual line points
						.attr("points", points_info[0])
						// Set the "stroke opacity" of the line based on whether the tag line is inside the zoomed view or not
						.attr("stroke-opacity", points_info[1] ? 1 : tag_lines_out_of_view_opacity)
						// Set the "opacity" of the line based on wheter the tag is in the "exclude" tags list or not
						.attr("opacity", tag_is_excluded ? 0 : 1)
						// Set the "stroke" color of the line based on the tag category
						.attr("stroke", tag_lines_associated_color[i])
				});
		} else {
			all_tag_lines
				.each(function (d, i) {
					let element = d3.select(this);
					let points_info = all_tag_lines_points_info[i];
					let tag_is_excluded = all_tag_lines_exclude_state[i];
					element
						// Set the actual line points
						.attr("points", points_info[0])
						// Set the "excluded" attribute based on wheter the tag is in the "exclude" tags list or not
						.attr("excluded", tag_is_excluded ? "true" : "false")
						// Set the "stroke" color of the line based on the tag category
						.attr("stroke", tag_lines_associated_color[i])
					element
						.transition()
						.duration(100)
						// Set the "stroke opacity" of the line based on whether the tag line is inside the zoomed view or not
						.attr("stroke-opacity", points_info[1] ? 1 : tag_lines_out_of_view_opacity)
						// Set the "opacity" of the line based on wheter the tag is in the "exclude" tags list or not
						.attr("opacity", tag_is_excluded ? 0 : 1);
				});
		}

		// update the scroll map vertical bar
		update_scroll_map(zoom_value, zoom_origin);

		// Update the tag names elements (i.e. show names of tags for tag lines when not too many tag lines are being shown)
		update_tag_name_elements(zoom_value, zoom_origin);

	}

	/**
	 * Set the "opacity" of the group "g" containing tag lines to the minimum value and sets the opacity of the tag lines representing the given tag names to the maximum value
	 *
	 * If the "tag_names" parameter is null, set all tag lines as active
	 */
	function set_tag_lines_as_highlighted(tag_names) {

		// console.log("setting tag " + tag_names + " as active")

		if (tag_names == null) {

			// Reset the opacity of the tag_lines group to 1
			tag_lines
				.attr("opacity", 1);
			// Remove all highlighted tag lines
			higlighted_tag_lines_container.selectAll(".tag-line")
				.remove();

		} else {

			if (tag_names.length == 0) {
				console.log("WARNING: trying to set tag lines as active/inactive but all tag lines should be set as inactive (an empty tag_names list was given to the set_tag_lines_as_active() function).\nNOTE: To instead reset all tag lines opacity to 1 (hence to not highlight any tag line), pass the tag_names list as 'null'.")
			}

			// Set the opacity of the tag_lines group to the inactive opacity, and then duplicate the tag lines with the given tag name and append them to the higlighted_tag_lines_container group
			higlighted_tag_lines_container.selectAll(".tag-line")
				// Set opacity of the tag lines group
				.remove();
			tag_lines
				// Create a clone of the (disbabled) tag lines which should be shown as the active tags (with names in "tag_names")
				.attr("opacity", tag_lines_inactive_opacity)
				.selectAll(".tag-line")
				.filter(function (d, i) {
					return tag_names.includes(d);
				})
				.each(function (d, i) {
					let element = d3.select(this);
					let tag_line_copy = element.clone(true);
					tag_line_copy
						.attr("stroke-opacity", 1)
						.attr("opacity", 1)
						.attr("stroke-width", tag_lines_width * 1.5)
						// .attr("stroke", offset_saturation_and_value(element.attr("stroke"), 0, 20))
						// Show the line as "dotted" if the line's "excluded" attribute is set to "true"
						.attr("stroke-dasharray", element.attr("excluded") == "true" ? "2, 1.5" : "none");
					higlighted_tag_lines_container.node().appendChild(tag_line_copy.node());
				});

		}

	}

	// Add a vertical "scroll map" for the tag parallel coordinate view (to show the current zoom position)
	let scroll_map_width = 2;
	let scroll_map_margin_right = 10;
	let scroll_map_track_color = offset_saturation_and_value(color_scheme["white"], 0, -40);
	let scroll_map_thumb_color = offset_saturation_and_value(color_scheme["white"], 0, -25);
	let scroll_map_thumb_hover_color = offset_saturation_and_value(color_scheme["white"], 0, -15);
	let scroll_map_container = parallel_coordinates_container.append("g")
		.attr("class", "scroll-map-container")
		.attr("transform", "translate(" + (actual_width - scroll_map_width - scroll_map_margin_right) + ",0)")
		.lower();
	// Append the scroll map
	let scroll_map_track = scroll_map_container.append("rect")
		.attr("class", "scroll-map-track")
		.attr("x", -scroll_map_width)
		.attr("y", 0)
		.attr("width", scroll_map_width)
		.attr("height", parallel_coordinates_height)
		.attr("fill", scroll_map_track_color);
	// Append the scroll map thumb
	let scroll_map_thumb = scroll_map_container.append("rect")
		.attr("class", "scroll-map-thumb")
		.attr("x", -scroll_map_width)
		.attr("y", 0)
		.attr("width", scroll_map_width)
		.attr("height", parallel_coordinates_height / 4)
		.attr("fill", scroll_map_thumb_color);
	let scroll_map_thub_hover_rect_width = scroll_map_width + 3;
	let scroll_map_thumb_hover_width = scroll_map_width + 1;
	let scroll_map_thumb_hover_rect = scroll_map_container.append("rect")
		.attr("class", "scroll-map-thumb-hover-rect")
		.attr("x", -scroll_map_width - (scroll_map_thub_hover_rect_width - scroll_map_width) / 2)
		.attr("y", 0)
		.attr("width", scroll_map_thub_hover_rect_width)
		.attr("height", parallel_coordinates_height)
		// .attr("stroke", "#ff0000")
		// .attr("stroke-width", 0.05)
		.attr("fill", "transparent");

	// On hover over the scrollmap thumb, make it lighter
	scroll_map_thumb_hover_rect.on("mouseover", function (event) {
		scroll_map_thumb
			.attr("fill", scroll_map_thumb_hover_color)
			.attr("x", -scroll_map_width - (scroll_map_thumb_hover_width - scroll_map_width) / 2)
			.attr("width", scroll_map_thumb_hover_width);
	});
	scroll_map_thumb_hover_rect.on("mouseleave", function (event) {
		// If not dragging, make the thumb darker
		if (!scroll_map_container.attr("dragging")) {
			scroll_map_thumb
				.attr("fill", scroll_map_thumb_color)
				.attr("x", -scroll_map_width)
				.attr("width", scroll_map_width);
		}
	});

	// On mouse move over the scroll_map_container, print the mouse position
	// scroll_map_track.on("mousemove", function (event) {
	// 	let mouse_position = d3.pointer(event);
	// 	let scroll_map_container_bounds = scroll_map_container.node().getBoundingClientRect();
	// 	let scroll_map_container_y = scroll_map_container_bounds.y;
	// 	let scroll_map_container_height = scroll_map_container_bounds.height;
	// 	console.log("mouse position Y: " + mouse_position[1] + ", scroll_map_container_y: " + scroll_map_container_y + ", scroll_map_container_height: " + scroll_map_container_height);
	// });

	// On drag of the scrollmap thumb, update the tag lines with the new zoom origin
	scroll_map_container.call(
		d3.drag()
			.on("start", function (event) {
				// If hovering over the thumb, start dragging
				if (event.sourceEvent.target.classList.contains("scroll-map-thumb-hover-rect")) {
					// Make scrollbar thumb lighter
					scroll_map_thumb
						.attr("fill", scroll_map_thumb_hover_color)
						.attr("x", -scroll_map_width - (scroll_map_thumb_hover_width - scroll_map_width) / 2)
						.attr("width", scroll_map_thumb_hover_width);
					// Add attribute "dragging" to the scroll map container
					scroll_map_container.attr("dragging", true);
					// Store the mouse offset position from the thumb in the "drag-offset" attribute of the scroll map container
					let mouse_position = event.y / parallel_coordinates_height;	// In [0,1]
					let scroll_map_thumb_position_top = (scroll_map_thumb.node().getBoundingClientRect().y - scroll_map_container.node().getBoundingClientRect().y) / scroll_map_container.node().getBoundingClientRect().height;
					let scroll_map_thumb_position = scroll_map_thumb_position_top + scroll_map_thumb.node().getBoundingClientRect().height / scroll_map_container.node().getBoundingClientRect().height / 2;
					let offset = mouse_position - scroll_map_thumb_position;
					scroll_map_container.attr("drag-offset", offset);
					// console.log("mouse_position: " + mouse_position + ", scroll_map_thumb_position: " + scroll_map_thumb_position + ", offset: " + offset);
				}
			})
			.on("drag", function (event) {
				// If dragging, update dragging position
				if (!scroll_map_container.attr("dragging")) return;

				let mouse_position = event.y / parallel_coordinates_height;		// In [0,1]
				// let mouse_delta = event.dy;

				let scroll_map_thumb_position_top = (scroll_map_thumb.node().getBoundingClientRect().y - scroll_map_container.node().getBoundingClientRect().y) / scroll_map_container.node().getBoundingClientRect().height;
				// Scroll map thumb position, which is NEVER in range [0,1] (since the thumb has a height that is not 0)
				let scroll_map_thumb_position = scroll_map_thumb_position_top + scroll_map_thumb.node().getBoundingClientRect().height / scroll_map_container.node().getBoundingClientRect().height / 2;
				let height_portion = scroll_map_container.node().getBoundingClientRect().height - scroll_map_thumb.node().getBoundingClientRect().height;
				let current_scroll_map_thumb_max_y = 1 - (scroll_map_container.node().getBoundingClientRect().height - height_portion) / (2 * scroll_map_container.node().getBoundingClientRect().height);
				let current_scroll_map_thumb_min_y = (scroll_map_container.node().getBoundingClientRect().height - height_portion) / (2 * scroll_map_container.node().getBoundingClientRect().height);
				// Get the actual currrent zoom_position, hence the scroll map thumb position in range [0,1]
				// let scroll_map_thumb_position_correct = reverse_interpolate_between_values(current_scroll_map_thumb_min_y, current_scroll_map_thumb_max_y, scroll_map_thumb_position);

				let start_offset = parseFloat(scroll_map_container.attr("drag-offset"));	// offset in [0,1]

				// let current_offset = mouse_position - scroll_map_thumb_position_correct;

				let new_scroll_bar_thumb_position = mouse_position - start_offset;	// NOT in [0,1]

				// Calculate the new zoom origin from the new scrollbar thumb position
				let new_zoom_origin = 1 - reverse_interpolate_between_values(current_scroll_map_thumb_min_y, current_scroll_map_thumb_max_y, new_scroll_bar_thumb_position, false);

				// console.log(
				// 	"new_scroll_bar_thumb_position: " +
				// 	new_scroll_bar_thumb_position + ", mouse_position: " +
				// 	mouse_position + ", start_offset: " + start_offset +
				// 	"\n" +
				// 	"new_zoom_origin: " + new_zoom_origin +
				// 	"\n" +
				// 	"current_scroll_map_thumb_min_y: " + current_scroll_map_thumb_min_y +
				// 	", current_scroll_map_thumb_max_y: " + current_scroll_map_thumb_max_y +
				// 	// ", scroll_map_thumb_position: " + scroll_map_thumb_position +
				// 	""
				// );

				// Update the tag lines
				let current_zoom_value = parseFloat(tag_lines.attr("zoom-value"));
				let current_zoom_origin = parseFloat(tag_lines.attr("zoom-origin"));
				// let new_zoom_origin = 1 - mouse_position;
				// let new_zoom_origin = current_zoom_origin - mouse_dy / parallel_coordinates_height;
				if (new_zoom_origin < 0 || new_zoom_origin > 1) {
					// Clamp values
					if (new_zoom_origin < 0) new_zoom_origin = 0;
					if (new_zoom_origin > 1) new_zoom_origin = 1;
					// Update the drag offset
					let clamped_scroll_bar_thumb_position = Math.max(current_scroll_map_thumb_min_y, Math.min(current_scroll_map_thumb_max_y, new_scroll_bar_thumb_position));
					let new_offset = mouse_position - clamped_scroll_bar_thumb_position;
					scroll_map_container.attr("drag-offset", new_offset);
				}
				tag_lines.attr("zoom-origin", new_zoom_origin);
				update_tag_lines(false, current_zoom_value, new_zoom_origin);
			})
			.on("end", function (event) {
				if (!scroll_map_container.attr("dragging")) return;
				// Make scrollbar thumb darker
				scroll_map_thumb
					.attr("fill", scroll_map_thumb_color)
					.attr("x", -scroll_map_width)
					.attr("width", scroll_map_width);
				// Remove attribute "dragging" from the scroll map container
				scroll_map_container.attr("dragging", null);
			})
	);

	/** Function to update the scroll map thumb position and height */
	function update_scroll_map(current_zoom, current_zoom_origin) {
		let scroll_map_thumb_height = parallel_coordinates_height / current_zoom;
		// let scroll_map_thumb_y = parallel_coordinates_height * (1 - current_zoom_origin) - scroll_map_thumb_height / 2;
		let scroll_map_thumb_y = (parallel_coordinates_height - scroll_map_thumb_height) * (1 - current_zoom_origin);
		scroll_map_container.select(".scroll-map-thumb")
			.attr("y", scroll_map_thumb_y)
			.attr("height", scroll_map_thumb_height);
		scroll_map_thumb_hover_rect
			.attr("y", scroll_map_thumb_y)
			.attr("height", scroll_map_thumb_height);
	}

	// For debug, on press of spacebar, reset tag attribute values with a zoom of 2 in origin 0
	// $(document).on("keydown", function (event) {
	// 	if (event.keyCode == 32) {
	// 		update_tag_lines(true, 2, 0.25);
	// 	}
	// });

	// Initialize the tag lines
	update_tag_lines();

	// Append tag attribute labels as a simple div element
	// let tag_attribute_labels = $(container_element_selector).append("<div class='tag-attribute-labels'></div>");
	// // Append the tag attribute labels
	// for (let i = 0; i < tag_attributes_to_consider.length; i++) {
	// 	tag_attribute_labels.append("<div class='tag-attribute-label'>" + tag_attributes_to_consider[i] + "</div>");
	// }

	// On "update" event, update the tag lines for the parallel voordinates view
	container_element[0].addEventListener("update", function (event) {
		// Reset zoom value
		tag_lines.attr("zoom-value", 1);
		tag_lines.attr("zoom-origin", 0.5);
		tag_lines.attr("absolute-pointed-position", 0.5);
		update_tag_lines();
	});

	// Add a horizontal line from the left to the right of the
	let horizontal_line_color = "#eeeeee";
	let parallel_coordinates_horizontal_line_container = parallel_coordinates_container.append("g")
		.attr("class", "tag-attribute-horizontal-line")
		.attr("transform", "translate(0," + parallel_coordinates_height + ")")
		.attr("opacity", 0)
		.attr("pointer-events", "none");
	parallel_coordinates_container.select(".tag-attribute-horizontal-line")
		.append("line")
		.attr("class", "tag-attribute-horizontal-line-actual-line")
		.attr("x1", padding_on_parallel_coordinates_container_sides)
		.attr("y1", 0)
		.attr("x2", actual_width - padding_on_parallel_coordinates_container_sides)
		.attr("y2", 0)
		.attr("stroke", horizontal_line_color)
		.attr("stroke-width", 0.5)
		// .attr("stroke-opacity", 0)
		// .attr("stroke-dasharray", "4 4")
		.attr("pointer-events", "none");
	// Add N empty text labels, on the right of the N attribute vertical lines, inside the horizontal line (one for each tag attribute)
	parallel_coordinates_container.select(".tag-attribute-horizontal-line")
		.selectAll(".tag-attribute-horizontal-line-text-label")
		.data(tag_attributes_to_consider)
		.enter()
		.append("text")
		.attr("class", "tag-attribute-horizontal-line-text-label tag-attribute-horizontal-line-text-label-index-" + tag_attributes_to_consider.indexOf(d3.select(this).datum()))
		.attr("x", function (d, i) { return get_tag_attribute_svg_x_position(d) + 2; })
		.attr("y", 0)
		.attr("dy", "-0.35em")
		.attr("text-anchor", "start")
		.attr("font-size", "0.375em")
		// .attr("fill", color_scheme["white"])
		.attr("fill", horizontal_line_color)
		// Add a shadow to the text
		// .attr("filter", "drop-shadow(0 0 0.5em #ff0000)")
		.attr("pointer-events", "none")
		.text("");

	// Append a rect to the parallel coordinates container to capture mouse events
	let parallel_coordinates_hover_rect = parallel_coordinates_container.append("rect")
		.classed("parallel-coordinates-container-mouse-capture-rect", true)
		.attr("x", padding_on_parallel_coordinates_container_sides)
		.attr("y", 0)
		.attr("width", actual_width - padding_on_parallel_coordinates_container_sides * 2)
		.attr("height", parallel_coordinates_height)
		.attr("fill", "none")
		.attr("pointer-events", "all");

	// On mouse move over "tag_attribute_vertical_lines", move the "tag-attribute-horizontal-line" to the y mouse position over the "tag_attribute_vertical_lines"
	parallel_coordinates_hover_rect.on("mousemove", function (event) {
		let mouse_position = d3.pointer(event);
		// Update parallel coordinates horizontal line position
		parallel_coordinates_container.select(".tag-attribute-horizontal-line")
			.attr("transform", "translate(0," + mouse_position[1] + ")");
		// .attr("y1", mouse_position[1])
		// .attr("y2", mouse_position[1]);
		// Update parallel coordinates horizontal line text
		parallel_coordinates_container.select(".tag-attribute-horizontal-line")
			.selectAll(".tag-attribute-horizontal-line-text-label")
			.text(function (d, i) {
				let tag_attribute = d3.select(this).datum();
				let max_tag_attribute_value = STATE["tag_global_infos"]["max_" + tag_attribute];
				// Consider y axis from a min to a max value of the attribute for all tags
				let min_y_axis_value = 0;
				let max_y_axis_value = max_tag_attribute_value;
				// Recalculate min and max y axis value based on zoom
				let zoomed_y_axis_range = max_y_axis_value - min_y_axis_value;
				let zoom_scale_factor = 1 / parseFloat(tag_lines.attr("zoom-value"));
				let zoomed_min_y_axis_value = min_y_axis_value + zoomed_y_axis_range * (1 - zoom_scale_factor) * parseFloat(tag_lines.attr("zoom-origin"));
				let zoomed_max_y_axis_value = max_y_axis_value - zoomed_y_axis_range * (1 - zoom_scale_factor) * (1 - parseFloat(tag_lines.attr("zoom-origin")));
				// Calculate the y coordinate of the tag attribute
				let attribute_value = (parallel_coordinates_height - mouse_position[1]) / parallel_coordinates_height;
				let tag_attribute_value = zoomed_min_y_axis_value + (zoomed_max_y_axis_value - zoomed_min_y_axis_value) * attribute_value;
				return format_number_string(tag_attribute_value, 2);
			});

		// console.log(mouse_position);
	});
	parallel_coordinates_hover_rect.on("mouseover", function (event) {
		parallel_coordinates_container.select(".tag-attribute-horizontal-line")
			.attr("opacity", 1);
	});
	parallel_coordinates_hover_rect.on("mouseleave", function (event) {
		parallel_coordinates_container.select(".tag-attribute-horizontal-line")
			.attr("opacity", 0);
	});

	// On scroll onto the parallel_coordinates_hover_rect, zoom in the "tag-lines" group with an origin position at the same y as the mouse position (keep x scale the same)
	parallel_coordinates_hover_rect.on("wheel", function (event) {

		event.preventDefault();
		event.stopPropagation();

		// Scale the tag_lines vertically (and leave the horizontal scale the same), with a scale center at the mouse position
		let mouse_position = d3.pointer(event);

		let zoom_multiplier = 2;
		let max_scale = 200;
		let min_scale = 1;
		// Get current zoom value and origin
		let previous_zoom_value = parseFloat(tag_lines.attr("zoom-value"));
		let previous_zoom_origin = parseFloat(tag_lines.attr("zoom-origin"));
		let previous_pointed_position = parseFloat(tag_lines.attr("absolute-pointed-position"));

		let zooming_in = event.deltaY < 0;

		if ((previous_zoom_value == max_scale && zooming_in) || (previous_zoom_value == min_scale && !zooming_in)) {
			// If the current zoom value is already at the max or min value and we are trying to zoom in/out, do nothing
			return;
		}

		zoom_multiplier *= previous_zoom_value * (zooming_in ? 0.1 : 0.25);

		// Calculate the scale factor
		let zoom_delta = event.deltaY * zoom_multiplier * 0.001;
		let new_zoom_value = previous_zoom_value - zoom_delta;	// In range [min_scale, max_scale]
		// Limit the scale factor
		if (new_zoom_value > max_scale) new_zoom_value = max_scale;
		if (new_zoom_value < min_scale) new_zoom_value = min_scale;
		// Calculate the scale center
		let new_pointed_position = 1 - mouse_position[1] / parallel_coordinates_height;		// In [0,1]

		// [current_zoom_origin - 0.5 / current_zoom_value, current_zoom_origin + 0.5 / current_zoom_value]

		let new_pointed_position_top = previous_zoom_origin - 0.5 / new_zoom_value;
		let new_pointed_position_bottom = previous_zoom_origin + 0.5 / new_zoom_value;

		let new_pointed_position_on_zoomed_scale = interpolate_between_values(new_pointed_position_top, new_pointed_position_bottom, new_pointed_position);

		let new_pos_weight = 1 / previous_zoom_value;

		let new_zoom_origin = previous_zoom_origin + (new_pointed_position_on_zoomed_scale - previous_zoom_origin) * (new_pos_weight * new_pos_weight);


		if (previous_zoom_value == 1) {
			new_zoom_origin = new_pointed_position;
		}

		// Clamp the scale center to the top and bottom of the parallel coordinates
		if (new_zoom_origin < 0) new_zoom_origin = 0;
		if (new_zoom_origin > 1) new_zoom_origin = 1;
		// console.log(
		// 	"current_zoom_origin: " + previous_zoom_origin + " | " +
		// 	"current_zoom_value: " + previous_zoom_value + " | " +
		// 	"\n" +
		// 	"new_zoom_origin: " + new_zoom_origin + " | " +
		// 	"new_zoom_value: " + new_zoom_value + " | " +
		// 	"\n" +
		// 	"scale_center_absolute: " + new_pointed_position + " | " +
		// 	""
		// );

		if (isNaN(new_zoom_origin)) {
			console.log("ERROR | zoom_origin_to_use: " + new_zoom_origin + ", scale_center_absolute: " + new_pointed_position + ", current_zoom_value: " + previous_zoom_value + ", current_zoom_origin: " + previous_zoom_origin + ", mouse_position[1]: " + mouse_position[1] + ", parallel_coordinates_height: " + parallel_coordinates_height + ", scale_center: " + new_zoom_origin + ", scale_factor: " + new_zoom_value);
		}

		// Set new zoom attributes
		tag_lines
			.attr("zoom-value", new_zoom_value)
			.attr("zoom-origin", new_zoom_origin)
			.attr("absolute-pointed-position", new_pointed_position);

		// Update the tag lines (with no animation)
		update_tag_lines(false, new_zoom_value, new_zoom_origin);

	});

	// On mouse drag onto the parallel_coordinates_hover_rect, move the "tag-lines" group by a delta proportional to the mouse drag delta
	parallel_coordinates_hover_rect.call(
		d3.drag()
			.on("start", function (event) {
				// console.log("START");
				// Hide the horizontal line container
				parallel_coordinates_container.select(".tag-attribute-horizontal-line")
					.attr("opacity", 0);
				// Make the pointer a grabbing hand
				event.sourceEvent.target.style.cursor = "grabbing";
			})
			.on("drag", function (event) {
				// Dispatch the mouse move event on the parallel coordinates hover rect (to update the horizontal line position)
				// console.log("DRAG");
				// console.log(event);
				// Get the delta x and y of the mouse drag
				// let delta_x = event.dx;
				let delta_y = -1 * event.dy;
				// Get the current zoom value and origin
				let current_zoom_value = parseFloat(tag_lines.attr("zoom-value"));
				let current_zoom_origin = parseFloat(tag_lines.attr("zoom-origin"));
				// Calculate the new zoom origin
				let new_zoom_origin = current_zoom_origin - (delta_y / parallel_coordinates_height) / current_zoom_value;
				// Clamp the zoom origin to the top and bottom of the parallel coordinates
				if (new_zoom_origin < 0) new_zoom_origin = 0;
				if (new_zoom_origin > 1) new_zoom_origin = 1;
				// Set the new zoom origin
				tag_lines.attr("zoom-origin", new_zoom_origin);
				// Update the tag lines
				update_tag_lines(false, current_zoom_value, new_zoom_origin);
			})
			.on("end", function (event) {
				// console.log("END");
				// console.log(event);
				parallel_coordinates_container.select(".tag-attribute-horizontal-line")
					.transition()
					.duration(150)
					.attr("opacity", 1);
				// Revert back the pointer to a simple cursor
				event.sourceEvent.target.style.cursor = "default";
			})
	);

	// Add functions for the section reset button
	$("#filter-tags-section .buttons-container #section-reset-button").on("click", function (event) {
		// Reset zoom value
		tag_lines.attr("zoom-value", 1);
		tag_lines.attr("zoom-origin", 0.5);
		tag_lines.attr("absolute-pointed-position", 0.5);
		// update_tag_lines();
		// Set all tags to be neutral
		set_all_tags_state_except([], 0, true, true);
	});
	// Add tooltip or the section reset and section info buttons
	$("#filter-tags-section .buttons-container #section-reset-button")
		.on("mouseover", function (event) {
			let button = $(this);
			let tooltip_texts = [
				"Reset filters on tags",
				TOOLTIP_LINE_SEPARATOR,
				"Click to reset all the included/excluded tags and to also reset the zoom and scroll level of the parallel coordinates."
			];
			set_tooltip(button, "Reset", tooltip_texts, [-1, 1]);
		})
		.on("mouseleave", function (event) {
			hide_tooltip();
		});
	$("#filter-tags-section .buttons-container #section-info-button")
		.on("mouseover", function (event) {
			let button = $(this);
			let tooltip_texts = [
				"Include in results only games that have ALL the tags marked as 'Include'.",
				"Exclude from results games that have ANY of the tags marked as 'Exclude'.",
				TOOLTIP_LINE_SEPARATOR,
				"Scroll on the parallel coordinates to zoom in/out the y axis.",
				"Drag on the parallel coordinates to move the y axis up/down.",
				TOOLTIP_LINE_SEPARATOR,
				"Click on a tab underneath the parallel coordinates to change tags ranking criteria.",
				"Click on a tag in the ranking to change its status (include/exclude)."
			];
			let tooltip_title = "Tags Parallel Coordinates and Rankings";
			set_tooltip(button, tooltip_title, tooltip_texts, [-1, 1]);
		})
		.on("mouseleave", function (event) {
			hide_tooltip();
		});

	// Add tags ranking container
	let tags_ranking_container = $("#filter-tags-ranking");
	// $(tags_ranking_container).append("<div></div>")
	// Add a container for the header controls
	let tags_ranking_header_container = $(document.createElement("div"))
		.attr("class", "tags-ranking-header-container");
	$(tags_ranking_container).append(tags_ranking_header_container);
	// Add the tags ranking outer container div (which will contain a container div that will scroll)
	let tags_list_outer_container = $(document.createElement("div"))
		.attr("class", "tags-ranking-outer-container");
	// Add 2 gradient divs on top and bottom of the tags ranking div
	let tags_list_gradient_top = $(document.createElement("div"))
		.attr("class", "tags-ranking-gradient tags-ranking-gradient-top")
		.css("--gradient-color", label_box_background_color);
	let tags_list_gradient_bottom = $(document.createElement("div"))
		.attr("class", "tags-ranking-gradient tags-ranking-gradient-bottom")
		.css("--gradient-color", label_box_background_color);
	$(tags_list_outer_container).append(tags_list_gradient_top);
	$(tags_list_outer_container).append(tags_list_gradient_bottom);
	// Add the actual tags container (the group that will scroll)
	let tags_list_container = $(document.createElement("div"))
		.attr("class", "tags-ranking-container")
		.css("position", "relative");
	$(tags_list_outer_container).append(tags_list_container);
	$(tags_ranking_container).append(tags_list_outer_container);

	// Add the header buttons in the tags_ranking_header_container
	let tags_ranking_header_controls_container = $(document.createElement("div"))
		.attr("class", "tags-ranking-header-controls-container");
	let header_include_all_buttons_container = $(document.createElement("div"))
		.attr("class", "header-tag-controls-div-container");
	let actual_header_include_buttons_container = $(document.createElement("div"))
		.attr("class", "tag-controls-div");
	$(tags_ranking_header_controls_container).append(header_include_all_buttons_container);
	$(header_include_all_buttons_container).append(actual_header_include_buttons_container);
	$(tags_ranking_header_container).append(tags_ranking_header_controls_container);
	// Add the "include all" and "exclude all" buttons
	tags_ranking_header_button_include_all = $(document.createElement("div"))
		.attr("class", "tags-ranking-header-button tags-ranking-header-button-include-all tag-control tag-control-include");
	tags_ranking_header_button_exclude_all = $(document.createElement("div"))
		.attr("class", "tags-ranking-header-button tags-ranking-header-button-exclude-all tag-control tag-control-exclude");
	$(actual_header_include_buttons_container).append(tags_ranking_header_button_include_all);
	$(actual_header_include_buttons_container).append(tags_ranking_header_button_exclude_all);
	// Add a search box in the tags_ranking_header_container
	let tags_ranking_header_search_box_container = $(document.createElement("div"))
		.attr("class", "tags-ranking-header-search-box-container");
	let tags_ranking_header_search_box = $(document.createElement("input"))
		.attr("class", "tags-ranking-header-search-box")
		.attr("placeholder", "Search tags...")
		.attr("type", "text")
		.attr("autocomplete", "off")
		.attr("spellcheck", "false");
	$(tags_ranking_header_search_box_container).append(tags_ranking_header_search_box);
	$(tags_ranking_header_controls_container).append(tags_ranking_header_search_box_container);
	// Add 3 buttons corresponding to "Genres", "Sub-Genres" and "Features"
	let tags_ranking_header_tags_category_buttons_container = $(document.createElement("div"))
		.attr("class", "tags-ranking-header-tags-category-buttons-container");
	let tags_ranking_header_tags_category_button_genres = $(document.createElement("div"))
		.attr("class", "tags-ranking-header-tags-category-button tags-ranking-header-tags-category-button-genres")
		.text("Genres")
		// .css("background-color", offset_saturation_and_value(color_scheme["tag_colors"][0], -1, -5));
		.css("background-color", offset_saturation_and_value(color_scheme["tag_colors"][0], -1 + tag_category_color_max_saturation_offset, -5 + tag_category_color_min_value_offset))
		.css("border-color", offset_saturation_and_value(color_scheme["tag_colors"][0], -1 + tag_category_color_min_saturation_offset, -5 + tag_category_color_max_value_offset));
	let tags_ranking_header_tags_category_button_subgenres = $(document.createElement("div"))
		.attr("class", "tags-ranking-header-tags-category-button tags-ranking-header-tags-category-button-subgenres")
		.text("Sub-Genres")
		// .css("background-color", offset_saturation_and_value(color_scheme["tag_colors"][1], -1, -5);
		.css("background-color", offset_saturation_and_value(color_scheme["tag_colors"][1], -1 + tag_category_color_max_saturation_offset, -5 + tag_category_color_min_value_offset))
		.css("border-color", offset_saturation_and_value(color_scheme["tag_colors"][1], -1 + tag_category_color_min_saturation_offset, -5 + tag_category_color_max_value_offset));
	let tags_ranking_header_tags_category_button_features = $(document.createElement("div"))
		.attr("class", "tags-ranking-header-tags-category-button tags-ranking-header-tags-category-button-features")
		.text("Features")
		// .css("background-color", offset_saturation_and_value(color_scheme["tag_colors"][2], -1, -5);
		.css("background-color", offset_saturation_and_value(color_scheme["tag_colors"][2], -1 + tag_category_color_max_saturation_offset, -5 + tag_category_color_min_value_offset))
		.css("border-color", offset_saturation_and_value(color_scheme["tag_colors"][2], -1 + tag_category_color_min_saturation_offset, -5 + tag_category_color_max_value_offset));
	$(tags_ranking_header_tags_category_buttons_container).append(tags_ranking_header_tags_category_button_genres);
	$(tags_ranking_header_tags_category_buttons_container).append(tags_ranking_header_tags_category_button_subgenres);
	$(tags_ranking_header_tags_category_buttons_container).append(tags_ranking_header_tags_category_button_features);
	$(tags_ranking_header_controls_container).append(tags_ranking_header_tags_category_buttons_container);
	// On hover over any of the buttons, show the tooltip with the corresponding text
	function set_tags_categories_include_or_exclude_all_buttons_tooltip(button_element) {
		let button = button_element;
		let this_button_category_name = button.text().trim();
		let button_category_name_singular = this_button_category_name.slice(0, -1);
		let category_index = -1;
		if (this_button_category_name == "Genres") category_index = 0;
		if (this_button_category_name == "Sub-Genres") category_index = 1;
		if (this_button_category_name == "Features") category_index = 2;
		// let other_buttons_category_names = ["Genres", "Sub-Genres", "Features"];
		// other_buttons_category_names.splice(category_index, 1);
		let button_color_name = "";
		if (button.hasClass("tags-ranking-header-tags-category-button-genres")) button_color_name = "red";
		if (button.hasClass("tags-ranking-header-tags-category-button-subgenres")) button_color_name = "green";
		if (button.hasClass("tags-ranking-header-tags-category-button-features")) button_color_name = "blue";
		let tooltip_texts = [
			"Left click to include all '" + this_button_category_name + "' tags.",
			"Right click to exclude all '" + this_button_category_name + "' tags.",
			TOOLTIP_LINE_SEPARATOR,
			"Tags can be 'Genres', 'Sub-Genres' or 'Features'.",
			"Tags shown in " + button_color_name + " are '" + button_category_name_singular + "' tags.",
			"NOTE: tag lines for '" + button_category_name_singular + "' tags in the parallel coordinates view are colored in " + button_color_name + " with slight variations in saturation and lightness to allow for an easier lines distinction."
		];
		let number_of_tags_for_category = TAGS_BY_CATEGORY[this_button_category_name].length;
		let title_element =
			`<div style="display: inline-flex; align-items: center; justify-content: space-between; width: 100%;">` +
			`	<div>${this_button_category_name}</div>` +
			`	<div style="font-weight: normal; font-size: 0.875em;">${number_of_tags_for_category} tags</div>` +
			`</div>`;
		set_tooltip(button, title_element, tooltip_texts, [0, 1]);
	}
	$(".tags-ranking-header-tags-category-button")
		.on("mouseover", function (event) {
			let button = $(this);
			set_tags_categories_include_or_exclude_all_buttons_tooltip(button);
		})
		.on("mouseleave", function (event) {
			hide_tooltip();
		});
	// On click on each of the buttons, include all tags of the corresponding category and exclude all other tags
	$(".tags-ranking-header-tags-category-button")
		.on("click", function (event) {
			let button = $(this);
			let button_category_name = button.text();
			// Get the indexes of the tags to include and exclude
			let first_index_of_include_category = -1;
			let last_index_of_include_category = -1;
			let all_tags_length = TAGS_BY_CATEGORY["Genres"].length + TAGS_BY_CATEGORY["Sub-Genres"].length + TAGS_BY_CATEGORY["Features"].length;
			if (button_category_name == "Genres") {
				first_index_of_include_category = TAGS_BY_CATEGORY["Features"].length + TAGS_BY_CATEGORY["Sub-Genres"].length;
				last_index_of_include_category = TAGS_BY_CATEGORY["Features"].length + TAGS_BY_CATEGORY["Sub-Genres"].length + TAGS_BY_CATEGORY["Genres"].length - 1;
			} else if (button_category_name == "Sub-Genres") {
				first_index_of_include_category = TAGS_BY_CATEGORY["Features"].length;
				last_index_of_include_category = TAGS_BY_CATEGORY["Features"].length + TAGS_BY_CATEGORY["Sub-Genres"].length - 1;
			} else if (button_category_name == "Features") {
				first_index_of_include_category = 0;
				last_index_of_include_category = TAGS_BY_CATEGORY["Features"].length - 1;
			}
			// Manually set tags state
			for (let i = 0; i < all_tags_length; i++) {
				let include = i >= first_index_of_include_category && i <= last_index_of_include_category;
				if (get_tag_category_by_index(i) == button_category_name) {
					set_tag_ranking_div_state(i, (include ? 1 : -1), true, false);
				}
			}
			// Manually update app visualizations
			update_filters_based_on_visualization_states();
			// Also update appearance of the include all and exclude all buttons
			set_include_all_header_buttons_appearance();
			// Reset the tooltip
			set_tags_categories_include_or_exclude_all_buttons_tooltip(button);
		})
		.on("contextmenu", function (event) {
			event.preventDefault();
			let button = $(this);
			let button_category_name = button.text();
			// Get the indexes of the tags to include and exclude
			let first_index_of_exclude_category = -1;
			let last_index_of_exclude_category = -1;
			let all_tags_length = TAGS_BY_CATEGORY["Genres"].length + TAGS_BY_CATEGORY["Sub-Genres"].length + TAGS_BY_CATEGORY["Features"].length;
			if (button_category_name == "Genres") {
				first_index_of_exclude_category = TAGS_BY_CATEGORY["Features"].length + TAGS_BY_CATEGORY["Sub-Genres"].length;
				last_index_of_exclude_category = TAGS_BY_CATEGORY["Features"].length + TAGS_BY_CATEGORY["Sub-Genres"].length + TAGS_BY_CATEGORY["Genres"].length - 1;
			} else if (button_category_name == "Sub-Genres") {
				first_index_of_exclude_category = TAGS_BY_CATEGORY["Features"].length;
				last_index_of_exclude_category = TAGS_BY_CATEGORY["Features"].length + TAGS_BY_CATEGORY["Sub-Genres"].length - 1;
			} else if (button_category_name == "Features") {
				first_index_of_exclude_category = 0;
				last_index_of_exclude_category = TAGS_BY_CATEGORY["Features"].length - 1;
			}
			// Manually set tags state
			for (let i = 0; i < all_tags_length; i++) {
				let exclude = i >= first_index_of_exclude_category && i <= last_index_of_exclude_category;
				if (get_tag_category_by_index(i) == button_category_name) {
					set_tag_ranking_div_state(i, (exclude ? -1 : 1), true, false);
				}
			}
			// Manually update app visualizations
			update_filters_based_on_visualization_states();
			// Also update appearance of the include all and exclude all buttons
			set_include_all_header_buttons_appearance();
			// Reset the tooltip
			set_tags_categories_include_or_exclude_all_buttons_tooltip(button);
		});
	// Add the "group by" buttons
	let tags_ranking_header_button_group_by_container = $(document.createElement("div"))
		.attr("class", "tags-ranking-header-button tags-ranking-header-button-group-by-container");
	let tags_ranking_header_button_group_by_select = $(document.createElement("div"))
		.attr("class", "tags-ranking-header-button custom-select tags-ranking-header-button-group-by-select")
		.css("width", "100%");
	// .attr("width", "5em");
	$(tags_ranking_header_button_group_by_container).append(tags_ranking_header_button_group_by_select);
	$(tags_ranking_header_controls_container).append(tags_ranking_header_button_group_by_container);
	let tags_ranking_header_button_group_by_select_button = $(document.createElement("select"));
	let tags_ranking_header_button_group_by_select_button_option_none = $(document.createElement("option"))
		.attr("value", "none")
		.html("Group by: <b>None</b>");
	let tags_ranking_header_button_group_by_select_button_option_category = $(document.createElement("option"))
		.attr("value", "filters")
		.html("Group by: <b>Included</b>");
	let tags_ranking_header_button_group_by_select_button_option_type = $(document.createElement("option"))
		.attr("value", "category")
		.html("Group by: <b>Category</b>");
	$(tags_ranking_header_button_group_by_select_button).append(tags_ranking_header_button_group_by_select_button_option_none);
	$(tags_ranking_header_button_group_by_select_button).append(tags_ranking_header_button_group_by_select_button_option_category);
	$(tags_ranking_header_button_group_by_select_button).append(tags_ranking_header_button_group_by_select_button_option_type);
	$(tags_ranking_header_button_group_by_select).append(tags_ranking_header_button_group_by_select_button);
	// On hover over the tags_ranking_header_button_group_by_select, show a tooltip
	$(tags_ranking_header_button_group_by_select)
		.on("mouseover", function (event) {
			let button = $(this);
			let tooltip_text_option_margin = "0.25em";
			let tooltip_texts = [
				"Choose how to group tags in the tags ranking.",
				TOOLTIP_LINE_SEPARATOR,
				"Click to select one of the following grouping options:",
				"<div style='display: inline-flex;'><div>&bull;</div><div style='margin-left: " + tooltip_text_option_margin + ";'><b>None</b>: Tags are ranked based on the current sorting criteria, without any grouping.</div></div>",
				"<div style='display: inline-flex;'><div>&bull;</div><div style='margin-left: " + tooltip_text_option_margin + ";'><b>Included</b>: Group tags by their include/exclude state.</div></div>",
				"<div style='display: inline-flex;'><div>&bull;</div><div style='margin-left: " + tooltip_text_option_margin + ";'><b>Category</b>: Group tags by their category.</div></div>"
			];
			set_tooltip(button, "Group tags", tooltip_texts, [-1, 1]);
		})
		.on("mouseleave", function (event) {
			hide_tooltip();
		});
	// On select of a group by option, update the STATE variable and also update the tags ranking visualization
	$(tags_ranking_header_button_group_by_select_button).on("change", function (event) {
		// Get the selected value
		let selected_value = $(this).attr("value");
		// console.log("selected_value: " + selected_value);
		// Update the STATE variable
		STATE["tags_ranking"]["current_grouping_criteria"] = selected_value;
		// Update the tags ranking visualization
		update_tags_rankings_visualization();
	});
	// On click on the search box, hide the tooltip
	$(tags_ranking_header_search_box).on("click", function (event) {
		hide_tooltip();
	});
	// Function to highlight a tag element in the tags ranking (scroll to the element and set its opacity to 1 and the opacity of all other tags to 0.375)
	function highlight_tag_elements_in_tags_ranking(tags_to_highlight_names) {
		// Get the tag div
		let divs_to_highlight = [];
		for (let i = 0; i < tag_names.length; i++) {
			// let tag_div = tags_list_container.find(".single-tag-container[tag-index='" + get_tag_index_by_name(tag_names) + "']");
			let tag_div = tags_ranking_div_elements[i];
			// Set the scroll top position of the tags list to the tag div position (if there is only one tag to highlight)
			if (tags_to_highlight_names.length == 1 && tag_names[i] == tags_to_highlight_names[0]) {
				let tag_div_scroll_top = tag_div.css("top");
				let tag_div_height = tag_div.css("height");
				tag_div_scroll_top = parseFloat(tag_div_scroll_top.substring(0, tag_div_scroll_top.length - 2));
				tag_div_height = parseFloat(tag_div_height.substring(0, tag_div_height.length - 2));
				let padding = 9.5 * tag_div_height;
				let final_scroll_top_position = tag_div_scroll_top - padding;
				// Clamp the scroll top position to the top and bottom of the tags list
				let tags_list_container_height = tags_list_container.height();
				let tags_list_container_scroll_height = tags_list_container.prop("scrollHeight");
				if (final_scroll_top_position < 0) final_scroll_top_position = 0;
				if (final_scroll_top_position > tags_list_container_scroll_height - tags_list_container_height) final_scroll_top_position = tags_list_container_scroll_height - tags_list_container_height;
				// Set the scroll top position
				$(tags_list_container).scrollTop(tag_div_scroll_top - padding);
			}
			// Set all tags opacity to single-tag-container opacity to 0 except the tag div
			// tags_list_container.find(".single-tag-container").css("opacity", 0.375);
			// $(tag_div).css("opacity", 1);
			let should_highlight = tags_to_highlight_names.includes(tag_names[i]);
			divs_to_highlight[i.toString()] = {
				"div": tag_div,
				"highlight": should_highlight
			};
			// if (tags_to_highlight_names.includes(tag_names[i])) {
			// 	$(tag_div).css("opacity", 1);
			// } else {
			// 	$(tag_div).css("opacity", 0.375);
			// }
		}
		// Highlight or unhighlight the tag divs
		let total_divs = Object.keys(divs_to_highlight).length;
		for (let i = 0; i < total_divs; i++) {
			let div_key = i.toString();
			let tag_div = divs_to_highlight[div_key]["div"];
			let should_highlight = divs_to_highlight[div_key]["highlight"];
			if (should_highlight) {
				$(tag_div).css("opacity", 1);
			} else {
				$(tag_div).css("opacity", 0.375);
			}
		}
	}
	// Function to reset the opacity of all tag divs in the tags ranking (and scroll back to the top)
	function reset_highlight_on_tag_elements_in_tags_ranking(reset_scroll = true) {
		// Scroll to the top
		if (reset_scroll) $(tags_list_container).scrollTop(0);
		tags_list_container.find(".single-tag-container").css("opacity", 1);
	}
	// On type onto the search box, set the scroll top position of the tags list to the first tag matching the search
	$(tags_ranking_header_search_box).on("input", function (event) {

		// Get the currently active sorting criteria from STATE
		let current_sorting_criteria = STATE["tags_ranking"]["current_sorting_criteria"];
		// Get reference to sorted list
		let sorted_tags_list = STATE["tags_ranking"]["tag_lists"][current_sorting_criteria];

		let search_text = $(this).val().toLowerCase();
		// console.log(search_text);
		// Get the first tag that matches the search text
		let first_tag_name_matching_search = null;
		for (let i = 0; i < sorted_tags_list.length; i++) {
			let tag_name = sorted_tags_list[i]["name"];
			function get_text_to_compare(text) {
				return text.toLowerCase().replaceAll("-", "").replaceAll(" ", "").replaceAll("'", "").replaceAll("(", "").replaceAll(")", "");
			}
			let tag_name_to_compare = get_text_to_compare(tag_name);
			let search_text_to_compare = get_text_to_compare(search_text);
			if (tag_name_to_compare.includes(search_text_to_compare)) {
				first_tag_name_matching_search = tag_name;
				// console.log("first_tag_matching_search: " + first_tag_matching_search);
				break;
			}
		}
		// console.log(first_tag_matching_search);
		if (first_tag_name_matching_search != null && search_text.length > 1) {
			highlight_tag_elements_in_tags_ranking([first_tag_name_matching_search]);
		} else {
			reset_highlight_on_tag_elements_in_tags_ranking();
		}

		// Remove the tooltip (just in case)
		hide_tooltip();
	});
	// On out of focus, reset tag divs opacity
	$(tags_ranking_header_search_box).on("blur", function (event) {
		// Reset tags opacity
		tags_list_container.find(".single-tag-container").css("opacity", 1);
		// Empty the search box
		$(this).val("");
	});
	// On hover over the tags search input, show a tooltip
	$(tags_ranking_header_search_box_container).on("mouseover", function (event) {
		let button = $(this);
		let tooltip_texts = [
			"Search for tags in the ranking."
		];
		set_tooltip(button, "Search tags", tooltip_texts, [0, 0]);
	});
	$(tags_ranking_header_search_box_container).on("mouseleave", function (event) {
		hide_tooltip();
	});

	// Create a div for the brushing on tags ranking
	let tags_ranking_brush_div = $(document.createElement("div"))
		.attr("class", "tags-ranking-brush-div")
		.css("width", "91%")
		.css("position", "absolute")
		.css("top", 0)
		.css("left", "7.75%")
		.css("background-color", "rgba(255, 255, 255, 0.25)")
		.css("border", "0.05em solid rgba(255, 255, 255, 0.5)")
		.css("pointer-events", "none")
		.css("display", "none")
		.css("border-radius", "0.25em")
		.css("z-index", 500);
	$(tags_list_container).append(tags_ranking_brush_div);
	let tags_ranking_brush_number_of_selections_div = $(document.createElement("div"))
		.attr("class", "tags-ranking-brush-number-of-selections-div")
		.css("position", "absolute")
		.css("top", 0)
		.css("left", "calc(7.75% + (91% * 0.5))")
		.css("width", "91%")
		.css("text-align", "center")
		.css("pointer-events", "none")
		.css("display", "none")
		.css("transform", "translate(-50%, 0)")
		.css("color", "white")
		.css("font-size", "0.75em")
		.css("opacity", 0.5)
		.css("z-index", 501);
	$(tags_list_container).append(tags_ranking_brush_number_of_selections_div);
	/**
	 * Function to update the position and size of the brush div
	 * 
	 * Set "force_brush_div_text" to a string to force the text for the brush div to be that string instead of the calculated number of selections (which shows up when "force_brush_div_text" is undefined)
	 * 
	 * Set "force_brush_div_text" to "" (empty string) to completely hide the text for the brush div
	 */
	function update_tags_ranking_brush_div(start_tag_div, current_tag_div, force_brush_div_text = undefined) {
		let dragging_start_tag_div = $(start_tag_div);
		let dragging_end_tag_div = $(current_tag_div);
		// Get the top positions of the 2 divs (not the absolute top position, but the top position relative to the tags list container)
		let start_top = parseFloat(dragging_start_tag_div.css("top").substring(0, dragging_start_tag_div.css("top").length - 2));
		let end_top = parseFloat(dragging_end_tag_div.css("top").substring(0, dragging_end_tag_div.css("top").length - 2));
		let tag_div_height = parseFloat(dragging_end_tag_div.css("height").substring(0, dragging_end_tag_div.css("height").length - 2));
		let height = Math.abs(start_top - end_top) + tag_div_height;
		// console.log("start_top: " + start_top + " | end_top: " + end_top);
		// Swap the 2 top positions if the end top is smaller than the start top
		let show_text_below = true;
		if (end_top < start_top) {
			// Brushing from bottom to top
			let temp = start_top;
			start_top = end_top;
			end_top = temp;
			show_text_below = false;
		}
		let brush_div_y_offset = -0.375;
		let brush_div_y_offset_top = brush_div_y_offset;
		if (start_top < 0.05) brush_div_y_offset_top = 0;
		let brush_div_y_offset_bottom = brush_div_y_offset;
		// Update the brush div position and height
		tags_ranking_brush_div.css("top", (start_top + brush_div_y_offset_top) + "px");
		tags_ranking_brush_div.css("height", (height + brush_div_y_offset_bottom) + "px");
		// Show the brush div
		if (tags_ranking_brush_div.css("display") == "none") tags_ranking_brush_div.css("display", "block");
		// Update the number of selections div
		if (force_brush_div_text != "") {
			if (force_brush_div_text != undefined) {
				$(tags_ranking_brush_number_of_selections_div).html(force_brush_div_text);
			} else {
				let number_of_selections = Math.round(height / tag_div_height);
				$(tags_ranking_brush_number_of_selections_div).html(number_of_selections + " selected");
			}
			let top_position_string = 0;
			if (show_text_below) {
				top_position_string = "calc(" + (start_top + height - tag_div_height) + "px" + ")";
			} else {
				top_position_string = "calc(" + (start_top) + "px)";
			}
			tags_ranking_brush_number_of_selections_div.css("top", top_position_string);
			// Show the number of selections div
			if (tags_ranking_brush_number_of_selections_div.css("display") == "none") tags_ranking_brush_number_of_selections_div.css("display", "block");
		} else {
			// Hide the number of selections div
			if (tags_ranking_brush_number_of_selections_div.css("display") == "block") tags_ranking_brush_number_of_selections_div.css("display", "none");
		}
		// Scroll to show the tag if the currently selected tag (current_tag_div) is 10% or less from the top or bottom of the tags list container
		let margin = 0.075;
		let tags_list_container_height = tags_list_container.height();	// Height of the tags list container
		let tags_list_container_scroll_top = tags_list_container.scrollTop();	// Scroll top position of the tags list container
		let tags_list_container_scroll_height = tags_list_container.prop("scrollHeight");	// Scroll height of the tags list container
		let tags_list_container_scroll_bottom = tags_list_container_scroll_top + tags_list_container_height;	// Scroll bottom position of the tags list container
		let current_tag_div_top = parseFloat(current_tag_div.css("top").substring(0, current_tag_div.css("top").length - 2));	// Top position of the currently selected tag div
		let current_tag_div_bottom = current_tag_div_top + tag_div_height;	// Bottom position of the currently selected tag div
		// console.log("tags_list_container_scroll_top: " + tags_list_container_scroll_top + " | tags_list_container_scroll_bottom: " + tags_list_container_scroll_bottom + " | current_tag_div_top: " + current_tag_div_top + " | current_tag_div_bottom: " + current_tag_div_bottom);
		if (current_tag_div_top < tags_list_container_scroll_top + tags_list_container_height * margin) {
			// Scroll up
			tags_list_container.scrollTop(current_tag_div_top - tags_list_container_height * margin);
		} else if (current_tag_div_bottom > tags_list_container_scroll_bottom - tags_list_container_height * margin) {
			// Scroll down
			tags_list_container.scrollTop(current_tag_div_bottom - tags_list_container_height * (1 - margin));
		}

	}
	function hide_tags_ranking_brush_div() {
		tags_ranking_brush_div.css("display", "none");
		tags_ranking_brush_number_of_selections_div.css("display", "none");
	}

	// Add one div for each tag
	function create_tag_div(tag_name, tag_index) {
		// let tag_index = get_tag_index_by_name(tag_name);
		let tag_div = $(document.createElement("div"))
			// Set the id of the tag div to the tag name
			.attr("class", "single-tag-container")
			// .attr("position", "absolute")
			// .attr("height", tag_divs_height_percentage + "%")
			// .attr("top", (tag_index * tag_divs_height_percentage) + "%")
			// .attr("left", 0)
			// Set css variable "--top-index"
			// .css("--top-index", tag_index)
			// .css("--width-percentage", 100)
			.attr("tag-index", tag_index);
		$(tags_list_container).append(tag_div);
		// Container for the controls on the tag (include/exclude tags)
		let tag_controls_div = $(document.createElement("div"))
			.attr("class", "tag-controls-div");
		$(tag_div).append(tag_controls_div);
		// Container for the tag bar (with name, fill div, ecc...)
		let tag_bar_div = $(document.createElement("div"))
			.attr("class", "tag-bar-div");
		$(tag_div).append(tag_bar_div);
		// Add a text label
		let tag_text_label = $(document.createElement("div"))
			.attr("class", "tag-text-label");
		// .css("color", color_scheme["viewport_cells"])
		// .css("color", "#ffffff")
		// .text(tag_name);
		// Inside the tag text label, add one div for the number in the ranking, one for the tag name, and one for the tag rank criteria attribute value
		let tag_text_label_left = $(document.createElement("div"))
			.attr("class", "tag-text-label-left");
		let tag_text_label_right = $(document.createElement("div"))
			.attr("class", "tag-text-label-right");
		$(tag_text_label).append(tag_text_label_left);
		$(tag_text_label).append(tag_text_label_right);
		let tag_text_label_rank_number = $(document.createElement("div"))
			.attr("class", "tag-text-label-rank-number")
			.text(tag_index + 1);
		let tag_text_label_tag_name = $(document.createElement("div"))
			.attr("class", "tag-text-label-tag-name")
			.text(tag_name);
		let text_label_number_of_games = $(document.createElement("div"))
			.attr("class", "text-label-number-of-games")
			.text("0");
		$(tag_text_label_left).append(tag_text_label_rank_number);
		$(tag_text_label_left).append(tag_text_label_tag_name);
		$(tag_text_label_left).append(text_label_number_of_games);
		let tag_text_label_rank_criteria_attribute_value = $(document.createElement("div"))
			.attr("class", "tag-text-label-rank-criteria-attribute-value")
			.text("0");
		$(tag_text_label_right).append(tag_text_label_rank_criteria_attribute_value);
		// Add the divs to the tags_list_container
		$(tag_bar_div).append(tag_text_label);
		// Add a "fill" div to show the color
		let tag_fill_div = $(document.createElement("div"))
			.attr("class", "fill-div");
		// .css("width", "100%");
		$(tag_bar_div).append(tag_fill_div);
		// Add an actual fill div
		let tag_fill_div_internal = $(document.createElement("div"))
			.attr("class", "fill-div-internal");
		$(tag_fill_div).append(tag_fill_div_internal);

		// Set the tag color
		let tag_category = STATE["all_tags_filter_infos"][tag_name]["category"];
		let tag_categories = ["Genres", "Sub-Genres", "Features"];
		let category_index = tag_categories.indexOf(tag_category);
		let tag_color = color_scheme["tag_colors"][category_index];
		// Set the tag internal div color
		$(tag_fill_div_internal).css("background-color", tag_color);

		// Add controls to the tag controls div
		let tag_control_include = $(document.createElement("div"))
			.attr("class", "tag-control tag-control-include")
			// .attr("tag-name", tag_name)
			.attr("tag-index", tag_index)
			.attr("active", false);
		let tag_control_exclude = $(document.createElement("div"))
			.attr("class", "tag-control tag-control-exclude")
			// .attr("tag-name", tag_name)
			.attr("tag-index", tag_index)
			.attr("active", false);
		$(tag_controls_div).append(tag_control_include);
		$(tag_controls_div).append(tag_control_exclude);
		// Add tooltips for include and exclude buttons on hover
		$(tag_control_include)
			.on("mouseover", function (event) {
				let button = $(this);
				let tag_name = tag_names[parseInt(button.attr("tag-index"))];
				let active = button.attr("active") == "true";
				let tooltip_title = "Include tag '" + tag_name + "'";
				let tooltip_texts = [
					"Left click to " + (active ? "reset " : "include ") + "the '" + tag_name + "' tag.",
					"Right click to include tag '" + tag_name + "' and exclude all other tags.",
					TOOLTIP_LINE_SEPARATOR,
					"Only games that have the tag '" + tag_name + "' AND ALL the other included tags will be included in the filters results.",
				];
				let optimal_tooltip_position = calculate_tooltip_optimal_translate_position(button);
				set_tooltip(button, tooltip_title, tooltip_texts, [0, optimal_tooltip_position[1]]);
			})
			.on("mouseleave", function (event) {
				hide_tooltip();
			});
		$(tag_control_exclude)
			.on("mouseover", function (event) {
				let button = $(this);
				let tag_name = tag_names[parseInt(button.attr("tag-index"))];
				let active = button.attr("active") == "true";
				let tooltip_title = "Exclude tag '" + tag_name + "'";
				let tooltip_texts = [
					"Left click to " + (active ? "reset " : "exclude ") + "the '" + tag_name + "' tag.",
					"Right click to exclude tag '" + tag_name + "' and reset all other tags.",
					TOOLTIP_LINE_SEPARATOR,
					"Only games that don't have the tag '" + tag_name + "' and have NONE of the other excluded tags will be included in the filters results.",
				];
				let optimal_tooltip_position = calculate_tooltip_optimal_translate_position(button);
				set_tooltip(button, tooltip_title, tooltip_texts, [0, optimal_tooltip_position[1]]);
			})
			.on("mouseleave", function (event) {
				hide_tooltip();
			});

		function click_on_tag_control(tag_control_box_element) {
			// Change the "active" attribute
			let tag_index = parseInt(tag_control_box_element.attr("tag-index"));
			// let tag_name = tag_names[tag_index];
			// True if the button (either include or exclude, see later) is active now, false if it is not
			let tag_control_box_was_active = tag_control_box_element.attr("active") == "true";
			// True if the button is an include button, false if it is an exclude button
			let is_include_button = tag_control_box_element.hasClass("tag-control-include");
			// If the button was active, set it to not active
			if (tag_control_box_was_active) {
				set_tag_ranking_div_state(tag_index, 0, true, true);
			} else {
				// If the button is not active now, set it to true and the other button to false if needed
				set_tag_ranking_div_state(tag_index, is_include_button ? 1 : -1, true, true);
			}
		}

		// On click onto .tag-control, change the status of the tag (include/exclude)
		$(tag_control_include).on("click", function (event) {
			let tag_control_box_element = $(this);
			click_on_tag_control(tag_control_box_element);
		});
		$(tag_control_exclude).on("click", function (event) {
			let tag_control_box_element = $(this);
			click_on_tag_control(tag_control_box_element);
		});
		// On left click onto the .tag-control buttons, set to include/exclude all tags except the clicked one
		$(tag_control_include).on("contextmenu", function (event) {
			event.preventDefault();
			// Set the clicked tag to be included and the remaining ones to be excluded
			set_tag_ranking_div_state(tag_index, 1, true, false);
			// Manually update the state of the tag
			set_all_tags_state_except([tag_index], -1, true, true);
		});
		$(tag_control_exclude).on("contextmenu", function (event) {
			event.preventDefault();
			// Set the clicked tag to be excluded and the remaining ones to be included
			set_tag_ranking_div_state(tag_index, -1, true, false);
			set_all_tags_state_except([tag_index], 0, true, true);
		});

		// On hover over a tag div, highlight the corresponding tag line in the parallel coordinates (use the stored index)
		$(tag_bar_div).on("mouseover", function (event) {
			// Set this tag line as visible, hide or attenuate all the others
			set_tag_lines_as_highlighted([tag_name]);
			// Set the chord diagram corresponding arcs to visible, the other ones to hidden
			// set_chord_diagram_arcs_as_visible([tag_index]);
			let is_dragging = STATE["tags_ranking"]["dragging"] == true;
			let is_setting_threshold = STATE["tags_ranking"]["setting_threshold"] == true;
			// Show a tooltip with the attribute values for this tag
			if (!is_dragging && !is_setting_threshold) {
				let tooltip_texts = [];
				// Get the background color (computed style) of the ".fill-div-internal" element (in format "rgb(255, 255, 255)")
				let rgb_components = $(tag_fill_div_internal).css("background-color").replace("rgb(", "").replace(")", "").split(", ");
				let fill_div_color = rgbToHex(parseInt(rgb_components[0]), parseInt(rgb_components[1]), parseInt(rgb_components[2]));
				// let fill_div_color = $(tag_fill_div_internal).css("background-color");
				let category_label_color = offset_saturation_and_value(fill_div_color, 12, 6);
				let tag_ranking_index = parseInt($(tag_text_label_rank_number).text());
				let tag_attributes = [
					"number_of_games",
					"total_revenue",
					"average_revenue",
					"total_copies_sold",
					"average_copies_sold",
					"average_review_rating",
					"average_price"
				];
				for (let i = 0; i < tag_attributes.length; i++) {
					let tag_attribute = tag_attributes[i];
					let tag_attribute_name = tag_attribute.replaceAll("_", " ").charAt(0).toUpperCase() + tag_attribute.replaceAll("_", " ").slice(1);
					let tag_attribute_value = STATE["all_tags_filter_infos"][tag_name][tag_attribute];
					let tag_attribute_value_string = get_tag_attribute_value_string(tag_attribute_name, tag_attribute_value);
					let space_string = "&nbsp;".repeat(13);
					tooltip_texts.push("<div style='display: flex; justify-content: space-between; min-width: 100%'><div>" + tag_attribute_name + ":" + space_string + "</div><div>" + tag_attribute_value_string + "</div></div>");
				}
				// Pass the "fill-div" as the element to which to attach the tooltip or the "tag-text-label", depending on who is wider
				let tag_fill_div_width = $(tag_fill_div).width();
				// let tag_text_label_width = $(tag_text_label_tag_name).width() + $(tag_text_label_rank_number).width();
				let tag_text_label_width = $(tag_text_label_rank_number).width() + $(tag_text_label_tag_name).width() + $(text_label_number_of_games).width();
				// let tooltip_target_element = tag_fill_div_width > tag_text_label_width ? tag_fill_div : tag_text_label_tag_name;
				let tooltip_target_element = tag_fill_div_width > tag_text_label_width ? tag_fill_div : text_label_number_of_games;
				let tooltip_optimal_translate_position = calculate_tooltip_optimal_translate_position(tooltip_target_element);
				let optimal_tooltip_y_position = tooltip_optimal_translate_position[1];
				// Force tooltip to either be at the top or at the bottom, never at center (since it could hide the parallel coordinates view's lines or labels)
				if (optimal_tooltip_y_position >= 0) optimal_tooltip_y_position = 1;
				let title_element =
					`<div
					style='
						font-weight: bold;
						display: inline-flex;
						justify-content: space-between;
						min-width: 100%;
						align-items: center;'
					>
					<div style='padding-right: 1em'>
						<span>${tag_name}&nbsp;&nbsp;</span><span style='color: #ffffff90'>#${tag_ranking_index}<span style='font-size: 0.65em; font-weight: normal;'>&nbsp;/&nbsp;${TOTAL_NUMBER_OF_TAGS}</span></span>
					</div>
					<div
						style='
							font-size: 0.75em;
							background-color: ${category_label_color};
							border-radius: 0.25em;
							padding: 0.1em 0.375em;
							filter: drop-shadow(0 0 0.35em #00000015);
						'>
						${STATE["all_tags_filter_infos"][tag_name]["category"]}
					</div>
				</div>`;
				// Add a "notice" text to indicate that tag attributes values are shown for games meeting filter criterias except tag filters
				tooltip_texts.push(TOOLTIP_LINE_SEPARATOR);
				tooltip_texts.push(
					"NOTE: The values for the tag attributes above " + "<br/>"
					+ "are calculated considering games that meet " + "<br/>"
					+ "all the filter criterias while ignoring any active " + "<br/>"
					+ "filter on tags (included/excluded tags filters)."
				);
				// Set the tooltip for the tag div
				set_tooltip(tooltip_target_element, title_element, tooltip_texts, [0, optimal_tooltip_y_position]);
				// Reset any highlight of tags in the tags ranking list (without resetting the scroll position)
				reset_highlight_on_tag_elements_in_tags_ranking(false);
			}
		});
		// On mouse leave from the tag div, reset the highlighted tag lines in the parallel coordinates view and hide the tooltip
		$(tag_bar_div).on("mouseleave", function (event) {
			// Reset all lines
			set_tag_lines_as_highlighted(null);
			// Reset all chord diagram arcs
			// set_chord_diagram_arcs_as_visible();
			// Hide the tooltip
			hide_tooltip();
		});
		// Add event listeners for drag of tags
		$(tag_bar_div)
			// On mouse down onto a tag div, initiate an event that will allow user to select all tags between the clicked tag and the tag over which the mouse is released
			.on("mousedown", function (event) {
				if (event.which == 1) {
					// If left click, start the dragging
					// Get the tag index and name
					let tag_index = parseInt(tag_div.attr("tag-index"));
					let tag_name = tag_names[tag_index];
					// Set the "dragging" attribute to true
					STATE["tags_ranking"]["dragging"] = true;
					// Set the "dragging_start_list_index" attribute to the value of the tag
					let current_tag_ranking_index = tags_ranking_objects[tag_name]["ranking_index_for_grouping"];
					STATE["tags_ranking"]["dragging_start_tag_div"] = tag_div;
					STATE["tags_ranking"]["dragging_start_ranking_index"] = current_tag_ranking_index;
					// Update the position and size of the brush div
					update_tags_ranking_brush_div(STATE["tags_ranking"]["dragging_start_tag_div"], $(tag_div));
				} else if (event.which == 3) {
					// If right click, initiate the "select all above" or "select all below" behavior
					STATE["tags_ranking"]["setting_threshold"] = true;
					STATE["tags_ranking"]["threshold_tag_div"] = tag_div;
					// update tags ranking brush div
					update_tags_ranking_brush_div($(tag_div), $(tag_div), "");
				}
			})
			.on("mouseenter", function (event) {
				// update the position and size of the brush div
				let is_dragging = STATE["tags_ranking"]["dragging"];
				let is_setting_threshold = STATE["tags_ranking"]["setting_threshold"];
				if (is_dragging) {
					update_tags_ranking_brush_div(STATE["tags_ranking"]["dragging_start_tag_div"], $(tag_div));
				} else if (is_setting_threshold) {
					// Make any tag that is above or below the threshold (based on the currently hovered tag) to be included or excluded
					let threshold_tag_div = STATE["tags_ranking"]["threshold_tag_div"];
					let current_tag_div = tag_div;
					let threshold_tag_index = parseInt(threshold_tag_div.attr("tag-index"));
					let threshold_ranking_index = tags_ranking_objects[tag_names[threshold_tag_index]]["ranking_index_for_grouping"];
					let swiped_up = current_tag_div.offset().top < threshold_tag_div.offset().top;
					// Highlight all tags above the threshold tag div
					let tags_to_highlight = [];
					for (let i = 0; i < tag_names.length; i++) {
						let current_tag_ranking_index = tags_ranking_objects[tag_names[i]]["ranking_index_for_grouping"];
						let include = false;
						if (swiped_up) include = current_tag_ranking_index <= threshold_ranking_index;
						else include = current_tag_ranking_index >= threshold_ranking_index;
						if (include) tags_to_highlight.push(tag_names[i]);
					}
					highlight_tag_elements_in_tags_ranking(tags_to_highlight);
				}
			})
			// On mouse up, reset the "dragging" attribute to false
			.on("mouseup", function (event) {
				let was_dragging = STATE["tags_ranking"]["dragging"];
				let was_setting_threshold = STATE["tags_ranking"]["setting_threshold"];
				if (was_dragging) {
					// Get the tag index and name
					let tag_index = parseInt(tag_div.attr("tag-index"));
					let tag_name = tag_names[tag_index];
					// Get the starting and ending values of brush
					let start_ranking_index = STATE["tags_ranking"]["dragging_start_ranking_index"];
					let end_ranking_index = tags_ranking_objects[tag_name]["ranking_index_for_grouping"];
					// console.log("Filtering by " + attribute_to_consider + " between " + start_ranking_index + " and " + end_value);
					// Set the "dragging" attribute and other atributes to false in the STATE
					STATE["tags_ranking"]["dragging"] = false;
					STATE["tags_ranking"]["dragging_start_ranking_index"] = null;
					STATE["tags_ranking"]["dragging_start_tag_div"] = null;
					// Swap the values if the start value is greater than the end value
					if (start_ranking_index < end_ranking_index) {
						let temp = start_ranking_index;
						start_ranking_index = end_ranking_index;
						end_ranking_index = temp;
					}
					// Manually update the state of tags (without updating the visualizations, which are updated after the cycle)
					for (let i = 0; i < tag_names.length; i++) {
						let current_tag_ranking_index = tags_ranking_objects[tag_names[i]]["ranking_index_for_grouping"];
						let include = current_tag_ranking_index <= start_ranking_index && current_tag_ranking_index >= end_ranking_index;
						set_tag_ranking_div_state(i, (include ? 1 : -1), true, false);
					}
					// Manually update app visualizations
					update_filters_based_on_visualization_states();
					// Also update appearance of the include all and exclude all buttons
					set_include_all_header_buttons_appearance();
					// Hide the brush div
					hide_tags_ranking_brush_div();
					// Reset any highlight of tags in the tags ranking list (without resetting the scroll position)
					reset_highlight_on_tag_elements_in_tags_ranking(false);
				} else if (was_setting_threshold) {
					// Reset the "setting_threshold" attribute to false
					STATE["tags_ranking"]["setting_threshold"] = false;
					// Check if the current tag div is above or below the threshold tag div
					let threshold_tag_div = STATE["tags_ranking"]["threshold_tag_div"];
					// Get the current tag div
					let current_tag_div = tag_div;
					// Get the threshold tag div
					let threshold_tag_index = parseInt(threshold_tag_div.attr("tag-index"));
					let threshold_ranking_index = tags_ranking_objects[tag_names[threshold_tag_index]]["ranking_index_for_grouping"];
					let swiped_up = current_tag_div.offset().top < threshold_tag_div.offset().top;
					// Set all tag divs above the threshold tag div to include and all below to exclude
					for (let i = 0; i < tag_names.length; i++) {
						let current_tag_ranking_index = tags_ranking_objects[tag_names[i]]["ranking_index_for_grouping"];
						let include = false;
						if (swiped_up) include = current_tag_ranking_index <= threshold_ranking_index;
						else include = current_tag_ranking_index >= threshold_ranking_index;
						set_tag_ranking_div_state(i, (include ? 1 : -1), true, false);
					}
					// Manually update app visualizations
					update_filters_based_on_visualization_states();
					// Also update appearance of the include all and exclude all buttons
					set_include_all_header_buttons_appearance();
					// Hide the brush div
					hide_tags_ranking_brush_div();
					// Reset any highlight of tags in the tags ranking list (without resetting the scroll position)
					reset_highlight_on_tag_elements_in_tags_ranking(false);
				}
			})
			.on("contextmenu", function (event) {
				// Prevent the context menu from showing up
				event.preventDefault();
			});
		return tag_div;
	}
	for (let i = 0; i < tag_names.length; i++) {
		let new_div = create_tag_div(tag_names[i], i);
		// Update the list of tag divs and the tag objects
		tags_ranking_div_elements.push(new_div);
		tags_ranking_objects[tag_names[i]] = {
			"tag_index": i,
			"ranking_index": -1,
			"ranking_index_for_grouping": -1
		};
	}
	// If mouse leaves the tags list container while dragging, reset the "dragging" attribute to false
	$(tags_list_container).on("mouseleave", function (event) {
		let was_dragging = STATE["tags_ranking"]["dragging"];
		if (was_dragging) {
			// Set the "dragging" attribute to false
			STATE["tags_ranking"]["dragging"] = false;
			// Reset the "dragging_start_ranking_index" attribute to null
			STATE["tags_ranking"]["dragging_start_ranking_index"] = null;
			STATE["tags_ranking"]["dragging_start_tag_div"] = null;
			// Set the setting_threshold attribute to false
			STATE["tags_ranking"]["setting_threshold"] = false;
			// Hide the brush div
			hide_tags_ranking_brush_div();
		}
	});

	// Add tooltips for include all and exclude all buttons on hover
	function set_include_all_header_button_tooltip(button_element) {
		let button = button_element;
		let tooltip_texts = [
			"Left click to include all tags in the filters.",
			"Right click to reset all currently included tags.",
			TOOLTIP_LINE_SEPARATOR,
			"Only games that have ALL the included tags will be included in the filters results."
		];
		set_tooltip(button, "Include all tags", tooltip_texts);
	}
	$(tags_ranking_header_button_include_all)
		.on("mouseover", function (event) {
			let button = $(this);
			set_include_all_header_button_tooltip(button);
		})
		.on("mouseleave", function (event) {
			hide_tooltip();
		});
	function set_exclude_all_header_button_tooltip(button_element) {
		let button = button_element;
		let right_click_string = "";
		let excluded_tags_size = STATE["tags_ranking"]["tags_to_exclude"].size;
		if (excluded_tags_size == 0) {
			// If there are no excluded tags, right click should exclude all tags except the included tags
			right_click_string = "Right click to exclude all tags except the included ones.";
		} else {
			// If there are excluded tags, right click should reset all excluded tags
			right_click_string = "Right click to reset all excluded tags.";
		}
		let tooltip_texts = [
			"Left click to exclude all tags from the filters.",
			right_click_string,
			"NOTE: right clicking onto the exclude all tags button will always leave included tags intact, but will either exclude all tags except the included ones if no tags are currently excluded, or will reset all excluded tags if at least one tag is currently excluded.",
			TOOLTIP_LINE_SEPARATOR,
			"Only games that have NONE of the excluded tags will be included in the filters results."
		];
		set_tooltip(button, "Exclude all tags", tooltip_texts);
	}
	$(tags_ranking_header_button_exclude_all)
		.on("mouseover", function (event) {
			let button = $(this);
			set_exclude_all_header_button_tooltip(button);
		})
		.on("mouseleave", function (event) {
			hide_tooltip();
		});

	/**
	 * Pass a tag index and an include state in [-1, 0, 1]
	 *
	 * If "include" is -1, set the tag to "exclude"
	 *
	 * If "include" is 0, set the tag to "neutral" (neither include nor exclude)
	 *
	 * If "include" is 1, set the tag to "include"
	 *
	 * If "update_state" is true, update the STATE variable WITHOUT updating the visualizations
	 *
	 * If "update_visualizations" is true, update the visualizations too (NOTE: only update visualization if the "update_state" is also true)
	 */
	function set_all_tags_state_except(tag_indexes_to_exclude, include = 0, update_state = false, update_visualizations = false) {
		// if (update_state) {
		// 	if (include == -1 || include == 0) STATE["tags_ranking"]["tags_to_exclude"] = new Set();
		// 	if (include == 1 || include == 0) STATE["tags_ranking"]["tags_to_include"] = new Set();
		// }
		for (let i = 0; i < tag_names.length; i++) {
			if (tag_indexes_to_exclude.includes(i)) continue;
			set_tag_ranking_div_state(i, include, update_state, false);
			// set_tag_state(i, include, false);
			// if (update_state) {
			// 	if (include == -1) {
			// 		// Exclude tag
			// 		STATE["tags_ranking"]["tags_to_exclude"].add(tag_names[i]);
			// 		STATE["tags_ranking"]["tags_to_include"].delete(tag_names[i]);
			// 	} else if (include == 1) {
			// 		// Include tag
			// 		STATE["tags_ranking"]["tags_to_exclude"].delete(tag_names[i]);
			// 		STATE["tags_ranking"]["tags_to_include"].add(tag_names[i]);
			// 	}
			// }
		}
		// Update app state
		if (update_state && update_visualizations) {
			update_filters_based_on_visualization_states();
			// Also update appearance of the include all and exclude all buttons
			set_include_all_header_buttons_appearance();
		}
	}

	// On click onto the "include all" button, set all tags to "include"
	$(tags_ranking_header_button_include_all).on("click", function (event) {
		// Check if we are already including all tags
		if (STATE["tags_ranking"]["tags_to_include"].size == tag_names.length) {
			// If we are, set all tags to "neutral"
			set_all_tags_state_except([], 0, true, true);
		} else {
			// Set all tags to "include"
			set_all_tags_state_except([], 1, true, true);
		}
		// Reset the tooltip
		set_include_all_header_button_tooltip($(this));
	});
	// On click onto the "exclude all" button, set all tags to "exclude"
	$(tags_ranking_header_button_exclude_all).on("click", function (event) {
		// Check if we are already excluding all tags
		if (STATE["tags_ranking"]["tags_to_exclude"].size == tag_names.length) {
			// If we are, set all tags to "neutral"
			set_all_tags_state_except([], 0, true, true);
		} else {
			// Set all tags to "exclude"
			set_all_tags_state_except([], -1, true, true);
		}
		// Reset the tooltip
		set_exclude_all_header_button_tooltip($(this));
	});
	// On left click on the "include all" button, set all currently included tags to "neutral"
	$(tags_ranking_header_button_include_all).on("contextmenu", function (event) {
		event.preventDefault();
		// Get list of indexes of currently excluded tags
		let tags_to_exclude_indexes = [];
		for (let i = 0; i < tag_names.length; i++) {
			if (STATE["tags_ranking"]["tags_to_exclude"].has(tag_names[i])) tags_to_exclude_indexes.push(i);
		}
		// Set all tags to "neutral"
		set_all_tags_state_except(tags_to_exclude_indexes, 0, true, true);
		// Reset the tooltip
		set_include_all_header_button_tooltip($(this));
	});
	// On left click on the "exclude all" button, set all currently excluded tags to "neutral" or exclude all non included tags if no tags are currently excluded
	$(tags_ranking_header_button_exclude_all).on("contextmenu", function (event) {
		event.preventDefault();
		let excluded_tags_size = STATE["tags_ranking"]["tags_to_exclude"].size;
		if (excluded_tags_size == 0) {
			// If there are no excluded tags, right click should exclude all tags except the included tags
			// Get list of indexes of currently included tags
			let tags_to_include_indexes = [];
			for (let i = 0; i < tag_names.length; i++) {
				if (STATE["tags_ranking"]["tags_to_include"].has(tag_names[i])) tags_to_include_indexes.push(i);
			}
			// Set all tags to "neutral"
			set_all_tags_state_except(tags_to_include_indexes, -1, true, true);
		} else {
			// If there are excluded tags, right click should reset all excluded tags
			// Get list of indexes of currently included tags
			let tags_to_include_indexes = [];
			for (let i = 0; i < tag_names.length; i++) {
				if (STATE["tags_ranking"]["tags_to_include"].has(tag_names[i])) tags_to_include_indexes.push(i);
			}
			// Set all tags to "neutral"
			set_all_tags_state_except(tags_to_include_indexes, 0, true, true);
		}
		// Reset the tooltip
		set_exclude_all_header_button_tooltip($(this));
	});

	// On scroll onto the tags_list_container, check if the scroll position is all to the top or all to the bottom, and if it is, add class "hide" to the corresponding gradient div
	$(tags_list_container).on("scroll", function (event) {
		let scroll_position = $(this).scrollTop();
		let scroll_height = $(this).prop("scrollHeight");
		let container_height = $(this).height();
		let scroll_position_absolute = scroll_position / (scroll_height - container_height);	// 0 at the top, 1 at the bottom
		// console.log("scroll_position: " + scroll_position + ", scroll_height: " + scroll_height + ", container_height: " + container_height + "\n" + "scroll_position_absolute: " + scroll_position_absolute);
		// console.log("scroll_position: " + scroll_position + ", scroll_height: " + scroll_height + ", container_height: " + container_height);
		// let scroll_delta_to_hide_gradient_top = 5 / container_height;
		// let scroll_delta_to_hide_gradient_bottom = 250 / container_height;
		if (scroll_position_absolute <= 0.001) {
			// if (scroll_position_absolute <= scroll_delta_to_hide_gradient_top) {
			$(tags_list_gradient_top).addClass("hide");
		} else {
			$(tags_list_gradient_top).removeClass("hide");
		}
		if (scroll_position_absolute >= 1 - 0.001) {
			// if (scroll_position >= scroll_height - container_height - scroll_delta_to_hide_gradient_bottom) {
			$(tags_list_gradient_bottom).addClass("hide");
		} else {
			$(tags_list_gradient_bottom).removeClass("hide");
		}
		// Hide the tooltip
		hide_tooltip();
	});
	// Dispatch the scroll event to hide the top gradient
	$(tags_list_container).trigger("scroll");

	// On event "highlight_tag_element_in_tags_ranking", highlight the corresponding tag element in the tags ranking (scroll to the element and set its opacity to 1 and the opacity of all other tags to 0.375)
	// On event "reset_highlight_on_tag_elements_in_tags_ranking", reset the opacity of all tag divs in the tags ranking (and scroll back to the top)
	container_element
		.on("highlight_tag_element_in_tags_ranking", function (event, tag_name) {
			highlight_tag_elements_in_tags_ranking([tag_name]);
		})
		.on("reset_highlight_on_tag_elements_in_tags_ranking", function (event) {
			reset_highlight_on_tag_elements_in_tags_ranking();
		});

	// Add a gradient div on top of the tags list container
	update_tags_rankings_visualization();

}

/**
 * Function used to highlight a tag element in the tags ranking (scroll to the element and set its opacity to 1 and the opacity of all other tags to 0.375)
 */
function highlight_single_tag_element_in_tags_ranking_by_name(tag_name) {
	$("#filter-tags-parallel-coordinates").trigger("highlight_tag_element_in_tags_ranking", [tag_name]);
}

/**
 * Pass a tag index and an include state in [-1, 0, 1]
 *
 * If "include" is -1, set the tag to "exclude"
 *
 * If "include" is 0, set the tag to "neutral" (neither include nor exclude)
 *
 * If "include" is 1, set the tag to "include"
 *
 * If "update_state" is true, update the STATE variable WITHOUT updating the visualizations
 *
 * If "update_visualizations" is true, update the visualizations too (NOTE: only update visualization if the "update_state" is also true)
 */
function set_tag_ranking_div_state(tag_index, include = 0, update_state = true, update_visualizations = false) {
	// let tag_control_box_element_include = $(".tag-control-include[tag-index='" + tag_index + "']");
	// let tag_control_box_element_exclude = $(".tag-control-exclude[tag-index='" + tag_index + "']");
	let tag_container_div = $(tags_ranking_div_elements[tag_index]);
	let tag_control_box_element_include = tag_container_div.find(".tag-control-include");
	let tag_control_box_element_exclude = tag_container_div.find(".tag-control-exclude");
	let current_state = 0;
	if (tag_control_box_element_include.attr("active") == "true") current_state = 1;
	if (tag_control_box_element_exclude.attr("active") == "true") current_state = -1;
	// Do not update the state if its already the same
	if (current_state == include) return;
	// Update the tag control box elements
	if (include == -1) {
		// Exclude tag
		tag_control_box_element_include.attr("active", false);
		tag_control_box_element_exclude.attr("active", true);
	} else if (include == 0) {
		// Neutral tag
		tag_control_box_element_include.attr("active", false);
		tag_control_box_element_exclude.attr("active", false);
	} else if (include == 1) {
		// Include tag
		tag_control_box_element_include.attr("active", true);
		tag_control_box_element_exclude.attr("active", false);
	}
	// Update STATE
	if (update_state) {
		if (include == -1) {
			// Exclude tag
			STATE["tags_ranking"]["tags_to_exclude"].add(TAG_NAMES_LIST[tag_index]);
			STATE["tags_ranking"]["tags_to_include"].delete(TAG_NAMES_LIST[tag_index]);
		} else if (include == 0) {
			// Neutral tag
			STATE["tags_ranking"]["tags_to_exclude"].delete(TAG_NAMES_LIST[tag_index]);
			STATE["tags_ranking"]["tags_to_include"].delete(TAG_NAMES_LIST[tag_index]);
		} else if (include == 1) {
			// Include tag
			STATE["tags_ranking"]["tags_to_exclude"].delete(TAG_NAMES_LIST[tag_index]);
			STATE["tags_ranking"]["tags_to_include"].add(TAG_NAMES_LIST[tag_index]);
		}
	}
	// Update app visualizations
	if (update_state && update_visualizations) {
		update_filters_based_on_visualization_states();
		// Also update appearance of the include all and exclude all buttons
		set_include_all_header_buttons_appearance();
	}
}
/** Sets the appearance of the tags ranking "include all" and "exclude all" buttons */
function set_include_all_header_buttons_appearance() {
	// If we are including all tags, set the "all-active" attribute to true for the include all button, and to false for the exclude all button
	if (STATE["tags_ranking"]["tags_to_include"].size == TAG_NAMES_LIST.length) {
		$(tags_ranking_header_button_include_all).attr("all-active", true);
		$(tags_ranking_header_button_exclude_all).attr("all-active", false);
	} else if (STATE["tags_ranking"]["tags_to_exclude"].size == TAG_NAMES_LIST.length) {
		$(tags_ranking_header_button_include_all).attr("all-active", false);
		$(tags_ranking_header_button_exclude_all).attr("all-active", true);
	} else {
		$(tags_ranking_header_button_include_all).attr("all-active", false);
		$(tags_ranking_header_button_exclude_all).attr("all-active", false);
	}
}


/**
 * Function to get the tag attribute value string given the tag_attrbute name and the tag attribute value
 *
 * The tag_attribute_name is used to determin wether getting a string for a price, or a revenue, ecc...
 */
function get_tag_attribute_value_string(tag_attribute_name, tag_attribute_value) {
	// Get the tag attribute value string
	let tag_attribute_value_string = format_number_string(tag_attribute_value, 2);
	// Modify the string if the attribute name contains price or revenue
	if (tag_attribute_name.toLowerCase().includes("price") || tag_attribute_name.toLowerCase().includes("revenue")) {
		// Add "$" if the attribute name contains price or revenue
		tag_attribute_value_string = "$" + tag_attribute_value_string;
		// If the attribute name does NOT have 2 decimals, add ".00" or "0"
		if (!tag_attribute_value_string.includes(".")) {
			tag_attribute_value_string += ".00";
		} else if (tag_attribute_value_string.split(".")[1].length == 1) {
			tag_attribute_value_string += "0";
		}
	} else if (tag_attribute_name.toLowerCase().includes("rating")) {
		// Add "%" if the attribute name contains rating
		tag_attribute_value_string = format_number_string(tag_attribute_value * 100, 2) + "%";
	} else if (tag_attribute_name.toLowerCase().includes("copies")) {
		tag_attribute_value_string = format_number_string(Math.round(tag_attribute_value), 2);
	}
	return tag_attribute_value_string;
}


/**
 * Function to update the tags ranking visualization based on the current sorting criteria (stored in STATE["tags_ranking"]["current_sorting_criteria"])
 */
function update_tags_rankings_visualization() {

	// console.log(">>>>> Updating tags ranking");

	// Reset the scroll position of the tags list container
	// let tags_list_container = $("#filter-tags-ranking .tags-ranking-container");
	// $(tags_list_container).scrollTop(0);

	// Get the currently active sorting criteria from STATE
	let current_sorting_criteria = STATE["tags_ranking"]["current_sorting_criteria"];
	// Get reference to sorted list
	let sorted_tags_list = STATE["tags_ranking"]["tag_lists"][current_sorting_criteria];
	// Get the current grouping criteria ("none", "category" or "filters")
	let current_grouping_criteria = STATE["tags_ranking"]["current_grouping_criteria"];
	// Get the actual sorted tags list based on the current grouping criteria
	// let actual_sorted_tags_list = [];

	let neutral_tags_size = TOTAL_NUMBER_OF_TAGS - (STATE["tags_ranking"]["tags_to_include"].size + STATE["tags_ranking"]["tags_to_exclude"].size);
	let current_tag_grouping_index = {
		// "none": 0,
		"category": {
			"Genres": 0,
			"Sub-Genres": TAGS_BY_CATEGORY["Genres"].length,
			"Features": TAGS_BY_CATEGORY["Genres"].length + TAGS_BY_CATEGORY["Sub-Genres"].length
		},
		"filters": {
			"include": 0,
			"neutral": STATE["tags_ranking"]["tags_to_include"].size,
			"exclude": STATE["tags_ranking"]["tags_to_include"].size + neutral_tags_size
		}
	};

	/** Update a single tag div in the ranking */
	function update_tag_div(tag_div, tag_name, tag_rank_index, tag_rank_index_for_grouping) {

		// Get elements first

		// Set the top position as "calc(var(--top-index) * var(--height-percentage) * 1%)"
		let height_percentage_value = 4.75;
		let calculated_top_position = tag_rank_index_for_grouping * height_percentage_value;
		// Get the tag percentage value
		let tag_sorting_criteria_value = STATE["all_tags_filter_infos"][tag_name][current_sorting_criteria];
		let max_sorted_criteria_value = STATE["tag_global_infos"]["max_" + current_sorting_criteria];
		let min_value_padding_percentage = 0.25 * max_sorted_criteria_value / 100;
		let tag_percentage_value = min_value_padding_percentage;
		if (max_sorted_criteria_value + min_value_padding_percentage > 0) tag_percentage_value = (tag_sorting_criteria_value + min_value_padding_percentage) / (max_sorted_criteria_value + min_value_padding_percentage);
		// Set the width as the percentage value
		let actual_percentage_portion = 0.985;
		let tag_fill_div = tag_div.find(".fill-div");
		// Update the tag-text-label-rank-criteria-attribute-value div
		let tag_text_label_rank_criteria_attribute_value = tag_div.find(".tag-text-label-rank-criteria-attribute-value");
		let tag_text_label_rank_criteria_string = get_tag_attribute_value_string(current_sorting_criteria, tag_sorting_criteria_value);
		// Update the tag-text-label-rank-number div with the actual number for the tag ranking
		let tag_text_label_rank_number = tag_div.find(".tag-text-label-rank-number");
		let max_font_size = 1;
		let min_font_size = 0.625;
		let text_length = (tag_rank_index + 1).toString().length;
		let font_size_to_set = interpolate_between_values(min_font_size, max_font_size, 1 - (text_length - 1) / (3 - 1));
		// Update the text-label-number-of-games div
		let text_label_number_of_games = tag_div.find(".text-label-number-of-games");
		let tag_number_of_games_text = "(" + format_number_string(STATE["all_tags_filter_infos"][tag_name]["number_of_games"], 1) + " games)";
		// Get tag is included, excluded or neutral
		let tag_include_state = "neutral";	// "neutral", "include" or "exclude
		if (STATE["tags_ranking"]["tags_to_include"].has(tag_name)) tag_include_state = "include";
		if (STATE["tags_ranking"]["tags_to_exclude"].has(tag_name)) tag_include_state = "exclude";
		let tag_actual_index = get_tag_index_by_name(tag_name);


		// Set styles after...

		tag_div.css("top", calculated_top_position + "%");
		tag_fill_div.css("width", (tag_percentage_value * 100 * actual_percentage_portion) + "%");
		tag_text_label_rank_criteria_attribute_value.text(tag_text_label_rank_criteria_string);
		tag_text_label_rank_number.css("font-size", font_size_to_set + "em")
		tag_text_label_rank_number.text(tag_rank_index + 1);
		text_label_number_of_games.text(tag_number_of_games_text);
		set_tag_ranking_div_state(tag_actual_index, tag_include_state == "include" ? 1 : tag_include_state == "exclude" ? -1 : 0, false, false);

	}

	// Iterate over all tags in the actual sorted list
	for (let i = 0; i < sorted_tags_list.length; i++) {

		let tag_name = sorted_tags_list[i]["name"];
		let tag_index = sorted_tags_list[i]["index"];
		let tag_category = STATE["all_tags_filter_infos"][tag_name]["category"];
		let tag_include_state = "neutral";	// "neutral", "include" or "exclude
		if (STATE["tags_ranking"]["tags_to_include"].has(tag_name)) tag_include_state = "include";
		if (STATE["tags_ranking"]["tags_to_exclude"].has(tag_name)) tag_include_state = "exclude";

		let actual_tag_rank_index = i;
		// Get the alternative rank index based on the current grouping criteria (same as i if grouping criteria is "none")
		let tag_rank_index_based_on_tags_grouping = i;
		if (current_grouping_criteria != "none") {
			if (current_grouping_criteria == "category") {
				// Grouping by category
				tag_rank_index_based_on_tags_grouping = current_tag_grouping_index["category"][tag_category];
				current_tag_grouping_index["category"][tag_category]++;
			} else if (current_grouping_criteria == "filters") {
				// Grouping by filters
				tag_rank_index_based_on_tags_grouping = current_tag_grouping_index["filters"][tag_include_state];
				current_tag_grouping_index["filters"][tag_include_state]++;
			}
		}

		// Update the "tags_ranking_div_elements"
		if (tags_ranking_objects[tag_name] == undefined) tags_ranking_objects[tag_name] = {};
		tags_ranking_objects[tag_name]["ranking_index"] = actual_tag_rank_index;
		tags_ranking_objects[tag_name]["ranking_index_for_grouping"] = tag_rank_index_based_on_tags_grouping;

		// Get the corresponding tag div
		// let tags_list_selector = "#filter-tags-ranking .tags-ranking-container";
		// let tag_div = $(tags_list_selector).find(".single-tag-container[tag-index='" + tag_index + "']");
		let tag_div = $(tags_ranking_div_elements[tag_index]);

		// update the tag div
		update_tag_div(tag_div, tag_name, actual_tag_rank_index, tag_rank_index_based_on_tags_grouping);

	}

}

/**
 * Function to update the tags parallel coordinates visualization based on the new STATE
 */
function update_tags_parallel_coordinates_view() {
	// Trigger the "update" event on the "#filter-tags-parallel-coordinates" element
	let container_element = $("#filter-tags-parallel-coordinates");
	let event_to_dispatch = new CustomEvent("update");
	container_element[0].dispatchEvent(event_to_dispatch);
}

/**
 * Adds actual functions to the custom "select" buttons (with class ".custom-select", e.g. used for selecting the group by category for tags ranking visualization)
 */
function add_function_to_select_buttons() {
	let x, i, j, l, ll, selElmnt, a, b, c;
	/* Look for any elements with the class "custom-select": */
	x = document.getElementsByClassName("custom-select");
	l = x.length;
	for (i = 0; i < l; i++) {
		selElmnt = x[i].getElementsByTagName("select")[0];
		ll = selElmnt.length;
		/* For each element, create a new DIV that will act as the selected item: */
		a = document.createElement("DIV");
		a.setAttribute("class", "select-selected");
		a.innerHTML = selElmnt.options[selElmnt.selectedIndex].innerHTML;
		x[i].appendChild(a);
		/* For each element, create a new DIV that will contain the option list: */
		b = document.createElement("DIV");
		b.setAttribute("class", "select-items select-hide");
		for (j = 0; j < ll; j++) {
			/* For each option in the original select element, create a new DIV that will act as an option item: */
			c = document.createElement("DIV");
			c.innerHTML = selElmnt.options[j].innerHTML;
			let value = selElmnt.options[j].value;
			c.addEventListener("click", function (e) {
				/* When an item is clicked, update the original select box,	and the selected item: */
				let y, i, k, s, h, sl, yl;
				s = this.parentNode.parentNode.getElementsByTagName("select")[0];
				sl = s.length;
				h = this.parentNode.previousSibling;
				for (i = 0; i < sl; i++) {
					if (s.options[i].innerHTML == this.innerHTML) {
						s.selectedIndex = i;
						h.innerHTML = this.innerHTML;
						y = this.parentNode.getElementsByClassName("same-as-selected");
						yl = y.length;
						for (k = 0; k < yl; k++) {
							y[k].removeAttribute("class");
						}
						this.setAttribute("class", "same-as-selected");
						break;
					}
				}
				h.click();
				// update the select button's value
				let select_button = $(this).closest(".custom-select").find("select");
				// Value of the "option" element
				$(select_button).attr("value", value);
				// Trigger the "change" event on the select element
				$(select_button).trigger("change");
			});
			b.appendChild(c);
			// Trigger the "change" event on the select element when clicking on an option
			// $(c).on("click", function (event) {
			// 	let select_element = $(this).closest(".custom-select").find("select");
			// 	$(select_element).trigger("change");
			// });
		}
		x[i].appendChild(b);
		a.addEventListener("click", function (e) {
			/* When the select box is clicked, close any other select boxes, and open/close the current select box: */
			e.stopPropagation();
			closeAllSelect(this);
			this.nextSibling.classList.toggle("select-hide");
			this.classList.toggle("select-arrow-active");
		});
	}

	function closeAllSelect(elmnt) {
		/* A function that will close all select boxes in the document,	except the current select box: */
		let x, y, i, xl, yl, arrNo = [];
		x = document.getElementsByClassName("select-items");
		y = document.getElementsByClassName("select-selected");
		xl = x.length;
		yl = y.length;
		for (i = 0; i < yl; i++) {
			if (elmnt == y[i]) {
				arrNo.push(i)
			} else {
				y[i].classList.remove("select-arrow-active");
			}
		}
		for (i = 0; i < xl; i++) {
			if (arrNo.indexOf(i)) {
				x[i].classList.add("select-hide");
			}
		}
	}

	/* If the user clicks anywhere outside the select box, then close all select boxes: */
	document.addEventListener("click", closeAllSelect);
}

let filtered_games_results_header_row = undefined;

/**
 * Function to create the games ranking visualization
 */
function create_filtered_games_ranking() {

	let section_selector = "#visualization-games-results";
	let element_selector = section_selector + " .content";

	// Add a header div to the visualization
	// let visualization_header = $(document.createElement("div"))
	// 	.attr("class", "games-results-header");
	// $(element_selector).append(visualization_header);

	// Add a div to the visualization to contain the games results
	let visualization_content = $(document.createElement("div"))
		.attr("class", "games-results-container");
	$(element_selector).append(visualization_content);

	// Add a div to the visualization to contain the actual games
	let visualization_games = $(document.createElement("div"))
		.attr("class", "games-results");
	$(visualization_content).append(visualization_games);

	// Add 2 gradients inside the visualization_games with classes "gradient-top" and "gradient-bottom"
	let visualization_games_gradient_top = $(document.createElement("div"))
		.attr("class", "gradient-top");
	$(visualization_content).append(visualization_games_gradient_top);
	let visualization_games_gradient_bottom = $(document.createElement("div"))
		.attr("class", "gradient-bottom");
	$(visualization_content).append(visualization_games_gradient_bottom);

	// Add functions to the #section-reset-button and #section-info-button
	let section_reset_button = $(section_selector).find("#section-reset-button");
	let section_info_button = $(section_selector).find("#section-info-button");
	$(section_reset_button)
		.on("click", function (event) {
			// Reset the excluded games list
			STATE["visualization_states"]["GAMES_RANKING"]["excluded_games"] = new Set();
			// Update the state and the visualizations
			update_filters_based_on_visualization_states();
		})
		.on("mouseover", function (event) {
			let button = $(this);
			let tooltip_texts = [
				"Reset any previously excluded game result.",
			];
			set_tooltip(button, "Reset Excluded Games", tooltip_texts, [-1, -1]);
		})
		.on("mouseleave", function (event) {
			hide_tooltip();
		});
	$(section_info_button)
		.on("mouseover", function (event) {
			let button = $(this);
			let tooltip_texts = [
				"Shows the list of single game items that meet the current filter criterias.",
				TOOLTIP_LINE_SEPARATOR,
				"The color of the cells for the 'Revenue', 'Copies Sold', 'Price' and 'Rating' columns is based on the value of the corresponding attribute as a percentage of the max value for that attribute out of all the games that meet the current filter criterias.",
				TOOLTIP_LINE_SEPARATOR,
				"Click onto a cell of the table's header row to sort the games by that criteria.",
				"Click onto a game's name in the list to open the game's page on Steam.",
				"Hover over a game's name in the list to show a detailed lisit of information about that game.",
				"Click onto the '<b style='transform: scaleY(0.85);'>x</b>' button of a game in the list to include/exclude that game from the filter results.",
			];
			let optimal_tooltip_position = calculate_tooltip_optimal_translate_position(button);
			set_tooltip(button, "Games Ranking", tooltip_texts, optimal_tooltip_position);
		})
		.on("mouseleave", function (event) {
			hide_tooltip();
		});

	// // Create a select button to select the sorting criteria
	// let sorting_criteria_select_button = $(document.createElement("div"))
	// 	.attr("class", "custom-select results-sorting-criteria-select-button")
	// 	.attr("style", "width: 100%;");
	// $(visualization_header).append(sorting_criteria_select_button);
	// // Add the select button options
	// let sorting_criteria_select_button_select = $(document.createElement("select"))
	// 	.attr("style", "display: none;")
	// 	.attr("value", "release_date");
	// $(sorting_criteria_select_button).append(sorting_criteria_select_button_select);
	// let ranking_options = ["alphabetical", "release_date", "price", "copies_sold", "revenue", "review_rating", "tags_relevance"];
	// ATTRIBUTES: 	["#", "Name", "Release Date", "Price", "Revenue", "Copies Sold", "Rating", "Top Tags"]

	// Initializes the games ranking visualization
	refresh_filtered_games_ranking();

	// On scroll of the visualization_games, check if the scroll position is all to the top or all to the bottom, and if it is, add class "hide" to the corresponding gradient div
	$(visualization_games).on("scroll", function (event) {
		let scroll_position = $(this).scrollTop();
		let scroll_height = $(this).prop("scrollHeight");
		let container_height = $(this).height();
		let scroll_position_absolute = scroll_position / (scroll_height - container_height);
		if (scroll_position_absolute <= 0.01) {
			$(visualization_games_gradient_top).addClass("hide");
		} else {
			$(visualization_games_gradient_top).removeClass("hide");
		}
		if (scroll_position_absolute >= 1 - 0.01) {
			// $(visualization_games_gradient_bottom).addClass("hide");
			// Add more results
			let reached_max_results_or_found_no_results = load_more_results_in_filtered_games_ranking(10);
			if (reached_max_results_or_found_no_results) {
				// No more results to add, hide the bottom gradient
				$(visualization_games_gradient_bottom).addClass("hide");
			}
		} else {
			$(visualization_games_gradient_bottom).removeClass("hide");
		}
		// Hide the tooltip
		hide_tooltip();
	});
	// Hide top gradient at start
	$(visualization_games_gradient_top).addClass("hide");

}

/**
 * Refreshes the games ranking list
 *
 * If a "sorting_criteria" is passed, the games will be sorted by that criteria, otherwise the default sorting criteria will be used (release date)
 *
 * If a "sorting_type" is passed (either "ascending" or "descending"), the games will be sorted in that order, otherwise the default sorting type will be used (descending)
 *
 * Adds 10 games to the games results container initially (use the "load_more_results_in_filtered_games_ranking" function to load more results)
 */
function refresh_filtered_games_ranking(sorting_criteria = undefined, sorting_type = undefined) {

	let element_selector = "#visualization-games-results .content";

	// Empty the games results container
	let games_results_container = $(element_selector).find(".games-results");

	// Remove all games from the games results container
	$(games_results_container).empty();

	// Reset the filtered games ranking
	if (sorting_criteria == undefined) sorting_criteria = STATE["visualization_states"]["GAMES_RANKING"]["current_sorting_criteria"];	// Default sorting criteria or previously used sorting criteria
	else STATE["visualization_states"]["GAMES_RANKING"]["current_sorting_criteria"] = sorting_criteria;
	if (sorting_type == undefined) sorting_type = STATE["visualization_states"]["GAMES_RANKING"]["current_sorting_type"];	// Default sorting type or previously used sorting type
	else STATE["visualization_states"]["GAMES_RANKING"]["current_sorting_type"] = sorting_type;
	if (sorting_criteria == "tags_relevance" && STATE["tags_ranking"]["tags_to_include"].size == 0) {
		// If the sorting criteria is "tags_relevance" and no tags are included, set the sorting criteria to the deafault sorting criteria
		sorting_criteria = "revenue";
		STATE["visualization_states"]["GAMES_RANKING"]["current_sorting_criteria"] = sorting_criteria;
	}

	// Reset the number of results in the STATE
	STATE["visualization_states"]["GAMES_RANKING"]["current_number_of_results"] = 0;

	// Reset the last added indes
	STATE["visualization_states"]["GAMES_RANKING"]["current_last_added_game_result_index"] = -1;

	// Add the total number of results in the section's title
	let title_num_of_results_selector = "#visualization-games-results .title .number-of-results";
	let title_num_of_results = $(title_num_of_results_selector);
	let number_of_results = STATE["filtered_games"].length;
	let number_of_results_text = number_of_results.toString();
	// Separate each 3 digits with a space
	number_of_results_text = number_of_results_text.replace(/\B(?=(\d{3})+(?!\d))/g, " ");
	number_of_results_text += " games";
	$(title_num_of_results).text(number_of_results_text);
	// $(title_num_of_results).text("0");

	// Also add the number of excluded games in the section title
	let title_num_of_excluded_games_selector = "#visualization-games-results .title .number-of-excluded-games";
	let title_num_of_excluded_games = $(title_num_of_excluded_games_selector);
	let number_of_excluded_games = STATE["visualization_states"]["GAMES_RANKING"]["excluded_games"].size;
	let number_of_excluded_games_text = number_of_excluded_games.toString();
	// Separate each 3 digits with a space
	number_of_excluded_games_text = "(" + number_of_excluded_games_text.replace(/\B(?=(\d{3})+(?!\d))/g, " ");
	number_of_excluded_games_text += " excluded result" + (number_of_excluded_games == 1 ? "" : "s") + ")";
	$(title_num_of_excluded_games).text(number_of_excluded_games_text);
	if (number_of_excluded_games > 0) {
		// Make the text bold and its color purple
		$(title_num_of_excluded_games).css("font-weight", "bold");
		$(title_num_of_excluded_games).css("color", color_scheme["color_gradient"][1]);
	} else {
		// Make the text normal and its color normal
		$(title_num_of_excluded_games).css("font-weight", "normal");
		$(title_num_of_excluded_games).css("color", "#ffffff40");
	}

	// reset the scroll position of the games results container
	$(games_results_container).scrollTop(0);

	// Add the first 15 games in the games results container
	let initial_results_to_load = 15;
	// Check if the game results section is scaled up (hence has class "scaled-up")
	let section_is_scaled_up = $("#visualization-games-results").hasClass("scale-up");
	if (section_is_scaled_up) initial_results_to_load += 10;
	load_more_results_in_filtered_games_ranking(initial_results_to_load);

	// Add/Remove class "selected" and "ascending" to the selected sorting criteria and sorting type
	let sorting_criteria_buttons_container = $(element_selector + " .single-game-container-results-header-row > .single-game-container");
	let sorting_criteria_buttons = $(element_selector + " .single-game-container-results-header-row > .single-game-container > div");
	$(sorting_criteria_buttons).removeClass("selected");
	$(sorting_criteria_buttons).removeClass("ascending");
	// Get the class of the sorting criteria button to select
	let selected_button = undefined;
	if (sorting_criteria != undefined) {
		if (sorting_criteria == "alphabetical") selected_button = $(sorting_criteria_buttons_container.find(".game-name"));
		else if (sorting_criteria == "release_date") selected_button = $(sorting_criteria_buttons_container.find(".game-release-date"));
		else if (sorting_criteria == "price") selected_button = $(sorting_criteria_buttons_container.find(".game-price"));
		else if (sorting_criteria == "revenue") selected_button = $(sorting_criteria_buttons_container.find(".game-revenue"));
		else if (sorting_criteria == "copies_sold") selected_button = $(sorting_criteria_buttons_container.find(".game-copies-sold"));
		else if (sorting_criteria == "review_rating") selected_button = $(sorting_criteria_buttons_container.find(".game-rating"));
		else if (sorting_criteria == "tags_relevance") selected_button = $(sorting_criteria_buttons_container.find(".game-tags"));
		else if (sorting_criteria == "excluded") selected_button = $(sorting_criteria_buttons_container.find(".game-exclude-state"));
	}
	if (selected_button != undefined) {
		// Add the "selected" class to the selected button
		$(selected_button).addClass("selected");
		// Also add the "ascending" class if the sorting type is "ascending"
		if (sorting_criteria == "tags_relevance" || sorting_criteria == "excluded") {
			// Tags relevance and excluded games are always sorted in descending order
			$(selected_button).addClass("descending");
		} else {
			if (sorting_type == "ascending") $(selected_button).addClass("ascending");
			else $(selected_button).addClass("descending");
		}
	}

}

let CACHED_RELEVANT_TAGS_GAMES_INDEXES_LIST = null;
let CACHED_EXCLUDED_GAMES_FIRST_GAMES_INDEXES_LIST = null;

/**
 * Function used for the game results section which returns a list used to sort games by the most relevant tags
 *
 * If the sorting criteria is NOT "tags_relevance", returns an empty list (without doing any calculation to save time)
 */
function get_sorted_game_indexes_list_by_tags_relevance() {
	if (CACHED_RELEVANT_TAGS_GAMES_INDEXES_LIST == null || CACHED_RELEVANT_TAGS_GAMES_INDEXES_LIST.length == 0) {
		let relevant_tags_games_indexes = [];
		let relevant_tags_lists = [];
		let current_sorting_criteria = STATE["visualization_states"]["GAMES_RANKING"]["current_sorting_criteria"];
		if (current_sorting_criteria == "tags_relevance" && STATE["filtered_games"].length > 0) {
			if (STATE["tags_ranking"]["tags_to_include"] == undefined || STATE["tags_ranking"]["tags_to_include"].size != 0) {
				let relevant_tags_list = Array.from(STATE["tags_ranking"]["tags_to_include"].values());
				// console.log("relevant_tags_list:\n", relevant_tags_list);
				for (let i = 0; i < relevant_tags_list.length; i++) {
					let tag_name = relevant_tags_list[i];
					// relevant_tags_games_indexes = relevant_tags_games_indexes.concat(TAGS_GAME_INDEXES[tag_name]);
					relevant_tags_lists.push(TAGS_GAME_INDEXES[tag_name]);
				}
				// For each list in the list of lists, take one element from each list and add it to the relevant_tags_games_indexes list
				let lists_lengths = [];
				for (let i = 0; i < relevant_tags_lists.length; i++) {
					lists_lengths.push(relevant_tags_lists[i].length);
				}
				let max_list_length = Math.max(...lists_lengths);
				for (let i = 0; i < max_list_length; i++) {
					for (let j = 0; j < relevant_tags_lists.length; j++) {
						if (i < relevant_tags_lists[j].length && !relevant_tags_games_indexes.includes(relevant_tags_lists[j][i])) {
							relevant_tags_games_indexes.push(relevant_tags_lists[j][i]);
						}
					}
				}
			}
		}
		CACHED_RELEVANT_TAGS_GAMES_INDEXES_LIST = relevant_tags_games_indexes;
	}
	return CACHED_RELEVANT_TAGS_GAMES_INDEXES_LIST;
}

/**
 * Function used for the game results section which returns a list used to sort games by the excluded games first, then the rest of the games
 *
 * If the sorting criteria is NOT "excluded", returns an empty list (without doing any calculation to save time)
 */
function get_sorted_game_indexes_list_by_excluded_state() {
	if (CACHED_EXCLUDED_GAMES_FIRST_GAMES_INDEXES_LIST == null || CACHED_EXCLUDED_GAMES_FIRST_GAMES_INDEXES_LIST.length == 0) {
		let list_to_return = [];
		let current_sorting_criteria = STATE["visualization_states"]["GAMES_RANKING"]["current_sorting_criteria"];
		if (current_sorting_criteria == "excluded") {
			if (STATE["visualization_states"]["GAMES_RANKING"]["excluded_games"].size == 0) {
				// Simply return the list of games sorted alphabetically
				list_to_return = INDEXED_GAMES_LISTS["alphabetical"];
			} else {
				// Return the list of excluded games first, then the rest of the games
				list_to_return = Array.from(STATE["visualization_states"]["GAMES_RANKING"]["excluded_games"].values());
				console.log("list_to_return (prior):\n", list_to_return);
				let games_indexes_list = INDEXED_GAMES_LISTS["alphabetical"].filter(x => !list_to_return.includes(x));
				list_to_return = list_to_return.concat(games_indexes_list);
				console.log("list_to_return:\n", list_to_return);
			}
		}
		CACHED_EXCLUDED_GAMES_FIRST_GAMES_INDEXES_LIST = list_to_return;
	}
	// console.log("CACHED_EXCLUDED_GAMES_FIRST_GAMES_INDEXES_LIST:\n", CACHED_EXCLUDED_GAMES_FIRST_GAMES_INDEXES_LIST);
	return CACHED_EXCLUDED_GAMES_FIRST_GAMES_INDEXES_LIST;
}

/**
 * Loads "results_to_add" more results in the games results container based on the current sorting criteria and number of results (stored in the STATE variable)
 *
 * Returns "true" when no more results can be added (or when no results exist at all), false otherwise
 */
function load_more_results_in_filtered_games_ranking(results_to_add = 10) {

	let element_selector = "#visualization-games-results .content";

	// Get reference to the games results container
	let games_results_container = $(element_selector).find(".games-results");

	// Get the current sorting criteria and number of shown results
	let current_sorting_criteria = STATE["visualization_states"]["GAMES_RANKING"]["current_sorting_criteria"];
	let current_sorting_type = STATE["visualization_states"]["GAMES_RANKING"]["current_sorting_type"];
	let current_number_of_results = STATE["visualization_states"]["GAMES_RANKING"]["current_number_of_results"];
	let last_added_game_result_index = STATE["visualization_states"]["GAMES_RANKING"]["current_last_added_game_result_index"];

	console.log(">>>>> Loading more results in filtered games ranking...\n",
		"current_sorting_criteria:", current_sorting_criteria, "\n",
		"current_sorting_type:", current_sorting_type, "\n",
		"current_number_of_results:", current_number_of_results, "\n",
		"last_added_game_result_index:", last_added_game_result_index, "\n",
		"results_to_add:", results_to_add);

	// Add a header div to the games, as a single game div with class "single-game-container" and class "header-row"
	let games_results_outer_container = $(element_selector).find(".games-results-container");
	if (filtered_games_results_header_row == undefined) {
		filtered_games_results_header_row = $(document.createElement("div"))
			.attr("class", "single-game-container-results-header-row");
		// Create the game element container
		// Text: 	["#", "Name", "Release Date", "Price", "Revenue", "Copies Sold", "Rating", "Top Tags"]
		let header_row_content = create_single_game_div(undefined, 0, undefined);
		// Add the header row to the games results container
		$(games_results_outer_container).prepend(filtered_games_results_header_row);
		$(filtered_games_results_header_row).prepend(header_row_content);
	}

	/**
	 * Function to change the sorting criterai and/or sorting type on click onto the header row divs
	 */
	function click_on_sorting_criteria_button(clicked_div) {
		// Set new sorting criteria based on the clicked div
		let new_sorting_criteria = "";
		if (clicked_div.hasClass("game-name")) new_sorting_criteria = "alphabetical";
		else if (clicked_div.hasClass("game-release-date")) new_sorting_criteria = "release_date";
		else if (clicked_div.hasClass("game-price")) new_sorting_criteria = "price";
		else if (clicked_div.hasClass("game-revenue")) new_sorting_criteria = "revenue";
		else if (clicked_div.hasClass("game-copies-sold")) new_sorting_criteria = "copies_sold";
		else if (clicked_div.hasClass("game-rating")) new_sorting_criteria = "review_rating";
		else if (clicked_div.hasClass("game-tags")) new_sorting_criteria = "tags_relevance";
		else if (clicked_div.hasClass("game-exclude-state")) new_sorting_criteria = "excluded";
		// Check if we are already sorting by this sorting criteria
		let new_sorting_type = "descending";
		let current_sorting_criteria = STATE["visualization_states"]["GAMES_RANKING"]["current_sorting_criteria"];
		if (current_sorting_criteria == new_sorting_criteria) {
			// If we are already sorting by this sorting criteria, swap the sorting type
			let current_sorting_type = STATE["visualization_states"]["GAMES_RANKING"]["current_sorting_type"];
			if (current_sorting_type == "ascending") new_sorting_type = "descending";
			else new_sorting_type = "ascending";
		}
		// Force the sorting type to be descending if the sorting criteria is "tags_relevance"
		if (new_sorting_criteria == "tags_relevance") new_sorting_type = "descending";
		if (new_sorting_criteria == "excluded") new_sorting_type = "descending";
		// If we are actually changing the sorting criteria, update the games ranking
		if (
			!(new_sorting_criteria == "tags_relevance" && STATE["tags_ranking"]["tags_to_include"].size == 0)
			&& !(new_sorting_criteria == "ecxluded" && STATE["visualization_states"]["GAMES_RANKING"]["excluded_games"].size == 0)
		) {
			// Refresh the games ranking
			refresh_filtered_games_ranking(new_sorting_criteria, new_sorting_type);
			// Update the sorting criteria select button
			if (new_sorting_criteria == current_sorting_criteria) {
				// If we are already sorting by this sorting criteria, swap the sorting type
				$(clicked_div).toggleClass("ascending");
			} else {
				// If we are not already sorting by this sorting criteria, set all divs to not have class "selected"
				$(filtered_games_results_header_row).find(".selected").removeClass("selected");
				// Set the new sorting criteria div to have class "selected"
				$(clicked_div).addClass("selected");
				// Set the sorting type to descending
				$(clicked_div).removeClass("ascending");
			}
			// Update tooltip
			show_tooltip_for_sorting_criteria_button(clicked_div);
		}
	}

	function show_tooltip_for_sorting_criteria_button(clicked_div) {
		let associated_sorting_criteria = "";
		if (clicked_div.hasClass("game-name")) associated_sorting_criteria = "alphabetical";
		else if (clicked_div.hasClass("game-release-date")) associated_sorting_criteria = "release_date";
		else if (clicked_div.hasClass("game-price")) associated_sorting_criteria = "price";
		else if (clicked_div.hasClass("game-revenue")) associated_sorting_criteria = "revenue";
		else if (clicked_div.hasClass("game-copies-sold")) associated_sorting_criteria = "copies_sold";
		else if (clicked_div.hasClass("game-rating")) associated_sorting_criteria = "review_rating";
		else if (clicked_div.hasClass("game-tags")) associated_sorting_criteria = "tags_relevance";
		else if (clicked_div.hasClass("game-exclude-state")) associated_sorting_criteria = "excluded";
		let sorting_criteria_names = {
			"alphabetical": "Game Name",
			"release_date": "Release Date",
			"tags_relevance": "Tags Relevance",

			"price": "Price",
			"revenue": "Revenue",
			"copies_sold": "Copies Sold",
			"review_rating": "Rating",

			"excluded": "Excluded Games"
		};
		let current_sorting_type = STATE["visualization_states"]["GAMES_RANKING"]["current_sorting_type"];
		let associated_sorting_criteria_name = sorting_criteria_names[associated_sorting_criteria];
		let tooltip_title = "Sort by " + associated_sorting_criteria_name + " (" + (current_sorting_type == "ascending" ? "ascending" : "descending") + ")";
		if (associated_sorting_criteria == "excluded") tooltip_title = "Show Excluded Games on Top";
		let tooltip_texts = [];
		if (associated_sorting_criteria == "tags_relevance" && STATE["tags_ranking"]["tags_to_include"].size == 0) {
			tooltip_title = "<span style='text-decoration: line-through;'>Sort by Tags Relevance</span> (No Tags Included)"
			tooltip_texts.push("To sort by 'Tags Relevance', include at least one tag from the 'Tags Ranking' section.");
		} else if (associated_sorting_criteria == "excluded") {
			let current_number_of_excluded_games = STATE["visualization_states"]["GAMES_RANKING"]["excluded_games"].size;
			tooltip_texts.push("Click to show games excluded from the results on top of the list.");
			tooltip_texts.push(TOOLTIP_LINE_SEPARATOR);
			tooltip_texts.push(
				`<div style='display: inline-flex; justify-content: space-between; width: 100%;'>
					<div style='display: inline-flex; justify-content: flex-start; width: 85%;'>
						Current number of excluded games:
					</div>
					<div style='display: inline-flex; justify-content: flex-end; width: 15%;'>
						${current_number_of_excluded_games}
					</div>
				</div>`
			);
		} else {
			// let padding_string = (Array(4).fill("&nbsp;")).join("");
			tooltip_texts.push("Click to sort the game results by " + associated_sorting_criteria_name.toLowerCase() + " in " + current_sorting_type + " order.");
		}
		if (associated_sorting_criteria != "tags_relevance" && associated_sorting_criteria != "excluded") {
			tooltip_texts.push("Click again to change the sorting type to " + (current_sorting_type == "ascending" ? "descending" : "ascending") + " order.");
		}
		// Add text for the max values and/or notes for the sorting criteria
		if (associated_sorting_criteria != "alphabetical" && associated_sorting_criteria != "release_date" && associated_sorting_criteria != "tags_relevance" && associated_sorting_criteria != "excluded") {
			if (associated_sorting_criteria == "copies_sold") {
				// Add copies sold notice for free games
				let note_text = "NOTE: The number of copies sold for games with a 'Free' price corresponds to the number of owners of the game.";
				tooltip_texts.push(note_text);
			}
			// Add max value text
			let max_value = STATE["games_global_infos"]["max_" + associated_sorting_criteria];
			function format_max_value_string(max_value_to_format) {
				let max_value_string = "";
				if (associated_sorting_criteria == "price" || associated_sorting_criteria == "revenue") {
					if (max_value_to_format == 0 && associated_sorting_criteria == "price") {
						max_value_string = "Free";
					} else {
						max_value_string = "$" + format_number_string(max_value_to_format, 2);
					}
				} else if (associated_sorting_criteria == "review_rating") {
					max_value_string = Math.round(max_value_to_format * 100).toString() + "%";
				} else {
					max_value_string = format_number_string(max_value_to_format, 2);
				}
				return max_value_string;
			}
			// tooltip_texts.push(TOOLTIP_LINE_SEPARATOR);
			// tooltip_texts.push(
			// 	`<div style='display: inline-flex; justify-content: space-between; width: 100%;'>
			// 		<div style='display: inline-flex; justify-content: flex-start; width: 85%;'>
			// 			Max ${associated_sorting_criteria_name.toLowerCase()} in results:
			// 		</div>
			// 		<div style='display: inline-flex; justify-content: flex-end; width: 15%;'>
			// 			${format_max_value_string(max_value)}
			// 		</div>
			// 	</div>`
			// );
			// Add a gradient div
			// tooltip_texts.push(TOOLTIP_LINE_SEPARATOR);
			// tooltip_texts.push(associated_sorting_criteria_name + " values color mapping:");
			tooltip_texts.push(TOOLTIP_LINE_SPACING);
			let gradient_div_for_tooltip = get_color_gradient_for_tooltip(0, max_value, format_max_value_string);
			tooltip_texts.push(gradient_div_for_tooltip);

		} else if (associated_sorting_criteria == "tags_relevance") {
			// Add tags relevance calculation text
			tooltip_texts.push(TOOLTIP_LINE_SEPARATOR);
			tooltip_texts.push(
				"Filtering results by tags relevance will make games that are more relevant to the included tags appear on top of the results list."
			);
		}
		let optimal_tooltip_position = calculate_tooltip_optimal_translate_position(clicked_div);
		set_tooltip(clicked_div, tooltip_title, tooltip_texts, optimal_tooltip_position);
	}

	/**
	 * Creates an element for the given game and returns it (doees NOT add it to the games results container)
	 *
	 * If "game_object" is undefined, a header row is created and returned
	 *
	 * The "game_index" represents the index of the game in the list (starting from 0, but will be shown as 1), NOT the index of the game in the GAMES list
	 *
	 * The "actual_game_index" represents the index of the game in the GAMES list (starting from 0)
	 */
	function create_single_game_div(game_object, game_index_for_results_list, actual_game_index) {

		// Check if we are creating a header row (using_game_object = false) or a game element (using_game_object = true)
		let creating_game_result_div = game_object != undefined;

		// Create the game element container
		let game_element_container = $(document.createElement("div"))
			.attr("class", "single-game-container");
		// $(games_results_container).append(game_element_container);

		// Add ranking number div
		let game_ranking_text = "#";
		let game_ranking_font_size = 1;
		if (creating_game_result_div) {
			(game_index_for_results_list + 1).toString();
			// let game_ranking_text = TOTAL_NUMBER_OF_GAMES.toString();
			let game_ranking_min_font_size = 0.675;
			let game_ranking_max_font_size = 1.5;	// More than 1 for a better interpolation, but clamped in [min,1] in the end
			let max_ranking_length = TOTAL_NUMBER_OF_GAMES.toString().length;
			game_ranking_font_size = interpolate_between_values(game_ranking_min_font_size, game_ranking_max_font_size, 1 - (game_ranking_text.length - 1) / (max_ranking_length - 1));
			if (game_ranking_font_size > 1) game_ranking_font_size = 1;
			game_ranking_text = (game_index_for_results_list + 1).toString();
		}
		let game_ranking_number = $(document.createElement("div"))
			.attr("class", "game-ranking-number center-text")
			.css("max-width", "4em")
			.css("font-size", game_ranking_font_size + "em")
			// .css("text-align", "center")
			// .css("width", "100%")
			.text(game_ranking_text);
		$(game_element_container).append(game_ranking_number);

		// Add name div
		let game_name = $(document.createElement("div"))
			.css("max-width", "25em")
			.attr("class", "game-name text-left");
		let game_name_link = null;
		function get_unset_name_html() {
			return "<div style='font-style: italic;font-weight: normal; color: #ffffff50;'>NAME WAS NOT SET FOR THIS ITEM</div>";
		}
		if (creating_game_result_div) {
			let game_name_text = game_object["name"];
			game_name_link = $(document.createElement("a"))
				.attr("href", "https://store.steampowered.com/app/" + game_object["steam_id"])
				.attr("target", "_blank");
			if (game_name_text != "") {
				// Game as an assigned name
				game_name_link
					.text(game_name_text);
			} else {
				// Game has no assigned name
				let game_name_html = get_unset_name_html();
				game_name_link
					.html(game_name_html);
			}
			$(game_name).append(game_name_link);
		} else {
			$(game_name).text("Name");
		}
		$(game_element_container).append(game_name);
		// Add an on click and hover functions to the name div (header or game result)
		if (!creating_game_result_div) {
			// Add an on click and hover functions to the name header div
			$(game_name)
				.on("click", function (event) {
					// On click, sort the games by name
					click_on_sorting_criteria_button($(this));
				})
				.on("mouseenter", function (event) {
					// On hover, show a tooltip
					show_tooltip_for_sorting_criteria_button($(this));
				})
				.on("mouseleave", function (event) {
					// On hover, hide the tooltip
					hide_tooltip();
				});
		} else {
			// Add hover functions to the name game result div
			function get_tooltip_property_line_string(property_name, property_value, wide_value = false) {
				let wide_left = 65;	// Percentage of the width of the tooltip that the property name will take if "wide_value" is true
				let narrow_left = 20;	// Percentage of the width of the tooltip that the property name will take if "wide_value" is false
				let html_string = `
					<div style='display: inline-flex; justify-content: space-between; width: 100%;'>
						<div style='display: inline-flex; justify-content: flex-start; width: ${(!wide_value ? wide_left : narrow_left)}%; padding-right: 1em;'>
							${property_name}:
						</div>
						<div style='display: inline-flex; justify-content: flex-end; width: ${(!wide_value ? 100 - wide_left : 100 - narrow_left)}%;'>
							${property_value}
						</div>
					</div>
				`;
				return html_string;
			}
			function get_tooltip_property_groups_string(property_name, property_values, properties_colors = undefined) {
				let properties_html = "";
				if (property_values.length == 0) {
					return get_tooltip_property_line_string(property_name, "N.A.");
				} else {
					for (let i = 0; i < property_values.length; i++) {
						let background_color = "#00000025";
						if (properties_colors != undefined) {
							background_color = properties_colors[i];
						}
						properties_html += "<div style='display: inline-flex; justify-content: flex-start; background-color: " + background_color + "; padding: 0.15em 0.5em; border-radius: 0.375em; margin: 0.2em 0.2em;'>" + property_values[i] + "</div>";
					}
				}
				// let display_style = "display: inline-flex; flex-direction: column; justify-content: flex-start; width: 100%;";
				// if (true || property_values.length == 1) display_style += "display: inline-flex; flex-direction: row; justify-content: space-between; width: 100%;";
				// let align_list_style = "flex-start";
				// if (property_values.length == 1) align_list_style = "flex-end";
				let html_string = `
					<div style='display: inline-flex; flex-direction: row; justify-content: space-between; width: 100%;'>
						<div style='display: inline-flex; justify-content: flex-start; width: auto; padding-right: 1em;'>
							${property_name}:
						</div>
						<div style='display: inline-flex; justify-content: flex-end; flex-wrap: wrap; width: auto; font-size: 0.8em; '>
							${properties_html}
						</div>
					</div>
				`;
				return html_string;
			}
			$(game_name_link)
				.on("mouseenter", function (event) {
					// On hover, show a tooltip
					let game_name_html = game_object["name"];
					if (game_name_html == "") game_name_html = get_unset_name_html();
					let tooltip_title = game_name_html;
					let price_string = "";
					if (game_object["price"] == 0) {
						price_string = "Free";
					} else {
						price_string = "$" + format_number_string(game_object["price"], 2);
					}
					let review_rating_string = "";
					let total_game_reviews = game_object["positive_reviews"] + game_object["negative_reviews"];
					if (total_game_reviews > 0) {
						review_rating_string = Math.round(100 * game_object["positive_reviews"] / total_game_reviews) + "%";
					} else {
						review_rating_string = "No reviews";
					}
					let game_developers_string = "";
					if (game_object["developers"].length > 0) {
						game_developers_string = game_object["developers"].join(", ");
					} else {
						game_developers_string = "N.A.";
					}
					let game_publishers_string = "";
					if (game_object["publishers"].length > 0) {
						game_publishers_string = game_object["publishers"].join(", ");
					} else {
						game_publishers_string = "N.A.";
					}
					let actual_languages = [];
					for (let i = 0; i < game_object["languages"].length; i++) {
						let language = game_object["languages"][i];
						if (LANGUAGES.includes(language)) {
							actual_languages.push(language);
						}
					}
					let tooltip_texts = [
						"Click to open this game's Steam page in a new tab.",
						TOOLTIP_LINE_SEPARATOR,
						get_tooltip_property_line_string("Developers", game_developers_string, true),
						get_tooltip_property_line_string("Publishers", game_publishers_string, true),
						get_tooltip_property_line_string("Release Date", game_object["release_date"]["day"] + "/" + game_object["release_date"]["month"] + "/" + game_object["release_date"]["year"]),
						get_tooltip_property_line_string("Price", price_string),
						get_tooltip_property_line_string("Estimated Revenue", "$" + format_number_string(game_object["revenue"], 2)),
						get_tooltip_property_line_string("Estimated Copies Sold", format_number_string(game_object["copies_sold"], 2)),
						get_tooltip_property_line_string("Review Rating", review_rating_string),
						get_tooltip_property_line_string("Total Reviews", format_number_string(total_game_reviews, 2)),
						get_tooltip_property_groups_string("Languages", actual_languages),
						get_tooltip_property_groups_string("Player Modes", game_object["player_mode"]),
						get_tooltip_property_groups_string("Content Ratings", game_object["content_rating"]),
					];
					// Add tags to the tooltip
					let tags_colors = [];
					let tags_names = [];
					let tags_names_list = game_object["tags"];
					let tag_categories = ["Genres", "Sub-Genres", "Features"];
					for (let i = 0; i < tags_names_list.length; i++) {
						let tag_name = tags_names_list[i];
						let tag_category = STATE["all_tags_filter_infos"][tag_name]["category"];
						let category_index = tag_categories.indexOf(tag_category);
						tags_colors.push(color_scheme["tag_colors"][category_index]);
						tags_names.push(tag_name);
					}
					tooltip_texts.push(get_tooltip_property_groups_string("Tags", tags_names, tags_colors));
					// Add the tooltip to the page
					let optimal_tooltip_position = calculate_tooltip_optimal_translate_position($(this));
					set_tooltip($(this), tooltip_title, tooltip_texts, optimal_tooltip_position, [0, 0], true);
				})
				.on("mouseleave", function (event) {
					// On hover, hide the tooltip
					hide_tooltip();
				});
		}

		// Add release date div
		let release_date_text = "Release date";
		if (creating_game_result_div) {
			let months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"];
			release_date_text = game_object["release_date"]["day"] + " " + months[game_object["release_date"]["month"] - 1] + " " + game_object["release_date"]["year"];
		}
		let game_release_date = $(document.createElement("div"))
			.attr("class", "game-release-date center-text")
			.css("max-width", "6em")
			.text(release_date_text);
		$(game_element_container).append(game_release_date);
		// Add an on click function to the release date div
		if (!creating_game_result_div) {
			// On click, sort the games by release date
			$(game_release_date)
				.on("click", function (event) {
					click_on_sorting_criteria_button($(this));
				})
				.on("mouseenter", function (event) {
					// On hover, show a tooltip
					show_tooltip_for_sorting_criteria_button($(this));
				})
				.on("mouseleave", function (event) {
					// On hover, hide the tooltip
					hide_tooltip();
				});
		}

		// Add tags div
		let tags_html = "Tags";
		if (creating_game_result_div) {
			tags_html = "<div class='game-tags-list'>";
			let tag_names_list = game_object["tags"];
			if (tag_names_list.length == 0) {
				tags_html += "<div class='game-tags-list-item' style='color: #ffffff50;'>No tags assigned</div>";
			} else {
				let tags_to_add = 10;
				let added_tags = 0;
				for (let i = 0; i < tag_names_list.length; i++) {
					let tag_name = tag_names_list[i];
					let tag_categories = ["Genres", "Sub-Genres", "Features"];
					let tag_category = STATE["all_tags_filter_infos"][tag_name]["category"];
					let category_index = tag_categories.indexOf(tag_category);
					let color_string = offset_saturation_and_value(color_scheme["tag_colors"][category_index], 3, 2);
					tags_html += "<div class='game-tags-list-item' style='pointer-events: none; background-color: " + color_string + ";'>" + tag_name + "</div>";
					added_tags++;
					if (added_tags >= tags_to_add) break;
				}
			}
			tags_html += "</div>";
		}
		let game_tags = $(document.createElement("div"))
			.attr("class", "game-tags")
			.html(tags_html);
		$(game_element_container).append(game_tags);
		// Add an on click function to the tags div
		if (!creating_game_result_div) {
			// On click, sort the games by tags
			$(game_tags)
				.on("click", function (event) {
					click_on_sorting_criteria_button($(this));
				})
				.on("mouseenter", function (event) {
					// On hover, show a tooltip
					show_tooltip_for_sorting_criteria_button($(this));
				})
				.on("mouseleave", function (event) {
					// On hover, hide the tooltip
					hide_tooltip();
				});
		}

		function set_element_color_based_on_value(element, property) {
			if (creating_game_result_div) {
				let property_value = 0;
				if (property == "review_rating") {
					let total_game_reviews = game_object["positive_reviews"] + game_object["negative_reviews"];
					if (total_game_reviews > 0) {
						property_value = game_object["positive_reviews"] / total_game_reviews;
					} else {
						property_value = 0;
					}
				} else {
					let max_value = STATE["games_global_infos"]["max_" + property];
					if (max_value > 0) {
						property_value = game_object[property] / max_value;
					} else {
						property_value = 0;
					}
				}
				let revenue_color = offset_saturation_and_value(get_gradient_color(property_value, true), 0, -5);
				element.css("background-color", revenue_color);
				// Also set text color based on value
				let text_color_gradient = [
					color_scheme["white"],
					offset_saturation_and_value(color_scheme["white"], -20, 27)
				];
				let text_color = get_gradient_color(property_value, false, text_color_gradient);
				element.css("color", text_color);
			}
		}

		// Add revenue div
		let revenue_text = "Revenue";
		if (creating_game_result_div) revenue_text = "$" + format_number_string(game_object["revenue"]);
		let game_revenue = $(document.createElement("div"))
			.attr("class", "game-revenue")
			.css("max-width", "6.5em")
			.text(revenue_text);
		$(game_element_container).append(game_revenue);
		// Set background color based on value
		set_element_color_based_on_value(game_revenue, "revenue");
		// Add an on click function to the revenue div
		if (!creating_game_result_div) {
			// On click, sort the games by revenue
			$(game_revenue)
				.on("click", function (event) {
					click_on_sorting_criteria_button($(this));
				})
				.on("mouseenter", function (event) {
					// On hover, show a tooltip
					show_tooltip_for_sorting_criteria_button($(this));
				})
				.on("mouseleave", function (event) {
					// On hover, hide the tooltip
					hide_tooltip();
				});
		}

		// Add copies sold div
		let copies_sold_text = "Copies sold";
		if (creating_game_result_div) copies_sold_text = format_number_string(game_object["copies_sold"]);
		let game_copies_sold = $(document.createElement("div"))
			.attr("class", "game-copies-sold")
			.css("max-width", "6em")
			.text(copies_sold_text);
		$(game_element_container).append(game_copies_sold);
		// Set background color based on value
		set_element_color_based_on_value(game_copies_sold, "copies_sold");
		// Add an on click function to the copies sold div
		if (!creating_game_result_div) {
			// On click, sort the games by copies sold
			$(game_copies_sold)
				.on("click", function (event) {
					click_on_sorting_criteria_button($(this));
				})
				.on("mouseenter", function (event) {
					// On hover, show a tooltip
					show_tooltip_for_sorting_criteria_button($(this));
				})
				.on("mouseleave", function (event) {
					// On hover, hide the tooltip
					hide_tooltip();
				});
		}

		// Add price div
		let price_text = "Price";
		if (creating_game_result_div) {
			if (game_object["price"] == 0) {
				price_text = "Free";
			} else {
				price_text = "$" + game_object["price"].toString();
				if (!price_text.includes(".")) {
					price_text += ".00";
				} else if (price_text.split(".")[1].length == 1) {
					price_text += "0";
				}
			}
		}
		let game_price = $(document.createElement("div"))
			.css("max-width", "4.5em")
			.attr("class", "game-price")
			.text(price_text);
		$(game_element_container).append(game_price);
		// Set background color based on value
		set_element_color_based_on_value(game_price, "price");
		// Add an on click function to the price div
		if (!creating_game_result_div) {
			// On click, sort the games by price
			$(game_price)
				.on("click", function (event) {
					click_on_sorting_criteria_button($(this));
				})
				.on("mouseenter", function (event) {
					// On hover, show a tooltip
					show_tooltip_for_sorting_criteria_button($(this));
				})
				.on("mouseleave", function (event) {
					// On hover, hide the tooltip
					hide_tooltip();
				});
		}

		// Add rating div
		let rating_text = "Rating";
		if (creating_game_result_div) {
			let rating_percentage = 0;
			if (game_object["positive_reviews"] + game_object["negative_reviews"] > 0) {
				rating_percentage = game_object["positive_reviews"] / (game_object["positive_reviews"] + game_object["negative_reviews"]);
				rating_text = Math.round(rating_percentage * 100) + "%";
			} else {
				rating_text = "N/A";
			}
		}
		let game_rating = $(document.createElement("div"))
			.attr("class", "game-rating")
			.attr("pointer-events", "all")
			.css("max-width", "4.5em")
			.text(rating_text);
		$(game_element_container).append(game_rating);
		// Set background color based on value
		set_element_color_based_on_value(game_rating, "review_rating");
		// If the game has less than 10 reviews in total, show a "*" after the rating, as a span element, and on hover over it, show a tooltip
		if (creating_game_result_div) {
			let number_of_reviews = game_object["positive_reviews"] + game_object["negative_reviews"];
			if (number_of_reviews > 0 && number_of_reviews < 10) {
				// Add the span element
				let rating_notice = $(document.createElement("span"))
					.attr("class", "rating-tooltip")
					.attr("pointer-events", "all")
					.text("*");
				$(game_rating).append(rating_notice);
				// Add the tooltip
				rating_notice
					.on("mouseenter", function (event) {
						let tooltip_texts = [
							"This game has less than 10 reviews in total (" + number_of_reviews + " review" + (number_of_reviews > 1 ? "s" : "") + ").",
							"The rating percentage might be inaccurate."
						];
						let optimal_tooltip_position = calculate_tooltip_optimal_translate_position(rating_notice);
						set_tooltip(rating_notice, "*Inaccurate Rating", tooltip_texts, optimal_tooltip_position);
					})
					.on("mouseleave", function (event) {
						hide_tooltip();
					});
			}
		}
		// Add an on click function to the rating div
		if (!creating_game_result_div) {
			// On click, sort the games by rating
			$(game_rating)
				.on("click", function (event) {
					click_on_sorting_criteria_button($(this));
				})
				.on("mouseenter", function (event) {
					// On hover, show a tooltip
					show_tooltip_for_sorting_criteria_button($(this));
				})
				.on("mouseleave", function (event) {
					// On hover, hide the tooltip
					hide_tooltip();
				});
		}

		// Create the exclude state div
		let game_exclude_state = $(document.createElement("div"))
			.attr("class", "game-exclude-state center-text")
			.css("max-width", "1.15em")
			.css("cursor", "pointer");
		$(game_element_container).append(game_exclude_state);
		// Add an "x" to the exclude state div (as a new div, to set set a different font size and not mess up the "max-width" property which depends on the font size)
		let game_exclude_state_x_text = $(document.createElement("div"))
			.attr("class", "game-exclude-state-x-text")
			.css("font-size", "1.1em")
			.css("transform", "scaleY(0.85)")
			.css("font-weight", "bold")
			.css("width", "100%")
			.css("height", "100%")
			.css("display", "inline-flex")
			.css("justify-content", "center")
			.css("align-items", "center")
			.attr("pointer-events", "none")
			.attr("text-anchor", "middle")
			.attr("text-align", "center")
			.text("x");
		$(game_exclude_state).append(game_exclude_state_x_text);
		// Add an on click function to the exclude state div
		if (creating_game_result_div) {
			// On click, exclude the game from the results
			$(game_exclude_state)
				.on("click", function (event) {
					// Get the current exclusion state from class "excluded"
					let game_was_excluded = $(this).hasClass("excluded");
					// Toggle the game exclusion state
					if (game_was_excluded) {
						// If the game was excluded, remove the "excluded" class from the STATE["visualization_states"]["GAMES_RANKING"]["excluded_games"] set
						STATE["visualization_states"]["GAMES_RANKING"]["excluded_games"].delete(actual_game_index);
						// Remove the "excluded" class from the game exclude state div
						$(this).removeClass("excluded");
						// Remove the "excluded" class from the game div
						$(game_element_container).removeClass("excluded");
					} else {
						// If the game was not excluded, add the "excluded" class to the STATE["visualization_states"]["GAMES_RANKING"]["excluded_games"] set
						STATE["visualization_states"]["GAMES_RANKING"]["excluded_games"].add(actual_game_index);
						// Add the "excluded" class to the game exclude state div
						$(this).addClass("excluded");
						// Add the "excluded" class to the game div
						$(game_element_container).addClass("excluded");
					}
					// console.log("Exdluded a game.\nList of excluded_games:\n", STATE["visualization_states"]["GAMES_RANKING"]["excluded_games"]);
					// Update filters and visualization
					update_filters_based_on_visualization_states();
				})
				.on("mouseenter", function (event) {
					// On hover, show a tooltip
					let currently_excluded = $(this).hasClass("excluded");
					let tooltip_title = (currently_excluded ? "Include Game" : "Exclude Game");
					let tooltip_texts = [];
					if (currently_excluded) {
						tooltip_texts.push("Click to include this game in the results.");
					} else {
						tooltip_texts.push("Click to exclude this game from the results.");
					}
					let optimal_tooltip_position = calculate_tooltip_optimal_translate_position($(this));
					set_tooltip($(this), tooltip_title, tooltip_texts, optimal_tooltip_position);
					// Also make the game div lighter
					$(this).css("background-color", "#ffffff20");
				})
				.on("mouseleave", function (event) {
					// On hover, hide the tooltip
					hide_tooltip();
					// Also make the game div darker
					$(this).css("background-color", "#ffffff00");
				});
		} else {
			// Add an on click and hover functions to the exclude state header div
			$(game_exclude_state)
				.on("click", function (event) {
					// On click, sort the games by exclusion state
					click_on_sorting_criteria_button($(this));
					// Update the tooltip
					show_tooltip_for_sorting_criteria_button($(this));
				})
				.on("mouseenter", function (event) {
					// On hover, show a tooltip
					show_tooltip_for_sorting_criteria_button($(this));
				})
				.on("mouseleave", function (event) {
					// On hover, hide the tooltip
					hide_tooltip();
				});
		}

		// Ultimately, set the game div (and exclude check box) to be excluded if the game is excluded
		if (creating_game_result_div) {
			if (STATE["visualization_states"]["GAMES_RANKING"]["excluded_games"].has(actual_game_index)) {
				// If the game is excluded, add the "excluded" class to the game exclude state div
				$(game_exclude_state).addClass("excluded");
				// Add the "excluded" class to the game div
				$(game_element_container).addClass("excluded");
			} else {
				// If the game is not excluded, remove the "excluded" class from the game exclude state div
				$(game_exclude_state).removeClass("excluded");
				// Remove the "excluded" class from the game div
				$(game_element_container).removeClass("excluded");
			}
		}

		// NOTE: this shoould ultimately be baked in a list...
		// Set the width of each created div element
		let total_elements = $(game_element_container).children().length;
		let default_proportion = 0.675;
		let columns_propotions = {
			"game-ranking-number": 0.25,
			"game-name": 2.25,
			"game-release-date": 0.765,

			"game-price": 0.49,
			"game-rating": 0.49,

			// "game-rating": 0.375,
			"game-tags": 1.75,

			"game-exclude-state": 0.25
		}
		// Cycle through all the div elements and set the corresponding width, considering each missing element as having a width of 0
		let elements_widths = [];
		for (let i = 0; i < total_elements; i++) {
			let current_element = $(game_element_container).children().eq(i);
			let game_class = $(current_element).attr("class").split(" ")[0];
			let current_element_width_proportion = default_proportion;
			if (game_class in columns_propotions) {
				current_element_width_proportion = columns_propotions[game_class];
			}
			// Set the width of the current element
			elements_widths.push(current_element_width_proportion);
		}
		// Calculate sum to normalize proportions
		let total_proportions = 0;
		for (let i = 0; i < total_elements; i++) {
			total_proportions += elements_widths[i];
		}
		// Set the width of each element
		for (let i = 0; i < total_elements; i++) {
			let current_element = $(game_element_container).children().eq(i);
			let current_element_width_proportion = elements_widths[i];
			// let max_percentage_width = 100;
			let max_percentage_width = 150;
			let current_element_width_percentage = (current_element_width_proportion / total_proportions) * max_percentage_width;
			$(current_element).css("width", current_element_width_percentage + "%");
		}

		return game_element_container;

	}

	// Check if no more games are available for the given filters (used to stop the loading of more results)
	function check_no_possible_games_left(total_games_added_till_now) {
		// Current number of filtered games results (including excluded games)
		let current_number_of_filtered_games_results_to_show_in_games_ranking = STATE["filtered_games"].length + STATE["visualization_states"]["GAMES_RANKING"]["excluded_games"].size;
		// Check if we have added all the filtered games
		if (total_games_added_till_now >= current_number_of_filtered_games_results_to_show_in_games_ranking) return true;
		// Check if we are excluding NO tags and we are including exactly one tag, and if we are, get the total games for that tag, and check if we have added all of them
		// let tags_to_include = STATE["tags_ranking"]["tags_to_include"];
		// let tags_to_exclude = STATE["tags_ranking"]["tags_to_exclude"];
		// if (tags_to_include.length == 1 && tags_to_exclude.length == 0) {
		// 	let name_of_tag_to_include = tags_to_include[0];
		// 	let total_games_for_tag_to_include = TAGS_GAME_INDEXES[name_of_tag_to_include].length;
		// 	if (total_games_added_till_now >= total_games_for_tag_to_include) return true;
		// }
		return false;
	}

	// Get the list of relevant tags (NOTE: if we are NOT sorting by tags relevance, this function simply returns null as it won't be used
	let relevant_tags_games_indexes = get_sorted_game_indexes_list_by_tags_relevance();
	// Get the list of excluded games first, then non-excluuded ones (NOTE: if we are NOT sorting by excluded, this function simply returns null as it won't be used
	let excluded_games_indexes = get_sorted_game_indexes_list_by_excluded_state();

	// Add "results_to_add" more games to the games results container
	let added_results = 0;
	let current_game_index = 0;
	let game_element_divs = [];
	for (current_game_index = last_added_game_result_index + 1; current_game_index < TOTAL_NUMBER_OF_GAMES; current_game_index++) {
		// Stop the cycle if no possible games to add are left
		if (check_no_possible_games_left(current_number_of_results + added_results)) break;
		// Check if we have added enough results
		if (added_results >= results_to_add) break;
		let game_index_to_use = (current_sorting_type == "ascending") ? current_game_index : TOTAL_NUMBER_OF_GAMES - current_game_index - 1;
		if (current_sorting_criteria == "tags_relevance" || current_sorting_criteria == "excluded") game_index_to_use = current_game_index;
		// Get the game index
		// let game_index = STATE["indexed_games"][current_sorting_criteria][game_index_to_use];
		let game_index = -1;
		if (current_sorting_criteria == "tags_relevance") {
			if (game_index_to_use >= relevant_tags_games_indexes.length) {
				console.log("ERROR: game_index_to_use >= relevant_tags_games_indexes.length... this isn't supposed to happen...");
				console.log("game_index_to_use:", game_index_to_use, "\nrelevant_tags_games_indexes.length:", relevant_tags_games_indexes.length);
				break;
			}
			game_index = relevant_tags_games_indexes[game_index_to_use];
		} else if (current_sorting_criteria == "excluded") {
			// Get all indexes included in the STATE["visualization_states"]["GAMES_RANKING"]["excluded_games"] set and, when they are over, include any game in the ranking
			game_index = excluded_games_indexes[game_index_to_use];
		} else {
			game_index = INDEXED_GAMES_LISTS[current_sorting_criteria][game_index_to_use];
		}
		// Get the game object (which contains "name", "release_date", ecc...)
		let game_object = GAMES[game_index];
		// Check if the game respects the current filters
		if (game_respects_filters(game_object, ["EXCLUDED_GAMES"], false)) {
			// Create the game div
			let total_game_index_in_the_games_results_container = current_number_of_results + added_results;
			let game_div = create_single_game_div(game_object, total_game_index_in_the_games_results_container, game_index);
			// Add the game div to the games results container
			// $(games_results_container).append(game_div);
			game_element_divs.push(game_div);
			// Increment the number of added results
			added_results++;
		}
	}
	// Append all the game divs to the games results container
	for (let i = 0; i < game_element_divs.length; i++) {
		$(games_results_container).append(game_element_divs[i]);
	}

	// Check if we have added less than "results_to_add" results
	if (added_results < results_to_add) {
		// If we have added less than "results_to_add" results, add a last div with text "No more results to show"
		// console.log("Max number of game results reached...");

		// Create the last element div container (if we added at least one result)
		if (added_results > 0) {
			// We added one or more results and we have shown also the last game result, add a "No more results to show" text
			let last_element_container = $(document.createElement("div"))
				.attr("class", "single-game-container last-element-div")
				.text("No more results to show");
			$(games_results_container).append(last_element_container);
		} else if (last_added_game_result_index == -1) {
			// No results found, in general, add a "No results found" text
			// console.log("ACTUALLY: No results found for the current search...");
			if ($(games_results_container).children().length == 0) {
				let last_element_container = $(document.createElement("div"))
					.attr("class", "single-game-container no-results-found-div")
					.text("No results found");
				$(games_results_container).append(last_element_container);
				// Hide the bottom gradient (add class "hide" to the gradient element)
				$(element_selector + " .gradient-bottom").addClass("hide");
			}
		}

	}

	// Update the number of results in the STATE
	STATE["visualization_states"]["GAMES_RANKING"]["current_number_of_results"] += added_results;
	// Update the last added index
	STATE["visualization_states"]["GAMES_RANKING"]["current_last_added_game_result_index"] = current_game_index;

	// Return true if we have added all possible results
	return check_no_possible_games_left(current_number_of_results + added_results) || (added_results == 0 && last_added_game_result_index == -1);

}

/** Contains a list of all arcs (in no particular order), and the associated tag indexes at the 2 ends of the arc, as an object { "tag_index": 0, "other_tag_index": 1, "arc": arc } */
let chord_diagram_arcs = [];
/** Contains all tag indexes as key and for each index a list of objects of the form { "other_tag_index": 0, "arc": arc } */
let chord_diagram_arcs_indexes = {};
/** List of svg groups "g" containing points and texts for each tag of the chord diagram */
let chord_diagram_tag_groups = [];
/** List of circle elements for each tag of the chord diagram */
let chord_diagram_tag_circles = [];
/** List of text elements for the label of each tag of the chord diagram */
let chord_diagram_tags_text_labels = [];
/** Normal font size for the text labels of the chord diagram */
let chord_diagram_normal_text_labels_font_size = 0.8;
/** Font size multiplier for the text labels of the chord diagram when highlighted */
let chord_diagram_text_label_font_size_multiplier_for_highlight = 2;
// Various constants for the chord diagram
let chord_diagram_points_radius = 0.2;
let chord_diagram_point_radius_hover_multiplier = 2.5;
let chord_diagram_arc_stroke_hover_width_multiplier = 2;
let chord_diagram_arcs_stroke_radius_multiplier = 1.125;	// Shouldn't be more than 2 (2 times the point's radius)

/** Contains all tag groups for the mds similarity visualization */
let mds_similarity_tag_groups = [];
/** Contains all tag groups for the t-SNE similarity visualization */
let tsne_similarity_tag_groups = [];

/** Container of the svg element of the chord diagram */
let chord_diagram_svg_container = undefined;
let mds_plot_svg_container = undefined;
let tsne_plot_svg_container = undefined;

/** Creates the "pre-baked" tags similarity visualiations (Chord Diagram, Correlation Matrix, MDS, t-SNE) */
function create_tags_similarity_visualizations() {

	let element_selector = "#visualization-tags-similarity";

	// Add an outer container (contains header and the 4 visualizations container)
	let section_container = $(document.createElement("div"))
		.attr("class", "tags-similarity-outer-container");
	$(element_selector).append(section_container);

	// Add a header div to the visualization
	let visualization_header = $(document.createElement("div"))
		.attr("class", "tags-similarity-header");
	$(section_container).append(visualization_header);

	// Add a div to the visualization to contain the 4 similarity visualizations
	let visualization_content = $(document.createElement("div"))
		.attr("class", "tags-similarity-visualizations-container");
	$(section_container).append(visualization_content);

	// create the 4 containers for the visualizations
	let chord_diagram_container = $(document.createElement("div"))
		.attr("class", "similarity-visualization chord-diagram-container");
	let mds_plot_container = $(document.createElement("div"))
		.attr("class", "similarity-visualization mds-plot-container");
	let tsne_plot_container = $(document.createElement("div"))
		.attr("class", "similarity-visualization tsne-plot-container");
	// let correlation_matrix_container = $(document.createElement("div"))
	// 	.attr("class", "similarity-visualization correlation-matrix-container");
	$(visualization_content).append(chord_diagram_container);
	$(visualization_content).append(mds_plot_container);
	$(visualization_content).append(tsne_plot_container);
	// $(visualization_content).append(correlation_matrix_container);

	let similarity_plots_background_color_hex = "#262629";

	function create_chord_diagram(container_svg) {

		// let whole_chord_diagram_offset_rotation = 45;	// In degrees

		// Create the container "g" group
		let chord_diagram_container = container_svg
			.append("g")
			.attr("class", "chord-diagram-container");

		let unified_margin = 9.5;
		let chord_diagram_margins = {
			top: unified_margin,
			right: unified_margin,
			bottom: unified_margin,
			left: unified_margin
		}

		let chord_diagram_width = 100 - (chord_diagram_margins.left + chord_diagram_margins.right);
		let chord_diagram_height = 100 - (chord_diagram_margins.top + chord_diagram_margins.bottom);

		let tag_names = Object.keys(STATE["all_tags_filter_infos"]);

		let chord_diagram_radius = Math.min(chord_diagram_width, chord_diagram_height) / 2;

		let tag_categories = ["Genres", "Sub-Genres", "Features"];

		// Min similarity value underneath of which the chord is not shown (to avoid showing too many chords)
		// let min_similarity_value = 0.6375;
		let min_similarity_value = 0.5;

		let colors = [];
		for (let i = 0; i < color_scheme["tag_colors"].length; i++) {
			let additional_color_saturation_offset = 0;
			let additional_color_value_offset = 0;
			if (i == 0) {
				// Make the "red" color of genres more visible
				additional_color_saturation_offset = 100;
				additional_color_value_offset = 100;
			}
			let col = offset_saturation_and_value(color_scheme["tag_colors"][i], 10 + additional_color_saturation_offset, 20 + additional_color_value_offset);
			colors.push(col);
		}


		let chord_diagram_inner_container = chord_diagram_container
			.append("g")
			.attr("class", "chord-diagram-inner-container")
			.attr("transform", "translate(" + chord_diagram_margins.left + "," + chord_diagram_margins.top + ")");

		// Create a new container for the paths, hence the arcs (with an origin at center)
		let chord_diagram_paths_container = chord_diagram_inner_container
			.append("g")
			.attr("class", "chord-diagram-paths-container")
			.attr("transform", "translate(" + chord_diagram_radius + "," + chord_diagram_radius + ")");

		// Create a new container for the tag groups
		let chord_diagram_tag_groups_container = chord_diagram_inner_container
			.append("g")
			.attr("class", "chord-diagram-tag-groups-container");


		// Create the highlight circle radial gradient for the tags highlight circles
		// let highlight_color = offset_saturation_and_value(tag_color, -17, 40);
		let highlight_color = offset_saturation_and_value(color_scheme["color_gradient"][color_scheme["color_gradient"].length - 1], -10, 20);
		// Create a radial gradient to fill the highlight circle
		let highlight_circle_gradient = chord_diagram_container
			.append("defs")
			.append("radialGradient")
			.attr("id", "tags-similarity-chord-diagram-tag-highlight-gradient")
			.attr("cx", "50%")
			.attr("cy", "50%")
			.attr("r", "50%");
		highlight_circle_gradient.append("stop")
			.attr("offset", "0%")
			.attr("style", "stop-color:" + highlight_color + ";stop-opacity:0.35");
		highlight_circle_gradient.append("stop")
			.attr("offset", "100%")
			.attr("style", "stop-color:" + highlight_color + ";stop-opacity:0.875");

		// Iterate over tags to construct the matrix
		for (let i = 0; i < tag_names.length; i++) {

			// Create one point for each tag in a circle of radius "radius"
			let angle = 2 * Math.PI * i / tag_names.length - Math.PI / 2;
			let x_coordinate = chord_diagram_radius * Math.cos(angle);
			let y_coordinate = chord_diagram_radius * Math.sin(angle);

			let tag_name = tag_names[i];
			let tag_index = i;

			let tag_category = get_tag_category_by_index(tag_index);
			let tag_category_index = tag_categories.indexOf(tag_category);

			// Create a group to store the tag circle and text label
			let tag_group = chord_diagram_tag_groups_container.append("g")
				.attr("class", "chord-diagram-tag-group")
				.attr("tag-index", i)
				.attr("transform", "translate(" + (x_coordinate + chord_diagram_radius) + "," + (y_coordinate + chord_diagram_radius) + ")");

			// Create the tag circle
			let tag_color = colors[tag_category_index];
			let tag_circle = tag_group.append("circle")
				.attr("class", "chord-diagram-tag-circle")
				.attr("tag-index", i)
				.attr("r", chord_diagram_points_radius)
				.style("fill", tag_color);

			// Create the tag text label (going outside the circle, in the direction given by the angle, such that the text is not upside down)
			// "Music-Based Procedural Generation" is the longest tag name, with 33 characters
			// let max_tag_name_chars = "Music-Based P".length;	// Text will be truncated as "Music-Based P..."
			let max_tag_name_chars = "Mystery Dung".length;	// Text will be truncated as "Mystery Dun..."
			let truncate_text_string = "...";
			let label_text = tag_name;
			if (label_text.length > max_tag_name_chars + 1) label_text = label_text.substring(0, max_tag_name_chars) + truncate_text_string;
			let rotate_angle = angle * 180 / Math.PI;
			if (rotate_angle > 90) rotate_angle -= 180;
			let translate_multiplier = -1;
			let translate_angle = angle * 180 / Math.PI;
			if (translate_angle <= 90 && translate_angle >= -90) translate_multiplier = 1;
			let text_color = offset_saturation_and_value(tag_color, 10, 20);
			let tag_text_label = tag_group.append("text")
				.attr("class", "chord-diagram-tag-text-label no-shadow")
				.attr("tag-index", i)
				.attr("text-anchor", (angle > Math.PI / 2 || angle < -Math.PI / 2) ? "end" : "start")
				.attr("alignment-baseline", "middle")
				.attr("font-size", chord_diagram_normal_text_labels_font_size)
				// .attr("font-weight", "bold")
				.attr("opacity", 1)
				.attr("fill", text_color)
				.attr("stroke", similarity_plots_background_color_hex)
				.attr("stroke-width", 0.25)
				.attr("paint-order", "stroke")
				// .attr("transform", "rotate(" + (angle * 180 / Math.PI) + ") translate(" + (radius + points_radius) + ",0)")
				.attr("transform", "rotate(" + rotate_angle + ") translate(" + (translate_multiplier * chord_diagram_points_radius * 2.75) + ",0)")
				.text(label_text);

			// Create the highlight circle
			let highlight_circle = tag_group.append("circle")
				.attr("class", "highlight-circle")
				.attr("tag-index", i)
				.attr("r", 0)
				.attr("stroke", highlight_color)
				.attr("stroke-width", 0.375)
				.attr("stroke-opacity", 1)
				.attr("fill-opacity", 0.625)
				.attr("opacity", 0)
				.style("fill", "url(#tags-similarity-chord-diagram-tag-highlight-gradient" + ")");

			function check_tag_or_any_linked_tags_are_active(tag_index) {
				let tag_is_active = !get_tag_is_hidden(tag_index);
				let one_active_linked_tag_contains_this_tag = false;
				if (!tag_is_active) {
					if (chord_diagram_arcs_indexes[tag_index] != undefined && chord_diagram_arcs_indexes[tag_index].length > 0) {
						for (let j = 0; j < chord_diagram_arcs_indexes[tag_index].length; j++) {
							let other_index = chord_diagram_arcs_indexes[tag_index][j]["other_tag_index"];
							if (!get_tag_is_hidden(other_index)) {
								one_active_linked_tag_contains_this_tag = true;
								break;
							}
						}
					}
				}
				let showing_this_tag = tag_is_active || one_active_linked_tag_contains_this_tag;
				return showing_this_tag;
			}
			function show_hover_infos_for_tag_group() {
				let showing_this_tag = check_tag_or_any_linked_tags_are_active(tag_index);
				if (showing_this_tag) {
					// console.log("Hovering over active tag " + tag_name);
					// Make the circle bigger
					tag_circle
						.transition()
						.duration(50)
						.attr("r", chord_diagram_points_radius * chord_diagram_point_radius_hover_multiplier);
					// Make the arcs' stroke bigger
					// if (chord_diagram_arcs_indexes[tag_index] != undefined && chord_diagram_arcs_indexes[tag_index].length > 0) {
					// 	let active_arcs = chord_diagram_arcs_indexes[tag_index].map(function (d) { return d["arc"]; });
					// 	active_arcs.forEach(function (arc) {
					// 		arc
					// 			// .transition()
					// 			// .duration(50)
					// 			.style("stroke-width", points_radius * chord_diagram_arcs_stroke_radius_multiplier * chord_diagram_arc_stroke_hover_width_multiplier);
					// 	});
					// }
					// Show a tooltip for the point, showing the tag and the list of most similar tags
					let tag_circle_element = $(tag_circle.node());
					set_tooltip_for_similarity_tag_point(tag_circle_element, tag_name, [-1, undefined]);
				}
			}
			function hide_hover_infos_for_tag_group() {
				// Reset the circle size
				tag_circle
					.transition()
					.duration(50)
					.attr("r", chord_diagram_points_radius);
				// Reset the arcs' stroke size
				// if (chord_diagram_arcs_indexes[tag_index] != undefined && chord_diagram_arcs_indexes[tag_index].length > 0) {
				// 	let active_arcs = chord_diagram_arcs_indexes[tag_index].map(function (d) { return d["arc"]; });
				// 	active_arcs.forEach(function (arc) {
				// 		arc
				// 			.transition()
				// 			.duration(50)
				// 			.style("stroke-width", points_radius * chord_diagram_arcs_stroke_radius_multiplier);
				// 	});
				// }
				// Hide the tooltip
				hide_tooltip();
			}

			// On hover over the point, if the point itself is active (i.e. its tag is NOT in the "exclude" list), make the circle bigger
			tag_group.on("mouseover", function (event) {
				show_hover_infos_for_tag_group();
			});
			tag_group.on("mouseout", function (event) {
				hide_hover_infos_for_tag_group();
				// If the tag is curently being highlighted (i.e. the mouse was down on it), reset the visibility of the tag groups
				if (tag_group.attr("highlighted") == "true") {
					// Remove the "highlighted" attribute from the tag group
					tag_group.attr("highlighted", "false");
					// Reset the visibility of the tag groups
					update_tags_similarity_visualizations();
				}
			});

			// On click and hold over an active point, show only that point and hide the tooltip (on release over one of those points, re-show the same content as for the hover event)
			tag_group.on("mousedown", function (event) {
				// Check if the tag is active
				let showing_this_tag = check_tag_or_any_linked_tags_are_active(tag_index);
				if (showing_this_tag) {
					// console.log("Clicking on active tag " + tag_name);
					// Raise the tag group to the top (to avoid other adjacent tag's text labels to overlap this tag group and therefore make the pointer immediatly exit this tag group to enter the other scaled up tag's label group)
					tag_group.raise();
					// Add the "highlighted" attribute to the tag group
					tag_group.attr("highlighted", "true");
					// Update the visibility of the tag groups to make this tag highlighted
					update_tags_similarity_visualizations([tag_index])
					// Raise the tag group again (for the same reason)
					tag_group.raise();
					// Hide the tooltip
					hide_tooltip();
				}
			});
			tag_group.on("mouseup", function (event) {
				// Check if the tag is active
				let showing_this_tag = check_tag_or_any_linked_tags_are_active(tag_index);
				if (showing_this_tag) {
					// console.log("Releasing click on active tag " + tag_name);
					// Remove the "highlighted" attribute from the tag group
					tag_group.attr("highlighted", "false");
					// Reset the visibility of the tag groups
					update_tags_similarity_visualizations();
					// Show the hover infos
					show_hover_infos_for_tag_group();
				}
			});

			// Add the group to the "chord_diagram_tag_groups" list
			chord_diagram_tag_groups.push(tag_group);

			// Add the circle to the "chord_diagram_tag_circles" list
			chord_diagram_tag_circles.push(tag_circle);

			// Add the tag text label to the "chord_diagram_tags_text_labels" list
			chord_diagram_tags_text_labels.push(tag_text_label);

			// Max possible similarity value for this tag
			// let max_possible_similarity_value = TAGS_SIMILARITY_MATRIX[tag_names[i]][tag_names[i]];

			/** Returns a "path" string (to assing to a "d" attribute of a "path" element) for an arc going from the given start and end angles */
			function get_arc_path_given_start_and_end_angles(start_x, start_y, end_x, end_y) {
				function dist(a, b) {
					return Math.sqrt(
						Math.pow(a[0] - b[0], 2) +
						Math.pow(a[1] - b[1], 2)
					);
				}
				//convert 3 points to an Arc Path
				function calcCirclePath(start, end, mid) {
					const A = dist(end, mid);
					const B = dist(mid, start);
					const C = dist(start, end);
					const angle = Math.acos((A * A + B * B - C * C) / (2 * A * B));
					//calc radius of circle
					const K = .5 * A * B * Math.sin(angle);
					let r = A * B * C / 4 / K;
					r = Math.round(r * 1000) / 1000;
					//large arc flag
					const laf = +(Math.PI / 2 > angle);
					//sweep flag
					const saf = +((end[0] - start[0]) * (mid[1] - start[1]) - (end[1] - start[1]) * (mid[0] - start[0]) < 0);
					return ['M', start, 'A', r, r, 0, laf, saf, end].join(' ');
				}
				// Consider points as arrays of 2 values
				let start_point = [start_x, start_y],
					end_point = [end_x, end_y];
				// Calculate the actual mid point to show (pull the mid point towards the center of the circle)
				let mid_point_x = (start_point[0] + end_point[0]) / 2;
				let mid_point_y = (start_point[1] + end_point[1]) / 2;
				// Calculate the angle of the mid point
				let mid_point_angle = Math.atan2(mid_point_y, mid_point_x);
				// Translate the mid point of a distance of "radius" towards the center of the circle
				let mid_point_distance_from_center = dist([0, 0], [mid_point_x, mid_point_y]);
				let distance_normalized = mid_point_distance_from_center / chord_diagram_radius;	// In range [0,1]
				let translate_distance = (distance_normalized ** 1.4) * chord_diagram_radius;
				// Pull the mid point towards the center of the circle proportionally to the distance between the start and end points
				let start_end_distance = dist(start_point, end_point);
				let start_end_distance_normalized = start_end_distance / (chord_diagram_radius * 2);	// In range [0,1]
				let min_distance = 0.75;
				if (start_end_distance_normalized < min_distance) start_end_distance_normalized = min_distance;
				let max_translate_distance_multiplier = 0.05;
				translate_distance *= (1 - (1 - start_end_distance_normalized) * max_translate_distance_multiplier);
				// let translate_distance = radius / 2;
				let new_mid_point = [
					translate_distance * Math.cos(mid_point_angle),
					translate_distance * Math.sin(mid_point_angle)
				];

				// Return the arc path string
				let path = calcCirclePath(start_point, end_point, new_mid_point);

				return path;

			}

			// // create a group to store all the arcs of the current tag
			// let tag_arcs_group = chord_diagram_paths_container.append("g")
			// 	.attr("class", "chord-diagram-tag-arcs-group")
			// 	.attr("tag-index", i);

			// Add one arc for each other tag
			for (let j = 0; j < tag_names.length; j++) {

				let arc = undefined;

				// Only add the arc for one set of tags (e.g. only for (i,j) and not for (j,i), never for i=j either)
				if (i > j) {

					let other_tag_name = tag_names[j];
					let other_tag_index = j;

					let other_tag_angle = 2 * Math.PI * j / tag_names.length - Math.PI / 2;
					let other_tag_x_coordinate = chord_diagram_radius * Math.cos(other_tag_angle);
					let other_tag_y_coordinate = chord_diagram_radius * Math.sin(other_tag_angle);

					// Equal to the number of games having this tag
					let max_possible_similarity_value = Math.min(TAGS_SIMILARITY_MATRIX[tag_name][tag_name], TAGS_SIMILARITY_MATRIX[other_tag_name][other_tag_name]);
					let similarity_value = TAGS_SIMILARITY_MATRIX[tag_name][other_tag_name] / max_possible_similarity_value;
					if (tag_name == other_tag_name) similarity_value = 1;

					// Only add the arc if the similarity value is above the threshold
					if (similarity_value <= min_similarity_value) continue;

					// Create the arc path
					let arc_path = get_arc_path_given_start_and_end_angles(x_coordinate, y_coordinate, other_tag_x_coordinate, other_tag_y_coordinate);

					// Reverse map the 01 similarity value to a value between [min_similarity_value,1]
					let value_for_color = reverse_interpolate_between_values(min_similarity_value, 1, similarity_value);
					// let gradient_color = get_gradient_color(value_for_color, true);

					let arc_color = tag_color;
					// if the other tag of the arc has more associated games, use its color
					if (TAGS_SIMILARITY_MATRIX[other_tag_name][other_tag_name] > TAGS_SIMILARITY_MATRIX[tag_name][tag_name]) {
						let other_tag_category = get_tag_category_by_index(other_tag_index);
						let other_tag_category_index = tag_categories.indexOf(other_tag_category);
						arc_color = colors[other_tag_category_index];
					}
					let opacity_value = reverse_interpolate_between_values(min_similarity_value, 1, similarity_value);	// in range [0,1]
					let min_opacity = 0.15;
					let max_opacity = 1;
					opacity_value = interpolate_between_values(min_opacity, max_opacity, opacity_value);

					// Create the arc
					arc = chord_diagram_paths_container.append("path")
						.attr("class", "chord-diagram-tag-arc")
						.attr("tag-index", i)
						.attr("other-tag-index", j)
						.attr("d", arc_path)
						.style("fill", "none")
						// .style("stroke", gradient_color)
						.style("stroke", arc_color)
						.style("stroke-width", chord_diagram_points_radius * chord_diagram_arcs_stroke_radius_multiplier)
						// .style("stroke-opacity", similarity_value);
						.style("stroke-opacity", opacity_value);
				}

				// Add the arc to the list of arcs for the current tag and the other tag
				// if (chord_diagram_arcs[i] == undefined) chord_diagram_arcs[i] = [];
				// if (chord_diagram_arcs[j] == undefined) chord_diagram_arcs[j] = [];
				// chord_diagram_arcs[i].push(arc);
				// chord_diagram_arcs[j].push(arc);
				if (arc != undefined) {
					chord_diagram_arcs.push({
						"arc": arc,
						"tag_index": i,
						"other_tag_index": j
						// "this_tag_text_label": tag_text_label,
					});
				}

			}
		}

		// At the end, populate the "chord_diagram_arcs_indexes" list
		for (let i = 0; i < chord_diagram_arcs.length; i++) {
			let index_1 = chord_diagram_arcs[i]["tag_index"];
			let index_2 = chord_diagram_arcs[i]["other_tag_index"];
			if (chord_diagram_arcs_indexes[index_1] == undefined) chord_diagram_arcs_indexes[index_1] = [];
			if (chord_diagram_arcs_indexes[index_2] == undefined) chord_diagram_arcs_indexes[index_2] = [];
			// let other_tag_index_in_arcs_list = chord_diagram_arcs.findIndex(function (d) { return d["tag_index"] == index_2 && d["other_tag_index"] == index_1; });
			// let this_tag_text_label = chord_diagram_arcs[i]["this_tag_text_label"];	// The text label of the tag of the arc
			// let other_tag_text_label = chord_diagram_arcs[other_tag_index_in_arcs_list]["this_tag_text_label"];	// The text label of the other tag of the arc
			chord_diagram_arcs_indexes[index_1].push({
				"other_tag_index": index_2,
				"arc": chord_diagram_arcs[i]["arc"]
				// "other_tag_text_label": other_tag_text_label
			});
			chord_diagram_arcs_indexes[index_2].push({
				"other_tag_index": index_1,
				"arc": chord_diagram_arcs[i]["arc"]
				// "other_tag_text_label": this_tag_text_label
			});
		}

		// Return the created chord diagram container
		return chord_diagram_container;
	}

	/**
	 * Function used to create an svg group "g" containing the MDS or t-SNE visualizations of the tags
	 *
	 * The 2 given function takes as input a tag object (as stored in the TAGS_CATEGORY[category_name][index] list, hence containing "name", "mds": { "x": ..., "y": ... }, ecc...).
	 * They return the x and y coordinates of the tag in range [0,1]
	 *
	 * Appends the created created "g" grouop visualization to the given container_svg, then returns a 2-elements list containing the created "g" group (appended to the "container_svg") 
	 * 		and the list of all svg "g" elements in turn containing the point and name of each tag
	 */
	function create_scatterplot_similarity(container_svg, get_x_coordinate_function, get_y_coordinate_function) {

		// Create the container "g" group
		let scatterplot_container = container_svg
			.append("g")
			.attr("class", "similarity-scatterplot-container");

		let tag_circles_radius = 0.375;
		let tag_elements_font_size = 1.275;
		// Multiplied by the tag radius, this gives the basic translate Y factor for the tag text label
		// let tag_text_label_base_translate_factor = 3.375;
		let tag_text_label_base_translate_factor = 1.375;

		// List containing all svg "g" elements in turn containing the point and name of each tag
		let svg_groups_list = [];

		// Compute the aspect ratio from the container svg width and height
		let container_svg_width = $(container_svg.node().parentNode).width();
		let container_svg_height = $(container_svg.node().parentNode).height();
		let scatterplot_aspect_ratio = container_svg_width / container_svg_height;

		// Create the highlight circle radial gradient for the tags highlight circles
		// let highlight_color = offset_saturation_and_value(tag_color, -17, 40);
		let highlight_color = offset_saturation_and_value(color_scheme["color_gradient"][color_scheme["color_gradient"].length - 1], -10, 20);
		// Create a radial gradient to fill the highlight circle
		let highlight_circle_gradient = scatterplot_container
			.append("defs")
			.append("radialGradient")
			.attr("id", "tags-similarity-" + container_svg.attr("id") + "-scatterplot-tag-highlight-gradient")
			.attr("cx", "50%")
			.attr("cy", "50%")
			.attr("r", "50%");
		highlight_circle_gradient.append("stop")
			.attr("offset", "0%")
			.attr("style", "stop-color:" + highlight_color + ";stop-opacity:0.35");
		highlight_circle_gradient.append("stop")
			.attr("offset", "100%")
			.attr("style", "stop-color:" + highlight_color + ";stop-opacity:0.875");

		// Iterate over all tags (in the order in which tags are stored in the STATE["filtered_tags_info"])
		let tag_categories = ["Genres", "Sub-Genres", "Features"];
		for (let j = 0; j < tag_categories.length; j++) {
			let category_index = tag_categories.length - j - 1;
			for (let i = 0; i < TAGS_BY_CATEGORY[tag_categories[category_index]].length; i++) {

				let index_reverse = TAGS_BY_CATEGORY[tag_categories[category_index]].length - i - 1;

				// let actual_tag_index = j * TAGS_BY_CATEGORY[tag_categories[category_index]].length + i;

				// let tag_object = TAGS_BY_CATEGORY[tag_categories[category_index]][index_reverse];
				let tag_object = TAGS_BY_CATEGORY[tag_categories[category_index]][index_reverse];

				let tag_name = tag_object["name"];

				let actual_tag_index = TAG_NAMES_LIST.indexOf(TAGS_BY_CATEGORY[tag_categories[category_index]][index_reverse]["name"]);

				let tag_category = tag_categories[category_index];

				// Coordinates in range [0,1]
				let tag_x_coordinate = get_x_coordinate_function(tag_object);
				let tag_y_coordinate = get_y_coordinate_function(tag_object);

				// Create a group to store the tag circle and text label
				let tag_group = scatterplot_container.append("g")
					.attr("class", "similarity-scatterplot-tag-group")
					// .attr("tag-name", tag_name)
					// .attr("tag-category", tag_categories[category_index])
					.attr("tag-index", actual_tag_index)
					.attr("transform", "translate(" + (tag_x_coordinate * 100) + "," + (tag_y_coordinate * 100) + ")");

				// Create the tag circle
				let tag_color = offset_saturation_and_value(color_scheme["tag_colors"][category_index], 5, 10);
				let tag_circle = tag_group.append("circle")
					.attr("class", "similarity-scatterplot-tag-circle")
					.attr("tag-index", actual_tag_index)
					.attr("r", tag_circles_radius)
					// Add a transparent stroke to allow for easier hover
					.style("stroke", "transparent")
					.style("stroke-width", tag_circles_radius)
					.style("fill", tag_color)
				// Add a shadow to the circle/bubble
				// .style("filter", "drop-shadow(0 0 0.05em " + color_scheme["viewport_cells"] + "50)");

				// Create the tag text label
				let tag_text_label = tag_group.append("text")
					.attr("class", "similarity-scatterplot-tag-text-label no-shadow")
					.attr("tag-index", actual_tag_index)
					.attr("text-anchor", "middle")
					.attr("alignment-baseline", "hanging")
					.attr("font-size", tag_elements_font_size)
					// .attr("font-weight", 500)
					.attr("letter-spacing", 0.005 + "em")
					.attr("opacity", 0)
					.attr("pointer-events", "none")
					.attr("fill", tag_color)
					.attr("stroke", similarity_plots_background_color_hex)
					.attr("stroke-width", 0.2 + "em")
					.attr("stroke-linecap", "round")
					.attr("paint-order", "stroke")
					.attr("transform", "translate(0," + (tag_circles_radius * tag_text_label_base_translate_factor) + ")")
					.text(tag_name);

				// Create the highlight circle
				let highlight_circle = tag_group.append("circle")
					.attr("class", "highlight-circle")
					.attr("tag-index", i)
					.attr("r", 0)
					.attr("stroke", highlight_color)
					.attr("stroke-width", 0.375)
					.attr("stroke-opacity", 1)
					.attr("fill-opacity", 0.625)
					.attr("opacity", 0)
					.style("fill", "url(#tags-similarity-" + container_svg.attr("id") + "-scatterplot-tag-highlight-gradient" + ")");

				// Raise the tag circle to the top (to avoid the tag text label to overlap the tag circle)
				tag_circle.raise();

				// On hover over the point, show the tooltip (and make the circle bigger)
				let circle_size_hover_multiplier = 1.75;
				tag_circle.on("mouseover", function (event) {
					if (!get_tag_is_hidden(actual_tag_index)) {
						// Make the circle bigger
						let current_circle_size_based_on_zoom = tag_circles_radius * get_zoom_size_multiplier();
						tag_circle
							.transition()
							.duration(50)
							.attr("r", current_circle_size_based_on_zoom * circle_size_hover_multiplier);
						// Move the tag text down after the circle's size has been increased
						tag_text_label
							.transition()
							.duration(50)
							.attr("transform", "translate(0," + (current_circle_size_based_on_zoom * circle_size_hover_multiplier * tag_text_label_base_translate_factor) + ")");
						// Raise the group to the top (to avoid other adjacent tag's text labels to overlap this tag group and therefore make the pointer immediatly exit this tag group to enter the other scaled up tag's label group)
						tag_group.raise();
					}
					// Show a tooltip for the point, showing the tag and the list of most similar tags
					let tag_circle_element = $(tag_circle.node());
					set_tooltip_for_similarity_tag_point(tag_circle_element, tag_name);
				});
				tag_circle.on("mouseout", function (event) {
					// Reset the circle size
					let current_circle_size_based_on_zoom = tag_circles_radius * get_zoom_size_multiplier();
					tag_circle
						.transition()
						.duration(50)
						.attr("r", current_circle_size_based_on_zoom);
					// Move the tag text back up after the circle's size has been decreased
					tag_text_label
						.transition()
						.duration(50)
						.attr("transform", "translate(0," + (current_circle_size_based_on_zoom * tag_text_label_base_translate_factor) + ")");
					// Hide the tooltip
					hide_tooltip();
				});
				tag_circle.on("click", function (event) {
					// Highlight the tag element throughout the visualization
					highlight_tag_throughout_visualizations(tag_name, ["similarity"]);
				});
				tag_circle.on("contextmenu", function (event) {
					// Prevent the context menu to appear
					event.preventDefault();
				});

				// Add the tag group to the list of groups
				svg_groups_list.push(tag_group);
			}

		}

		// Add lines to form an N×N grid to the scatterplot
		let grid_lines_margin = 3;
		let grid_lines_number = 29;
		let grid_lines_stroke_width = 0.1;
		let highlight_grid_lines_every = 7;
		let grid_lines_stoke_color = offset_saturation_and_value(color_scheme["viewport_cells"], 0, 30);
		let grid_lines_secondary_stroke_color = offset_saturation_and_value(color_scheme["viewport_cells"], 0, 20);
		let grid_width = 100 / scatterplot_aspect_ratio - (grid_lines_margin * 2);
		let grid_height = 100 - (grid_lines_margin * 2);
		let grid_lines = [];
		let grid_lines_container = scatterplot_container.append("g")
			.attr("class", "similarity-scatterplot-grid-lines-container")
			.attr("transform", "translate(" + grid_lines_margin + "," + grid_lines_margin + ")");
		for (let i = 0; i < grid_lines_number; i++) {
			let highlight_lines = (i % highlight_grid_lines_every == 0);
			let line_horizontal = grid_lines_container.append("line")
				.attr("class", "similarity-scatterplot-grid-line")
				.attr("x1", 0)
				.attr("y1", (i + 0.5) * (grid_width / grid_lines_number))
				.attr("x2", grid_height)
				.attr("y2", (i + 0.5) * (grid_width / grid_lines_number))
				.attr("stroke", (highlight_lines ? grid_lines_stoke_color : grid_lines_secondary_stroke_color))
				.attr("stroke-width", grid_lines_stroke_width);
			grid_lines.push(line_horizontal);
			let line_vertical = grid_lines_container.append("line")
				.attr("class", "similarity-scatterplot-grid-line")
				.attr("x1", (i + 0.5) * (grid_height / grid_lines_number))
				.attr("y1", 0)
				.attr("x2", (i + 0.5) * (grid_height / grid_lines_number))
				.attr("y2", grid_width)
				.attr("stroke", (highlight_lines ? grid_lines_stoke_color : grid_lines_secondary_stroke_color))
				.attr("stroke-width", grid_lines_stroke_width);
			grid_lines.push(line_vertical);
			if (highlight_lines) {
				line_horizontal.raise();
				line_vertical.raise();
			}
		}

		function get_zoom_size_multiplier() {
			let zoom_factor = STATE["visualization_states"]["TAGS_SIMILARITY"]["scatterplot_zoom_factor"] || 0;	// in range [0,1]
			let zoom_multiplier_clamp_max = 0.625;
			let zoom_factor_clamped = Math.min(zoom_multiplier_clamp_max, zoom_factor);
			let zoom_factor_log = map_linear_to_log_value(zoom_factor_clamped, false, 0.4);	// Still in range [0,1]
			let min_zoom_factor = 100000;	// The higher, the smallest the circles and text labels will be towards the maximum zoom
			let size_multiplier = interpolate_between_values(1 / min_zoom_factor, 1, 1 - zoom_factor_log);
			return size_multiplier;
		}

		// Add zooming functionalities to the scatterplot
		let max_zoom = 20;
		function on_zoom_function(event) {
			// Limit the zoom to the container's width and height
			scatterplot_container.attr("transform", event.transform);
			// Update the zoom factor in the state
			STATE["visualization_states"]["TAGS_SIMILARITY"]["scatterplot_zoom_factor"] = reverse_interpolate_between_values(1, max_zoom, event.transform.k);	// in range [0,1]
			// On zoom, make the circles and text labels smaller, proportional to the zoom level
			let size_multiplier = get_zoom_size_multiplier();
			let new_font_size = tag_elements_font_size * size_multiplier;
			let new_circles_radius = tag_circles_radius * size_multiplier;
			svg_groups_list.forEach(function (group, i) {
				// Update the tag circle 
				let tag_circle = group.select(".similarity-scatterplot-tag-circle");
				tag_circle
					.attr("r", new_circles_radius);
				// Update the tag text label
				let tag_text_label = group.select(".similarity-scatterplot-tag-text-label");
				tag_text_label
					.attr("font-size", new_font_size)
					.attr("transform", "translate(0," + (new_circles_radius * tag_text_label_base_translate_factor) + ")")
					.attr("opacity", get_tag_similarity_scatterplot_text_opacity(i));
			});
			// On zoom, make the grid lines thinner, proportional to the zoom level
			let new_stroke_width = grid_lines_stroke_width * size_multiplier;
			grid_lines.forEach(function (line) {
				line.attr("stroke-width", new_stroke_width);
			});
		}
		let zoom = d3.zoom()
			.scaleExtent([1, max_zoom])
			.translateExtent([[0, 0], [100, 100]])
			.on("zoom", function (event) {
				on_zoom_function(event);
			});
		container_svg.call(zoom);
		// On event "zoom_reset" on the container, reset the zoom level
		container_svg.on("zoom_reset", function (event) {
			// Reset the zoom level
			container_svg.call(zoom.transform, d3.zoomIdentity);
		});
		return [scatterplot_container, svg_groups_list];
	}

	// Create an svg viewbox for each visualization
	chord_diagram_svg_container = d3.select(chord_diagram_container[0])
		.append("svg")
		.attr("id", "chord-diagram-svg")
		.attr("viewBox", "0 0 100 100");
	mds_plot_svg_container = d3.select(mds_plot_container[0])
		.append("svg")
		.attr("id", "mds-plot-svg")
		.attr("viewBox", "0 0 100 100");
	tsne_plot_svg_container = d3.select(tsne_plot_container[0])
		.append("svg")
		.attr("id", "tsne-plot-svg")
		.attr("viewBox", "0 0 100 100");
	// let correlation_matrix_svg = d3.select(correlation_matrix_container[0])
	// 	.append("svg")
	// 	.attr("viewBox", "0 0 100 100");

	// Create the chord diagram
	let chord_diagram_group = create_chord_diagram(chord_diagram_svg_container);

	// Create the MDS plot
	// NOTE: x and y coordinates in each tag object are in range [-1, 1], should be in range [0, 1]
	let mds_coordinates_range_width_portion = 0.975;	// Value in range [0,1], the lower the value, the more margin it will have on the sides
	let mds_plot_returns = create_scatterplot_similarity(
		mds_plot_svg_container,
		function (tag_object) {
			return (tag_object["mds"]["x"] * mds_coordinates_range_width_portion + 1) / 2;
		},
		function (tag_object) {
			return (tag_object["mds"]["y"] * mds_coordinates_range_width_portion + 1) / 2;
		}
	);
	let mds_plot_group = mds_plot_returns[0];
	mds_similarity_tag_groups = mds_plot_returns[1];

	// Create the t-SNE plot
	// NOTE: x and y coordinates in each tag object are in range [-15, 15], should be in range [0, 1]
	let tnse_coordinates_range_width_portion = 0.95;	// Value in range [0,1], the lower the value, the more margin it will have on the sides
	let tsne_plot_returns = create_scatterplot_similarity(
		tsne_plot_svg_container,
		function (tag_object) {
			return (tag_object["tsne"]["x"] * tnse_coordinates_range_width_portion / 15 + 1) / 2;
		},
		function (tag_object) {
			return (tag_object["tsne"]["y"] * tnse_coordinates_range_width_portion / 15 + 1) / 2;
		}
	);
	let tnse_plot_group = tsne_plot_returns[0];
	tsne_similarity_tag_groups = tsne_plot_returns[1];

	// Create the correlation matrix
	// let correlation_matrix_group = create_similarity_matrix(correlation_matrix_svg);
	// For debug, count how many "tag-group" elements are in the matrix
	// console.log("Number of tag-group elements in the correlation matrix: " + correlation_matrix_group.selectAll(".tag-group").size());

	// free d3 selections
	chord_diagram_container = undefined;
	mds_plot_container = undefined;
	tsne_plot_container = undefined;
	// correlation_matrix_container = undefined;

	// In the container, in the header, create a title div with class "similarity-visualization-title"
	let visualization_title = $(document.createElement("div"))
		.attr("class", "similarity-visualization-title alternative-section-title")
		.text("TAGS SIMILARITY");
	visualization_header.append(visualization_title);

	// In the container, in the header, create 3 buttons (divs) to switch between the 3 visualizations
	let visualization_names = ["tsne_plot", "mds_plot", "chord_diagram"];
	let visualization_names_labels = ["t-SNE", "MDS", "Chord"];
	// Create the buttons container inside the header
	let visualization_buttons_container = $(document.createElement("div"))
		.attr("class", "similarity-visualization-buttons-container");
	// Show the tooltip for the visualization button given the visualization name
	function show_tooltip_for_change_visualization_button(visualization_button_element, visualization_name_to_show_tooltip_for) {
		let tooltip_title = "";
		let tooltip_texts = [];
		if (visualization_name_to_show_tooltip_for == "tsne_plot") {
			// Show tooltip for t-SNE button
			tooltip_title = "t-SNE Tags Plot";
			tooltip_texts = [
				"Click to show the t-SNE plot (t-Distributed Stochastic Neighbor Embedding) of the tags' similarity.",
				TOOLTIP_LINE_SEPARATOR,
				"Tags are positioned in a 2D space such that similar tags are likely to be close together.",
				"NOTE: tags which are close together in the plot are not necessarily similar, and vice versa.",
				TOOLTIP_LINE_SEPARATOR,
				"Hover over a point to see the list of most similar tags for the corresponding tag.",
				"The similarity value between 2 tags is the percentage of games that have both tags out of all games that have at least one of the 2 tags."
			];
		} else if (visualization_name_to_show_tooltip_for == "mds_plot") {
			// Show tooltip for MDS button
			tooltip_title = "MDS Tags Plot";
			tooltip_texts = [
				"Click to show the MDS plot (Multi-Dimensional Scaling) of the tags' similarity.",
				TOOLTIP_LINE_SEPARATOR,
				"Tags are positioned in a 2D space as points such that similar tags are likely to be close together.",
				"NOTE: tags which are close together in the plot are not necessarily similar, and vice versa.",
				TOOLTIP_LINE_SEPARATOR,
				"Hover over a point to see the list of most similar tags for the corresponding tag with the associated similarity value.",
				"The similarity value between 2 tags is the percentage of games that have both tags out of all games that have at least one of the 2 tags."
			];
		} else if (visualization_name_to_show_tooltip_for == "chord_diagram") {
			// Show tooltip for chord diagram button
			// Show tooltip for t-SNE button
			tooltip_title = "Tags Chord Diagram";
			tooltip_texts = [
				"Click to show the chord diagram of the tags' similarity.",
				TOOLTIP_LINE_SEPARATOR,
				"Tags are shown as points positioned radially around a circle, in alphabetical order, grouped by category.",
				"Each tag may be linked to other tags with an arc, whose color's hue represents the category of the dominant tag (the one with a higher number of associated games).",
				"The arc's opacity is proportional to the similarity value between the 2 tags.",
				"The similarity value between 2 tags is the percentage of games that have both tags out of all games that have at least one of the 2 tags.",
				TOOLTIP_LINE_SEPARATOR,
				"Hover over a point to see the list of most similar tags for the corresponding tag.",
				"Click onto a point and hold to highlight all of its linked similar tags."
			];
		} else {
			console.log("ERROR: unknown visualization name: " + visualization_name_to_show_tooltip_for);
		}
		set_tooltip(
			visualization_button_element, tooltip_title, tooltip_texts,
			[-1, 1],
			// [0, -0.375]
		);
	}
	// Create the buttons
	for (let i = 0; i < visualization_names.length; i++) {
		let visualization_name = visualization_names[i];
		let visualization_name_label = visualization_names_labels[i];
		let visualization_button = $(document.createElement("div"))
			.attr("class", "similarity-visualization-button")
			.attr("visualization-name", visualization_name)
			.attr("pointer-events", "auto")
			.text(visualization_name_label)
			.on("click", function (event) {
				// Set the clicked visualization as active
				set_active_similarity_visualization(visualization_name);
				// Add class "active" to this button and remove it from any other button
				$(this).addClass("active");
				$(this).siblings().removeClass("active");
				// Trigger a "zoom_reset" event to reset the zoom level of the scatterplot for both the MDS and t-SNE plots
				mds_plot_svg_container.node().dispatchEvent(new Event("zoom_reset"));
				tsne_plot_svg_container.node().dispatchEvent(new Event("zoom_reset"));
			})
			// Show tooltips
			.on("mouseover", function (event) {
				show_tooltip_for_change_visualization_button($(this), visualization_name);
			})
			.on("mouseout", function (event) {
				hide_tooltip();
			});
		// Add the button to the buttons container
		visualization_buttons_container.append(visualization_button);
	}
	// Add the buttons container to the header
	visualization_header.append(visualization_buttons_container);

	// Set the default visualization (t-SNE) as active
	set_active_similarity_visualization("tsne_plot");
	visualization_buttons_container.children().first().addClass("active");

}

/**
 *  Set the given similarity visualization as active
 *
 * The given "similarity_visualization_name" should be one of ["chord_diagram", "mds_plot", "tsne_plot"]
 */
function set_active_similarity_visualization(similarity_visualization_name) {

	// Set the given visualization as active
	STATE["visualization_states"]["TAGS_SIMILARITY"]["active_visualization"] = similarity_visualization_name;

	let visualization_names = ["chord_diagram", "mds_plot", "tsne_plot"];
	let svg_containers = [chord_diagram_svg_container, mds_plot_svg_container, tsne_plot_svg_container];

	for (let i = 0; i < visualization_names.length; i++) {
		let visualization_name = visualization_names[i];
		let svg_container = svg_containers[i];
		if (visualization_name == similarity_visualization_name) {
			// Show the svg container
			svg_container.style("display", "block");
			// Enable pointer events on the container
			$(svg_container.node().parentNode).css("pointer-events", "auto");
		} else {
			// Hide the svg container
			svg_container.style("display", "none");
			// Disable pointer events on the container
			$(svg_container.node().parentNode).css("pointer-events", "none");
		}
	}

	// Reset points visibility
	update_tags_similarity_visualizations();

}

/** Function to call on hover of a point (the tag circle element, given as a jquery element selection) of a visualization of the similarity visualization panel */
function set_tooltip_for_similarity_tag_point(tag_circle_element, tag_name, override_tooltip_position = undefined) {
	let tooltip_title = `
		<div
				style = '
					font-weight: bold;
					display: inline-flex;
					justify-content: space-between;
					min-width: 100%;
					align-items: center;
				'
			>
			<div style='padding-right: 1em'>${tag_name}</div>
			<div
				style='
					font-size: 0.75em;
					background-color: ${tag_circle_element.css("fill")};
					border-radius: 0.25em;
					padding: 0.1em 0.375em;
					filter: drop-shadow(0 0 0.35em #00000015);
				'>
				${STATE["all_tags_filter_infos"][tag_name]["category"]}
			</div>
		</div> `;
	let number_of_games_with_this_tag = TAGS_SIMILARITY_MATRIX[tag_name][tag_name];
	let tooltip_texts = [
		"<div style='opacity: 0.5;'>" + number_of_games_with_this_tag + " games on Steam" + "</div>",
		// TOOLTIP_LINE_SEPARATOR,
		"Most similar tags:"
	];
	let max_number_of_similar_tags = 10;
	let similar_tags = TAGS_SIMILARITY_MATRIX_NORMALIZED[tag_name];
	let similar_tags_names = Object.keys(similar_tags);
	let found_similar_tags = 0;
	let similar_tag_rank = 0;
	for (let i = 0; i < similar_tags_names.length; i++) {
		let similar_tag_name = similar_tags_names[i];
		if (similar_tag_name == tag_name) continue;
		similar_tag_rank++;
		let similarity_value = TAGS_SIMILARITY_MATRIX_NORMALIZED[tag_name][similar_tag_name];
		// if (similarity_value >= min_similarity_value) {
		let similarity_percentage = Math.round(similarity_value * 100);
		let tooltip_text_div =
			"<div style='display: flex; flex-direction: row; justify-content: space-between;'> \
				<div style='display: flex; flex-direction: row; justify-content: flex-start; padding-right: 2em;'> \
					<div style='opacity: 0.5; min-width: 1.35em;'>" + similar_tag_rank + ".</div> \
					<div>" + similar_tag_name + "</div> \
				</div> \
				<div>" + similarity_percentage + "%</div> \
			</div>";
		tooltip_texts.push(tooltip_text_div);
		found_similar_tags++;
		if (found_similar_tags >= max_number_of_similar_tags) break;
		// } else {
		// 	// Tags are sorted by similarity, so if we find a tag with similarity value below the threshold, we can stop
		// 	break;
		// }
	}
	// Show the tooltip
	let optimal_tooltip_position = override_tooltip_position;
	if (override_tooltip_position == undefined) optimal_tooltip_position = calculate_tooltip_optimal_translate_position(tag_circle_element);
	else if (override_tooltip_position[0] == undefined || override_tooltip_position[1] == undefined) {
		let calculated_optimal_tooltip_position = calculate_tooltip_optimal_translate_position(tag_circle_element);
		optimal_tooltip_position = [
			(override_tooltip_position[0] == undefined ? calculated_optimal_tooltip_position[0] : override_tooltip_position[0]),
			(override_tooltip_position[1] == undefined ? calculated_optimal_tooltip_position[1] : override_tooltip_position[1])
		]
	} else {
		optimal_tooltip_position = override_tooltip_position;
	}
	set_tooltip(tag_circle_element, tooltip_title, tooltip_texts, optimal_tooltip_position);
}

/**
 * Checks if a tag is currently hidden in the visualization or not based on the current filters.app-cell
 *
 * If a tag state in the filter is "include" or "neutral", the tag is NOT hidden, otherwise if it is excluded", the tag is considered to be hidden.
 *
 * If a list of active indexes is given, the check is made so that the tag is shown only if its active in the filters AND if it is contained in the active indexes list
 *
 * If "check_only_indexes_from_given_list" is true and a list is given, the check is made only for the tags with indexes in the given list (regardless of the tag state in the filters)
 */
function get_tag_is_hidden(tag_index_to_check, active_indexes_list = undefined, check_only_indexes_from_given_list = true) {
	// if the tag is not excluded from the filters, show its line
	let tag_name = TAG_NAMES_LIST[tag_index_to_check];
	let should_exclude_tag = false;
	if (!(active_indexes_list != undefined && check_only_indexes_from_given_list)) {
		// Check if the tag is in the "exclude" list
		should_exclude_tag = STATE["tags_ranking"]["tags_to_exclude"].has(tag_name);
	}
	if (active_indexes_list != undefined) {
		// Check if the tag is in the active indexes list
		should_exclude_tag = should_exclude_tag || !active_indexes_list.includes(tag_index_to_check);
	}
	return should_exclude_tag;
}

/**
 * Highlights the tag element by making a circle appear around it and gradually scaling it down
 * 
 * If "exclude_visuallizations" is given, the tag is excluded from the given visualizations.active
 * 
 * Values for the "exclude_visuallizations" list are ["ranking", "similarity", "scatterplot"]
 */
function highlight_tag_throughout_visualizations(tag_name, exclude_visualizations = []) {

	// Highlight the tag in the tags ranking
	if (!exclude_visualizations.includes("ranking")) {
		highlight_single_tag_element_in_tags_ranking_by_name(tag_name);
	}

	if (!exclude_visualizations.includes("similarity") || !exclude_visualizations.includes("scatterplot")) {

		// Get tag index
		let tag_index = get_tag_index_by_name(tag_name);

		// Maximum radius for the highlight circle
		let highlight_similarity_circle_max_radius;
		let highlight_similarity_circle_base_opacity = 0.475;
		let highlight_scatterplot_circle_max_radius = 7.5;
		let highlight_scatterplot_circle_base_opacity = 0.6;
		// Valuesd for the highlight circle animations
		let circle_initial_scale_up_duration = 500;
		let circle_stay_at_max_scale_duration = 1000;
		let circle_transition_duration = 2500;
		// Get the highlight circle of the tag in the active similarity visualization
		let similarity_highlight_circle = undefined;
		let active_similarity_visualization = STATE["visualization_states"]["TAGS_SIMILARITY"]["active_visualization"];
		if (active_similarity_visualization == "chord_diagram") {
			// Highlight the tag in the chord diagram
			let tag_group = chord_diagram_tag_groups[tag_index];
			tag_group.raise();
			similarity_highlight_circle = tag_group.select(".highlight-circle");
			highlight_similarity_circle_max_radius = 8.5;
			// Select the
		} else if (active_similarity_visualization == "mds_plot") {
			// Highlight the tag in the MDS plot
			let tag_group = mds_similarity_tag_groups[tag_index];
			tag_group.raise();
			similarity_highlight_circle = tag_group.select(".highlight-circle");
			highlight_similarity_circle_max_radius = 5;
		} else if (active_similarity_visualization == "tsne_plot") {
			// Highlight the tag in the t-SNE plot
			let tag_group = tsne_similarity_tag_groups[tag_index];
			tag_group.raise();
			similarity_highlight_circle = tag_group.select(".highlight-circle");
			highlight_similarity_circle_max_radius = 5;
		}
		// Get the highlight circle of the tag in the tags scatterplot
		let scatterplot_highlight_circle = tags_scatterplot_point_groups_list[tag_index].select(".highlight-circle");
		tags_scatterplot_point_groups_list[tag_index].raise();

		// Function used to animate the given highlight circle
		function animate_highlight_circle(highlight_circle, highlight_circle_max_radius, highlight_circle_base_opacity) {
			// Animate the circle to scale up, wait some seconds and then scal eback down
			highlight_circle
				// Stop any previous transition and start a new one
				.interrupt()
				.attr("r", 0)
				.style("opacity", 0)
			highlight_circle
				// Stop any previous transition and start a new one
				.interrupt()
				// Initial scale up
				.transition()
				.duration(circle_initial_scale_up_duration)
				.ease(d3.easeBackOut)
				.attr("r", highlight_circle_max_radius)
				.style("opacity", highlight_circle_base_opacity)
				// end the animation
				.transition()
				.delay(circle_stay_at_max_scale_duration)
				.duration(circle_transition_duration)
				.ease(d3.easeQuadIn)
				.attr("r", 0)
				.style("opacity", 0);
		}

		// Animate the highlight circle for the similarity visualization
		if (!exclude_visualizations.includes("similarity")) {
			animate_highlight_circle(similarity_highlight_circle, highlight_similarity_circle_max_radius, highlight_similarity_circle_base_opacity);
		}

		// Animate the highlight circle for the tags scatterplot
		if (!exclude_visualizations.includes("scatterplot")) {
			animate_highlight_circle(scatterplot_highlight_circle, highlight_scatterplot_circle_max_radius, highlight_scatterplot_circle_base_opacity);
		}

	}
}

/**
 * Returns the opacity (as a number) to assign to each tag's text label based on whether the tag should be visible or not (i.e. is not excluded), 
 * 		based on how many tags are visible, and also based on the zoom value of the visualization (for semantic zooming)
 */
function get_tag_similarity_scatterplot_text_opacity(tag_index, force_active_tags_indexes_list = undefined) {
	let tag_is_hidden = get_tag_is_hidden(tag_index, force_active_tags_indexes_list);
	if (tag_is_hidden) return 0;	// Tag's text should be invisible if the tag is hidden
	let number_of_visible_tags = TAG_NAMES_LIST.length - STATE["tags_ranking"]["tags_to_exclude"].size;
	if (number_of_visible_tags <= MAX_NUMBER_OF_TAGS_FOR_SHOWING_TAGS_SCATTERPLOTS_TEXT_LABELS) return 1;	// Tag's text should always be visible if there are few tags
	let zoom_factor = STATE["visualization_states"]["TAGS_SIMILARITY"]["scatterplot_zoom_factor"] || 0;
	let start_increasing_opacity_at_zoom = 0.0375;
	let end_increasing_opacity_at_zoom = 0.125;
	let actual_zoom_value = (zoom_factor - start_increasing_opacity_at_zoom) / (end_increasing_opacity_at_zoom - start_increasing_opacity_at_zoom);
	let opacity = interpolate_between_values(0, 1, actual_zoom_value);
	return opacity;	// Tag's text should be more and more visible the more zoomed in the visualization is (semantic zooming)
}

/**
 * Updates the tags similarity groups visibility (in chord, tsne or mds visualizations) based on the current filters.
 *
 * If a list of active indexes is given, the check is made so that the tag is shown only if its active in the filters AND if it is contained in the active indexes list
 */
function update_tags_similarity_visualizations(force_active_tags_indexes_list = undefined) {

	let currently_visualized_similarity_plot = STATE["visualization_states"]["TAGS_SIMILARITY"]["active_visualization"];

	// Opacity of excluded tags' points in the MDS and t-SNE plots
	let scatterplot_group_inactive_opacity = 0.2;
	let chord_diagram_points_inactive_opacity = 0.2;

	let number_of_visible_tags = TAG_NAMES_LIST.length - STATE["tags_ranking"]["tags_to_exclude"].size;

	let tag_elements_colors = get_associated_tag_element_colors();

	if (currently_visualized_similarity_plot == "chord_diagram") {

		// Iterate over all tags and make each tag group's and arcs visible according to the current filters
		for (let i = 0; i < TAG_NAMES_LIST.length; i++) {

			let tag_index = i;
			let current_tag_is_active = !get_tag_is_hidden(tag_index, force_active_tags_indexes_list);

			let current_tag_has_one_active_linked_tag = false;

			let tag_element_color = tag_elements_colors[tag_index];

			// console.log("Tag " + tag_index + " is hidden: " + current_tag_is_hidden);

			// Make the arcs visible / invisible
			let chodr_diagram_arcs_list = chord_diagram_arcs_indexes[tag_index];
			if (chodr_diagram_arcs_list != undefined && chodr_diagram_arcs_list.length > 0) {
				for (let j = 0; j < chodr_diagram_arcs_list.length; j++) {
					let other_tag_index = chodr_diagram_arcs_list[j]["other_tag_index"];
					let arc = chodr_diagram_arcs_list[j]["arc"];
					// let other_tag_text_label = chodr_diagram_arcs_list[j]["other_tag_text_label"];
					// Check if the arc should be visible
					let other_tag_is_active = !get_tag_is_hidden(other_tag_index, force_active_tags_indexes_list);
					if (current_tag_is_active || other_tag_is_active) {
						// Set the opacity to 1
						arc.style("opacity", 1);
					} else {
						// Set the opacity to 0
						arc.style("opacity", 0);
					}
					// Update the "current_tag_has_one_active_linked_tag" variable
					if (other_tag_is_active) {
						current_tag_has_one_active_linked_tag = true;
					}
				}
			}

			// Make the tag group's opacity full/transparent
			let tag_group = chord_diagram_tag_groups[tag_index];
			let tag_text_label = chord_diagram_tags_text_labels[tag_index];
			let tag_circle = chord_diagram_tag_circles[tag_index];
			let tag_font_size_multiplier = 1;
			if (force_active_tags_indexes_list != undefined && force_active_tags_indexes_list.length > 0) tag_font_size_multiplier = chord_diagram_text_label_font_size_multiplier_for_highlight;
			let arcs_width_multiplier = 1;
			if (force_active_tags_indexes_list != undefined && force_active_tags_indexes_list.length > 0) arcs_width_multiplier = chord_diagram_arc_stroke_hover_width_multiplier;
			if (current_tag_is_active || current_tag_has_one_active_linked_tag) {
				// Set tag group and text appearance
				tag_group.style("opacity", 1);
				tag_text_label.style("font-size", chord_diagram_normal_text_labels_font_size * tag_font_size_multiplier);
				// Make the arcs thicker
				if (chord_diagram_arcs_indexes[tag_index] != undefined && chord_diagram_arcs_indexes[tag_index].length > 0) {
					let active_arcs = chord_diagram_arcs_indexes[tag_index].map(function (d) { return d["arc"]; });
					active_arcs.forEach(function (arc) {
						arc
							// .transition()
							// .duration(50)
							.style("stroke-width", chord_diagram_points_radius * chord_diagram_arcs_stroke_radius_multiplier * arcs_width_multiplier);
					});
				}
				// Raise the tag group to the top (to allow for an easier hovering)
				tag_group.raise();
			} else {
				// Reset tag group and text appearance
				tag_group.style("opacity", chord_diagram_points_inactive_opacity);
				tag_text_label.style("font-size", chord_diagram_normal_text_labels_font_size);
				// Reset the arcs thickness
				if (chord_diagram_arcs_indexes[tag_index] != undefined && chord_diagram_arcs_indexes[tag_index].length > 0) {
					let active_arcs = chord_diagram_arcs_indexes[tag_index].map(function (d) { return d["arc"]; });
					active_arcs.forEach(function (arc) {
						arc
							// .transition()
							// .duration(50)
							.style("stroke-width", chord_diagram_points_radius * chord_diagram_arcs_stroke_radius_multiplier);
					});
				}
			}
			// Update the tag circle's color
			// tag_circle.style("fill", tag_element_color);
			// Update the tag text label's color
			// tag_text_label.style("fill", tag_element_color);

		}
	} else if (currently_visualized_similarity_plot == "mds_plot") {

		// Set tag groups of the similarity visualization to visible / invisible according to the current filters
		for (let i = 0; i < mds_similarity_tag_groups.length; i++) {
			let tag_group = mds_similarity_tag_groups[i];
			let tag_index = i;
			let tag_element_color = tag_elements_colors[tag_index];
			let current_tag_is_active = !get_tag_is_hidden(tag_index, force_active_tags_indexes_list);
			let tag_circle = tag_group.select(".similarity-scatterplot-tag-circle");
			let tag_text_label = tag_group.select(".similarity-scatterplot-tag-text-label");
			if (current_tag_is_active) {
				// Raise the tag group to the top (to allow for an easier hovering)
				tag_group.raise();
				// Make the tag group visible
				tag_group.style("opacity", 1);
				// Also show the text label ".similarity-scatterplot-tag-text-label" if the total number of shown tags is below a threshold
				// if (number_of_visible_tags < MAX_NUMBER_OF_TAGS_FOR_SHOWING_TAGS_SCATTERPLOTS_TEXT_LABELS) {
				// 	tag_text_label
				// 		.attr("opacity", 1);
				// } else {
				// 	tag_text_label
				// 		.attr("opacity", 0);
				// }
			} else {
				// Hide the tag group
				tag_group.style("opacity", scatterplot_group_inactive_opacity);
				// Hide the text label
				// tag_text_label
				// 	.attr("opacity", 0);
			}
			// Update the opacity of the tag text label
			let tag_text_label_opacity = get_tag_similarity_scatterplot_text_opacity(tag_index);
			tag_text_label.attr("opacity", tag_text_label_opacity);
			// Set the color of the tag circle and text label
			tag_circle.style("fill", tag_element_color);
			tag_text_label.style("fill", tag_element_color);
		}

	} else if (currently_visualized_similarity_plot == "tsne_plot") {

		// Set tag groups of the similarity visualization to visible / invisible according to the current filters
		for (let i = 0; i < tsne_similarity_tag_groups.length; i++) {
			let tag_group = tsne_similarity_tag_groups[i];
			let tag_index = i;
			let tag_element_color = tag_elements_colors[tag_index];
			let current_tag_is_active = !get_tag_is_hidden(tag_index, force_active_tags_indexes_list);
			let tag_circle = tag_group.select(".similarity-scatterplot-tag-circle");
			let tag_text_label = tag_group.select(".similarity-scatterplot-tag-text-label");
			if (current_tag_is_active) {
				// Raise the tag group to the top (to allow for an easier hovering)
				tag_group.raise();
				// Make the tag group visible
				tag_group.style("opacity", 1);
				// Also show the text label ".similarity-scatterplot-tag-text-label" if the total number of shown tags is below a threshold
				// if (number_of_visible_tags < MAX_NUMBER_OF_TAGS_FOR_SHOWING_TAGS_SCATTERPLOTS_TEXT_LABELS) {
				// 	tag_text_label
				// 		.attr("opacity", 1);
				// } else {
				// 	tag_text_label
				// 		.attr("opacity", 0);
				// }
			} else {
				// Hide the tag group
				tag_group.style("opacity", scatterplot_group_inactive_opacity);
				// Hide the text label
				// tag_text_label
				// 	.attr("opacity", 0);
			}
			// Update the opacity of the tag text label
			let tag_text_label_opacity = get_tag_similarity_scatterplot_text_opacity(tag_index);
			tag_text_label.attr("opacity", tag_text_label_opacity);
			// Set the color of the tag circle and text label
			tag_circle.style("fill", tag_element_color);
			tag_text_label.style("fill", tag_element_color);
		}

	} else {
		console.log("ERROR: unknown similarity visualization name: " + currently_visualized_similarity_plot);
	}

}


/**
 * Function to call on hover of a point (the tag circle element, given as a jquery element selection) of a visualization of the tags scatterplot visualization (NOTE: this is NOT for the MDS or t-SNE scatterplots)
 *
 * If no "override_tag_color" is given, the css attribute "fill" or the css attribute "background-color" of the given tag element is used to get the tag color.
 * 
 * If "use_filtered_games_only_info" is true, the tooltip will show the value for tags based on ALL filters, including filters on tags, rather than just the value of tags based on all filters except tag fiters.
 */
function set_tooltip_for_tags_general_info_element(tag_element, tag_name, override_tag_color = undefined, use_filtered_games_only_info = false) {
	// let tag_index = get_tag_index_by_name(tag_name);
	let tag_color = "";
	let element_color = tag_element.css("fill");
	if (element_color == undefined) element_color = tag_element.css("background-color");
	if (override_tag_color != undefined) {
		tag_color = override_tag_color;
	} else {
		tag_color = element_color;
	}
	// let tag_elements_colors_list = get_associated_tag_element_colors(tag_index);
	// let associated_color = tag_elements_colors_list[tag_index];
	let tooltip_title =
		`<div
				style = '
					font-weight: bold;
					display: inline-flex;
					justify-content: space-between;
					min-width: 100%;
					align-items: center;
				'
			>
			<div style='padding-right: 1em'>${tag_name}</div>
			<div
				style='
					font-size: 0.75em;
					background-color: ${tag_color};
					border-radius: 0.25em;
					padding: 0.1em 0.375em;
					filter: drop-shadow(0 0 0.35em #00000015);
				'>
				${STATE["all_tags_filter_infos"][tag_name]["category"]}
			</div>
		</div>
		`;
	let tag_attributes_to_consider = [
		"number_of_games",
		"total_revenue",
		"average_revenue",
		"total_copies_sold",
		"average_copies_sold",
		"average_review_rating",
		"average_price"
	];
	let tooltip_texts = [];
	for (let i = 0; i < tag_attributes_to_consider.length; i++) {
		let tag_attribute = tag_attributes_to_consider[i];
		let tag_attribute_value = 0;
		if (!use_filtered_games_only_info) tag_attribute_value = STATE["all_tags_filter_infos"][tag_name][tag_attribute];
		else tag_attribute_value = STATE["filtered_results_tags_infos"][tag_attribute][tag_name];
		let tag_attribute_name = tag_attribute.replaceAll("_", " ").charAt(0).toUpperCase() + tag_attribute.replaceAll("_", " ").slice(1);
		let tag_attribute_value_string = get_tag_attribute_value_string(tag_attribute_name, tag_attribute_value);
		// if (tag_attribute == "average_review_rating") tag_attribute_value_string = Math.round(tag_attribute_value * 100) + "%";
		if (use_filtered_games_only_info && tag_attribute == "number_of_games") {
			let percentage_of_all_games = Math.round((tag_attribute_value / STATE["filtered_games"].length) * 10000) / 100;
			tag_attribute_value_string = tag_attribute_value + " (" + percentage_of_all_games + "%)";
		}
		let space_string = "&nbsp;".repeat(13);
		tooltip_texts.push("<div style='display: flex; justify-content: space-between; min-width: 100%'><div>" + tag_attribute_name + ":" + space_string + "</div><div>" + tag_attribute_value_string + "</div></div>");
	}
	// Add a "notice" text at the end of the tooltip
	tooltip_texts.push(TOOLTIP_LINE_SEPARATOR);
	if (!use_filtered_games_only_info) {
		tooltip_texts.push(
			"NOTE: The values for the tag attributes above " + "<br/>"
			+ "are calculated considering games that meet " + "<br/>"
			+ "all the filter criterias while ignoring any active " + "<br/>"
			+ "filter on tags (included/excluded tags filters)."
		);
	} else {
		tooltip_texts.push(
			"NOTE: The values for the tag attributes above " + "<br/>"
			+ "are based on all games that meet ALL the filter" + "<br/>"
			+ "criterias (hence also included/excluded tags).");
	}

	// Show the tooltip
	let optimal_tooltip_position = calculate_tooltip_optimal_translate_position(tag_element);
	set_tooltip(tag_element, tooltip_title, tooltip_texts, optimal_tooltip_position);
}

let tags_scatterplot_container = undefined;
let tags_scatterplot_mouse_move_rect = undefined;

/** List containing the tags scatterplot point groups (i.e. the "g" elements in turn containing the various tag circle, tag name and tag highlight circle elements) */
let tags_scatterplot_point_groups_list = [];

/** Creates the tag's scatterplot visualiation */
function create_tags_scatterplot_visualization() {

	let section_element_selector = "#visualization-tags-scatterplot";

	let section_container = $(section_element_selector + " .content");

	let section_corner_buttons_container = $(section_element_selector + " .buttons-container");

	// Create a section header
	let section_header = $(document.createElement("div"))
		.attr("class", "tags-scatterplot-header");
	// section_container.append(section_header);
	section_corner_buttons_container.prepend(section_header);

	// Create a scatterplot container
	tags_scatterplot_container = $(document.createElement("div"))
		.attr("class", "tags-scatterplot-container");
	section_container.append(tags_scatterplot_container);

	// Create an svg element for the scatterplot
	let scatterplot_svg = d3.select(tags_scatterplot_container[0])
		.append("svg")
		.attr("width", "100%")
		.attr("height", "100%")
		.attr("viewBox", "0 0 100 100")
		.attr("preserveAspectRatio", "xMinYMin meet");

	// Get the size and aspect ratio of the scatterplot container div
	let scatterplot_container_width = tags_scatterplot_container.width();
	let scatterplot_container_height = tags_scatterplot_container.height();
	let scatterplot_aspect_ratio = scatterplot_container_width / scatterplot_container_height;

	// Margins in percentage
	let scatterplot_margins = {
		top: 3.25,
		right: 2,
		bottom: 7,
		left: 6
	};

	// Compute the scatterplot width and height
	let scatterplot_width = (100 - (scatterplot_margins.left + scatterplot_margins.right)) * scatterplot_aspect_ratio;
	let scatterplot_height = 100 - (scatterplot_margins.top + scatterplot_margins.bottom);

	// console.log("scatterplot_container_width: " + scatterplot_container_width + ", scatterplot_container_height: " + scatterplot_container_height);
	// console.log("scatterplot_width: " + scatterplot_width + ", scatterplot_height: " + scatterplot_height);
	// console.log("scatterplot_aspect_ratio: " + scatterplot_aspect_ratio);

	// Create a scatterplot container "g" group
	let scatterplot_group = scatterplot_svg
		.append("g")
		.attr("class", "tags-scatterplot-group")
		.attr("transform", "translate(" + scatterplot_margins.left * scatterplot_aspect_ratio + "," + scatterplot_margins.top + ")");

	let axes_stroke_width = 0.5;
	let axes_color = color_scheme["white"];

	// Create the scatterplot axes (x and y, no labels for now, no ranges, just svg elements resembling axes)
	let scatterplot_axes_group = scatterplot_group
		.append("g")
		.attr("class", "tags-scatterplot-axes-group");
	// Create the x axis
	let scatterplot_x_axis = scatterplot_axes_group
		.append("line")
		.attr("class", "tags-scatterplot-x-axis")
		.attr("x1", 0)
		.attr("y1", scatterplot_height)
		.attr("x2", scatterplot_width)
		.attr("y2", scatterplot_height)
		.attr("stroke-width", axes_stroke_width)
		.attr("stroke", axes_color);
	// Create the y axis
	let scatterplot_y_axis = scatterplot_axes_group
		.append("line")
		.attr("class", "tags-scatterplot-y-axis")
		.attr("x1", 0)
		.attr("y1", 0)
		.attr("x2", 0)
		.attr("y2", scatterplot_height)
		.attr("stroke-width", axes_stroke_width)
		.attr("stroke", axes_color);

	// Create a container for the points
	let tags_scatterplot_points_container = scatterplot_group
		.append("g")
		.attr("class", "tags-scatterplot-points-container");

	let points_min_radius = 0.5;
	let points_max_radius = 2;

	let point_tags_font_size = 2;

	// Use a transparent padding with this stroke to ease hovering
	// NOTE: we can't do this here as the circle is always shown with an actual radius around it to ease hovering
	// let circle_padding_stroke_width = 0.1;

	let bubble_stroke_width = 0.4;

	let categories_list = ["Genres", "Sub-Genres", "Features"];


	// Create the highlight circle radial gradient for the tags highlight circles
	// let highlight_color = offset_saturation_and_value(tag_color, -17, 40);
	let highlight_color = offset_saturation_and_value(color_scheme["color_gradient"][color_scheme["color_gradient"].length - 1], -10, 20);
	// Create a radial gradient to fill the highlight circle
	let highlight_circle_gradient = scatterplot_svg
		.append("defs")
		.append("radialGradient")
		.attr("id", "tags-scatterplot-tag-highlight-gradient")
		.attr("cx", "50%")
		.attr("cy", "50%")
		.attr("r", "50%");
	highlight_circle_gradient.append("stop")
		.attr("offset", "0%")
		.attr("style", "stop-color:" + highlight_color + ";stop-opacity:0.35");
	highlight_circle_gradient.append("stop")
		.attr("offset", "100%")
		.attr("style", "stop-color:" + highlight_color + ";stop-opacity:0.875");

	// Create one point for each tag, without setting their positions yet
	for (let i = 0; i < TAG_NAMES_LIST.length; i++) {

		let tag_index = i;
		let tag_name = TAG_NAMES_LIST[tag_index];

		let tag_category = get_tag_category_by_index(tag_index);
		let category_index = categories_list.indexOf(tag_category);

		// Create a group for the current tag
		let tag_group = tags_scatterplot_points_container
			.append("g")
			.attr("class", "tags-scatterplot-tag-group")
			.attr("tag-index", tag_index);

		// Add a circle to the group
		let tag_circle_radius = points_min_radius;
		let tag_color = offset_saturation_and_value(color_scheme["tag_colors"][category_index], 0, 5);
		let tag_circle = tag_group
			.append("circle")
			.attr("class", "tags-scatterplot-tag-circle")
			.attr("r", tag_circle_radius)
			.attr("fill", tag_color)
			.attr("fill-opacity", 0.5)
			.attr("stroke", tag_color)
			.attr("stroke-width", bubble_stroke_width)
		// .attr("stroke-width", circle_padding_stroke_width);
		// Add a slight shadow to the scatterplot circle
		// .attr("filter", "drop-shadow(0 0 0.05em " + color_scheme["viewport_cells"] + "30)")

		// Add the highlight circle to the group
		let highlight_circle = tag_group.append("circle")
			.attr("class", "highlight-circle")
			.attr("tag-index", i)
			.attr("r", 0)
			.attr("stroke", highlight_color)
			.attr("stroke-width", 0.375)
			.attr("stroke-opacity", 1)
			.attr("fill-opacity", 0.75)
			.attr("opacity", 0)
			.style("fill", "url(#tags-scatterplot-tag-highlight-gradient" + ")");

		// Add a text label to the group
		let tag_text_label = tag_group
			.append("text")
			.attr("class", "tags-scatterplot-tag-text-label no-shadow")
			.attr("x", 0)
			// NOTE: the y position of the tag label should be updated when the tag's radius is defined, therefore it is not set here
			// .attr("y", tag_circle_radius * 3.5)
			.attr("text-anchor", "middle")
			.attr("font-size", point_tags_font_size)
			.attr("fill", tag_color)
			.attr("opacity", 0)
			.attr("pointer-events", "none")
			.text(tag_name);

		// Add the group to the list
		tags_scatterplot_point_groups_list.push(tag_group);
	}

	/**
	 * Given x axis and y axis ranges in the form [min, max], and given the number of thicks to show on each axis, sets the axes thicks
	 *
	 * If use_log_scale_x or use_log_scale_y are true, the thicks are set in a logarithmic scale for the corresponding axis
	 */
	function set_axes_ticks(x_axis_range, y_axis_range, use_log_scale_x = false, use_log_scale_y = false, x_axis_num_of_thicks = 15, y_axis_num_of_thicks = 9) {

		// Clear any previous thicks
		scatterplot_axes_group.select(".tags-scatterplot-axes-thicks-container").remove();
		scatterplot_axes_group.select(".tags-scatterplot-axes-grid-container").remove();

		let thicks_font_size = 3;

		if (use_log_scale_x) x_axis_num_of_thicks = Math.ceil(x_axis_num_of_thicks / 2);
		if (use_log_scale_y) y_axis_num_of_thicks = Math.ceil(y_axis_num_of_thicks / 2);

		let thick_default_size = 1.625;

		// Create a container for the actual axes ticks and labels
		let axes_ticks_container = scatterplot_axes_group
			.append("g")
			.attr("class", "tags-scatterplot-axes-thicks-container");

		// Create a container for the grid
		let grid_opacity = 0.15;
		let axes_grid_container = scatterplot_axes_group
			.append("g")
			.attr("class", "tags-scatterplot-axes-grid-container")
			.attr("opacity", grid_opacity)
			.attr("pointer-events", "none");

		// Create the x axis thicks objects list
		let x_axis_thicks = [];
		for (let i = 0; i < x_axis_num_of_thicks; i++) {
			let value = i / (x_axis_num_of_thicks - 1);	// Value in range [0,1]
			let value_log_mapped = value;
			if (use_log_scale_x) value_log_mapped = map_linear_to_log_value(value, true);
			let tick_value = interpolate_between_values(x_axis_range[0], x_axis_range[1], value_log_mapped);
			let tick_pos_x = value * scatterplot_width;
			x_axis_thicks.push({
				"value": tick_value,
				"pos_x": tick_pos_x,
				"show_text": true
			});
			// Add 10 more thicks in the middle of the range, if the log scale is used
			if (use_log_scale_x && i > 0) {
				let additional_ticks = 10;	// Should actually show only 8 ticks in the middle
				for (let j = 1; j < additional_ticks - 1; j++) {
					let mid_value = j / (additional_ticks - 1);	// Value in range [0,1]
					let mid_value_log_mapped = map_linear_to_log_value(mid_value);	// Value in range [0,1]
					// let tick_mid_value = interpolate_between_values(x_axis_range[0], x_axis_range[1], mid_value_log_mapped);
					let tick_mid_pos_x = (value + (mid_value_log_mapped - 1) / (additional_ticks - 1)) * scatterplot_width;
					x_axis_thicks.push({
						"value": "",
						"pos_x": tick_mid_pos_x,
						"show_text": false
					});
				}
			}
		}
		// Create the y axis thicks objects list
		let y_axis_thicks = [];
		for (let i = 0; i < y_axis_num_of_thicks; i++) {
			let value = i / (y_axis_num_of_thicks - 1);	// Value in range [0,1]
			let value_log_mapped = value;
			if (use_log_scale_y) value_log_mapped = map_linear_to_log_value(value, true);
			let tick_value = interpolate_between_values(y_axis_range[0], y_axis_range[1], value_log_mapped);
			let tick_pos_y = (1 - value) * scatterplot_height;
			y_axis_thicks.push({
				"value": tick_value,
				"pos_y": tick_pos_y,
				"show_text": true
			});
			// Add 10 more thicks in the middle of the range, if the log scale is used
			if (use_log_scale_y && i > 0) {
				let additional_ticks = 10;	// Should actually show only 8 ticks in the middle
				for (let j = 1; j < additional_ticks - 1; j++) {
					let mid_value = j / (additional_ticks - 1);	// Value in range [0,1]
					let mid_value_log_mapped = map_linear_to_log_value(mid_value);	// Value in range [0,1]
					// let tick_mid_value = interpolate_between_values(y_axis_range[0], y_axis_range[1], mid_value_log_mapped);
					let tick_mid_pos_y = ((1 - value) - (mid_value_log_mapped - 1) / (additional_ticks * (1 / 3))) * scatterplot_height;
					y_axis_thicks.push({
						"value": "",
						"pos_y": tick_mid_pos_y,
						"show_text": false
					});
				}
			}
		}

		// Create the x axis thicks
		let x_axis_ticks_group = axes_ticks_container
			.append("g")
			.attr("class", "tags-scatterplot-x-axis-thicks-group");
		for (let i = 0; i < x_axis_thicks.length; i++) {
			let x_axis_thick = x_axis_thicks[i];
			let thick_size = thick_default_size;
			if (!x_axis_thick["show_text"]) thick_size *= 0.625;
			// Create the x axis thick
			let x_axis_thick_element = x_axis_ticks_group
				.append("line")
				.attr("class", "tags-scatterplot-axis-thick")
				.attr("x1", x_axis_thick["pos_x"])
				.attr("y1", scatterplot_height)
				.attr("x2", x_axis_thick["pos_x"])
				.attr("y2", scatterplot_height + thick_size)
				.attr("stroke-width", axes_stroke_width)
				.attr("stroke", axes_color);
			// Create the x axis thick text label
			if (x_axis_thick["show_text"]) {
				let x_axis_thick_text_label = x_axis_ticks_group
					.append("text")
					.attr("class", "tags-scatterplot-axis-thick-text-label")
					.attr("x", x_axis_thick["pos_x"])
					.attr("y", scatterplot_height + thick_size * 1.75)
					.attr("text-anchor", "middle")
					.attr("alignment-baseline", "hanging")
					.attr("font-size", thicks_font_size)
					.attr("fill", axes_color)
					.text(format_number_string(x_axis_thick["value"], 1));
			}
			// Create the x axis grid lines
			if (i != 0) {
				let x_axis_grid_line = axes_grid_container
					.append("line")
					.attr("class", "tags-scatterplot-axis-grid-line")
					.attr("x1", x_axis_thick["pos_x"])
					.attr("y1", 0)
					.attr("x2", x_axis_thick["pos_x"])
					.attr("y2", scatterplot_height)
					.attr("stroke-width", axes_stroke_width * (x_axis_thick["show_text"] ? 1 : 0.25))
					// .attr("stroke-opacity", (x_axis_thick["show_text"] ? 1 : 0.5))
					.attr("stroke", axes_color);
			}

		}
		// Create the y axis thicks
		let y_axis_ticks_group = axes_ticks_container
			.append("g")
			.attr("class", "tags-scatterplot-y-axis-thicks-group");
		for (let i = 0; i < y_axis_thicks.length; i++) {
			let y_axis_thick = y_axis_thicks[i];
			let thick_size = thick_default_size;
			if (!y_axis_thick["show_text"]) thick_size *= 0.625;
			// Create the y axis thick
			let y_axis_thick_element = y_axis_ticks_group
				.append("line")
				.attr("class", "tags-scatterplot-axis-thick")
				.attr("x1", 0)
				.attr("y1", y_axis_thick["pos_y"])
				.attr("x2", -1 * thick_size)
				.attr("y2", y_axis_thick["pos_y"])
				.attr("stroke-width", axes_stroke_width)
				.attr("stroke", axes_color);
			// Create the y axis thick text label
			if (y_axis_thick["show_text"]) {
				let y_axis_thick_text_label = y_axis_ticks_group
					.append("text")
					.attr("class", "tags-scatterplot-axis-thick-text-label")
					.attr("x", -1.75 * thick_size)
					.attr("y", y_axis_thick["pos_y"])
					.attr("text-anchor", "end")
					.attr("alignment-baseline", "middle")
					.attr("font-size", thicks_font_size)
					.attr("fill", axes_color)
					.text(format_number_string(y_axis_thick["value"], 1));
			}
			// Create the y axis grid line
			if (i != 0) {
				let y_axis_grid_line = axes_grid_container
					.append("line")
					.attr("class", "tags-scatterplot-axis-grid-line")
					.attr("x1", 0)
					.attr("y1", y_axis_thick["pos_y"])
					.attr("x2", scatterplot_width)
					.attr("y2", y_axis_thick["pos_y"])
					.attr("stroke-width", axes_stroke_width * (y_axis_thick["show_text"] ? 1 : 0.25))
					// .attr("stroke-opacity", (y_axis_thick["show_text"] ? 1 : 0.5))
					.attr("stroke", axes_color);
			}
		}
		// Lower the axes ticks and grid containers
		axes_ticks_container.lower();
		axes_grid_container.lower();

	}

	/**
	 * Given the position coordinates x and y (in range [0,1], with [0,0] being the bottom left corner and [1,1] being the top right) returns an object {"x": ..., "y": ...} with the actual values for the given x and y coordiantes
	 */
	function get_coordinates_attribute_value_from_given_position(position_x, position_y) {
		// Given an axis ("x" or "y") and a value in range [0,1], returns the corresponding coordinate attribute value (in range [0,1])
		// Also takes into account the log scale if needed

		// Set or get the x and y axis attributes and radius encoding attribute
		let x_axis_attribute_name = STATE["visualization_states"]["TAGS_SCATTERPLOT"]["x_axis_attribute"];
		let y_axis_attribute_name = STATE["visualization_states"]["TAGS_SCATTERPLOT"]["y_axis_attribute"];
		// let radius_encoding_attribute_name = STATE["visualization_states"]["TAGS_SCATTERPLOT"]["radius_attribute"];
		let using_log_scale_x_axis = STATE["visualization_states"]["TAGS_SCATTERPLOT"]["use_x_axis_log_scale"];
		let using_log_scale_y_axis = STATE["visualization_states"]["TAGS_SCATTERPLOT"]["use_y_axis_log_scale"];

		let default_axes_padding = 0.025;
		// Set the max values
		let x_max_value = STATE["tag_global_infos"]["max_" + x_axis_attribute_name] * (1 + default_axes_padding);
		let y_max_value = STATE["tag_global_infos"]["max_" + y_axis_attribute_name] * (1 + default_axes_padding);
		// Set the max values to 100 if the attribute is "average_review_rating" (since it is in range [0,1])
		if (x_axis_attribute_name == "average_review_rating") x_max_value = STATE["tag_global_infos"]["max_" + x_axis_attribute_name] * 100;
		if (y_axis_attribute_name == "average_review_rating") y_max_value = STATE["tag_global_infos"]["max_" + y_axis_attribute_name] * 100;
		// Set the axes range
		let x_axis_range = [0, x_max_value];
		let y_axis_range = [0, y_max_value];

		// If the axes ranges have a max value of 0, set it to 1
		if (x_axis_range[1] == 0) x_axis_range[1] = 1;
		if (y_axis_range[1] == 0) y_axis_range[1] = 1;

		// Get the x and y coordinates
		let x_coordinate = position_x;
		let y_coordinate = position_y;

		// Remap the x and y coordinates to log scale if needed
		if (using_log_scale_x_axis) x_coordinate = map_linear_to_log_value(x_coordinate, true);
		if (using_log_scale_y_axis) y_coordinate = map_linear_to_log_value(y_coordinate, true);

		// Remap the x and y coordinates to the range of the x and y axes
		let x_coordinate_value = interpolate_between_values(x_axis_range[0], x_axis_range[1], x_coordinate);
		let y_coordinate_value = interpolate_between_values(y_axis_range[0], y_axis_range[1], y_coordinate);

		return {
			"x": x_coordinate_value,
			"y": y_coordinate_value
		};

	}

	/**
	 * Function to set all the tags scatterplot's points position and radius based on the given functions
	 *
	 * Also sets the tooltip to show for the tag circle element
	 *
	 * The "get_x_coordinate_function" and "get_y_coordinate_function" should be functions that take a tag object as input and return a value in range [0, 1] (always in linear scale)
	 *
	 * The "get_radius_value_function" should be a function that takes a tag object as input and returns a value in range [0, 1] (always in linear scale)
	 *
	 * If use_log_scale_x and/or use_log_scale_y are true, the x and/or y coordinates are set in a logarithmic scale
	 *
	 * The x_range, y_range and radius_range are ranges of the form [min,max] that represent the minimum and maximum values of the x and y coordinates and radius values (in linear scale)
	 */
	function set_tags_scatterplot_points(
		get_x_coordinate_function,
		get_y_coordinate_function,
		get_radius_value_function,
		use_log_scale_x = false,
		use_log_scale_y = false
	) {

		let tags_inactive_opacity = 0.25;

		let number_of_active_tags = TAG_NAMES_LIST.length - STATE["tags_ranking"]["tags_to_exclude"].size;
		let show_tags_labels = number_of_active_tags < MAX_NUMBER_OF_TAGS_FOR_SHOWING_TAGS_SCATTERPLOTS_TEXT_LABELS;

		// Get tags scatterplot points colors
		let tags_colors = get_associated_tag_element_colors();

		// Set the position and radius of each tag point
		for (let i = 0; i < tags_scatterplot_point_groups_list.length; i++) {

			let tag_group = tags_scatterplot_point_groups_list[i];
			let tag_index = i;
			let tag_name = TAG_NAMES_LIST[tag_index];

			let tag_is_active = !get_tag_is_hidden(tag_index);

			// Get the tag object
			let tag_object = STATE["all_tags_filter_infos"][tag_name];

			// Get the x and y coordinates for the current tag
			let x_coordinate = get_x_coordinate_function(tag_object);
			let y_coordinate = get_y_coordinate_function(tag_object);

			// Remap the x and y coordinates to log scale if needed
			if (use_log_scale_x) x_coordinate = map_linear_to_log_value(x_coordinate);
			if (use_log_scale_y) y_coordinate = map_linear_to_log_value(y_coordinate);

			// Revert the y coordinate (since the y axis is inverted)
			y_coordinate = 1 - y_coordinate;

			// Get the radius value for the current tag
			let radius_value = get_radius_value_function(tag_object);

			// Get the radius for the current tag
			let min_radius_value = 0.2;
			let max_radius_value = 4;
			let tag_circle_radius = min_radius_value + radius_value * (max_radius_value - min_radius_value);

			let tag_circle = tag_group.select(".tags-scatterplot-tag-circle");
			let tag_text_label = tag_group.select(".tags-scatterplot-tag-text-label");

			let associated_tag_color = tags_colors[tag_index];

			// Update the tag circle
			tag_circle
				.transition()
				.duration(150)
				.attr("r", tag_circle_radius)
				// NOTE: fill opacity is already set by the "fill-opacity" attribute, no need to add opacity with an "...AA" part in the color string for the fill color
				.attr("fill", associated_tag_color)
				.attr("stroke", associated_tag_color);

			// Update the tag text label
			tag_text_label
				.transition()
				.duration(150)
				.attr("y", tag_circle_radius + 2.25)
				.attr("opacity", (show_tags_labels && tag_is_active ? 1 : 0));

			// Set the tag group's position
			let tag_group_pos_x = x_coordinate * scatterplot_width;
			let tag_group_pos_y = y_coordinate * scatterplot_height;
			tag_group
				.transition()
				.duration(150)
				.attr("transform", "translate(" + tag_group_pos_x + "," + tag_group_pos_y + ")")
				.attr("opacity", (tag_is_active ? 1 : tags_inactive_opacity));

			// Raise the tag group to the top (to allow for an easier hovering) if it is active
			if (tag_is_active) tag_group.raise();

			// Add a tooltip to the group
			tag_circle
				.on("mouseover", function (event) {
					// if (!tag_is_active) return;
					// Check if brushing
					let brushing = tags_scatterplot_mouse_move_rect != undefined && tags_scatterplot_mouse_move_rect.classed("brushing");
					// If NOT currently brusning over the mouse hover rect of the scatterplot (i.e. mouse hover rect does not have class "brushing"), set the tooltip for the element
					if (!brushing) {
						// Set the tooltip for the element
						set_tooltip_for_tags_general_info_element($(tag_circle.node()), tag_name);
						// Raise the tag group to the top (to allow for an easier hovering)
						if (tag_is_active) tag_group.raise();
					}
					// Scale up the tag circle and translate text label down
					let scale_up_multiplier = interpolate_between_values(1, 1.5, 1 - radius_value)
					tag_circle
						// .transition()
						// .duration(15)
						.attr("r", tag_circle_radius * scale_up_multiplier);
					tag_text_label
						// .transition()
						// .duration(15)
						.attr("y", tag_circle_radius * scale_up_multiplier + 2.25);
				})
				.on("mouseout", function (event) {
					// if (!tag_is_active) return;
					// Set the tooltip for the element
					hide_tooltip();
					// Scale down the tag circle and translate text label up
					tag_circle
						// .transition()
						// .duration(15)
						.attr("r", tag_circle_radius);
					tag_text_label
						// .transition()
						// .duration(15)
						.attr("y", tag_circle_radius + 2.25);
					// Lower the tag to allow to possibly hover over another tag that is closeby
					if (STATE["tags_ranking"]["tags_to_exclude"].size == 0 && tag_is_active) tag_group.lower();
				})
				.on("click", function (event) {
					// Highlight the tag element throughout the visualization
					highlight_tag_throughout_visualizations(tag_name, ["scatterplot"]);
				})
				.on("contextmenu", function (event) {
					// Prevent default
					event.preventDefault();
				});
		}

	}

	/**
	 * Sets the axes and radius encodings for the tags scatterplot visualizations, resetting the points positions and radius
	 *
	 * Pass the "radius_encoding_attribute_name" as "none" to not use any radius encoding (show default radius for all tags)
	 *
	 * Also sets the log scale for the axes if needed
	 *
	 * Updates the STATE variable at the end
	 *
	 * Pass any of its arguments as undefined to use the current value for that parameter (stored in the STATE variable)
	 */
	function set_tags_scatterplot_visualization(
		x_axis_attribute_name = undefined,
		y_axis_attribute_name = undefined,
		radius_encoding_attribute_name = undefined,
		use_log_scale_x_axis = undefined,
		use_log_scale_y_axis = undefined
	) {

		// Set or get the x and y axis attributes and radius encoding attribute
		if (x_axis_attribute_name == undefined) x_axis_attribute_name = STATE["visualization_states"]["TAGS_SCATTERPLOT"]["x_axis_attribute"];
		else STATE["visualization_states"]["TAGS_SCATTERPLOT"]["x_axis_attribute"] = x_axis_attribute_name;
		if (y_axis_attribute_name == undefined) y_axis_attribute_name = STATE["visualization_states"]["TAGS_SCATTERPLOT"]["y_axis_attribute"];
		else STATE["visualization_states"]["TAGS_SCATTERPLOT"]["y_axis_attribute"] = y_axis_attribute_name;
		if (radius_encoding_attribute_name == undefined) radius_encoding_attribute_name = STATE["visualization_states"]["TAGS_SCATTERPLOT"]["radius_attribute"];
		else STATE["visualization_states"]["TAGS_SCATTERPLOT"]["radius_attribute"] = radius_encoding_attribute_name;
		if (use_log_scale_x_axis == undefined) use_log_scale_x_axis = STATE["visualization_states"]["TAGS_SCATTERPLOT"]["use_x_axis_log_scale"];
		else STATE["visualization_states"]["TAGS_SCATTERPLOT"]["use_x_axis_log_scale"] = use_log_scale_x_axis;
		if (use_log_scale_y_axis == undefined) use_log_scale_y_axis = STATE["visualization_states"]["TAGS_SCATTERPLOT"]["use_y_axis_log_scale"];
		else STATE["visualization_states"]["TAGS_SCATTERPLOT"]["use_y_axis_log_scale"] = use_log_scale_y_axis;

		// console.log("Setting tags scatterplot visualization with x axis attribute:\n" + x_axis_attribute_name + ", y axis attribute: " + y_axis_attribute_name + ", radius encoding attribute: " + radius_encoding_attribute_name + ", use log scale x axis: " + use_log_scale_x_axis + ", use log scale y axis: " + use_log_scale_y_axis);

		let default_axes_padding = 0.1;
		// Set the max values
		let x_max_value = STATE["tag_global_infos"]["max_" + x_axis_attribute_name] * (1 + default_axes_padding);
		let y_max_value = STATE["tag_global_infos"]["max_" + y_axis_attribute_name] * (1 + default_axes_padding);
		// Set the max values to 100 if the attribute is "average_review_rating" (since it is in range [0,1])
		if (x_axis_attribute_name == "average_review_rating") x_max_value = STATE["tag_global_infos"]["max_" + x_axis_attribute_name] * 100;
		if (y_axis_attribute_name == "average_review_rating") y_max_value = STATE["tag_global_infos"]["max_" + y_axis_attribute_name] * 100;
		// Set the axes range
		let x_axis_range = [0, x_max_value];
		let y_axis_range = [0, y_max_value];

		// If the axes ranges have a max value of 0, set it to 1
		if (x_axis_range[1] == 0) x_axis_range[1] = 1;
		if (y_axis_range[1] == 0) y_axis_range[1] = 1;

		// Set the axes thicks
		set_axes_ticks(
			x_axis_range,
			y_axis_range,
			use_log_scale_x_axis,
			use_log_scale_y_axis
		);

		/** Retuns a value in [0,1] given a tag object and a tag attribute name */
		function get_value_for_tag_attribute(tag_object, tag_attribute_name, axes_padding_to_use = 0) {
			let max_attribute_value = STATE["tag_global_infos"]["max_" + tag_attribute_name];
			if (max_attribute_value > 0) {
				return tag_object[tag_attribute_name] / (max_attribute_value * (1 + (axes_padding_to_use ? default_axes_padding : 0)));
			} else {
				return 0;
			}
		}

		// Set the tag points position and radius
		set_tags_scatterplot_points(
			function (tag_object) {
				// return tag_object[x_axis_attribute_name] / (STATE["tag_global_infos"]["max_" + x_axis_attribute_name] * (1 + axes_padding));
				return get_value_for_tag_attribute(tag_object, x_axis_attribute_name, default_axes_padding);
			},
			function (tag_object) {
				// return tag_object[y_axis_attribute_name] / (STATE["tag_global_infos"]["max_" + y_axis_attribute_name] * (1 + axes_padding));
				return get_value_for_tag_attribute(tag_object, y_axis_attribute_name, default_axes_padding);
			},
			function (tag_object) {
				if (radius_encoding_attribute_name == "none") return 0.0375;
				// return tag_object[radius_encoding_attribute_name] / STATE["tag_global_infos"]["max_" + radius_encoding_attribute_name];
				return get_value_for_tag_attribute(tag_object, radius_encoding_attribute_name, 0);
			},
			use_log_scale_x_axis,
			use_log_scale_y_axis
		);

	}

	// Set the default visualization
	set_tags_scatterplot_visualization();

	// Add a container for the control buttons of the tags scatterplot / bubble chart visualization
	let tags_scatterplot_controls_container = $(document.createElement("div"))
		.attr("class", "tags-scatterplot-controls-container");
	section_header.append(tags_scatterplot_controls_container);
	// Possible attributes of x axis, y axis and radius of the tags scatterplot / bubble chart visualization
	let possible_attributes = [
		"number_of_games",
		"total_revenue",
		"average_revenue",
		"total_copies_sold",
		"average_copies_sold",
		"average_review_rating",
		"average_price"
	];
	let select_axes_container_buttons_width = 26;
	// Function to get the label for the select option of the axes select buttons
	function get_axes_select_button_select_option_label(attribute_name, prepend_to_options = "") {
		let label = "<b>" + prepend_to_options + "</b>: " + attribute_name.replace(/_/g, " ");
		label = label.charAt(0).toUpperCase() + label.slice(1);
		label = label.replace("review ", "");
		return label;
	}
	// Add the X axis selector
	let current_x_axis_attribute = STATE["visualization_states"]["TAGS_SCATTERPLOT"]["x_axis_attribute"];
	let tags_scatterplot_header_button_x_axis = $(document.createElement("div"))
		.attr("class", "tags-scatterplot-header-button custom-select tags-scatterplot-header-x-axis-select")
		.css("width", select_axes_container_buttons_width + "%");
	$(tags_scatterplot_controls_container).append(tags_scatterplot_header_button_x_axis);
	let tags_scatterplot_header_button_x_axis_select = $(document.createElement("select"));
	$(tags_scatterplot_header_button_x_axis).append(tags_scatterplot_header_button_x_axis_select);
	for (let i = 0; i < possible_attributes.length; i++) {
		let x_axis_attribute = possible_attributes[i];
		let x_axis_attribute_option = $(document.createElement("option"))
			.attr("value", x_axis_attribute)
			.attr("selected", (x_axis_attribute == current_x_axis_attribute ? "selected" : undefined))
			.html(get_axes_select_button_select_option_label(x_axis_attribute, "X"));
		$(tags_scatterplot_header_button_x_axis_select).append(x_axis_attribute_option);
	}
	// Add the Y axis selector
	let current_y_axis_attribute = STATE["visualization_states"]["TAGS_SCATTERPLOT"]["y_axis_attribute"];
	let tags_scatterplot_header_button_y_axis = $(document.createElement("div"))
		.attr("class", "tags-scatterplot-header-button custom-select tags-scatterplot-header-y-axis-select")
		.css("width", select_axes_container_buttons_width + "%");
	$(tags_scatterplot_controls_container).append(tags_scatterplot_header_button_y_axis);
	let tags_scatterplot_header_button_y_axis_select = $(document.createElement("select"));
	$(tags_scatterplot_header_button_y_axis).append(tags_scatterplot_header_button_y_axis_select);
	for (let i = 0; i < possible_attributes.length; i++) {
		let y_axis_attribute = possible_attributes[i];
		let y_axis_attribute_option = $(document.createElement("option"))
			.attr("value", y_axis_attribute)
			.attr("selected", (y_axis_attribute == current_y_axis_attribute ? "selected" : undefined))
			.html(get_axes_select_button_select_option_label(y_axis_attribute, "Y"));
		$(tags_scatterplot_header_button_y_axis_select).append(y_axis_attribute_option);
	}
	// Add the radius selector
	let tags_scatterplot_header_button_radius = $(document.createElement("div"))
		.attr("class", "tags-scatterplot-header-button custom-select tags-scatterplot-header-radius-select")
		.css("width", select_axes_container_buttons_width + "%");
	$(tags_scatterplot_controls_container).append(tags_scatterplot_header_button_radius);
	let tags_scatterplot_header_button_radius_select = $(document.createElement("select"));
	$(tags_scatterplot_header_button_radius).append(tags_scatterplot_header_button_radius_select);
	let radius_encoding_attributes = possible_attributes.slice();
	radius_encoding_attributes.unshift("none");	// Add "none" as a possible radius encoding attribute
	for (let i = 0; i < radius_encoding_attributes.length; i++) {
		let radius_encoding_attribute = radius_encoding_attributes[i];
		let radius_encoding_attribute_option = $(document.createElement("option"))
			.attr("value", radius_encoding_attribute)
			.html(get_axes_select_button_select_option_label(radius_encoding_attribute, "R"));
		$(tags_scatterplot_header_button_radius_select).append(radius_encoding_attribute_option);
	}

	// Add a button to set x scale to logarithmic and a button to set y scale to logarithmic in the header
	let x_is_currently_log_scale = STATE["visualization_states"]["TAGS_SCATTERPLOT"]["use_x_axis_log_scale"];
	let y_is_currently_log_scale = STATE["visualization_states"]["TAGS_SCATTERPLOT"]["use_y_axis_log_scale"];
	let scatterplot_header_buttons_container = $(document.createElement("div"))
		.attr("class", "tags-scatterplot-header-axis-scale-buttons-container")
	// .css("width", (99 - 3 * select_axes_container_buttons_width) + "%");
	// .attr("style", "display: flex; flex-direction: row; justify-content: space-between; align-items: center; width: 100%;");
	$(tags_scatterplot_controls_container).append(scatterplot_header_buttons_container);
	// Add set x scale to logarithmic button
	let set_x_scale_to_log_button = $(document.createElement("div"))
		.attr("class", "tags-scatterplot-header-button-axis-scale")
		.html("x log")
		.toggleClass("scale-log", x_is_currently_log_scale);
	scatterplot_header_buttons_container.append(set_x_scale_to_log_button);
	// Add set y scale to logarithmic button
	let set_y_scale_to_log_button = $(document.createElement("div"))
		.attr("class", "tags-scatterplot-header-button-axis-scale")
		.html("y log")
		.toggleClass("scale-log", y_is_currently_log_scale);
	scatterplot_header_buttons_container.append(set_y_scale_to_log_button);

	// Add functions to the x and y axis scale buttons (log/linear)
	function show_tooltip_for_axis_scale_button(axis_scale_button, axis_name) {
		// Set the tooltip for the element
		let is_currently_log_scale = STATE["visualization_states"]["TAGS_SCATTERPLOT"]["use_" + axis_name + "_axis_log_scale"];
		set_tooltip(
			$(axis_scale_button),
			axis_name.toUpperCase() + " Axis Scale",
			[
				"Click to set the " + axis_name + " axis scale to " + (is_currently_log_scale ? "linear" : "logarithmic") + ".",
				TOOLTIP_LINE_SEPARATOR,
				"Current " + axis_name + " axis scale: <b>" + (is_currently_log_scale ? "logarithmic" : "linear") + "</b>"
			],
			[-1, 0]
		);
	}
	set_x_scale_to_log_button
		.on("click", function (event) {
			// Get current scale
			let x_is_log_scale = STATE["visualization_states"]["TAGS_SCATTERPLOT"]["use_x_axis_log_scale"];
			// Set the x scale to logarithmic
			set_tags_scatterplot_visualization(
				undefined,
				undefined,
				undefined,
				!x_is_log_scale,
				undefined
			);
			// Set class "scale-log" to the button to true/false
			$(set_x_scale_to_log_button).toggleClass("scale-log", !x_is_log_scale);
			// Reset the tooltip for the element
			show_tooltip_for_axis_scale_button(this, "x");
		})
		.on("mouseover", function (event) {
			// Set the tooltip for the element
			show_tooltip_for_axis_scale_button(this, "x");
		})
		.on("mouseout", function (event) {
			// Set the tooltip for the element
			hide_tooltip();
		});
	set_y_scale_to_log_button
		.on("click", function (event) {
			// Get current scale
			let y_is_log_scale = STATE["visualization_states"]["TAGS_SCATTERPLOT"]["use_y_axis_log_scale"];
			// Set the y scale to logarithmic
			set_tags_scatterplot_visualization(
				undefined,
				undefined,
				undefined,
				undefined,
				!y_is_log_scale
			);
			// Set class "scale-log" to the button to true/false
			$(set_y_scale_to_log_button).toggleClass("scale-log", !y_is_log_scale);
			// Reset the tooltip for the element
			show_tooltip_for_axis_scale_button(this, "y");
		})
		.on("mouseover", function (event) {
			// Set the tooltip for the element
			show_tooltip_for_axis_scale_button(this, "y");
		})
		.on("mouseout", function (event) {
			// Set the tooltip for the element
			hide_tooltip();
		});

	// Add functions to the x and y axis select buttons
	function show_tooltip_for_axis_select_button(axis_select_button, axis_name) {
		// Set the tooltip for the element
		let axis_attribute_name = STATE["visualization_states"]["TAGS_SCATTERPLOT"][axis_name + "_axis_attribute"];
		let attribute_name_string = axis_attribute_name.replace(/_/g, " ");
		attribute_name_string = attribute_name_string.charAt(0).toUpperCase() + attribute_name_string.slice(1);
		set_tooltip(
			$(axis_select_button),
			axis_name.toUpperCase() + " Axis Plot",
			[
				"Click to choose the tag attribute to plot on the " + axis_name.toUpperCase() + " axis.",
				TOOLTIP_LINE_SEPARATOR,
				"Current tag attribute plotted on the " + axis_name.toUpperCase() + " axis: <b>" + attribute_name_string + "</b>."
			],
			[-1, 0]
		);
	}
	tags_scatterplot_header_button_x_axis
		.on("change", function (event) {
			// Get the selected attribute name
			let selected_attribute_name = $(tags_scatterplot_header_button_x_axis_select).val();
			console.log("x axis selected_attribute_name: " + selected_attribute_name);
			// Set the x axis plotted tag attribute
			set_tags_scatterplot_visualization(
				selected_attribute_name,
				undefined,
				undefined,
				undefined,
				undefined
			);
			// Reset the tooltip for the element
			// show_tooltip_for_axis_select_button(this, "x");
			hide_tooltip();

		})
		.on("mouseover", function (event) {
			// Set the tooltip for the element
			show_tooltip_for_axis_select_button(this, "x");
		})
		.on("mouseout", function (event) {
			// Set the tooltip for the element
			hide_tooltip();
		});
	tags_scatterplot_header_button_y_axis
		.on("change", function (event) {
			// Get the selected attribute name
			let selected_attribute_name = $(tags_scatterplot_header_button_y_axis_select).val();
			console.log("y axis selected_attribute_name: " + selected_attribute_name);
			// Set the y axis plotted tag attribute
			set_tags_scatterplot_visualization(
				undefined,
				selected_attribute_name,
				undefined,
				undefined,
				undefined
			);
			// Reset the tooltip for the element
			// show_tooltip_for_axis_select_button(this, "y");
			hide_tooltip();
		})
		.on("mouseover", function (event) {
			// Set the tooltip for the element
			show_tooltip_for_axis_select_button(this, "y");
		})
		.on("mouseout", function (event) {
			// Set the tooltip for the element
			hide_tooltip();
		});
	// Add functions to the radius select button
	function show_tooltip_for_radius_select_button(radius_select_button) {
		// Set the tooltip for the element
		let radius_encoding_attribute_name = STATE["visualization_states"]["TAGS_SCATTERPLOT"]["radius_attribute"];
		let attribute_name_string = radius_encoding_attribute_name.replace(/_/g, " ");
		attribute_name_string = attribute_name_string.charAt(0).toUpperCase() + attribute_name_string.slice(1);
		if (radius_encoding_attribute_name == "none") attribute_name_string = "NONE";
		// Set the tooltip text
		let tooltip_texts = [
			"Click to choose the tag attribute to use to encode the points/bubbles radius.",
			TOOLTIP_LINE_SEPARATOR,
		];
		if (radius_encoding_attribute_name == "none") {
			tooltip_texts.push("No radius encoding is currently used.");
		} else {
			tooltip_texts.push("Current tag attribute used for the points/bubbles radius: <b>" + attribute_name_string + "</b>.")
			// Add a tooltip div to show the actual radius encoding legend (the css variable "--scale-up-multiplier")
			let scale_up_multiplier_for_tags_scatterplot_section = parseFloat($(section_element_selector).css("--scale-up-multiplier"));

			// Add 3 circles to the tooltip div
			function format_radius_value_legend_text(radius_value) {
				if (radius_encoding_attribute_name == "average_review_rating") {
					return Math.round(radius_value * 100) + "%";
				} else if (radius_encoding_attribute_name == "average_price" || radius_encoding_attribute_name == "average_revenue" || radius_encoding_attribute_name == "total_revenue") {
					return "$" + format_number_string(radius_value, 1);
				} else {
					return format_number_string(radius_value, 1);
				}
			}
			let num_of_circles = 5;
			// Min and max values of the attribute used for the radius encoding
			let min_radius_value = 0;
			let max_radius_value = STATE["tag_global_infos"]["max_" + radius_encoding_attribute_name];
			// Min and max values of the radius inside the svg element corresponding to the tags attribute (in px)
			let min_svg_radius_value = 0.2;
			let max_svg_radius_value = 4;
			// Multiplier value to obtain the same size of the circles inside the svg element and the tooltip
			let min_radius_multiplier = 0.75;
			let max_radius_multiplier = 0.365;
			// Scale up multiplier for the circles in the tooltip (to account for .app-cell elements scale up on hover)
			let cell_is_scaled_up = $(section_element_selector).hasClass("scale-up");
			let scale_up_multiplier = 1;
			if (cell_is_scaled_up) scale_up_multiplier = scale_up_multiplier_for_tags_scatterplot_section;
			// Min and max values of the radius of the circles in the tooltip (in "em")
			let min_tooltip_legend_circle_radius_value = min_svg_radius_value * min_radius_multiplier * scale_up_multiplier;	// In "em"
			let max_tooltip_legend_circle_radius_value = max_svg_radius_value * max_radius_multiplier * scale_up_multiplier;	// In "em"
			// Border width of circle elements in the tooltip circle radius legend
			let tooltip_legend_circle_border_width = 0.115 * scale_up_multiplier;	// In "em"
			// Create the tooltip div
			let radius_encoding_legend_width = (cell_is_scaled_up ? 100 : 80);	// In %
			let radius_encoding_legend_tooltip_div = $(document.createElement("div"))
				.attr("class", "tags-scatterplot-radius-encoding-legend-tooltip")
				.css("width", radius_encoding_legend_width + "%")
				.css("margin", "0 " + ((100 - radius_encoding_legend_width) / 2) + "%")
				.css("display", "inline-flex")
				.css("flex-direction", "row")
				.css("justify-content", "center")
				.css("align-items", "center");
			for (let i = 0; i < num_of_circles; i++) {
				let radius_value = interpolate_between_values(min_radius_value, max_radius_value, i / (num_of_circles - 1));
				let radius_value_legend_text = format_radius_value_legend_text(radius_value);
				let radius_and_label_container = $(document.createElement("div"))
					.attr("class", "tags-scatterplot-radius-encoding-legend-circle-and-label-container")
					.css("display", "inline-flex")
					.css("flex-direction", "column")
					.css("justify-content", "center")
					.css("align-items", "center")
					// .css("width", (100 / num_of_circles) + "%");
					.css("margin", "0 0.25em");
				radius_encoding_legend_tooltip_div.append(radius_and_label_container);
				let radius_value_legend_text_label = $(document.createElement("div"))
					.attr("class", "tags-scatterplot-radius-encoding-legend-text-label")
					.html(radius_value_legend_text);
				let circle_size = reverse_interpolate_between_values(min_radius_value, max_radius_value, radius_value);
				circle_size = interpolate_between_values(min_tooltip_legend_circle_radius_value, max_tooltip_legend_circle_radius_value, circle_size);
				// Round to 2 decimal digits
				let circle_size_string = (Math.round(circle_size * 100) / 100).toString();
				// circle_size_string = "1";	// FOR DEBUG
				let radius_value_legend_circle = $(document.createElement("div"))
					.attr("class", "tags-scatterplot-radius-encoding-legend-circle")
					.css("width", circle_size_string + "em")
					.css("height", circle_size_string + "em")
					.css("border-radius", "50%")
					.css("margin", (cell_is_scaled_up ? "0.75em" : "0.875em"))
					.css("border", tooltip_legend_circle_border_width + "em solid rgba(55,55,55)")
					.css("background-color", "rgba(0,0,0,0.25)");
				radius_and_label_container.append(radius_value_legend_circle);
				radius_and_label_container.append(radius_value_legend_text_label);
			}
			// Add the tooltip div to the tooltip texts
			console.log("radius_encoding_legend_tooltip_div: " + radius_encoding_legend_tooltip_div.prop("outerHTML"));
			tooltip_texts.push(radius_encoding_legend_tooltip_div.prop("outerHTML"));
		}
		// Set the final tooltip
		set_tooltip($(radius_select_button), "Points Radius", tooltip_texts, [-1, 1], [0, 0], true);
	}
	tags_scatterplot_header_button_radius
		.on("change", function (event) {
			// Get the selected attribute name
			let selected_attribute_name = $(tags_scatterplot_header_button_radius_select).val();
			console.log("radius selected_attribute_name: " + selected_attribute_name);
			// Set the radius encoding attribute
			set_tags_scatterplot_visualization(
				undefined,
				undefined,
				selected_attribute_name,
				undefined,
				undefined
			);
			// Reset the tooltip for the element
			// show_tooltip_for_radius_select_button(this);
			hide_tooltip();
		})
		.on("mouseover", function (event) {
			// Set the tooltip for the element
			show_tooltip_for_radius_select_button(this);
		})
		.on("mouseout", function (event) {
			// Set the tooltip for the element
			hide_tooltip();
		});

	// Add hover tooltip for the section info button
	let tags_scatterplot_section_info_button = $(section_element_selector + " #section-info-button");
	tags_scatterplot_section_info_button
		.on("mouseover", function (event) {
			// Set the tooltip for the element
			set_tooltip(
				$(this),
				"Tags Scatterplot / Bubble Chart",
				[
					"Shows a scatterplot of all the tags.",
					"Each tag is represented by a circle, whose position and radius are determined by the selected attributes to plot.",
					"Hover over a point to see the corresponding tag's name and its detailed information.",
					TOOLTIP_LINE_SEPARATOR,
					"Click on the select buttons for the X and Y axes to choose between tag attributes to plot on the X and Y axes.",
					"Click on the select button for the points radius to transform the scatterplot into a bubble chart, where the radius of each point is directly proportional to the value of the selected attribute.",
					"Click on the buttons on the top right to set the X and Y axis scale to logarithmic or linear.",
					TOOLTIP_LINE_SEPARATOR,
					"Click and drag on the scatterplot (with left or right button) to start selecting a region of the scatterplot.",
					// "<li>If dragging with the left button, at the end of the selection, <b>any</b> tag inside the selection will be set as 'included', while any tag outside the selection will be set as 'excluded'.</li>",
					// "<li>If dragging with the right button (a dashed selection area is shown), at the end of the selection, <b>any non-excluded</b> tag inside the selection will be set as 'included', while any tag outside the selection (or already excluded) will be set as 'excluded'.</li>",
					"<li>If dragging with the left button, at the end of the selection, any tag inside the selection will be set as 'included'.</li>",
					"<li>If dragging with the right button (a dashed selection area is shown), at the end of the selection, any included tag inside the selection will be set as 'excluded'.</li>",
					"NOTE: If a drag selection doesn't include any tags, the selection will be discarded.",
				],
				[-1, 1]
			);
		})
		.on("mouseout", function (event) {
			// Set the tooltip for the element
			hide_tooltip();
		});

	// On hover over the tags scatterplot "axes_grid_container", show 2 texts representing the values of the x and y axes
	tags_scatterplot_mouse_move_rect = scatterplot_group.append("rect")
		.attr("class", "tags-scatterplot-mouse-move-rect")
		.attr("x", 0)
		.attr("y", 0)
		.attr("width", scatterplot_width)
		.attr("height", scatterplot_height)
		.attr("fill", "rgba(0,0,0,0)")
		.attr("pointer-events", "all")
		.attr("cursor", "crosshair");
	tags_scatterplot_mouse_move_rect.lower();
	let hover_texts_font_size = 2;
	let coordinates_hover_texts_container = scatterplot_svg.append("g")
		.attr("class", "tags-scatterplot-axes-values-texts-container")
		// .attr("transform", "translate(" + (scatterplot_width - 5) + "," + (scatterplot_height - 5) + ")")
		.attr("opacity", 0)
		.attr("pointer-events", "none");
	let coordinates_hover_x_axis_value_text = coordinates_hover_texts_container.append("text")
		.attr("class", "tags-scatterplot-x-axis-value-text")
		.attr("x", 0)
		.attr("y", 0)
		.attr("text-anchor", "start")
		// .attr("alignment-baseline", "hanging")
		.attr("font-size", hover_texts_font_size)
		.attr("fill", "rgba(255,255,255,0.5)");
	let coordinates_hover_y_axis_value_text = coordinates_hover_texts_container.append("text")
		.attr("class", "tags-scatterplot-y-axis-value-text")
		.attr("x", 0)
		.attr("y", hover_texts_font_size * 1.5)
		.attr("text-anchor", "start")
		// .attr("alignment-baseline", "baseline")
		.attr("font-size", hover_texts_font_size)
		.attr("fill", "rgba(255,255,255,0.5)");
	function set_axes_values_texts_and_position(x_value, y_value, x_pos, y_pos) {
		// Set the texts
		let x_attribute = STATE["visualization_states"]["TAGS_SCATTERPLOT"]["x_axis_attribute"];
		let y_attribute = STATE["visualization_states"]["TAGS_SCATTERPLOT"]["y_axis_attribute"];
		let value_string_x = format_number_string(x_value, 2);
		let value_string_y = format_number_string(y_value, 2);
		if (x_attribute == "average_review_rating") value_string_x = Math.round(x_value) + "%";
		if (y_attribute == "average_review_rating") value_string_y = Math.round(y_value) + "%";
		if (x_attribute == "average_price" || x_attribute == "average_revenue" || x_attribute == "total_revenue") value_string_x = "$" + format_number_string(x_value, 1);
		if (y_attribute == "average_price" || y_attribute == "average_revenue" || y_attribute == "total_revenue") value_string_y = "$" + format_number_string(y_value, 1);
		let x_text = "X | " + x_attribute.replace(/_/g, " ").toUpperCase() + ": " + value_string_x;
		let y_text = "Y | " + y_attribute.replace(/_/g, " ").toUpperCase() + ": " + value_string_y;
		coordinates_hover_x_axis_value_text.html(x_text);
		coordinates_hover_y_axis_value_text.html(y_text);
		// Set the texts positions
		let offset_x = 14;
		let offset_y = 6.5;
		// Get if the tet should be shown left or right and up or down
		let show_left = (x_pos > scatterplot_width / 2);
		let show_up = (y_pos > scatterplot_height / 2);
		if (show_left) {
			// Show text on the left of the mouse position
			x_pos += offset_x * 0.75;
			coordinates_hover_x_axis_value_text.attr("text-anchor", "end");
			coordinates_hover_y_axis_value_text.attr("text-anchor", "end");
		} else {
			// Show text on the right of the mouse position
			x_pos += offset_x;
			coordinates_hover_x_axis_value_text.attr("text-anchor", "start");
			coordinates_hover_y_axis_value_text.attr("text-anchor", "start");
		}
		if (show_up) {
			// Show text above the mouse position
			y_pos -= offset_y * 0.25;
			// coordinates_hover_x_axis_value_text.attr("alignment-baseline", "hanging");
			// coordinates_hover_y_axis_value_text.attr("alignment-baseline", "hanging");
		} else {
			// Show text below the mouse position
			y_pos += offset_y;
			// coordinates_hover_x_axis_value_text.attr("alignment-baseline", "baseline");
			// coordinates_hover_y_axis_value_text.attr("alignment-baseline", "baseline");
		}
		coordinates_hover_texts_container
			.attr("transform", "translate(" + (x_pos) + "," + (y_pos) + ")")
			.attr("opacity", 1);
	}
	function hide_coordinates_hover_texts() {
		coordinates_hover_texts_container.attr("opacity", 0);
	}
	// Create a "brush rect" to show the brush selection
	let brush_rect = scatterplot_group.append("rect")
		.attr("class", "tags-scatterplot-brush-rect")
		.attr("x", 0)
		.attr("y", 0)
		.attr("width", scatterplot_width)
		.attr("height", scatterplot_height)
		.attr("fill", "rgba(0,0,0,0)")
		.attr("pointer-events", "none")
		.attr("stroke", "rgba(255,255,255,0.5)")
		.attr("stroke-width", 0.2)
		// .attr("stroke-dasharray", "0.2 0.2")
		.attr("opacity", 0);
	// Add a function to the "mouse_move_rect" to show the values of the x and y axes on hover
	tags_scatterplot_mouse_move_rect
		.on("mousemove", function (event) {
			// Get the mouse positions with respect to the graph, where [0,0] is the bottom left corner of the axes, the origin, and [1,1] is the top right corner of the axes
			let mouse_positions = d3.pointer(event, this);
			let mouse_coordinate_x = mouse_positions[0] / scatterplot_width;
			let mouse_coordinate_y = 1 - mouse_positions[1] / scatterplot_height;
			if (mouse_coordinate_x < 0) mouse_coordinate_x = 0;
			if (mouse_coordinate_x > 1) mouse_coordinate_x = 1;
			if (mouse_coordinate_y < 0) mouse_coordinate_y = 0;
			if (mouse_coordinate_y > 1) mouse_coordinate_y = 1;
			// Get the x and y values corresponding to the mouse positions
			let value_coordinates = get_coordinates_attribute_value_from_given_position(mouse_coordinate_x, mouse_coordinate_y);
			// Check if brushing
			let is_brushing = $(this).hasClass("brushing");
			let is_brushing_with_right_button = $(this).hasClass("brushing-right");
			if (is_brushing) {
				// Set the brush rect
				// let brush_start_x = value_coordinates["x"];
				// let brush_start_y = value_coordinates["y"];
				let brush_x1 = brush_rect.attr("start_x");
				let brush_y1 = brush_rect.attr("start_y");
				let brush_x2 = brush_rect.attr("x") + brush_rect.attr("width");
				let brush_y2 = brush_rect.attr("y") + brush_rect.attr("height");
				let brush_new_x2 = mouse_positions[0];
				let brush_new_y2 = mouse_positions[1];
				// Set the brush rect width and height (if the new x and y are greater than the brush rect x1 and y1, swap them)
				if (brush_new_x2 > brush_x1) {
					// Set new x2
					brush_x2 = brush_new_x2;
				} else {
					// Swap x1 and x2
					brush_x2 = brush_x1;
					brush_x1 = brush_new_x2;
				}
				if (brush_new_y2 > brush_y1) {
					// Set new y2
					brush_y2 = brush_new_y2;
				} else {
					// Swap y1 and y2
					brush_y2 = brush_y1;
					brush_y1 = brush_new_y2;
				}
				// Set the brush rect
				brush_rect
					.attr("x", brush_x1)
					.attr("y", brush_y1)
					.attr("width", brush_x2 - brush_x1)
					.attr("height", brush_y2 - brush_y1)
					.attr("opacity", 1);
				// console.log("brush_x1: " + brush_x1);
				// console.log("brush_y1: " + brush_y1);
				// console.log("brush_x2: " + brush_x2);
				// console.log("brush_y2: " + brush_y2);
			}
			// Set the value texts
			set_axes_values_texts_and_position(value_coordinates["x"], value_coordinates["y"], mouse_positions[0], mouse_positions[1]);
		})
		// Also add brushing functions to the "mouse_move_rect"
		.on("mousedown", function (event) {
			// Start brushing
			let is_right_button = (event.button == 2);
			// Add class "brushing" to the "mouse_move_rect" element
			$(this).addClass("brushing");
			if (is_right_button) $(this).addClass("brushing-right");
			// Set pointer events of all tag groups to none
			tags_scatterplot_point_groups_list.forEach(function (tag_group) {
				tag_group.attr("pointer-events", "none");
			});
			// Get mouse position
			let mouse_positions = d3.pointer(event, this);
			// Set brush rect x and y
			brush_rect
				.attr("x", mouse_positions[0])
				.attr("y", mouse_positions[1])
				.attr("width", 0)
				.attr("height", 0)
				.attr("opacity", 1)
				.attr("fill", "rgba(0,0,0,0)")
				.attr("fill-opacity", 0);
			if (is_right_button) {
				// Show a dashed line
				brush_rect.attr("stroke-dasharray", "1.5 1.5");
			} else {
				// Show a solid line
				brush_rect.attr("stroke-dasharray", "0 0");
			}
			// Set brus rect "start_x" and "start_y" attributes
			brush_rect.attr("start_x", mouse_positions[0]);
			brush_rect.attr("start_y", mouse_positions[1]);
			// Hide the value texts
			hide_coordinates_hover_texts();
		})
		.on("mouseup", function (event) {
			// End brushing
			let was_brushing_with_right_button = (event.button == 2);
			event.preventDefault();
			// console.log("is_right_button: " + is_right_button);
			// Get the values to filter tags
			let brush_x1 = parseFloat(brush_rect.attr("x")) / scatterplot_width;
			let brush_y1 = parseFloat(brush_rect.attr("y")) / scatterplot_height;
			let brush_x2 = (parseFloat(brush_rect.attr("x")) + parseFloat(brush_rect.attr("width"))) / scatterplot_width;
			let brush_y2 = (parseFloat(brush_rect.attr("y")) + parseFloat(brush_rect.attr("height"))) / scatterplot_height;
			// console.log("brush_x1: " + brush_x1, "brush_y1: " + brush_y1, "brush_x2: " + brush_x2, "brush_y2: " + brush_y2);
			brush_x1 = Math.max(0, Math.min(1, brush_x1));
			brush_y1 = Math.max(0, Math.min(1, brush_y1));
			brush_x2 = Math.max(0, Math.min(1, brush_x2));
			brush_y2 = Math.max(0, Math.min(1, brush_y2));
			let brush_x_min = Math.min(brush_x1, brush_x2);
			let brush_x_max = Math.max(brush_x1, brush_x2);
			let brush_y_min = 1 - Math.min(brush_y1, brush_y2);
			let brush_y_max = 1 - Math.max(brush_y1, brush_y2);
			// Remove class "brushing" from the "mouse_move_rect" element
			$(this).removeClass("brushing");
			// Hide the brush rect
			brush_rect.attr("fill", "rgba(255,255,255,255)")
			brush_rect.attr("fill-opacity", 0.1)
			brush_rect
				.transition()
				.duration(150)
				.attr("opacity", 0)
				.attr("fill", "rgba(0,0,0,0)");
			// Swap min and max values if needed
			if (brush_x_min > brush_x_max) {
				let temp = brush_x_min;
				brush_x_min = brush_x_max;
				brush_x_max = temp;
			}
			if (brush_y_min > brush_y_max) {
				let temp = brush_y_min;
				brush_y_min = brush_y_max;
				brush_y_max = temp;
			}
			// Get the corresponding values for the attributes
			let coordinate_values_min = get_coordinates_attribute_value_from_given_position(brush_x_min, brush_y_min);
			let coordinate_values_max = get_coordinates_attribute_value_from_given_position(brush_x_max, brush_y_max);
			// Set the filters
			setTimeout(function () {
				filter_tags_in_ranges(coordinate_values_min["x"], coordinate_values_max["x"], coordinate_values_min["y"], coordinate_values_max["y"], was_brushing_with_right_button);
			}, 150);
			// Set pointer events of all tag groups to all
			tags_scatterplot_point_groups_list.forEach(function (tag_group) {
				tag_group.attr("pointer-events", "all");
			});
		})
		.on("contextmenu", function (event) {
			// Prevent the context menu from showing up
			event.preventDefault();
		})
		.on("mouseout", function (event) {
			// hide the text container
			hide_coordinates_hover_texts();
			// Check if mouse position is outside the scatterplot
			let mouse_positions = d3.pointer(event, this);
			if (mouse_positions[0] < 0 || mouse_positions[0] > scatterplot_width || mouse_positions[1] < 0 || mouse_positions[1] > scatterplot_height) {
				// End brushing (without doing anything)
				$(this).removeClass("brushing");
				// Hide the brush rect
				brush_rect
					// .transition()
					// .duration(150)
					.attr("opacity", 0);
			}
		});

	/**
	 * Includes all tags that have the selected axes attribute values in the given ranges
	 *
	 * If no tags are included, don't update the filters and return false
	 *
	 * If at least one tag is included, update the filters and the visualizations and return true
	 *
	 * If "only_non_excluded_tags" is true, only tags that are NOT currently excluded will be included in the new set of included tags
	 */
	function filter_tags_in_ranges(x_min, x_max, y_min, y_max, exclude_tags_in_ranges_instead_of_including = false) {

		let to_ret = false;

		let attribute_x = STATE["visualization_states"]["TAGS_SCATTERPLOT"]["x_axis_attribute"];
		let attribute_y = STATE["visualization_states"]["TAGS_SCATTERPLOT"]["y_axis_attribute"];

		function get_tag_is_in_range(tag_info) {
			let tag_x_value = tag_info[attribute_x];
			let tag_y_value = tag_info[attribute_y];
			let respects_x = (tag_x_value >= x_min && tag_x_value <= x_max);
			let respects_y = (tag_y_value >= y_min && tag_y_value <= y_max);
			return (respects_x && respects_y);
		}

		// console.log("x_axis_attribute: " + attribute_x + ", y_axis_attribute: " + attribute_y)
		// console.log(
		// 	"Filtering tags in ranges:\n" +
		// 	attribute_x + ": [" + x_min + ", " + x_max + "]\n" +
		// 	attribute_y + ": [" + y_min + ", " + y_max + "]"
		// )

		// iterate over all tags and set the STATE variable's included/excluded tags
		let included_tags_set = new Set();
		let excluded_tags_set = new Set();
		for (let tag_name in STATE["all_tags_filter_infos"]) {
			let tag_info = STATE["all_tags_filter_infos"][tag_name];
			let tag_is_in_range = get_tag_is_in_range(tag_info);
			let tag_is_currently_included = STATE["tags_ranking"]["tags_to_include"].has(tag_name);
			// let add_tag_in_new_included_set = (tag_is_in_range && !exclude_tags_in_ranges_instead_of_including) || (!tag_is_in_range && exclude_tags_in_ranges_instead_of_including);
			if (exclude_tags_in_ranges_instead_of_including) {
				// Exclude any already included tag that is in the range
				if (tag_is_in_range && tag_is_currently_included) {
					excluded_tags_set.add(tag_name);
				} else {
					if (tag_is_currently_included) included_tags_set.add(tag_name);
					else excluded_tags_set.add(tag_name);
				}
			} else {
				// Include any tag that is in the range
				if (tag_is_in_range) {
					included_tags_set.add(tag_name);
				} else {
					if (tag_is_currently_included) included_tags_set.add(tag_name);
					else excluded_tags_set.add(tag_name);
				}
			}
		}
		// Set the included/excluded tags (if some tags were actually included)
		if (included_tags_set.size > 0) {
			STATE["tags_ranking"]["tags_to_include"] = included_tags_set;
			STATE["tags_ranking"]["tags_to_exclude"] = excluded_tags_set;
			// update visualizations
			update_filters_based_on_visualization_states();
			to_ret = true
		} else {
			// No tags were included, don't set the filters
			console.log("No tags were included, don't set the filters");
			to_ret = false;
		}

		return to_ret;
	}

	// On "update_visualization" event, update the visualization
	tags_scatterplot_container[0].addEventListener("update_visualization", function (event) {
		// console.log("Updating tags scatterplot visualization");
		// Update the visualization (set visualization with current attributes)
		set_tags_scatterplot_visualization();
	});
}

/** Function to update the scatterplot visualization */
function update_tags_scatterplot_visualization() {
	// Update the scatterplot visualization by dispatching an "update_visualization" event
	let update_visualization_event = new CustomEvent("update_visualization");
	tags_scatterplot_container[0].dispatchEvent(update_visualization_event);
}

/** Function used to calculate the bin index for tag's time series */
function get_time_series_index_from_game_object_release_date(release_date) {
	// Get the current time interval to use (one of ["month", "quarter", "semester", "year"])
	let active_time_interval = STATE["visualization_states"]["TAGS_TIME_SERIES"]["time_interval"];
	if (active_time_interval == "day") {
		// Use days
		function days_between_dates(start_date_object, end_date_object) {
			const StartDate = new Date(start_date_object["year"], start_date_object["month"] - 1, start_date_object["day"]);
			const EndDate = new Date(end_date_object["year"], end_date_object["month"] - 1, end_date_object["day"]);
			// The number of milliseconds in all UTC days (no DST)
			const oneDay = 1000 * 60 * 60 * 24;
			// A day in UTC always lasts 24 hours (unlike in other time formats)
			const start = Date.UTC(EndDate.getFullYear(), EndDate.getMonth(), EndDate.getDate());
			const end = Date.UTC(StartDate.getFullYear(), StartDate.getMonth(), StartDate.getDate());
			// so it's safe to divide by 24 hours
			return Math.floor((start - end) / oneDay);
		}
		return get_tags_time_series_number_of_bins() - days_between_dates({ "year": 2017, "month": 1, "day": 1 }, release_date) - 1;
	} else if (active_time_interval == "month") {
		// Use months
		return ((2023 - release_date["year"]) * 12 + (12 - release_date["month"] + 1)) - 1;
	} else if (active_time_interval == "quarter") {
		// Use quarters of each year
		return ((2023 - release_date["year"]) * 4 + (3 - Math.floor((release_date["month"] - 1) / 3) + 1)) - 1;
	} else if (active_time_interval == "semester") {
		// Use semesters
		return ((2023 - release_date["year"]) * 2 + (2 - Math.floor((release_date["month"] - 1) / 6) + 1)) - 2;
	} else if (active_time_interval == "year") {
		// Use years
		return (2023 - release_date["year"]);
	} else {
		// Error: use year
		console.error("Error: invalid time interval: " + active_time_interval + ", using year instead");
		return (2023 - release_date["year"]);
	}
}
/** Function used to calculate the bin index for tag's time series */
function get_tags_time_series_number_of_bins() {
	// Get the current time interval to use (one of ["month", "quarter", "semester", "year"])
	let active_time_interval = STATE["visualization_states"]["TAGS_TIME_SERIES"]["time_interval"];
	if (active_time_interval == "day") {	// Daily bins from 2017 to 2023
		return (2023 - 2017 + 1) * 365 + (1); 	// 2020 is a leap year, so we add one day to the total number of days (365)
	} else if (active_time_interval == "month") {
		return (2023 - 2017 + 1) * 12;	// Monthly bins from 2017 to 2023
	} else if (active_time_interval == "quarter") {
		return (2023 - 2017 + 1) * 4;	// Quarterly bins from 2017 to 2023
	} else if (active_time_interval == "semester") {
		return (2023 - 2017 + 1) * 2;	// Bi-yearly (semester) bins from 2017 to 2023
	} else if (active_time_interval == "year") {
		return (2023 - 2017 + 1);	// Yearly bins from 2017 to 2023
	} else {
		// Error: use year
		console.error("Error: invalid time interval: " + active_time_interval + ", using year instead");
		return (2023 - 2017 + 1);
	}
}

/** List of all the tags time series line elements */
let tags_time_series_line_elements_list = [];
let tags_time_series_line_elements_list_secondary = [];
/** Group element "g" containing the time series axes */
let tags_time_series_visualization_container;

function create_tags_time_series_visualization() {

	let section_element_selector = "#visualization-tags-time-series";

	let section_container = $(section_element_selector + " .content");

	let section_corner_buttons_container = $(section_element_selector + " .buttons-container");

	// Create a section header
	let section_header = $(document.createElement("div"))
		.attr("class", "tags-time-series-header");
	// section_container.append(section_header);
	section_corner_buttons_container.prepend(section_header);

	// Add container for buttons used to change the plotted attribute of axes
	let axes_attributes_buttons_container = $(document.createElement("div"))
		.attr("class", "tags-time-series-axes-attributes-buttons-container");
	section_header.append(axes_attributes_buttons_container);
	let select_axes_container_buttons_width = 47;
	// Container for the select button of the Y1 axis
	let tags_time_series_header_button_y1_axis = $(document.createElement("div"))
		.attr("class", "tags-time-series-header-button custom-select tags-time-series-header-y1-axis-select")
		.css("width", select_axes_container_buttons_width + "%");
	$(axes_attributes_buttons_container).append(tags_time_series_header_button_y1_axis);
	function get_axes_select_button_select_option_label(attribute_name, is_secondary = false) {
		let label = attribute_name.replace(/_/g, " ");
		label = label.charAt(0).toUpperCase() + label.slice(1);
		label = label.replace("review ", "");
		// label =
		return label;
	}
	// Select button for the Y1 axis
	let tags_time_series_header_button_y1_axis_select = $(document.createElement("select"));
	$(tags_time_series_header_button_y1_axis).append(tags_time_series_header_button_y1_axis_select);
	let y1_axis_attributes = [
		"number_of_games",
		"total_revenue",
		"average_revenue",
		"total_copies_sold",
		"average_copies_sold",
		"average_review_rating",
		"average_price"
	];
	for (let i = 0; i < y1_axis_attributes.length; i++) {
		let y1_axis_attribute = y1_axis_attributes[i];
		let y1_axis_attribute_option = $(document.createElement("option"))
			.attr("value", y1_axis_attribute)
			.html(get_axes_select_button_select_option_label(y1_axis_attribute));
		$(tags_time_series_header_button_y1_axis_select).append(y1_axis_attribute_option);
	}
	// Container for the select button of the Y2 axis
	let tags_time_series_header_button_y2_axis = $(document.createElement("div"))
		.attr("class", "tags-time-series-header-button custom-select tags-time-series-header-y2-axis-select")
		.css("width", select_axes_container_buttons_width + "%");
	$(axes_attributes_buttons_container).append(tags_time_series_header_button_y2_axis);
	// Select button for the Y2 axis
	let tags_time_series_header_button_y2_axis_select = $(document.createElement("select"));
	$(tags_time_series_header_button_y2_axis).append(tags_time_series_header_button_y2_axis_select);
	let y2_axis_attributes = ["none"].concat(y1_axis_attributes);
	for (let i = 0; i < y2_axis_attributes.length; i++) {
		let y2_axis_attribute = y2_axis_attributes[i];
		let y2_axis_attribute_option = $(document.createElement("option"))
			.attr("value", y2_axis_attribute)
			.html(get_axes_select_button_select_option_label(y2_axis_attribute, true));
		$(tags_time_series_header_button_y2_axis_select).append(y2_axis_attribute_option);
	}
	// Add tooltip on hover of both buttons
	$(tags_time_series_header_button_y1_axis)
		.on("mouseover", function (event) {
			// Set tooltip
			let element = $(this);
			let optimal_tooltip_position = calculate_tooltip_optimal_translate_position(element);
			set_tooltip(
				element,
				"Y1 Axis (Left)",
				[
					"Click to select the tag attribute to plot on the Y1 axis (the left Y axis) shown as a solid line.",
				],
				[-1, optimal_tooltip_position[1]]
			);
		})
		.on("mouseout", function (event) {
			// Hide tooltip
			hide_tooltip();
		});
	$(tags_time_series_header_button_y2_axis)
		.on("mouseover", function (event) {
			// Set tooltip
			let element = $(this);
			let optimal_tooltip_position = calculate_tooltip_optimal_translate_position(element);
			set_tooltip(
				element,
				"Y2 Axis (Right)",
				[
					"Click to select the tag attribute to plot on the Y2 axis (the right Y axis) shown as a dashed line.",
					"NOTE: choose the 'NONE' option to hide the Y2 axis.",
				],
				[-1, optimal_tooltip_position[1]]
			);
		})
		.on("mouseout", function (event) {
			// Hide tooltip
			hide_tooltip();
		});
	// On change of the select button of the Y1 axis, update the visualization
	tags_time_series_header_button_y1_axis_select
		.on("change", function (event) {
			// Get the selected attribute name
			let selected_attribute_name = $(this).val();
			// Update the state and visualizations
			STATE["visualization_states"]["TAGS_TIME_SERIES"]["active_attribute"] = selected_attribute_name;
			// Update filters and visualization
			update_filters_based_on_visualization_states();
		});
	// On change of the select button of the Y2 axis, update the visualization
	tags_time_series_header_button_y2_axis_select
		.on("change", function (event) {
			// Get the selected attribute name
			let selected_attribute_name = $(this).val();
			// Update the state and visualizations
			STATE["visualization_states"]["TAGS_TIME_SERIES"]["active_attribute_secondary"] = selected_attribute_name;
			// Update filters and visualization
			update_filters_based_on_visualization_states();
		});

	// Add a slider to the header to select the time interval to use
	let slider_container = $(document.createElement("div"))
		.attr("class", "tags-time-series-slider-container");
	section_header.append(slider_container);
	let slider_element = $(document.createElement("div"))
		.attr("class", "tags-time-series-slider slidecontainer");
	slider_container.append(slider_element);
	// Values for the slider and available time intervals
	let slider_values = ["day", "month", "quarter", "semester", "year"];
	let selected_time_interval = STATE["visualization_states"]["TAGS_TIME_SERIES"]["time_interval"];
	let slider_input = $(document.createElement("input"))
		.attr("id", "tags-time-series-slider")
		.attr("class", "slider-track")
		.attr("type", "range")
		.attr("min", 0)
		.attr("max", 4)
		.attr("value", slider_values.indexOf(selected_time_interval))
	slider_element.append(slider_input);
	// Inside the .tags-time-series-slider-container add 5 empty divs with with class "slider-tick"
	let slider_ticks_container = $(document.createElement("div"))
		.attr("class", "tags-time-series-slider-ticks-container");
	slider_container.append(slider_ticks_container);
	for (let i = 0; i < 5; i++) {
		let slider_tick = $(document.createElement("div"))
			.attr("class", "slider-tick");
		slider_ticks_container.append(slider_tick);
		let tick_text_div = $(document.createElement("div"))
			.attr("class", "slider-tick-text")
			.html(slider_values[i].toUpperCase());
		slider_tick.append(tick_text_div);
		tick_text_div.css("font-weight", (slider_values[i] == selected_time_interval ? "bold" : "normal"));
	}
	// On move of the slider, update the time interval and also make the text corresponding to the selected time interval bold
	slider_input
		.on("input", function (event) {
			// While DRAGGING, update the style of the slider elements
			let slider_value = parseInt($(this).val());
			// Make the text corresponding to the selected time interval bold
			slider_ticks_container.find(".slider-tick-text").css("font-weight", "normal");
			slider_ticks_container.find(".slider-tick-text").eq(slider_value).css("font-weight", "bold");
		})
		.on("change", function (event) {
			// On END OF DRAG, update the visualization
			let slider_value = parseInt($(this).val());
			if (slider_values[slider_value] != STATE["visualization_states"]["TAGS_TIME_SERIES"]["time_interval"]) {
				// Update the state and visualization
				STATE["visualization_states"]["TAGS_TIME_SERIES"]["time_interval"] = slider_values[slider_value];
				// Update filters and visualization
				update_filters_based_on_visualization_states();
			}
		});
	// On hover ove rthe slider, show the tooltip
	slider_container
		.on("mouseover", function (event) {
			// Show the tooltip
			let element = $(this);
			let optimal_tooltip_position = calculate_tooltip_optimal_translate_position(element);
			set_tooltip(
				element,
				"Time intervals",
				[
					"Time intervals represent the time span of each line segment in the time series visualization (from the start of 2017 to the end of 2023).",
					"Selecting one of the available time interval (day, month, quarter, semester, year) will update the visualization to consider that time interval for the time series line plot.",
					"NOTE: a small time interval (e.g. day) will result in a more detailed time series visualization, but it will also be more difficult to read and have wider fluctuations of data.",
					TOOLTIP_LINE_SEPARATOR,
					"Slide or click onto a time interval to set it as active",
				],
				optimal_tooltip_position
			);
		})
		.on("mouseout", function (event) {
			// Hide the tooltip
			hide_tooltip();
		});

	// Create a time series container
	tags_time_series_visualization_container = $(document.createElement("div"))
		.attr("class", "tags-time-series-container");
	section_container.append(tags_time_series_visualization_container);

	// Create an svg element for the time series
	let time_series_svg = d3.select(tags_time_series_visualization_container[0])
		.append("svg")
		.attr("width", "100%")
		.attr("height", "100%")
		.attr("viewBox", "0 0 100 100")
		.attr("preserveAspectRatio", "xMinYMin meet");

	// Get the size and aspect ratio of the time series container div
	let time_series_container_width = tags_time_series_visualization_container.width();
	let time_series_container_height = tags_time_series_visualization_container.height();
	let time_series_aspect_ratio = time_series_container_width / time_series_container_height;

	// Margins in percentage
	let time_series_margins = {
		top: 3.25,
		right: 2,
		bottom: 7,
		left: 6.5
	};
	let time_series_additional_right_margin_for_secondary_attribute = 4.5;

	// Compute the time series width and height
	let time_series_width = (100 - (time_series_margins.left + time_series_margins.right)) * time_series_aspect_ratio;
	let time_series_width_for_secondary_attribute = (100 - (time_series_margins.left + time_series_margins.right + time_series_additional_right_margin_for_secondary_attribute)) * time_series_aspect_ratio;
	let time_series_height = 100 - (time_series_margins.top + time_series_margins.bottom);

	// console.log("time_series_container_width: " + time_series_container_width + ", time_series_container_height: " + time_series_container_height);

	// Create a time series container "g" group
	let time_series_group = time_series_svg
		.append("g")
		.attr("class", "tags-time-series-group")
		.attr("transform", "translate(" + time_series_margins.left * time_series_aspect_ratio + "," + time_series_margins.top + ")");

	let axes_stroke_width = 0.5;
	let axes_color = color_scheme["white"];

	// Create a container for the lines
	let tags_time_series_lines_container = time_series_group
		.append("g")
		.attr("class", "tags-time-series-lines-container")
		.attr("pointer-events", "none");

	// Create the time series axes (x and y, no labels for now, no ranges, just svg elements resembling axes)
	let time_series_axes_group_element = time_series_group
		.append("g")
		.attr("class", "tags-time-series-axes-group");
	// Create the x axis
	let time_series_x_axis = time_series_axes_group_element
		.append("line")
		.attr("class", "tags-time-series-x-axis")
		.attr("x1", 0)
		.attr("y1", time_series_height)
		.attr("x2", time_series_width)
		.attr("y2", time_series_height)
		.attr("stroke-width", axes_stroke_width)
		.attr("stroke", axes_color);
	// Create the y axis
	let time_series_y_axis = time_series_axes_group_element
		.append("line")
		.attr("class", "tags-time-series-y-axis")
		.attr("x1", 0)
		.attr("y1", 0)
		.attr("x2", 0)
		.attr("y2", time_series_height)
		.attr("stroke-width", axes_stroke_width)
		.attr("stroke", axes_color);
	// Show a "Y1" text label on the right of the axis, on top
	let time_series_y_axis_label = time_series_axes_group_element
		.append("text")
		.attr("class", "tags-time-series-y-axis-label")
		.attr("x", 1.25)
		.attr("y", "-0.5em")
		.attr("text-anchor", "start")
		.attr("alignment-baseline", "hanging")
		.attr("font-size", 3)
		.attr("font-weight", "bold")
		.attr("fill", axes_color)
		.text("Y1");
	// Add a second y axis for the secondary attribute on the right
	let time_series_y_axis_secondary = time_series_axes_group_element
		.append("line")
		.attr("class", "tags-time-series-y-axis-secondary")
		.attr("x1", time_series_width_for_secondary_attribute)
		.attr("y1", 0)
		.attr("x2", time_series_width_for_secondary_attribute)
		.attr("y2", time_series_height)
		.attr("stroke-width", axes_stroke_width)
		.attr("stroke-dasharray", "1.5,1")
		.attr("stroke", axes_color);
	// Show a "Y2" text label on the right of the axis, on top
	let time_series_y_axis_label_secondary = time_series_axes_group_element
		.append("text")
		.attr("class", "tags-time-series-y-axis-label-secondary")
		.attr("x", time_series_width_for_secondary_attribute - 1.25)
		.attr("y", "-0.5em")
		.attr("text-anchor", "end")
		.attr("alignment-baseline", "hanging")
		.attr("font-size", 3)
		.attr("font-weight", "bold")
		.attr("fill", axes_color)
		.text("Y2");

	let tag_lines_width = 0.5;

	let categories_list = ["Genres", "Sub-Genres", "Features"];

	// Create 10 text elements to show the name of 10 visible tags
	let tags_time_series_tags_names_texts = [];
	for (let i = 0; i < MAX_NUMBER_OF_TAGS_FOR_SHOWING_TAGS_SCATTERPLOTS_TEXT_LABELS; i++) {
		let tag_name_text = time_series_group
			.append("text")
			.attr("class", "tags-time-series-tag-name-text")
			.attr("x", 0)
			.attr("y", 0)
			.attr("text-anchor", "middle")
			// .attr("alignment-baseline", "hanging")
			.attr("font-size", 3.25)
			// .attr("fill", color_scheme["white"])
			.attr("stroke", color_scheme["viewport_cells"])
			.attr("stroke-width", 0.5)
			.attr("opacity", 0.5)
			.attr("paint-order", "stroke")
			.text("");
		tags_time_series_tags_names_texts.push(tag_name_text);
	}
	/**
	 * Update the tags time series visualization with the given visible tags max bin coordinates
	 * 
	 * The "visible_tags_max_bin_coordinates" is an object with keys the visible tags' names and values 2-element lists, each containing the x and y coordinates of the maximum value of the line for each visible tag
	 */
	function update_tags_time_series_tags_names_texts(visible_tags_max_bin_coordinates) {
		let visible_tags_indexes = get_non_excluded_tags_indexes();
		if (visible_tags_indexes.length > 1 && visible_tags_indexes.length <= MAX_NUMBER_OF_TAGS_FOR_SHOWING_TAGS_SCATTERPLOTS_TEXT_LABELS) {
			let tag_elements_colors = get_associated_tag_element_colors();
			for (let i = 0; i < tags_time_series_tags_names_texts.length; i++) {
				let tag_name_text = tags_time_series_tags_names_texts[i];
				if (i < visible_tags_indexes.length) {
					let tag_index = visible_tags_indexes[i];
					let tag_name = TAG_NAMES_LIST[tag_index];
					// Show text in correspondance of the maximum value of the line
					let y_position_margin = 1.75;
					let x_position_margin = 4.5;
					let offset_x = 0;
					let offset_y = -1;
					let x_position = visible_tags_max_bin_coordinates[tag_name][0];
					let y_position = visible_tags_max_bin_coordinates[tag_name][1] + offset_y;
					let text_anchor_string = "middle";
					if (y_position < y_position_margin) {
						// Text is too high on the screen, move it down
						y_position = y_position_margin;
						x_position = x_position + 1;
						// Set the text anchor to "start" or "end" based on the Y position of the text
						if (x_position < time_series_width / 2) {
							text_anchor_string = "start";
						} else {
							text_anchor_string = "end";
							offset_x = -2.125;
						}
					} else {
						// Text is NOT too high on the screen, check if it is too far out on the right
						if (x_position > time_series_width - x_position_margin) {
							// If the text is too far out on the right, make its anchor "end" and set the x position to the right margin
							x_position = time_series_width;
							text_anchor_string = "end";
						}
					}
					tag_name_text
						.attr("x", x_position + offset_x)
						.attr("y", y_position)
						.attr("fill", tag_elements_colors[tag_index])
						.attr("text-anchor", text_anchor_string)
						.text(tag_name)
						.attr("opacity", 1);
				} else {
					tag_name_text
						.text("")
						.attr("opacity", 0);
				}
			}
		} else {
			for (let i = 0; i < tags_time_series_tags_names_texts.length; i++) {
				tags_time_series_tags_names_texts[i]
					.text("")
					.attr("opacity", 0);
			}
		}
	}

	/** Possible tag attributes to plot the line for */
	// let tag_attributes_to_consider = [
	// 	"number_of_games",
	// 	"total_revenue",
	// 	"average_revenue",
	// 	"total_copies_sold",
	// 	"average_copies_sold",
	// 	"average_review_rating",
	// 	"average_price"
	// ];

	/** Update the tags time series visualization */
	function update_tags_time_series() {

		let tag_attribute_to_consider_primary = STATE["visualization_states"]["TAGS_TIME_SERIES"]["active_attribute"];
		let tag_attrbute_to_consider_secondary = STATE["visualization_states"]["TAGS_TIME_SERIES"]["active_attribute_secondary"];

		let should_show_secondary_line = tag_attrbute_to_consider_secondary != "none";

		let max_value_primary = STATE["visualization_states"]["TAGS_TIME_SERIES"]["tags_time_series_max_values"][tag_attribute_to_consider_primary];
		let max_value_secondary = undefined;
		if (should_show_secondary_line) max_value_secondary = STATE["visualization_states"]["TAGS_TIME_SERIES"]["tags_time_series_max_values"][tag_attrbute_to_consider_secondary];

		// console.log("Updating tags time series visualization with attribute: " + tag_attribute_to_consider + ", max value: " + max_value);

		function get_tag_points_list(tag_index, tag_attribute_to_consider, getting_line_for_primary_attribute = true) {
			let points_list = [];
			let tag_name = TAG_NAMES_LIST[tag_index];
			let points_value_list = Object.values(STATE["all_tags_filter_infos"][tag_name]["list_of_point_values_by_attribute"][tag_attribute_to_consider]);
			// let all_bins_points_max_value = STATE["visualization_states"]["TAGS_TIME_SERIES"]["tags_time_series_max_values"][tag_attribute_to_consider];
			let number_of_bins = get_tags_time_series_number_of_bins();
			let time_series_width_to_use = !should_show_secondary_line ? time_series_width : time_series_width_for_secondary_attribute;
			if (points_value_list.length != number_of_bins) console.log("ERROR: points_value_list.length != number_of_bins");
			for (let i = 0; i < points_value_list.length; i++) {
				// let actual_index = i;	// Reverse the index, as the points are actually stored in reverse release date order
				let actual_index = points_value_list.length - 1 - i;	// Reverse the index, as the points are actually stored in reverse release date order
				let point_value = points_value_list[actual_index];
				let point_pos_x = (i / (points_value_list.length - 1)) * time_series_width_to_use;
				let point_pos_y = (1 - point_value / (getting_line_for_primary_attribute ? max_value_primary : max_value_secondary)) * time_series_height;
				points_list.push([point_pos_x, point_pos_y]);
			}
			// fOR DEBUG, FIND THE MAX Y COORDINATE AND PRINT IT
			// let max_y = points_list.reduce(function (max, point) {
			// 	return Math.min(max, point[1]);
			// }, 0);
			// console.log("Min y coordinate for tag " + tag_name + ": " + max_y);
			// console.log("Points list for tag " + tag_name + ": ");
			// console.log(points_list);
			return points_list;
		}

		/** Returns the string to assign to the "d" attribute of a "path" element to draw a line for the given tag given a tag attribute (e.g. "number_of_games") to consider */
		function get_tags_time_series_sharp_lines_points_string_and_max_point_attribute_for_single_tag(tag_index, tag_attribute_to_consider, using_primary_attribute = true) {
			let points_string = "M";
			let points_list = get_tag_points_list(tag_index, tag_attribute_to_consider, using_primary_attribute);
			let max_point_coordinates = [0, time_series_height];
			for (let i = 0; i < points_list.length; i++) {
				let point = points_list[i];
				points_string += point[0] + "," + point[1] + " ";
				if (point[1] < max_point_coordinates[1]) max_point_coordinates = point;
			}
			// console.log("Points string for tag " + TAG_NAMES_LIST[tag_index] + ": " + points_string);
			return [points_string, max_point_coordinates];
		}

		// Number of "bins", intervals, in the X axis for the time series
		let time_series_number_of_bins = get_tags_time_series_number_of_bins();

		/** Set the axes and lines for the tags' time series */
		function set_tags_time_series_visualization_axes(max_y_axis_value_primary, max_y_axis_value_secondary = undefined) {

			let current_y_axis_attribute = STATE["visualization_states"]["TAGS_TIME_SERIES"]["active_attribute"];
			let current_y_axis_attribute_secondary = STATE["visualization_states"]["TAGS_TIME_SERIES"]["active_attribute_secondary"];

			if (max_y_axis_value_primary == undefined || max_y_axis_value_primary == 0) max_y_axis_value_primary = 1;

			// If any of the 2 attributes is "average_review_rating", set the max value to 100
			if (current_y_axis_attribute == "average_review_rating" || current_y_axis_attribute_secondary == "average_review_rating") {
				if (current_y_axis_attribute == "average_review_rating") max_y_axis_value_primary = 100;
				if (current_y_axis_attribute_secondary == "average_review_rating") max_y_axis_value_secondary = 100;
			}

			let using_secondary_attribute = max_y_axis_value_secondary != undefined;

			let width_of_time_series_to_use = using_secondary_attribute ? time_series_width_for_secondary_attribute : time_series_width;

			let number_of_years = (2023 - 2017 + 1);

			let x_min_value = 2017;
			let x_max_value = 2023 + (1 - number_of_years / time_series_number_of_bins);

			let axes_padding = 0;

			let x_axis_range = [x_min_value, x_max_value * (1 + axes_padding)];
			let y_axis_range_primary = [0, max_y_axis_value_primary * (1 + axes_padding)];
			let y_axis_range_secondary = [0, 1]
			if (using_secondary_attribute) y_axis_range_secondary = [0, max_y_axis_value_secondary * (1 + axes_padding)];

			// Empty the axes group
			time_series_axes_group_element.select(".tags-time-series-plane").remove();

			// Create the container for the axes
			let time_series_axes_plane = time_series_axes_group_element
				.append("g")
				.attr("class", "tags-time-series-plane");

			// Create a container for the grid
			let grid_opacity = 0.15;
			let time_series_axes_grid_plane = time_series_axes_plane
				.append("g")
				.attr("class", "tags-time-series-grid-plane")
				.style("opacity", grid_opacity)
				.attr("pointer-events", "none")

			// Create a contaienr for the actual axes and ticks
			let time_series_axes_actual_plane = time_series_axes_plane
				.append("g")
				.attr("class", "tags-time-series-actual-plane");

			let x_ticks_to_show = ((x_max_value - x_min_value) + 1);
			let y_ticks_to_show_default = 8;
			let y_ticks_to_show = y_ticks_to_show_default;
			if (max_y_axis_value_primary + 1 < y_ticks_to_show_default) {
				// If the max y axis value is less than the default number of ticks to show, show only the max y axis value + 1 ticks
				y_ticks_to_show = max_y_axis_value_primary + 1;
			}

			function update_axes_lines(using_secondary_attribute) {
				if (using_secondary_attribute) {
					time_series_x_axis
						.transition()
						.duration(150)
						.attr("x2", time_series_width_for_secondary_attribute);
					time_series_y_axis_secondary
						.transition()
						.duration(150)
						.attr("opacity", 1)
					time_series_y_axis_label_secondary
						.transition()
						.duration(150)
						.attr("opacity", 1)
				} else {
					time_series_x_axis
						.transition()
						.duration(150)
						.attr("x2", time_series_width);
					time_series_y_axis_secondary
						.transition()
						.duration(150)
						.attr("opacity", 0)
					time_series_y_axis_label_secondary
						.transition()
						.duration(150)
						.attr("opacity", 0)
				}
			}

			// Set the axes lines new width based on whether we are using the secondary attribute or not
			update_axes_lines(using_secondary_attribute);

			function get_y_axis_tick_label_string(value, attribute_string) {
				let string_to_return = "";
				if (attribute_string.includes("revenue") || attribute_string.includes("price")) {
					string_to_return = "$" + format_number_string(value, 2);
					// If the string does NOT end with a letter...
					if (!string_to_return.match(/[a-z]$/i)) {
						// If the string does not have 2 decimal digits after it, add them (can have 0 or 1 decimal digit)
						if (!string_to_return.includes(".")) string_to_return += ".00";
						else if (string_to_return.split(".")[1].length == 1) string_to_return += "0";
					}
				} else {
					string_to_return = format_number_string(value, 2);
				}
				return string_to_return;
			}

			// Set the axes thicks
			for (let i = 0; i < Math.floor(x_ticks_to_show); i++) {
				let x_axis_thick_value = x_axis_range[0] + i;
				let x_axis_thick_pos_x = (i / (x_ticks_to_show - 1)) * width_of_time_series_to_use;
				let x_axis_thick_pos_y = time_series_height;
				let x_axis_thick = time_series_axes_actual_plane
					.append("line")
					.attr("class", "tags-time-series-axis-tick")
					.attr("x1", x_axis_thick_pos_x)
					.attr("y1", x_axis_thick_pos_y)
					.attr("x2", x_axis_thick_pos_x)
					.attr("y2", x_axis_thick_pos_y + 1.625)
					.attr("stroke-width", axes_stroke_width)
					.attr("stroke", axes_color);
				let x_axis_thick_text_label = time_series_axes_actual_plane
					.append("text")
					.attr("class", "tags-time-series-axis-tick-text-label")
					.attr("x", x_axis_thick_pos_x)
					.attr("y", x_axis_thick_pos_y + 1.625 * 1.75)
					.attr("text-anchor", "middle")
					.attr("alignment-baseline", "hanging")
					.attr("font-size", 3)
					.attr("fill", axes_color)
					.text(x_axis_thick_value);
				// Create vertical lines for the grid
				if (i != 0) {
					let x_axis_thick_grid = time_series_axes_grid_plane
						.append("line")
						.attr("class", "tags-time-series-axis-tick-grid")
						.attr("x1", x_axis_thick_pos_x)
						.attr("y1", 0)
						.attr("x2", x_axis_thick_pos_x)
						.attr("y2", time_series_height)
						.attr("stroke-width", axes_stroke_width)
						.attr("stroke", axes_color)
				}
				// Show in between ticks based on the time interval (with no text and shorter length)
				let num_of_in_between_ticks = Math.floor(time_series_number_of_bins / number_of_years);
				if (num_of_in_between_ticks > 12) num_of_in_between_ticks = 12;
				// console.log("num_of_in_between_ticks: " + num_of_in_between_ticks);
				if (num_of_in_between_ticks > 1) {
					for (let j = 1; j < num_of_in_between_ticks; j++) {
						// let x_axis_thick_value = x_axis_range[0] + i + j / num_of_in_between_ticks;
						let x_axis_thick_pos_x = (i / (x_ticks_to_show - 1)) * width_of_time_series_to_use + j / num_of_in_between_ticks * width_of_time_series_to_use / (x_ticks_to_show - 1);
						let x_axis_thick_pos_y = time_series_height;
						let x_axis_thick = time_series_axes_actual_plane
							.append("line")
							.attr("class", "tags-time-series-axis-tick")
							.attr("x1", x_axis_thick_pos_x)
							.attr("y1", x_axis_thick_pos_y)
							.attr("x2", x_axis_thick_pos_x)
							.attr("y2", x_axis_thick_pos_y + 1.625 / 2)
							.attr("stroke-width", axes_stroke_width)
							.attr("stroke", axes_color);
					}
				}
			}
			for (let i = 0; i < y_ticks_to_show; i++) {
				// Show 2 different axes, one on the left and one on the right
				for (let j = 0; j < 2; j++) {
					if (j == 1 && !using_secondary_attribute) continue;
					let range_to_use = j == 0 ? y_axis_range_primary : y_axis_range_secondary;
					let y_axis_thick_value = range_to_use[0] + i * (range_to_use[1] - range_to_use[0]) / (y_ticks_to_show - 1);
					let y_axis_thick_pos_x = j == 0 ? 0 : width_of_time_series_to_use + 1.625;
					let y_axis_thick_pos_y = (1 - (i / (y_ticks_to_show - 1))) * time_series_height;
					let y_axis_thick = time_series_axes_actual_plane
						.append("line")
						.attr("class", "tags-time-series-axis-tick")
						.attr("x1", y_axis_thick_pos_x)
						.attr("y1", y_axis_thick_pos_y)
						.attr("x2", y_axis_thick_pos_x - 1.625)
						.attr("y2", y_axis_thick_pos_y)
						.attr("stroke-width", axes_stroke_width)
						.attr("stroke", axes_color);
					let y_axis_thick_text_label = time_series_axes_actual_plane
						.append("text")
						.attr("class", "tags-time-series-axis-tick-text-label")
						.attr("x", (j == 0 ? y_axis_thick_pos_x - 1.625 * 1.75 : y_axis_thick_pos_x + 1.625 * 0.5))
						.attr("y", y_axis_thick_pos_y)
						.attr("text-anchor", (j == 0 ? "end" : "start"))
						.attr("alignment-baseline", "middle")
						.attr("font-size", 3)
						.attr("fill", axes_color)
						.text(get_y_axis_tick_label_string(y_axis_thick_value, j == 0 ? current_y_axis_attribute : current_y_axis_attribute_secondary));
					// Create horizontal lines for the grid
					if (i != 0 && j == 0) {
						let y_axis_thick_grid = time_series_axes_grid_plane
							.append("line")
							.attr("class", "tags-time-series-axis-tick-grid")
							.attr("x1", 0)
							.attr("y1", y_axis_thick_pos_y)
							.attr("x2", width_of_time_series_to_use)
							.attr("y2", y_axis_thick_pos_y)
							.attr("stroke-width", axes_stroke_width)
							.attr("stroke", axes_color)
					}
				}
			}
		}

		// Used to tget the updated tag color with shifted saturation and values to allow for an easier lines distinction
		let tag_lines_colors = get_associated_tag_element_colors();

		// Object containing, for each visible tag name, the coordinates of the max bin for the tags being shown
		let visible_tags_max_bin_coordinates = {};

		// Set the tags' lines
		for (let i = 0; i < tags_time_series_line_elements_list.length; i++) {
			let tag_line_primary = tags_time_series_line_elements_list[i];
			let tag_line_secondary = tags_time_series_line_elements_list_secondary[i];
			let tag_index = i;
			let tag_name = TAG_NAMES_LIST[tag_index];
			let tag_is_hidden = STATE["tags_ranking"]["tags_to_exclude"].has(tag_name);
			// let tag_name = TAG_NAMES_LIST[tag_index];
			// Get the points string for the current tag
			// let points_string = get_points_string_for_single_tag(tag_index, tag_attribute_to_consider);
			// let points_string = get_smoothed_points_string_for_single_tag(tag_index, tag_attribute_to_consider);
			let points_string_primary = "";
			let points_string_primary_secondary = "";
			if (!tag_is_hidden) {
				let primary_infos = get_tags_time_series_sharp_lines_points_string_and_max_point_attribute_for_single_tag(tag_index, tag_attribute_to_consider_primary, true);
				points_string_primary = primary_infos[0];
				visible_tags_max_bin_coordinates[tag_name] = primary_infos[1];
				if (should_show_secondary_line) points_string_primary_secondary = get_tags_time_series_sharp_lines_points_string_and_max_point_attribute_for_single_tag(tag_index, tag_attrbute_to_consider_secondary, false)[0];
			}
			// Update the tag line's points and visibility
			let max_absolute_number_of_bins = ((2023 - 2017 + 1) * 365 + 1);	// Days from 2017 to 2023 (+1 because 2020 is a leap year)
			let stroke_width = interpolate_between_values(0.125, 0.625, 1 - time_series_number_of_bins / max_absolute_number_of_bins);
			let actual_min_stroke_width = 0.125;
			let actual_max_stroke_width = 0.45;
			if (stroke_width < actual_min_stroke_width) stroke_width = actual_min_stroke_width;
			if (stroke_width > actual_max_stroke_width) stroke_width = actual_max_stroke_width;
			// Make the line slowly disappear then reappear with the correct points string
			tag_line_primary
				.transition()
				.duration(100)
				.attr("opacity", 0)
				.on("end", function (event) {
					// Set the points string after the transition has ended and make re-draw the line with dash offset
					if (!tag_is_hidden) {
						tag_line_primary
							.attr("stroke", tag_lines_colors[tag_index])
							.attr("stroke-width", stroke_width)
							.attr("d", points_string_primary);
						tag_line_primary
							.transition()
							.duration(100)
							.attr("opacity", 1);
					}
				});
			tag_line_secondary
				.transition()
				.duration(100)
				.attr("opacity", 0)
				.on("end", function (event) {
					if (!(tag_is_hidden || !should_show_secondary_line)) {

						tag_line_secondary
							// .attr("points", points_string);
							.attr("d", points_string_primary_secondary)
							.attr("stroke", tag_lines_colors[tag_index])
							.attr("stroke-width", stroke_width);
						tag_line_secondary
							.transition()
							.duration(100)
							.attr("opacity", 1);
					}
				});
		}

		// Set the axes ticks and labels
		set_tags_time_series_visualization_axes(max_value_primary, max_value_secondary);

		// Also set tag lines visibility
		// update_tags_time_series_lines_visibility();

		// Set the tags' names texts
		update_tags_time_series_tags_names_texts(visible_tags_max_bin_coordinates);

	}

	// Create one line for each tag, without setting their positions yet
	for (let i = 0; i < TAG_NAMES_LIST.length; i++) {

		let tag_index = i;
		// let tag_name = TAG_NAMES_LIST[tag_index];

		let tag_category = get_tag_category_by_index(tag_index);
		let category_index = categories_list.indexOf(tag_category);

		// Create a line path for the current tag
		let tag_line = tags_time_series_lines_container
			// .append("polyline")
			.append("path")
			.attr("class", "tags-time-series-tag-line")
			.attr("tag-index", tag_index)
			.attr("fill", "none")
			.attr("stroke", offset_saturation_and_value(color_scheme["tag_colors"][category_index], 0, 5))
			.attr("stroke-width", tag_lines_width)
			// Make the polyline's line round
			.attr("stroke-linecap", "round")
			.attr("stroke-linejoin", "round");

		// Create a secondary line path for the current tag (dashed)
		let tag_line_secondary = tags_time_series_lines_container
			// .append("polyline")
			.append("path")
			.attr("class", "tags-time-series-tag-line-secondary")
			.attr("tag-index", tag_index)
			.attr("fill", "none")
			.attr("stroke", offset_saturation_and_value(color_scheme["tag_colors"][category_index], 0, 5))
			.attr("stroke-width", tag_lines_width)
			// Make the polyline's line round
			.attr("stroke-linecap", "round")
			.attr("stroke-linejoin", "round")
			.attr("stroke-dasharray", "1,1");

		// Add the line path to the list
		tags_time_series_line_elements_list.push(tag_line);
		tags_time_series_line_elements_list_secondary.push(tag_line_secondary);

	}

	// Create a "hover rect" to detect mouse hover events on the time series visualization
	let hover_text_font_size = 2.5;
	let hover_lines_color = "#ffffff";
	let time_series_hover_rect = time_series_group
		.append("rect")
		.attr("class", "tags-time-series-hover-rect")
		.attr("x", 0)
		.attr("y", 0)
		.attr("width", time_series_width)
		.attr("height", time_series_height)
		.attr("fill", "rgba(0,0,0,0)")
		.attr("pointer-events", "all")
		// hide the cursor when hovering over the rect
		.attr("cursor", "crosshair");
	// Create horizontal end vertical lines to show on hover
	let time_series_hover_lines_group = time_series_group
		.append("g")
		.attr("class", "tags-time-series-hover-lines-group")
		.attr("opacity", 0)
		// Add a shwdow to the lines
		// .attr("filter", "drop-shadow( 0 0 0.125em rgba(0,0,0,0.5) )")
		.attr("pointer-events", "none");
	let time_series_hover_lines_horizontal = time_series_hover_lines_group
		.append("line")
		.attr("class", "tags-time-series-hover-lines-horizontal")
		.attr("x1", 0)
		.attr("y1", 0)
		.attr("x2", time_series_width)
		.attr("y2", 0)
		.attr("stroke-width", 0.25)
		.attr("stroke", hover_lines_color);
	let time_series_hover_lines_vertical = time_series_hover_lines_group
		.append("line")
		.attr("class", "tags-time-series-hover-lines-vertical")
		.attr("x1", 0)
		.attr("y1", 0)
		.attr("x2", 0)
		.attr("y2", time_series_height)
		.attr("stroke-width", 0.25)
		.attr("stroke", hover_lines_color);
	let time_series_hover_texts = time_series_hover_lines_group
		.append("g")
		.attr("class", "tags-time-series-hover-texts")
		.attr("pointer-events", "none");
	let time_series_hover_text_x = time_series_hover_texts
		.append("text")
		.attr("class", "tags-time-series-hover-text-x no-shadow")
		.attr("x", 0)
		.attr("y", 0)
		.attr("text-anchor", "start")
		.attr("alignment-baseline", "hanging")
		.attr("font-size", hover_text_font_size)
		.attr("fill", hover_lines_color)
		.attr("stroke", color_scheme["viewport_cells"])
		.attr("stroke-width", 0.75)
		.attr("paint-order", "stroke")
	let time_series_hover_text_y1 = time_series_hover_texts
		.append("text")
		.attr("class", "tags-time-series-hover-text-y no-shadow")
		.attr("x", 0)
		.attr("y", hover_text_font_size * 1.25)
		.attr("text-anchor", "start")
		.attr("alignment-baseline", "hanging")
		.attr("font-size", hover_text_font_size)
		.attr("fill", hover_lines_color)
		.attr("stroke", color_scheme["viewport_cells"])
		.attr("stroke-width", 0.75)
		.attr("paint-order", "stroke")
	let time_series_hover_text_y2 = time_series_hover_texts
		.append("text")
		.attr("class", "tags-time-series-hover-text-y no-shadow")
		.attr("x", 0)
		.attr("y", hover_text_font_size * 2.5)
		.attr("text-anchor", "start")
		.attr("alignment-baseline", "hanging")
		.attr("font-size", hover_text_font_size)
		.attr("fill", hover_lines_color)
		.attr("stroke", color_scheme["viewport_cells"])
		.attr("stroke-width", 0.75)
		.attr("paint-order", "stroke")
	// On hover over the time series, show the hover lines
	time_series_hover_rect
		.on("mouseover", function (event) {
			// Show the hover lines
			time_series_hover_lines_group
				.attr("opacity", 1);
		})
		.on("mouseout", function (event) {
			// Hide the hover lines
			time_series_hover_lines_group
				.attr("opacity", 0);
		})
		.on("mousemove", function (event) {
			// Get the mouse position
			let mouse_pos = d3.pointer(event);
			let mouse_pos_x = mouse_pos[0];
			let mouse_pos_y = mouse_pos[1];
			// console.log("Mouse pos: " + mouse_pos_x + ", " + mouse_pos_y);
			// Set the hover lines position
			set_hover_lines(mouse_pos_x, mouse_pos_y);
		});
	function set_hover_lines(graph_pos_x, graph_pos_y) {
		// Get a snap position of the mouse position on the X axis based on the number of bins used
		let number_of_bins = get_tags_time_series_number_of_bins();
		let showing_y2_axis = STATE["visualization_states"]["TAGS_TIME_SERIES"]["active_attribute_secondary"] != "none";
		let time_series_width_to_use = showing_y2_axis ? time_series_width_for_secondary_attribute : time_series_width;
		let snap_pos_x = Math.round(graph_pos_x / time_series_width_to_use * (number_of_bins - 1)) / (number_of_bins - 1) * time_series_width_to_use;
		// Set the hover lines position
		time_series_hover_lines_horizontal
			.attr("y1", graph_pos_y)
			.attr("y2", graph_pos_y);
		time_series_hover_lines_vertical
			.attr("x1", snap_pos_x)
			.attr("x2", snap_pos_x);
		// Set the hover text position
		let offset_x = 1.5;
		let offset_y = 1.25;
		// Check if the text should be shown left or right and up or down
		let show_up = graph_pos_y < time_series_height / 2;
		let show_left = snap_pos_x > time_series_width_to_use / 2;
		let graph_container_pos_x = snap_pos_x;
		let graph_container_pos_y = graph_pos_y;
		if (show_up) {
			graph_container_pos_y += offset_y;
		} else {
			graph_container_pos_y -= offset_y;
			let texts_being_shown = 0;
			if (time_series_hover_text_x.text() != "") texts_being_shown++;
			if (time_series_hover_text_y1.text() != "") texts_being_shown++;
			if (time_series_hover_text_y2.text() != "") texts_being_shown++;
			let line_height = hover_text_font_size * 1.25;
			graph_container_pos_y -= (texts_being_shown) * line_height;
		}
		if (show_left) {
			graph_container_pos_x -= offset_x;
			time_series_hover_text_x.attr("text-anchor", "end");
			time_series_hover_text_y1.attr("text-anchor", "end");
			time_series_hover_text_y2.attr("text-anchor", "end");
		} else {
			graph_container_pos_x += offset_x;
			time_series_hover_text_x.attr("text-anchor", "start");
			time_series_hover_text_y1.attr("text-anchor", "start");
			time_series_hover_text_y2.attr("text-anchor", "start");
		}
		time_series_hover_texts
			// .attr("transform", "translate(" + (snap_pos_x + offset_x) + "," + (graph_pos_y + offset_y) + ")");
			.attr("transform", "translate(" + (graph_container_pos_x) + ", " + (graph_container_pos_y) + ")");
		// Set the hover text values
		function get_x_value_text(value) {
			// Value is in the range [0, 1]
			let string_to_return = "";
			let current_x_axis_interval = STATE["visualization_states"]["TAGS_TIME_SERIES"]["time_interval"];
			let month_names = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Otc", "Nov", "Dec"];
			let month_names_full = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
			if (current_x_axis_interval == "year") {
				string_to_return = "X | " + (value * (2023 - 2017 + 1) + 2017).toFixed(0);
			} else if (current_x_axis_interval == "semester") {
				let year = Math.floor(value * (2023 - 2017 + 1) + 2017);
				let semester = Math.floor((value * (2023 - 2017 + 1) + 2017 - year) * 2) + 1;
				string_to_return = "X | " + year + " S" + semester;
			} else if (current_x_axis_interval == "quarter") {
				let year = Math.floor(value * (2023 - 2017 + 1) + 2017);
				let quarter = Math.floor((value * (2023 - 2017 + 1) + 2017 - year) * 4) + 1;
				string_to_return = "X | " + year + " Q" + quarter;
			} else if (current_x_axis_interval == "month") {
				let year = Math.floor(value * (2023 - 2017 + 1) + 2017);
				let month = Math.floor((value * (2023 - 2017 + 1) + 2017 - year) * 12) + 1;
				string_to_return = "X | " + month_names_full[month - 1] + " " + year;
			} else if (current_x_axis_interval == "day") {
				let year = Math.floor(value * (2023 - 2017 + 1) + 2017);
				let month = Math.floor((value * (2023 - 2017 + 1) + 2017 - year) * 12) + 1;
				let day = Math.floor(((value * (2023 - 2017 + 1) + 2017 - year) * 12 - month + 1) * 30) + 1;
				string_to_return = "X | " + day + " " + month_names[month - 1] + " " + year;
			}
			return string_to_return;
		}
		function get_y_value_text(value, is_y1) {
			let string_to_return = "";
			let attribute = is_y1 ? STATE["visualization_states"]["TAGS_TIME_SERIES"]["active_attribute"] : STATE["visualization_states"]["TAGS_TIME_SERIES"]["active_attribute_secondary"];
			let max_value = STATE["visualization_states"]["TAGS_TIME_SERIES"]["tags_time_series_max_values"][attribute];
			let attribute_name_string = attribute.replace(/_/g, " ").toUpperCase();
			if (attribute == "average_review_rating") {
				string_to_return = "Y" + (is_y1 ? "1" : "2") + " | " + attribute_name_string + ": " + (value * max_value * 100).toFixed(0) + "%";
			} else if (attribute == "total_revenue" || attribute == "average_revenue" || attribute == "average_price") {
				string_to_return = "Y" + (is_y1 ? "1" : "2") + " | " + attribute_name_string + ": $" + format_number_string(value * max_value, 2);
			} else {
				string_to_return = "Y" + (is_y1 ? "1" : "2") + " | " + attribute_name_string + ": " + format_number_string(value * max_value, 2);
			}
			return string_to_return;
		}
		time_series_hover_text_x
			.text(get_x_value_text(snap_pos_x / time_series_width_to_use));
		time_series_hover_text_y1
			.text(get_y_value_text(1 - graph_pos_y / time_series_height, true));
		if (showing_y2_axis) {
			time_series_hover_text_y2
				.text(get_y_value_text(1 - graph_pos_y / time_series_height, false));
		} else {
			time_series_hover_text_y2
				.text("");
		}

	}

	// Add on hover function to the info button
	let tags_time_series_section_info_button = $(section_element_selector + " #section-info-button");
	tags_time_series_section_info_button
		.on("mouseover", function (event) {
			// Set tooltip
			let element = $(this);
			let optimal_tooltip_position = calculate_tooltip_optimal_translate_position(element);
			set_tooltip(
				element,
				"Tags Time Series",
				[
					"Shows the evolution of one or two chosen tag attributes over time (for each of the included tags).",
					"Each line represents a tag plotted with respect to a tag attribute on the Y axis, with time on the X axis.",
					TOOLTIP_LINE_SEPARATOR,
					"Adjust the slider on top to select the time interval to use for the time series visualization.",
					"Click on the 'Y1 Axis' and 'Y2 Axis' buttons to select the tag attribute to plot on the Y1 and Y2 axes (the left and right Y axes).",
					"Solid lines represent tag attributes plotted based on the values shown on the Y1 axis.",
					"Dotted lines represent tag attributes plotted based on the values shown on the Y2 axis.",
					"NOTE: choose the 'NONE' option from the select button for the Y2 axis to hide the Y2 axis entirely."
				],
				optimal_tooltip_position
			);
		})
		.on("mouseout", function (event) {
			// Hide tooltip
			hide_tooltip();
		});

	update_tags_time_series();

	tags_time_series_visualization_container.on("update_lines", function (event) {
		update_tags_time_series();
	});

}

function update_tags_time_series_visualization() {
	// Dispatch an update event
	let event = new Event("update_lines");
	tags_time_series_visualization_container[0].dispatchEvent(event);
}


/* Function to create a container (to append to the "gray"-background outer container) for a single game/tag info div for the "Games Info" or "Tags Info" sections */
function create_info_sub_div_for_info_sections(div_text, wide_div = false, font_size = 0.75, transparent_color = false, color = color_scheme["white"], background_color = color_scheme["dark_gray_1"], background_opacity = 0.7) {
	let game_info_div = $(document.createElement("div"))
		.attr("class", "game-info-div")
		.css("width", wide_div ? "100%" : "50%")
		.css("font-size", font_size + "em")
		.css("opacity", transparent_color ? 0.75 : 1)
		// .css("line-height", "1em")
		.html(div_text);
	// games_info_divs_container.append(game_info_div);
	return $(game_info_div);
}

/* Function to create a container for a single game/tag info div (with a "gray" (transparent white) background) for the "Games Info" or "Tags Info" sections */
function create_info_div_for_info_sections(height_percentage = 100) {
	// let width_portion = Math.round(width / 100 * 1000) / 1000;
	let padding_sides = 0.4;	// In em
	let games_info_section = $(document.createElement("div"))
		.attr("class", "info-section")
		.css("padding", "0.325em " + padding_sides + "em")
		.css("padding-top", "0.675em")
		.css("background-color", "#ffffff20")
		.css("border-radius", "0.375em")
		// .css("width", "calc(47.5% * 2 * " + width_portion + " - " + (padding_sides * 2) + "em)")
		.css("width", "calc(96% - " + (padding_sides * 2) + "em)")
		.css("height", "calc(" + height_percentage + "% - 0.325em - 0.675em)")
		.css("display", "inline-flex")
		.css("flex-direction", "column")
		.css("justify-content", "flex-start")
		.css("align-items", "center");
	return games_info_section;
}


function create_general_game_infos_section() {

	// Create the section container
	let container_selector = "#info-games";
	let section_container = $(container_selector);

	// Create an outer container
	let outer_container = $(document.createElement("div"))
		.attr("class", "games-info-section-outer-container");
	section_container.append(outer_container);

	// Create the section's title container
	let section_title_container = $(document.createElement("div"))
		.attr("class", "games-info-section-title-container")
		.css("display", "inline-flex")
		.css("flex-direction", "row")
		.css("justify-content", "space-between")
		.css("align-items", "flex-start")
		.css("width", "100%");
	// .html("GENERAL GAMES INFO");
	outer_container.append(section_title_container);

	// Create a title div
	let section_title_div = $(document.createElement("div"))
		.attr("class", "games-info-section-title alternative-section-title")
		.html("GENERAL GAME RESULTS INFO");
	section_title_container.append(section_title_div);

	// Create a container div for the info button
	let info_button_container = $(document.createElement("div"))
		.attr("class", "info-button-container")
		.css("width", "0.9125em")
		.css("height", "0.9125em")
		.css("margin-top", "0.05em")
		.css("margin-right", "0.5em")
	section_title_container.append(info_button_container);
	// Add a div with id "#section-info-button" to contain the reset button
	let section_info_button = $(document.createElement("div"))
		.attr("id", "section-info-button")
		.css("width", "100%")
		.css("height", "100%")
	info_button_container.append(section_info_button);
	// Add hover function to the info button
	section_info_button
		.on("mouseover", function (event) {
			// Set tooltip
			let element = $(this);
			let optimal_tooltip_position = calculate_tooltip_optimal_translate_position(element);
			set_tooltip(
				element,
				"GENERAL GAME RESULTS INFO",
				[
					"Shows general information about game resuults based on the current filter criterias (total games results, total revenue and copies sold, and average revenue, average copies sold, average review rating and average price)."
				],
				optimal_tooltip_position
			);
		})
		.on("mouseout", function (event) {
			// Hide tooltip
			hide_tooltip();
		});

	// Create a container for divs with the various game infos
	let games_info_divs_container = $(document.createElement("div"))
		.attr("class", "games-info-divs-container")
		.css("width", "100%")
		.css("height", "91%")
	outer_container.append(games_info_divs_container);

	// Given a number or a string, return a string with the number formatted with spaces every 3 digits
	function format_number_string_with_spaces(number_or_string, separator = "<span style='font-size: 0.75em'>&nbsp;</span>") {
		if (typeof number_or_string == "number") number_or_string = number_or_string.toString();
		// Add one space every 3 digits, starting from the end
		let number_string_integer_part = number_or_string.split(".")[0];
		let number_string_decimal_part = number_or_string.split(".")[1];
		let number_string_integer_part_with_spaces = "";
		for (let i = number_string_integer_part.length - 1; i >= 0; i--) {
			let digit = number_string_integer_part[i];
			number_string_integer_part_with_spaces = digit + number_string_integer_part_with_spaces;
			if ((number_string_integer_part.length - i) % 3 == 0 && i != 0) number_string_integer_part_with_spaces = separator + number_string_integer_part_with_spaces;
		}
		return number_string_integer_part_with_spaces + (number_string_decimal_part != undefined ? "." + number_string_decimal_part : "");
	}

	let left_section_width = 50; // In %

	// Create the left section container
	let left_section_container = $(document.createElement("div"))
		.attr("class", "games-info-section-left-container")
		.css("width", left_section_width + "%")
		.css("height", "100%")
		.css("display", "inline-flex")
		.css("flex-direction", "column")
		.css("justify-content", "flex-start")
		.css("align-items", "center");
	$(games_info_divs_container).append(left_section_container);

	// Create the right section container
	let right_section_container = $(document.createElement("div"))
		.attr("class", "games-info-section-right-container")
		.css("width", (100 - left_section_width) + "%")
		.css("height", "100%")
		.css("display", "inline-flex")
		.css("flex-direction", "column")
		.css("justify-content", "flex-start")
		.css("align-items", "center");
	$(games_info_divs_container).append(right_section_container);

	// Create divs as containers for the main game infos (the top left section)
	let total_game_results_container = $(create_info_div_for_info_sections())
	// .css("padding-bottom", "0.5em")
	$(left_section_container).append(total_game_results_container);
	// Add hover tooltip
	total_game_results_container
		.on("mouseover", function (event) {
			// Set tooltip
			set_tooltip($(this), "TOTAL GAME RESULTS", ["Shows the percentage and number of games that meet the filter criterias out of all games."], [1, 0], [0, 0], true);
		})
		.on("mouseout", function (event) {
			// Hide tooltip
			hide_tooltip();
		});
	$(total_game_results_container).append(
		create_info_sub_div_for_info_sections("TOTAL GAME RESULTS", false, 0.6375, true)
			.css("width", "100%")
			.css("text-align", "center")
			.css("font-weight", "500")
	);
	let percentage_of_all_games_div = create_info_sub_div_for_info_sections(0, false, 2)
		.css("font-weight", "bold")
		.css("width", "100%")
		.css("text-align", "center")
		.css("margin-top", "0.15em")
		.css("display", "inline-flex")
		.css("justify-content", "center")
		.css("align-items", "center")
		.css("line-height", "0.85em")
		.text("0.0%");
	$(total_game_results_container).append(percentage_of_all_games_div);
	let number_of_shown_games_div = create_info_sub_div_for_info_sections(0, false, 1)
		.css("font-weight", "bold")
		.css("width", "100%")
		.css("text-align", "center")
		.css("opacity", 0.65)
	$(total_game_results_container).append(number_of_shown_games_div);
	// Create a div as a container for the average values infos
	let value_and_percentage_divs_spacing = 0.85;
	let value_and_percentage_divs_spacing_last = 0.25;
	let average_values_infos_container = $(create_info_div_for_info_sections());
	$(right_section_container).append(average_values_infos_container);
	average_values_infos_container
		.on("mouseover", function (event) {
			// Set tooltip
			set_tooltip($(this), "AVERAGE RESULTS VALUES", ["Shows the average revenue, copies sold, review rating and price of the games that meet the filter criterias.", "Also shows the increase/decrease, in percentage, of the same value with respect to all games."], [1, 0], [0, 0], true);
		})
		.on("mouseout", function (event) {
			// Hide tooltip
			hide_tooltip();
		});
	let average_values_divs = [];
	let average_values_percentages_divs = [];
	let game_attribute_names = ["revenue", "copies_sold", "review_rating", "price"];
	// Create the name, value and percentage divs and append them to the given container div, then return the value and percentage divs (plus the max value div, or undefined if it was NOT created)
	function create_value_and_percentage_divs(game_attribute, container_div, total_or_average, margin_bottom, show_max_value_div = false) {
		let attribute_container_div = $(document.createElement("div"))
			.attr("class", "game-attribute-container-div")
			.css("width", "100%")
			.css("display", "inline-flex")
			.css("flex-direction", "column")
			.css("justify-content", "flex-start")
			.css("align-items", "center")
			// .css("margin-top", "0.125em")
			.css("margin-bottom", margin_bottom + "em")
		// .css("border", "0.175em solid #00000050")
		$(container_div).append(attribute_container_div);
		let game_attribute_name = total_or_average.toUpperCase() + " " + game_attribute.split("_").map(function (word) {
			return word.charAt(0).toUpperCase() + word.slice(1);
		}).join(" ").toUpperCase();
		let average_attribute_name_div = $(attribute_container_div).append(
			create_info_sub_div_for_info_sections(game_attribute_name, false, 0.6375, true)
				.css("width", "100%")
				.css("text-align", "center")
				.css("font-weight", "500")
				.css("white-space", "nowrap")
		);
		let average_value_div = create_info_sub_div_for_info_sections(0, false, 1.25)
			.css("font-weight", "bold")
			.css("width", "100%")
			.css("text-align", "center")
			.css("line-height", "1.1em")
		$(attribute_container_div).append(average_value_div);
		// average_values_divs.push(average_value_div);
		let average_value_percentage_div = create_info_sub_div_for_info_sections(0, false, 0.625)
			.css("font-weight", "bold")
			.css("width", "100%")
			.css("text-align", "center")
			.css("opacity", 0.65)
			.css("line-height", "1.1em")
			.css("white-space", "nowrap")
		$(attribute_container_div).append(average_value_percentage_div);
		// average_values_percentages_divs.push(average_value_percentage_div);
		let max_value_div = undefined;
		if (show_max_value_div) {
			max_value_div = create_info_sub_div_for_info_sections(0, false, 0.8)
				.css("font-weight", "bold")
				.css("width", "100%")
				.css("text-align", "center")
				.css("opacity", 0.65)
				.css("line-height", "1.1em")
				.css("white-space", "nowrap")
				.css("margin-top", "0.125em")
			$(attribute_container_div).append(max_value_div);
		}
		return [average_value_div, average_value_percentage_div, max_value_div];
	}
	for (let i = 0; i < game_attribute_names.length; i++) {
		let game_attribute = game_attribute_names[i];
		let margin_bottom_to_use = (i < game_attribute_names.length - 1 ? value_and_percentage_divs_spacing : value_and_percentage_divs_spacing_last);
		let value_and_percentage_divs = create_value_and_percentage_divs(game_attribute, average_values_infos_container, "average", margin_bottom_to_use);
		let average_value_div = value_and_percentage_divs[0];
		let average_value_percentage_div = value_and_percentage_divs[1];
		average_values_divs.push(average_value_div);
		average_values_percentages_divs.push(average_value_percentage_div);
	}

	// Create a "total values" div in the left section
	let total_values_div = $(create_info_div_for_info_sections());
	total_values_div.css("margin-top", "0.375em");
	$(left_section_container).append(total_values_div);
	total_values_div
		.on("mouseover", function (event) {
			// Set tooltip
			set_tooltip($(this), "TOTAL RESULTS VALUES", ["Shows the total revenue and total copies sold of the games that meet the filter criterias.", "Also shows the increase/decrease, in percentage, of the same value with respect to all games, and the max revenue and max copies sold of the game with the highest revenue and the highest amount of copies sold respectively."], [1, 0], [0, 0], true);
		})
		.on("mouseout", function (event) {
			// Hide tooltip
			hide_tooltip();
		});
	let total_revenue_divs = create_value_and_percentage_divs("revenue", total_values_div, "total", value_and_percentage_divs_spacing, true);
	let total_revenue_div = total_revenue_divs[0];
	let total_revenue_percentage_div = total_revenue_divs[1];
	let total_revenue_max_value_div = total_revenue_divs[2];
	let total_copies_sold_divs = create_value_and_percentage_divs("copies_sold", total_values_div, "total", value_and_percentage_divs_spacing_last, true);
	let total_copies_sold_div = total_copies_sold_divs[0];
	let total_copies_sold_percentage_div = total_copies_sold_divs[1];
	let total_copies_sold_max_value_div = total_copies_sold_divs[2];

	// Function to update the game infos
	function update_game_infos() {

		function calculate_increase_string(value, game_attribute, total_or_average) {
			let value_for_all_games = STATE["all_games_infos"][total_or_average + "_" + game_attribute];
			let average_value_percentage_increase_or_decrease = ((value - value_for_all_games) / value_for_all_games) * 100;
			let is_increasing = average_value_percentage_increase_or_decrease >= 0;
			average_value_percentage_increase_or_decrease = Math.abs(average_value_percentage_increase_or_decrease);
			let average_value_percentage_increase_or_decrease_html = (Math.round(average_value_percentage_increase_or_decrease * 100) / 100).toString();
			// Show decimal digits only if the value has 2 integer digits or less
			if (average_value_percentage_increase_or_decrease_html.split(".")[0].length > 3) average_value_percentage_increase_or_decrease_html = Math.round(average_value_percentage_increase_or_decrease * 1) / 1;
			else if (average_value_percentage_increase_or_decrease_html.split(".")[0].length > 2) average_value_percentage_increase_or_decrease_html = Math.round(average_value_percentage_increase_or_decrease * 10) / 10;
			average_value_percentage_increase_or_decrease_html = format_number_string_with_spaces(average_value_percentage_increase_or_decrease_html);
			average_value_percentage_increase_or_decrease_html = ((is_increasing ? "+" : "-")) + (average_value_percentage_increase_or_decrease_html);
			let additional_string = "<span style='font-size: 0.875em; font-weight: normal;'> vs ALL GAMES</span>";
			average_value_percentage_increase_or_decrease_html = average_value_percentage_increase_or_decrease_html + "%" + additional_string;
			return average_value_percentage_increase_or_decrease_html;
		}
		function calculate_max_value_string(game_attribute) {
			let max_value = STATE["games_global_infos"]["max_" + game_attribute];
			let max_value_html = format_number_string(max_value, 2);
			if (game_attribute == "revenue" || game_attribute == "price") max_value_html = "$" + max_value_html;
			// let additional_string = "<span style='font-size: 0.875em; font-weight: normal;'>HIGHEST " + game_attribute.toUpperCase().split("_").map(function (word) {
			// 	return word.charAt(0).toUpperCase() + word.slice(1);
			// }).join(" ") + ":&nbsp;</span>";
			let additional_string = "<span style='font-size: 0.875em; font-weight: normal;'>MAX:&nbsp;</span>"
			max_value_html = additional_string + max_value_html;
			return max_value_html;
		}

		// Calculate the number of game results
		let number_of_shown_games = STATE["filtered_games"].length;
		let number_of_shown_games_html =
			"<span>" + format_number_string_with_spaces(number_of_shown_games) + "</span>" +
			"<span style='opacity: 0.875; font-size: 0.625em;'> / " + format_number_string_with_spaces(TOTAL_NUMBER_OF_GAMES) + "</span>";
		number_of_shown_games_div.html(number_of_shown_games_html);
		// Update the percentage of all games shown "percentage_of_all_games_div"
		let percentage_of_all_games = number_of_shown_games / TOTAL_NUMBER_OF_GAMES * 100;
		let percentage_of_all_games_html = Math.round(percentage_of_all_games * 10) / 10 + "%";
		if (percentage_of_all_games_html == "0%" && number_of_shown_games > 0) percentage_of_all_games_html = "<span style='font-size: 0.675em;'>&lt;&nbsp;</span>0.1%";
		percentage_of_all_games_div.html(percentage_of_all_games_html);

		// Update the divs with the average values stored in STATE["games_global_infos"]
		for (let i = 0; i < average_values_divs.length; i++) {
			let average_value_div = average_values_divs[i];
			let game_attribute = game_attribute_names[i];
			let average_value = STATE["games_global_infos"]["average_" + game_attribute];
			let average_value_html = format_number_string(average_value, 2);
			if (game_attribute == "revenue" || game_attribute == "price") average_value_html = "$" + average_value_html;
			if (game_attribute == "price") {
				if (!average_value_html.includes(".")) average_value_html += ".00";
				else if (average_value_html.split(".")[1].length == 1) average_value_html += "0";
			}
			if (game_attribute == "copies_sold") average_value_html = format_number_string(Math.round(average_value), 2);
			if (game_attribute == "review_rating") average_value_html = Math.round(average_value * 100) + "%";
			average_value_div.html(average_value_html);
			let average_value_percentage_div = average_values_percentages_divs[i];
			// Calculate the increase/decrease, in percentage, of this average value with respect to the average value for all games
			let increase_string = calculate_increase_string(average_value, game_attribute, "average");
			average_value_percentage_div.html(increase_string);

		}

		// Update the total / max revenue div
		let total_revenue = STATE["games_global_infos"]["total_revenue"];
		let total_revenue_html = "$" + format_number_string(total_revenue, 2);
		total_revenue_div.html(total_revenue_html);
		let total_revenue_increase_string = calculate_increase_string(total_revenue, "revenue", "total");
		total_revenue_percentage_div.html(total_revenue_increase_string);
		let total_revenue_max_value_html = calculate_max_value_string("revenue");
		total_revenue_max_value_div.html(total_revenue_max_value_html);
		// Update the total / max copies sold div
		let total_copies_sold = STATE["games_global_infos"]["total_copies_sold"];
		let total_copies_sold_html = format_number_string(total_copies_sold, 2);
		total_copies_sold_div.html(total_copies_sold_html);
		let total_copies_sold_increase_string = calculate_increase_string(total_copies_sold, "copies_sold", "total");
		total_copies_sold_percentage_div.html(total_copies_sold_increase_string);
		let total_copies_sold_max_value_html = calculate_max_value_string("copies_sold");
		total_copies_sold_max_value_div.html(total_copies_sold_max_value_html);

	}

	// Set initial game infos
	update_game_infos();

	// On "update_visualizations" event of the container element, update the game infos
	section_container.on("update_visualizations", function (event) {
		update_game_infos();
	});

}

let CACHED_LIST_OF_TAG_INDEXES_SORTED_BY_TAG_ATTRIBUTE_FOR_GAMES_RESULTS = null;

/** 
 * Returns a list of tag indexes sorted by the given tag attribuete's value for games in the results that have the tag at the given index (descending order).
 * 
 * NOTE: this is different than the usual list of tags sorted by tag attributes of the tags ranking visualization 
 * 		(underneath the tags parallel coordinates view), beacuse this list also takes into account filters on tags 
 * 		to get the current number of filtered results with a certain tag.
 * 
 * Returns an object with "list" and "max_value" properties, where "list" is the list of tag indexes sorted by the given tag attribute's value for games in the results that have the tag at the given index (descending order), and "max_value" is the maximum value of the given tag attribute for the tags in the results.
 */
function get_list_of_tag_indexes_sorted_by_tag_attribute_in_results(tag_attribute) {
	if (CACHED_LIST_OF_TAG_INDEXES_SORTED_BY_TAG_ATTRIBUTE_FOR_GAMES_RESULTS != null && CACHED_LIST_OF_TAG_INDEXES_SORTED_BY_TAG_ATTRIBUTE_FOR_GAMES_RESULTS[tag_attribute] != null) return CACHED_LIST_OF_TAG_INDEXES_SORTED_BY_TAG_ATTRIBUTE_FOR_GAMES_RESULTS[tag_attribute];
	let tag_indexes = Array.from(Array(TOTAL_NUMBER_OF_TAGS).keys());
	let max_value = -Infinity;
	let tag_indexes_sorted_by_attribute_in_game_results = tag_indexes.sort(function (a, b) {
		if (tag_attribute == "alphabetical") {
			let tag_a_name = TAG_NAMES_LIST[a];
			let tag_b_name = TAG_NAMES_LIST[b];
			if (tag_a_name < tag_b_name) return -1;
			if (tag_a_name > tag_b_name) return 1;
			return 0;
		}
		let tag_a_attribute_value = STATE["filtered_results_tags_infos"][tag_attribute][TAG_NAMES_LIST[a]];
		let tag_b_attribute_value = STATE["filtered_results_tags_infos"][tag_attribute][TAG_NAMES_LIST[b]];
		if (tag_a_attribute_value > max_value) max_value = tag_a_attribute_value;
		if (tag_b_attribute_value > max_value) max_value = tag_b_attribute_value;
		return tag_b_attribute_value - tag_a_attribute_value;
	});
	if (CACHED_LIST_OF_TAG_INDEXES_SORTED_BY_TAG_ATTRIBUTE_FOR_GAMES_RESULTS == null) CACHED_LIST_OF_TAG_INDEXES_SORTED_BY_TAG_ATTRIBUTE_FOR_GAMES_RESULTS = {};
	if (tag_attribute == "alphabetical") max_value = 1;
	CACHED_LIST_OF_TAG_INDEXES_SORTED_BY_TAG_ATTRIBUTE_FOR_GAMES_RESULTS[tag_attribute] = {
		"list": tag_indexes_sorted_by_attribute_in_game_results,
		"max_value": max_value
	};
	return CACHED_LIST_OF_TAG_INDEXES_SORTED_BY_TAG_ATTRIBUTE_FOR_GAMES_RESULTS[tag_attribute];
}

function create_general_tags_infos_section() {

	// Create the section container
	let container_selector = "#info-tags";
	let section_container = $(container_selector);

	// Create an outer container
	let outer_container = $(document.createElement("div"))
		.attr("class", "tags-info-section-outer-container");
	section_container.append(outer_container);

	// Create the section's title container
	let section_title_container = $(document.createElement("div"))
		.attr("class", "tags-info-section-title-container")
		.css("display", "inline-flex")
		.css("flex-direction", "row")
		.css("justify-content", "space-between")
		.css("align-items", "flex-start")
		.css("width", "100%");
	// .html("GENERAL TAGS INFO");
	outer_container.append(section_title_container);

	// Create a title div
	let section_title_div = $(document.createElement("div"))
		.attr("class", "tags-info-section-title alternative-section-title")
		.html("GENERAL TAG RESULTS INFO");
	section_title_container.append(section_title_div);

	// Create a container div for the info button
	let info_button_container = $(document.createElement("div"))
		.attr("class", "info-button-container")
		.css("width", "0.9125em")
		.css("height", "0.9125em")
		.css("margin-top", "0.05em")
		.css("margin-right", "0.5em")
	section_title_container.append(info_button_container);
	// Add a div with id "#section-info-button" to contain the reset button
	let section_info_button = $(document.createElement("div"))
		.attr("id", "section-info-button")
		.css("width", "100%")
		.css("height", "100%")
	info_button_container.append(section_info_button);
	// Add hover function to the info button
	section_info_button
		.on("mouseover", function (event) {
			// Set tooltip
			let element = $(this);
			let optimal_tooltip_position = calculate_tooltip_optimal_translate_position(element);
			set_tooltip(
				element,
				"GENERAL TAG RESULTS INFO",
				[
					"Shows general information about included, excluded and neutral tags (total results, non-excluded tags' average copies sold, revenue, review rating and price, and ultimately the complete list of included, excluded and neutral tags).",
					"The list of included, neutral and excluded tags contains all the tags, grouped by their inclusion status, and sorted by the total number of games in the filtered results with that specific tag, which is also directly proportional to the width of the each tag's bar.",
					"Each tag's bar is colored based on the tag's category (Genre, Sub-Genre or Feature), with slight variations of the saturation and lightness to make them more easily distinguishable.",
					"Each tag bar's slight color variation for the tags list is consistent with the color of the tag elements throughout the tag lines and points of the various system's visualizations.",
					"Hover over a tag on the list to see its details."
				],
				optimal_tooltip_position
			);
		})
		.on("mouseout", function (event) {
			// Hide tooltip
			hide_tooltip();
		});

	// Create a container for divs with the various tag infos
	let tags_info_divs_container = $(document.createElement("div"))
		.attr("class", "tags-info-divs-container")
		.css("width", "100%")
		.css("height", "91%");
	outer_container.append(tags_info_divs_container);

	// Create the left section container
	let left_section_container = $(document.createElement("div"))
		.attr("class", "tags-info-section-left-container")
		.css("width", "55%")
		.css("height", "100%")
		.css("display", "inline-flex")
		.css("flex-direction", "column")
		.css("justify-content", "flex-start")
		.css("align-items", "center");
	$(tags_info_divs_container).append(left_section_container);

	// Create the right section container
	let right_section_container = $(document.createElement("div"))
		.attr("class", "tags-info-section-right-container")
		.css("width", "calc(45% - 0.15em)")
		.css("height", "100%")
		.css("display", "inline-flex")
		.css("flex-direction", "column")
		.css("justify-content", "flex-start")
		.css("align-items", "center")
		.css("margin-right", "0.15em")
		.css("position", "relative");
	$(tags_info_divs_container).append(right_section_container);

	// Create a div for the number of included, excluded and neutral tags
	let number_of_tags_div = $(create_info_div_for_info_sections(38))
		.css("padding", "0.3em 0.1375em")
		.css("width", "calc(96% - 2 * 0.1375em)")
	$(left_section_container).append(number_of_tags_div);
	number_of_tags_div
		.on("mouseover", function (event) {
			// Set tooltip
			set_tooltip($(this), "TOTAL TAG RESULTS", ["Shows the total number of included, neutral and excluded tags from the filters.", "Also shows a breakdown of this number for the 3 tags categories 'Genres', 'Sub-Genres' and 'Features'.", "NOTE: neutral tags are tags that are neither included nor excluded from the filters."], [-1, 0], [0, 0], true);
		})
		.on("mouseout", function (event) {
			// Hide tooltip
			hide_tooltip();
		});
	let number_of_included_tags_div =
		create_info_sub_div_for_info_sections("TOTAL TAG RESULTS", false, 0.6375, true)
			.css("width", "100%")
			.css("text-align", "center")
			.css("font-weight", "500")
	$(number_of_tags_div).append(number_of_included_tags_div);
	// Create a container to show 3 divs, each containing a big number on top and an "included", "neutral" or "excluded" text on the bottom
	let number_of_included_tags_container = $(document.createElement("div"))
		.attr("class", "number-of-included-tags-container")
		.css("width", "100%")
		// .css("height", "100%")
		.css("display", "inline-flex")
		.css("flex-direction", "row")
		.css("justify-content", "space-between")
		.css("align-items", "center")
		.css("margin-top", "0.125em")
		.css("margin-bottom", "0.125em")
		// .css("line-height", "1em")
		.css("font-size", "0.85em");
	$(number_of_tags_div).append(number_of_included_tags_container);
	// Create a div containing a number div on top and a text on bottom, plus also 3 additional divs for each of the 3 tags categories ("Genres", "Sub-Genres" and "Features")
	// Returns the number div and the 3 category based divs
	let categories_list = ["Genres", "Sub-Genres", "Features"];
	function create_number_and_below_text_div(below_text) {
		let number_and_below_text_div = $(document.createElement("div"))
			.attr("class", "number-and-below-text-div")
			.css("width", "33.3%")
			.css("height", "100%")
			.css("display", "inline-flex")
			.css("flex-direction", "column")
			.css("justify-content", "center")
			.css("align-items", "center")
		// .css("line-height", "1em");
		$(number_of_included_tags_container).append(number_and_below_text_div);
		let number_div = $(document.createElement("div"))
			.attr("class", "number-div")
			.css("width", "100%")
			.css("height", "100%")
			.css("display", "inline-flex")
			.css("flex-direction", "column")
			.css("justify-content", "center")
			.css("align-items", "center")
			// .css("line-height", "1.1em")
			.css("font-weight", "bold")
			.css("font-size", "1.25em");
		$(number_and_below_text_div).append(number_div);
		let below_text_div = $(document.createElement("div"))
			.attr("class", "below-text-div")
			.css("width", "100%")
			.css("height", "100%")
			.css("display", "inline-flex")
			.css("flex-direction", "column")
			.css("justify-content", "center")
			.css("align-items", "center")
			// .css("line-height", "1.1em")
			.css("font-weight", "bold")
			.css("font-size", "0.625em")
			.css("opacity", 0.75)
			.css("text-transform", "uppercase")
			.css("margin-bottom", "0.375em")
			.text(below_text);
		$(number_and_below_text_div).append(below_text_div);
		let tag_categories_divs = [];
		for (let i = 0; i < categories_list.length; i++) {
			// let category = categories_list[i];
			let tag_category_div = $(document.createElement("div"))
				.attr("class", "tag-category-div")
				.css("width", "80%")
				// .css("height", "1.1em")
				.css("display", "inline-flex")
				.css("flex-direction", "row")
				.css("justify-content", "space-between")
				.css("align-content", "center")
				.css("align-items", "center")
				// .css("line-height", "0.8em")
				.css("font-weight", "bold")
				.css("font-size", "0.525em")
				.css("opacity", 1)
				.css("white-space", "nowrap")
			// .css("text-transform", "uppercase")
			// .text(category);
			$(number_and_below_text_div).append(tag_category_div);
			tag_categories_divs.push(tag_category_div);
		}
		return [number_div, tag_categories_divs];
	}
	let included_infos_divs = create_number_and_below_text_div("included");
	let neutral_infos_divs = create_number_and_below_text_div("neutral");
	let excluded_infos_divs = create_number_and_below_text_div("excluded");
	let number_of_included_tags_number_div = included_infos_divs[0];
	let included_categories_divs = included_infos_divs[1];
	let number_of_neutral_tags_number_div = neutral_infos_divs[0];
	let neutral_categories_divs = neutral_infos_divs[1];
	let number_of_excluded_tags_number_div = excluded_infos_divs[0];
	let excluded_categories_divs = excluded_infos_divs[1];

	// Create a div for the average values of all the included tags
	let non_excluded_tags_values_div = $(create_info_div_for_info_sections(64.5))
		.css("padding", "0.3em 0.1375em")
		.css("width", "calc(96% - 2 * 0.1375em)")
		.css("margin-top", "0.325em")
	$(left_section_container).append(non_excluded_tags_values_div);
	non_excluded_tags_values_div
		.on("mouseover", function (event) {
			// Set tooltip
			set_tooltip($(this), "TAGS AVERAGE VALUES", ["Shows the average copies sold, average revenue, average review rating and average price for all the included and neutral tags (non-excluded tags).", "NOTE: The average values are computed by summing the average values of every included and neutral tag and then dividing the sum by the number of included and neutral tags."], [-1, 0], [0, 0], true);
		})
		.on("mouseout", function (event) {
			// Hide tooltip
			hide_tooltip();
		});
	// Add containers for average revenue, copies sold, review rating and price
	function create_title_and_value_container_div(title) {
		let title_and_value_container = $(document.createElement("div"))
			.attr("class", "tags-info-title-and-value-container")
			.css("width", "100%")
			// .css("height", "100%")
			.css("display", "inline-flex")
			.css("flex-direction", "column")
			.css("justify-content", "flex-start")
			.css("align-items", "center")
			.css("margin-top", "0.25em")
			.css("margin-bottom", "0.225em")
			.css("line-height", "1.1375em")
			.css("font-size", "0.8375em");
		$(non_excluded_tags_values_div).append(title_and_value_container);
		let title_div = $(document.createElement("div"))
			.attr("class", "tags-info-title-div")
			.css("width", "100%")
			// .css("height", "100%")
			.css("display", "inline-flex")
			.css("flex-direction", "column")
			.css("justify-content", "flex-start")
			.css("align-items", "center")
			// .css("line-height", "1em")
			.css("font-size", "0.625em")
			.css("font-weight", "500")
			.css("text-align", "center")
			.css("opacity", 0.75)
			.text(title);
		$(title_and_value_container).append(title_div);
		let value_div = $(document.createElement("div"))
			.attr("class", "tags-info-value-div")
			.css("width", "100%")
			// .css("height", "100%")
			.css("display", "inline-flex")
			.css("flex-direction", "column")
			.css("justify-content", "flex-start")
			.css("align-items", "center")
			// .css("line-height", "1em")
			.css("font-size", "1.225em")
			.css("font-weight", "bold")
			.css("text-align", "center")
			.text("0");
		$(title_and_value_container).append(value_div);
		return value_div;
	}
	let included_tags_average_copies_sold_div = create_title_and_value_container_div("TAGS AVERAGE COPIES SOLD");
	let included_tags_average_revenue_div = create_title_and_value_container_div("TAGS AVERAGE REVENUE");
	let included_tags_average_review_rating_div = create_title_and_value_container_div("TAGS AVERAGE REVIEW RATING");
	let included_tags_average_price_div = create_title_and_value_container_div("TAGS AVERAGE PRICE");

	let tags_list_container_height_percentage = 90;	// in percentage
	let tags_list_padding = 0.325;	// in em

	// Create a header for the tags list
	let tags_list_header = $(document.createElement("div"))
		.attr("class", "tags-list-header")
		.css("width", "calc(100% - " + tags_list_padding + "em)")
		.css("height", "calc(" + (100 - tags_list_container_height_percentage) + "% - 0.125em)")
		.css("padding-left", "calc(" + tags_list_padding + "em / 0.725)")
		.css("display", "inline-flex")
		.css("flex-direction", "row")
		.css("justify-content", "space-between")
		.css("align-items", "center")
		// .css("margin-top", "0.125em")
		.css("margin-bottom", "0.125em")
		.css("font-size", "0.5975em");
	$(right_section_container).append(tags_list_header);

	// Container for the select button of the ranking criteria
	let tags_list_ranking_select_attribute_button_container = $(document.createElement("div"))
		.attr("class", "tags-list-select-attribute-button custom-select")
		.css("width", "100%")
		.css("height", "100%");
	$(tags_list_header).append(tags_list_ranking_select_attribute_button_container);
	function get_axes_select_button_select_option_label(attribute_name) {
		let label = attribute_name.replace(/_/g, " ");
		label = label.charAt(0).toUpperCase() + label.slice(1);
		label = label.replace("review ", "");
		label = "RANK BY: <b>" + label.toUpperCase() + "</b>";
		return label;
	}
	// Select button for the ranking attribute
	let tags_list_ranking_select_attribute_button = $(document.createElement("select"));
	$(tags_list_ranking_select_attribute_button_container).append(tags_list_ranking_select_attribute_button);
	let tag_attributes = [
		"alphabetical",
		"number_of_games",
		"total_revenue",
		"average_revenue",
		"total_copies_sold",
		"average_copies_sold",
		"average_review_rating",
		"average_price"
	];
	for (let i = 0; i < tag_attributes.length; i++) {
		let attribute = tag_attributes[i];
		let attribute_option = $(document.createElement("option"))
			.attr("value", attribute)
			.html(get_axes_select_button_select_option_label(attribute));
		$(tags_list_ranking_select_attribute_button).append(attribute_option);
	}
	// Add functions to the select button
	$(tags_list_ranking_select_attribute_button)
		.on("change", function (event) {
			let selected_attribute = $(this).val();
			STATE["visualization_states"]["TAGS_INFOS"]["tags_ranking_attribute"] = selected_attribute;
			// Update the tags list
			update_tags_infos();
			// Hide the tooltip
			hide_tooltip();
		})
	$(tags_list_ranking_select_attribute_button_container)
		.on("mouseover", function (event) {
			// Set tooltip
			let element = $(this);
			let optimal_tooltip_position = calculate_tooltip_optimal_translate_position(element);
			set_tooltip(
				element,
				"Rank tags by attribute",
				[
					"Select the ranking criteria to rank the included, excluded and neutral tags by.",
					"NOTE: The tags are ranked based on the total number of games, total revenue, average revenue, total copies sold, average copies sold, average review rating and average price of ONLY the games in the filtered results that have the corresponding tag (unlike the tags ranking visualization, which ranks the tags by the same attributes for all gaems that meet the filter criterias except the filters on tags)."
				],
				optimal_tooltip_position
			);
		})
		.on("mouseout", function (event) {
			// Hide tooltip
			hide_tooltip();
		})


	// Add list of included, then neutral, and then excluded tags on the right section, as a scrollable div
	let tags_list_container = $(document.createElement("div"))
		.attr("class", "tags-list-container")
		.css("width", "calc(100% - 2 * " + tags_list_padding + "em)")
		.css("height", tags_list_container_height_percentage + "%")
		.css("overflow-y", "scroll")
		.css("overflow-x", "hidden")
		.css("display", "inline-flex")
		.css("flex-direction", "column")
		.css("justify-content", "flex-start")
		.css("align-items", "center")
		.css("padding", "0 " + tags_list_padding + "em")
	$(right_section_container).append(tags_list_container);
	// Add 2 gradients inside the visualization_games with classes "gradient-top" and "gradient-bottom"
	let tags_list_gradient_top = $(document.createElement("div"))
		.attr("class", "gradient-top");
	$(right_section_container).append(tags_list_gradient_top);
	let visualization_games_gradient_bottom = $(document.createElement("div"))
		.attr("class", "gradient-bottom");
	$(right_section_container).append(visualization_games_gradient_bottom);
	// Function to create a div which will contain other tags, with a title (e.g. "INCLUDED") and then a container of tag divs, then return the container of tag divs
	function create_tags_list_section(title) {
		let tags_list_section = $(document.createElement("div"))
			.attr("class", "tags-list-section")
			.css("width", "100%")
			// .css("height", "100%")
			.css("display", "inline-flex")
			.css("flex-direction", "column")
			.css("justify-content", "flex-start")
			.css("align-items", "flex-start")
			.css("margin-bottom", "0.375em");
		$(tags_list_container).append(tags_list_section);
		let tags_list_section_title = $(document.createElement("div"))
			.attr("class", "tags-list-section-title")
			.css("width", "100%")
			// .css("height", "100%")
			.css("display", "inline-flex")
			.css("flex-direction", "column")
			.css("justify-content", "flex-start")
			.css("align-items", "flex-start")
			.css("line-height", "1em")
			.css("font-size", "0.75em")
			.css("font-weight", "bold")
			.css("margin-bottom", "0.125em")
			.css("text-transform", "uppercase")
			.css("opacity", 0.75)
			.text(title);
		$(tags_list_section).append(tags_list_section_title);
		let tags_list_section_tags_container = $(document.createElement("div"))
			.attr("class", "tags-list-section-tags-container")
			.css("width", "100%")
			// .css("height", "100%")
			.css("display", "inline-flex")
			.css("flex-direction", "column")
			.css("justify-content", "flex-start")
			.css("align-items", "flex-start")
		$(tags_list_section).append(tags_list_section_tags_container);
		return [tags_list_section_tags_container, tags_list_section_title];
	}
	// Create the included, neutral and excluded tags sections
	let included_tags_list_section_objects = create_tags_list_section("INCLUDED TAGS");
	let included_tags_list_section = included_tags_list_section_objects[0];
	let included_tags_list_section_title = included_tags_list_section_objects[1];
	let neutral_tags_list_section_objects = create_tags_list_section("NEUTRAL TAGS");
	let neutral_tags_list_section = neutral_tags_list_section_objects[0];
	let neutral_tags_list_section_title = neutral_tags_list_section_objects[1];
	let excluded_tags_list_section_objects = create_tags_list_section("EXCLUDED TAGS");
	let excluded_tags_list_section = excluded_tags_list_section_objects[0];
	let excluded_tags_list_section_title = excluded_tags_list_section_objects[1];
	// Function used to set the width of each tag div based on the number of games in the filters having that tag
	function get_tag_div_width_string(tag_index) {
		let tag_name = TAG_NAMES_LIST[tag_index];
		let active_ranking_attribute = STATE["visualization_states"]["TAGS_INFOS"]["tags_ranking_attribute"];
		let width_percentage = 0;
		let width_percentage_string = "100";
		if (active_ranking_attribute != "alphabetical") {
			// Calculate the tag width based on the number of games, in the filtered results, having that tag's name
			let tag_attribute_value = STATE["filtered_results_tags_infos"][active_ranking_attribute][tag_name];
			let max_tag_attribute_value = get_list_of_tag_indexes_sorted_by_tag_attribute_in_results(active_ranking_attribute)["max_value"];
			if (max_tag_attribute_value > 0) {
				width_percentage = tag_attribute_value / max_tag_attribute_value * 100;
			}
			// Round the width percentage to 2 decimal places
			width_percentage_string = (Math.round(width_percentage * 100) / 100).toString();
		}
		let tag_width_string = "calc(" + width_percentage_string + "% - 2 * 0.05em)";
		return tag_width_string;
	}
	// Function to create a tag div and append it to the given container
	function create_tag_div(tag_index, container) {
		let tag_name = TAG_NAMES_LIST[tag_index];
		let tag_name_to_show = tag_name;
		let max_length = 21;
		if (tag_name_to_show.length > max_length) tag_name_to_show = tag_name_to_show.slice(0, max_length) + "...";
		tag_name_to_show = "&nbsp;" + tag_name_to_show;
		let tag_category = get_tag_category_by_index(tag_index);
		let category_index = categories_list.indexOf(tag_category);
		let tag_div = $(document.createElement("div"))
		let associated_tag_indexes_colors = get_associated_tag_element_colors();
		let tag_color = associated_tag_indexes_colors[tag_index];
		let category_color = offset_saturation_and_value(color_scheme["tag_colors"][category_index], 5, 10);
		tag_div
			.attr("class", "tag-legend-div")
			.attr("tag-index", tag_index)
			.css("width", get_tag_div_width_string(tag_index))
			// .css("height", "100%")
			.css("display", "inline-flex")
			.css("flex-direction", "row")
			.css("justify-content", "flex-start")
			.css("align-items", "center")
			.css("margin-top", "0.125em")
			.css("margin-bottom", "0.125em")
			// .css("line-height", "1em")
			.css("font-size", "0.575em")
			// .css("font-weight", "bold")
			// .css("text-transform", "uppercase")
			// .css("opacity", 0.75)
			.css("cursor", "pointer")
			// text-shadow: 0 0 0.375em #000000ff;
			.css("text-shadow", "0 0 0.375em #000000ff")
			.css("padding", "0.04em 0.05em")
			.css("padding-top", "0.03em")
			// .css("overflow", "hidden")
			.css("white-space", "nowrap")
			.css("text-overflow", "ellipsis")
			.html(tag_name_to_show)
			.css("background-color", tag_color)
			.css("border-radius", "0.25em")
			.css("color", "rgb(238, 238, 238)")
			.on("mouseover", function (event) {
				// Set tooltip
				let element = $(this);
				set_tooltip_for_tags_general_info_element(element, tag_name, category_color, true);
			})
			.on("mouseout", function (event) {
				// Hide tooltip
				hide_tooltip();
			})
			.on("click", function (event) {
				// Highlight the corrisponding tag element in the tags ranking, similarity visualization scatterplots and chord diagram
				highlight_tag_throughout_visualizations(tag_name);
			});
		$(container).append(tag_div);
		return tag_div;
	}
	// On scroll of the tags_list_container, update the gradients
	$(tags_list_container).on("scroll", function (event) {
		let scroll_top = $(this).scrollTop();
		let scroll_height = $(this).prop("scrollHeight");
		let scroll_top_value = scroll_top / scroll_height;
		let scroll_margin_top = 0.001;
		let scroll_margin_bottom = 0.0325;
		// When the scroll is al up, add class ".hide" to the top gradient
		if (scroll_top_value <= scroll_margin_top) {
			$(tags_list_gradient_top).addClass("hide");
		} else {
			$(tags_list_gradient_top).removeClass("hide");
		}
		// When the scroll is all down, add class ".hide" to the bottom gradient
		if (scroll_top_value >= 1 - scroll_margin_bottom) {
			$(visualization_games_gradient_bottom).addClass("hide");
		} else {
			$(visualization_games_gradient_bottom).removeClass("hide");
		}
	});
	// Add hover tooltips to each of the tag lists titles
	function set_tags_list_title_element_tooltip(title_element, additional_texts = []) {
		title_element
			.on("mouseover", function (event) {
				// Set tooltip
				let title = "INCLUDED TAGS LIST";
				let texts = [
					"Shows the list of all tags that are currently included in the filters.",
					"Tag colors are based on the tag's category (e.g. 'Genres', 'Sub-Genres' or 'Features'), with slight variations of the saturation and lightness to make them more easily distinguishable.",
					"Each tag element's slight color variation is consistent with the color of the tag elements throughout the tag lines and points of the various system's visualizations.",
					"Hover over a tag to see its details."
				];
				if (additional_texts.length > 0) {
					texts = texts.concat(additional_texts);
				}
				let optimal_tooltip_position = calculate_tooltip_optimal_translate_position(title_element);
				set_tooltip($(this), title, texts, optimal_tooltip_position);
			})
			.on("mouseout", function (event) {
				// Hide tooltip
				hide_tooltip();
			});
	}
	set_tags_list_title_element_tooltip(included_tags_list_section_title);
	set_tags_list_title_element_tooltip(neutral_tags_list_section_title, [
		TOOLTIP_LINE_SEPARATOR,
		"The bar's length is proportional to the number of games having the tag among the filtered games (which also only consider games with all of the included tags, if any).",
	]);
	set_tags_list_title_element_tooltip(excluded_tags_list_section_title);

	function update_tags_infos() {
		// Calculate the number of included, excluded and neutral tags
		let number_of_included_tags = STATE["tags_ranking"]["tags_to_include"].size;
		let number_of_excluded_tags = STATE["tags_ranking"]["tags_to_exclude"].size;
		let number_of_neutral_tags = TOTAL_NUMBER_OF_TAGS - number_of_included_tags - number_of_excluded_tags;
		// Update the divs with the number of included, excluded and neutral tags
		number_of_included_tags_number_div.html(number_of_included_tags);
		number_of_neutral_tags_number_div.html(number_of_neutral_tags);
		number_of_excluded_tags_number_div.html(number_of_excluded_tags);
		// Update the category divs with the number of included, excluded and neutral tags
		let number_of_tags_per_category = {
			"Genres": TAGS_BY_CATEGORY["Genres"].length,
			"Sub-Genres": TAGS_BY_CATEGORY["Sub-Genres"].length,
			"Features": TAGS_BY_CATEGORY["Features"].length
		}
		let number_of_tags_per_group_and_category = {
			"included": {
				"Genres": 0,
				"Sub-Genres": 0,
				"Features": 0
			},
			"neutral": {
				"Genres": 0,
				"Sub-Genres": 0,
				"Features": 0
			},
			"excluded": {
				"Genres": 0,
				"Sub-Genres": 0,
				"Features": 0
			}
		};
		// Iterate over all tags to compute the number of tags per group and category and also the average values of copies sold, revenue, review rating and price
		let average_tag_copies_sold = 0;
		let average_tag_revenue = 0;
		let average_tag_review_rating = 0;
		let average_tag_price = 0;
		for (let tag_index = 0; tag_index < TOTAL_NUMBER_OF_TAGS; tag_index++) {
			let tag_name = TAG_NAMES_LIST[tag_index];
			let tag_category = get_tag_category_by_index(tag_index);
			let tag_group = "neutral";
			if (STATE["tags_ranking"]["tags_to_include"].has(tag_name)) tag_group = "included";
			else if (STATE["tags_ranking"]["tags_to_exclude"].has(tag_name)) tag_group = "excluded";
			// Update the number of tags per group and category
			number_of_tags_per_group_and_category[tag_group][tag_category]++;
			// Update the average values of copies sold, revenue, review rating and price
			if (tag_group != "excluded") {
				average_tag_copies_sold += STATE["all_tags_filter_infos"][tag_name]["average_copies_sold"];
				average_tag_revenue += STATE["all_tags_filter_infos"][tag_name]["average_revenue"];
				average_tag_review_rating += STATE["all_tags_filter_infos"][tag_name]["average_review_rating"];
				average_tag_price += STATE["all_tags_filter_infos"][tag_name]["average_price"];
			}
		}
		// Compute the average values of copies sold, revenue, review rating and price
		if (number_of_included_tags + number_of_neutral_tags > 0) {
			average_tag_copies_sold /= number_of_included_tags + number_of_neutral_tags;
			average_tag_copies_sold = Math.round(average_tag_copies_sold);
			average_tag_revenue /= number_of_included_tags + number_of_neutral_tags;
			average_tag_review_rating /= number_of_included_tags + number_of_neutral_tags;
			average_tag_price /= number_of_included_tags + number_of_neutral_tags;
		}
		function get_category_info_div_html(category_name, number) {
			let category_info_div_html = "";
			category_info_div_html += "<div style='font-size: 0.675em; opacity: 0.7675; margin: auto 0; display: inline-flex; align-items: center; flex-direction: row;'>" + category_name + ": </div>";
			category_info_div_html += "<div style='font-size: 0.75em; font-weight: bold; margin: auto 0; display: inline-flex; align-items: center; flex-direction: row;'>" + number + "</div>";
			return category_info_div_html;
		}
		let tags_groups = ["included", "neutral", "excluded"];
		let group_divs = [included_categories_divs, neutral_categories_divs, excluded_categories_divs];
		for (let i = 0; i < categories_list.length; i++) {
			for (let j = 0; j < 3; j++) {
				let category_name = categories_list[i];
				let category_info_div_html = get_category_info_div_html(category_name, number_of_tags_per_group_and_category[tags_groups[j]][category_name]);
				let category_info_div = $(group_divs[j][i]);
				category_info_div.html(category_info_div_html);
			}
		}
		// Update the tags list
		// First, empty each of the 3 tags lists
		$(included_tags_list_section).empty();
		$(neutral_tags_list_section).empty();
		$(excluded_tags_list_section).empty();
		// Then, add the tags to the lists (use the same order )
		// Get the currently active sorting criteria from STATE
		// let current_tags_sorting_criteria = STATE["tags_ranking"]["current_sorting_criteria"];
		// // Get reference to sorted list
		// let sorted_tags_list = STATE["tags_ranking"]["tag_lists"][current_tags_sorting_criteria];
		// Sort the list of tags by their current number of games in the filtered results (also considering filters on tags)
		let selected_attribute = STATE["visualization_states"]["TAGS_INFOS"]["tags_ranking_attribute"];
		let sorted_tag_indexes_list = get_list_of_tag_indexes_sorted_by_tag_attribute_in_results(selected_attribute)["list"];
		for (let i = 0; i < sorted_tag_indexes_list.length; i++) {
			// let tag_index = sorted_tags_list[i];
			// let tag_object = sorted_tag_indexes_list[i];
			// let tag_index = tag_object["index"];
			// let tag_name = tag_object["name"];
			let tag_index = sorted_tag_indexes_list[i];
			let tag_name = TAG_NAMES_LIST[tag_index];
			let tag_group = "neutral";
			if (STATE["tags_ranking"]["tags_to_include"].has(tag_name)) tag_group = "include";
			else if (STATE["tags_ranking"]["tags_to_exclude"].has(tag_name)) tag_group = "exclude";
			let container_to_use = neutral_tags_list_section;
			if (tag_group == "include") container_to_use = included_tags_list_section;
			else if (tag_group == "exclude") container_to_use = excluded_tags_list_section;
			create_tag_div(tag_index, container_to_use);
		}
		// Append a "No tags" div if there are no tags in the list
		function get_no_tags_div(group_name) {
			let no_tags_div = $(document.createElement("div"))
				.attr("class", "no-tags-div")
				.css("width", "100%")
				.css("font-size", "0.575em")
				.css("font-style", "italic")
				.css("opacity", 0.625)
				.text("No " + group_name + " tags");
			return no_tags_div;
		}
		if (number_of_included_tags == 0) {
			let no_tags_div = get_no_tags_div("included");
			$(included_tags_list_section).append(no_tags_div);
		}
		if (number_of_neutral_tags == 0) {
			let no_tags_div = get_no_tags_div("neutral");
			$(neutral_tags_list_section).append(no_tags_div);
		}
		if (number_of_excluded_tags == 0) {
			let no_tags_div = get_no_tags_div("excluded");
			$(excluded_tags_list_section).append(no_tags_div);
		}
		// Reset scroll position
		$(tags_list_container).scrollTop(0);
		// Trigger scroll event onto the tags_list_container to update the gradients
		$(tags_list_container).trigger("scroll");

		// Update the average values of copies sold, revenue, review rating and price
		included_tags_average_copies_sold_div.html(format_number_string(average_tag_copies_sold, 2));
		included_tags_average_revenue_div.html("$" + format_number_string(average_tag_revenue, 2));
		included_tags_average_review_rating_div.html(Math.round(average_tag_review_rating * 100) + "%");
		included_tags_average_price_div.html("$" + format_number_string(average_tag_price, 2));

	}

	update_tags_infos();

	// On "update_visualizations" event of the container element, update the tags infos
	section_container.on("update_visualizations", function (event) {
		update_tags_infos();
	});

}

/**
 * Updates the tags infos and game infos visualizations with new data from the current filtered games
 */
function update_tags_and_games_infos_visualizations() {

	// Dispatch event "update_visualizations" on the containers of the tags and games infos sections
	$("#info-tags")[0].dispatchEvent(new Event("update_visualizations"));
	$("#info-games")[0].dispatchEvent(new Event("update_visualizations"));

}

// Function used to create a logo for the app
function create_logo(container) {

	// Create a logo container to contain the logo
	let logo_container = $(document.createElement("div"))
		.attr("class", "logo-container")
		// .css("width", "40%")
		.css("height", "100%")
		.css("display", "inline-flex")
		.css("flex-direction", "row")
		.css("justify-content", "flex-start")
		.css("font-size", "0.75em")
		.css("align-items", "center");
	$(container).append(logo_container);

	// Create the logo (4 different divs, each with a letter in ["G", "M", "V", "A"])
	let tag_categories = ["Genres", "Sub-Genres", "Features"];
	let logo_letters = ["G", "M", "V", "A"];
	function get_color_gradient_for_tag_colors(tag_category) {
		return [
			offset_saturation_and_value(color_scheme["tag_colors"][tag_categories.indexOf(tag_category)], tag_category_color_min_saturation_offset, tag_category_color_max_value_offset),
			offset_saturation_and_value(color_scheme["tag_colors"][tag_categories.indexOf(tag_category)], tag_category_color_max_saturation_offset, tag_category_color_min_value_offset)
		];
	}
	let logo_letters_gradients = [
		get_color_gradient_for_tag_colors("Genres"),
		get_color_gradient_for_tag_colors("Sub-Genres"),
		get_color_gradient_for_tag_colors("Features"),
		[get_gradient_color(1), get_gradient_color(0.1)]
	];
	// Create 4 divs, each with a letter
	for (let i = 0; i < logo_letters.length; i++) {
		let letter = logo_letters[i];
		let letter_gradient = logo_letters_gradients[i];
		let letter_div = $(document.createElement("div"))
			.attr("class", "logo-letter-div")
			.css("background-image", "linear-gradient(to bottom, " + letter_gradient[0] + ", " + letter_gradient[1] + ")")
			.css("width", "1.25em")
			.css("height", "1.25em")
			.css("margin", "0 0.125em")
			.css("border-radius", "0.275em")
			.css("display", "inline-flex")
			.css("flex-direction", "column")
			.css("justify-content", "center")
			.css("align-items", "center")
			.css("color", "rgb(238, 238, 238)")
			.css("text-shadow", "0 0 0.325em #000000ff")
			.text(letter);
		$(logo_container).append(letter_div);
	}

}

/**
 * Creates general controls of the app
 */
function create_general_controls_section() {

	// Get the container of the general controls section (child of "#general-controls", which contains 2#general-controls-container" and "#general-gradient-legend")
	let container_selector = "#general-controls-container";
	let section_container = $(container_selector);

	// Create a div for the general controls (will contain logo on the left and controls on the right)
	let general_controls_div = $(document.createElement("div"))
		.attr("class", "general-controls-div")
		.css("width", "100%")
		.css("height", "100%")
		// .css("padding", "0 0.2875em")
		.css("display", "inline-flex")
		.css("flex-direction", "row")
		.css("justify-content", "space-between")
		.css("align-items", "center");
	section_container.append(general_controls_div);

	// Create the logo div
	// create_logo(general_controls_div);

	// Create a div for the section title
	let section_title_div = $(document.createElement("div"))
		.attr("class", "general-controls-section-title")
		// .css("width", "40%")
		.css("height", "100%")
		.css("display", "inline-flex")
		.css("flex-direction", "row")
		.css("justify-content", "flex-start")
		.css("align-items", "flex-start")
		.css("font-size", "0.92em")
		.css("font-weight", "500")
		.css("text-transform", "uppercase")
		// .css("opacity", 0.75)
		// .css("background-color", "rgb(238, 0, 0,0.5)")
		.text("CONTROLS");
	$(general_controls_div).append(section_title_div);

	// Create a div for the controls
	let controls_div = $(document.createElement("div"))
		.attr("class", "controls-div")
		// .css("width", "80%")
		.css("height", "calc(100% - 0.45em)")
		// .css("height", "100%")
		.css("display", "inline-flex")
		.css("flex-direction", "row")
		.css("justify-content", "flex-end")
		.css("font-size", "0.75em")
		.css("padding-right", "0.3em")
		.css("padding-top", "0.45em")
		.css("align-items", "flex-start");
	$(general_controls_div).append(controls_div);

	// Create the controls to enable/disable cells scale up on hover, enable/disable toltips, and a button to reset all visualizations
	// Add toggle tooltip button
	let tooltips_button = $(document.createElement("div"))
		.attr("class", "toggle-button")
		.html("TOOLTIPS")
		.toggleClass("active", show_tooltips_on_hover);
	controls_div.append(tooltips_button);
	// Add toggle scale up on hover button
	let scale_up_button = $(document.createElement("div"))
		.attr("class", "toggle-button")
		.html("HOVER SCALE UP")
		.toggleClass("active", scale_up_app_cells_on_hover);
	controls_div.append(scale_up_button);
	// Create a container div for the reset button
	let reset_button_container = $(document.createElement("div"))
		.attr("class", "reset-button-container")
		.css("width", "1.108em")
		.css("height", "1.108em")
		.css("margin-top", "0.05em")
		.css("margin-left", "0.3em")
	controls_div.append(reset_button_container);
	// Add a div with id "#section-reset-button" to contain the reset button
	let reset_all_button = $(document.createElement("div"))
		.attr("id", "section-reset-button")
		.css("width", "100%")
		.css("height", "100%")
	reset_button_container.append(reset_all_button);

	// Add functions and tooltips to the buttons
	function set_tooltip_for_tooltips_button() {
		let tooltips_are_active = show_tooltips_on_hover;
		set_tooltip(
			tooltips_button,
			"Hover Tooltips" + (tooltips_are_active ? " (enabled)" : " (disabled)"),
			["Click to " + (tooltips_are_active ? "disable" : "enable") + " tooltips for elements and visualizations on mouse hover."],
			[1, 1],
			[0, 0],
			true,
			true
		);
	}
	tooltips_button
		.on("click", function (event) {
			// Toggle the tooltips
			show_tooltips_on_hover = !show_tooltips_on_hover;
			// Toggle the active class
			$(this).toggleClass("active");
			// Set the tooltip
			set_tooltip_for_tooltips_button();
		})
		.on("mouseover", function (event) {
			// Set tooltip
			set_tooltip_for_tooltips_button();
		})
		.on("mouseout", function (event) {
			// Hide tooltip
			hide_tooltip();
		});
	function set_tooltip_for_scale_up_button() {
		let scale_up_is_active = scale_up_app_cells_on_hover;
		set_tooltip(
			scale_up_button,
			"Sections hover scale up" + (scale_up_is_active ? " (enabled)" : " (disabled)"),
			[
				"Click to " + (scale_up_is_active ? "disable" : "enable") + " the scale up of sections of the interface on mouse hover.",
				TOOLTIP_LINE_SEPARATOR,
				"When enabled, sections will scale up on mouse hover.",
				"When disabled, sections will not scale up on mouse hover, but clicking on the title on the top left of each section will scale it up and down."
			],
			[1, 1],
			[0, 0],
			true
		);
	}
	scale_up_button
		.on("click", function (event) {
			// Toggle the tooltips
			scale_up_app_cells_on_hover = !scale_up_app_cells_on_hover;
			// Toggle the active class
			$(this).toggleClass("active");
			// Set the tooltip
			set_tooltip_for_scale_up_button();
		})
		.on("mouseover", function (event) {
			// Set tooltip
			set_tooltip_for_scale_up_button();
		})
		.on("mouseout", function (event) {
			// Hide tooltip
			hide_tooltip();
		});
	reset_all_button
		.on("click", function (event) {
			// Reset all visualizations
			reset_all_filters();
		})
		.on("mouseover", function (event) {
			// Set tooltip
			set_tooltip($(this), "Reset all filters", ["Click to reset all active filters."], [1, 1], [0, 0]);
		})
		.on("mouseout", function (event) {
			// Hide tooltip
			hide_tooltip();
		});

}

/** Function used to reset all filters */
function reset_all_filters() {
	// Click on all reset buttons of the app, hence all ".app-cell #section-reset-button" elements
	// $(".app-cell #section-reset-button").click();
	// Reload the page
	location.reload();
}


