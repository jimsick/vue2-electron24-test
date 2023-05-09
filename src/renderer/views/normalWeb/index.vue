<template>
  <div class="noraml-web">
    <div class="web-block" v-for="(item, index) in webList" :key="'web' + index" @click="openWeb(item.webUrl)">
      <i v-if="!item.iconOrImg" class="icon iconfont  web-icon" :class="'icon-' + item.webIcon"></i>
      <img v-else class="pre-img" :src="formatUrl(item.imageUrl)" alt="预览图片">
      <span class="block-title">{{ item.webName }}</span>
    </div>
  </div>
</template>
    
<script>
const os = require('os');
export default {
  name: 'noramlWeb',
  components: {
  },
  data() {
    return {
      webList: []
    }
  },
  computed:{
    formatUrl(){
      return function (url) {
        if(url) {
          return url.replaceAll("\\", "/")
        }
      };
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
      this.$db.sort({timestamp: -1}).find(params).then((res, err) => {
        this.webList = res
      })
    },
    openWeb(url) {
      this.$ipc.send('createChildWindow', {
        "type": 2,
        "url": url
      })
      // window.open(url, "_blank", `height=${window.screen.height}, width=${window.screen.width},top=0,left=0`) 
    }
  }
}
</script>
<style scoped>
.noraml-web {
  width: 100%;
  height: 522px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-content: flex-start;
}

.web-block {
  /* width: 78px;
  height: 78px; */
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  /* padding: 25px; */
  margin-right: 50px;
  cursor: pointer;
}

.web-icon {
  color: #fff;
  font-size: 55px;
}

.block-title {
  color: #fff;
  font-size: 15px;
  margin-top: 2px;
}
.pre-img {
  height: 80px;
  margin-bottom: 5px;
}
</style>
    