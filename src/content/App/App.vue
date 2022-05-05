<template>
  <div class="content_page">
    <p>AvavaAva提醒你:</p>
    <p>不好不好，现在是工作时间哦～</p>
  </div>
</template>

<script>
export default {
  data () {
    return {
      url: ''
    }
  },
  created (){
      this.url = chrome.extension.getURL('assets/gnyq.gif')
      console.log(this.url)
  },
}
</script>

<style>
.main_app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.content_page {
  color: #576690;
  font-size: 28px;
  position: fixed;
  z-index: 1000001;
  top: 10%;
  left: 10%;
  width: 80%;
  height: 80%;
  background:#9AC8E2EE;
  border-radius: 20px;
  text-align:center;
  padding: 20%;
}
</style>
