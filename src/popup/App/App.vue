<template>
  <el-container style="width:450px; height: 360px; border-radius: 8px; background:#9AC8E280;">
    <el-header style="height: 120px; margin: 20px 0px 00px 0px" >
      <el-row :gutter="20" type="flex" align="bottom">
        <el-col :span="8">
          <div @mouseenter="isGif = true"
          @mouseleave="isGif = false"
          @click="openOption">
          <el-avatar v-if = "isGif" :src="gifurl"
          style="width: 120px; height: 120px; background:#9AC8E200;"
          fit="fill"></el-avatar>
          <el-avatar v-else :src="pngurl"
          style="width: 120px; height: 120px; background:#9AC8E200;"
          fit="fill"></el-avatar>
          </div>
        </el-col>
        <el-col :span="16">
        <el-row justify="center" :gutter="45">
          <!-- 工作模式 -->
            <el-button v-if="workmode" size="large" type="primary" :icon="icons.MuteNotification" circle @click="changeWorkMode(false)"></el-button>
            <el-button v-else size="large" :icon="icons.MuteNotification" circle @click="changeWorkMode(true)"></el-button>
          <!-- 截屏 -->
            <el-button size="large" :icon="icons.FullScreen" circle @click="screenshot"></el-button>
          <!-- 存储标签页 -->
          <el-button size="large" :icon="icons.CopyDocument" circle @click="tabDialog=true"></el-button>
          <!-- 下载b站视频 -->
            <el-button size="large" :icon="icons.Download" circle @click="selectVideo=true"></el-button>
          <!-- 计划 -->
            <el-button size="large" :icon="icons.Finished" circle @click="planDialog=true"></el-button>
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
          <el-button type="primary" size="small" plain @click="planDialog=true">立刻开始计划</el-button>
        </el-row>
      </el-card>
      <el-carousel v-else height="175px" arrow="never">
        <el-carousel-item v-for="(p,i) in planList" :key="i">
          <el-card v-if="p.type == '0'" shadow="hover" :body-style="{padding: '10px'}" style="border-radius: 8px; background:#9AC8E240; height: 150px; overflow: auto">
            <el-row justify="space-around">
              <el-col :span="8" class="plan_days">
                <el-card style="border-radius: 8px; background:#9AC8E220; height: 120px;" shadow="hover"> 
                  <el-row>
                    <p>Day</p>
                  </el-row>
                  <el-row>
                    <p>{{p.days}}</p>
                  </el-row>                 
                </el-card>
              </el-col>
              <el-col :span="12" class="plan_items">
                <p>{{p.title}}</p>
                <p style="font-size:16px;">已坚持：{{p.days}}</p>
                <p style="font-size:16px;">最长坚持：{{p.maxDays}}</p>
                <el-button @click="checkPlan(p)">打卡</el-button>
              </el-col>
            </el-row>
          </el-card>
          <el-card v-if="p.type == '1'" shadow="hover" :body-style="{padding: '10px'}" style="border-radius: 8px; background:#9AC8E240; height: 150px; overflow: auto">
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
                  <el-col :span="10" > <el-input-number size="small" v-model="item.completed" @change="handlePlanChange(p.items)" :min="0" :max="item.target">/10</el-input-number> </el-col>
                </el-row>
              </el-col>
            </el-row>
          </el-card>
        </el-carousel-item>
      </el-carousel>

      <el-drawer title="选择分集" size="300px" v-model="selectVideo"
        :with-header=false
        direction="ttb"
        :destroy-on-close=true
        @open="getVideoList">
        <el-button v-if="videosData.length != 0" type="primary" plain size="small" style="margin: 5px;" @click="downloadBiliPic">下载封面</el-button>
        <el-divider v-if="videosData.length != 0" content-position="left">选择分集</el-divider>
        <el-divider v-else content-position="left">请在b站视频界面使用</el-divider>
        <el-button v-for="(item, index) in videosData" :key="index" size="small" style="margin: 5px;" @click="downloadBiliVideo(item.cid)">【{{index+1}}P】 {{item.part}}</el-button>
      </el-drawer>

      <el-dialog title="打卡计划管理" width="100%" v-model="planDialog">
        <el-tabs v-model="planType">
          <el-tab-pane label="坚持打卡计划" name="0">
            <el-form :model="plan">
              <el-form-item label="计划名称" label-width="80px">
                <el-input v-model="plan.title" placeholder="计划名称"></el-input>
              </el-form-item>
            </el-form>  
          </el-tab-pane>
          <el-tab-pane label="每日任务计划" name="1">
            <el-form :model="plan">
              <el-form-item label="计划名称" label-width="80px">
                <el-input v-model="plan.title" placeholder="计划名称"></el-input>
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
                  <el-button :icon="icons.Plus" size="small" circle @click="addPlanItem"></el-button>
                </el-col>
                <el-col :span="4">
                </el-col>
                <el-col :span="4">
                </el-col>              
              </el-row>
            </el-form>            
          </el-tab-pane>
          <el-tab-pane label="计划管理" name="2">
            <el-table :data="Object.values(planList)">
              <el-table-column prop="title" label="计划名称" width="100" />
              <el-table-column align="right">
                <template #default="scope">
                  <el-button type="danger" @click="deletePlan(scope.row.title)">删除</el-button>
                </template>
              </el-table-column>
            </el-table>
          </el-tab-pane>
        </el-tabs>
        <template #footer>
          <el-button @click="planDialog=false">取 消</el-button>
          <el-button type="primary" @click="addPlan">确 定</el-button>          
        </template>
      </el-dialog>

      <el-dialog title="标签组管理" width="100%" v-model="tabDialog" @open="getSavedTabsGroupList">
        <el-divider><el-icon :size="20"><document-add /></el-icon></el-divider>
        <el-form :inline="true" :model="saveTabsGroupForm" size="small" label-width="100px">
          <el-form-item label="标签组名">
            <el-input v-model="saveTabsGroupForm.groupName" placeholder="需存储的标签组名"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="saveTabsGroup">保存</el-button>
          </el-form-item>
        </el-form>
        <el-divider><el-icon :size="20"><setting /></el-icon></el-divider>
        <el-form :model="reloadTabsGroupForm" size="small" label-width="120px">
          <el-form-item label="标签组名">
            <el-select v-model="reloadTabsGroupForm.groupName" placeholder="加载或删除的标签组">
              <el-option v-for="(value, key, index) in savedTabsGroupList" :key="index" :value="key"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary"  @click="reloadTabsGroup">加载</el-button>
            <el-button @click="deleteTabsGroup">删除</el-button>
          </el-form-item>
        </el-form>
      </el-dialog>

    </el-main>
  </el-container>
</template>

<script>
import axios from 'axios'
import * as icon from '@element-plus/icons-vue'
  export default {
    name: 'app',
    data() {
      return {
        icons: icon,
        isGif: false,
        pngurl: 'assets/start.png',
        gifurl: 'assets/start.gif',

        workmode: false,

        tabDialog: false,
        savedTabsGroupList: {},
        saveTabsGroupForm: {groupName: ''},
        reloadTabsGroupForm: {groupName: ''},

        selectVideo: false,
        bid: '',
        aid: '',
        videosData: [],
        cid: '',

        planDialog: false,
        planType: '0',
        plan: {title: '', type: '0', startTime: '0', lastCheckTime: '0', days: 0, maxDays: 0, items:[{name:'', target:1, completed:0}]},
        planList: {},

      };
    },
    created () {
      this.getPlanList();
      chrome.storage.local.get("workmode", (workmode) => {this.workmode = (typeof(workmode.workmode) == 'undefined') ? false : workmode.workmode})
    },
    methods: {
      openOption () {
        chrome.tabs.create({url:'options.html'})
      },
      changeWorkMode (mod) {
        this.workmode = mod;
        chrome.storage.local.set({"workmode": mod});
      },
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
          this.saveTabsGroupForm.groupName = ''
          this.showNotification("保存成功")
        });
      },
      reloadTabsGroup () {
        chrome.storage.local.get("savedTabsGroupList", (entry) => {
          var group = Object.values(entry.savedTabsGroupList[this.reloadTabsGroupForm.groupName])
          group.forEach(URL => {chrome.tabs.create({url:URL})});
        });
      },
      deleteTabsGroup () {
        delete this.savedTabsGroupList[this.reloadTabsGroupForm.groupName];
        chrome.storage.local.set({"savedTabsGroupList":this.savedTabsGroupList});
        this.showNotification('删除成功');
        this.reloadTabsGroupForm.groupName = '';
      },
      getVideoList () {
        chrome.tabs.query({currentWindow: true, active: true}, (tabs) => {
          var bv = tabs[0].url.match(/[\s\S]*(BV[a-z|A-Z|0-9]{10})[\s\S]*/)[1];
          this.bid = bv;
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
      downloadBiliPic () {
        var req = "https://api.bilibili.com/x/web-interface/view?jsonp=jsonp&bvid=" + this.bid;
        axios({method: "GET", url: req}).then((res) => {
          var picURL = res.data.data.pic;
          chrome.downloads.download({url: picURL, saveAs: true, method: "GET"});
        })
      },
      downloadBiliVideo (cid) {
        var req = "https://api.bilibili.com/x/player/playurl?avid="+ this.aid +"&cid="+ cid +"&qn=1&type=&otype=json&platform=html5&high_quality=1";
        axios({method: "GET", url: req}).then((res) => {
          var videoURL = res.data.data.durl[0].url;
          chrome.downloads.download({url: videoURL, saveAs: true, method: "GET"}, (id) => {
            chrome.downloads.onChanged.addListener((delta) => {
              if (delta.id == id && delta.error != "undefined") {
                chrome.downloads.resume(id);                
              }
            })
          });
        })
      },
      addPlanItem() {
        this.plan.items.push({name:'', target:1, completed:0});
      },
      removePlanItem(index) {
        this.plan.items.splice(index, 1);
      },
      addPlan() {
        if(this.plan.title=='')
          return
        this.plan.type = this.planType;
        this.plan.startTime = '0';
        this.planList[this.plan.title] = this.plan;
        chrome.storage.local.set({"planList":this.planList});
        this.plan = {title: '', type: '0', startTime: '0', lastCheckTime: '0', days: 0, maxDays: 0, items:[{name:'', target:1, completed:0}]};
        this.planDialog=false;
      },
      getPlanList() {
        chrome.storage.local.get("planList", (entry) => {
          this.planList = (typeof(entry.planList) == 'undefined') ? {} : entry.planList;
          this.checkPlanList();
        });
      },
      computePercentage(items) {
        var num = 0;
        items = Object.values(items)
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
      },
      checkPlan(plan) {
        var date = new Date();
        var dateStr = date.getFullYear()+ '-' + (date.getMonth() + 1) + '-' + date.getDate();
        if (plan.startTime == '0') {
          plan.startTime = dateStr;
        }
        plan.lastCheckTime = dateStr;
        plan.days = 1 + (Date.parse(plan.lastCheckTime) - Date.parse(plan.startTime)) / (24 * 3600 * 1000);
        if (plan.maxDays < plan.days) {
          plan.maxDays = plan.days;
        }
        chrome.storage.local.set({"planList":this.planList});
      },
      deletePlan(plan) {
        delete this.planList[plan];
        chrome.storage.local.set({"planList":this.planList});
      },
      checkPlanList() {
        Object.values(this.planList).forEach((plan) => {
          var date = new Date();
          var dateStr = date.getFullYear()+ '-' + (date.getMonth() + 1) + '-' + date.getDate();
          if (Date.parse(dateStr) - Date.parse(plan.lastCheckTime) > (24 * 3600 * 1000)) {
            plan.startTime = '0';
            plan.lastCheckTime = '0';
            plan.days = 0;
          }
        })
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
.plan_days p{
  color: #576690;
  font-size: 28px;
  margin: 0px 0px 10px 0px;
}
.plan_days .el-card{
  padding: 0%;
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
