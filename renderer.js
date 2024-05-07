const information = document.getElementById('info')
information.innerText = `This app is using Chrome (v${app.chrome()}), Node.js (v${app.node()}), and Electron (v${app.electron()})`
let gameData = '';


const func = async () => {
    const response = await window.app.ping()
    //const response2 = await window.versions.getActiveGame()
    gameData = await window.app.updateJSONDisplay()
    console.log("In renderer now : " + gameData)
    console.log(response) // prints out 'pong'
  }
  
  func()
  setInterval(func, 10000);