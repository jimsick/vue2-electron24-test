import { app, BrowserWindow, Menu, ipcMain, Tray } from 'electron'
import Vue from 'vue'

import '../renderer/store'
// 引入数据库
// import db from '../renderer/plugin/datastore'
/* 全局引入 */


/**
 * Set `__static` path to static files in production
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-static-assets.html
 */
if (process.env.NODE_ENV !== 'development') {
  global.__static = require('path').join(__dirname, '/static').replace(/\\/g, '\\\\')
}
// 系统托盘
let appTray = null;
let mainWindow

const path = require('path')


const gotTheLock = app.requestSingleInstanceLock();
if (!gotTheLock) {
  app.quit()
} else {
  app.on('second-instance', (event, commandLine, workingDirectory) => {
    // 当运行第二个实例时,将会聚焦到win这个窗口 
    if (mainWindow) {
      if (mainWindow.isMinimized())
        mainWindow.restore()
      mainWindow.focus()
      mainWindow.show()
    }
  })
}
const winURL = process.env.NODE_ENV === 'development'
  ? `http://localhost:9080`
  : `file://${__dirname}/index.html`

// 隐藏主窗口，并创建托盘，绑定关闭事件
function setTray(mainWindow) {
  // 用一个 Tray 来表示一个图标,这个图标处于正在运行的系统的通知区
  // 通常被添加到一个 context menu 上.
  // 系统托盘右键菜单
  const trayMenuTemplate = [
    {
      type: 'checkbox',
      label: '开机启动',
      checked: app.getLoginItemSettings().openAtLogin,
      click: function () {
        if (!app.isPackaged) {
          app.setLoginItemSettings({
            openAtLogin: !app.getLoginItemSettings().openAtLogin,
            path: process.execPath
          })
        } else {
          app.setLoginItemSettings({
            openAtLogin: !app.getLoginItemSettings().openAtLogin
          })
        }
      }
    },
    {
      // 系统托盘图标目录
      label: '退出',
      click: () => {
        app.quit();
      }
    }
  ];
  // 设置系统托盘图标
  const iconPath = path.join(__static, 'icon/ty-icon-mhbb.jpg');
  appTray = new Tray(iconPath);
  const win = BrowserWindow.getFocusedWindow()
  // 图标的上下文菜单
  const contextMenu = Menu.buildFromTemplate(trayMenuTemplate);

  // 展示主窗口，隐藏主窗口 mainWindow.hide()
  mainWindow.show();

  // 设置托盘悬浮提示
  appTray.setToolTip('Svolt');

  // 设置托盘菜单
  appTray.setContextMenu(contextMenu);

  // 单击托盘小图标显示应用
  // appTray.on('click', () => {
  //     //显示主程序
  //     mainWindow.show();
  //     //关闭托盘显示
  //     // appTray.destroy();
  // });
  appTray.on('double-click', () => {
    win.isVisible() ? win.hide() : win.show()
  })
  return appTray;
}




function createWindow() {
  /**
   * Initial window options
   */
  Menu.setApplicationMenu(null)
  mainWindow = new BrowserWindow({
    height: 672,
    useContentSize: true,
    width: 1000,
    resizable: false,
    movable: true,
    frame: false,
    alwaysOnTop: false,
    webPreferences: {
      // preload: path.join(__dirname, 'preload.js'),
      webSecurity: false,
      nodeIntegration: true,
      enableRemoteModule: true,
      contextIsolation: false, // false -> 可在渲染进程中使用electron的api，true->需要(contextBridge)
    }
  })
  // 忽略鼠标点击事件
  // mainWindow.setIgnoreMouseEvents(true) 
  mainWindow.loadURL(winURL)
  setTray(mainWindow);
  mainWindow.setSkipTaskbar(true) // 使窗口不显示在任务栏中

  //程序崩溃后
  mainWindow.webContents.on('crashed', () => {
    const options = {
      type: 'error',
      title: '进程崩溃了',
      message: '这个进程已经崩溃.',
      buttons: ['重载', '退出'],
    };
    recordCrash().then(() => {
      dialog.showMessageBox(options, (index) => {
        if (index === 0) reloadWindow(mainWindow);
        else app.quit();
      });
    }).catch((e) => {
      console.log('err', e);
    });
  })

  function recordCrash() {
    return new Promise(resolve => {
      // 崩溃日志请求成功....
      resolve();
    })
  }

  function reloadWindow(mainWin) {
    if (mainWin.isDestroyed()) {
      app.relaunch();
      app.exit(0);
    } else {
      BrowserWindow.getAllWindows().forEach((w) => {
        if (w.id !== mainWin.id) w.destroy();
      });
      mainWin.reload();
    }
  }
  mainWindow.on('closed', () => {
    mainWindow = null
  })
}

app.on('ready', createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow()
  }
})

//登录窗口最小化
ipcMain.on('window-min', function () {
  mainWindow.minimize();
})
//登录窗口最大化
ipcMain.on('window-max', function () {
  if (mainWindow.isMaximized()) {
    mainWindow.restore();
  } else {
    mainWindow.maximize();
  }
})
//关闭窗口
ipcMain.on('window-close', function () {
  mainWindow.close();
})

// 获取用户目录
ipcMain.handle('getPath', async (event, args) => {
  const STORE_PATH = app.getPath('userData') // 获取electron应用的用户目录
  return STORE_PATH
})

/**
 * Auto Updater
 *
 * Uncomment the following code below and install `electron-updater` to
 * support auto updating. Code Signing with a valid certificate is required.
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-electron-builder.html#auto-updating
 */

/*
import { autoUpdater } from 'electron-updater'

autoUpdater.on('update-downloaded', () => {
  autoUpdater.quitAndInstall()
})

app.on('ready', () => {
  if (process.env.NODE_ENV === 'production') autoUpdater.checkForUpdates()
})
 */
