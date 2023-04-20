// import Datastore from 'lowdb'
// import FileSync from 'lowdb/lib/adapters/FileSync'
import path from 'path'
import fs from 'fs-extra'
import { app } from 'electron'

const low = require('lowdb');
const FileSync = require('lowdb/lib/adapters/FileSync');

const STORE_PATH = app.getPath('userData') // 获取electron应用的用户目录

const adapter = new FileSync(path.join(STORE_PATH, '/data.json')) // 初始化lowdb读写的json文件名以及存储路径

const db = low(adapter) // lowdb接管该文件

export default db // 暴露出去