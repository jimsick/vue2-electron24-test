<template>
  <div class="web-setting">
    <el-tabs v-model="activeName" class="tabs" type="card" @tab-click="getWebConfig">
      <el-tab-pane label="网站管理" name="first">
        <div class="web-manage">
          <div class="add-web web-block" @click="doWeb('新增')">
            <i class="icon iconfont icon-plus-circle add-web-icon"></i>
          </div>
          <el-table class="ones" :data="webList" style="width: 100%">
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
                <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </el-tab-pane>
    </el-tabs>
    <el-dialog :title="type + '网站'" :visible.sync="webVisible" width="50%" popper-append-to-body
      :before-close="handleClose">
      <div class="previwe">
        <div class="title">预览</div>
        <i class="icon iconfont" :class="'icon-' + webParam.webIcon"></i>
        <span style="float: right; color: #8492a6; font-size: 13px">{{ webParam.webName }}</span>
      </div>
      <el-form ref="form" :model="webParam" label-width="80px">
        <el-form-item label="网站名称">
          <el-input v-model="webParam.webName"></el-input>
        </el-form-item>
        <el-form-item label="网站地址">
          <el-input v-model="webParam.webUrl"></el-input>
        </el-form-item>
        <el-form-item label="网站图标">
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
  data() {
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
      webList: [],
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
      this.$db.find(params).then((res, err) => {
        this.webList = res
      })
    },
    handleClick(tab, event) {
      console.log(tab, event);
    },
    doWeb(type, row) {
      this.type = type
      if(type == '新增') {
        this.reset();
      }else {
        this.webParam = row
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
        englishName: ""
      }
    },
    submit() {
      let params;
      if(this.type == "新增") {
        // 获取英文名
        if (this.webParam.webName) {
          this.webParam.englishName = this.$py.getFullChars(this.webParam.webName)
        }
        params = {
          type: 'web-config',
          ...this.webParam
        }
        this.$db.insert(params).then((res) => {
          this.webVisible = false
        })
      } else {
        params = {
          ...this.webParam
        }
        this.$db.update({_id: params._id},params).then((res) => {
          console.log(res)
          this.webVisible = false
        })
      }
      
    }
  },
}
</script>
<style scoped>
.web-setting {
  width: 100%;
  height: 100%;
}
/deep/ .ones {
  background-color: rgba(255,255,255, 0);
}
.web-manage {
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0 10px;
}

.web-block {
  width: 30px;
  height: 30px;
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  flex-direction: column;
  margin-bottom: 10px;
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
</style>
    