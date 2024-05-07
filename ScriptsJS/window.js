const MINIMIZE = document.getElementById("minimize");
const CLOSE = document.getElementById("close");
const MAXIMIZE = document.getElementById("maximize");

function close(){
    app.window.close();
}
function minimize(){
    app.window.minimize();
}
function maximize(){
    app.window.maximize();
}

MINIMIZE.addEventListener("click", minimize);
CLOSE.addEventListener("click", close);
MAXIMIZE.addEventListener("click", maximize);
