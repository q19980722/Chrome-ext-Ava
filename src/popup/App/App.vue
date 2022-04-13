<template>
  <el-container style="width:600px; height: 400px; border-radius: 8px; background:#9AC8E280;">
    <el-header style="text-align: right; font-size: 12px">
      <el-row>
        <el-button-group>
          <el-button type="primary" icon="el-icon-edit"></el-button>
          <el-button type="primary" icon="el-icon-share"></el-button>
          <el-button type="primary" icon="el-icon-delete"></el-button>
        </el-button-group>
        <el-input v-model="search_input" placeholder="搜索"></el-input>
      </el-row>
    </el-header>
    <el-main>
      <el-card shadow="hover" style="border-radius: 8px;">
        <el-row>
          <el-carousel height="150px">
            <el-carousel-item v-for="item in 4" :key="item">
              <h3 class="small">{{ item }}</h3>
            </el-carousel-item>
          </el-carousel>
        </el-row>
      </el-card>
      <el-card shadow="hover" style="border-radius: 8px;0">
        <el-row>
          <el-button icon="el-icon-close-notification" circle></el-button>
          <el-button icon="el-icon-picture" circle @click="screenshot"></el-button>
          <el-button icon="el-icon-document-copy" circle></el-button>
          <el-button icon="el-icon-eleme" circle></el-button>
          <el-button icon="el-icon-download" circle></el-button>
          <!-- <el-button icon="el-icon-circle-close" circle></el-button> -->
        </el-row>
        <el-row>
          <el-button icon="el-icon-alarm-clock" circle></el-button>
          <el-button icon="el-icon-date" circle></el-button>
          <el-button icon="el-icon-finished" circle></el-button>
          <el-button icon="el-icon-notebook-2" circle></el-button>
          <el-button icon="el-icon-s-data" circle></el-button>
        </el-row>
      </el-card>
    </el-main>
  </el-container>
</template>

<script>
// import chrome from "vue-cli-plugin-chrome-ext"

  export default {
    name: 'app',
    data() {
      return {
        search_input:"",
      };
    },
    methods: {
      screenshot () {
        // chrome.tabs.captureVisibleTab(null,{format:"png",quality:100},function (screenshot){
        //   chrome.downloads.download({url:screenshot,saveAs:true},(res)=>{console.log(res)})
        //   console.log(screenshot.data.toDataURL())
        // });
        chrome.tabs.captureVisibleTab(null, {format: "png", quality: 100}, (img_url) => {
          chrome.downloads.download({url: img_url, saveAs: true}, (res) => {console.log(res)})
        });
      },
    }
  };
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
.el-carousel__item h3 {
  color: #475669;
  font-size: 14px;
  opacity: 0.75;
  line-height: 150px;
  margin: 0;
}
</style>
