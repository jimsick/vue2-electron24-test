// db新增
// this.$db.insert({},function(){
// })

// db查询
// this.$db.find({},function(){
//     //获取查询的数据
// })

// db更新
// this.$db.update({条件},{$set:{更改的数据}},function(){         
// })

// db删除
// this.$db.remove({条件},{},function(){
// })
const { ipcRenderer: ipc } = (window.require && window.require('electron')) || window.electron || null;
import { ipcApiRoute } from '@/api/main'
import Datastore from 'nedb'
import path from 'path'

let nedb;
// 获取基础目录，并创建基础数据库
ipc.invoke(ipcApiRoute.getPath).then((res) => {
    nedb = new Datastore({
        autoload: true,
        filename: path.join(res, '/data.db')
    })
})

let db = {
    insert(param) {
        return new Promise((resolve, reject) => {
            nedb.insert(
                param,
                function (err, ret) {
                    if (err) {
                        reject(err);
                    }
                    resolve(ret);
                })
        });
    },
    remove(param) {
        nedb.remove(
            param,
            { multi: true },
            function (err, numRemoved) {
                if (err) {
                    console.log(err);
                    return;
                }
            });
    },
    update(key, value, multi=true) {
        console.log(key, value,multi)
        return new Promise((resolve, reject) => {
            nedb.update(
                key,
                { $set:  value  },
                { multi: multi },
                function (err, numReplaced) {
                    if (err) {
                        reject(err);
                    }
                    resolve(numReplaced);
                }
            );
        });
    },
    find(param) {
        return new Promise((resolve, reject) => {
            nedb.find(
                param,
                function (err, ret) {
                    if (err) {
                        reject(err);
                    }
                    if (ret.length == 0) {
                        resolve(null);
                    } else {
                        resolve(ret);
                    }
                }
            )
        });
    }
}

export default db