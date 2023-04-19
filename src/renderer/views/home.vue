<template>
    <div class="home">
      <!-- <div class="header">
        <title>主程序集合</title>
        <img src="#" alt="这是小图片">
      </div>
      <div class="content">
        <a href="http://10.36.22.112/zentao/my.html" target="_blank">禅道</a>
      </div> -->
      <el-select v-model="value" placeholder="请选择">
    <el-option
      v-for="item in options"
      :key="item.value"
      :label="item.label"
      :value="item.value">
    </el-option>
  </el-select>
    <el-radio v-model="radio" label="1">备选项</el-radio>
    <el-radio v-model="radio" label="2">备选项</el-radio>
      <div class="main-container">
        <div class="header">Header---{{ version }}</div>
        <div class="container">
          <div class="aside">Aside</div>
          <div class="main"><a href="http://10.36.22.112/zentao/my.html" target="_blank">禅道</a></div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  const elc = window.require("electron");
  
  export default {
    name: 'HomeView',
    components: {
    },
    data() {
      return {
        version: "11",
        radio: "",
        options: [{
          value: '选项1',
          label: '黄金糕'
        }, {
          value: '选项2',
          label: '双皮奶'
        }, {
          value: '选项3',
          label: '蚵仔煎'
        }, {
          value: '选项4',
          label: '龙须面'
        }, {
          value: '选项5',
          label: '北京烤鸭'
        }],
        value: ''
      }
    },
    created() {
      this.getVersion()
    },
    methods: {
      getVersion() {
        console.log(elc.app)
        console.log(elc.remote)
  
        // this.version = electron.remote.app.getVersion();
      }
    },
  }
  </script>
  <style scoped>
  .main-container {
    display: flex;
    flex-direction: column;
    
  }
  .container {
    display: flex;
    flex-direction: row;
  }
  </style>
  