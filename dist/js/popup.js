/******/ (function() { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-40.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./src/popup/App/App.vue?vue&type=script&lang=js":
/*!************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-40.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./src/popup/App/App.vue?vue&type=script&lang=js ***!
  \************************************************************************************************************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! axios */ "./node_modules/axios/index.js");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _element_plus_icons_vue__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @element-plus/icons-vue */ "./node_modules/@element-plus/icons-vue/dist/es/index.mjs");


/* harmony default export */ __webpack_exports__["default"] = ({
  name: 'app',

  data() {
    return {
      icons: _element_plus_icons_vue__WEBPACK_IMPORTED_MODULE_1__,
      isGif: false,
      pngurl: 'assets/start.png',
      gifurl: 'assets/start.gif',
      workmode: false,
      tabDialog: false,
      savedTabsGroupList: {},
      saveTabsGroupForm: {
        groupName: ''
      },
      reloadTabsGroupForm: {
        groupName: ''
      },
      selectVideo: false,
      bid: '',
      aid: '',
      videosData: [],
      cid: '',
      planDialog: false,
      planType: '0',
      plan: {
        title: '',
        type: '0',
        startTime: '0',
        lastCheckTime: '0',
        days: 0,
        maxDays: 0,
        items: [{
          name: '',
          target: 1,
          completed: 0
        }]
      },
      planList: {}
    };
  },

  created() {
    this.getPlanList();
    chrome.storage.local.get("workmode", workmode => {
      this.workmode = typeof workmode.workmode == 'undefined' ? false : workmode.workmode;
    });
  },

  methods: {
    openOption() {
      chrome.tabs.create({
        url: 'options.html'
      });
    },

    changeWorkMode(mod) {
      this.workmode = mod;
      chrome.storage.local.set({
        "workmode": mod
      });
    },

    screenshot() {
      chrome.tabs.captureVisibleTab(null, {
        format: "png",
        quality: 100
      }, img_url => {
        chrome.downloads.download({
          url: img_url,
          saveAs: true
        }, res => {
          console.log(res);
        });
      });
    },

    getSavedTabsGroupList() {
      chrome.storage.local.get("savedTabsGroupList", entry => {
        this.savedTabsGroupList = typeof entry.savedTabsGroupList == 'undefined' ? {} : entry.savedTabsGroupList;
      });
    },

    saveTabsGroup() {
      chrome.tabs.query({
        currentWindow: true
      }, tabs => {
        var urls = tabs.map(tab => {
          return tab.url;
        });
        this.savedTabsGroupList[this.saveTabsGroupForm.groupName] = urls;
        chrome.storage.local.set({
          "savedTabsGroupList": this.savedTabsGroupList
        });
        this.saveTabsGroupForm.groupName = '';
        this.showNotification("保存成功");
      });
    },

    reloadTabsGroup() {
      chrome.storage.local.get("savedTabsGroupList", entry => {
        var group = Object.values(entry.savedTabsGroupList[this.reloadTabsGroupForm.groupName]);
        group.forEach(URL => {
          chrome.tabs.create({
            url: URL
          });
        });
      });
    },

    deleteTabsGroup() {
      delete this.savedTabsGroupList[this.reloadTabsGroupForm.groupName];
      chrome.storage.local.set({
        "savedTabsGroupList": this.savedTabsGroupList
      });
      this.showNotification('删除成功');
      this.reloadTabsGroupForm.groupName = '';
    },

    getVideoList() {
      chrome.tabs.query({
        currentWindow: true,
        active: true
      }, tabs => {
        var bv = tabs[0].url.match(/[\s\S]*(BV[a-z|A-Z|0-9]{10})[\s\S]*/)[1];
        this.bid = bv;
        var aidModel = "https://api.bilibili.com/x/web-interface/archive/stat?bvid=";
        var cidModel = "https://api.bilibili.com/x/player/pagelist?bvid=";
        let requests = [];
        let getAid = new Promise(resolve => {
          axios__WEBPACK_IMPORTED_MODULE_0___default()({
            method: "GET",
            url: aidModel + bv
          }).then(res => resolve(res));
        });
        requests.push(getAid);
        let getCid = new Promise(resolve => {
          axios__WEBPACK_IMPORTED_MODULE_0___default()({
            method: "GET",
            url: cidModel + bv
          }).then(res => resolve(res));
        });
        requests.push(getCid);
        Promise.all(requests).then(replist => {
          this.aid = replist[0].data.data.aid;
          this.videosData = replist[1].data.data;
        });
      });
    },

    downloadBiliPic() {
      var req = "https://api.bilibili.com/x/web-interface/view?jsonp=jsonp&bvid=" + this.bid;
      axios__WEBPACK_IMPORTED_MODULE_0___default()({
        method: "GET",
        url: req
      }).then(res => {
        var picURL = res.data.data.pic;
        chrome.downloads.download({
          url: picURL,
          saveAs: true,
          method: "GET"
        });
      });
    },

    downloadBiliVideo(cid) {
      var req = "https://api.bilibili.com/x/player/playurl?avid=" + this.aid + "&cid=" + cid + "&qn=1&type=&otype=json&platform=html5&high_quality=1";
      axios__WEBPACK_IMPORTED_MODULE_0___default()({
        method: "GET",
        url: req
      }).then(res => {
        var videoURL = res.data.data.durl[0].url;
        chrome.downloads.download({
          url: videoURL,
          saveAs: true,
          method: "GET"
        }, id => {
          chrome.downloads.onChanged.addListener(delta => {
            if (delta.id == id && delta.error != "undefined") {
              chrome.downloads.resume(id);
            }
          });
        });
      });
    },

    addPlanItem() {
      this.plan.items.push({
        name: '',
        target: 1,
        completed: 0
      });
    },

    removePlanItem(index) {
      this.plan.items.splice(index, 1);
    },

    addPlan() {
      if (this.plan.title == '') return;
      this.plan.type = this.planType;
      this.plan.startTime = '0';
      this.planList[this.plan.title] = this.plan;
      chrome.storage.local.set({
        "planList": this.planList
      });
      this.plan = {
        title: '',
        type: '0',
        startTime: '0',
        lastCheckTime: '0',
        days: 0,
        maxDays: 0,
        items: [{
          name: '',
          target: 1,
          completed: 0
        }]
      };
      this.planDialog = false;
    },

    getPlanList() {
      chrome.storage.local.get("planList", entry => {
        this.planList = typeof entry.planList == 'undefined' ? {} : entry.planList;
        this.checkPlanList();
      });
    },

    computePercentage(items) {
      var num = 0;
      items = Object.values(items);
      items.forEach(item => {
        num += item.completed / item.target;
      });
      return Math.round(100 * num / items.length);
    },

    handlePlanChange(items) {
      if (this.computePercentage(items) == 100) {
        this.showNotification("好好好！");
      }

      chrome.storage.local.set({
        "planList": this.planList
      });
    },

    showNotification(ntf) {
      var msg = '<span><img src="assets/xxy.png" alt="xxy" width="25%" style="vertical-align:middle"><h2 color="#576690" style="display: inline; vertical-align:middle">&emsp;' + ntf + '</h2></span>';
      this.$notify({
        dangerouslyUseHTMLString: true,
        message: msg,
        duration: 1000
      });
    },

    checkPlan(plan) {
      var date = new Date();
      var dateStr = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();

      if (plan.startTime == '0') {
        plan.startTime = dateStr;
      }

      plan.lastCheckTime = dateStr;
      plan.days = 1 + (Date.parse(plan.lastCheckTime) - Date.parse(plan.startTime)) / (24 * 3600 * 1000);

      if (plan.maxDays < plan.days) {
        plan.maxDays = plan.days;
      }

      chrome.storage.local.set({
        "planList": this.planList
      });
    },

    deletePlan(plan) {
      delete this.planList[plan];
      chrome.storage.local.set({
        "planList": this.planList
      });
    },

    checkPlanList() {
      Object.values(this.planList).forEach(plan => {
        var date = new Date();
        var dateStr = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();

        if (Date.parse(dateStr) - Date.parse(plan.lastCheckTime) > 24 * 3600 * 1000) {
          plan.startTime = '0';
          plan.lastCheckTime = '0';
          plan.days = 0;
        }
      });
    }

  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-40.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[3]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./src/popup/App/App.vue?vue&type=template&id=a0e140f2":
/*!****************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-40.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[3]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./src/popup/App/App.vue?vue&type=template&id=a0e140f2 ***!
  \****************************************************************************************************************************************************************************************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": function() { return /* binding */ render; }
/* harmony export */ });
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ "./node_modules/vue/dist/vue.runtime.esm-bundler.js");


const _hoisted_1 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("label", {
  style: {
    "font-size": "16px",
    "color": "#f2f8fb"
  }
}, "还没有制定计划捏!", -1
/* HOISTED */
);

const _hoisted_2 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)("立刻开始计划");

const _hoisted_3 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", null, "Day", -1
/* HOISTED */
);

const _hoisted_4 = {
  style: {
    "font-size": "16px"
  }
};
const _hoisted_5 = {
  style: {
    "font-size": "16px"
  }
};

const _hoisted_6 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)("打卡");

const _hoisted_7 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)("/10");

const _hoisted_8 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)("下载封面");

const _hoisted_9 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)("选择分集");

const _hoisted_10 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)("请在b站视频界面使用");

const _hoisted_11 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)("详细内容");

const _hoisted_12 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h4", null, "目标名称", -1
/* HOISTED */
);

const _hoisted_13 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h4", null, "目标数量", -1
/* HOISTED */
);

const _hoisted_14 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)("删除");

const _hoisted_15 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)("删除");

const _hoisted_16 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)("取 消");

const _hoisted_17 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)("确 定");

const _hoisted_18 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)("保存");

const _hoisted_19 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)("加载");

const _hoisted_20 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)("删除");

function render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_el_avatar = (0,vue__WEBPACK_IMPORTED_MODULE_0__.resolveComponent)("el-avatar");

  const _component_el_col = (0,vue__WEBPACK_IMPORTED_MODULE_0__.resolveComponent)("el-col");

  const _component_el_button = (0,vue__WEBPACK_IMPORTED_MODULE_0__.resolveComponent)("el-button");

  const _component_el_row = (0,vue__WEBPACK_IMPORTED_MODULE_0__.resolveComponent)("el-row");

  const _component_el_header = (0,vue__WEBPACK_IMPORTED_MODULE_0__.resolveComponent)("el-header");

  const _component_el_image = (0,vue__WEBPACK_IMPORTED_MODULE_0__.resolveComponent)("el-image");

  const _component_el_card = (0,vue__WEBPACK_IMPORTED_MODULE_0__.resolveComponent)("el-card");

  const _component_el_progress = (0,vue__WEBPACK_IMPORTED_MODULE_0__.resolveComponent)("el-progress");

  const _component_el_input_number = (0,vue__WEBPACK_IMPORTED_MODULE_0__.resolveComponent)("el-input-number");

  const _component_el_carousel_item = (0,vue__WEBPACK_IMPORTED_MODULE_0__.resolveComponent)("el-carousel-item");

  const _component_el_carousel = (0,vue__WEBPACK_IMPORTED_MODULE_0__.resolveComponent)("el-carousel");

  const _component_el_divider = (0,vue__WEBPACK_IMPORTED_MODULE_0__.resolveComponent)("el-divider");

  const _component_el_drawer = (0,vue__WEBPACK_IMPORTED_MODULE_0__.resolveComponent)("el-drawer");

  const _component_el_input = (0,vue__WEBPACK_IMPORTED_MODULE_0__.resolveComponent)("el-input");

  const _component_el_form_item = (0,vue__WEBPACK_IMPORTED_MODULE_0__.resolveComponent)("el-form-item");

  const _component_el_form = (0,vue__WEBPACK_IMPORTED_MODULE_0__.resolveComponent)("el-form");

  const _component_el_tab_pane = (0,vue__WEBPACK_IMPORTED_MODULE_0__.resolveComponent)("el-tab-pane");

  const _component_el_table_column = (0,vue__WEBPACK_IMPORTED_MODULE_0__.resolveComponent)("el-table-column");

  const _component_el_table = (0,vue__WEBPACK_IMPORTED_MODULE_0__.resolveComponent)("el-table");

  const _component_el_tabs = (0,vue__WEBPACK_IMPORTED_MODULE_0__.resolveComponent)("el-tabs");

  const _component_el_dialog = (0,vue__WEBPACK_IMPORTED_MODULE_0__.resolveComponent)("el-dialog");

  const _component_document_add = (0,vue__WEBPACK_IMPORTED_MODULE_0__.resolveComponent)("document-add");

  const _component_el_icon = (0,vue__WEBPACK_IMPORTED_MODULE_0__.resolveComponent)("el-icon");

  const _component_setting = (0,vue__WEBPACK_IMPORTED_MODULE_0__.resolveComponent)("setting");

  const _component_el_option = (0,vue__WEBPACK_IMPORTED_MODULE_0__.resolveComponent)("el-option");

  const _component_el_select = (0,vue__WEBPACK_IMPORTED_MODULE_0__.resolveComponent)("el-select");

  const _component_el_main = (0,vue__WEBPACK_IMPORTED_MODULE_0__.resolveComponent)("el-main");

  const _component_el_container = (0,vue__WEBPACK_IMPORTED_MODULE_0__.resolveComponent)("el-container");

  return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createBlock)(_component_el_container, {
    style: {
      "width": "450px",
      "height": "360px",
      "border-radius": "8px",
      "background": "#9AC8E280"
    }
  }, {
    default: (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(() => [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_el_header, {
      style: {
        "height": "120px",
        "margin": "20px 0px 00px 0px"
      }
    }, {
      default: (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(() => [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_el_row, {
        gutter: 20,
        type: "flex",
        align: "bottom"
      }, {
        default: (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(() => [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_el_col, {
          span: 8
        }, {
          default: (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(() => [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
            onMouseenter: _cache[0] || (_cache[0] = $event => $data.isGif = true),
            onMouseleave: _cache[1] || (_cache[1] = $event => $data.isGif = false),
            onClick: _cache[2] || (_cache[2] = (...args) => $options.openOption && $options.openOption(...args))
          }, [$data.isGif ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createBlock)(_component_el_avatar, {
            key: 0,
            src: $data.gifurl,
            style: {
              "width": "120px",
              "height": "120px",
              "background": "#9AC8E200"
            },
            fit: "fill"
          }, null, 8
          /* PROPS */
          , ["src"])) : ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createBlock)(_component_el_avatar, {
            key: 1,
            src: $data.pngurl,
            style: {
              "width": "120px",
              "height": "120px",
              "background": "#9AC8E200"
            },
            fit: "fill"
          }, null, 8
          /* PROPS */
          , ["src"]))], 32
          /* HYDRATE_EVENTS */
          )]),
          _: 1
          /* STABLE */

        }), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_el_col, {
          span: 16
        }, {
          default: (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(() => [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_el_row, {
            justify: "center",
            gutter: 45
          }, {
            default: (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(() => [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" 工作模式 "), $data.workmode ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createBlock)(_component_el_button, {
              key: 0,
              size: "large",
              type: "primary",
              icon: $data.icons.MuteNotification,
              circle: "",
              onClick: _cache[3] || (_cache[3] = $event => $options.changeWorkMode(false))
            }, null, 8
            /* PROPS */
            , ["icon"])) : ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createBlock)(_component_el_button, {
              key: 1,
              size: "large",
              icon: $data.icons.MuteNotification,
              circle: "",
              onClick: _cache[4] || (_cache[4] = $event => $options.changeWorkMode(true))
            }, null, 8
            /* PROPS */
            , ["icon"])), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" 截屏 "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_el_button, {
              size: "large",
              icon: $data.icons.FullScreen,
              circle: "",
              onClick: $options.screenshot
            }, null, 8
            /* PROPS */
            , ["icon", "onClick"]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" 存储标签页 "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_el_button, {
              size: "large",
              icon: $data.icons.CopyDocument,
              circle: "",
              onClick: _cache[5] || (_cache[5] = $event => $data.tabDialog = true)
            }, null, 8
            /* PROPS */
            , ["icon"]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" 下载b站视频 "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_el_button, {
              size: "large",
              icon: $data.icons.Download,
              circle: "",
              onClick: _cache[6] || (_cache[6] = $event => $data.selectVideo = true)
            }, null, 8
            /* PROPS */
            , ["icon"]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" 计划 "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_el_button, {
              size: "large",
              icon: $data.icons.Finished,
              circle: "",
              onClick: _cache[7] || (_cache[7] = $event => $data.planDialog = true)
            }, null, 8
            /* PROPS */
            , ["icon"])]),
            _: 1
            /* STABLE */

          })]),
          _: 1
          /* STABLE */

        })]),
        _: 1
        /* STABLE */

      })]),
      _: 1
      /* STABLE */

    }), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_el_main, null, {
      default: (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(() => [JSON.stringify($data.planList) == '{}' ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createBlock)(_component_el_card, {
        key: 0,
        style: {
          "border-radius": "8px",
          "background": "#9AC8E240",
          "height": "175px"
        }
      }, {
        default: (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(() => [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_el_row, {
          type: "flex",
          justify: "space-around"
        }, {
          default: (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(() => [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_el_image, {
            style: {
              "width": "100px",
              "height": "100px"
            },
            src: "assets/zmhsn.gif"
          })]),
          _: 1
          /* STABLE */

        }), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_el_row, {
          type: "flex",
          justify: "space-around",
          style: {
            "margin": "15px 0px 0px 0px"
          }
        }, {
          default: (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(() => [_hoisted_1, (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_el_button, {
            type: "primary",
            size: "small",
            plain: "",
            onClick: _cache[8] || (_cache[8] = $event => $data.planDialog = true)
          }, {
            default: (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(() => [_hoisted_2]),
            _: 1
            /* STABLE */

          })]),
          _: 1
          /* STABLE */

        })]),
        _: 1
        /* STABLE */

      })) : ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createBlock)(_component_el_carousel, {
        key: 1,
        height: "175px",
        arrow: "never"
      }, {
        default: (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(() => [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)($data.planList, (p, i) => {
          return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createBlock)(_component_el_carousel_item, {
            key: i
          }, {
            default: (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(() => [p.type == '0' ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createBlock)(_component_el_card, {
              key: 0,
              shadow: "hover",
              "body-style": {
                padding: '10px'
              },
              style: {
                "border-radius": "8px",
                "background": "#9AC8E240",
                "height": "150px",
                "overflow": "auto"
              }
            }, {
              default: (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(() => [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_el_row, {
                justify: "space-around"
              }, {
                default: (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(() => [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_el_col, {
                  span: 8,
                  class: "plan_days"
                }, {
                  default: (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(() => [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_el_card, {
                    style: {
                      "border-radius": "8px",
                      "background": "#9AC8E220",
                      "height": "120px"
                    },
                    shadow: "hover"
                  }, {
                    default: (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(() => [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_el_row, null, {
                      default: (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(() => [_hoisted_3]),
                      _: 1
                      /* STABLE */

                    }), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_el_row, null, {
                      default: (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(() => [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(p.days), 1
                      /* TEXT */
                      )]),
                      _: 2
                      /* DYNAMIC */

                    }, 1024
                    /* DYNAMIC_SLOTS */
                    )]),
                    _: 2
                    /* DYNAMIC */

                  }, 1024
                  /* DYNAMIC_SLOTS */
                  )]),
                  _: 2
                  /* DYNAMIC */

                }, 1024
                /* DYNAMIC_SLOTS */
                ), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_el_col, {
                  span: 12,
                  class: "plan_items"
                }, {
                  default: (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(() => [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(p.title), 1
                  /* TEXT */
                  ), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", _hoisted_4, "已坚持：" + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(p.days), 1
                  /* TEXT */
                  ), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", _hoisted_5, "最长坚持：" + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(p.maxDays), 1
                  /* TEXT */
                  ), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_el_button, {
                    onClick: $event => $options.checkPlan(p)
                  }, {
                    default: (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(() => [_hoisted_6]),
                    _: 2
                    /* DYNAMIC */

                  }, 1032
                  /* PROPS, DYNAMIC_SLOTS */
                  , ["onClick"])]),
                  _: 2
                  /* DYNAMIC */

                }, 1024
                /* DYNAMIC_SLOTS */
                )]),
                _: 2
                /* DYNAMIC */

              }, 1024
              /* DYNAMIC_SLOTS */
              )]),
              _: 2
              /* DYNAMIC */

            }, 1024
            /* DYNAMIC_SLOTS */
            )) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), p.type == '1' ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createBlock)(_component_el_card, {
              key: 1,
              shadow: "hover",
              "body-style": {
                padding: '10px'
              },
              style: {
                "border-radius": "8px",
                "background": "#9AC8E240",
                "height": "150px",
                "overflow": "auto"
              }
            }, {
              default: (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(() => [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_el_row, null, {
                default: (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(() => [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_el_col, {
                  span: 8
                }, {
                  default: (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(() => [$options.computePercentage(p.items) != 100 ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createBlock)(_component_el_progress, {
                    key: 0,
                    type: "circle",
                    width: 100,
                    percentage: $options.computePercentage(p.items),
                    style: {
                      "margin": "10px 0px"
                    }
                  }, null, 8
                  /* PROPS */
                  , ["percentage"])) : ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createBlock)(_component_el_progress, {
                    key: 1,
                    type: "circle",
                    width: 100,
                    percentage: 100,
                    status: "success",
                    style: {
                      "margin": "10px 0px"
                    }
                  }))]),
                  _: 2
                  /* DYNAMIC */

                }, 1024
                /* DYNAMIC_SLOTS */
                ), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_el_col, {
                  span: 16,
                  class: "plan_items"
                }, {
                  default: (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(() => [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(p.title), 1
                  /* TEXT */
                  ), ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)(p.items, (item, index) => {
                    return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createBlock)(_component_el_row, {
                      key: index,
                      type: "flex",
                      justify: "space-around"
                    }, {
                      default: (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(() => [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_el_col, {
                        span: 8
                      }, {
                        default: (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(() => [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)((0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(item.name), 1
                        /* TEXT */
                        )]),
                        _: 2
                        /* DYNAMIC */

                      }, 1024
                      /* DYNAMIC_SLOTS */
                      ), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_el_col, {
                        span: 6
                      }, {
                        default: (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(() => [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)((0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(item.completed) + "/" + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(item.target), 1
                        /* TEXT */
                        )]),
                        _: 2
                        /* DYNAMIC */

                      }, 1024
                      /* DYNAMIC_SLOTS */
                      ), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_el_col, {
                        span: 10
                      }, {
                        default: (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(() => [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_el_input_number, {
                          size: "small",
                          modelValue: item.completed,
                          "onUpdate:modelValue": $event => item.completed = $event,
                          onChange: $event => $options.handlePlanChange(p.items),
                          min: 0,
                          max: item.target
                        }, {
                          default: (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(() => [_hoisted_7]),
                          _: 2
                          /* DYNAMIC */

                        }, 1032
                        /* PROPS, DYNAMIC_SLOTS */
                        , ["modelValue", "onUpdate:modelValue", "onChange", "max"])]),
                        _: 2
                        /* DYNAMIC */

                      }, 1024
                      /* DYNAMIC_SLOTS */
                      )]),
                      _: 2
                      /* DYNAMIC */

                    }, 1024
                    /* DYNAMIC_SLOTS */
                    );
                  }), 128
                  /* KEYED_FRAGMENT */
                  ))]),
                  _: 2
                  /* DYNAMIC */

                }, 1024
                /* DYNAMIC_SLOTS */
                )]),
                _: 2
                /* DYNAMIC */

              }, 1024
              /* DYNAMIC_SLOTS */
              )]),
              _: 2
              /* DYNAMIC */

            }, 1024
            /* DYNAMIC_SLOTS */
            )) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)]),
            _: 2
            /* DYNAMIC */

          }, 1024
          /* DYNAMIC_SLOTS */
          );
        }), 128
        /* KEYED_FRAGMENT */
        ))]),
        _: 1
        /* STABLE */

      })), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_el_drawer, {
        title: "选择分集",
        size: "300px",
        modelValue: $data.selectVideo,
        "onUpdate:modelValue": _cache[9] || (_cache[9] = $event => $data.selectVideo = $event),
        "with-header": false,
        direction: "ttb",
        "destroy-on-close": true,
        onOpen: $options.getVideoList
      }, {
        default: (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(() => [$data.videosData.length != 0 ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createBlock)(_component_el_button, {
          key: 0,
          type: "primary",
          plain: "",
          size: "small",
          style: {
            "margin": "5px"
          },
          onClick: $options.downloadBiliPic
        }, {
          default: (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(() => [_hoisted_8]),
          _: 1
          /* STABLE */

        }, 8
        /* PROPS */
        , ["onClick"])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), $data.videosData.length != 0 ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createBlock)(_component_el_divider, {
          key: 1,
          "content-position": "left"
        }, {
          default: (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(() => [_hoisted_9]),
          _: 1
          /* STABLE */

        })) : ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createBlock)(_component_el_divider, {
          key: 2,
          "content-position": "left"
        }, {
          default: (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(() => [_hoisted_10]),
          _: 1
          /* STABLE */

        })), ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)($data.videosData, (item, index) => {
          return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createBlock)(_component_el_button, {
            key: index,
            size: "small",
            style: {
              "margin": "5px"
            },
            onClick: $event => $options.downloadBiliVideo(item.cid)
          }, {
            default: (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(() => [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)("【" + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(index + 1) + "P】 " + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(item.part), 1
            /* TEXT */
            )]),
            _: 2
            /* DYNAMIC */

          }, 1032
          /* PROPS, DYNAMIC_SLOTS */
          , ["onClick"]);
        }), 128
        /* KEYED_FRAGMENT */
        ))]),
        _: 1
        /* STABLE */

      }, 8
      /* PROPS */
      , ["modelValue", "onOpen"]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_el_dialog, {
        title: "打卡计划管理",
        width: "100%",
        modelValue: $data.planDialog,
        "onUpdate:modelValue": _cache[14] || (_cache[14] = $event => $data.planDialog = $event)
      }, {
        footer: (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(() => [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_el_button, {
          onClick: _cache[13] || (_cache[13] = $event => $data.planDialog = false)
        }, {
          default: (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(() => [_hoisted_16]),
          _: 1
          /* STABLE */

        }), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_el_button, {
          type: "primary",
          onClick: $options.addPlan
        }, {
          default: (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(() => [_hoisted_17]),
          _: 1
          /* STABLE */

        }, 8
        /* PROPS */
        , ["onClick"])]),
        default: (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(() => [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_el_tabs, {
          modelValue: $data.planType,
          "onUpdate:modelValue": _cache[12] || (_cache[12] = $event => $data.planType = $event)
        }, {
          default: (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(() => [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_el_tab_pane, {
            label: "坚持打卡计划",
            name: "0"
          }, {
            default: (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(() => [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_el_form, {
              model: $data.plan
            }, {
              default: (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(() => [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_el_form_item, {
                label: "计划名称",
                "label-width": "80px"
              }, {
                default: (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(() => [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_el_input, {
                  modelValue: $data.plan.title,
                  "onUpdate:modelValue": _cache[10] || (_cache[10] = $event => $data.plan.title = $event),
                  placeholder: "计划名称"
                }, null, 8
                /* PROPS */
                , ["modelValue"])]),
                _: 1
                /* STABLE */

              })]),
              _: 1
              /* STABLE */

            }, 8
            /* PROPS */
            , ["model"])]),
            _: 1
            /* STABLE */

          }), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_el_tab_pane, {
            label: "每日任务计划",
            name: "1"
          }, {
            default: (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(() => [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_el_form, {
              model: $data.plan
            }, {
              default: (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(() => [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_el_form_item, {
                label: "计划名称",
                "label-width": "80px"
              }, {
                default: (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(() => [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_el_input, {
                  modelValue: $data.plan.title,
                  "onUpdate:modelValue": _cache[11] || (_cache[11] = $event => $data.plan.title = $event),
                  placeholder: "计划名称"
                }, null, 8
                /* PROPS */
                , ["modelValue"])]),
                _: 1
                /* STABLE */

              }), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_el_divider, {
                "content-position": "left"
              }, {
                default: (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(() => [_hoisted_11]),
                _: 1
                /* STABLE */

              }), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_el_row, {
                type: "flex",
                justify: "space-around"
              }, {
                default: (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(() => [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_el_col, {
                  span: 12
                }, {
                  default: (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(() => [_hoisted_12]),
                  _: 1
                  /* STABLE */

                }), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_el_col, {
                  span: 4
                }, {
                  default: (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(() => [_hoisted_13]),
                  _: 1
                  /* STABLE */

                }), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_el_col, {
                  span: 4
                })]),
                _: 1
                /* STABLE */

              }), ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)($data.plan.items, (item, index) => {
                return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createBlock)(_component_el_form_item, {
                  key: index,
                  style: {
                    "margin": "0px 0px 4px 0px"
                  }
                }, {
                  default: (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(() => [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_el_row, {
                    type: "flex",
                    justify: "space-around"
                  }, {
                    default: (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(() => [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_el_col, {
                      span: 12
                    }, {
                      default: (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(() => [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_el_input, {
                        modelValue: item.name,
                        "onUpdate:modelValue": $event => item.name = $event,
                        placeholder: "目标名称",
                        size: "small"
                      }, null, 8
                      /* PROPS */
                      , ["modelValue", "onUpdate:modelValue"])]),
                      _: 2
                      /* DYNAMIC */

                    }, 1024
                    /* DYNAMIC_SLOTS */
                    ), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_el_col, {
                      span: 4
                    }, {
                      default: (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(() => [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_el_input, {
                        modelValue: item.target,
                        "onUpdate:modelValue": $event => item.target = $event,
                        modelModifiers: {
                          number: true
                        },
                        placeholder: "目标数量",
                        size: "small"
                      }, null, 8
                      /* PROPS */
                      , ["modelValue", "onUpdate:modelValue"])]),
                      _: 2
                      /* DYNAMIC */

                    }, 1024
                    /* DYNAMIC_SLOTS */
                    ), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_el_col, {
                      span: 4
                    }, {
                      default: (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(() => [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_el_button, {
                        type: "danger",
                        plain: "",
                        size: "small",
                        onClick: $event => $options.removePlanItem(index)
                      }, {
                        default: (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(() => [_hoisted_14]),
                        _: 2
                        /* DYNAMIC */

                      }, 1032
                      /* PROPS, DYNAMIC_SLOTS */
                      , ["onClick"])]),
                      _: 2
                      /* DYNAMIC */

                    }, 1024
                    /* DYNAMIC_SLOTS */
                    )]),
                    _: 2
                    /* DYNAMIC */

                  }, 1024
                  /* DYNAMIC_SLOTS */
                  )]),
                  _: 2
                  /* DYNAMIC */

                }, 1024
                /* DYNAMIC_SLOTS */
                );
              }), 128
              /* KEYED_FRAGMENT */
              )), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_el_row, {
                type: "flex",
                justify: "space-around"
              }, {
                default: (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(() => [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_el_col, {
                  span: 12
                }, {
                  default: (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(() => [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_el_button, {
                    icon: $data.icons.Plus,
                    size: "small",
                    circle: "",
                    onClick: $options.addPlanItem
                  }, null, 8
                  /* PROPS */
                  , ["icon", "onClick"])]),
                  _: 1
                  /* STABLE */

                }), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_el_col, {
                  span: 4
                }), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_el_col, {
                  span: 4
                })]),
                _: 1
                /* STABLE */

              })]),
              _: 1
              /* STABLE */

            }, 8
            /* PROPS */
            , ["model"])]),
            _: 1
            /* STABLE */

          }), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_el_tab_pane, {
            label: "计划管理",
            name: "2"
          }, {
            default: (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(() => [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_el_table, {
              data: Object.values($data.planList)
            }, {
              default: (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(() => [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_el_table_column, {
                prop: "title",
                label: "计划名称",
                width: "100"
              }), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_el_table_column, {
                align: "right"
              }, {
                default: (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(scope => [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_el_button, {
                  type: "danger",
                  onClick: $event => $options.deletePlan(scope.row.title)
                }, {
                  default: (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(() => [_hoisted_15]),
                  _: 2
                  /* DYNAMIC */

                }, 1032
                /* PROPS, DYNAMIC_SLOTS */
                , ["onClick"])]),
                _: 1
                /* STABLE */

              })]),
              _: 1
              /* STABLE */

            }, 8
            /* PROPS */
            , ["data"])]),
            _: 1
            /* STABLE */

          })]),
          _: 1
          /* STABLE */

        }, 8
        /* PROPS */
        , ["modelValue"])]),
        _: 1
        /* STABLE */

      }, 8
      /* PROPS */
      , ["modelValue"]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_el_dialog, {
        title: "标签组管理",
        width: "100%",
        modelValue: $data.tabDialog,
        "onUpdate:modelValue": _cache[17] || (_cache[17] = $event => $data.tabDialog = $event),
        onOpen: $options.getSavedTabsGroupList
      }, {
        default: (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(() => [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_el_divider, null, {
          default: (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(() => [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_el_icon, {
            size: 20
          }, {
            default: (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(() => [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_document_add)]),
            _: 1
            /* STABLE */

          })]),
          _: 1
          /* STABLE */

        }), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_el_form, {
          inline: true,
          model: $data.saveTabsGroupForm,
          size: "small",
          "label-width": "100px"
        }, {
          default: (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(() => [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_el_form_item, {
            label: "标签组名"
          }, {
            default: (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(() => [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_el_input, {
              modelValue: $data.saveTabsGroupForm.groupName,
              "onUpdate:modelValue": _cache[15] || (_cache[15] = $event => $data.saveTabsGroupForm.groupName = $event),
              placeholder: "需存储的标签组名"
            }, null, 8
            /* PROPS */
            , ["modelValue"])]),
            _: 1
            /* STABLE */

          }), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_el_form_item, null, {
            default: (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(() => [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_el_button, {
              type: "primary",
              onClick: $options.saveTabsGroup
            }, {
              default: (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(() => [_hoisted_18]),
              _: 1
              /* STABLE */

            }, 8
            /* PROPS */
            , ["onClick"])]),
            _: 1
            /* STABLE */

          })]),
          _: 1
          /* STABLE */

        }, 8
        /* PROPS */
        , ["model"]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_el_divider, null, {
          default: (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(() => [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_el_icon, {
            size: 20
          }, {
            default: (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(() => [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_setting)]),
            _: 1
            /* STABLE */

          })]),
          _: 1
          /* STABLE */

        }), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_el_form, {
          model: $data.reloadTabsGroupForm,
          size: "small",
          "label-width": "120px"
        }, {
          default: (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(() => [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_el_form_item, {
            label: "标签组名"
          }, {
            default: (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(() => [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_el_select, {
              modelValue: $data.reloadTabsGroupForm.groupName,
              "onUpdate:modelValue": _cache[16] || (_cache[16] = $event => $data.reloadTabsGroupForm.groupName = $event),
              placeholder: "加载或删除的标签组"
            }, {
              default: (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(() => [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)($data.savedTabsGroupList, (value, key, index) => {
                return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createBlock)(_component_el_option, {
                  key: index,
                  value: key
                }, null, 8
                /* PROPS */
                , ["value"]);
              }), 128
              /* KEYED_FRAGMENT */
              ))]),
              _: 1
              /* STABLE */

            }, 8
            /* PROPS */
            , ["modelValue"])]),
            _: 1
            /* STABLE */

          }), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_el_form_item, null, {
            default: (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(() => [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_el_button, {
              type: "primary",
              onClick: $options.reloadTabsGroup
            }, {
              default: (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(() => [_hoisted_19]),
              _: 1
              /* STABLE */

            }, 8
            /* PROPS */
            , ["onClick"]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_el_button, {
              onClick: $options.deleteTabsGroup
            }, {
              default: (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(() => [_hoisted_20]),
              _: 1
              /* STABLE */

            }, 8
            /* PROPS */
            , ["onClick"])]),
            _: 1
            /* STABLE */

          })]),
          _: 1
          /* STABLE */

        }, 8
        /* PROPS */
        , ["model"])]),
        _: 1
        /* STABLE */

      }, 8
      /* PROPS */
      , ["modelValue", "onOpen"])]),
      _: 1
      /* STABLE */

    })]),
    _: 1
    /* STABLE */

  });
}

/***/ }),

/***/ "./src/popup/index.js":
/*!****************************!*\
  !*** ./src/popup/index.js ***!
  \****************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ "./node_modules/vue/dist/vue.runtime.esm-bundler.js");
/* harmony import */ var _App_App_vue__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./App/App.vue */ "./src/popup/App/App.vue");
/* harmony import */ var element_plus__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! element-plus */ "./node_modules/element-plus/es/defaults.mjs");
/* harmony import */ var element_plus_dist_index_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! element-plus/dist/index.css */ "./node_modules/element-plus/dist/index.css");
/* harmony import */ var element_plus_dist_index_css__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(element_plus_dist_index_css__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _element_plus_icons_vue__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @element-plus/icons-vue */ "./node_modules/@element-plus/icons-vue/dist/es/index.mjs");





const app = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createApp)(_App_App_vue__WEBPACK_IMPORTED_MODULE_1__["default"]);

for (const icon in _element_plus_icons_vue__WEBPACK_IMPORTED_MODULE_3__) {
  app.component(icon, _element_plus_icons_vue__WEBPACK_IMPORTED_MODULE_3__[icon]);
}

app.use(element_plus__WEBPACK_IMPORTED_MODULE_4__["default"]).mount('#app');

/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js??clonedRuleSet-12.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-12.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./src/popup/App/App.vue?vue&type=style&index=0&id=a0e140f2&lang=css":
/*!**************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js??clonedRuleSet-12.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-12.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./src/popup/App/App.vue?vue&type=style&index=0&id=a0e140f2&lang=css ***!
  \**************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../node_modules/css-loader/dist/runtime/noSourceMaps.js */ "./node_modules/css-loader/dist/runtime/noSourceMaps.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, "\n.main_app {\n  font-family: 'Avenir', Helvetica, Arial, sans-serif;\n  -webkit-font-smoothing: antialiased;\n  -moz-osx-font-smoothing: grayscale;\n  /* text-align: center; */\n  color: #2c3e50;\n  margin-top: 0px;\n}\n.plan_items p{\n  color: #444;\n  font-size: 22px;\n  margin: 0px 0px 5px 0px;\n}\n.plan_days p{\n  color: #576690;\n  font-size: 28px;\n  margin: 0px 0px 10px 0px;\n}\n.plan_days .el-card{\n  padding: 0%;\n}\n.plan_items .el-row{\n  margin: 0px 0px 5px 0px;\n  color: #666;\n  font-size: 16px;\n}\n.plan_items .el-row .el-input-number{\n  max-width: 100%;\n}\n", ""]);
// Exports
/* harmony default export */ __webpack_exports__["default"] = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./src/popup/App/App.vue":
/*!*******************************!*\
  !*** ./src/popup/App/App.vue ***!
  \*******************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _App_vue_vue_type_template_id_a0e140f2__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./App.vue?vue&type=template&id=a0e140f2 */ "./src/popup/App/App.vue?vue&type=template&id=a0e140f2");
/* harmony import */ var _App_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./App.vue?vue&type=script&lang=js */ "./src/popup/App/App.vue?vue&type=script&lang=js");
/* harmony import */ var _App_vue_vue_type_style_index_0_id_a0e140f2_lang_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./App.vue?vue&type=style&index=0&id=a0e140f2&lang=css */ "./src/popup/App/App.vue?vue&type=style&index=0&id=a0e140f2&lang=css");
/* harmony import */ var _Users_wangzf_Documents_Chrome_ava_ext_node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./node_modules/vue-loader/dist/exportHelper.js */ "./node_modules/vue-loader/dist/exportHelper.js");




;


const __exports__ = /*#__PURE__*/(0,_Users_wangzf_Documents_Chrome_ava_ext_node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_3__["default"])(_App_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__["default"], [['render',_App_vue_vue_type_template_id_a0e140f2__WEBPACK_IMPORTED_MODULE_0__.render],['__file',"src/popup/App/App.vue"]])
/* hot reload */
if (false) {}


/* harmony default export */ __webpack_exports__["default"] = (__exports__);

/***/ }),

/***/ "./src/popup/App/App.vue?vue&type=script&lang=js":
/*!*******************************************************!*\
  !*** ./src/popup/App/App.vue?vue&type=script&lang=js ***!
  \*******************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* reexport safe */ _node_modules_babel_loader_lib_index_js_clonedRuleSet_40_use_0_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_App_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__["default"]; }
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_40_use_0_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_App_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-40.use[0]!../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./App.vue?vue&type=script&lang=js */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-40.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./src/popup/App/App.vue?vue&type=script&lang=js");
 

/***/ }),

/***/ "./src/popup/App/App.vue?vue&type=template&id=a0e140f2":
/*!*************************************************************!*\
  !*** ./src/popup/App/App.vue?vue&type=template&id=a0e140f2 ***!
  \*************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": function() { return /* reexport safe */ _node_modules_babel_loader_lib_index_js_clonedRuleSet_40_use_0_node_modules_vue_loader_dist_templateLoader_js_ruleSet_1_rules_3_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_App_vue_vue_type_template_id_a0e140f2__WEBPACK_IMPORTED_MODULE_0__.render; }
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_40_use_0_node_modules_vue_loader_dist_templateLoader_js_ruleSet_1_rules_3_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_App_vue_vue_type_template_id_a0e140f2__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-40.use[0]!../../../node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[3]!../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./App.vue?vue&type=template&id=a0e140f2 */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-40.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[3]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./src/popup/App/App.vue?vue&type=template&id=a0e140f2");


/***/ }),

/***/ "./src/popup/App/App.vue?vue&type=style&index=0&id=a0e140f2&lang=css":
/*!***************************************************************************!*\
  !*** ./src/popup/App/App.vue?vue&type=style&index=0&id=a0e140f2&lang=css ***!
  \***************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_style_loader_index_js_clonedRuleSet_12_use_0_node_modules_css_loader_dist_cjs_js_clonedRuleSet_12_use_1_node_modules_vue_loader_dist_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_12_use_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_App_vue_vue_type_style_index_0_id_a0e140f2_lang_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/vue-style-loader/index.js??clonedRuleSet-12.use[0]!../../../node_modules/css-loader/dist/cjs.js??clonedRuleSet-12.use[1]!../../../node_modules/vue-loader/dist/stylePostLoader.js!../../../node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-12.use[2]!../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./App.vue?vue&type=style&index=0&id=a0e140f2&lang=css */ "./node_modules/vue-style-loader/index.js??clonedRuleSet-12.use[0]!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-12.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-12.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./src/popup/App/App.vue?vue&type=style&index=0&id=a0e140f2&lang=css");
/* harmony import */ var _node_modules_vue_style_loader_index_js_clonedRuleSet_12_use_0_node_modules_css_loader_dist_cjs_js_clonedRuleSet_12_use_1_node_modules_vue_loader_dist_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_12_use_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_App_vue_vue_type_style_index_0_id_a0e140f2_lang_css__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_vue_style_loader_index_js_clonedRuleSet_12_use_0_node_modules_css_loader_dist_cjs_js_clonedRuleSet_12_use_1_node_modules_vue_loader_dist_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_12_use_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_App_vue_vue_type_style_index_0_id_a0e140f2_lang_css__WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ var __WEBPACK_REEXPORT_OBJECT__ = {};
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_vue_style_loader_index_js_clonedRuleSet_12_use_0_node_modules_css_loader_dist_cjs_js_clonedRuleSet_12_use_1_node_modules_vue_loader_dist_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_12_use_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_App_vue_vue_type_style_index_0_id_a0e140f2_lang_css__WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== "default") __WEBPACK_REEXPORT_OBJECT__[__WEBPACK_IMPORT_KEY__] = function(key) { return _node_modules_vue_style_loader_index_js_clonedRuleSet_12_use_0_node_modules_css_loader_dist_cjs_js_clonedRuleSet_12_use_1_node_modules_vue_loader_dist_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_12_use_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_App_vue_vue_type_style_index_0_id_a0e140f2_lang_css__WEBPACK_IMPORTED_MODULE_0__[key]; }.bind(0, __WEBPACK_IMPORT_KEY__)
/* harmony reexport (unknown) */ __webpack_require__.d(__webpack_exports__, __WEBPACK_REEXPORT_OBJECT__);


/***/ }),

/***/ "./node_modules/vue-style-loader/index.js??clonedRuleSet-12.use[0]!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-12.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-12.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./src/popup/App/App.vue?vue&type=style&index=0&id=a0e140f2&lang=css":
/*!********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-style-loader/index.js??clonedRuleSet-12.use[0]!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-12.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-12.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./src/popup/App/App.vue?vue&type=style&index=0&id=a0e140f2&lang=css ***!
  \********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(/*! !!../../../node_modules/css-loader/dist/cjs.js??clonedRuleSet-12.use[1]!../../../node_modules/vue-loader/dist/stylePostLoader.js!../../../node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-12.use[2]!../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./App.vue?vue&type=style&index=0&id=a0e140f2&lang=css */ "./node_modules/css-loader/dist/cjs.js??clonedRuleSet-12.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-12.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./src/popup/App/App.vue?vue&type=style&index=0&id=a0e140f2&lang=css");
if(content.__esModule) content = content.default;
if(typeof content === 'string') content = [[module.id, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var add = (__webpack_require__(/*! !../../../node_modules/vue-style-loader/lib/addStylesClient.js */ "./node_modules/vue-style-loader/lib/addStylesClient.js")["default"])
var update = add("0e14ff26", content, false, {"sourceMap":false,"shadowMode":false});
// Hot Module Replacement
if(false) {}

/***/ }),

/***/ "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAMCAIAAADZF8uwAAAAGUlEQVQYV2M4gwH+YwCGIasIUwhT25BVBADtzYNYrHvv4gAAAABJRU5ErkJggg==":
/*!**********************************************************************************************************************************************!*\
  !*** data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAMCAIAAADZF8uwAAAAGUlEQVQYV2M4gwH+YwCGIasIUwhT25BVBADtzYNYrHvv4gAAAABJRU5ErkJggg== ***!
  \**********************************************************************************************************************************************/
/***/ (function(module) {

"use strict";
module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAMCAIAAADZF8uwAAAAGUlEQVQYV2M4gwH+YwCGIasIUwhT25BVBADtzYNYrHvv4gAAAABJRU5ErkJggg==";

/***/ }),

/***/ "data:image/svg+xml;utf8,%3Csvg class=%27icon%27 width=%27200%27 height=%27200%27 viewBox=%270 0 1024 1024%27 xmlns=%27http://www.w3.org/2000/svg%27%3E%3Cpath fill=%27currentColor%27 d=%27M406.656 706.944L195.84 496.256a32 32 0 10-45.248 45.248l256 256 512-512a32 32 0 00-45.248-45.248L406.592 706.944z%27%3E%3C/path%3E%3C/svg%3E":
/*!************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** data:image/svg+xml;utf8,%3Csvg class=%27icon%27 width=%27200%27 height=%27200%27 viewBox=%270 0 1024 1024%27 xmlns=%27http://www.w3.org/2000/svg%27%3E%3Cpath fill=%27currentColor%27 d=%27M406.656 706.944L195.84 496.256a32 32 0 10-45.248 45.248l256 256 512-512a32 32 0 00-45.248-45.248L406.592 706.944z%27%3E%3C/path%3E%3C/svg%3E ***!
  \************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ (function(module) {

"use strict";
module.exports = "data:image/svg+xml;utf8,%3Csvg class=%27icon%27 width=%27200%27 height=%27200%27 viewBox=%270 0 1024 1024%27 xmlns=%27http://www.w3.org/2000/svg%27%3E%3Cpath fill=%27currentColor%27 d=%27M406.656 706.944L195.84 496.256a32 32 0 10-45.248 45.248l256 256 512-512a32 32 0 00-45.248-45.248L406.592 706.944z%27%3E%3C/path%3E%3C/svg%3E";

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			id: moduleId,
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/chunk loaded */
/******/ 	!function() {
/******/ 		var deferred = [];
/******/ 		__webpack_require__.O = function(result, chunkIds, fn, priority) {
/******/ 			if(chunkIds) {
/******/ 				priority = priority || 0;
/******/ 				for(var i = deferred.length; i > 0 && deferred[i - 1][2] > priority; i--) deferred[i] = deferred[i - 1];
/******/ 				deferred[i] = [chunkIds, fn, priority];
/******/ 				return;
/******/ 			}
/******/ 			var notFulfilled = Infinity;
/******/ 			for (var i = 0; i < deferred.length; i++) {
/******/ 				var chunkIds = deferred[i][0];
/******/ 				var fn = deferred[i][1];
/******/ 				var priority = deferred[i][2];
/******/ 				var fulfilled = true;
/******/ 				for (var j = 0; j < chunkIds.length; j++) {
/******/ 					if ((priority & 1 === 0 || notFulfilled >= priority) && Object.keys(__webpack_require__.O).every(function(key) { return __webpack_require__.O[key](chunkIds[j]); })) {
/******/ 						chunkIds.splice(j--, 1);
/******/ 					} else {
/******/ 						fulfilled = false;
/******/ 						if(priority < notFulfilled) notFulfilled = priority;
/******/ 					}
/******/ 				}
/******/ 				if(fulfilled) {
/******/ 					deferred.splice(i--, 1)
/******/ 					var r = fn();
/******/ 					if (r !== undefined) result = r;
/******/ 				}
/******/ 			}
/******/ 			return result;
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	!function() {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = function(module) {
/******/ 			var getter = module && module.__esModule ?
/******/ 				function() { return module['default']; } :
/******/ 				function() { return module; };
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	!function() {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = function(exports, definition) {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/global */
/******/ 	!function() {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	!function() {
/******/ 		__webpack_require__.o = function(obj, prop) { return Object.prototype.hasOwnProperty.call(obj, prop); }
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	!function() {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = function(exports) {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/jsonp chunk loading */
/******/ 	!function() {
/******/ 		__webpack_require__.b = document.baseURI || self.location.href;
/******/ 		
/******/ 		// object to store loaded and loading chunks
/******/ 		// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 		// [resolve, reject, Promise] = chunk loading, 0 = chunk loaded
/******/ 		var installedChunks = {
/******/ 			"popup": 0
/******/ 		};
/******/ 		
/******/ 		// no chunk on demand loading
/******/ 		
/******/ 		// no prefetching
/******/ 		
/******/ 		// no preloaded
/******/ 		
/******/ 		// no HMR
/******/ 		
/******/ 		// no HMR manifest
/******/ 		
/******/ 		__webpack_require__.O.j = function(chunkId) { return installedChunks[chunkId] === 0; };
/******/ 		
/******/ 		// install a JSONP callback for chunk loading
/******/ 		var webpackJsonpCallback = function(parentChunkLoadingFunction, data) {
/******/ 			var chunkIds = data[0];
/******/ 			var moreModules = data[1];
/******/ 			var runtime = data[2];
/******/ 			// add "moreModules" to the modules object,
/******/ 			// then flag all "chunkIds" as loaded and fire callback
/******/ 			var moduleId, chunkId, i = 0;
/******/ 			if(chunkIds.some(function(id) { return installedChunks[id] !== 0; })) {
/******/ 				for(moduleId in moreModules) {
/******/ 					if(__webpack_require__.o(moreModules, moduleId)) {
/******/ 						__webpack_require__.m[moduleId] = moreModules[moduleId];
/******/ 					}
/******/ 				}
/******/ 				if(runtime) var result = runtime(__webpack_require__);
/******/ 			}
/******/ 			if(parentChunkLoadingFunction) parentChunkLoadingFunction(data);
/******/ 			for(;i < chunkIds.length; i++) {
/******/ 				chunkId = chunkIds[i];
/******/ 				if(__webpack_require__.o(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 					installedChunks[chunkId][0]();
/******/ 				}
/******/ 				installedChunks[chunkId] = 0;
/******/ 			}
/******/ 			return __webpack_require__.O(result);
/******/ 		}
/******/ 		
/******/ 		var chunkLoadingGlobal = self["webpackChunkext"] = self["webpackChunkext"] || [];
/******/ 		chunkLoadingGlobal.forEach(webpackJsonpCallback.bind(null, 0));
/******/ 		chunkLoadingGlobal.push = webpackJsonpCallback.bind(null, chunkLoadingGlobal.push.bind(chunkLoadingGlobal));
/******/ 	}();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module depends on other loaded chunks and execution need to be delayed
/******/ 	var __webpack_exports__ = __webpack_require__.O(undefined, ["chunk-vendors"], function() { return __webpack_require__("./src/popup/index.js"); })
/******/ 	__webpack_exports__ = __webpack_require__.O(__webpack_exports__);
/******/ 	
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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O1dBQ0E7V0FDQTs7V0FFQTtXQUNBO1dBQ0E7Ozs7O1VFbERBO1VBQ0E7VUFDQTtVQUNBLDJGQUEyRixxREFBcUQ7VUFDaEoiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9leHQvLi9zcmMvcG9wdXAvQXBwL0FwcC52dWUiLCJ3ZWJwYWNrOi8vZXh0Ly4vc3JjL3BvcHVwL2luZGV4LmpzIiwid2VicGFjazovL2V4dC8uL3NyYy9wb3B1cC9BcHAvQXBwLnZ1ZT8wZWM3Iiwid2VicGFjazovL2V4dC8uL3NyYy9wb3B1cC9BcHAvQXBwLnZ1ZT9iNzkwIiwid2VicGFjazovL2V4dC8uL3NyYy9wb3B1cC9BcHAvQXBwLnZ1ZT9iY2ZlIiwid2VicGFjazovL2V4dC8uL3NyYy9wb3B1cC9BcHAvQXBwLnZ1ZT81ODNlIiwid2VicGFjazovL2V4dC8uL3NyYy9wb3B1cC9BcHAvQXBwLnZ1ZT8zZDdmIiwid2VicGFjazovL2V4dC8uL3NyYy9wb3B1cC9BcHAvQXBwLnZ1ZT8xNWU4Iiwid2VicGFjazovL2V4dC93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9leHQvd2VicGFjay9ydW50aW1lL2NodW5rIGxvYWRlZCIsIndlYnBhY2s6Ly9leHQvd2VicGFjay9ydW50aW1lL2NvbXBhdCBnZXQgZGVmYXVsdCBleHBvcnQiLCJ3ZWJwYWNrOi8vZXh0L3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9leHQvd2VicGFjay9ydW50aW1lL2dsb2JhbCIsIndlYnBhY2s6Ly9leHQvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9leHQvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9leHQvd2VicGFjay9ydW50aW1lL2pzb25wIGNodW5rIGxvYWRpbmciLCJ3ZWJwYWNrOi8vZXh0L3dlYnBhY2svYmVmb3JlLXN0YXJ0dXAiLCJ3ZWJwYWNrOi8vZXh0L3dlYnBhY2svc3RhcnR1cCIsIndlYnBhY2s6Ly9leHQvd2VicGFjay9hZnRlci1zdGFydHVwIl0sInNvdXJjZXNDb250ZW50IjpbIjx0ZW1wbGF0ZT5cbiAgPGVsLWNvbnRhaW5lciBzdHlsZT1cIndpZHRoOjQ1MHB4OyBoZWlnaHQ6IDM2MHB4OyBib3JkZXItcmFkaXVzOiA4cHg7IGJhY2tncm91bmQ6IzlBQzhFMjgwO1wiPlxuICAgIDxlbC1oZWFkZXIgc3R5bGU9XCJoZWlnaHQ6IDEyMHB4OyBtYXJnaW46IDIwcHggMHB4IDAwcHggMHB4XCIgPlxuICAgICAgPGVsLXJvdyA6Z3V0dGVyPVwiMjBcIiB0eXBlPVwiZmxleFwiIGFsaWduPVwiYm90dG9tXCI+XG4gICAgICAgIDxlbC1jb2wgOnNwYW49XCI4XCI+XG4gICAgICAgICAgPGRpdiBAbW91c2VlbnRlcj1cImlzR2lmID0gdHJ1ZVwiXG4gICAgICAgICAgQG1vdXNlbGVhdmU9XCJpc0dpZiA9IGZhbHNlXCJcbiAgICAgICAgICBAY2xpY2s9XCJvcGVuT3B0aW9uXCI+XG4gICAgICAgICAgPGVsLWF2YXRhciB2LWlmID0gXCJpc0dpZlwiIDpzcmM9XCJnaWZ1cmxcIlxuICAgICAgICAgIHN0eWxlPVwid2lkdGg6IDEyMHB4OyBoZWlnaHQ6IDEyMHB4OyBiYWNrZ3JvdW5kOiM5QUM4RTIwMDtcIlxuICAgICAgICAgIGZpdD1cImZpbGxcIj48L2VsLWF2YXRhcj5cbiAgICAgICAgICA8ZWwtYXZhdGFyIHYtZWxzZSA6c3JjPVwicG5ndXJsXCJcbiAgICAgICAgICBzdHlsZT1cIndpZHRoOiAxMjBweDsgaGVpZ2h0OiAxMjBweDsgYmFja2dyb3VuZDojOUFDOEUyMDA7XCJcbiAgICAgICAgICBmaXQ9XCJmaWxsXCI+PC9lbC1hdmF0YXI+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZWwtY29sPlxuICAgICAgICA8ZWwtY29sIDpzcGFuPVwiMTZcIj5cbiAgICAgICAgPGVsLXJvdyBqdXN0aWZ5PVwiY2VudGVyXCIgOmd1dHRlcj1cIjQ1XCI+XG4gICAgICAgICAgPCEtLSDlt6XkvZzmqKHlvI8gLS0+XG4gICAgICAgICAgICA8ZWwtYnV0dG9uIHYtaWY9XCJ3b3JrbW9kZVwiIHNpemU9XCJsYXJnZVwiIHR5cGU9XCJwcmltYXJ5XCIgOmljb249XCJpY29ucy5NdXRlTm90aWZpY2F0aW9uXCIgY2lyY2xlIEBjbGljaz1cImNoYW5nZVdvcmtNb2RlKGZhbHNlKVwiPjwvZWwtYnV0dG9uPlxuICAgICAgICAgICAgPGVsLWJ1dHRvbiB2LWVsc2Ugc2l6ZT1cImxhcmdlXCIgOmljb249XCJpY29ucy5NdXRlTm90aWZpY2F0aW9uXCIgY2lyY2xlIEBjbGljaz1cImNoYW5nZVdvcmtNb2RlKHRydWUpXCI+PC9lbC1idXR0b24+XG4gICAgICAgICAgPCEtLSDmiKrlsY8gLS0+XG4gICAgICAgICAgICA8ZWwtYnV0dG9uIHNpemU9XCJsYXJnZVwiIDppY29uPVwiaWNvbnMuRnVsbFNjcmVlblwiIGNpcmNsZSBAY2xpY2s9XCJzY3JlZW5zaG90XCI+PC9lbC1idXR0b24+XG4gICAgICAgICAgPCEtLSDlrZjlgqjmoIfnrb7pobUgLS0+XG4gICAgICAgICAgPGVsLWJ1dHRvbiBzaXplPVwibGFyZ2VcIiA6aWNvbj1cImljb25zLkNvcHlEb2N1bWVudFwiIGNpcmNsZSBAY2xpY2s9XCJ0YWJEaWFsb2c9dHJ1ZVwiPjwvZWwtYnV0dG9uPlxuICAgICAgICAgIDwhLS0g5LiL6L29YuermeinhumikSAtLT5cbiAgICAgICAgICAgIDxlbC1idXR0b24gc2l6ZT1cImxhcmdlXCIgOmljb249XCJpY29ucy5Eb3dubG9hZFwiIGNpcmNsZSBAY2xpY2s9XCJzZWxlY3RWaWRlbz10cnVlXCI+PC9lbC1idXR0b24+XG4gICAgICAgICAgPCEtLSDorqHliJIgLS0+XG4gICAgICAgICAgICA8ZWwtYnV0dG9uIHNpemU9XCJsYXJnZVwiIDppY29uPVwiaWNvbnMuRmluaXNoZWRcIiBjaXJjbGUgQGNsaWNrPVwicGxhbkRpYWxvZz10cnVlXCI+PC9lbC1idXR0b24+XG4gICAgICAgIDwvZWwtcm93PlxuICAgICAgICA8L2VsLWNvbD5cbiAgICAgIDwvZWwtcm93PlxuICAgIDwvZWwtaGVhZGVyPlxuICAgIDxlbC1tYWluPlxuICAgICAgPGVsLWNhcmQgdi1pZj1cIkpTT04uc3RyaW5naWZ5KHBsYW5MaXN0KSA9PSAne30nXCIgc3R5bGU9XCJib3JkZXItcmFkaXVzOiA4cHg7IGJhY2tncm91bmQ6IzlBQzhFMjQwOyBoZWlnaHQ6IDE3NXB4O1wiPlxuICAgICAgICA8ZWwtcm93IHR5cGU9XCJmbGV4XCIganVzdGlmeT1cInNwYWNlLWFyb3VuZFwiPlxuICAgICAgICAgIDxlbC1pbWFnZSBzdHlsZT1cIndpZHRoOiAxMDBweDsgaGVpZ2h0OiAxMDBweDtcIiBzcmM9XCJhc3NldHMvem1oc24uZ2lmXCI+PC9lbC1pbWFnZT4gXG4gICAgICAgIDwvZWwtcm93PlxuICAgICAgICA8ZWwtcm93IHR5cGU9XCJmbGV4XCIganVzdGlmeT1cInNwYWNlLWFyb3VuZFwiIHN0eWxlPVwibWFyZ2luOiAxNXB4IDBweCAwcHggMHB4XCI+XG4gICAgICAgICAgPGxhYmVsIHN0eWxlPVwiZm9udC1zaXplOjE2cHg7IGNvbG9yOiNmMmY4ZmI7XCI+6L+Y5rKh5pyJ5Yi25a6a6K6h5YiS5o2PITwvbGFiZWw+XG4gICAgICAgICAgPGVsLWJ1dHRvbiB0eXBlPVwicHJpbWFyeVwiIHNpemU9XCJzbWFsbFwiIHBsYWluIEBjbGljaz1cInBsYW5EaWFsb2c9dHJ1ZVwiPueri+WIu+W8gOWni+iuoeWIkjwvZWwtYnV0dG9uPlxuICAgICAgICA8L2VsLXJvdz5cbiAgICAgIDwvZWwtY2FyZD5cbiAgICAgIDxlbC1jYXJvdXNlbCB2LWVsc2UgaGVpZ2h0PVwiMTc1cHhcIiBhcnJvdz1cIm5ldmVyXCI+XG4gICAgICAgIDxlbC1jYXJvdXNlbC1pdGVtIHYtZm9yPVwiKHAsaSkgaW4gcGxhbkxpc3RcIiA6a2V5PVwiaVwiPlxuICAgICAgICAgIDxlbC1jYXJkIHYtaWY9XCJwLnR5cGUgPT0gJzAnXCIgc2hhZG93PVwiaG92ZXJcIiA6Ym9keS1zdHlsZT1cIntwYWRkaW5nOiAnMTBweCd9XCIgc3R5bGU9XCJib3JkZXItcmFkaXVzOiA4cHg7IGJhY2tncm91bmQ6IzlBQzhFMjQwOyBoZWlnaHQ6IDE1MHB4OyBvdmVyZmxvdzogYXV0b1wiPlxuICAgICAgICAgICAgPGVsLXJvdyBqdXN0aWZ5PVwic3BhY2UtYXJvdW5kXCI+XG4gICAgICAgICAgICAgIDxlbC1jb2wgOnNwYW49XCI4XCIgY2xhc3M9XCJwbGFuX2RheXNcIj5cbiAgICAgICAgICAgICAgICA8ZWwtY2FyZCBzdHlsZT1cImJvcmRlci1yYWRpdXM6IDhweDsgYmFja2dyb3VuZDojOUFDOEUyMjA7IGhlaWdodDogMTIwcHg7XCIgc2hhZG93PVwiaG92ZXJcIj4gXG4gICAgICAgICAgICAgICAgICA8ZWwtcm93PlxuICAgICAgICAgICAgICAgICAgICA8cD5EYXk8L3A+XG4gICAgICAgICAgICAgICAgICA8L2VsLXJvdz5cbiAgICAgICAgICAgICAgICAgIDxlbC1yb3c+XG4gICAgICAgICAgICAgICAgICAgIDxwPnt7cC5kYXlzfX08L3A+XG4gICAgICAgICAgICAgICAgICA8L2VsLXJvdz4gICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIDwvZWwtY2FyZD5cbiAgICAgICAgICAgICAgPC9lbC1jb2w+XG4gICAgICAgICAgICAgIDxlbC1jb2wgOnNwYW49XCIxMlwiIGNsYXNzPVwicGxhbl9pdGVtc1wiPlxuICAgICAgICAgICAgICAgIDxwPnt7cC50aXRsZX19PC9wPlxuICAgICAgICAgICAgICAgIDxwIHN0eWxlPVwiZm9udC1zaXplOjE2cHg7XCI+5bey5Z2a5oyB77yae3twLmRheXN9fTwvcD5cbiAgICAgICAgICAgICAgICA8cCBzdHlsZT1cImZvbnQtc2l6ZToxNnB4O1wiPuacgOmVv+WdmuaMge+8mnt7cC5tYXhEYXlzfX08L3A+XG4gICAgICAgICAgICAgICAgPGVsLWJ1dHRvbiBAY2xpY2s9XCJjaGVja1BsYW4ocClcIj7miZPljaE8L2VsLWJ1dHRvbj5cbiAgICAgICAgICAgICAgPC9lbC1jb2w+XG4gICAgICAgICAgICA8L2VsLXJvdz5cbiAgICAgICAgICA8L2VsLWNhcmQ+XG4gICAgICAgICAgPGVsLWNhcmQgdi1pZj1cInAudHlwZSA9PSAnMSdcIiBzaGFkb3c9XCJob3ZlclwiIDpib2R5LXN0eWxlPVwie3BhZGRpbmc6ICcxMHB4J31cIiBzdHlsZT1cImJvcmRlci1yYWRpdXM6IDhweDsgYmFja2dyb3VuZDojOUFDOEUyNDA7IGhlaWdodDogMTUwcHg7IG92ZXJmbG93OiBhdXRvXCI+XG4gICAgICAgICAgICA8ZWwtcm93PlxuICAgICAgICAgICAgICA8ZWwtY29sIDpzcGFuPVwiOFwiPlxuICAgICAgICAgICAgICAgIDxlbC1wcm9ncmVzcyB2LWlmPVwiY29tcHV0ZVBlcmNlbnRhZ2UocC5pdGVtcykgIT0gMTAwXCIgdHlwZT1cImNpcmNsZVwiIDp3aWR0aD1cIjEwMFwiIDpwZXJjZW50YWdlPVwiY29tcHV0ZVBlcmNlbnRhZ2UocC5pdGVtcylcIiBzdHlsZT1cIm1hcmdpbjogMTBweCAwcHg7XCI+PC9lbC1wcm9ncmVzcz5cbiAgICAgICAgICAgICAgICA8ZWwtcHJvZ3Jlc3Mgdi1lbHNlIHR5cGU9XCJjaXJjbGVcIiA6d2lkdGg9XCIxMDBcIiA6cGVyY2VudGFnZT1cIjEwMFwiIHN0YXR1cz1cInN1Y2Nlc3NcIiBzdHlsZT1cIm1hcmdpbjogMTBweCAwcHg7XCI+PC9lbC1wcm9ncmVzcz5cbiAgICAgICAgICAgICAgPC9lbC1jb2w+XG4gICAgICAgICAgICAgIDxlbC1jb2wgOnNwYW49XCIxNlwiIGNsYXNzPVwicGxhbl9pdGVtc1wiPlxuICAgICAgICAgICAgICAgIDxwPnt7cC50aXRsZX19PC9wPlxuICAgICAgICAgICAgICAgIDxlbC1yb3cgdi1mb3I9XCIoaXRlbSwgaW5kZXgpIGluIHAuaXRlbXNcIiA6a2V5PVwiaW5kZXhcIiB0eXBlPVwiZmxleFwiIGp1c3RpZnk9XCJzcGFjZS1hcm91bmRcIj5cbiAgICAgICAgICAgICAgICAgIDxlbC1jb2wgOnNwYW49XCI4XCI+e3tpdGVtLm5hbWV9fTwvZWwtY29sPlxuICAgICAgICAgICAgICAgICAgPGVsLWNvbCA6c3Bhbj1cIjZcIj57e2l0ZW0uY29tcGxldGVkfX0ve3tpdGVtLnRhcmdldH19PC9lbC1jb2w+XG4gICAgICAgICAgICAgICAgICA8ZWwtY29sIDpzcGFuPVwiMTBcIiA+IDxlbC1pbnB1dC1udW1iZXIgc2l6ZT1cInNtYWxsXCIgdi1tb2RlbD1cIml0ZW0uY29tcGxldGVkXCIgQGNoYW5nZT1cImhhbmRsZVBsYW5DaGFuZ2UocC5pdGVtcylcIiA6bWluPVwiMFwiIDptYXg9XCJpdGVtLnRhcmdldFwiPi8xMDwvZWwtaW5wdXQtbnVtYmVyPiA8L2VsLWNvbD5cbiAgICAgICAgICAgICAgICA8L2VsLXJvdz5cbiAgICAgICAgICAgICAgPC9lbC1jb2w+XG4gICAgICAgICAgICA8L2VsLXJvdz5cbiAgICAgICAgICA8L2VsLWNhcmQ+XG4gICAgICAgIDwvZWwtY2Fyb3VzZWwtaXRlbT5cbiAgICAgIDwvZWwtY2Fyb3VzZWw+XG5cbiAgICAgIDxlbC1kcmF3ZXIgdGl0bGU9XCLpgInmi6nliIbpm4ZcIiBzaXplPVwiMzAwcHhcIiB2LW1vZGVsPVwic2VsZWN0VmlkZW9cIlxuICAgICAgICA6d2l0aC1oZWFkZXI9ZmFsc2VcbiAgICAgICAgZGlyZWN0aW9uPVwidHRiXCJcbiAgICAgICAgOmRlc3Ryb3ktb24tY2xvc2U9dHJ1ZVxuICAgICAgICBAb3Blbj1cImdldFZpZGVvTGlzdFwiPlxuICAgICAgICA8ZWwtYnV0dG9uIHYtaWY9XCJ2aWRlb3NEYXRhLmxlbmd0aCAhPSAwXCIgdHlwZT1cInByaW1hcnlcIiBwbGFpbiBzaXplPVwic21hbGxcIiBzdHlsZT1cIm1hcmdpbjogNXB4O1wiIEBjbGljaz1cImRvd25sb2FkQmlsaVBpY1wiPuS4i+i9veWwgemdojwvZWwtYnV0dG9uPlxuICAgICAgICA8ZWwtZGl2aWRlciB2LWlmPVwidmlkZW9zRGF0YS5sZW5ndGggIT0gMFwiIGNvbnRlbnQtcG9zaXRpb249XCJsZWZ0XCI+6YCJ5oup5YiG6ZuGPC9lbC1kaXZpZGVyPlxuICAgICAgICA8ZWwtZGl2aWRlciB2LWVsc2UgY29udGVudC1wb3NpdGlvbj1cImxlZnRcIj7or7flnKhi56uZ6KeG6aKR55WM6Z2i5L2/55SoPC9lbC1kaXZpZGVyPlxuICAgICAgICA8ZWwtYnV0dG9uIHYtZm9yPVwiKGl0ZW0sIGluZGV4KSBpbiB2aWRlb3NEYXRhXCIgOmtleT1cImluZGV4XCIgc2l6ZT1cInNtYWxsXCIgc3R5bGU9XCJtYXJnaW46IDVweDtcIiBAY2xpY2s9XCJkb3dubG9hZEJpbGlWaWRlbyhpdGVtLmNpZClcIj7jgJB7e2luZGV4KzF9fVDjgJEge3tpdGVtLnBhcnR9fTwvZWwtYnV0dG9uPlxuICAgICAgPC9lbC1kcmF3ZXI+XG5cbiAgICAgIDxlbC1kaWFsb2cgdGl0bGU9XCLmiZPljaHorqHliJLnrqHnkIZcIiB3aWR0aD1cIjEwMCVcIiB2LW1vZGVsPVwicGxhbkRpYWxvZ1wiPlxuICAgICAgICA8ZWwtdGFicyB2LW1vZGVsPVwicGxhblR5cGVcIj5cbiAgICAgICAgICA8ZWwtdGFiLXBhbmUgbGFiZWw9XCLlnZrmjIHmiZPljaHorqHliJJcIiBuYW1lPVwiMFwiPlxuICAgICAgICAgICAgPGVsLWZvcm0gOm1vZGVsPVwicGxhblwiPlxuICAgICAgICAgICAgICA8ZWwtZm9ybS1pdGVtIGxhYmVsPVwi6K6h5YiS5ZCN56ewXCIgbGFiZWwtd2lkdGg9XCI4MHB4XCI+XG4gICAgICAgICAgICAgICAgPGVsLWlucHV0IHYtbW9kZWw9XCJwbGFuLnRpdGxlXCIgcGxhY2Vob2xkZXI9XCLorqHliJLlkI3np7BcIj48L2VsLWlucHV0PlxuICAgICAgICAgICAgICA8L2VsLWZvcm0taXRlbT5cbiAgICAgICAgICAgIDwvZWwtZm9ybT4gIFxuICAgICAgICAgIDwvZWwtdGFiLXBhbmU+XG4gICAgICAgICAgPGVsLXRhYi1wYW5lIGxhYmVsPVwi5q+P5pel5Lu75Yqh6K6h5YiSXCIgbmFtZT1cIjFcIj5cbiAgICAgICAgICAgIDxlbC1mb3JtIDptb2RlbD1cInBsYW5cIj5cbiAgICAgICAgICAgICAgPGVsLWZvcm0taXRlbSBsYWJlbD1cIuiuoeWIkuWQjeensFwiIGxhYmVsLXdpZHRoPVwiODBweFwiPlxuICAgICAgICAgICAgICAgIDxlbC1pbnB1dCB2LW1vZGVsPVwicGxhbi50aXRsZVwiIHBsYWNlaG9sZGVyPVwi6K6h5YiS5ZCN56ewXCI+PC9lbC1pbnB1dD5cbiAgICAgICAgICAgICAgPC9lbC1mb3JtLWl0ZW0+XG4gICAgICAgICAgICAgIDxlbC1kaXZpZGVyIGNvbnRlbnQtcG9zaXRpb249XCJsZWZ0XCI+6K+m57uG5YaF5a65PC9lbC1kaXZpZGVyPlxuICAgICAgICAgICAgICA8ZWwtcm93IHR5cGU9XCJmbGV4XCIganVzdGlmeT1cInNwYWNlLWFyb3VuZFwiPlxuICAgICAgICAgICAgICAgIDxlbC1jb2wgOnNwYW49XCIxMlwiPlxuICAgICAgICAgICAgICAgICAgPGg0Puebruagh+WQjeensDwvaDQ+XG4gICAgICAgICAgICAgICAgPC9lbC1jb2w+XG4gICAgICAgICAgICAgICAgPGVsLWNvbCA6c3Bhbj1cIjRcIj5cbiAgICAgICAgICAgICAgICAgIDxoND7nm67moIfmlbDph488L2g0PlxuICAgICAgICAgICAgICAgIDwvZWwtY29sPlxuICAgICAgICAgICAgICAgIDxlbC1jb2wgOnNwYW49XCI0XCI+XG4gICAgICAgICAgICAgICAgPC9lbC1jb2w+ICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgPC9lbC1yb3c+XG4gICAgICAgICAgICAgIDxlbC1mb3JtLWl0ZW0gdi1mb3I9XCIoaXRlbSwgaW5kZXgpIGluIHBsYW4uaXRlbXNcIiA6a2V5PVwiaW5kZXhcIiBzdHlsZT1cIm1hcmdpbjogMHB4IDBweCA0cHggMHB4O1wiPlxuICAgICAgICAgICAgICAgIDxlbC1yb3cgdHlwZT1cImZsZXhcIiBqdXN0aWZ5PVwic3BhY2UtYXJvdW5kXCI+XG4gICAgICAgICAgICAgICAgICA8ZWwtY29sIDpzcGFuPVwiMTJcIj5cbiAgICAgICAgICAgICAgICAgICAgPGVsLWlucHV0IHYtbW9kZWw9XCJpdGVtLm5hbWVcIiBwbGFjZWhvbGRlcj1cIuebruagh+WQjeensFwiIHNpemU9XCJzbWFsbFwiPjwvZWwtaW5wdXQ+XG4gICAgICAgICAgICAgICAgICA8L2VsLWNvbD5cbiAgICAgICAgICAgICAgICAgIDxlbC1jb2wgOnNwYW49XCI0XCI+XG4gICAgICAgICAgICAgICAgICAgIDxlbC1pbnB1dCB2LW1vZGVsLm51bWJlcj1cIml0ZW0udGFyZ2V0XCIgcGxhY2Vob2xkZXI9XCLnm67moIfmlbDph49cIiBzaXplPVwic21hbGxcIj48L2VsLWlucHV0PlxuICAgICAgICAgICAgICAgICAgPC9lbC1jb2w+XG4gICAgICAgICAgICAgICAgICA8ZWwtY29sIDpzcGFuPVwiNFwiPlxuICAgICAgICAgICAgICAgICAgICA8ZWwtYnV0dG9uIHR5cGU9XCJkYW5nZXJcIiBwbGFpbiBzaXplPVwic21hbGxcIiBAY2xpY2s9XCJyZW1vdmVQbGFuSXRlbShpbmRleClcIj7liKDpmaQ8L2VsLWJ1dHRvbj5cbiAgICAgICAgICAgICAgICAgIDwvZWwtY29sPiAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgPC9lbC1yb3c+XG4gICAgICAgICAgICAgIDwvZWwtZm9ybS1pdGVtPlxuICAgICAgICAgICAgICA8ZWwtcm93IHR5cGU9XCJmbGV4XCIganVzdGlmeT1cInNwYWNlLWFyb3VuZFwiPlxuICAgICAgICAgICAgICAgIDxlbC1jb2wgOnNwYW49XCIxMlwiPlxuICAgICAgICAgICAgICAgICAgPGVsLWJ1dHRvbiA6aWNvbj1cImljb25zLlBsdXNcIiBzaXplPVwic21hbGxcIiBjaXJjbGUgQGNsaWNrPVwiYWRkUGxhbkl0ZW1cIj48L2VsLWJ1dHRvbj5cbiAgICAgICAgICAgICAgICA8L2VsLWNvbD5cbiAgICAgICAgICAgICAgICA8ZWwtY29sIDpzcGFuPVwiNFwiPlxuICAgICAgICAgICAgICAgIDwvZWwtY29sPlxuICAgICAgICAgICAgICAgIDxlbC1jb2wgOnNwYW49XCI0XCI+XG4gICAgICAgICAgICAgICAgPC9lbC1jb2w+ICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgPC9lbC1yb3c+XG4gICAgICAgICAgICA8L2VsLWZvcm0+ICAgICAgICAgICAgXG4gICAgICAgICAgPC9lbC10YWItcGFuZT5cbiAgICAgICAgICA8ZWwtdGFiLXBhbmUgbGFiZWw9XCLorqHliJLnrqHnkIZcIiBuYW1lPVwiMlwiPlxuICAgICAgICAgICAgPGVsLXRhYmxlIDpkYXRhPVwiT2JqZWN0LnZhbHVlcyhwbGFuTGlzdClcIj5cbiAgICAgICAgICAgICAgPGVsLXRhYmxlLWNvbHVtbiBwcm9wPVwidGl0bGVcIiBsYWJlbD1cIuiuoeWIkuWQjeensFwiIHdpZHRoPVwiMTAwXCIgLz5cbiAgICAgICAgICAgICAgPGVsLXRhYmxlLWNvbHVtbiBhbGlnbj1cInJpZ2h0XCI+XG4gICAgICAgICAgICAgICAgPHRlbXBsYXRlICNkZWZhdWx0PVwic2NvcGVcIj5cbiAgICAgICAgICAgICAgICAgIDxlbC1idXR0b24gdHlwZT1cImRhbmdlclwiIEBjbGljaz1cImRlbGV0ZVBsYW4oc2NvcGUucm93LnRpdGxlKVwiPuWIoOmZpDwvZWwtYnV0dG9uPlxuICAgICAgICAgICAgICAgIDwvdGVtcGxhdGU+XG4gICAgICAgICAgICAgIDwvZWwtdGFibGUtY29sdW1uPlxuICAgICAgICAgICAgPC9lbC10YWJsZT5cbiAgICAgICAgICA8L2VsLXRhYi1wYW5lPlxuICAgICAgICA8L2VsLXRhYnM+XG4gICAgICAgIDx0ZW1wbGF0ZSAjZm9vdGVyPlxuICAgICAgICAgIDxlbC1idXR0b24gQGNsaWNrPVwicGxhbkRpYWxvZz1mYWxzZVwiPuWPliDmtog8L2VsLWJ1dHRvbj5cbiAgICAgICAgICA8ZWwtYnV0dG9uIHR5cGU9XCJwcmltYXJ5XCIgQGNsaWNrPVwiYWRkUGxhblwiPuehriDlrpo8L2VsLWJ1dHRvbj4gICAgICAgICAgXG4gICAgICAgIDwvdGVtcGxhdGU+XG4gICAgICA8L2VsLWRpYWxvZz5cblxuICAgICAgPGVsLWRpYWxvZyB0aXRsZT1cIuagh+etvue7hOeuoeeQhlwiIHdpZHRoPVwiMTAwJVwiIHYtbW9kZWw9XCJ0YWJEaWFsb2dcIiBAb3Blbj1cImdldFNhdmVkVGFic0dyb3VwTGlzdFwiPlxuICAgICAgICA8ZWwtZGl2aWRlcj48ZWwtaWNvbiA6c2l6ZT1cIjIwXCI+PGRvY3VtZW50LWFkZCAvPjwvZWwtaWNvbj48L2VsLWRpdmlkZXI+XG4gICAgICAgIDxlbC1mb3JtIDppbmxpbmU9XCJ0cnVlXCIgOm1vZGVsPVwic2F2ZVRhYnNHcm91cEZvcm1cIiBzaXplPVwic21hbGxcIiBsYWJlbC13aWR0aD1cIjEwMHB4XCI+XG4gICAgICAgICAgPGVsLWZvcm0taXRlbSBsYWJlbD1cIuagh+etvue7hOWQjVwiPlxuICAgICAgICAgICAgPGVsLWlucHV0IHYtbW9kZWw9XCJzYXZlVGFic0dyb3VwRm9ybS5ncm91cE5hbWVcIiBwbGFjZWhvbGRlcj1cIumcgOWtmOWCqOeahOagh+etvue7hOWQjVwiPjwvZWwtaW5wdXQ+XG4gICAgICAgICAgPC9lbC1mb3JtLWl0ZW0+XG4gICAgICAgICAgPGVsLWZvcm0taXRlbT5cbiAgICAgICAgICAgIDxlbC1idXR0b24gdHlwZT1cInByaW1hcnlcIiBAY2xpY2s9XCJzYXZlVGFic0dyb3VwXCI+5L+d5a2YPC9lbC1idXR0b24+XG4gICAgICAgICAgPC9lbC1mb3JtLWl0ZW0+XG4gICAgICAgIDwvZWwtZm9ybT5cbiAgICAgICAgPGVsLWRpdmlkZXI+PGVsLWljb24gOnNpemU9XCIyMFwiPjxzZXR0aW5nIC8+PC9lbC1pY29uPjwvZWwtZGl2aWRlcj5cbiAgICAgICAgPGVsLWZvcm0gOm1vZGVsPVwicmVsb2FkVGFic0dyb3VwRm9ybVwiIHNpemU9XCJzbWFsbFwiIGxhYmVsLXdpZHRoPVwiMTIwcHhcIj5cbiAgICAgICAgICA8ZWwtZm9ybS1pdGVtIGxhYmVsPVwi5qCH562+57uE5ZCNXCI+XG4gICAgICAgICAgICA8ZWwtc2VsZWN0IHYtbW9kZWw9XCJyZWxvYWRUYWJzR3JvdXBGb3JtLmdyb3VwTmFtZVwiIHBsYWNlaG9sZGVyPVwi5Yqg6L295oiW5Yig6Zmk55qE5qCH562+57uEXCI+XG4gICAgICAgICAgICAgIDxlbC1vcHRpb24gdi1mb3I9XCIodmFsdWUsIGtleSwgaW5kZXgpIGluIHNhdmVkVGFic0dyb3VwTGlzdFwiIDprZXk9XCJpbmRleFwiIDp2YWx1ZT1cImtleVwiPjwvZWwtb3B0aW9uPlxuICAgICAgICAgICAgPC9lbC1zZWxlY3Q+XG4gICAgICAgICAgPC9lbC1mb3JtLWl0ZW0+XG4gICAgICAgICAgPGVsLWZvcm0taXRlbT5cbiAgICAgICAgICAgIDxlbC1idXR0b24gdHlwZT1cInByaW1hcnlcIiAgQGNsaWNrPVwicmVsb2FkVGFic0dyb3VwXCI+5Yqg6L29PC9lbC1idXR0b24+XG4gICAgICAgICAgICA8ZWwtYnV0dG9uIEBjbGljaz1cImRlbGV0ZVRhYnNHcm91cFwiPuWIoOmZpDwvZWwtYnV0dG9uPlxuICAgICAgICAgIDwvZWwtZm9ybS1pdGVtPlxuICAgICAgICA8L2VsLWZvcm0+XG4gICAgICA8L2VsLWRpYWxvZz5cblxuICAgIDwvZWwtbWFpbj5cbiAgPC9lbC1jb250YWluZXI+XG48L3RlbXBsYXRlPlxuXG48c2NyaXB0PlxuaW1wb3J0IGF4aW9zIGZyb20gJ2F4aW9zJ1xuaW1wb3J0ICogYXMgaWNvbiBmcm9tICdAZWxlbWVudC1wbHVzL2ljb25zLXZ1ZSdcbiAgZXhwb3J0IGRlZmF1bHQge1xuICAgIG5hbWU6ICdhcHAnLFxuICAgIGRhdGEoKSB7XG4gICAgICByZXR1cm4ge1xuICAgICAgICBpY29uczogaWNvbixcbiAgICAgICAgaXNHaWY6IGZhbHNlLFxuICAgICAgICBwbmd1cmw6ICdhc3NldHMvc3RhcnQucG5nJyxcbiAgICAgICAgZ2lmdXJsOiAnYXNzZXRzL3N0YXJ0LmdpZicsXG5cbiAgICAgICAgd29ya21vZGU6IGZhbHNlLFxuXG4gICAgICAgIHRhYkRpYWxvZzogZmFsc2UsXG4gICAgICAgIHNhdmVkVGFic0dyb3VwTGlzdDoge30sXG4gICAgICAgIHNhdmVUYWJzR3JvdXBGb3JtOiB7Z3JvdXBOYW1lOiAnJ30sXG4gICAgICAgIHJlbG9hZFRhYnNHcm91cEZvcm06IHtncm91cE5hbWU6ICcnfSxcblxuICAgICAgICBzZWxlY3RWaWRlbzogZmFsc2UsXG4gICAgICAgIGJpZDogJycsXG4gICAgICAgIGFpZDogJycsXG4gICAgICAgIHZpZGVvc0RhdGE6IFtdLFxuICAgICAgICBjaWQ6ICcnLFxuXG4gICAgICAgIHBsYW5EaWFsb2c6IGZhbHNlLFxuICAgICAgICBwbGFuVHlwZTogJzAnLFxuICAgICAgICBwbGFuOiB7dGl0bGU6ICcnLCB0eXBlOiAnMCcsIHN0YXJ0VGltZTogJzAnLCBsYXN0Q2hlY2tUaW1lOiAnMCcsIGRheXM6IDAsIG1heERheXM6IDAsIGl0ZW1zOlt7bmFtZTonJywgdGFyZ2V0OjEsIGNvbXBsZXRlZDowfV19LFxuICAgICAgICBwbGFuTGlzdDoge30sXG5cbiAgICAgIH07XG4gICAgfSxcbiAgICBjcmVhdGVkICgpIHtcbiAgICAgIHRoaXMuZ2V0UGxhbkxpc3QoKTtcbiAgICAgIGNocm9tZS5zdG9yYWdlLmxvY2FsLmdldChcIndvcmttb2RlXCIsICh3b3JrbW9kZSkgPT4ge3RoaXMud29ya21vZGUgPSAodHlwZW9mKHdvcmttb2RlLndvcmttb2RlKSA9PSAndW5kZWZpbmVkJykgPyBmYWxzZSA6IHdvcmttb2RlLndvcmttb2RlfSlcbiAgICB9LFxuICAgIG1ldGhvZHM6IHtcbiAgICAgIG9wZW5PcHRpb24gKCkge1xuICAgICAgICBjaHJvbWUudGFicy5jcmVhdGUoe3VybDonb3B0aW9ucy5odG1sJ30pXG4gICAgICB9LFxuICAgICAgY2hhbmdlV29ya01vZGUgKG1vZCkge1xuICAgICAgICB0aGlzLndvcmttb2RlID0gbW9kO1xuICAgICAgICBjaHJvbWUuc3RvcmFnZS5sb2NhbC5zZXQoe1wid29ya21vZGVcIjogbW9kfSk7XG4gICAgICB9LFxuICAgICAgc2NyZWVuc2hvdCAoKSB7XG4gICAgICAgIGNocm9tZS50YWJzLmNhcHR1cmVWaXNpYmxlVGFiKG51bGwsIHtmb3JtYXQ6IFwicG5nXCIsIHF1YWxpdHk6IDEwMH0sIChpbWdfdXJsKSA9PiB7XG4gICAgICAgICAgY2hyb21lLmRvd25sb2Fkcy5kb3dubG9hZCh7dXJsOiBpbWdfdXJsLCBzYXZlQXM6IHRydWV9LCAocmVzKSA9PiB7Y29uc29sZS5sb2cocmVzKX0pO1xuICAgICAgICB9KTtcbiAgICAgIH0sXG4gICAgICBnZXRTYXZlZFRhYnNHcm91cExpc3QgKCkge1xuICAgICAgICBjaHJvbWUuc3RvcmFnZS5sb2NhbC5nZXQoXCJzYXZlZFRhYnNHcm91cExpc3RcIiwgKGVudHJ5KSA9PiB7XG4gICAgICAgICAgdGhpcy5zYXZlZFRhYnNHcm91cExpc3QgPSAodHlwZW9mKGVudHJ5LnNhdmVkVGFic0dyb3VwTGlzdCkgPT0gJ3VuZGVmaW5lZCcpID8ge30gOiBlbnRyeS5zYXZlZFRhYnNHcm91cExpc3Q7XG4gICAgICAgIH0pO1xuICAgICAgfSxcbiAgICAgIHNhdmVUYWJzR3JvdXAgKCkge1xuICAgICAgICBjaHJvbWUudGFicy5xdWVyeSh7Y3VycmVudFdpbmRvdzogdHJ1ZX0sICh0YWJzKSA9PiB7XG4gICAgICAgICAgdmFyIHVybHMgPSB0YWJzLm1hcCgodGFiKSA9PiB7cmV0dXJuIHRhYi51cmx9KTtcbiAgICAgICAgICB0aGlzLnNhdmVkVGFic0dyb3VwTGlzdFt0aGlzLnNhdmVUYWJzR3JvdXBGb3JtLmdyb3VwTmFtZV0gPSB1cmxzO1xuICAgICAgICAgIGNocm9tZS5zdG9yYWdlLmxvY2FsLnNldCh7XCJzYXZlZFRhYnNHcm91cExpc3RcIjp0aGlzLnNhdmVkVGFic0dyb3VwTGlzdH0pO1xuICAgICAgICAgIHRoaXMuc2F2ZVRhYnNHcm91cEZvcm0uZ3JvdXBOYW1lID0gJydcbiAgICAgICAgICB0aGlzLnNob3dOb3RpZmljYXRpb24oXCLkv53lrZjmiJDlip9cIilcbiAgICAgICAgfSk7XG4gICAgICB9LFxuICAgICAgcmVsb2FkVGFic0dyb3VwICgpIHtcbiAgICAgICAgY2hyb21lLnN0b3JhZ2UubG9jYWwuZ2V0KFwic2F2ZWRUYWJzR3JvdXBMaXN0XCIsIChlbnRyeSkgPT4ge1xuICAgICAgICAgIHZhciBncm91cCA9IE9iamVjdC52YWx1ZXMoZW50cnkuc2F2ZWRUYWJzR3JvdXBMaXN0W3RoaXMucmVsb2FkVGFic0dyb3VwRm9ybS5ncm91cE5hbWVdKVxuICAgICAgICAgIGdyb3VwLmZvckVhY2goVVJMID0+IHtjaHJvbWUudGFicy5jcmVhdGUoe3VybDpVUkx9KX0pO1xuICAgICAgICB9KTtcbiAgICAgIH0sXG4gICAgICBkZWxldGVUYWJzR3JvdXAgKCkge1xuICAgICAgICBkZWxldGUgdGhpcy5zYXZlZFRhYnNHcm91cExpc3RbdGhpcy5yZWxvYWRUYWJzR3JvdXBGb3JtLmdyb3VwTmFtZV07XG4gICAgICAgIGNocm9tZS5zdG9yYWdlLmxvY2FsLnNldCh7XCJzYXZlZFRhYnNHcm91cExpc3RcIjp0aGlzLnNhdmVkVGFic0dyb3VwTGlzdH0pO1xuICAgICAgICB0aGlzLnNob3dOb3RpZmljYXRpb24oJ+WIoOmZpOaIkOWKnycpO1xuICAgICAgICB0aGlzLnJlbG9hZFRhYnNHcm91cEZvcm0uZ3JvdXBOYW1lID0gJyc7XG4gICAgICB9LFxuICAgICAgZ2V0VmlkZW9MaXN0ICgpIHtcbiAgICAgICAgY2hyb21lLnRhYnMucXVlcnkoe2N1cnJlbnRXaW5kb3c6IHRydWUsIGFjdGl2ZTogdHJ1ZX0sICh0YWJzKSA9PiB7XG4gICAgICAgICAgdmFyIGJ2ID0gdGFic1swXS51cmwubWF0Y2goL1tcXHNcXFNdKihCVlthLXp8QS1afDAtOV17MTB9KVtcXHNcXFNdKi8pWzFdO1xuICAgICAgICAgIHRoaXMuYmlkID0gYnY7XG4gICAgICAgICAgdmFyIGFpZE1vZGVsID0gXCJodHRwczovL2FwaS5iaWxpYmlsaS5jb20veC93ZWItaW50ZXJmYWNlL2FyY2hpdmUvc3RhdD9idmlkPVwiO1xuICAgICAgICAgIHZhciBjaWRNb2RlbCA9IFwiaHR0cHM6Ly9hcGkuYmlsaWJpbGkuY29tL3gvcGxheWVyL3BhZ2VsaXN0P2J2aWQ9XCI7XG4gICAgICAgICAgbGV0IHJlcXVlc3RzID0gW107XG4gICAgICAgICAgbGV0IGdldEFpZCA9IG5ldyBQcm9taXNlKChyZXNvbHZlKSA9PiB7XG4gICAgICAgICAgICBheGlvcyh7bWV0aG9kOiBcIkdFVFwiLCB1cmw6IGFpZE1vZGVsICsgYnZ9KS50aGVuKHJlcyA9PiByZXNvbHZlKHJlcykpO1xuICAgICAgICAgIH0pO1xuICAgICAgICAgIHJlcXVlc3RzLnB1c2goZ2V0QWlkKTtcbiAgICAgICAgICBsZXQgZ2V0Q2lkID0gbmV3IFByb21pc2UoKHJlc29sdmUpID0+IHtcbiAgICAgICAgICAgIGF4aW9zKHttZXRob2Q6IFwiR0VUXCIsIHVybDogY2lkTW9kZWwgKyBidn0pLnRoZW4ocmVzID0+IHJlc29sdmUocmVzKSk7XG4gICAgICAgICAgfSk7XG4gICAgICAgICAgcmVxdWVzdHMucHVzaChnZXRDaWQpO1xuICAgICAgICAgIFByb21pc2UuYWxsKHJlcXVlc3RzKS50aGVuKChyZXBsaXN0KSA9PiB7XG4gICAgICAgICAgICB0aGlzLmFpZCA9IHJlcGxpc3RbMF0uZGF0YS5kYXRhLmFpZDtcbiAgICAgICAgICAgIHRoaXMudmlkZW9zRGF0YSA9IHJlcGxpc3RbMV0uZGF0YS5kYXRhO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICAgIH0sXG4gICAgICBkb3dubG9hZEJpbGlQaWMgKCkge1xuICAgICAgICB2YXIgcmVxID0gXCJodHRwczovL2FwaS5iaWxpYmlsaS5jb20veC93ZWItaW50ZXJmYWNlL3ZpZXc/anNvbnA9anNvbnAmYnZpZD1cIiArIHRoaXMuYmlkO1xuICAgICAgICBheGlvcyh7bWV0aG9kOiBcIkdFVFwiLCB1cmw6IHJlcX0pLnRoZW4oKHJlcykgPT4ge1xuICAgICAgICAgIHZhciBwaWNVUkwgPSByZXMuZGF0YS5kYXRhLnBpYztcbiAgICAgICAgICBjaHJvbWUuZG93bmxvYWRzLmRvd25sb2FkKHt1cmw6IHBpY1VSTCwgc2F2ZUFzOiB0cnVlLCBtZXRob2Q6IFwiR0VUXCJ9KTtcbiAgICAgICAgfSlcbiAgICAgIH0sXG4gICAgICBkb3dubG9hZEJpbGlWaWRlbyAoY2lkKSB7XG4gICAgICAgIHZhciByZXEgPSBcImh0dHBzOi8vYXBpLmJpbGliaWxpLmNvbS94L3BsYXllci9wbGF5dXJsP2F2aWQ9XCIrIHRoaXMuYWlkICtcIiZjaWQ9XCIrIGNpZCArXCImcW49MSZ0eXBlPSZvdHlwZT1qc29uJnBsYXRmb3JtPWh0bWw1JmhpZ2hfcXVhbGl0eT0xXCI7XG4gICAgICAgIGF4aW9zKHttZXRob2Q6IFwiR0VUXCIsIHVybDogcmVxfSkudGhlbigocmVzKSA9PiB7XG4gICAgICAgICAgdmFyIHZpZGVvVVJMID0gcmVzLmRhdGEuZGF0YS5kdXJsWzBdLnVybDtcbiAgICAgICAgICBjaHJvbWUuZG93bmxvYWRzLmRvd25sb2FkKHt1cmw6IHZpZGVvVVJMLCBzYXZlQXM6IHRydWUsIG1ldGhvZDogXCJHRVRcIn0sIChpZCkgPT4ge1xuICAgICAgICAgICAgY2hyb21lLmRvd25sb2Fkcy5vbkNoYW5nZWQuYWRkTGlzdGVuZXIoKGRlbHRhKSA9PiB7XG4gICAgICAgICAgICAgIGlmIChkZWx0YS5pZCA9PSBpZCAmJiBkZWx0YS5lcnJvciAhPSBcInVuZGVmaW5lZFwiKSB7XG4gICAgICAgICAgICAgICAgY2hyb21lLmRvd25sb2Fkcy5yZXN1bWUoaWQpOyAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICB9KTtcbiAgICAgICAgfSlcbiAgICAgIH0sXG4gICAgICBhZGRQbGFuSXRlbSgpIHtcbiAgICAgICAgdGhpcy5wbGFuLml0ZW1zLnB1c2goe25hbWU6JycsIHRhcmdldDoxLCBjb21wbGV0ZWQ6MH0pO1xuICAgICAgfSxcbiAgICAgIHJlbW92ZVBsYW5JdGVtKGluZGV4KSB7XG4gICAgICAgIHRoaXMucGxhbi5pdGVtcy5zcGxpY2UoaW5kZXgsIDEpO1xuICAgICAgfSxcbiAgICAgIGFkZFBsYW4oKSB7XG4gICAgICAgIGlmKHRoaXMucGxhbi50aXRsZT09JycpXG4gICAgICAgICAgcmV0dXJuXG4gICAgICAgIHRoaXMucGxhbi50eXBlID0gdGhpcy5wbGFuVHlwZTtcbiAgICAgICAgdGhpcy5wbGFuLnN0YXJ0VGltZSA9ICcwJztcbiAgICAgICAgdGhpcy5wbGFuTGlzdFt0aGlzLnBsYW4udGl0bGVdID0gdGhpcy5wbGFuO1xuICAgICAgICBjaHJvbWUuc3RvcmFnZS5sb2NhbC5zZXQoe1wicGxhbkxpc3RcIjp0aGlzLnBsYW5MaXN0fSk7XG4gICAgICAgIHRoaXMucGxhbiA9IHt0aXRsZTogJycsIHR5cGU6ICcwJywgc3RhcnRUaW1lOiAnMCcsIGxhc3RDaGVja1RpbWU6ICcwJywgZGF5czogMCwgbWF4RGF5czogMCwgaXRlbXM6W3tuYW1lOicnLCB0YXJnZXQ6MSwgY29tcGxldGVkOjB9XX07XG4gICAgICAgIHRoaXMucGxhbkRpYWxvZz1mYWxzZTtcbiAgICAgIH0sXG4gICAgICBnZXRQbGFuTGlzdCgpIHtcbiAgICAgICAgY2hyb21lLnN0b3JhZ2UubG9jYWwuZ2V0KFwicGxhbkxpc3RcIiwgKGVudHJ5KSA9PiB7XG4gICAgICAgICAgdGhpcy5wbGFuTGlzdCA9ICh0eXBlb2YoZW50cnkucGxhbkxpc3QpID09ICd1bmRlZmluZWQnKSA/IHt9IDogZW50cnkucGxhbkxpc3Q7XG4gICAgICAgICAgdGhpcy5jaGVja1BsYW5MaXN0KCk7XG4gICAgICAgIH0pO1xuICAgICAgfSxcbiAgICAgIGNvbXB1dGVQZXJjZW50YWdlKGl0ZW1zKSB7XG4gICAgICAgIHZhciBudW0gPSAwO1xuICAgICAgICBpdGVtcyA9IE9iamVjdC52YWx1ZXMoaXRlbXMpXG4gICAgICAgIGl0ZW1zLmZvckVhY2goKGl0ZW0pID0+IHtudW0gKz0gaXRlbS5jb21wbGV0ZWQgLyBpdGVtLnRhcmdldH0pXG4gICAgICAgIHJldHVybiBNYXRoLnJvdW5kKDEwMCAqIG51bSAvIGl0ZW1zLmxlbmd0aCk7XG4gICAgICB9LFxuICAgICAgaGFuZGxlUGxhbkNoYW5nZShpdGVtcykge1xuICAgICAgICBpZiAodGhpcy5jb21wdXRlUGVyY2VudGFnZShpdGVtcykgPT0gMTAwKSB7XG4gICAgICAgICAgdGhpcy5zaG93Tm90aWZpY2F0aW9uKFwi5aW95aW95aW977yBXCIpO1xuICAgICAgICB9XG4gICAgICAgIGNocm9tZS5zdG9yYWdlLmxvY2FsLnNldCh7XCJwbGFuTGlzdFwiOnRoaXMucGxhbkxpc3R9KTtcbiAgICAgIH0sXG4gICAgICBzaG93Tm90aWZpY2F0aW9uKG50Zikge1xuICAgICAgICB2YXIgbXNnID0gJzxzcGFuPjxpbWcgc3JjPVwiYXNzZXRzL3h4eS5wbmdcIiBhbHQ9XCJ4eHlcIiB3aWR0aD1cIjI1JVwiIHN0eWxlPVwidmVydGljYWwtYWxpZ246bWlkZGxlXCI+PGgyIGNvbG9yPVwiIzU3NjY5MFwiIHN0eWxlPVwiZGlzcGxheTogaW5saW5lOyB2ZXJ0aWNhbC1hbGlnbjptaWRkbGVcIj4mZW1zcDsnK250ZisnPC9oMj48L3NwYW4+JztcbiAgICAgICAgdGhpcy4kbm90aWZ5KHtcbiAgICAgICAgICBkYW5nZXJvdXNseVVzZUhUTUxTdHJpbmc6IHRydWUsXG4gICAgICAgICAgbWVzc2FnZTogbXNnLFxuICAgICAgICAgIGR1cmF0aW9uOiAxMDAwXG4gICAgICAgIH0pO1xuICAgICAgfSxcbiAgICAgIGNoZWNrUGxhbihwbGFuKSB7XG4gICAgICAgIHZhciBkYXRlID0gbmV3IERhdGUoKTtcbiAgICAgICAgdmFyIGRhdGVTdHIgPSBkYXRlLmdldEZ1bGxZZWFyKCkrICctJyArIChkYXRlLmdldE1vbnRoKCkgKyAxKSArICctJyArIGRhdGUuZ2V0RGF0ZSgpO1xuICAgICAgICBpZiAocGxhbi5zdGFydFRpbWUgPT0gJzAnKSB7XG4gICAgICAgICAgcGxhbi5zdGFydFRpbWUgPSBkYXRlU3RyO1xuICAgICAgICB9XG4gICAgICAgIHBsYW4ubGFzdENoZWNrVGltZSA9IGRhdGVTdHI7XG4gICAgICAgIHBsYW4uZGF5cyA9IDEgKyAoRGF0ZS5wYXJzZShwbGFuLmxhc3RDaGVja1RpbWUpIC0gRGF0ZS5wYXJzZShwbGFuLnN0YXJ0VGltZSkpIC8gKDI0ICogMzYwMCAqIDEwMDApO1xuICAgICAgICBpZiAocGxhbi5tYXhEYXlzIDwgcGxhbi5kYXlzKSB7XG4gICAgICAgICAgcGxhbi5tYXhEYXlzID0gcGxhbi5kYXlzO1xuICAgICAgICB9XG4gICAgICAgIGNocm9tZS5zdG9yYWdlLmxvY2FsLnNldCh7XCJwbGFuTGlzdFwiOnRoaXMucGxhbkxpc3R9KTtcbiAgICAgIH0sXG4gICAgICBkZWxldGVQbGFuKHBsYW4pIHtcbiAgICAgICAgZGVsZXRlIHRoaXMucGxhbkxpc3RbcGxhbl07XG4gICAgICAgIGNocm9tZS5zdG9yYWdlLmxvY2FsLnNldCh7XCJwbGFuTGlzdFwiOnRoaXMucGxhbkxpc3R9KTtcbiAgICAgIH0sXG4gICAgICBjaGVja1BsYW5MaXN0KCkge1xuICAgICAgICBPYmplY3QudmFsdWVzKHRoaXMucGxhbkxpc3QpLmZvckVhY2goKHBsYW4pID0+IHtcbiAgICAgICAgICB2YXIgZGF0ZSA9IG5ldyBEYXRlKCk7XG4gICAgICAgICAgdmFyIGRhdGVTdHIgPSBkYXRlLmdldEZ1bGxZZWFyKCkrICctJyArIChkYXRlLmdldE1vbnRoKCkgKyAxKSArICctJyArIGRhdGUuZ2V0RGF0ZSgpO1xuICAgICAgICAgIGlmIChEYXRlLnBhcnNlKGRhdGVTdHIpIC0gRGF0ZS5wYXJzZShwbGFuLmxhc3RDaGVja1RpbWUpID4gKDI0ICogMzYwMCAqIDEwMDApKSB7XG4gICAgICAgICAgICBwbGFuLnN0YXJ0VGltZSA9ICcwJztcbiAgICAgICAgICAgIHBsYW4ubGFzdENoZWNrVGltZSA9ICcwJztcbiAgICAgICAgICAgIHBsYW4uZGF5cyA9IDA7XG4gICAgICAgICAgfVxuICAgICAgICB9KVxuICAgICAgfVxuICAgIH1cbiAgfTtcbjwvc2NyaXB0PlxuXG48c3R5bGU+XG4ubWFpbl9hcHAge1xuICBmb250LWZhbWlseTogJ0F2ZW5pcicsIEhlbHZldGljYSwgQXJpYWwsIHNhbnMtc2VyaWY7XG4gIC13ZWJraXQtZm9udC1zbW9vdGhpbmc6IGFudGlhbGlhc2VkO1xuICAtbW96LW9zeC1mb250LXNtb290aGluZzogZ3JheXNjYWxlO1xuICAvKiB0ZXh0LWFsaWduOiBjZW50ZXI7ICovXG4gIGNvbG9yOiAjMmMzZTUwO1xuICBtYXJnaW4tdG9wOiAwcHg7XG59XG5cbi5wbGFuX2l0ZW1zIHB7XG4gIGNvbG9yOiAjNDQ0O1xuICBmb250LXNpemU6IDIycHg7XG4gIG1hcmdpbjogMHB4IDBweCA1cHggMHB4O1xufVxuLnBsYW5fZGF5cyBwe1xuICBjb2xvcjogIzU3NjY5MDtcbiAgZm9udC1zaXplOiAyOHB4O1xuICBtYXJnaW46IDBweCAwcHggMTBweCAwcHg7XG59XG4ucGxhbl9kYXlzIC5lbC1jYXJke1xuICBwYWRkaW5nOiAwJTtcbn1cbi5wbGFuX2l0ZW1zIC5lbC1yb3d7XG4gIG1hcmdpbjogMHB4IDBweCA1cHggMHB4O1xuICBjb2xvcjogIzY2NjtcbiAgZm9udC1zaXplOiAxNnB4O1xufVxuLnBsYW5faXRlbXMgLmVsLXJvdyAuZWwtaW5wdXQtbnVtYmVye1xuICBtYXgtd2lkdGg6IDEwMCU7XG59XG48L3N0eWxlPlxuIiwiaW1wb3J0IHsgY3JlYXRlQXBwIH0gZnJvbSAndnVlJ1xuaW1wb3J0IEFwcCBmcm9tICcuL0FwcC9BcHAudnVlJ1xuaW1wb3J0IEVsZW1lbnRQbHVzIGZyb20gJ2VsZW1lbnQtcGx1cydcbmltcG9ydCAnZWxlbWVudC1wbHVzL2Rpc3QvaW5kZXguY3NzJztcbmltcG9ydCAqIGFzIEVsZW1lbnRQbHVzSWNvbnNWdWUgZnJvbSAnQGVsZW1lbnQtcGx1cy9pY29ucy12dWUnXG5cbmNvbnN0IGFwcCA9IGNyZWF0ZUFwcChBcHApXG5mb3IoY29uc3QgaWNvbiBpbiBFbGVtZW50UGx1c0ljb25zVnVlKSB7XG4gICAgYXBwLmNvbXBvbmVudChpY29uLCBFbGVtZW50UGx1c0ljb25zVnVlW2ljb25dKVxufVxuYXBwLnVzZShFbGVtZW50UGx1cykubW91bnQoJyNhcHAnKSIsIi8vIEltcG9ydHNcbmltcG9ydCBfX19DU1NfTE9BREVSX0FQSV9OT19TT1VSQ0VNQVBfSU1QT1JUX19fIGZyb20gXCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvbm9Tb3VyY2VNYXBzLmpzXCI7XG5pbXBvcnQgX19fQ1NTX0xPQURFUl9BUElfSU1QT1JUX19fIGZyb20gXCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvYXBpLmpzXCI7XG52YXIgX19fQ1NTX0xPQURFUl9FWFBPUlRfX18gPSBfX19DU1NfTE9BREVSX0FQSV9JTVBPUlRfX18oX19fQ1NTX0xPQURFUl9BUElfTk9fU09VUkNFTUFQX0lNUE9SVF9fXyk7XG4vLyBNb2R1bGVcbl9fX0NTU19MT0FERVJfRVhQT1JUX19fLnB1c2goW21vZHVsZS5pZCwgXCJcXG4ubWFpbl9hcHAge1xcbiAgZm9udC1mYW1pbHk6ICdBdmVuaXInLCBIZWx2ZXRpY2EsIEFyaWFsLCBzYW5zLXNlcmlmO1xcbiAgLXdlYmtpdC1mb250LXNtb290aGluZzogYW50aWFsaWFzZWQ7XFxuICAtbW96LW9zeC1mb250LXNtb290aGluZzogZ3JheXNjYWxlO1xcbiAgLyogdGV4dC1hbGlnbjogY2VudGVyOyAqL1xcbiAgY29sb3I6ICMyYzNlNTA7XFxuICBtYXJnaW4tdG9wOiAwcHg7XFxufVxcbi5wbGFuX2l0ZW1zIHB7XFxuICBjb2xvcjogIzQ0NDtcXG4gIGZvbnQtc2l6ZTogMjJweDtcXG4gIG1hcmdpbjogMHB4IDBweCA1cHggMHB4O1xcbn1cXG4ucGxhbl9kYXlzIHB7XFxuICBjb2xvcjogIzU3NjY5MDtcXG4gIGZvbnQtc2l6ZTogMjhweDtcXG4gIG1hcmdpbjogMHB4IDBweCAxMHB4IDBweDtcXG59XFxuLnBsYW5fZGF5cyAuZWwtY2FyZHtcXG4gIHBhZGRpbmc6IDAlO1xcbn1cXG4ucGxhbl9pdGVtcyAuZWwtcm93e1xcbiAgbWFyZ2luOiAwcHggMHB4IDVweCAwcHg7XFxuICBjb2xvcjogIzY2NjtcXG4gIGZvbnQtc2l6ZTogMTZweDtcXG59XFxuLnBsYW5faXRlbXMgLmVsLXJvdyAuZWwtaW5wdXQtbnVtYmVye1xcbiAgbWF4LXdpZHRoOiAxMDAlO1xcbn1cXG5cIiwgXCJcIl0pO1xuLy8gRXhwb3J0c1xuZXhwb3J0IGRlZmF1bHQgX19fQ1NTX0xPQURFUl9FWFBPUlRfX187XG4iLCJpbXBvcnQgeyByZW5kZXIgfSBmcm9tIFwiLi9BcHAudnVlP3Z1ZSZ0eXBlPXRlbXBsYXRlJmlkPWEwZTE0MGYyXCJcbmltcG9ydCBzY3JpcHQgZnJvbSBcIi4vQXBwLnZ1ZT92dWUmdHlwZT1zY3JpcHQmbGFuZz1qc1wiXG5leHBvcnQgKiBmcm9tIFwiLi9BcHAudnVlP3Z1ZSZ0eXBlPXNjcmlwdCZsYW5nPWpzXCJcblxuaW1wb3J0IFwiLi9BcHAudnVlP3Z1ZSZ0eXBlPXN0eWxlJmluZGV4PTAmaWQ9YTBlMTQwZjImbGFuZz1jc3NcIlxuXG5pbXBvcnQgZXhwb3J0Q29tcG9uZW50IGZyb20gXCIvVXNlcnMvd2FuZ3pmL0RvY3VtZW50cy9DaHJvbWUtYXZhL2V4dC9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9kaXN0L2V4cG9ydEhlbHBlci5qc1wiXG5jb25zdCBfX2V4cG9ydHNfXyA9IC8qI19fUFVSRV9fKi9leHBvcnRDb21wb25lbnQoc2NyaXB0LCBbWydyZW5kZXInLHJlbmRlcl0sWydfX2ZpbGUnLFwic3JjL3BvcHVwL0FwcC9BcHAudnVlXCJdXSlcbi8qIGhvdCByZWxvYWQgKi9cbmlmIChtb2R1bGUuaG90KSB7XG4gIF9fZXhwb3J0c19fLl9faG1ySWQgPSBcImEwZTE0MGYyXCJcbiAgY29uc3QgYXBpID0gX19WVUVfSE1SX1JVTlRJTUVfX1xuICBtb2R1bGUuaG90LmFjY2VwdCgpXG4gIGlmICghYXBpLmNyZWF0ZVJlY29yZCgnYTBlMTQwZjInLCBfX2V4cG9ydHNfXykpIHtcbiAgICBhcGkucmVsb2FkKCdhMGUxNDBmMicsIF9fZXhwb3J0c19fKVxuICB9XG4gIFxuICBtb2R1bGUuaG90LmFjY2VwdChcIi4vQXBwLnZ1ZT92dWUmdHlwZT10ZW1wbGF0ZSZpZD1hMGUxNDBmMlwiLCAoKSA9PiB7XG4gICAgYXBpLnJlcmVuZGVyKCdhMGUxNDBmMicsIHJlbmRlcilcbiAgfSlcblxufVxuXG5cbmV4cG9ydCBkZWZhdWx0IF9fZXhwb3J0c19fIiwiZXhwb3J0IHsgZGVmYXVsdCB9IGZyb20gXCItIS4uLy4uLy4uL25vZGVfbW9kdWxlcy9iYWJlbC1sb2FkZXIvbGliL2luZGV4LmpzPz9jbG9uZWRSdWxlU2V0LTQwLnVzZVswXSEuLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9kaXN0L2luZGV4LmpzPz9ydWxlU2V0WzBdLnVzZVswXSEuL0FwcC52dWU/dnVlJnR5cGU9c2NyaXB0Jmxhbmc9anNcIjsgZXhwb3J0ICogZnJvbSBcIi0hLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2JhYmVsLWxvYWRlci9saWIvaW5kZXguanM/P2Nsb25lZFJ1bGVTZXQtNDAudXNlWzBdIS4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2Rpc3QvaW5kZXguanM/P3J1bGVTZXRbMF0udXNlWzBdIS4vQXBwLnZ1ZT92dWUmdHlwZT1zY3JpcHQmbGFuZz1qc1wiIiwiZXhwb3J0ICogZnJvbSBcIi0hLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2JhYmVsLWxvYWRlci9saWIvaW5kZXguanM/P2Nsb25lZFJ1bGVTZXQtNDAudXNlWzBdIS4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2Rpc3QvdGVtcGxhdGVMb2FkZXIuanM/P3J1bGVTZXRbMV0ucnVsZXNbM10hLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvZGlzdC9pbmRleC5qcz8/cnVsZVNldFswXS51c2VbMF0hLi9BcHAudnVlP3Z1ZSZ0eXBlPXRlbXBsYXRlJmlkPWEwZTE0MGYyXCIiLCJleHBvcnQgKiBmcm9tIFwiLSEuLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLXN0eWxlLWxvYWRlci9pbmRleC5qcz8/Y2xvbmVkUnVsZVNldC0xMi51c2VbMF0hLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9janMuanM/P2Nsb25lZFJ1bGVTZXQtMTIudXNlWzFdIS4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2Rpc3Qvc3R5bGVQb3N0TG9hZGVyLmpzIS4uLy4uLy4uL25vZGVfbW9kdWxlcy9wb3N0Y3NzLWxvYWRlci9kaXN0L2Nqcy5qcz8/Y2xvbmVkUnVsZVNldC0xMi51c2VbMl0hLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvZGlzdC9pbmRleC5qcz8/cnVsZVNldFswXS51c2VbMF0hLi9BcHAudnVlP3Z1ZSZ0eXBlPXN0eWxlJmluZGV4PTAmaWQ9YTBlMTQwZjImbGFuZz1jc3NcIiIsIi8vIHN0eWxlLWxvYWRlcjogQWRkcyBzb21lIGNzcyB0byB0aGUgRE9NIGJ5IGFkZGluZyBhIDxzdHlsZT4gdGFnXG5cbi8vIGxvYWQgdGhlIHN0eWxlc1xudmFyIGNvbnRlbnQgPSByZXF1aXJlKFwiISEuLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L2Nqcy5qcz8/Y2xvbmVkUnVsZVNldC0xMi51c2VbMV0hLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvZGlzdC9zdHlsZVBvc3RMb2FkZXIuanMhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Bvc3Rjc3MtbG9hZGVyL2Rpc3QvY2pzLmpzPz9jbG9uZWRSdWxlU2V0LTEyLnVzZVsyXSEuLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9kaXN0L2luZGV4LmpzPz9ydWxlU2V0WzBdLnVzZVswXSEuL0FwcC52dWU/dnVlJnR5cGU9c3R5bGUmaW5kZXg9MCZpZD1hMGUxNDBmMiZsYW5nPWNzc1wiKTtcbmlmKGNvbnRlbnQuX19lc01vZHVsZSkgY29udGVudCA9IGNvbnRlbnQuZGVmYXVsdDtcbmlmKHR5cGVvZiBjb250ZW50ID09PSAnc3RyaW5nJykgY29udGVudCA9IFtbbW9kdWxlLmlkLCBjb250ZW50LCAnJ11dO1xuaWYoY29udGVudC5sb2NhbHMpIG1vZHVsZS5leHBvcnRzID0gY29udGVudC5sb2NhbHM7XG4vLyBhZGQgdGhlIHN0eWxlcyB0byB0aGUgRE9NXG52YXIgYWRkID0gcmVxdWlyZShcIiEuLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLXN0eWxlLWxvYWRlci9saWIvYWRkU3R5bGVzQ2xpZW50LmpzXCIpLmRlZmF1bHRcbnZhciB1cGRhdGUgPSBhZGQoXCIwZTE0ZmYyNlwiLCBjb250ZW50LCBmYWxzZSwge1wic291cmNlTWFwXCI6ZmFsc2UsXCJzaGFkb3dNb2RlXCI6ZmFsc2V9KTtcbi8vIEhvdCBNb2R1bGUgUmVwbGFjZW1lbnRcbmlmKG1vZHVsZS5ob3QpIHtcbiAvLyBXaGVuIHRoZSBzdHlsZXMgY2hhbmdlLCB1cGRhdGUgdGhlIDxzdHlsZT4gdGFnc1xuIGlmKCFjb250ZW50LmxvY2Fscykge1xuICAgbW9kdWxlLmhvdC5hY2NlcHQoXCIhIS4uLy4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvY2pzLmpzPz9jbG9uZWRSdWxlU2V0LTEyLnVzZVsxXSEuLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9kaXN0L3N0eWxlUG9zdExvYWRlci5qcyEuLi8uLi8uLi9ub2RlX21vZHVsZXMvcG9zdGNzcy1sb2FkZXIvZGlzdC9janMuanM/P2Nsb25lZFJ1bGVTZXQtMTIudXNlWzJdIS4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2Rpc3QvaW5kZXguanM/P3J1bGVTZXRbMF0udXNlWzBdIS4vQXBwLnZ1ZT92dWUmdHlwZT1zdHlsZSZpbmRleD0wJmlkPWEwZTE0MGYyJmxhbmc9Y3NzXCIsIGZ1bmN0aW9uKCkge1xuICAgICB2YXIgbmV3Q29udGVudCA9IHJlcXVpcmUoXCIhIS4uLy4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvY2pzLmpzPz9jbG9uZWRSdWxlU2V0LTEyLnVzZVsxXSEuLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9kaXN0L3N0eWxlUG9zdExvYWRlci5qcyEuLi8uLi8uLi9ub2RlX21vZHVsZXMvcG9zdGNzcy1sb2FkZXIvZGlzdC9janMuanM/P2Nsb25lZFJ1bGVTZXQtMTIudXNlWzJdIS4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2Rpc3QvaW5kZXguanM/P3J1bGVTZXRbMF0udXNlWzBdIS4vQXBwLnZ1ZT92dWUmdHlwZT1zdHlsZSZpbmRleD0wJmlkPWEwZTE0MGYyJmxhbmc9Y3NzXCIpO1xuICAgICBpZihuZXdDb250ZW50Ll9fZXNNb2R1bGUpIG5ld0NvbnRlbnQgPSBuZXdDb250ZW50LmRlZmF1bHQ7XG4gICAgIGlmKHR5cGVvZiBuZXdDb250ZW50ID09PSAnc3RyaW5nJykgbmV3Q29udGVudCA9IFtbbW9kdWxlLmlkLCBuZXdDb250ZW50LCAnJ11dO1xuICAgICB1cGRhdGUobmV3Q29udGVudCk7XG4gICB9KTtcbiB9XG4gLy8gV2hlbiB0aGUgbW9kdWxlIGlzIGRpc3Bvc2VkLCByZW1vdmUgdGhlIDxzdHlsZT4gdGFnc1xuIG1vZHVsZS5ob3QuZGlzcG9zZShmdW5jdGlvbigpIHsgdXBkYXRlKCk7IH0pO1xufSIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0aWQ6IG1vZHVsZUlkLFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4vLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuX193ZWJwYWNrX3JlcXVpcmVfXy5tID0gX193ZWJwYWNrX21vZHVsZXNfXztcblxuIiwidmFyIGRlZmVycmVkID0gW107XG5fX3dlYnBhY2tfcmVxdWlyZV9fLk8gPSBmdW5jdGlvbihyZXN1bHQsIGNodW5rSWRzLCBmbiwgcHJpb3JpdHkpIHtcblx0aWYoY2h1bmtJZHMpIHtcblx0XHRwcmlvcml0eSA9IHByaW9yaXR5IHx8IDA7XG5cdFx0Zm9yKHZhciBpID0gZGVmZXJyZWQubGVuZ3RoOyBpID4gMCAmJiBkZWZlcnJlZFtpIC0gMV1bMl0gPiBwcmlvcml0eTsgaS0tKSBkZWZlcnJlZFtpXSA9IGRlZmVycmVkW2kgLSAxXTtcblx0XHRkZWZlcnJlZFtpXSA9IFtjaHVua0lkcywgZm4sIHByaW9yaXR5XTtcblx0XHRyZXR1cm47XG5cdH1cblx0dmFyIG5vdEZ1bGZpbGxlZCA9IEluZmluaXR5O1xuXHRmb3IgKHZhciBpID0gMDsgaSA8IGRlZmVycmVkLmxlbmd0aDsgaSsrKSB7XG5cdFx0dmFyIGNodW5rSWRzID0gZGVmZXJyZWRbaV1bMF07XG5cdFx0dmFyIGZuID0gZGVmZXJyZWRbaV1bMV07XG5cdFx0dmFyIHByaW9yaXR5ID0gZGVmZXJyZWRbaV1bMl07XG5cdFx0dmFyIGZ1bGZpbGxlZCA9IHRydWU7XG5cdFx0Zm9yICh2YXIgaiA9IDA7IGogPCBjaHVua0lkcy5sZW5ndGg7IGorKykge1xuXHRcdFx0aWYgKChwcmlvcml0eSAmIDEgPT09IDAgfHwgbm90RnVsZmlsbGVkID49IHByaW9yaXR5KSAmJiBPYmplY3Qua2V5cyhfX3dlYnBhY2tfcmVxdWlyZV9fLk8pLmV2ZXJ5KGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXy5PW2tleV0oY2h1bmtJZHNbal0pOyB9KSkge1xuXHRcdFx0XHRjaHVua0lkcy5zcGxpY2Uoai0tLCAxKTtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdGZ1bGZpbGxlZCA9IGZhbHNlO1xuXHRcdFx0XHRpZihwcmlvcml0eSA8IG5vdEZ1bGZpbGxlZCkgbm90RnVsZmlsbGVkID0gcHJpb3JpdHk7XG5cdFx0XHR9XG5cdFx0fVxuXHRcdGlmKGZ1bGZpbGxlZCkge1xuXHRcdFx0ZGVmZXJyZWQuc3BsaWNlKGktLSwgMSlcblx0XHRcdHZhciByID0gZm4oKTtcblx0XHRcdGlmIChyICE9PSB1bmRlZmluZWQpIHJlc3VsdCA9IHI7XG5cdFx0fVxuXHR9XG5cdHJldHVybiByZXN1bHQ7XG59OyIsIi8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcblx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG5cdFx0ZnVuY3Rpb24oKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG5cdFx0ZnVuY3Rpb24oKSB7IHJldHVybiBtb2R1bGU7IH07XG5cdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsIHsgYTogZ2V0dGVyIH0pO1xuXHRyZXR1cm4gZ2V0dGVyO1xufTsiLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBkZWZpbml0aW9uKSB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18uZyA9IChmdW5jdGlvbigpIHtcblx0aWYgKHR5cGVvZiBnbG9iYWxUaGlzID09PSAnb2JqZWN0JykgcmV0dXJuIGdsb2JhbFRoaXM7XG5cdHRyeSB7XG5cdFx0cmV0dXJuIHRoaXMgfHwgbmV3IEZ1bmN0aW9uKCdyZXR1cm4gdGhpcycpKCk7XG5cdH0gY2F0Y2ggKGUpIHtcblx0XHRpZiAodHlwZW9mIHdpbmRvdyA9PT0gJ29iamVjdCcpIHJldHVybiB3aW5kb3c7XG5cdH1cbn0pKCk7IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqLCBwcm9wKSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKTsgfSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5iID0gZG9jdW1lbnQuYmFzZVVSSSB8fCBzZWxmLmxvY2F0aW9uLmhyZWY7XG5cbi8vIG9iamVjdCB0byBzdG9yZSBsb2FkZWQgYW5kIGxvYWRpbmcgY2h1bmtzXG4vLyB1bmRlZmluZWQgPSBjaHVuayBub3QgbG9hZGVkLCBudWxsID0gY2h1bmsgcHJlbG9hZGVkL3ByZWZldGNoZWRcbi8vIFtyZXNvbHZlLCByZWplY3QsIFByb21pc2VdID0gY2h1bmsgbG9hZGluZywgMCA9IGNodW5rIGxvYWRlZFxudmFyIGluc3RhbGxlZENodW5rcyA9IHtcblx0XCJwb3B1cFwiOiAwXG59O1xuXG4vLyBubyBjaHVuayBvbiBkZW1hbmQgbG9hZGluZ1xuXG4vLyBubyBwcmVmZXRjaGluZ1xuXG4vLyBubyBwcmVsb2FkZWRcblxuLy8gbm8gSE1SXG5cbi8vIG5vIEhNUiBtYW5pZmVzdFxuXG5fX3dlYnBhY2tfcmVxdWlyZV9fLk8uaiA9IGZ1bmN0aW9uKGNodW5rSWQpIHsgcmV0dXJuIGluc3RhbGxlZENodW5rc1tjaHVua0lkXSA9PT0gMDsgfTtcblxuLy8gaW5zdGFsbCBhIEpTT05QIGNhbGxiYWNrIGZvciBjaHVuayBsb2FkaW5nXG52YXIgd2VicGFja0pzb25wQ2FsbGJhY2sgPSBmdW5jdGlvbihwYXJlbnRDaHVua0xvYWRpbmdGdW5jdGlvbiwgZGF0YSkge1xuXHR2YXIgY2h1bmtJZHMgPSBkYXRhWzBdO1xuXHR2YXIgbW9yZU1vZHVsZXMgPSBkYXRhWzFdO1xuXHR2YXIgcnVudGltZSA9IGRhdGFbMl07XG5cdC8vIGFkZCBcIm1vcmVNb2R1bGVzXCIgdG8gdGhlIG1vZHVsZXMgb2JqZWN0LFxuXHQvLyB0aGVuIGZsYWcgYWxsIFwiY2h1bmtJZHNcIiBhcyBsb2FkZWQgYW5kIGZpcmUgY2FsbGJhY2tcblx0dmFyIG1vZHVsZUlkLCBjaHVua0lkLCBpID0gMDtcblx0aWYoY2h1bmtJZHMuc29tZShmdW5jdGlvbihpZCkgeyByZXR1cm4gaW5zdGFsbGVkQ2h1bmtzW2lkXSAhPT0gMDsgfSkpIHtcblx0XHRmb3IobW9kdWxlSWQgaW4gbW9yZU1vZHVsZXMpIHtcblx0XHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhtb3JlTW9kdWxlcywgbW9kdWxlSWQpKSB7XG5cdFx0XHRcdF9fd2VicGFja19yZXF1aXJlX18ubVttb2R1bGVJZF0gPSBtb3JlTW9kdWxlc1ttb2R1bGVJZF07XG5cdFx0XHR9XG5cdFx0fVxuXHRcdGlmKHJ1bnRpbWUpIHZhciByZXN1bHQgPSBydW50aW1lKF9fd2VicGFja19yZXF1aXJlX18pO1xuXHR9XG5cdGlmKHBhcmVudENodW5rTG9hZGluZ0Z1bmN0aW9uKSBwYXJlbnRDaHVua0xvYWRpbmdGdW5jdGlvbihkYXRhKTtcblx0Zm9yKDtpIDwgY2h1bmtJZHMubGVuZ3RoOyBpKyspIHtcblx0XHRjaHVua0lkID0gY2h1bmtJZHNbaV07XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGluc3RhbGxlZENodW5rcywgY2h1bmtJZCkgJiYgaW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdKSB7XG5cdFx0XHRpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF1bMF0oKTtcblx0XHR9XG5cdFx0aW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdID0gMDtcblx0fVxuXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXy5PKHJlc3VsdCk7XG59XG5cbnZhciBjaHVua0xvYWRpbmdHbG9iYWwgPSBzZWxmW1wid2VicGFja0NodW5rZXh0XCJdID0gc2VsZltcIndlYnBhY2tDaHVua2V4dFwiXSB8fCBbXTtcbmNodW5rTG9hZGluZ0dsb2JhbC5mb3JFYWNoKHdlYnBhY2tKc29ucENhbGxiYWNrLmJpbmQobnVsbCwgMCkpO1xuY2h1bmtMb2FkaW5nR2xvYmFsLnB1c2ggPSB3ZWJwYWNrSnNvbnBDYWxsYmFjay5iaW5kKG51bGwsIGNodW5rTG9hZGluZ0dsb2JhbC5wdXNoLmJpbmQoY2h1bmtMb2FkaW5nR2xvYmFsKSk7IiwiIiwiLy8gc3RhcnR1cFxuLy8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4vLyBUaGlzIGVudHJ5IG1vZHVsZSBkZXBlbmRzIG9uIG90aGVyIGxvYWRlZCBjaHVua3MgYW5kIGV4ZWN1dGlvbiBuZWVkIHRvIGJlIGRlbGF5ZWRcbnZhciBfX3dlYnBhY2tfZXhwb3J0c19fID0gX193ZWJwYWNrX3JlcXVpcmVfXy5PKHVuZGVmaW5lZCwgW1wiY2h1bmstdmVuZG9yc1wiXSwgZnVuY3Rpb24oKSB7IHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKFwiLi9zcmMvcG9wdXAvaW5kZXguanNcIik7IH0pXG5fX3dlYnBhY2tfZXhwb3J0c19fID0gX193ZWJwYWNrX3JlcXVpcmVfXy5PKF9fd2VicGFja19leHBvcnRzX18pO1xuIiwiIl0sIm5hbWVzIjpbImF4aW9zIiwiaWNvbiIsIm5hbWUiLCJkYXRhIiwiaWNvbnMiLCJpc0dpZiIsInBuZ3VybCIsImdpZnVybCIsIndvcmttb2RlIiwidGFiRGlhbG9nIiwic2F2ZWRUYWJzR3JvdXBMaXN0Iiwic2F2ZVRhYnNHcm91cEZvcm0iLCJncm91cE5hbWUiLCJyZWxvYWRUYWJzR3JvdXBGb3JtIiwic2VsZWN0VmlkZW8iLCJiaWQiLCJhaWQiLCJ2aWRlb3NEYXRhIiwiY2lkIiwicGxhbkRpYWxvZyIsInBsYW5UeXBlIiwicGxhbiIsInRpdGxlIiwidHlwZSIsInN0YXJ0VGltZSIsImxhc3RDaGVja1RpbWUiLCJkYXlzIiwibWF4RGF5cyIsIml0ZW1zIiwidGFyZ2V0IiwiY29tcGxldGVkIiwicGxhbkxpc3QiLCJjcmVhdGVkIiwiZ2V0UGxhbkxpc3QiLCJjaHJvbWUiLCJzdG9yYWdlIiwibG9jYWwiLCJnZXQiLCJtZXRob2RzIiwib3Blbk9wdGlvbiIsInRhYnMiLCJjcmVhdGUiLCJ1cmwiLCJjaGFuZ2VXb3JrTW9kZSIsIm1vZCIsInNldCIsInNjcmVlbnNob3QiLCJjYXB0dXJlVmlzaWJsZVRhYiIsImZvcm1hdCIsInF1YWxpdHkiLCJpbWdfdXJsIiwiZG93bmxvYWRzIiwiZG93bmxvYWQiLCJzYXZlQXMiLCJyZXMiLCJjb25zb2xlIiwibG9nIiwiZ2V0U2F2ZWRUYWJzR3JvdXBMaXN0IiwiZW50cnkiLCJzYXZlVGFic0dyb3VwIiwicXVlcnkiLCJjdXJyZW50V2luZG93IiwidXJscyIsIm1hcCIsInRhYiIsInNob3dOb3RpZmljYXRpb24iLCJyZWxvYWRUYWJzR3JvdXAiLCJncm91cCIsIk9iamVjdCIsInZhbHVlcyIsImZvckVhY2giLCJVUkwiLCJkZWxldGVUYWJzR3JvdXAiLCJnZXRWaWRlb0xpc3QiLCJhY3RpdmUiLCJidiIsIm1hdGNoIiwiYWlkTW9kZWwiLCJjaWRNb2RlbCIsInJlcXVlc3RzIiwiZ2V0QWlkIiwiUHJvbWlzZSIsInJlc29sdmUiLCJtZXRob2QiLCJ0aGVuIiwicHVzaCIsImdldENpZCIsImFsbCIsInJlcGxpc3QiLCJkb3dubG9hZEJpbGlQaWMiLCJyZXEiLCJwaWNVUkwiLCJwaWMiLCJkb3dubG9hZEJpbGlWaWRlbyIsInZpZGVvVVJMIiwiZHVybCIsImlkIiwib25DaGFuZ2VkIiwiYWRkTGlzdGVuZXIiLCJkZWx0YSIsImVycm9yIiwicmVzdW1lIiwiYWRkUGxhbkl0ZW0iLCJyZW1vdmVQbGFuSXRlbSIsImluZGV4Iiwic3BsaWNlIiwiYWRkUGxhbiIsImNoZWNrUGxhbkxpc3QiLCJjb21wdXRlUGVyY2VudGFnZSIsIm51bSIsIml0ZW0iLCJNYXRoIiwicm91bmQiLCJsZW5ndGgiLCJoYW5kbGVQbGFuQ2hhbmdlIiwibnRmIiwibXNnIiwiJG5vdGlmeSIsImRhbmdlcm91c2x5VXNlSFRNTFN0cmluZyIsIm1lc3NhZ2UiLCJkdXJhdGlvbiIsImNoZWNrUGxhbiIsImRhdGUiLCJEYXRlIiwiZGF0ZVN0ciIsImdldEZ1bGxZZWFyIiwiZ2V0TW9udGgiLCJnZXREYXRlIiwicGFyc2UiLCJkZWxldGVQbGFuIiwiX2NyZWF0ZUVsZW1lbnRWTm9kZSIsInN0eWxlIiwiX2NyZWF0ZUJsb2NrIiwiX2NvbXBvbmVudF9lbF9jb250YWluZXIiLCJfY3JlYXRlVk5vZGUiLCJfY29tcG9uZW50X2VsX2hlYWRlciIsIl9jb21wb25lbnRfZWxfcm93IiwiZ3V0dGVyIiwiYWxpZ24iLCJfY29tcG9uZW50X2VsX2NvbCIsInNwYW4iLCJvbk1vdXNlZW50ZXIiLCIkZGF0YSIsIm9uTW91c2VsZWF2ZSIsIm9uQ2xpY2siLCIkb3B0aW9ucyIsIl9jb21wb25lbnRfZWxfYXZhdGFyIiwic3JjIiwiZml0IiwianVzdGlmeSIsIl9jcmVhdGVDb21tZW50Vk5vZGUiLCJfY29tcG9uZW50X2VsX2J1dHRvbiIsInNpemUiLCJNdXRlTm90aWZpY2F0aW9uIiwiY2lyY2xlIiwiRnVsbFNjcmVlbiIsIkNvcHlEb2N1bWVudCIsIkRvd25sb2FkIiwiRmluaXNoZWQiLCJfY29tcG9uZW50X2VsX21haW4iLCJKU09OIiwic3RyaW5naWZ5IiwiX2NvbXBvbmVudF9lbF9jYXJkIiwiX2NvbXBvbmVudF9lbF9pbWFnZSIsIl9ob2lzdGVkXzEiLCJwbGFpbiIsIl9jb21wb25lbnRfZWxfY2Fyb3VzZWwiLCJoZWlnaHQiLCJhcnJvdyIsIl9jcmVhdGVFbGVtZW50QmxvY2siLCJfRnJhZ21lbnQiLCJfcmVuZGVyTGlzdCIsInAiLCJpIiwiX2NvbXBvbmVudF9lbF9jYXJvdXNlbF9pdGVtIiwia2V5Iiwic2hhZG93IiwicGFkZGluZyIsImNsYXNzIiwiX2hvaXN0ZWRfMyIsIl90b0Rpc3BsYXlTdHJpbmciLCJfY29tcG9uZW50X2VsX3Byb2dyZXNzIiwid2lkdGgiLCJwZXJjZW50YWdlIiwic3RhdHVzIiwiX2NvbXBvbmVudF9lbF9pbnB1dF9udW1iZXIiLCIkZXZlbnQiLCJvbkNoYW5nZSIsIm1pbiIsIm1heCIsIl9jb21wb25lbnRfZWxfZHJhd2VyIiwiZGlyZWN0aW9uIiwib25PcGVuIiwiX2NvbXBvbmVudF9lbF9kaXZpZGVyIiwicGFydCIsIl9jb21wb25lbnRfZWxfZGlhbG9nIiwiZm9vdGVyIiwiX2NvbXBvbmVudF9lbF90YWJzIiwiX2NvbXBvbmVudF9lbF90YWJfcGFuZSIsImxhYmVsIiwiX2NvbXBvbmVudF9lbF9mb3JtIiwibW9kZWwiLCJfY29tcG9uZW50X2VsX2Zvcm1faXRlbSIsIl9jb21wb25lbnRfZWxfaW5wdXQiLCJwbGFjZWhvbGRlciIsIl9ob2lzdGVkXzEyIiwiX2hvaXN0ZWRfMTMiLCJudW1iZXIiLCJQbHVzIiwiX2NvbXBvbmVudF9lbF90YWJsZSIsIl9jb21wb25lbnRfZWxfdGFibGVfY29sdW1uIiwicHJvcCIsImRlZmF1bHQiLCJzY29wZSIsInJvdyIsIl9jb21wb25lbnRfZWxfaWNvbiIsIl9jb21wb25lbnRfZG9jdW1lbnRfYWRkIiwiaW5saW5lIiwiX2NvbXBvbmVudF9zZXR0aW5nIiwiX2NvbXBvbmVudF9lbF9zZWxlY3QiLCJ2YWx1ZSIsIl9jb21wb25lbnRfZWxfb3B0aW9uIiwiY3JlYXRlQXBwIiwiQXBwIiwiRWxlbWVudFBsdXMiLCJFbGVtZW50UGx1c0ljb25zVnVlIiwiYXBwIiwiY29tcG9uZW50IiwidXNlIiwibW91bnQiXSwic291cmNlUm9vdCI6IiJ9