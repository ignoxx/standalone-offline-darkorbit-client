const config = require("config")
const web = require("./server/web/index.js")
const gameServer = require("./server/game/index.js")
const policyServer = require("./server/policy/index.js")

const { app, Menu, BrowserWindow } = require("electron");
const path = require("path");
var mainWindow = null;

Menu.setApplicationMenu(false)

let pluginName;
switch (process.platform) {
  case "win32":
    pluginName = "flash/pepflashplayer.dll";
    break;
  case "darwin":
    pluginName = "flash/PepperFlashPlayer.plugin";
    break;
  case "linux":
    pluginName = "flash/libpepflashplayer.so";
    break;
}
app.commandLine.appendSwitch(
  "ppapi-flash-path",
  path.join(__dirname, pluginName)
);

app.on("ready", () => {

  // Start the servers
  web.listen(config.get("web.port"))
  policyServer.listen(config.get("policy.port"))
  gameServer.listen(config.get("game.port"))

  mainWindow = new BrowserWindow({
    width: 830,
    height: 700,
    webPreferences: {
      plugins: true,
      nodeIntegration: true
    },
  });
  mainWindow.loadURL(`http://${config.get("client.host")}:${config.get("client.port")}/`);
  // mainWindow.webContents.openDevTools();
  mainWindow.focus();
});

app.on("window-all-closed", function () {
  if (process.platform !== 'darwin') app.quit()
});

app.on("activate", function () {
  if (mainWindow === null) {
    createWindow();
  }
});
