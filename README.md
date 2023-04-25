# mini-tools


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

