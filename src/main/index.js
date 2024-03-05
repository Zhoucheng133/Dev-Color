import { app, shell, BrowserWindow, ipcMain } from 'electron'
import { join } from 'path'
import { electronApp, optimizer, is } from '@electron-toolkit/utils'
import icon from '../../resources/icon.png?asset'
const { Menu } = require('electron');

function createWindow() {
  const mainWindow = new BrowserWindow({
    width: 600,
    height: 450,
    show: false,
    autoHideMenuBar: true,
    resizable: false,
    titleBarStyle: 'hiddenInset',
    ...(process.platform === 'linux' ? { icon } : {}),
    title: "",
    webPreferences: {
      preload: join(__dirname, '../preload/index.js'),
      sandbox: false
    }
  })

  mainWindow.on('ready-to-show', () => {
    mainWindow.show()
  })

  mainWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url)
    return { action: 'deny' }
  })
  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL'])
  } else {
    mainWindow.loadFile(join(__dirname, '../renderer/index.html'))
  }
}

function createMenu(){
  const template = [
    {
      label: 'File',
      submenu: [
        {
          label:"关于 Dev Color Tool",
          role: "about"
        },
        { type: 'separator' },
        {
          label:"隐藏",
          role:"hide"
        },
        {
          label: '退出',
          accelerator: 'CmdOrCtrl+Q',
          click() {
            app.quit();
          }
        }
      ]
    },
    {
      label: '编辑',
      submenu: [
        { type: 'separator' },
        {
          label: "全选",
          role: 'selectAll'
        },
        {
          label: "重做",
          role: 'redo'
        },
        { type: 'separator' },
        {
          label: "剪切",
          role: 'cut'
        },
        {
          label: "复制",
          role: 'copy'
        },
        {
          label: "粘贴",
          role: 'paste'
        }
      ]
    },
    {
      label: "窗口",
      submenu: [
        {
          label:"最小化",
          role:"minimize"
        },
        {
          label:"缩放",
          role:"zoom",
        }
      ]
    }
  ];

  const isMac = process.platform === 'darwin';
  // 如果是macOS系统则添加菜单，否则不添加任何菜单
  const menu = Menu.buildFromTemplate(template);
  if (isMac) {
    Menu.setApplicationMenu(menu);
  } else {
    Menu.setApplicationMenu(null);
  }
}

app.whenReady().then(() => {
  electronApp.setAppUserModelId('com.electron')

  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window)
  })

  ipcMain.on('ping', () => console.log('pong'))

  createWindow();
  createMenu();

  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})