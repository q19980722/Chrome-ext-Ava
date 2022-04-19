<template>
  <el-container style="width:450px; height: 500px; border-radius: 8px; background:#9AC8E280;">
    <el-header style="height: 120px; margin: 20px 0px 0px 0px" >
      <el-row :gutter="20" type="flex" align="bottom">
        <el-col :span="8">
          <div @mouseenter="isGif = true"
          @mouseleave="isGif = false" >
          <el-avatar v-if = "isGif" :src="gifurl"
          style="width: 120px; height: 120px; background:#9AC8E200;"
          fit="fill"></el-avatar>
          <el-avatar v-else :src="pngurl"
          style="width: 120px; height: 120px; background:#9AC8E200;"
          fit="fill"></el-avatar>
          </div>
        </el-col>
        <el-col :span="16">
          <el-row type="flex" justify="start">
            <el-radio-group v-model="search_mode" size="mini">
              <el-radio-button label="历史记录"><i class="el-icon-time"></i></el-radio-button>
              <el-radio-button label="收藏"><i class="el-icon-star-off"></i></el-radio-button>
              <el-radio-button label="翻译"><i class="el-icon-refresh"></i></el-radio-button>
            </el-radio-group>            
          </el-row>
          <el-row>
            <el-input v-model="search_input" placeholder="搜索" size="medium" prefix-icon="el-icon-search"></el-input>
          </el-row>
        </el-col>
      </el-row>
    </el-header>
    <el-main>
      <el-card v-if="JSON.stringify(planList) == '{}'" style="border-radius: 8px; background:#9AC8E240; height: 175px;">
        <el-row type="flex" justify="space-around">
          <el-image style="width: 100px; height: 100px;" src="assets/zmhsn.gif"></el-image> 
        </el-row>
        <el-row type="flex" justify="space-around" style="margin: 15px 0px 0px 0px">
          <label style="font-size:16px; color:#f2f8fb;">还没有制定计划捏!</label>
          <el-button type="primary" size="mini" plain @click="planDialog=true">立刻开始计划</el-button>
        </el-row>
      </el-card>
      <el-carousel v-else height="175px" :autoplay="false" arrow="never">
        <el-carousel-item v-for="(p,i) in planList" :key="i">
          <el-card v-if="p.type == '2'" shadow="hover" :body-style="{padding: '10px'}" style="border-radius: 8px; background:#9AC8E240; height: 150px; overflow: auto">
            <el-row>
              <el-col :span="8">
                <el-progress v-if="computePercentage(p.items) != 100" type="circle" :width="100" :percentage="computePercentage(p.items)" style="margin: 10px 0px;"></el-progress>
                <el-progress v-else type="circle" :width="100" :percentage="100" status="success" style="margin: 10px 0px;"></el-progress>
              </el-col>
              <el-col :span="16" class="plan_items">
                <p>{{p.title}}</p>
                <el-row v-for="(item, index) in p.items" :key="index" type="flex" justify="space-around">
                  <el-col :span="8">{{item.name}}</el-col>
                  <el-col :span="6">{{item.completed}}/{{item.target}}</el-col>
                  <el-col :span="10" > <el-input-number size="mini" v-model="item.completed" @change="handlePlanChange(p.items)" :min="0" :max="item.target">/10</el-input-number> </el-col>
                </el-row>
              </el-col>
            </el-row>
          </el-card>
        </el-carousel-item>
      </el-carousel>
      <el-card shadow="hover" style="border-radius: 8px; margin: 10px 0px 0px 0px; background:#9AC8E240;">
        <el-row type="flex" justify="center">
          <!-- 工作模式 -->
          <el-col>
            <el-button v-if="workmode" type="primary" icon="el-icon-close-notification" circle @click="workmode = false"></el-button>
            <el-button v-else icon="el-icon-close-notification" circle @click="workmode = true"></el-button>
          </el-col>
          <!-- 截屏 -->
          <el-col>
            <el-popover placement="top" transition="el-zoom-in-bottom">
              <el-button size="mini" @click="screenshot">截取屏幕</el-button>
              <el-button size="mini">截取全页</el-button>
              <el-button size="mini">录制屏幕</el-button>
              <el-button slot="reference" icon="el-icon-full-screen" circle></el-button>
            </el-popover>            
          </el-col>
          <!-- 存储标签页 -->
          <el-col>
            <el-popover placement="top" transition="el-zoom-in-bottom" @show="getSavedTabsGroupList">
              <el-divider><i class="el-icon-folder-add"></i>  存储</el-divider>
              <el-form :inline="true" :model="saveTabsGroupForm" size="mini" label-width="120px">
                <el-form-item label="标签组名">
                  <el-input v-model="saveTabsGroupForm.groupName" placeholder="需存储的标签组名"></el-input>
                </el-form-item>
                <el-form-item>
                  <el-button type="primary" @click="saveTabsGroup">保存</el-button>
                </el-form-item>
              </el-form>
              <el-divider><i class="el-icon-setting"></i>  加载或删除</el-divider>
              <el-form :model="reloadTabsGroupForm" size="mini" label-width="120px">
                <el-form-item label="标签组名">
                  <el-select v-model="reloadTabsGroupForm.groupName" placeholder="需要加载的标签组">
                    <el-option v-for="(value, key, index) in savedTabsGroupList" :key="index" :value="key"></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item>
                  <el-button type="primary"  @click="reloadTabsGroup">加载</el-button>
                  <el-button @click="deleteTabsGroup">删除</el-button>
                </el-form-item>
              </el-form>
              <el-button slot="reference" icon="el-icon-copy-document" circle></el-button>
            </el-popover>
          </el-col>
          <!-- roll外卖 -->
          <el-col>
            <el-button icon="el-icon-eleme" circle></el-button>
          </el-col>
          <!-- 下载b站视频 -->
          <el-col>
            <el-button icon="el-icon-download" circle @click="selectVideo=true"></el-button>
          </el-col>
        </el-row>
        <el-row type="flex" justify="center" style="margin: 10px 0px 0px 0px">
          <el-button icon="el-icon-alarm-clock" circle></el-button>
          <el-button icon="el-icon-date" circle></el-button>
          <el-button icon="el-icon-finished" circle @click="planDialog=true"></el-button>
          <el-button icon="el-icon-notebook-2" circle @click="showNotification('打卡成功')"></el-button>
          <el-button icon="el-icon-s-data" circle @click="reset"></el-button>
        </el-row>
      </el-card>

      <el-drawer
        title="选择分集"
        size="300px"
        :with-header=false
        :visible.sync="selectVideo"
        direction="ttb"
        :destroy-on-close=true
        @open="getVideoList">
        <el-divider content-position="left">选择分集</el-divider>
        <el-button v-for="(item, index) in videosData" :key="index" size="mini" style="margin: 5px;" @click="downloadBiliVideo(item.cid)">【{{index+1}}P】 {{item.part}}</el-button>
      </el-drawer>

      <el-dialog title="打卡计划管理" width="100%" :visible.sync="planDialog">
        <el-tabs v-model="planType">
          <el-tab-pane label="工作时长计划" name="0">

          </el-tab-pane>
          <el-tab-pane label="坚持打卡计划" name="1">

          </el-tab-pane>
          <el-tab-pane label="每日任务计划" name="2">
            <el-form :model="plan">
              <el-form-item label="计划名称" label-width="80px">
                <el-input v-model="plan.title" placeholder="计划名称" size="medium"></el-input>
              </el-form-item>
              <el-divider content-position="left">详细内容</el-divider>
              <el-row type="flex" justify="space-around">
                <el-col :span="12">
                  <h4>目标名称</h4>
                </el-col>
                <el-col :span="4">
                  <h4>目标数量</h4>
                </el-col>
                <el-col :span="4">
                </el-col>              
              </el-row>
              <el-form-item v-for="(item, index) in plan.items" :key="index" style="margin: 0px 0px 4px 0px;">
                <el-row type="flex" justify="space-around">
                  <el-col :span="12">
                    <el-input v-model="item.name" placeholder="目标名称" size="small"></el-input>
                  </el-col>
                  <el-col :span="4">
                    <el-input v-model.number="item.target" placeholder="目标数量" size="small"></el-input>
                  </el-col>
                  <el-col :span="4">
                    <el-button type="danger" plain size="small" @click="removePlanItem(index)">删除</el-button>
                  </el-col>              
                </el-row>
              </el-form-item>
              <el-row type="flex" justify="space-around">
                <el-col :span="12">
                  <el-button icon="el-icon-plus" size="small" circle @click="addPlanItem"></el-button>
                </el-col>
                <el-col :span="4">
                </el-col>
                <el-col :span="4">
                </el-col>              
              </el-row>
            </el-form>            
          </el-tab-pane>
        </el-tabs>

        <div slot="footer" class="dialog-footer">
          <el-button @click="planDialog=false">取 消</el-button>
          <el-button type="primary" @click="addPlan">确 定</el-button>
        </div>
      </el-dialog>
    </el-main>
  </el-container>
</template>

<script>
import axios from 'axios'
  export default {
    name: 'app',
    data() {
      return {
        isGif: false,
        pngurl: 'assets/start.png',
        gifurl: 'assets/start.gif',
        search_mode: '历史记录',
        search_input: '',

        workmode: false,

        screenshotPopover: false,

        savedTabsGroupList: {},
        saveTabsGroupForm: {groupName: ''},
        reloadTabsGroupForm: {groupName: ''},

        selectVideo: false,
        aid: '',
        videosData: [],
        cid: '',

        planDialog: false,
        planType: '0',
        plan: {title: '', type: '0', startTime: new Date(), items:[{name:'', target:1, completed:0}]},
        // item: {name: '', target: 1},
        planList: {},

      };
    },
    created () {
      this.getPlanList();
    },
    methods: {
      screenshot () {
        chrome.tabs.captureVisibleTab(null, {format: "png", quality: 100}, (img_url) => {
          chrome.downloads.download({url: img_url, saveAs: true}, (res) => {console.log(res)});
        });
      },
      getSavedTabsGroupList () {
        chrome.storage.local.get("savedTabsGroupList", (entry) => {
          this.savedTabsGroupList = (typeof(entry.savedTabsGroupList) == 'undefined') ? {} : entry.savedTabsGroupList;
        });
      },
      saveTabsGroup () {
        chrome.tabs.query({currentWindow: true}, (tabs) => {
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
      deleteTabsGroup () {
        console.log(this.savedTabsGroupList);
        chrome.storage.local.get("savedTabsGroupList", (entry) => {
          this.savedTabsGroupList = (typeof(entry.savedTabsGroupList) == 'undefined') ? {} : entry.savedTabsGroupList;
          delete entry.savedTabsGroupList[this.reloadTabsGroupForm.groupName];
          console.log(this.savedTabsGroupList)
          chrome.storage.local.set({"savedTabsGroupList":this.savedTabsGroupList});
        });
      },
      getVideoList () {
        chrome.tabs.query({currentWindow: true, active: true}, (tabs) => {
          var bv = tabs[0].url.match(/[\s\S]*(BV[a-z|A-Z|0-9]{10})[\s\S]*/)[1];
          var aidModel = "https://api.bilibili.com/x/web-interface/archive/stat?bvid=";
          var cidModel = "https://api.bilibili.com/x/player/pagelist?bvid=";
          let requests = [];
          let getAid = new Promise((resolve) => {
            axios({method: "GET", url: aidModel + bv}).then(res => resolve(res));
          });
          requests.push(getAid);
          let getCid = new Promise((resolve) => {
            axios({method: "GET", url: cidModel + bv}).then(res => resolve(res));
          });
          requests.push(getCid);
          Promise.all(requests).then((replist) => {
            this.aid = replist[0].data.data.aid;
            this.videosData = replist[1].data.data;
          });
        });
      },
      downloadBiliVideo (cid) {
        var req = "https://api.bilibili.com/x/player/playurl?avid="+ this.aid +"&cid="+ cid +"&qn=1&type=&otype=json&platform=html5&high_quality=1";
        axios({method: "GET", url: req}).then((res) => {
          var videoURL = res.data.data.durl[0].url;
          console.log(videoURL);
          chrome.downloads.download({url: videoURL, saveAs: true, method: "GET"}, (id) => {
            chrome.downloads.onChanged.addListener((delta) => {
              if (delta.id == id && delta.error != "undefined") {
                console.log(delta);
                chrome.downloads.resume(id);                
              }
            })
          });
        })
      },
      reset () {
        chrome.storage.local.clear(() => {console.log("clear")})
      },
      addPlanItem() {
        this.plan.items.push({name:'', target:1, completed:0});
      },
      removePlanItem(index) {
        this.plan.items.splice(index, 1);
      },
      addPlan() {
        this.plan.type = this.planType;
        this.plan.startTime = new Date();
        this.planList[this.plan.title] = this.plan;
        chrome.storage.local.set({"planList":this.planList});
        this.plan = {title: '', type: '0', startTime: new Date(), items:[{name:'', target:1, completed:0}]};
        this.planDialog=false;
        console.log(this.planList);
      },
      getPlanList() {
        chrome.storage.local.get("planList", (entry) => {
          this.planList = (typeof(entry.planList) == 'undefined') ? {} : entry.planList;
        });
      },
      computePercentage(items) {
        var num = 0;
        items.forEach((item) => {num += item.completed / item.target})
        return Math.round(100 * num / items.length);
      },
      handlePlanChange(items) {
        if (this.computePercentage(items) == 100) {
          this.showNotification("好好好！");
        }
        chrome.storage.local.set({"planList":this.planList});
      },
      showNotification(ntf) {
        var msg = '<span><img src="assets/xxy.png" alt="xxy" width="25%" style="vertical-align:middle"><h2 color="#576690" style="display: inline; vertical-align:middle">&emsp;'+ntf+'</h2></span>';
        this.$notify({
          dangerouslyUseHTMLString: true,
          message: msg,
          duration: 1000
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
  /* text-align: center; */
  color: #2c3e50;
  margin-top: 0px;
}

.plan_items p{
  color: #444;
  font-size: 22px;
  margin: 0px 0px 5px 0px;
}
.plan_items .el-row{
  margin: 0px 0px 5px 0px;
  color: #666;
  font-size: 16px;
}
.plan_items .el-row .el-input-number{
  max-width: 100%;
}
</style>
