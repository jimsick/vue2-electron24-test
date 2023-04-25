<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'mini-tools'
}
</script>

<style>
/* styles.css */
html,
body {
  width: 100%;
  height: 100%;
  overflow: hidden;
}

body {
  margin: 0;
  padding: 0;
}

button {
  -webkit-app-region: no-drag;
}
::-webkit-scrollbar{width:6px;height:4px;border-radius: 3px}
::-webkit-scrollbar-button{width:6px;height:0;border-radius: 3px}
::-webkit-scrollbar-track{background:0 0}
::-webkit-scrollbar-thumb{background:#245FD9;-webkit-transition:.3s;transition:.3s}
::-webkit-scrollbar-thumb:hover{background-color:#245FD9}
::-webkit-scrollbar-thumb:active{background-color:#245FD9}*/
  ::-webkit-scrollbar {
      width: 6px;
      height: 6px;
  }
::-webkit-scrollbar-track-piece{
    background-color: transparent;
        -webkit-border-radius: 3px;
}
::-webkit-scrollbar-thumb:vertical{
    height: 6px;
    background-color: #D0D0D0;
    -webkit-border-radius: 3px;
}
::-webkit-scrollbar-thumb:horizontal{
    width: 6px;
    background-color: #D0D0D0;
    -webkit-border-radius: 3px;
}
  ::-webkit-scrollbar-thumb:vertical:hover,::-webkit-scrollbar-thumb:horizontal:hover{
      background-color: #D0D0D0;
  }

</style>
