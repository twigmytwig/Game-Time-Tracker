//win is definded in renderer.js it is remote.getCurrentWindow()

function minimize() {
    win.minimize();
}

function maximize() {
if (win.isMaximized()) {
    win.unmaximize();
} else {
    win.maximize();
}
}

function close() {
    win.close();
}