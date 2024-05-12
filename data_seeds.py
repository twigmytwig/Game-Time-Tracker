import json


class WinProcess:
    def __init__(self, name):
        self.name = name

data : str = []

def get_games():
    file = open('data.json')
    game_json = json.load(file)
    if game_json:
        for x in game_json:
            data.append(x)
    return data