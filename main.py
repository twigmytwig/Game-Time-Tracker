import sys
from windowsProcesses import monitor_processes, check_cur_running_games
from PyQt6.QtWidgets import QApplication
from PyqtGUI import ProcessMonitorApp
from data_seeds import get_games
from PyQt6.QtCore import QTimer
import datetime
import save_to_file

ACTIVE_GAMES : str = set() #set makes this a unique list since one game can spawn many game.exe
ACTIVE_GAME_TIME = {}
CLOSED_GAME_TOTAL_TIME = {}
games_list = get_games()

def set_active_games():
    global ACTIVE_GAMES
    global games_list

    games = monitor_processes(games_list)
    if len(games) > 0:
        game: str
        for game in games:
            ACTIVE_GAMES.add(game)
            ACTIVE_GAME_TIME[game] = datetime.datetime.now()
    if ACTIVE_GAMES:
        active_game_copy = ACTIVE_GAMES.copy()
        ACTIVE_GAMES = check_cur_running_games(ACTIVE_GAMES)
        closed_games = active_game_copy - ACTIVE_GAMES
        for closed_game in closed_games:
            #if the CLOSED_GAME_TTOAL[INDEX] ALREADy exist, I need to increment this value rather than reseting it? OR when its closed that value goes to a database and that way i can record hwo many times they played and jsut add all of the times together
            CLOSED_GAME_TOTAL_TIME[closed_game] = str(datetime.datetime.now()  - ACTIVE_GAME_TIME[closed_game])
            save_to_file.save_to_file(CLOSED_GAME_TOTAL_TIME, closed_game,'data.json')

if __name__ == "__main__": 
    app = QApplication(sys.argv) 
    timer = QTimer()
    timer.timeout.connect(set_active_games)
    timer.start(5000)
    # Start a timer that runs this every second and this fundtion will return a list of the games thatare playiung
    sys.exit(app.exec())

