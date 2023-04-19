# demo-pro

> An electron-vue project

#### Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:9080
npm run dev

# build electron application for production
npm run build


```

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