因为学习Electron所以写了这个工程，在electron-vue的基础上升级了最新版的electron搭配vue做了一些小开发以及练习

#### 环境
```
window10
node v16.14.0
npm  v8.19.4
yarn v1.22.19

```
Electron24 
vue2
```

#### Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:9080
npm run dev

# build electron application for production
npm run build


需要将 nodemodule/dev-tools/*/manifest.json  这个文件下的部分内容删除
brower_action: {
    default_icon: {
        16...
    }
    ...
}
permissions: [
    "contextMenus"
]

```
第一阶段实现  功能  增删改查网站  本地存储数据信息  可以进行图片上传以及删除
