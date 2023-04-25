<template>
  <div class="home">
    <!-- <div class="header">
        <title>主程序集合</title>
        <img src="#" alt="这是小图片">
      </div>
      <div class="content">
        <a href="http://10.36.22.112/zentao/my.html" target="_blank">禅道</a>
      </div> -->
    <!-- <el-select v-model="value" placeholder="请选择">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
    <el-radio v-model="radio" label="1">备选项</el-radio>
    <el-radio v-model="radio" label="2">备选项</el-radio> -->
    <div class="main-container">
      <div class="header">
        <div class="cont">
          <span class="header-title">Mini</span>
          <span class="header-userInfo"> 嗨, {{ userName }}</span>
        </div>
        <div class="sys-i">
          <i class="icon iconfont icon-line func-i" @click="minWin"></i>
          <i class="icon iconfont icon-close func-i" @click="closeWin"></i>
        </div>
      </div>
      <div class="container">
        <div class="menu">
          <template v-for="(item) in menuList">
            <div class="menu-item" :class="currentPage  == item.value ? 'menu-active' : 'menu-no-active'"
              @click="getMenu(item.value)">
              <i class="icon iconfont menu-icon" :class="'icon-' + item.icon"></i>
              <span class="menu-title">{{ item.title }}</span>
            </div>
          </template>
        </div>
        <div class="main">
          <component :is="currentPage"></component>
          <!-- <a href="http://10.36.22.112/zentao/my.html" target="_blank">禅道</a> -->
        </div>
      </div>
    </div>
  </div>
</template>
  
<script>
const os = require('os');
import webSetting from './webSetting';
import norWeb from './normalWeb';

export default {
  name: 'HomeView',
  components: {
    webSetting,
    norWeb
  },
  data() {
    return {
      userName: os.userInfo().username,
      currentPage: "nor-web", // 当前组件参数
      version: "11",
      radio: "",
      menuList: [{  // 左侧菜单栏
        icon: "IE",
        title: '常用网站',
        value: 'nor-web'
      }, {
        icon: "kaiguan",
        title: '设置',
        value: 'web-setting'
      }],
    }
  },
  created() {
    this.getVersion();
    this.insertData();
  },
  mounted() {
  },
  methods: {
    insertData(){
    
    },
    getMenu(val) {
      if(this.menuActive != val) this.currentPage = val;
    },
    minWin() {
      this.$ipc.send('window-min');
    },
    closeWin() {
      this.$ipc.send('window-close');
    },
    getVersion() {
      // console.log(elc.app)
      // console.log(elc.remote)
      // this.version = electron.remote.app.getVersion();
    }
  },
}
</script>
<style scoped>
.main-container {
  display: flex;
  flex-direction: column;
  background-color: #1e1e1e;
  background: url("~@/assets/images/title-img.jpg") no-repeat 0 0;
  background-size: cover;
}

.main-container .header {
  display: flex;
  align-items: center;
  height: 150px;
  -webkit-app-region: drag;
  -webkit-user-select: none;
}

.main-container .header .cont {
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  flex-direction: column;
  padding-left: 20px;
}

.header-title {
  color: #fff;
  font-size: 50px;
  font-weight: bold;

}

.header-userInfo {
  color: #fff;
  font-size: 18px;
}

.container {
  display: flex;
  flex-direction: row;
  -webkit-app-region: no-drag;
}

.container .menu {
  width: 225px;
  height: 482px;
  /* background-color: #0a0a1e; */
  padding: 20px;
}

.container .menu .menu-item {
  width: 100%;
  border-radius: 10px;
  padding: 10px 0 10px 10px;
  margin-bottom: 10px;
  display: flex;
  align-items: center;
  cursor: pointer;
}

.container .menu .menu-no-active:hover {
  background-color: #59adff;
}

.container .menu .menu-item .menu-icon {
  color: #fff;
  font-size: 26px;
}

@keyframes spin-animation {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(359deg);
  }
}

.container .menu .menu-no-active:hover .menu-icon {
  display: inline-block;
  animation: spin-animation 0.5s 1;
}

.container .menu .menu-item .menu-title {
  color: #fff;
  font-size: 22px;
  padding-left: 10px;
  font-family: '微软雅黑'
}

.container .main {
  display: flex;
  /* background-color: #0a0a1e; */
  width: 100%;
}

.menu-active {
  transition: all 0.5s ease;
  background-color: #59adff;
}

.sys-i {
  -webkit-app-region: no-drag;
  position: absolute;
  top: 10px;
  right: 10px;
  z-index: 9999;
  display: flex;
  align-items: center;
}

.sys-i .func-i {
  color: #fff;
  font-size: 30px;
}
.icon-line {
  font-size: 30px!important;
  margin-right: 20px;
}
.icon-line:hover {
  color: #000;
  cursor: pointer;
}
.icon-close:hover {
  color: #000;
  cursor: pointer;
}
</style>
  