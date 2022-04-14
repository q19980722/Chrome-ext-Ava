<template>
  <el-container style="width:400px; height: 500px; border-radius: 8px; background:#9AC8E280;">
    <el-header style="text-align: right; font-size: 12px; height: 100px;" >
      <el-row :gutter="20">
        <el-col :span="8">
          <el-image v-if = "!isGif"
          @mouseenter="isGif = true"
          @mouseleave="isGif = false" 
          style="width: 100px; height: 100px"
          :src="pngurl"
          fit="fill"></el-image>
          <el-image v-else
          @mouseenter="isGif = true"
          @mouseleave="isGif = false" 
          style="width: 100px; height: 100px"
          :src="gifurl"
          fit="fill"></el-image>
        </el-col>
        <el-col :span="16">
          <el-button-group>
            <el-button type="primary" icon="el-icon-edit"></el-button>
            <el-button type="primary" icon="el-icon-share"></el-button>
            <el-button type="primary" icon="el-icon-delete"></el-button>
          </el-button-group>
          <el-input v-model="search_input" placeholder="搜索"></el-input>
        </el-col>
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
      <el-card shadow="hover" style="border-radius: 8px;">
        <el-row>
          <el-button icon="el-icon-close-notification" circle></el-button>
          <el-button icon="el-icon-picture" circle></el-button>
          <el-button icon="el-icon-document-copy" circle @click="drawer = true"></el-button>
          <el-button icon="el-icon-eleme" circle></el-button>
          <el-button icon="el-icon-download" circle @click="getTabs"></el-button>
          <!-- <el-button icon="el-icon-circle-close" circle></el-button> -->
        </el-row>
        <el-row>
          <el-button icon="el-icon-alarm-clock" circle></el-button>
          <el-button icon="el-icon-date" circle></el-button>
          <el-button icon="el-icon-finished" circle></el-button>
          <el-button icon="el-icon-notebook-2" circle></el-button>
          <el-button icon="el-icon-s-data" circle @click="reset"></el-button>
        </el-row>
      </el-card>

      <el-drawer
        title="tabs reload"
        size="300px"
        :with-header=false
        :visible.sync="drawer"
        direction="ttb"
        :destroy-on-close=true
        @open="getSavedTabsGroupList">
        <el-divider><i class="el-icon-folder-add"></i>  存储</el-divider>
        <el-form :inline="true" :model="saveTabsGroupForm" size="medium" label-width="120px">
          <el-form-item label="标签组名">
            <el-input v-model="saveTabsGroupForm.groupName" placeholder="需存储的标签组名"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="saveTabsGroup">保存</el-button>
          </el-form-item>
        </el-form>
        <el-divider><i class="el-icon-setting"></i>  加载或删除</el-divider>
        <el-form :model="reloadTabsGroupForm" size="medium" label-width="120px">
          <el-form-item label="标签组名">
            <el-select v-model="reloadTabsGroupForm.groupName" placeholder="需要加载的标签组">
              <el-option v-for="(vakue, key, index) in savedTabsGroupList" :key="index" :value="key"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary"  @click="reloadTabsGroup">加载</el-button>
            <el-button @click="deleteTabsGroup">删除</el-button>
          </el-form-item>
        </el-form>
      </el-drawer>

    </el-main>
  </el-container>
</template>

<script>
  export default {
    name: 'app',
    data() {
      return {
        isGif: false,
        pngurl: 'assets/start.png',
        gifurl: 'assets/start.gif',
        search_input: '',
        savedTabsGroupList: {},
        saveTabsGroupForm: {groupName: ''},
        reloadTabsGroupForm: {groupName: ''},
        drawer: false,
      };
    },
    methods: {
      screenshot () {
        chrome.tabs.captureVisibleTab(null, {format: "png", quality: 100}, (img_url) => {
          chrome.downloads.download({url: img_url, saveAs: true}, (res) => {console.log(res)});
        });
      },
      getTabs () {
        chrome.tabs.query({}, (tabs) => {
          var urls = tabs.map((tab) => {return tab.url});
          chrome.storage.local.set({"test":urls});
        });
      },
      getSavedTabsGroupList () {
        chrome.storage.local.get("savedTabsGroupList", (entry) => {
          this.savedTabsGroupList = (typeof(entry.savedTabsGroupList) == 'undefined') ? {} : entry.savedTabsGroupList;
          });
      },
      saveTabsGroup () {
        chrome.tabs.query({}, (tabs) => {
          var urls = tabs.map((tab) => {return tab.url});
          this.savedTabsGroupList[this.saveTabsGroupForm.groupName] = urls;
          chrome.storage.local.set({"savedTabsGroupList":this.savedTabsGroupList});
        });
      },
      reloadTabsGroup () {
        chrome.storage.local.get("savedTabsGroupList", (entry) => {
          entry.savedTabsGroupList[this.reloadTabsGroupForm.groupName].forEach(URL => {chrome.tabs.create({url:URL})});
        });
      },
      reset () {
        chrome.storage.local.clear(() => {console.log("clear")})
      },
      deleteTabsGroup () {
        console.log(this.savedTabsGroupList);
        chrome.storage.local.get("savedTabsGroupList", (entry) => {
          this.savedTabsGroupList = (typeof(entry.savedTabsGroupList) == 'undefined') ? {} : entry.savedTabsGroupList;
          delete entry.savedTabsGroupList[this.reloadTabsGroupForm.groupName];
          console.log(this.savedTabsGroupList)
          chrome.storage.local.set({"savedTabsGroupList":this.savedTabsGroupList});
        });
      }

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
