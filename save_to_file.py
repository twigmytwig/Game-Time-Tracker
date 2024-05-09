from datetime import datetime, timedelta, date
import json

def set_active_game(active_game:str, filename:str):
    file = open(filename)
    game_json = json.load(file)
    game_json["ActiveGame"] = active_game
    with open(filename, 'w') as data_file:
                    json.dump(game_json, data_file, indent=2)

def get_game_time_seconds(game_time : datetime):
    return timedelta(hours=game_time.hour, minutes=game_time.minute, seconds=game_time.second).total_seconds()

def set_session_date(seconds, key, gameDataJson):
    #I need to get the object, see if it already has the date. If so, increment the time, otherwise create an instance of today and set the time
    todays_date = date.today()
    if str(todays_date) in gameDataJson[key]["GameSessions"]:
         seconds += gameDataJson[key]["GameSessions"][str(todays_date)]
    gameDataJson[key]["GameSessions"][str(todays_date)] = seconds
    return gameDataJson


def save_to_file(closed_game_data, closed_game_name,filename):
    seconds_only_format : str = "%S.%f"
    format : str = "%H:%M:%S.%f"
    file = open(filename)
    game_time_data = json.load(file)
    print('Game time data variable: ---' + str(game_time_data))
    if game_time_data:
        for x in game_time_data:
            if x == closed_game_name:
                previous_game_time = datetime.strptime(closed_game_data[closed_game_name],format)
                previous_game_time_seconds = float(get_game_time_seconds(previous_game_time))
                game_time_data = set_session_date(previous_game_time_seconds, x, game_time_data)
                temp_game_time= float(game_time_data[x]["total_game_time_seconds"])
                total_time_seconds = temp_game_time + previous_game_time_seconds
                print("Total time variable : " + str(total_time_seconds))
                game_time_data[x]["total_game_time_seconds"] = total_time_seconds
                with open(filename, 'w') as data_file:
                    json.dump(game_time_data, data_file, indent=2)
                return
        #If you got here that means the file isn't empty but it also doesn't have an entry
        #TODO THERE IS A BUG HERE. THIS IS NOT UPDATED TO FIT THE NEW STRUCTURE OF THE JSON DATA
        previous_game_time = datetime.strptime(closed_game_data[closed_game_name],format)
        new_entry_seconds = float(get_game_time_seconds(previous_game_time))
        new_entry = { closed_game_name: { "total_game_time_seconds": new_entry_seconds}}
        game_time_data.update(new_entry)
        with open(filename, 'w') as data_file:
                    json.dump(game_time_data, data_file, indent=2)

    else:
        #tis means the file is empty. TODO: this isn't initializing a proper file
        with open(filename, 'w') as data_file:
            json.dump(closed_game_data, data_file)