// import storage from 'store2'
// import request from '@/utils/request'

/**
 * 路由定义（主进程与渲染进程通信频道定义）
 */
const ipcApiRoute = {
  getPath: 'getPath',
}

/**
 * 特殊的路由（频道）定义
 */
const specialIpcRoute = {
  // appUpdater: 'app.updater', // 此频道在后端也有相同定义
  // window1ToWindow2: 'window1-to-window2', // 窗口之间通信
  // window2ToWindow1: 'window2-to-window1', // 窗口之间通信
}

/**
 * 访问内置http服务
 */
const requestHttp = (uri, parameter) => {
  // url转换
  // const config = storage.get('httpServiceConfig');
  // const host = config.server || 'http://localhost:7071';
  // let url = uri.split('.').join('/');
  // url = host + '/' + url;
  // console.log('url:', url);
  // return request({
  //   url: url,
  //   method: 'post', 
  //   data: parameter, // body
  //   params: {}, // URL 参数
  //   timeout: 60000,
  // })
}

export {
  ipcApiRoute,
  specialIpcRoute,
  requestHttp,
}
