import json
import os
import matplotlib.pyplot as plt
import numpy as np
import sklearn.manifold as manifold

REFRESH_ALL_JSONS = True	# If True, refresh all json files (games, tags, genres, ecc...)
REFRES_APP_JSONS = True 	# If True, refresh all json files in the "app_database" folder

# If  REFRESH_ALL_JSONS or REFRES_APP_JSONS are True, print an input to confirm the refresh of all json files
if REFRESH_ALL_JSONS or REFRES_APP_JSONS:
	print("WARNING: REFRESH_ALL_JSONS or REFRES_APP_JSONS are True, this will refresh all json files")
	confirm_refresh = input("\nAre you sure you want to refresh all json files? (Y/n)\n")
	if confirm_refresh != "Y":
		exit()
	print("\nOK: Refreshing all json files...")

'''
Sample "game" item:
	"457140": {
		"name": "Oxygen Not Included",
		"release_date": "Jul 30, 2019",
		"required_age": 0,
		"price": 24.99,
		"dlc_count": 2,
		"detailed_description": "Language Packs About the Game In the space-colony simulation game Oxygen Not Included you’ll find that scarcities of oxygen, warmth and sustenance are constant threats to your colony's survival. Guide colonists through the perils of subterranean asteroid living and watch as their population grows until they're not simply surviving, but thriving... Just make sure you don't forget to breathe. Build Extensive Bases and Discover What it Takes to Survive: Everything in your space colony is under your control, from excavation and resource allocation right down to plumbing and power systems. Resources will begin depleting with your first breath, however, so be sure to dig fast if you want to live. It’s Mind Over Matter with Stress Simulations: Keep the psychological impact of survival at bay with fun leisure activities, great accommodations and even better food for your colony. Duplicants each have different and potentially destructive ways of reacting to stress, so be sure to always keep them happy. Whatever the cost. Avoid Boiling with Thermodynamics: Temperature control is a constant concern in space; too cold and you'll freeze, too hot and you'll fry. Keep tabs on ambient environmental temperatures and your colony's heat production to maintain a nice, cozy atmosphere for your colonists. Enhance Efficiency through Complex Gas and Liquid Simulations: Create interlocking pipe systems to swiftly deliver fuel and liquid to critical areas of your base. Plan well and be rewarded as your colony transforms into an imperishable, well-oiled machine. Take Charge with Power Grid Simulations: Choose from a multitude of power sources including coal, hydrogen, natural gas or just plain old elbow grease. Manage power runoff, circuit overloads and meltdowns to keep your colony running smoothly. Always Keep Yourself Breathing: Enter the Oxygen Overlay and watch air moving through your base in real time. Monitor carbon dioxide accumulation and oversee oxygen generation processes to mold your colony into a veritable deep-space oasis. Waste Nothing through Extreme Recycling: Make use of every last resource for a base that truly exemplifies efficiency. Recycle waste into precious fuel, process unbreathable gas into air or harness the natural bodily processes of wild creatures for food. If you’re clever, you might even be able to run a base off colonist farts. Explore Diverse, Procedurally Generated New Worlds: Summon new worlds with a push of a button. Experience tons of untamed space rocks, then suffocate to death in them! ",
		"about_the_game": "In the space-colony simulation game Oxygen Not Included you’ll find that scarcities of oxygen, warmth and sustenance are constant threats to your colony's survival. Guide colonists through the perils of subterranean asteroid living and watch as their population grows until they're not simply surviving, but thriving... Just make sure you don't forget to breathe. Build Extensive Bases and Discover What it Takes to Survive: Everything in your space colony is under your control, from excavation and resource allocation right down to plumbing and power systems. Resources will begin depleting with your first breath, however, so be sure to dig fast if you want to live. It’s Mind Over Matter with Stress Simulations: Keep the psychological impact of survival at bay with fun leisure activities, great accommodations and even better food for your colony. Duplicants each have different and potentially destructive ways of reacting to stress, so be sure to always keep them happy. Whatever the cost. Avoid Boiling with Thermodynamics: Temperature control is a constant concern in space; too cold and you'll freeze, too hot and you'll fry. Keep tabs on ambient environmental temperatures and your colony's heat production to maintain a nice, cozy atmosphere for your colonists. Enhance Efficiency through Complex Gas and Liquid Simulations: Create interlocking pipe systems to swiftly deliver fuel and liquid to critical areas of your base. Plan well and be rewarded as your colony transforms into an imperishable, well-oiled machine. Take Charge with Power Grid Simulations: Choose from a multitude of power sources including coal, hydrogen, natural gas or just plain old elbow grease. Manage power runoff, circuit overloads and meltdowns to keep your colony running smoothly. Always Keep Yourself Breathing: Enter the Oxygen Overlay and watch air moving through your base in real time. Monitor carbon dioxide accumulation and oversee oxygen generation processes to mold your colony into a veritable deep-space oasis. Waste Nothing through Extreme Recycling: Make use of every last resource for a base that truly exemplifies efficiency. Recycle waste into precious fuel, process unbreathable gas into air or harness the natural bodily processes of wild creatures for food. If you’re clever, you might even be able to run a base off colonist farts. Explore Diverse, Procedurally Generated New Worlds: Summon new worlds with a push of a button. Experience tons of untamed space rocks, then suffocate to death in them! ",
		"short_description": "Oxygen Not Included is a space-colony simulation game. Deep inside an alien space rock your industrious crew will need to master science, overcome strange new lifeforms, and harness incredible space tech to survive, and possibly, thrive.",
		"reviews": "",
		"header_image": "https://cdn.akamai.steamstatic.com/steam/apps/457140/header_alt_assets_6.jpg?t=1654189805",
		"website": "https://www.kleientertainment.com/games/oxygen-not-included",
		"support_url": "",
		"support_email": "livesupport@kleientertainment.com",
		"windows": true,
		"mac": true,
		"linux": true,
		"metacritic_score": 86,
		"metacritic_url": "https://www.metacritic.com/game/pc/oxygen-not-included?ftag=MCD-06-10aaa1f",
		"achievements": 45,
		"recommendations": 80467,
		"notes": "",
		"supported_languages": [
			"English",
			"Simplified Chinese",
			"Korean",
			"Russian"
		],
		"full_audio_languages": [
			"English",
			"Simplified Chinese",
			"Korean",
			"Russian"
		],
		"packages": [
			{
				"title": "Buy Oxygen Not Included",
				"description": "",
				"subs": [
					{
						"text": "Oxygen Not Included - $24.99",
						"description": "",
						"price": 24.99
					}
				]
			}
		],
		"developers": [
			"Klei Entertainment"
		],
		"publishers": [
			"Klei Entertainment"
		],
		"categories": [
			"Single-player",
			"Steam Trading Cards"
		],
		"genres": [
			"Indie",
			"Simulation"
		],
		"screenshots": [
			"https://cdn.akamai.steamstatic.com/steam/apps/457140/ss_78d1c92edeecc7b17cafa9248867fe7d4390a0a0.1920x1080.jpg?t=1654189805",
			"https://cdn.akamai.steamstatic.com/steam/apps/457140/ss_67ab224dd8c781d5a27ee52657173298873d439a.1920x1080.jpg?t=1654189805",
			"https://cdn.akamai.steamstatic.com/steam/apps/457140/ss_ba2b8c362327add29b08182d13b04bf502e065cd.1920x1080.jpg?t=1654189805",
			"https://cdn.akamai.steamstatic.com/steam/apps/457140/ss_c5e20abaf2c82f9156da9c80b2ec7c0aefc46254.1920x1080.jpg?t=1654189805",
			"https://cdn.akamai.steamstatic.com/steam/apps/457140/ss_24a4ffeaf41ea6d782fef203177243d36c185506.1920x1080.jpg?t=1654189805",
			"https://cdn.akamai.steamstatic.com/steam/apps/457140/ss_02af9f36ca186bba1d0f2d5819d169e741076b46.1920x1080.jpg?t=1654189805",
			"https://cdn.akamai.steamstatic.com/steam/apps/457140/ss_a481601e529d5fd3acc25a55557dfd1775cc6c96.1920x1080.jpg?t=1654189805",
			"https://cdn.akamai.steamstatic.com/steam/apps/457140/ss_936e1756325dbd936f5b5227bdfb3357b57b356c.1920x1080.jpg?t=1654189805"
		],
		"movies": [
			"http://cdn.akamai.steamstatic.com/steam/apps/256757654/movie_max.mp4?t=1564503300",
			"http://cdn.akamai.steamstatic.com/steam/apps/256732663/movie_max.mp4?t=1540515738",
			"http://cdn.akamai.steamstatic.com/steam/apps/256685295/movie_max.mp4?t=1495142922",
			"http://cdn.akamai.steamstatic.com/steam/apps/256719917/movie_max.mp4?t=1528996831",
			"http://cdn.akamai.steamstatic.com/steam/apps/256708317/movie_max.mp4?t=1518112971",
			"http://cdn.akamai.steamstatic.com/steam/apps/256701212/movie_max.mp4?t=1510854853",
			"http://cdn.akamai.steamstatic.com/steam/apps/256693600/movie_max.mp4?t=1503595564",
			"http://cdn.akamai.steamstatic.com/steam/apps/256665154/movie_max.mp4?t=1465840964"
		],
		"user_score": 0,
		"score_rank": "",
		"positive": 82902,
		"negative": 3014,
		"estimated_owners": "2000000 - 5000000",
		"average_playtime_forever": 3574,
		"average_playtime_2weeks": 1441,
		"median_playtime_forever": 1003,
		"median_playtime_2weeks": 2777,
		"peak_ccu": 7507,
		"tags": {
			"Colony Sim": 1865,								// Tags are stored as a tag name with also their "popularity" (how many users think the tag is relevant to the game)
			"Base-Building": 1716,
			"Survival": 1615,
			"Resource Management": 1290,
			"Building": 1061,
			"Singleplayer": 947,
			"Management": 796,
			"Simulation": 785,
			"2D": 763,
			"Sandbox": 759,
			"Strategy": 700,
			"Space": 595,
			"Indie": 477,
			"Sci-fi": 425,
			"Exploration": 384,
			"Open World": 376,
			"Difficult": 356,
			"Adventure": 302,
			"Early Access": 281,
			"Multiplayer": 255
		}
	},
'''

BOXLEITER_NUMBER = 32	# The "boxleiter" number gives a multiplier for game reviews to estimate the total number of sales

PRICE_DEFAULT_DISCOUNT = 0.2	# Assumes a 20% discount on all games

# Get the content of the file "../database/games.json" and return it as a JSON object
def get_games(force_refresh_cleaned_games_database = False):
	force_refresh_cleaned_games_database = REFRESH_ALL_JSONS or force_refresh_cleaned_games_database
	print("\nRetrieving games...")
	cleaned_database_path = os.path.join(os.path.dirname(__file__), "../database/games_cleaned.json")
	if not force_refresh_cleaned_games_database and os.path.exists(cleaned_database_path):
		print("Games file found, loading it...")
		with open(cleaned_database_path, "r", encoding='utf-8') as f:
			games_json = json.load(f)
		print("{:,} games found".format(len(games_json)))
	else:
		if not force_refresh_cleaned_games_database:
			print("Games file not found, creating it...")
		else:
			print("Refreshing cleaned games file...")
		database_path = os.path.join(os.path.dirname(__file__), "../database/games.json")
		games_json = None
		with open(database_path, "r", encoding='utf-8') as f:
			games_json = json.load(f)
		print("{:,} games/softwares found".format(len(games_json)))
		fix_items = True
		if fix_items:
			print("Fixing items (language, release date, ecc...)...")
			# Clean game's language and full audio languages from any extra characters
			def get_correct_languages_list(game_languages):
				correct_languages_list = []
				def clean_characters(string):
					clean_characters = [
						# Clean any text of the form "&amp;lt;/[tag]&amp;gt;" where [tag] is any tag like "b", "strong", "br", etc.
						"&amp;lt;strong&amp;gt;&amp;", "&amp;lt;/strong&amp;gt;&amp;",
						"&amp;lt;strong&amp;gt;", "&amp;lt;/strong&amp;gt;", 
						"&amp;lt;b&amp;gt;", "&amp;lt;/b&amp;gt;",
						"&amp;lt;&amp;gt;",
						# Clean any tag text
						"[b]", "[/b]", "/b", 
						"[strong]", "[/strong]", "/strong", 
						# Clean special characters
						"\t", 
						# Clean any leftover text
						" (full audio)", " (all with full audio support)", " (text only)",
						# Clean other characters
						"lt;&amp;gt;",
					]
					for clean_character in clean_characters:
						string = string.replace(clean_character, "")
					return string
				for language in game_languages:
					old_languages_list =  [language]
					language = clean_characters(language)
					split_by = [
						"&amp;lt;br&amp;gt;", "&amp;lt;/br&amp;gt;",
						"&amp;lt;br &amp;gt;", "&amp;lt;/br &amp;gt;",
						"&amp;lt;br/&amp;gt;",
						"&amp;lt;br /&amp;gt;",
						"[br]", "[/br]", "/br", "br/",
						"\n", "\r", ","
					]
					if any([split_by_char in language for split_by_char in split_by]):
						# Language is a list of languages separated by commas (and not well formatted)
						# split by comma and "\n"
						for split_by_char in split_by:
							language = language.replace(split_by_char, ",")
						language = language.split(",")
						language = [lang.strip() for lang in language]
						languages_to_add = []
						for language_part in language:
							if language_part != "" and language_part != " ":
								languages_to_add.append(language_part)
						correct_languages_list.extend(languages_to_add)
					else:
						# Language is a single language
						correct_languages_list.append(language)
					# Replace some languages with their correct name
					replace_language_mapping = {
						"#lang_français": ["French"],
						"Slovakian": ["Slovak"],
						"German;": ["German"],
						"English Dutch  English": ["English", "Dutch"],
					}
					correct_languages_list_copy = correct_languages_list.copy()
					for language in correct_languages_list_copy:
						lang_to_replace = language
						new_langs = [language]
						if lang_to_replace in replace_language_mapping:
							new_langs = replace_language_mapping[lang_to_replace]
						# Also clean the new language
						for i, new_lang in enumerate(new_langs):
							new_langs[i] = clean_characters(new_lang)
							new_langs[i] = new_lang.strip()
						correct_languages_list.remove(lang_to_replace)
						correct_languages_list.extend(new_langs)
					# if old_languages_list != correct_languages_list:
					#	print("{}    ->     {}".format(old_languages_list, correct_languages_list))
					if any(["English" in lang and "Dutch" in lang for lang in correct_languages_list]):
						print("{}	->     {}".format(old_languages_list, correct_languages_list))
						print("Len of 'English Dutch  English': {}".format(len("English Dutch  English")))
						print("Len of old_languages_list[0]: {}".format(len(old_languages_list[0])))
					# For each language, convert languages of the form "X - Y" to "X (Y)"
					correct_languages_list_copy = correct_languages_list.copy()
					for language in correct_languages_list_copy:
						if " - " in language:
							language_parts = language.split(" - ")
							correct_languages_list.remove(language)
							correct_languages_list.append("{} ({})".format(language_parts[0], language_parts[1]))
				return correct_languages_list
			# Clean and filter the languages and full audio languages of each game (for n times, such that we are sure that all languages are cleaned)
			clean_n_times = 1
			for game in games_json:
				# Update languages
				supported_languages = games_json[game]["supported_languages"]
				full_audio_languages = games_json[game]["full_audio_languages"]
				for _ in range(clean_n_times):
					supported_languages = get_correct_languages_list(supported_languages)
					full_audio_languages = get_correct_languages_list(full_audio_languages)
				games_json[game]["supported_languages"] = supported_languages
				games_json[game]["full_audio_languages"] = full_audio_languages
				# Update release date (make it a dictionary with the keys "year", "month" and "day")
				year, month, day = get_game_release_date(games_json[game])
				games_json[game]["release_date"] = {
					"year": year,
					"month": month,
					"day": day
				}
		exclude_softwares = True
		if exclude_softwares:
			print("Excluding software items...")
			# Exclude softwares which are not games
			exclude_tags = ["Animation & Modeling", "Audio Production", "Benchmark", "Design & Illustration", "GameMaker", "Gaming", "Photo Editing", "RPGMaker", "Software", "Software Training", "Utilities", "Video Production", "Web Publishing"]
			tags_percentage_threshold = 0.25	# Exclude games with more than N% of the tags in the exclude_tags list
			excluded_softwares = 0
			# Exclude games where N% of the tags are in the exclude_tags list (N is defined by the tags_percentage_threshold variable)
			games_json_copy = games_json.copy()
			for game in games_json_copy:
				game_tag_names = [tag_name for tag_name in games_json[game]["tags"]]
				if len(game_tag_names) == 0:
					continue
				software_tag_names = [tag_name for tag_name in game_tag_names if tag_name in exclude_tags]
				software_tags_percentage = len(software_tag_names) / len(game_tag_names)
				if software_tags_percentage > tags_percentage_threshold:
					# print("> Removing software with tags {}: {}".format(software_tag_names, games_json[game]["name"]))
					excluded_softwares += 1
					del games_json[game]
			print("{:,} softwares excluded".format(excluded_softwares))
			print("Retrieved {:,} games".format(len(games_json)))
		# Save the gamaes in the file "../database/games_cleaned.json"
		print("Saving games in the file \"../database/games_cleaned.json\"...")
		with open(cleaned_database_path, "w", encoding='utf-8') as f:
			json.dump(games_json, f, indent=4)
	return games_json

def create_tags_json():

	print()

	print("Getting games...")

	# Filter out non-games ()

	print("Creating tags list...")

	# Create a list of tags, iterating over all games and adding tags to the list
	tags = []
	for game in GAMES:
		for tag in GAMES[game]["tags"]:
			if tag not in tags:
				tags.append(tag)

	print("Found {} tags".format(len(tags)))

	print("Creating tags dictionary...")

	'''
	Create a dictionary of tags, iterating over all games and adding tags to the dictionary
	'''
	tags_dict = {}
	for tag in tags:
		tags_dict[tag] = {
			"normalized_tag_popularity_sum": 0,
			"num_of_games": 0,
			"tag_category": "",
			"estimated_total_sales": 0,
			"estimated_total_revenue": 0,
			"appears_with_tags": {}
		}
	
	# Iterate over all games
	for game in GAMES:

		# Get the current game's tags
		game_tags = GAMES[game]["tags"]

		# Iterate over all tags of the current game
		for tag in game_tags:
			# Iterate over all tags of the current game again
			for tag2 in game_tags:
				# If the current tag is not the same as the current tag2, then add the current tag2 to the current tag's "appears_with_tags" dictionary
				# if tag != tag2:
				if tag2 not in tags_dict[tag]["appears_with_tags"]:
					tags_dict[tag]["appears_with_tags"][tag2] = 0
				tags_dict[tag]["appears_with_tags"][tag2] += 1

		def get_tag_category(tag):
			'''
			Returns the tag category of the specified tag, which can be either "Genre", "Sub-Genre" or "Features".
			'''
			# Get the tag category of the specified tag 
			for tag_category in TAG_CATEGORIES:
				if tag in TAG_CATEGORIES[tag_category]:
					return tag_category
			return "Others"
		
		# Increment the number of games that have the current tag
		for tag in game_tags:
			tags_dict[tag]["num_of_games"] += 1
			tags_dict[tag]["tag_category"] = get_tag_category(tag)
			num_of_reviews = GAMES[game]["positive"] + GAMES[game]["negative"]
			price = GAMES[game]["price"]
			tags_dict[tag]["estimated_total_sales"] += estimate_total_sales(num_of_reviews)
			tags_dict[tag]["estimated_total_revenue"] += estimate_total_revenue(price, num_of_reviews)

		# Calculate the normalized tag popularity sum of the current game
		tag_popularities_sum = sum([game_tags[tag] for tag in game_tags])
		for tag in game_tags:
			normalized_tag_popularity_sum = game_tags[tag] / tag_popularities_sum
			tags_dict[tag]["normalized_tag_popularity_sum"] += normalized_tag_popularity_sum

	# Save tags in the file "../database/tags.json"
	print("Saving tags in the file \"../database/tags.json\"...")
	database_path = os.path.join(os.path.dirname(__file__), "../database/tags.json")
	with open(database_path, "w", encoding='utf-8') as f:
		json.dump(tags_dict, f, indent=4)

	print("DONE")

def update_tags_json_with_dimensionality_reduction_coordinates(tags_json, update_mds = True, update_tsne = True):
	'''
	Update the tags json file with the x and y coordinates of each tag, calculated using both t-SNE and MDS.
	'''

	print("\nCreating tags coordinates object...")

	# Create a list of tags with their x and y coordinate, where x and y coordinates are calculated such that the distance between a pair of tags is proportional to the "appears_with_tags" value for that pair of tags
	tags_coordinates_tsne = {}
	tags_coordinates_mds = {}
	for tag in tags_json:
		tags_coordinates_tsne[tag] = {
			"x": 0,
			"y": 0
		}
		tags_coordinates_mds[tag] = {
			"x": 0,
			"y": 0
		}

	# Build an np matrix of tags with their "appears_with_tags" values
	tags_matrix = []
	min_possible_similarity_value = 1 / len(GAMES)
	max_possible_tags_distance = 1 / min_possible_similarity_value
	for tag in tags_json:
		row = []
		for tag2 in tags_json:
			if tag2 in tags_json[tag]["appears_with_tags"]:
				tag_appears_with_tag = tags_json[tag]["appears_with_tags"][tag2]
				if tag_appears_with_tag != tags_json[tag2]["appears_with_tags"][tag]:
					print("Warning: found a tag that is not symmetric: {} and {}".format(tag, tag2))
				max_tag_occurance = max(tags_json[tag]["num_of_games"], tags_json[tag2]["num_of_games"])
				tags_similarity = tag_appears_with_tag / max_tag_occurance	# in range [0, 1], where 0 means the tags never appear together and 1 means the tags always appear together
				tags_distance = 1 / tags_similarity	# in range [1, inf], where 1 means the tags always appear together and inf means the tags never appear together
				# Normalize the tags distance in range [0, 1]
				normalized_tags_distance = (tags_distance - 1) / (max_possible_tags_distance - 1)
				row.append(normalized_tags_distance)
				# square the normalized tags distance to make the distance between tags more visible
				# squared_normalized_tags_distance = normalized_tags_distance ** 2
				# row.append(squared_normalized_tags_distance)
			else:
				row.append(1)
		tags_matrix.append(row)
	tags_matrix = np.array(tags_matrix)

	# Calculate the x and y coordinates using MDS (Multi-Dimensional Scaling)
	if update_mds:
		print("Applying MDS...")
		tags_coordinates_matrix_mds = manifold.MDS(
				metric=True,
				n_components=2, 
				dissimilarity="precomputed",
				n_init=25,
				max_iter=500,
			).fit_transform(tags_matrix)
		# Add tags coordinates to each tag and store them in the file "../database/tags.json"
		for i, tag in enumerate(tags_json):
			if "mds_coordinates" not in tags_json[tag]:
				tags_json[tag]["mds_coordinates"] = {}
			tags_json[tag]["mds_coordinates"]["x"] = float(tags_coordinates_matrix_mds[i][0])
			tags_json[tag]["mds_coordinates"]["y"] = float(tags_coordinates_matrix_mds[i][1])

	# Calculate the x and y coordinates using t-SNE (t-Distributed Stochastic Neighbor Embedding)
	# Initialize an ndarray of shape (n_samples, n_components) as initialisation
	if update_tsne:
		print("Applying t-SNE...")
		tags_coordinates_matrix_tsne = manifold.TSNE(
				metric="precomputed",
				n_components=2,
				method="exact",
				n_iter=5000,
				# verbose=0,
				# Use ndarray of shape (n_samples, n_components) as initialisation
				init="random",
				square_distances=True,
				learning_rate="auto",
				early_exaggeration=12,
				# Avoid data to be organized in a single line
			).fit_transform(tags_matrix)
		# Add tags coordinates to each tag and store them in the file "../database/tags.json"
		for i, tag in enumerate(tags_json):
			if "tsne_coordinates" not in tags_json[tag]:
				tags_json[tag]["tsne_coordinates"] = {}
			tags_json[tag]["tsne_coordinates"]["x"] = float(tags_coordinates_matrix_tsne[i][0])
			tags_json[tag]["tsne_coordinates"]["y"] = float(tags_coordinates_matrix_tsne[i][1])
	
	print()
	print("Saving tags coordinates in the file \"../database/tags.json\"...")
	database_path = os.path.join(os.path.dirname(__file__), "../database/tags.json")
	with open(database_path, "w", encoding='utf-8') as f:
		json.dump(tags_json, f, indent=4)

	print("DONE")

def create_genres_json():
	
	print()

	print("Getting games...")

	# Filter out non-games ()

	print("Creating genres list...")

	# Create a list of genres, iterating over all games and adding genres to the list
	genres = []
	for game in GAMES:
		for genre in GAMES[game]["genres"]:
			if genre not in genres:
				genres.append(genre)

	print("Found {} genres".format(len(genres)))

	print("Creating genres dictionary...")

	'''
	Create a dictionary of genres, iterating over all games and adding genres to the dictionary, where each genre will have the following format:
	"genre": {
		"normalized_genre_popularity_sum": 0,
		"num_of_games": 0,
		"appears_with_genres" {					// This is a dictionary of all other genres with the numeric value being the number of times the genre appears in the "genres" list of a game which also contain the current genre
			"genre1": 0,
			"genre2": 0,
			...
		}
	}
	'''
	genres_dict = {}
	for genre in genres:
		genres_dict[genre] = {
			"num_of_games": 0,
			"estimated_total_sales": 0,
			"estimated_total_revenue": 0,
			"appears_with_genres": {}
		}

	# Iterate over all games
	for game in GAMES:
		
		# Get the current game's genres
		game_genres = GAMES[game]["genres"]

		# Iterate over all genres of the current game
		for genre in game_genres:
			# Iterate over all genres of the current game again
			for genre2 in game_genres:
				# If the current genre is not the same as the current genre2, then add the current genre2 to the current genre's "appears_with_genres" dictionary
				if genre != genre2:
					if genre2 not in genres_dict[genre]["appears_with_genres"]:
						genres_dict[genre]["appears_with_genres"][genre2] = 0
					genres_dict[genre]["appears_with_genres"][genre2] += 1

		# Increment the number of games that have the current genre
		for genre in game_genres:
			genres_dict[genre]["num_of_games"] += 1
			num_of_reviews = GAMES[game]["positive"] + GAMES[game]["negative"]
			price = GAMES[game]["price"]
			genres_dict[genre]["estimated_total_sales"] += estimate_total_sales(num_of_reviews)
			genres_dict[genre]["estimated_total_revenue"] += estimate_total_revenue(price, num_of_reviews)

	# Save genres in the file "../database/genres.json"
	print("Saving genres in the file \"../database/genres.json\"...")
	database_path = os.path.join(os.path.dirname(__file__), "../database/genres.json")
	with open(database_path, "w", encoding='utf-8') as f:
		json.dump(genres_dict, f, indent=4)

	print("DONE")

def estimate_total_sales(num_of_reviews):
	return num_of_reviews * BOXLEITER_NUMBER

def estimate_total_revenue(price, num_of_reviews):
	return estimate_total_sales(num_of_reviews) * price * (1 - PRICE_DEFAULT_DISCOUNT)

def get_tags(force_refresh_tags=False, force_refresh_tags_coordinates_for_mds=False, force_refresh_tags_coordinates_for_tsne=False):
	force_refresh_tags = REFRESH_ALL_JSONS or force_refresh_tags
	force_refresh_tags_coordinates_for_mds = REFRESH_ALL_JSONS or force_refresh_tags_coordinates_for_mds
	force_refresh_tags_coordinates_for_tsne = REFRESH_ALL_JSONS or force_refresh_tags_coordinates_for_tsne
	print("\nRetrieving tags...")
	database_path = os.path.join(os.path.dirname(__file__), "../database/tags.json")
	if force_refresh_tags or not os.path.exists(database_path):
		create_tags_json()
	tags = None
	with open(database_path, "r", encoding='utf-8') as f:
		tags = json.load(f)
		refresh_mds_coordinates = force_refresh_tags_coordinates_for_mds or "mds_coordinates" not in tags[list(tags.keys())[0]]
		refresh_tsne_coordinates = force_refresh_tags_coordinates_for_tsne or "tsne_coordinates" not in tags[list(tags.keys())[0]]
		if refresh_mds_coordinates or refresh_tsne_coordinates:
			update_tags_json_with_dimensionality_reduction_coordinates(
				tags,
				update_mds=refresh_mds_coordinates,
				update_tsne=refresh_tsne_coordinates
			)
	print("{:,} tags found".format(len(tags)))
	return tags
	
def get_genres(force_refresh_genres=False):
	database_path = os.path.join(os.path.dirname(__file__), "../database/genres.json")
	if force_refresh_genres or not os.path.exists(database_path):
		create_genres_json()
	with open(database_path, "r", encoding='utf-8') as f:
		return json.load(f)
	

def plot_tags_scatterplot(algorithm="t-SNE"):
	'''
	Plots the tags dimensionality reduction scatterplot using the specified algorithm.
	The "algorithm" parameter can be either "t-SNE" or "MDS".
	'''
	algorithm_attribute_name = ""
	if algorithm == "t-SNE":
		algorithm_attribute_name = "tsne_coordinates"
	elif algorithm == "MDS":
		algorithm_attribute_name = "mds_coordinates"
	else:
		print("Invalid algorithm to plot dimensionality reduction scatterplot: {}".format(algorithm))
		return

	# Plot the tags' MDS coordinates as a scatter plot using the stored "mds_coordinates" x and y coordinate values in the tags json file
	plt.figure(figsize=(10, 10))
	plt.title("Tags")
	plt.xlabel("x")
	plt.ylabel("y")
	# show labels underneath each point with the name of the tag on hover
	for tag in TAGS:
		x_offset = 0
		font_size = 5
		plt.text(
			TAGS[tag][algorithm_attribute_name]["x"] + x_offset,
			TAGS[tag][algorithm_attribute_name]["y"],
			tag,
			fontsize=font_size,
			alpha=0.5
		)
	# show the scatter plot
	plt.scatter(
		[TAGS[tag][algorithm_attribute_name]["x"] for tag in TAGS],
		[TAGS[tag][algorithm_attribute_name]["y"] for tag in TAGS],
		s=8,
		alpha=0.75
	)
	# Render the plot, with a squared aspect ratio
	plt.gca().set_aspect('equal', adjustable='box')
	# Make the axis have the same scale
	max_x = max([TAGS[tag][algorithm_attribute_name]["x"] for tag in TAGS])
	max_y = max([TAGS[tag][algorithm_attribute_name]["y"] for tag in TAGS])
	min_x = min([TAGS[tag][algorithm_attribute_name]["x"] for tag in TAGS])
	min_y = min([TAGS[tag][algorithm_attribute_name]["y"] for tag in TAGS])
	x_val = max(max_x, abs(min_x))
	y_val = max(max_y, abs(min_y))
	pad_val_percentage = 0.1
	final_val = max(x_val, y_val) * (1 + pad_val_percentage)
	plt.xlim(-1 * final_val, final_val)
	plt.ylim(-1 * final_val, final_val)

	plt.show()

def plot_game_sales_scatterplot(
		tags_filters=["Top-Level Genres", "Genres", "Sub-Genres"], 
		use_logarithmic_scale=[False, False],
		# plot_estimated_revenue_instead_of_sales=False,
		yAxisInfo = {
			"yPlottingFunction": lambda tag : tag["estimated_total_revenue"] / tag["num_of_games"],
			"yAxisLabel": "Estimated averarge revenue per game",
		},
		highlight_tags=[],
	):
	# Only consider genres and subgenres
	tags_to_consider = filter_tags(tags_filters)
	# Plot points representing tags as a scatter plot with x coordinate being the total number of games with the tag and y coordinate being the estimated total sales for the tag
	plt.figure(figsize=(10, 10))
	plt.title("Tags")
	plt.xlabel("Number of games with tag")
	# y_label = "Estimated total revenue for tag" if plot_estimated_revenue_instead_of_sales else "Estimated total sales for tag"
	plt.ylabel(yAxisInfo["yAxisLabel"])
	# y_attribute_axis = "estimated_total_revenue" if plot_estimated_revenue_instead_of_sales else "estimated_total_sales"
	# Use a logarithmic scale for the x and y axis
	if use_logarithmic_scale:
		if use_logarithmic_scale[0]:
			plt.xscale("log")
		if use_logarithmic_scale[1]:
			plt.yscale("log")
	# show labels underneath each point with the name of the tag
	for tag in tags_to_consider:
		x_offset = 0
		font_size = 5
		plt.text(tags_to_consider[tag]["num_of_games"] + x_offset, yAxisInfo["yPlottingFunction"](tags_to_consider[tag]), tag, fontsize=font_size)
	# show the scatter plot (color tags with a different color based on their tag group)
	circle_colors = ['#1f77b4', '#ff7f0e', '#2ca02c', '#d62728', '#9467bd', '#8c564b', '#e377c2', '#7f7f7f', '#bcbd22', '#17becf', '#ff0000', '#00ff00', '#0000ff', '#ffff00', '#00ffff', '#ff00ff']
	tag_groups_to_consider = {}
	for tag_group in TAG_GROUPS:
		if tag_group in tags_filters:
			tag_groups_to_consider[tag_group] = TAG_GROUPS[tag_group]
	def get_color_index_based_on_tag_group(tag):
		for i, tag_group in enumerate(tag_groups_to_consider):
			if tag in tag_groups_to_consider[tag_group]:
				return i
		return -1
	plt.scatter(
		[tags_to_consider[tag]["num_of_games"] for tag in tags_to_consider],
		[yAxisInfo["yPlottingFunction"](tags_to_consider[tag]) for tag in tags_to_consider],
		c=[circle_colors[get_color_index_based_on_tag_group(tag)] for tag in tags_to_consider],
		s=8
	)
	# Show an additional bigger circle colored yellow and transparent for each tag in "highlight_tags"
	for tag, i in zip(highlight_tags, range(len(highlight_tags))):
		plt.scatter(
			tags_to_consider[tag]["num_of_games"],
			yAxisInfo["yPlottingFunction"](tags_to_consider[tag]),
			c=circle_colors[-1 * i],
			alpha=0.25,
			s=2500
		)
	# Show a legend with the tag groups
	plt.legend(handles=[plt.Line2D([0], [0], marker='o', color='w', label=tag_group, markerfacecolor=circle_colors[i], markersize=10) for i, tag_group in enumerate(tag_groups_to_consider)])
	# Show rectangle areas corresponding to the number of games (X axis value) with that tag in the range [0, 100], [100, 1000], [1000, 10000], [10000, 100000], [100000, inf]
	max_y = max([yAxisInfo["yPlottingFunction"](tags_to_consider[tag]) for tag in tags_to_consider]) + 1000
	for i in range(5):
		#show each rectangle area with a separator dashed line and also a rectangular area colored with a color with alpha 0.1
		plt.plot([10 ** i, 10 ** i], [0, max_y], linestyle="--", color="black", alpha=0.25, linewidth=0.25)
		plt.fill_between([10 ** i, 10 ** (i + 1)], 0, max_y, facecolor=circle_colors[i], alpha=0.1)
		# Show a text label "<j" corresponding to the range [i,j] at the center of the range
		plt.text(10 ** (i + 0.5), max_y + 1000, "<{}".format(10 ** (i + 1)), horizontalalignment='center', verticalalignment='center', fontsize=8)
	# Render the plot
	plt.show()

def plot_tags_average_rating_histogram(tags_filters=[]):
	# Only consider genres and subgenres
	tags_to_consider = filter_tags(tags_filters)
	# Plot a histogram of the average rating of each tag
	plt.figure(figsize=(10, 10))
	plt.title("Tags")
	plt.ylabel("Average rating")
	plt.xlabel("Tag name")
	tag_average_ratings = {}
	for game in GAMES:
		for tag in GAMES[game]["tags"]:
			if tag not in tag_average_ratings:
				tag_average_ratings[tag] = 0
			if GAMES[game]["positive"] + GAMES[game]["negative"] > 0:
				game_rating = GAMES[game]["positive"] / (GAMES[game]["positive"] + GAMES[game]["negative"])
				tag_average_ratings[tag] += (game_rating / TAGS[tag]["num_of_games"])
	# show the histogram with a bin for each tag and a bar height corresponding to the average rating of the tag
	plt.bar(
		[tag for tag in tags_to_consider],
		[tag_average_ratings[tag] for tag in tags_to_consider],
	)
	# Render the plot
	plt.show()

def print_general_information():

	prepend_to_tag_name = "- "

	max_general_results = 10
	max_tags_results = 10
	max_games_results = 50

	#Get all tag names in the values of TAG_GROUPS such that they also are in the values of TAG_CATEGORIES
	filtering_tags_categories = []
	for tag_category in TAG_CATEGORIES_GROUPS:
		for tag_group in TAG_CATEGORIES_GROUPS[tag_category]:
			# filtering_tags_categories += TAG_GROUPS[tag_group]
			filtering_tags_categories.append(tag_group)
	filtering_tags_categories = list(set(filtering_tags_categories))
	tags_to_consider = filter_tags(filtering_tags_categories)

	print("\nAll tags: {}".format(len(TAGS)))
	print("Tags to consider (for filters): {}".format(len(tags_to_consider)))
	print("Tags to consider per category:")
	for tag_category in TAG_CATEGORIES_GROUPS:
		tags_for_category = filter_tags(TAG_CATEGORIES_GROUPS[tag_category])
		print("{}{}: {}".format(prepend_to_tag_name, tag_category, len(tags_for_category)))

	# Print the releae date of the game with the most recent release date (by year then month then day)
	games_sorted_by_release_date = sorted(GAMES, key=lambda game: GAMES[game]["release_date"]["year"] * 10_000 + GAMES[game]["release_date"]["month"] * 100 + GAMES[game]["release_date"]["day"], reverse=True)
	# Print the oldest game and the most recent game (released before 2024)
	print("\nOldest game: {} (released on {}/{}/{})".format(GAMES[games_sorted_by_release_date[-1]]["name"], GAMES[games_sorted_by_release_date[-1]]["release_date"]["year"], GAMES[games_sorted_by_release_date[-1]]["release_date"]["month"], GAMES[games_sorted_by_release_date[-1]]["release_date"]["day"]))
	for game in games_sorted_by_release_date:
		if GAMES[game]["release_date"]["year"] < 2024:
			print("Most recent game: {} (released on {}/{}/{})".format(GAMES[game]["name"], GAMES[game]["release_date"]["year"], GAMES[game]["release_date"]["month"], GAMES[game]["release_date"]["day"]))
			break

	# Print the number of games released by year, grouped in he following years
	year_intervals = ["<2016", "2017", "2018", "2019", "2020", "2021", "2022", "2023", ">2023"]
	year_intervals_dict = {}
	for year_interval in year_intervals:
		year_intervals_dict[year_interval] = 0
	for game in GAMES:
		year = GAMES[game]["release_date"]["year"]
		for year_interval in year_intervals:
			if year_interval[0] == "<":
				if year < int(year_interval[1:]):
					year_intervals_dict[year_interval] += 1
			elif year_interval[0] == ">":
				if year > int(year_interval[1:]):
					year_intervals_dict[year_interval] += 1
			else:
				if year == int(year_interval):
					year_intervals_dict[year_interval] += 1
	print("\nNumber of games released by year:")
	for year_interval in year_intervals:
		print("{}{}: {:,}".format(prepend_to_tag_name, year_interval, year_intervals_dict[year_interval]))

	# Print all languages sorted by the number of games
	languages_sorted_by_num_of_games = sorted(LANGUAGES, key=lambda language: LANGUAGES[language] if "Other" not in language else 0, reverse=True)
	print("\nLanguages sorted by num of games ({:,} total):".format(len(LANGUAGES)))
	for language in languages_sorted_by_num_of_games:
		print("{}{}: {:,}".format(prepend_to_tag_name, language, LANGUAGES[language]))

	# Print all languages sorted alphabetically
	# languages_sorted_alphabetically = sorted(all_languages)
	# print("\nLanguages sorted alphabetically ({:,} total):".format(len(all_languages)))
	# for language in languages_sorted_alphabetically:
	# 	print("{}{} ({:,})".format(prepend_to_tag_name, language, all_languages[language]))

	# Print all "Players" categories sorted by the number of games
	players_categories_sorted_by_num_of_games = sorted(CATEGORIES["Players"], key=lambda category: CATEGORIES["Players"][category], reverse=True)
	print("\nPlayers categories sorted by num of games ({:,} total):".format(len(CATEGORIES["Players"])))
	for category in players_categories_sorted_by_num_of_games:
		print("{}{}: {:,}".format(prepend_to_tag_name, category, CATEGORIES["Players"][category]))

	# Print all content ratings (tags in "Ratings etc" tag category) sorted by the number of games
	content_rating_tags = filter_tags(["Ratings etc"])
	# Count the number of games that have no content rating tag
	num_of_games_with_no_content_rating = 0
	for game in GAMES:
		if len(GAMES[game]["tags"]) == 0 or all([tag not in content_rating_tags for tag in GAMES[game]["tags"]]):
			num_of_games_with_no_content_rating += 1
	# Add tag "No rating" to the content rating tags
	content_rating_tags = {tag: content_rating_tags[tag]["num_of_games"] for tag in content_rating_tags}
	content_rating_tags["No rating"] = num_of_games_with_no_content_rating
	content_ratings_sorted_by_num_of_games = sorted(content_rating_tags, key=lambda tag: content_rating_tags[tag], reverse=True)
	print("\nContent ratings sorted by num of games ({:,} total):".format(len(content_rating_tags)))
	for tag_group in content_ratings_sorted_by_num_of_games:
		print("{}{}: {:,}".format(prepend_to_tag_name, tag_group, content_rating_tags[tag_group]))

	# Print all genres sorted by the number of games
	# genres_sorted_by_num_of_games = sorted(GENRES, key=lambda genre: GENRES[genre]["num_of_games"], reverse=True)
	# print("\nGenres sorted by num of games:")
	# for genre in genres_sorted_by_num_of_games:
	# 	print("{}{}: {:,}".format(prepend_to_tag_name, genre, GENRES[genre]["num_of_games"]))

	# Print the 10 tags with the highest "normalized_tag_popularity_sum"
	tags_sorted_by_normalized_tag_popularity_sum = sorted(tags_to_consider, key=lambda tag: tags_to_consider[tag]["normalized_tag_popularity_sum"], reverse=True)
	print("\nTags sorted by normalized tag popularity sum:")
	for tag_group in tags_sorted_by_normalized_tag_popularity_sum[:max_tags_results]:
		print("{}{}: {:,}".format(prepend_to_tag_name, tag_group, round(tags_to_consider[tag_group]["normalized_tag_popularity_sum"])))
	print("{}...".format(prepend_to_tag_name))

	# Print the 10 tags with the highest "num_of_games"
	tags_sorted_by_num_of_games = sorted(tags_to_consider, key=lambda tag: tags_to_consider[tag]["num_of_games"], reverse=True)
	print("\nTags sorted by num of games:")
	for tag_group in tags_sorted_by_num_of_games[:max_tags_results]:
		print("{}{}: {:,}".format(prepend_to_tag_name, tag_group, tags_to_consider[tag_group]["num_of_games"]))
	print("{}...".format(prepend_to_tag_name))
	for tag_group in tags_sorted_by_num_of_games[-5:]:
		print("{}{}: {:,}".format(prepend_to_tag_name, tag_group, tags_to_consider[tag_group]["num_of_games"]))

	# Print the 10 tags with the highest "estimated_total_sales"
	tags_sorted_by_estimated_total_sales = sorted(tags_to_consider, key=lambda tag: tags_to_consider[tag]["estimated_total_sales"], reverse=True)
	print("\nTags sorted by estimated total sales:")
	for tag_group in tags_sorted_by_estimated_total_sales[:max_tags_results]:
		print("{}{}: {:,}".format(prepend_to_tag_name, tag_group, tags_to_consider[tag_group]["estimated_total_sales"]))
	print("{}...".format(prepend_to_tag_name))

	# Print the 10 tags with the highest "estimated_total_revenue"
	tags_sorted_by_estimated_total_revenue = sorted(tags_to_consider, key=lambda tag: tags_to_consider[tag]["estimated_total_revenue"], reverse=True)
	print("\nTags sorted by estimated total revenue:")
	for tag_group in tags_sorted_by_estimated_total_revenue[:max_tags_results]:
		print("{}{}: {:,}".format(prepend_to_tag_name, tag_group, round(tags_to_consider[tag_group]["estimated_total_revenue"])))
	print("{}...".format(prepend_to_tag_name))

	# Print the 10 tags with the highest number of sales per game
	tags_sorted_by_sales_per_game = sorted(tags_to_consider, key=lambda tag: tags_to_consider[tag]["estimated_total_sales"] / tags_to_consider[tag]["num_of_games"], reverse=True)
	print("\nTags sorted by estimated sales per game:")
	for tag_group in tags_sorted_by_sales_per_game[:max_tags_results]:
		print("{}{} ({:,} sales per game):\n{}[{:,} games, {:,} sales, {:,} revenue]".format(prepend_to_tag_name, tag_group, round(tags_to_consider[tag_group]["estimated_total_sales"] / tags_to_consider[tag_group]["num_of_games"]),  " " * 2 * len(prepend_to_tag_name), tags_to_consider[tag_group]["num_of_games"], tags_to_consider[tag_group]["estimated_total_sales"], round(tags_to_consider[tag_group]["estimated_total_revenue"])))
	print("{}...".format(prepend_to_tag_name))

	# Print the number of games in ranges of numbers of copies sold
	copies_sold_ranges = [0, 100, 1_000, 10_000, 100_000, 1_000_000, float("inf")]
	ranges_dict = {}
	ranges_dict[(0, 0)] = 0
	for index in range(len(copies_sold_ranges) - 1):
		ranges_dict[(copies_sold_ranges[index]+1, copies_sold_ranges[index + 1])] = 0
	# add a single "0" range
	for game in GAMES:
		num_of_reviews = GAMES[game]["positive"] + GAMES[game]["negative"]
		num_of_sales = estimate_total_sales(num_of_reviews)
		for copies_sold_range in ranges_dict:
			if copies_sold_range[0] <= num_of_sales <= copies_sold_range[1]:
				ranges_dict[copies_sold_range] += 1
	print("\nNumber of games in ranges of numbers of copies sold:")
	for copies_sold_range in ranges_dict:
		print("{}[{:,}-{:,}]: {:,}".format(prepend_to_tag_name, copies_sold_range[0], copies_sold_range[1], ranges_dict[copies_sold_range]))

	# Print the highest priced games
	games_sorted_by_price = sorted(GAMES, key=lambda game: GAMES[game]["price"], reverse=True)
	print("\nHighest priced games: ")
	for game in games_sorted_by_price[:max_general_results]:
		print("{}{}: ${}".format(prepend_to_tag_name, GAMES[game]["name"], GAMES[game]["price"]))
		# software_tags = ["Animation & Modeling", "Audio Production", "Benchmark", "Design & Illustration", "GameMaker", "Gaming", "Photo Editing", "RPGMaker", "Software", "Software Training", "Utilities", "Video Production", "Web Publishing"]
		# if any([tag in GAMES[game]["tags"] for tag in software_tags]):
		# 	print("{} Game contains software tags: {}".format(len(prepend_to_tag_name) * " ", ", ".join([tag for tag in software_tags if tag in GAMES[game]["tags"]])))
	print("{}...".format(prepend_to_tag_name))

	# Print the games with the highest estimated total revenue
	print_top_games = False
	if print_top_games:
		games_sorted_by_estimated_total_revenue = sorted(GAMES, key=lambda game: estimate_total_revenue(GAMES[game]["price"], GAMES[game]["positive"] + GAMES[game]["negative"]), reverse=True)
		games_to_show = 50
		show_link = True
		print_top_tags = True
		# show_only_games_with_tags = []
		# show_only_games_with_tags = ["Indie"]
		# show_only_games_with_tags = ["Auto Battler"]
		show_only_games_with_tags = ["Rhythm"]
		# dont_show_games_with_tags = []
		dont_show_games_with_tags = ["VR"]
		release_date_interval = {
			"from": 2019,
			"to": None
		}
		print("\nTop {} games by estimated total revenue (released from {} to {}{}): ".format(
			games_to_show, 
			release_date_interval["from"] if release_date_interval["from"] != None else "1990",
			release_date_interval["to"] if release_date_interval["to"] != None else "now",
			" - Only games with tags {} and without tags {}".format(
				show_only_games_with_tags if show_only_games_with_tags != [] else "",
				dont_show_games_with_tags if dont_show_games_with_tags != [] else ""
				)
			)
		)
		def game_respects_filters(game):
			if show_only_games_with_tags != []:
				sorted_game_tags = sorted(game["tags"], key=lambda tag: game["tags"][tag], reverse=True)
				tag_in_firts_n = 7
				for tag in show_only_games_with_tags:
					if tag not in sorted_game_tags[:tag_in_firts_n]:
						return False
				for tag in dont_show_games_with_tags:
					if tag in sorted_game_tags[:tag_in_firts_n]:
						return False
			if release_date_interval["from"] != None and release_date_interval["from"] > game["release_date"]["year"]:
				return False
			if release_date_interval["to"] != None and release_date_interval["to"] < game["release_date"]["year"]:
				return False
			return True
		game_index = 0
		iteration = 0
		months_strings = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
		# for game_index, game in enumerate(games_sorted_by_estimated_total_revenue[:games_to_show]):
		while iteration < len(games_sorted_by_estimated_total_revenue):
			game = games_sorted_by_estimated_total_revenue[iteration]
			iteration += 1
			if game_respects_filters(GAMES[game]):
				if game_index < games_to_show:
					print("{}[{} - {} overall]{} {}: ${:,}".format(
						" " * (len(str(games_to_show)) - len(str(game_index+1))) + str(game_index+1) + ") ",
						months_strings[GAMES[game]["release_date"]["month"]-1] + " " + str(GAMES[game]["release_date"]["year"]),
						iteration+1,
						" (https://store.steampowered.com/app/{})".format(game) if show_link else "",
						GAMES[game]["name"],
						round(estimate_total_revenue(GAMES[game]["price"], 
						GAMES[game]["positive"] + GAMES[game]["negative"])))
					)
					if print_top_tags:
						tags_list = []
						for tag in GAMES[game]["tags"]:
							tags_list.append((tag, GAMES[game]["tags"][tag]))
						tags_list = sorted(tags_list, key=lambda tag: tag[1], reverse=True)
						num_of_tags_to_show = 7
						print("{}> [{}]".format(" " * (len(str(games_to_show)) + 1), ", ".join([tag[0] for tag in tags_list[:num_of_tags_to_show]])))
				game_index += 1
		print("Total games respecting filters: {}".format(game_index))
		# print("{}...".format(prepend_to_tag_name))

def plot_reviews_count_graph():
	
	# Get ranges in the form "N-(N+4)" and with successive ranges being "N+5-(N+9)", "N+10-(N+14)", etc...
	total_num_of_ranges = 2000	# Final range will be "(N*5+1)+", hence "10.001+" in this case
	review_numbers_to_check = ["{}-{}".format(i * 5+1, i * 5 + 5) for i in range(total_num_of_ranges)]
	# Prepend "0" and append "N+" to the list of ranges
	review_numbers_to_check = ["0"] + review_numbers_to_check + ["{}+".format(total_num_of_ranges * 5 + 1)]
	review_numbers_dict = {}
	for review_number in review_numbers_to_check:
		review_numbers_dict[review_number] = 0
	for game in GAMES:
		num_of_reviews = GAMES[game]["positive"] + GAMES[game]["negative"]
		for review_number in review_numbers_dict:
			if "+" in review_number:
				if num_of_reviews >= int(review_number[:-1]):
					review_numbers_dict[review_number] += 1
			elif "-" not in review_number:
				if num_of_reviews == int(review_number):
					review_numbers_dict[review_number] += 1
			else:
				if int(review_number.split("-")[0]) <= num_of_reviews < int(review_number.split("-")[1]):
					review_numbers_dict[review_number] += 1
	# Plot the histogram
	# plt.figure(figsize=(10, 10))
	plt.title("Reviews count")
	plt.xlabel("Number of reviews")
	plt.ylabel("Number of games")
	# Show a line chart (with points connected by lines) instead of a histogram
	plt.plot(
		[review_number for review_number in review_numbers_dict],
		[review_numbers_dict[review_number] for review_number in review_numbers_dict],
		linewidth=1
	)
	# Show axes in logarithmic scale
	# plt.xscale("log")
	plt.yscale("log")
	# In x axis, only show one every 100 labels, and always show the label "0" and the label "N+"
	plt.xticks(
		[review_number for review_number in review_numbers_dict if review_number == "0" or "+" in review_number or (int(review_number.split("-")[1]) % 500 == 0 and int(review_number.split("-")[1]) != (total_num_of_ranges * 5))],
		[review_number for review_number in review_numbers_dict if review_number == "0" or "+" in review_number or (int(review_number.split("-")[1]) % 500 == 0 and int(review_number.split("-")[1]) != (total_num_of_ranges * 5))],
		rotation=90
	)
	# Show the graph without interruping the execution of the program
	plt.show()

def get_game_release_date(game_obj):
	'''
	Returns release date as [year, month, day] for the specified game (an obj from the GAMES dictionary)
	'''
	# Parse release date so that it is in format "YYYY-MM-DD"
	release_date = game_obj["release_date"]
	if type(release_date) == dict:
		# Release date is a dictionary containing the keys "year", "month" and "day"
		year = release_date["year"]
		month = release_date["month"]
		day = release_date["day"]
		return year, month, day
	else:
		# Release date could be in format "Sep 9, 2023" or "Sep 2023"
		if len(release_date.split(", ")) == 1:
			# Release date is in format "Sep 2023"
			month_string, year_string = release_date.split(" ")
			day_string = "1"
		else:
			# Release date is in format "Sep 9, 2023"
			year_string = release_date.split(", ")[-1]
			month_string, day_string = release_date.split(", ")[0].split(" ")
		month_number = {
			"Jan": "01",
			"Feb": "02",
			"Mar": "03",
			"Apr": "04",
			"May": "05",
			"Jun": "06",
			"Jul": "07",
			"Aug": "08",
			"Sep": "09",
			"Oct": "10",
			"Nov": "11",
			"Dec": "12"
		}[month_string]
		year = int(year_string)
		month = int(month_number)
		day = int(day_string)
		return year, month, day
		
def refresh_application_datasets(force_refresh = False):

	force_refresh = REFRESH_ALL_JSONS or REFRES_APP_JSONS or force_refresh

	# Create actual datasets to use for the application

	root_database_path_name = "app_database"

	if not os.path.exists(os.path.join(os.path.dirname(__file__), "../" + root_database_path_name)):
		os.mkdir(os.path.join(os.path.dirname(__file__), "../" + root_database_path_name))

	'''
	Create app_games.json as a single object with a list of game objects with the following attributes (taken from the original games.json file):
		
		"name": string,
		"steam_id": int,
		"release_date": {
			"year": int,
			"month": int,
			"day": int
		}
		"price": float,
		"header_image": string,
		"platforms": {
			"windows": bool,
			"mac": bool,
			"linux": bool
		},
		"supported_languages": list(string),
		"full_audio_languages": bool,
		"developers": list(string),
		"publishers": list(string),
		"categories": list(string),
		"genres": list(string),
		"positive_reviews": int,
		"negative_reviews": int,
		"average_playtime_forever": int,
		"average_playtime_2weeks": int,
		"median_playtime_forever": int,
		"median_playtime_2weeks": int,
		"peak_concurrent_players": int,
		"tags": {
			"tag_name": int,
			...
		}
	'''

	def get_game_modes(game):
		categories = GAMES[game]["categories"]
		# From categories, find every category in the CATEGORIES["Players"] list
		game_modes = []
		for category in categories:
			if category in CATEGORIES["Players"]:
				# Convert every "Shared/Split" into "Split"
				category = category.replace("Shared/Split", "Split")
				game_modes.append(category)
		return game_modes
	
	def get_content_rating(game):
		tags = GAMES[game]["tags"]
		ratings = []
		for tag in tags:
			if tag in TAGS:
				if tag in TAG_GROUPS["Ratings etc"]:
					ratings.append(tag)
		return ratings
	# Create app_games.json
	if force_refresh or not os.path.exists(os.path.join(os.path.dirname(__file__), "../" + root_database_path_name + "/app_games.json")):
		print("\nCreating app_games.json...")
		app_games_list = []
		for game in GAMES:
			# Get release date of the game
			year, month, day = get_game_release_date(GAMES[game])
			if year < 2017 or year > 2023:
				continue
			# release_date = "{}-{}-{}".format(year, str(month).zfill(2), str(day).zfill(2))
			# Skip game if its release date is in a year that is 2016 or before (release date is in format "Sep 9, 2023")
			# if year <= 2016:
			# 	continue
			# Get game's languages
			languages = []
			for language in GAMES[game]["supported_languages"]:
				if language not in languages:
					languages.append(language)
			for language in GAMES[game]["full_audio_languages"]:
				if language not in languages:
					languages.append(language)
			# Get player mode
			player_mode = get_game_modes(game)
			# Get content rating
			content_rating = get_content_rating(game)
			#Get tags list
			tags = []
			for tag in GAMES[game]["tags"]:
				# Check if tags category is in the list of tags categories to consider
				tag_category = TAGS[tag]["tag_category"]
				if tag_category != "Others":
					tags.append(tag)
			# Add game to app_games_list
			app_games_list.append({
				# General info
				"name": GAMES[game]["name"],
				"steam_id": int(game),
				"developers": GAMES[game]["developers"],
				"publishers": GAMES[game]["publishers"],
				"header_image": GAMES[game]["header_image"],
				# Range filters
				"release_date": {
					"year": year,
					"month": month,
					"day": day
				},
				"price": GAMES[game]["price"],
				"copies_sold": estimate_total_sales(GAMES[game]["positive"] + GAMES[game]["negative"]),
				"positive_reviews": GAMES[game]["positive"],
				"negative_reviews": GAMES[game]["negative"],
				# Categorical filters
				"languages": languages,
				"player_mode": player_mode,
				"content_rating": content_rating,
				# Other infos
				"revenue": estimate_total_revenue(GAMES[game]["price"], GAMES[game]["positive"] + GAMES[game]["negative"]),
				# "platforms": {
				# 	"windows": GAMES[game]["windows"],
				# 	"mac": GAMES[game]["mac"],
				# 	"linux": GAMES[game]["linux"]
				# },
				# "categories": GAMES[game]["categories"],
				# "genres": GAMES[game]["genres"],
				# "average_playtime_forever": GAMES[game]["average_playtime_forever"],
				# "average_playtime_2weeks": GAMES[game]["average_playtime_2weeks"],
				# "median_playtime_forever": GAMES[game]["median_playtime_forever"],
				# "median_playtime_2weeks": GAMES[game]["median_playtime_2weeks"],
				# "peak_concurrent_players": GAMES[game]["peak_ccu"],
				# Tags
				"tags": tags
			})
		# Sort games by release date
		app_games_list = sorted(app_games_list, key=lambda game: game["release_date"]["year"] * 10_000 + game["release_date"]["month"] * 100 + game["release_date"]["day"], reverse=True)
		app_games_object = {
			"games": app_games_list
		}


		# Print a list of all languages for all games
		all_languages = {}
		for game in app_games_list:
			for language in game["languages"]:
				if language not in all_languages:
					all_languages[language] = 0
				all_languages[language] += 1
		# Sort languages by number of games
		# all_languages = sorted(all_languages, key=lambda language: all_languages[language], reverse=True)
		print("All languages in app_games: {}".format(len(all_languages)))
		for language in all_languages:
			print("> {}: {:,}".format(language, all_languages[language]))



		# Save app_games.json
		database_path = os.path.join(os.path.dirname(__file__), "../" + root_database_path_name + "/app_games.json")
		with open(database_path, "w", encoding='utf-8') as f:
			json.dump(app_games_object, f, indent=4)

		print("> Created app_games.json with {} games".format(len(app_games_list)))

	# Create app_tags.json
	# NOTE: for each tag, stores a list of indexes corresponding to games in the games list of "app_games.json" file that have that tag
	if force_refresh or not os.path.exists(os.path.join(os.path.dirname(__file__), "../" + root_database_path_name + "/app_tags.json")):
		print("\nCreating app_tags.json...")
		tag_names_to_consider = {}
		# Normalize tag's "mds" and "tsne" coordinates to ranges 0 and 1
		# ...
		# Create a dictionary with all tags, grouped by tag category
		for tag in TAGS:
			tag_category = TAGS[tag]["tag_category"]
			if tag_category == "Others":
				continue
			if tag_category not in tag_names_to_consider:
				tag_names_to_consider[tag_category] = []
			tag_names_to_consider[tag_category].append({
				"name": tag,
				# "category": TAGS[tag]["category"],
				"num_of_games": TAGS[tag]["num_of_games"],
				"total_sales": TAGS[tag]["estimated_total_sales"],
				"total_revenue": TAGS[tag]["estimated_total_revenue"],
				"mds": {
					"x": TAGS[tag]["mds_coordinates"]["x"],
					"y": TAGS[tag]["mds_coordinates"]["y"]
				},
				"tsne": {
					"x": TAGS[tag]["tsne_coordinates"]["x"],
					"y": TAGS[tag]["tsne_coordinates"]["y"]
				},
				# "num_of_games": TAGS[tag]["num_of_games"],
				# "normalized_tag_popularity_sum": TAGS[tag]["normalized_tag_popularity_sum"],
				# "estimated_total_sales": TAGS[tag]["estimated_total_sales"],
				# "estimated_total_revenue": TAGS[tag]["estimated_total_revenue"]
			})
		# Sort tags in each category in alphabetical order
		for tag_category in tag_names_to_consider:
			tag_names_to_consider[tag_category] = sorted(tag_names_to_consider[tag_category], key=lambda tag: tag["name"], reverse=False)
		# Save app_tags.json
		database_path = os.path.join(os.path.dirname(__file__), "../" + root_database_path_name + "/app_tags.json")
		with open(database_path, "w", encoding='utf-8') as f:
			json.dump(tag_names_to_consider, f, indent=4)
		print("> Created app_tags.json with {} tag categories and {} tags".format(len(tag_names_to_consider), sum([len(tag_names_to_consider[tag_category]) for tag_category in tag_names_to_consider])))

	# Create app_tags_similarity_matrix.json and app_tags_similarity_matrix_normalized.json
	if force_refresh or not os.path.exists(os.path.join(os.path.dirname(__file__), "../" + root_database_path_name + "/app_tags_similarity_matrix.json")) or not os.path.exists(os.path.join(os.path.dirname(__file__), "../" + root_database_path_name + "/app_tags_similarity_matrix_normalized.json")):
		# Load the tags from the "app_tags.json" file
		tag_names_to_consider = {}
		with open(os.path.join(os.path.dirname(__file__), "../" + root_database_path_name + "/app_tags.json"), "r", encoding='utf-8') as f:
			tag_names_to_consider = json.load(f)
		# Make the tag names to consider a list of tag names (now its a dictionary with the tag categories as keys and a list of tag objects as values, with "name" as the tag name)
		tag_names_to_consider = [tag_object["name"] for tag_category in tag_names_to_consider for tag_object in tag_names_to_consider[tag_category]]
		# Create app_tags_similarity_matrix.json
		app_tags_similarity_matrix = {}
		print("\nCreating app_tags_similarity_matrix.json...")
		for tag1 in TAGS:
			if tag1 not in tag_names_to_consider:
				continue
			app_tags_similarity_matrix[tag1] = {}
			for tag2 in TAGS:
				if tag2 not in tag_names_to_consider:
					continue
				similarity_value = 0
				if tag2 in TAGS[tag1]["appears_with_tags"]:
					similarity_value = TAGS[tag1]["appears_with_tags"][tag2]
				app_tags_similarity_matrix[tag1][tag2] = similarity_value
		# Sort all the tags in each of the matrix rows by value (note that the matrix contains objects, not lists)
		for tag1 in app_tags_similarity_matrix:
			# Sort the keys of the dictionary by value
			app_tags_similarity_matrix[tag1] = {k: v for k, v in sorted(app_tags_similarity_matrix[tag1].items(), key=lambda item: item[1], reverse=True)}
		# Save app_tags_similarity_matrix.json
		database_path = os.path.join(os.path.dirname(__file__), "../" + root_database_path_name + "/app_tags_similarity_matrix.json")
		with open(database_path, "w", encoding='utf-8') as f:
			json.dump(app_tags_similarity_matrix, f, indent=4)

		# Create app_tags_similarity_matrix_normalized.json
		app_tags_similarity_matrix_normalized = {}
		print("\nCreating app_tags_similarity_matrix_normalized.json...")
		# Iterate over all rows of the similarity matrix
		for tag1 in app_tags_similarity_matrix:
			app_tags_similarity_matrix_normalized[tag1] = {}
			for tag2 in app_tags_similarity_matrix[tag1]:
				# Get the maximum similarity value as the min between the number of games of the two tags (given as the app_tags_similarity_matrix[tag_name][tag_name] value) 
				max_similarity_value = min(app_tags_similarity_matrix[tag1][tag1], app_tags_similarity_matrix[tag2][tag2])
				# Normalize the similarity value
				normalized_similarity_value = app_tags_similarity_matrix[tag1][tag2] / max_similarity_value
				app_tags_similarity_matrix_normalized[tag1][tag2] = normalized_similarity_value
		# Sort all the tags in each of the matrix rows by value
		for tag1 in app_tags_similarity_matrix_normalized:
			# Sort the keys of the dictionary by value
			app_tags_similarity_matrix_normalized[tag1] = {k: v for k, v in sorted(app_tags_similarity_matrix_normalized[tag1].items(), key=lambda item: item[1], reverse=True)}
		# Save app_tags_similarity_matrix_normalized.json
		database_path = os.path.join(os.path.dirname(__file__), "../" + root_database_path_name + "/app_tags_similarity_matrix_normalized.json")
		with open(database_path, "w", encoding='utf-8') as f:
			json.dump(app_tags_similarity_matrix_normalized, f, indent=4)

	# Create the app_ranked_games.json file
	if force_refresh or not os.path.exists(os.path.join(os.path.dirname(__file__), "../" + root_database_path_name + "/app_ranked_games.json")):
		# Create a json file with a set of attributes as keys, and a list of indexes representing games as sorted in the "app_games.json" file as values
		print("\nCreating app_ranked_games.json...")
		# Load the games from the "app_games.json" file
		app_games_list = []
		with open(os.path.join(os.path.dirname(__file__), "../" + root_database_path_name + "/app_games.json"), "r", encoding='utf-8') as f:
			app_games_list = json.load(f)["games"]
		# Define the attributes to index the games by
		attributes = [
			"release_date",
			"alphabetical",
			"price",
			"copies_sold",
			"revenue",
			# NOTE: the "review rating" is NOT an attribute of the games, it should be computed using the "positive reviews" and "negative_reviews" game attributes
			"review_rating"
		]
		# Create a dictionary with the attributes as keys and a list of indexes as values
		app_ranked_games = {}
		for attribute in attributes:
			app_ranked_games[attribute] = []
		# Iterate over all games
		for i, game in enumerate(app_games_list):
			# Add the index of the game to the list of indexes for each of the attributes
			app_ranked_games["release_date"].append(i)
			app_ranked_games["alphabetical"].append(i)
			app_ranked_games["price"].append(i)
			app_ranked_games["copies_sold"].append(i)
			app_ranked_games["revenue"].append(i)
			app_ranked_games["review_rating"].append(i)
		# Sort the indexes in each of the lists of indexes
		# Sort by release date (then alphabetically)
		app_ranked_games["release_date"] = sorted(
			app_ranked_games["release_date"], 
			key=lambda i: 
				# Create a string to sort by release date then alphabetically
				# Format: "YYYY-MM-DD - Game name"
				"{}-{}-{} - {}".format(
					app_games_list[i]["release_date"]["year"],
					str(app_games_list[i]["release_date"]["month"]).zfill(2),
					str(app_games_list[i]["release_date"]["day"]).zfill(2),
					app_games_list[i]["name"].lower()
				)
		)
		# Sort alphabetically
		app_ranked_games["alphabetical"] = sorted(
			app_ranked_games["alphabetical"], 
			key=lambda i: app_games_list[i]["name"]
		)
		# Sort by price
		app_ranked_games["price"] = sorted(
			app_ranked_games["price"], 
			key=lambda i: app_games_list[i]["price"]
		)
		# Sort by copies sold
		app_ranked_games["copies_sold"] = sorted(
			app_ranked_games["copies_sold"], 
			key=lambda i: app_games_list[i]["copies_sold"]
		)
		# Sort by revenue
		app_ranked_games["revenue"] = sorted(
			app_ranked_games["revenue"], 
			key=lambda i: app_games_list[i]["revenue"]
		)
		# Sort by review rating
		app_ranked_games["review_rating"] = sorted(
			app_ranked_games["review_rating"], 
			key=lambda i: 
				app_games_list[i]["positive_reviews"] / (app_games_list[i]["positive_reviews"] + app_games_list[i]["negative_reviews"]) if (app_games_list[i]["positive_reviews"] + app_games_list[i]["negative_reviews"]) != 0 else -1
		)
		# Save app_ranked_games.json
		database_path = os.path.join(os.path.dirname(__file__), "../" + root_database_path_name + "/app_ranked_games.json")
		with open(database_path, "w", encoding='utf-8') as f:
			json.dump(app_ranked_games, f, indent=4)

	# Create app_tags_games_indexes.json
	if force_refresh or not os.path.exists(os.path.join(os.path.dirname(__file__), "../" + root_database_path_name + "/app_tags_games_indexes.json")):
		# Create a tags index with, for each tag, the list of ids in the games list for games that have that tag (use "app_games_list")
		print("\nCreating app_tags_games_indexes.json...")
		# Load the games from the "app_games.json" file
		app_games_list = []
		with open(os.path.join(os.path.dirname(__file__), "../" + root_database_path_name + "/app_games.json"), "r", encoding='utf-8') as f:
			app_games_list = json.load(f)["games"]
		# Create a dictionary with the tags as keys and a list of indexes as values
		app_tag_games_indexes = {}
		for i, game in enumerate(app_games_list):
			for tag in game["tags"]:
				if tag not in app_tag_games_indexes:
					app_tag_games_indexes[tag] = []
				app_tag_games_indexes[tag].append(i)
		# Sort each of the tags indexes by the normalized tag popularity of the tag based on the other tags of each game
		def sort_function(i):
			game = app_games_list[i]
			game_with_all_infos = GAMES[str(game["steam_id"])]
			# Calculate the total popularity of the game's tags
			total_tag_popularity = sum([game_with_all_infos["tags"][tag] for tag in game_with_all_infos["tags"]])
			# Calculate the normalized tag popularity of the tag
			normalized_tag_popularity = game_with_all_infos["tags"][tag] / total_tag_popularity
			return normalized_tag_popularity
		for tag in app_tag_games_indexes:
			app_tag_games_indexes[tag] = sorted(
				app_tag_games_indexes[tag], 
				key=sort_function,
				reverse=True
			)
		# Save app_tags_games_indexes.json
		database_path = os.path.join(os.path.dirname(__file__), "../" + root_database_path_name + "/app_tags_games_indexes.json")
		with open(database_path, "w", encoding='utf-8') as f:
			json.dump(app_tag_games_indexes, f, indent=4)

	# Index games by various attributes and store these indexes in the "app_games_indexes" folder
	if force_refresh or not os.path.exists(os.path.join(os.path.dirname(__file__), "../" + root_database_path_name + "/app_games_indexes")):
		print("\nCreating app_games_indexes folder...")
		# Create folder "app_games_indexes"
		if not os.path.exists(os.path.join(os.path.dirname(__file__), "../" + root_database_path_name + "/app_games_indexes")):
			os.mkdir(os.path.join(os.path.dirname(__file__), "../" + root_database_path_name + "/app_games_indexes"))
		# Create an index for each attribute
		for attribute in ["languages", "player_mode", "content_rating"]:
			print("Creating index for attribute '{}'...".format(attribute))
			# Create an index for the attribute
			attribute_index = {}
			for i, game in enumerate(app_games_list):
				for attribute_value in game[attribute]:
					if attribute_value not in attribute_index:
						attribute_index[attribute_value] = []
					attribute_index[attribute_value].append(i)
			# Save the index in a json file
			database_path = os.path.join(os.path.dirname(__file__), "../" + root_database_path_name + "/app_games_indexes/app_games_index_{}.json".format(attribute))
			with open(database_path, "w", encoding='utf-8') as f:
				json.dump(attribute_index, f, indent=4)
	

def get_languages():

	# Print all the possible languages for all games
	all_languages = {}
	for game in GAMES:
		# Update languages
		languages_list = []
		for language in GAMES[game]["supported_languages"]:
			languages_list.append(language)
		for language in GAMES[game]["full_audio_languages"]:
			languages_list.append(language)
		for language in languages_list:
			if language not in all_languages:
				all_languages[language] = 0
			all_languages[language] += 1
	# Check for languages with less than 1000 games
	languages_to_remove = []
	for language in all_languages:
		if all_languages[language] < 1000:
			languages_to_remove.append(language)
	# Add an "other" language with the sum of the number of games of all the languages that were removed
	num_of_languages_to_remove = len(languages_to_remove)
	all_languages["Others ({})".format(num_of_languages_to_remove)] = sum([all_languages[language] for language in languages_to_remove])
	# Remove the languages with less than 1000 games
	for language in languages_to_remove:
		all_languages.pop(language)
	# Replace languages of the form "X - Y" with "X (Y)"
	languages_to_replace = []
	for language in all_languages:
		if " - " in language:
			languages_to_replace.append(language)
	for language in languages_to_replace:
		all_languages[language.replace(" - ", " (") + ")"] = all_languages[language]
		all_languages.pop(language)
	# Return the languages dictionary
	return all_languages

def get_categories():
	# Print all the possible categories for all games
	all_categories = {}
	for game in GAMES:
		# Update categories
		for category in GAMES[game]["categories"]:
			if category not in all_categories:
				all_categories[category] = 0
			all_categories[category] += 1
	# Categories for un-edited games list should be the following
	
	'''

	- Full controller support: 15,804
	- Partial Controller Support: 10,473
	- VR Only: 616
	- Tracked Controller Support: 320
	- VR Support: 250

	- Single-player: 75,094
	- Multi-player: 15,382
	- PvP: 9,709
	- Co-op: 7,689
	- Online PvP: 6,935
	- Shared/Split Screen: 5,617
	- Online Co-op: 4,376
	- Shared/Split Screen PvP: 4,036
	- Shared/Split Screen Co-op: 3,149
	- Cross-Platform Multiplayer: 2,310
	- MMO: 1,270
	- LAN PvP: 688
	- LAN Co-op: 593

	- Steam Achievements: 36,358
	- Steam Cloud: 18,593
	- Steam Trading Cards: 9,885
	- Steam Leaderboards: 6,742
	- Remote Play Together: 6,104
	- Stats: 3,552
	- In-App Purchases: 2,257
	- Remote Play on TV: 2,161
	- Includes level editor: 1,952
	- Steam Workshop: 1,852
	- Captions available: 1,185
	- Remote Play on Tablet: 981
	- Remote Play on Phone: 820
	- Commentary available: 238
	- Valve Anti-Cheat enabled: 124
	- Steam Turn Notifications: 91
	- Includes Source SDK: 51
	- SteamVR Collectibles: 41
	- HDR available: 8

	# - VR Supported: 98
	# - Mods (require HL2): 2
	# - Mods: 2
	# - Tracked Motion Controller Support: 1

	'''

	# Convert some categories into a mapping to other categories
	convert_categories = {
		"VR Supported": "VR Support",
		"Tracked Motion Controller Support": "Tracked Controller Support",
		"Mods (require HL2)": "Steam Workshop",
		"Mods": "Steam Workshop",
	}
	all_categories_converted = {}
	for category in all_categories:
		if category in convert_categories:
			category = convert_categories[category]
		if category not in all_categories_converted:
			all_categories_converted[category] = 0
		all_categories_converted[category] += all_categories[category]
	# Group categories into 4 groups given by the following:
	categories_groups = {
		"Players": ["Single-player", "PvP", "Co-op", "Online PvP", "Multi-player", "Shared/Split Screen", "Online Co-op", "Shared/Split Screen PvP", "Shared/Split Screen Co-op", "Cross-Platform Multiplayer", "MMO", "LAN PvP", "LAN Co-op"],
		"Controller Support": ["Full controller support", "Partial Controller Support", "Tracked Controller Support", "VR Support","VR Only"],
		"Features": ["Steam Achievements", "Steam Cloud", "Steam Trading Cards", "Steam Leaderboards", "Remote Play Together", "Stats", "In-App Purchases", "Remote Play on TV", "Includes level editor", "Steam Workshop", "Captions available", "Remote Play on Tablet", "Remote Play on Phone", "Commentary available", "Valve Anti-Cheat enabled", "Steam Turn Notifications", "Includes Source SDK", "SteamVR Collectibles", "HDR available"],
	}
	# Create a dictionary with the categories groups as keys, and with the key-value pairs of the categories in the groups as values
	all_categories_converted_groups = {}
	for category_group in categories_groups:
		all_categories_converted_groups[category_group] = {}
		for category in categories_groups[category_group]:
			all_categories_converted_groups[category_group][category] = all_categories_converted[category]
	# Return the categories groups dictionary
	return all_categories_converted_groups

# Tag groups as defined in Steamworks documentation (with minor tweaks): https://partner.steamgames.com/doc/store/tags
TAG_GROUPS = {

	# Genres
	"Top-Level Genres":
		["Action", "Adventure", "Casual", "Puzzle", "Racing", "RPG", "Simulation", "Sports", "Strategy", "Tabletop"],
	
	# Sub-Genres
	"Genres":
		["Action RPG", "Action-Adventure", "Arcade", "Auto Battler", "Automobile Sim", "Battle Royale",  "Board Game", "Card Game", "Chess", "Clicker", "Experimental", "Exploration", "Farming Sim", "Fighting","God Game", "Hidden Object", "Idler", "Interactive Fiction", "Management", "Match 3", "Medical Sim", "MMORPG", "MOBA", "Outbreak Sim", "Party-Based RPG", "Pinball", "Platformer", "Point & Click", "Rhythm", "Rogue-like", "RTS", "Sandbox", "Shooter", "Space Sim", "Stealth", "Strategy RPG", "Survival", "Tower Defense", "Trivia", "Turn-Based Strategy", "Visual Novel", "Walking Simulator", "Word Game","Golf","Horror"],
	"Sub-Genres":
		["2D Fighter", "2D Platformer", "3D Fighter", "3D Platformer", "4X", "Action Roguelike", "Arena Shooter", "Beat 'em up", "Bullet Hell", "Card Battler", "Choose Your Own Adventure", "City Builder", "Collectathon", "Colony Sim", "Combat Racing", "CRPG", "Dating Sim", "Dungeon Crawler", "Education", "FPS", "Grand Strategy", "Hack and Slash", "Hero Shooter", "Immersive Sim", "Investigation", "JRPG", "Life Sim", "Looter Shooter", "Metroidvania", "Mystery", "On-Rails Shooter", "Open World Survival Craft", "Political Sim", "Precision Platformer", "Real Time Tactics", "Rogue-lite", "Roguevania", "Runner", "Shoot 'Em Up", "Side Scroller", "Sokoban", "Solitaire", "Souls-like", "Spectacle fighter", "Spelling", "Survival Horror", "Tactical RPG", "Third-Person Shooter", "Time Management", "Top-Down Shooter", "Trading Card Game", "Traditional Roguelike", "Turn-Based Tactics", "Twin Stick Shooter", "Typing", "Wargame",
		"Farming", "Puzzle-Platformer", "Psychological Horror",  "Roguelike Deckbuilder", "Action RTS", "Escape Room", "Boss Rush", "Job Simulator", "Shop Keeper", "Coding", "Hobby Sim", "Tile-Matching", "Mahjong", "Extraction Shooter", "Social Deduction", "Party Game", "Base-Building", "Documentary", "Drama", "Hentai", "Musou","Character Action Game" ],
	"Sports": 
		["Baseball", "Basketball", "Cricket", "Volleyball", "Rugby", "Cycling", "Bowling", "Wrestling", "Boxing", "BMX", "Football", "Hockey", "Mini Golf", "Motocross", "Skateboarding", "Skating", "Skiing", "Snowboarding", "Soccer","Tennis", "Football (Soccer)", "Football (American)",],
	
	# Features
	"Features & Themes":
		["1980s", "1990's", 
		"Atmospheric", "Agriculture", "Aliens", "Alternate History", "America", "Assassin", "Bikes", "Capitalism", "Cats", "Cold War", "Conspiracy", "Crime", "Cyberpunk", "Dark", "Dark Fantasy", "Demons", "Destruction", "Detective", "Dinosaurs", "Diplomacy", "Dog", "Dragons", "Dynamic Narration", "Economy", "Faith", "Family Friendly", "Fantasy", "Foreign", "Futuristic", "Gambling", "Game Development", "Gothic", "Historical", "Horses", "Illuminati", "Jet", "Lemmings", "LGBTQ+", "Logic", "Loot", "Lovecraftian", "Magic", "Mars", "Mechs", "Medieval", "Memes", "Military", "Modern", "Motorbike", "Mystery Dungeon", "Mythology", "Nature", "Naval", "Ninja", "Offroad", "Old School", "Otome", "Parkour", "Philosophical", "Pirates", "Political", "Politics", "Pool", "Post-apocalyptic", "Retro", "Robots", "Romance", "Rome", "Satire", "Science", "Sci-fi", "Sniper", "Snow", "Space", "Steampunk", "Submarine", "Superhero", "Supernatural", "Surreal", "Swordplay", "Tactical", "Tanks", "Thriller", "Time Travel", "Trains", "Transhumanism", "Transportation", "Underground", "Underwater", "Vampire", "War", "Werewolves", "Western", "World War I", "World War II",
		"Dystopian ", "Narrative", 
		"6DOF", "Archery", "Artificial Intelligence", "Asymmetric VR", "ATV", "Automation", "Building", "Bullet Time", "Character Customization", "Choices Matter", "Class-Based", "Combat", "Conversation", "Crafting", "Deckbuilding", "Driving", "Fishing", "Flight", "FMV", "Grid-Based Movement", "Gun Customization",  "Hacking", "Hex Grid", "Hunting", "Inventory Management", "Level Editor", "Linear", "Martial Arts", "Mining", "Moddable", "Multiple Endings", "Music-Based Procedural Generation", "Narration", "Naval Combat", "Nonlinear", "Open World", "Perma Death", "Physics", "Procedural Generation", "PvE", "PvP", "Quick-Time Events", "Resource Management", "Sailing", "Score Attack", "Story Rich", "Team-Based", "Time Manipulation", "Trading", "Turn-Based Combat", "Tutorial", "Vehicular Combat", "Female Protagonist", "Silent Protagonist", "Villain Protagonist", "Minigames", "Intentionally Awkward Controls",
		"VR Only", "Spaceships", "Zombies", "Birds", "Fox", "Vikings", "Party", "Jump Scare", "8-bit Music", "Instrumental Music", "Rock Music", "Electronic Music", "Creature Collector", "Parody ", "Cooking", "Heist", "Programming", "Based On A Novel", "Episodic", "Games Workshop", "Time Attack", "Turn-Based","Real-Time", "Real-Time with Pause","Mod", "Ambient", "Electronic", "e-sports"],
	"Other Tags":
		["Indie", "Experience", "Movie", "Feature Film", "Music", "Soundtrack", "Reboot", "Remake", "Sequel"],
	"Assessments":
		["Addictive", "Beautiful", "Classic", "Competitive", "Cult Classic", "Difficult", "Emotional", "Epic", "Fast-Paced", "Funny", "Great Soundtrack", "Lore-Rich", "Masterpiece", "Psychological", "Relaxing", "Replay Value", "Short", "Unforgiving", "Comedy", "Dark Comedy",
		"Dark Humor", "Immersive", "Nostalgia", "Cozy", "Wholesome", "Well-Written"],
	"Visuals & Viewpoint":
		["2.5D", "2D", "360 Video", "3D", "3D Vision", "Abstract", "Anime", "Cartoon", "Cartoony", "Cinematic", "Colorful", "Comic Book", "Cute", "First-Person", "Hand-drawn", "Isometric", "Minimalist", "Noir", "Pixel Graphics", "Psychedelic", "Realistic", "Split Screen", "Stylized", "Text-Based", "Third Person", "Top-Down", "Voxel", "VR"],
	"Funding etc.":
		["Crowdfunded", "Early Access", "Free to Play", "Kickstarter"],
	"Players":
		["4 Player Local", "Asynchronous Multiplayer", "Co-op", "Co-op Campaign", "Local Co-Op", "Local Multiplayer", "Massively Multiplayer", "Multiplayer", "Online Co-Op", "Singleplayer"],

	# Included as a separate filter
	"Ratings etc":
		["Blood", "Gore", "Mature", "NSFW", "Nudity", "Sexual Content", "Violent"],

	# Don't include
	"Hardware / Input":		# Useless...
		["Controller", "Hardware", "Mouse only", "Steam Machine", "Touch-Friendly", "TrackIR", "Voice Control"],
	"Software":				# Useless...
		["Animation & Modeling", "Audio Production", "Benchmark", "Design & Illustration", "GameMaker", "Gaming", "Photo Editing", "RPGMaker", "Software", "Software Training", "Utilities", "Video Production", "Web Publishing"],
	"Series": 				# Useless...
		["Batman", "Dungeons & Dragons", "Lara Croft", "LEGO", "Warhammer 40K", '''"Star Wars"''']

}

TAG_CATEGORIES_GROUPS = {
	"Genres": ["Top-Level Genres"],
	"Sub-Genres": ["Genres", "Sub-Genres", "Sports"],
	"Features": ["Features & Themes", "Other Tags", "Assessments", "Visuals & Viewpoint", "Ratings etc", "Funding etc.", "Players"]
}

# Same keys as TAG_CATEGORIES_GROUPS, but with values being the tags in the corresponding tag groups
TAG_CATEGORIES = {}
for tag_category in TAG_CATEGORIES_GROUPS:
	TAG_CATEGORIES[tag_category] = []
	for tag_group in TAG_CATEGORIES_GROUPS[tag_category]:
		TAG_CATEGORIES[tag_category] += TAG_GROUPS[tag_group]

GAMES = get_games()
TAGS = get_tags()
# GENRES = get_genres()		# Dictionary of genres as keys and number of games with said genre as values
LANGUAGES = get_languages()	# Dictionary of languages as keys and number of games with said language as values
CATEGORIES = get_categories()	# Dictionary of 3 categories ("Controller Support", "Players", "Features") as keys, categories as sub-keys and number of games with said category as values
refresh_application_datasets()

def filter_tags(tag_groups_to_include):
	if (tag_groups_to_include == []):
		return TAGS
	filtered_tags = {}
	for tag_group in tag_groups_to_include:
		for tag in TAG_GROUPS[tag_group]:
			filtered_tags[tag] = TAGS[tag]
	return filtered_tags

def check_tag_errors():
	print()
	# Check if tag groups or tags contain the empty tag ""
	for tag_group in TAG_GROUPS:
		if "" in TAG_GROUPS[tag_group]:
			print("WARNING: tag group \"{}\" contains the empty tag \"\"".format(tag_group))
	for tag in TAGS:
		if tag == "":
			print("WARNING: tags contain the empty tag \"\"")
	# Check that all tags in TAG_GROUPS are also in TAGS and vice versa
	for tag_group in TAG_GROUPS:
		for tag in TAG_GROUPS[tag_group]:
			if tag not in TAGS:
				print("WARNING: tag \"{}\" in tag group \"{}\" is not in tags".format(tag, tag_group))
	for tag in TAGS:
		found_tag = False
		for tag_group in TAG_GROUPS:
			if tag in TAG_GROUPS[tag_group]:
				found_tag = True
				break
		if not found_tag:
			print("WARNING: tag \"{}\" is not in any tag group".format(tag))
	# Also check that tags in a certain group in TAG_GROUPS are not in another tag group
	for tag_group in TAG_GROUPS:
		for tag in TAG_GROUPS[tag_group]:
			for tag_group2 in TAG_GROUPS:
				if tag_group != tag_group2:
					if tag in TAG_GROUPS[tag_group2]:
						print("WARNING: tag \"{}\" in tag group \"{}\" is also in tag group \"{}\"".format(tag, tag_group, tag_group2))

def main():

	print()

	# Print some information about games and tags
	# print("Number of games: {}".format(len(GAMES)))
	# print("Number of tags: {}".format(len(TAGS)))
	# print("Number of genres: {}".format(len(GENRES)))

	# Check that all tags in TAG_GROUPS are also in TAGS and vice versa
	# check_tag_errors()

	# Print some information about tags
	print_general_information()

	# Plot game review count graph (not useful)
	# plot_reviews_count_graph()

	# Plot the tags' MDS coordinates as a scatter plot
	# plot_tags_scatterplot("MDS")
	# plot_tags_scatterplot("t-SNE")

	# Plot a hisogram for average rating of games in tags
	# plot_tags_average_rating_histogram(["Top-Level Genres", "Genres", "Sub-Genres"])
		
	# Plot points representing tags as a scatter plot with x coordinate being the total number of games with the tag and y coordinate being the estimated total sales for the tag
	should_plot_games_sales_scatterplot = False
	if should_plot_games_sales_scatterplot:
		tag_filters_for_sales_scatterplot = ["Top-Level Genres", "Genres", "Sub-Genres"]
		# tag_filters_for_sales_scatterplot = ["Features & Themes"]
		# tag_filters_for_sales_scatterplot = ["Ratings etc"]
		# tag_filters_for_sales_scatterplot = ["Top-Level Genres", "Genres", "Sub-Genres", "Features & Themes"]
		# y_axis_info = {
		# 	# Median sales per game
		# 	"yPlottingFunction": lambda tag : tag["estimated_total_sales"] / tag["num_of_games"],
		# 	"yAxisLabel": "Estimated median sales per game",
		# }
		y_axis_info = {
			# Median revenue per game
			"yPlottingFunction": lambda tag : tag["estimated_total_revenue"] / tag["num_of_games"],
			"yAxisLabel": "Estimated median revenue per game",
		}
		plot_game_sales_scatterplot(
			tags_filters=tag_filters_for_sales_scatterplot,
			use_logarithmic_scale=[True, False],
			yAxisInfo=y_axis_info,
			highlight_tags=["Extraction Shooter"]
		)

if __name__ == "__main__":
	main()


	