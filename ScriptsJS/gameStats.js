//gameData is defined and updates via renderer.js
function updateMainGameData(){
    if(Object.keys(gameData).length !== 0){
        document.getElementById("main-game-stat-loader").style.display = 'none';
        document.getElementById("GameData").innerHTML = gameData;
    }
}

updateMainGameData()
setInterval(updateMainGameData, 5000);