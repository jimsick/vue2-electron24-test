/**
 * This file is used specifically and only for development. It installs
 * `electron-debug` & `vue-devtools`. There shouldn't be any need to
 *  modify this file, but it can be used to extend your development
 *  environment.
 */

/* eslint-disable */

// Install `electron-debug` with `devtron`
require('electron-debug')({ showDevTools: true })
// 增加方法
import { session } from 'electron'; 
const path = require('path')

// const __static = "node_modules";

// Install `vue-devtools`
require('electron').app.on('ready', () => {
  let installExtension = require('electron-devtools-installer')
  installExtension.default(installExtension.VUEJS_DEVTOOLS)
    .then(() => {})
    .catch(err => {
      console.log('Unable to install `vue-devtools`: \n', err)
    })
  // try {
  //   session.defaultSession.loadExtension(path.resolve('', 'node_modules/vue-devtools/vender'), { allowFileAccess: true });
  // } catch (e) {
  //   console.error('Vue Devtools failed to install:', e.toString())
  // }

  // BrowserWindow.addDevToolsExtension('node_modules/vue-devtools/vender')  //手动加载vue-devtools，前提是 npm install vue-devtools --save-dev
})

// Require `main` process to boot app
require('./index')