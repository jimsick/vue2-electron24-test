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
}

body {
  margin: 0;
  padding: 0;
}

button {
  -webkit-app-region: no-drag;
}
</style>
