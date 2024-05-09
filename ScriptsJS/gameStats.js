//gameData is defined and updates via renderer.js
function updateMainGameData(){
    if(Object.keys(gameData).length !== 0){
        jsonGameData = JSON.parse(gameData);
        gamesList = document.getElementById("playedGamesList");
        gamesList.innerHTML = "";                                      
        for(let key in jsonGameData){
            if(jsonGameData.hasOwnProperty(key)){
                //console.log(key)
                createGameListRecord(jsonGameData, key, gamesList);
            }
        }
        document.getElementById("main-game-stat-loader").style.display = 'none';
        document.getElementById("GameData").innerHTML = jsonGameData["ActiveGame"];
    }
}

function createGameListRecord(gameObject, key, gameList){
    list = document.createElement('li');
    list.innerHTML = key + " : " + convertSecondsToHours(gameObject[key]["total_game_time_seconds"]) + " hours";
    gamesList.append(list);
}

function convertSecondsToHours(seconds){
    //I need to take the seconds and return hours and minutes
    let secondsFloat = parseFloat(seconds);
    return (secondsFloat/60).toFixed(2);
}


updateMainGameData()
setInterval(updateMainGameData, 5000); // TODO probably there is a better way to do this
