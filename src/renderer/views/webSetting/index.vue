<template>
  <div class="web-setting">
    <el-tabs v-model="activeName" class="tabs" type="card" @tab-click="getWebConfig">
      <el-tab-pane label="网站管理" name="first">
        <div class="web-manage">
          <div class="header-func">
            <el-input v-model="keyword" placeholder="请输入内容"></el-input>
            <div class="add-web web-block" @click="doWeb('新增')">
              <i class="icon iconfont icon-plus-circle add-web-icon"></i>
            </div>
          </div>
          <div class="config-table">
            <el-table :data="webList" height="100%" style="width: 100%;background-color: transparent;color: #fff;">
              <el-table-column type="index" label="序号" width="50">
              </el-table-column>
              <el-table-column prop="webName" label="名称" width="100">
              </el-table-column>
              <el-table-column prop="webIcon" label="图标" width="100">
                <template slot-scope="scope">
                  <i class="icon iconfont" :class="'icon-' + scope.row.webIcon"></i>
                </template>
              </el-table-column>
              <el-table-column prop="webUrl" label="地址">
              </el-table-column>
              <el-table-column label="操作">
                <template slot-scope="scope">
                  <el-button size="mini" @click="doWeb('编辑', scope.row)">编辑</el-button>
                  <el-button size="mini" type="danger" @click="remove(scope.row._id)">删除</el-button>
                </template>
              </el-table-column>
            </el-table>
          </div>

        </div>
      </el-tab-pane>
    </el-tabs>
    <el-dialog :title="type + '网站'" :visible.sync="webVisible" width="50%" popper-append-to-body
      :before-close="handleClose" @close="webVisible = false" class="config-dialog">
      <div class="preview">
        <div class="title">预览</div>
        <div class="preview-show">
          <i class="icon iconfont preview-web-icon" :class="'icon-' + webParam.webIcon"></i>
          <span style="float: right; color: #8492a6; font-size: 13px">{{ webParam.webName }}</span>
        </div>
      </div>
      <el-form ref="webParam" :model="webParam" :rules="rules" label-width="80px">
        <el-form-item label="网站名称" prop="webName">
          <el-input v-model="webParam.webName"></el-input>
        </el-form-item>
        <el-form-item label="网站地址" prop="webUrl">
          <el-input v-model="webParam.webUrl"></el-input>
        </el-form-item>
        <el-form-item label="网站图标" prop="webIcon">
          <el-select v-model="webParam.webIcon" placeholder="请选择">
            <el-option v-for="item in iconData.glyphs" :key="item.font_class" :label="item.name" :value="item.font_class">
              <i class="icon iconfont" :class="'icon-' + item.font_class"></i>
              <span style="float: right; color: #8492a6; font-size: 13px">{{ item.font_class }}</span>
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="webVisible = false">取 消</el-button>
        <el-button type="primary" @click="submit">确 定</el-button>
      </span>

    </el-dialog>
  </div>
</template>
    
<script>
import jsonData from '@/assets/iconfont/iconfont.json'

const os = require('os');
export default {
  name: 'web-setting',
  components: {
  },
  watch: {
    keyword: {
      immediate: true,
      deep: false,
      handler(val) {
        if (val) {
          this.webList = this.webList.filter((item) => {
            return (item.webName.indexOf(val) != -1)
          })
        } else {
          this.webList = JSON.parse(JSON.stringify(this.allData))
        }
      }
    }
  },
  data() {
    let checkUrl = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('网址不能为空'));
      }
      let reg = new RegExp("[a-zA-z]+://[^\s]*", "g");
      let regIp = new RegExp("[a-zA-z]+://(25[0-5]|2[0-4]\d|[0-1]\d{2}|[1-9]?\d)\.(25[0-5]|2[0-4]\d|[0-1]\d{2}|[1-9]?\d)\.(25[0-5]|2[0-4]\d|[0-1]\d{2}|[1-9]?\d)\.(25[0-5]|2[0-4]\d|[0-1]\d{2}|[1-9]?\d)", "g")
      if (reg.test(value) || regIp.test(value)) {
        callback();
      } else {
        callback(new Error('网址不符合规范！'));
      }
    };
    return {
      iconData: jsonData,
      activeName: 'first',
      webVisible: false,
      type: "新增",
      webParam: {
        webIcon: "",
        webUrl: "",
        webName: "",
        englishName: ""
      },
      rules: {
        webName: [
          { required: true, message: '请输入网站名称', trigger: 'blur' },
          { min: 2, message: '长度至少2个字符', trigger: 'blur' }
        ],
        webUrl: [
          // { required: true, message: '请输入网站地址', trigger: 'blur' },
          { validator: checkUrl, trigger: 'blur' }
        ],
        webIcon: [
          { required: true, message: '请选择标志', trigger: 'change' },
        ],
      },
      // 查询关键字
      keyword: "",
      webList: [],
      allData: [],
    }
  },
  created() {
    this.getWebConfig()
  },
  mounted() {
  },
  methods: {
    // 初始化页面获取所有web配置
    getWebConfig() {
      let params = {
        type: 'web-config',
      }
      this.$db.sort({ timestamp: -1 }).find(params).then((res, err) => {
        this.allData = res
        this.webList = res
      })
    },
    handleClick(tab, event) {
      console.log(tab, event);
    },
    doWeb(type, row) {
      this.type = type
      if (type == '新增') {
        this.reset();
      } else {
        this.webParam = JSON.parse(JSON.stringify(row))
      }
      this.webVisible = !this.webVisible
    },
    handleClose() {
      this.webVisible = false
    },
    reset() {
      this.webParam = {
        webIcon: "",
        webUrl: "",
        webName: "",
        englishName: "",
      }
    },
    submit() {
      let params;
      this.$refs["webParam"].validate((valid) => {
        console.log("valid:", valid)
        if (valid) {
          let reg = new RegExp("[\\u4E00-\\u9FFF]+", "g");
          if (this.type == "新增") {
            // 获取英文名
            if (this.webParam.webName && reg.test(this.webParam.webName)) {
              this.webParam.englishName = this.$py.getFullChars(this.webParam.webName)
            }
            params = {
              type: 'web-config',
              ...this.webParam,
              timestamp: Date.now(),
            }
            this.$db.insert(params).then((res) => {
              this.webVisible = false
            })
          } else {
            params = {
              ...this.webParam
            }
            this.$db.update({ _id: params._id }, params).then((res) => {
              this.webVisible = false
            })
          }
          this.getWebConfig()
        } else {
          return false;
        }
      });

    },
    remove(_id) {
      this.$db.remove({ _id: _id }).then((res) => {
        this.getWebConfig()
      })
    },
  },
}
</script>
<style scoped>
.web-setting {
  width: 100%;
  height: 100%;
}

/deep/ .ones {
  background-color: rgba(255, 255, 255, 0);
}

.web-manage {
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0 10px;
}

.header-func {
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: 10px;
}

.web-block {
  width: 30px;
  height: 30px;
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  flex-direction: column;
  margin-left: 10px;
  cursor: pointer;
}

.add-web-icon {
  color: #fff;
  font-size: 30px;
}

.web-icon {
  color: #fff;
  font-size: 55px;
}

.block-title {
  color: #fff;
  font-size: 15px;
}

/deep/ .el-tabs__header {
  margin-bottom: 10px !important;
}

/deep/ .el-tabs__item {
  color: #fff;
  font-size: 18px;
  border-bottom-color: #fff !important;
  font-weight: bold;
}

/deep/ .is-active {
  color: #59adff;
  border-bottom-color: transparent !important;
}

/deep/ .el-tabs--card>.el-tabs__header {
  border: none;
}

/deep/ .el-input__inner {
  background-color: transparent;
}
/deep/ .el-table tr {
  background-color: transparent;
}
/deep/ .el-table--enable-row-hover .el-table__body tr:hover>td.el-table__cell {
  background-color: #59adff;
}
/deep/ .el-table th.el-table__cell {
  background-color: transparent;
  color: #fff;
} 
.config-table {
  height: 419px;
  width: 100%;
}

.preview {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}

.preview .title {
  font-weight: bold;
}

.preview-show {
  width: 78px;
  height: 78px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 25px;
}

.preview-web-icon {
  font-size: 55px;
}

.config-dialog {
  -webkit-app-region: no-drag;
}
</style>
    