const { app, BrowserWindow, ipcMain } = require('electron/main')
const { spawn } = require('child_process');
const path = require('node:path');
const fs = require('fs');

let pythonProcess;
let pythonOutput = "No output yet";
let jsonData = "";

function readJSONFile(path){
	console.log("readingJSONFile...")
	fs.readFile(path, (err, data) => {
		if (err) {
			console.error('Error reading file:', err);
			return "error";
		}
		
		try {
			console.log("I read it...")
			jsonDATA = JSON.parse(data);
			console.log("here is the data: " + data.toString())
			jsonData = data.toString()
			return data.toString();
		} catch (err) {
			console.error('Error parsing JSON:', err);
			return "Error";
		}
	});
}

const createWindow = () => {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    frame: false,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: true,
      //contextIsolation: false
    }
  })
  ipcMain.on("app/close", () => {
    app.quit()
  });
  
  ipcMain.on("app/minimize", () => {
    win.minimize()
  });
  
  ipcMain.on("app/maximize", () => {
    win.maximize()
  });


  win.loadFile('index.html')
}

app.whenReady().then(() => {
  ipcMain.handle('ping', () => 'pong') //this happens before loading the html file on purpose
  ipcMain.handle('getActiveGame', () => pythonOutput.toString())
  ipcMain.handle('updateJSONDisplay', () => {
	readJSONFile('./data.json');
	return jsonData;
  })
  
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

