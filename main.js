const { app, BrowserWindow, ipcMain } = require('electron/main')
const { PythonShell } = require('python-shell');
const { spawn } = require('child_process');
const path = require('node:path')

let pythonProcess;
let pythonOutput = "No output yet";

const createWindow = () => {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      //nodeIntegration: true,
      //contextIsolation: false
    }
  })



  win.loadFile('index.html')
}

app.whenReady().then(() => {
  ipcMain.handle('ping', () => 'pong') //this happens before loading the html file on purpose
  ipcMain.handle('getActiveGame', () => pythonOutput.toString())
  
  pythonProcess = spawn('python', ['./main.py']);

  pythonProcess.stdout.on('data', (data) => {
    pythonOutput = data;
    console.log(`Python stdout: ${data}`);
    // You can send this data to your renderer process if needed
  });
  pythonProcess.stderr.on('data', (data) => {
    console.error(`Python stderr: ${data}`);
  });

  pythonProcess.on('close', (code) => {
    console.log(`Python process exited with code ${code}`);
  });

  createWindow()

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit()
  })