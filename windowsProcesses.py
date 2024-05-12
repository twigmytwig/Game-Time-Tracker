import psutil
from save_to_file import set_active_game

#Get all running processes
existing_processes = set(p.name() for p in psutil.process_iter())

def filter_by_name(process_name):
    for process in psutil.process_iter():
        try:
            if process.name() == process_name:
                yield process
        except psutil.NoSuchProcess:
            pass

def is_running(process_name):
    return any(p for p in filter_by_name(process_name))

def get_current_processes():
    return set(p.name() for p in psutil.process_iter()) #get all active win processes

def monitor_processes(gameList):
    global existing_processes
    running_games = set()
    new_processes = set(p.name() for p in psutil.process_iter()) - existing_processes #this could be a list? is it better to jsut get set of all processes and see loop through to see if games are in loop?
    if new_processes:
        for game in gameList:
            if game in new_processes:
                set_active_game(game,'data.json')
                running_games.add(game)                           
    existing_processes = set(p.name() for p in psutil.process_iter())
    return running_games


def check_cur_running_games(active_games):
    temp_active_games = active_games.copy()
    for x in active_games:
        if x not in existing_processes:
            set_active_game('','data.json')
            temp_active_games.remove(x)
    return temp_active_games