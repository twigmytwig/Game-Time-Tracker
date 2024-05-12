//gameData is defined and updates via renderer.js
function updateMainGameData(){
    const mainGameStatsLoader = document.getElementById("main-game-stat-loader");
    if(gameData){
        let jsonGameData;
        try{
            jsonGameData = JSON.parse(gameData);
        }
        catch(error){
            console.error("Error parsing gameDate:" + error);
            return;
        }
        gamesList = document.getElementById("playedGamesList");
        gamesList.innerHTML = "";    
        Object.entries(jsonGameData)
        .filter(([key]) => key !== 'ActiveGame')
        .forEach(([key, value]) => {
            const listItem = document.createElement('li');
            listItem.textContent = `${key} : ${convertSecondsToHours(value.total_game_time_seconds)} hours`;
            gamesList.appendChild(listItem);
        });

        if(mainGameStatsLoader){
            mainGameStatsLoader.style.display = 'none';
        }
        
        document.getElementById("GameData").textContent = jsonGameData["ActiveGame"] == "" ? "N/A" : jsonGameData["ActiveGame"];
    }
    else{
        return;
    }
}

function convertSecondsToHours(seconds){
    //I need to take the seconds and return hours and minutes
    let secondsFloat = parseFloat(seconds);
    let minutesFloat = (secondsFloat/60).toFixed(2);
    return (minutesFloat/60).toFixed(2);
}

updateMainGameData()
setInterval(updateMainGameData, 5000); // TODO probably there is a better way to do this
