import json


class WinProcess:
    def __init__(self, name):
        self.name = name

def get_games():
    try:
        with open('data.json') as file:
            game_json = json.load(file)
            return list(game_json.keys())  # TODO: this will also return ActiveGames. The JSON file needs to be fixed
    except FileNotFoundError:
        print("Error: 'data.json' file not found.")
        return []