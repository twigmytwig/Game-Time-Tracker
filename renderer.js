
const information = document.getElementById('info')
information.innerText = `This app is using Chrome (v${versions.chrome()}), Node.js (v${versions.node()}), and Electron (v${versions.electron()})`

function reloadPage(){
    location.reload();
}

const func = async () => {
    const response = await window.versions.ping()
    const response2 = await window.versions.getActiveGame()

    document.getElementById('test').innerHTML = response2;
    console.log(response) // prints out 'pong'
  }

  func()