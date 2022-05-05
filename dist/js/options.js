/******/ (function() { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-40.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./src/options/App/App.vue?vue&type=script&lang=js":
/*!**************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-40.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./src/options/App/App.vue?vue&type=script&lang=js ***!
  \**************************************************************************************************************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ({
  name: 'app',

  data() {
    return {
      keyword: '',
      Data: []
    };
  },

  created() {
    this.getBlockList();
  },

  methods: {
    getBlockList() {
      chrome.storage.local.get("blockList", entry => {
        this.Data = typeof entry.blockList == 'undefined' ? [] : Object.values(entry.blockList);
      });
    },

    saveBlockList() {
      chrome.storage.local.set({
        "blockList": this.Data
      });
    },

    deleteBlockList(index) {
      this.Data.splice(index, 1);
      this.saveBlockList();
    },

    addBlockList() {
      this.Data.push({
        'keyword': this.keyword
      });
      this.keyword = '';
      this.saveBlockList();
    },

    reset() {
      chrome.storage.local.clear(() => {
        console.log("clear");
      });
      this.getBlockList();
    }

  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-40.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[3]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./src/options/App/App.vue?vue&type=template&id=5fd2028e":
/*!******************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-40.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[3]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./src/options/App/App.vue?vue&type=template&id=5fd2028e ***!
  \******************************************************************************************************************************************************************************************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": function() { return /* binding */ render; }
/* harmony export */ });
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ "./node_modules/vue/dist/vue.runtime.esm-bundler.js");


const _hoisted_1 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h3", null, "工作模式下黑名单列表", -1
/* HOISTED */
);

const _hoisted_2 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)("删除");

const _hoisted_3 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)("添加");

const _hoisted_4 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)("清空缓存");

function render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_el_table_column = (0,vue__WEBPACK_IMPORTED_MODULE_0__.resolveComponent)("el-table-column");

  const _component_el_button = (0,vue__WEBPACK_IMPORTED_MODULE_0__.resolveComponent)("el-button");

  const _component_el_table = (0,vue__WEBPACK_IMPORTED_MODULE_0__.resolveComponent)("el-table");

  const _component_el_input = (0,vue__WEBPACK_IMPORTED_MODULE_0__.resolveComponent)("el-input");

  const _component_el_col = (0,vue__WEBPACK_IMPORTED_MODULE_0__.resolveComponent)("el-col");

  const _component_el_row = (0,vue__WEBPACK_IMPORTED_MODULE_0__.resolveComponent)("el-row");

  const _component_el_card = (0,vue__WEBPACK_IMPORTED_MODULE_0__.resolveComponent)("el-card");

  const _component_el_divider = (0,vue__WEBPACK_IMPORTED_MODULE_0__.resolveComponent)("el-divider");

  return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_el_card, {
    style: {
      "width": "30%"
    }
  }, {
    header: (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(() => [_hoisted_1]),
    default: (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(() => [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_el_table, {
      data: $data.Data
    }, {
      default: (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(() => [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_el_table_column, {
        prop: "keyword",
        label: "关键字",
        width: "120"
      }), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_el_table_column, {
        align: "right"
      }, {
        default: (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(scope => [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_el_button, {
          type: "danger",
          onClick: $event => $options.deleteBlockList(scope.$index)
        }, {
          default: (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(() => [_hoisted_2]),
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
    , ["data"]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_el_row, {
      justify: "space-between"
    }, {
      default: (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(() => [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_el_col, {
        span: 16
      }, {
        default: (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(() => [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_el_input, {
          modelValue: $data.keyword,
          "onUpdate:modelValue": _cache[0] || (_cache[0] = $event => $data.keyword = $event),
          placeholder: "关键字"
        }, null, 8
        /* PROPS */
        , ["modelValue"])]),
        _: 1
        /* STABLE */

      }), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_el_col, {
        span: 4
      }, {
        default: (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(() => [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_el_button, {
          onClick: _cache[1] || (_cache[1] = $event => $options.addBlockList())
        }, {
          default: (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(() => [_hoisted_3]),
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

  }), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_el_divider), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_el_row, {
    style: {
      "padding": "10px"
    }
  }, {
    default: (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(() => [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_el_button, {
      size: "large",
      onClick: $options.reset
    }, {
      default: (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(() => [_hoisted_4]),
      _: 1
      /* STABLE */

    }, 8
    /* PROPS */
    , ["onClick"])]),
    _: 1
    /* STABLE */

  })], 64
  /* STABLE_FRAGMENT */
  );
}

/***/ }),

/***/ "./src/options/index.js":
/*!******************************!*\
  !*** ./src/options/index.js ***!
  \******************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ "./node_modules/vue/dist/vue.runtime.esm-bundler.js");
/* harmony import */ var _App_App_vue__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./App/App.vue */ "./src/options/App/App.vue");
/* harmony import */ var element_plus__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! element-plus */ "./node_modules/element-plus/es/defaults.mjs");
/* harmony import */ var element_plus_dist_index_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! element-plus/dist/index.css */ "./node_modules/element-plus/dist/index.css");
/* harmony import */ var element_plus_dist_index_css__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(element_plus_dist_index_css__WEBPACK_IMPORTED_MODULE_2__);
// import Vue from "vue";
// import AppComponent from "./App/App.vue";
// import ElementUI from 'element-ui';
// import 'element-ui/lib/theme-chalk/index.css';
// // import axios from 'axios'
// // import VueAxios from 'vue-axios'
// Vue.component("app-component", AppComponent);
// Vue.use(ElementUI)
// // Vue.use(VueAxios, axios)
// new Vue({
//   el: "#app",
//   render: createElement => {
//     return createElement(AppComponent);
//   }
// });




(0,vue__WEBPACK_IMPORTED_MODULE_0__.createApp)(_App_App_vue__WEBPACK_IMPORTED_MODULE_1__["default"]).use(element_plus__WEBPACK_IMPORTED_MODULE_3__["default"]).mount('#app');

/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js??clonedRuleSet-12.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-12.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./src/options/App/App.vue?vue&type=style&index=0&id=5fd2028e&lang=css":
/*!****************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js??clonedRuleSet-12.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-12.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./src/options/App/App.vue?vue&type=style&index=0&id=5fd2028e&lang=css ***!
  \****************************************************************************************************************************************************************************************************************************************************************************************************************************/
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
___CSS_LOADER_EXPORT___.push([module.id, "\n.main_app {\n  font-family: 'Avenir', Helvetica, Arial, sans-serif;\n  -webkit-font-smoothing: antialiased;\n  -moz-osx-font-smoothing: grayscale;\n  /* text-align: center; */\n  color: #2c3e50;\n  margin-top: 0px;\n}\n.plan_items p{\n  color: #444;\n  font-size: 22px;\n  margin: 0px 0px 5px 0px;\n}\n.plan_items .el-row{\n  margin: 0px 0px 5px 0px;\n  color: #666;\n  font-size: 16px;\n}\n.plan_items .el-row .el-input-number{\n  max-width: 100%;\n}\n", ""]);
// Exports
/* harmony default export */ __webpack_exports__["default"] = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./src/options/App/App.vue":
/*!*********************************!*\
  !*** ./src/options/App/App.vue ***!
  \*********************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _App_vue_vue_type_template_id_5fd2028e__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./App.vue?vue&type=template&id=5fd2028e */ "./src/options/App/App.vue?vue&type=template&id=5fd2028e");
/* harmony import */ var _App_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./App.vue?vue&type=script&lang=js */ "./src/options/App/App.vue?vue&type=script&lang=js");
/* harmony import */ var _App_vue_vue_type_style_index_0_id_5fd2028e_lang_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./App.vue?vue&type=style&index=0&id=5fd2028e&lang=css */ "./src/options/App/App.vue?vue&type=style&index=0&id=5fd2028e&lang=css");
/* harmony import */ var _Users_wangzf_Documents_Chrome_ava_ext_node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./node_modules/vue-loader/dist/exportHelper.js */ "./node_modules/vue-loader/dist/exportHelper.js");




;


const __exports__ = /*#__PURE__*/(0,_Users_wangzf_Documents_Chrome_ava_ext_node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_3__["default"])(_App_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__["default"], [['render',_App_vue_vue_type_template_id_5fd2028e__WEBPACK_IMPORTED_MODULE_0__.render],['__file',"src/options/App/App.vue"]])
/* hot reload */
if (false) {}


/* harmony default export */ __webpack_exports__["default"] = (__exports__);

/***/ }),

/***/ "./src/options/App/App.vue?vue&type=script&lang=js":
/*!*********************************************************!*\
  !*** ./src/options/App/App.vue?vue&type=script&lang=js ***!
  \*********************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* reexport safe */ _node_modules_babel_loader_lib_index_js_clonedRuleSet_40_use_0_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_App_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__["default"]; }
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_40_use_0_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_App_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-40.use[0]!../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./App.vue?vue&type=script&lang=js */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-40.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./src/options/App/App.vue?vue&type=script&lang=js");
 

/***/ }),

/***/ "./src/options/App/App.vue?vue&type=template&id=5fd2028e":
/*!***************************************************************!*\
  !*** ./src/options/App/App.vue?vue&type=template&id=5fd2028e ***!
  \***************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": function() { return /* reexport safe */ _node_modules_babel_loader_lib_index_js_clonedRuleSet_40_use_0_node_modules_vue_loader_dist_templateLoader_js_ruleSet_1_rules_3_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_App_vue_vue_type_template_id_5fd2028e__WEBPACK_IMPORTED_MODULE_0__.render; }
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_40_use_0_node_modules_vue_loader_dist_templateLoader_js_ruleSet_1_rules_3_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_App_vue_vue_type_template_id_5fd2028e__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-40.use[0]!../../../node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[3]!../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./App.vue?vue&type=template&id=5fd2028e */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-40.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[3]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./src/options/App/App.vue?vue&type=template&id=5fd2028e");


/***/ }),

/***/ "./src/options/App/App.vue?vue&type=style&index=0&id=5fd2028e&lang=css":
/*!*****************************************************************************!*\
  !*** ./src/options/App/App.vue?vue&type=style&index=0&id=5fd2028e&lang=css ***!
  \*****************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_style_loader_index_js_clonedRuleSet_12_use_0_node_modules_css_loader_dist_cjs_js_clonedRuleSet_12_use_1_node_modules_vue_loader_dist_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_12_use_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_App_vue_vue_type_style_index_0_id_5fd2028e_lang_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/vue-style-loader/index.js??clonedRuleSet-12.use[0]!../../../node_modules/css-loader/dist/cjs.js??clonedRuleSet-12.use[1]!../../../node_modules/vue-loader/dist/stylePostLoader.js!../../../node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-12.use[2]!../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./App.vue?vue&type=style&index=0&id=5fd2028e&lang=css */ "./node_modules/vue-style-loader/index.js??clonedRuleSet-12.use[0]!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-12.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-12.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./src/options/App/App.vue?vue&type=style&index=0&id=5fd2028e&lang=css");
/* harmony import */ var _node_modules_vue_style_loader_index_js_clonedRuleSet_12_use_0_node_modules_css_loader_dist_cjs_js_clonedRuleSet_12_use_1_node_modules_vue_loader_dist_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_12_use_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_App_vue_vue_type_style_index_0_id_5fd2028e_lang_css__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_vue_style_loader_index_js_clonedRuleSet_12_use_0_node_modules_css_loader_dist_cjs_js_clonedRuleSet_12_use_1_node_modules_vue_loader_dist_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_12_use_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_App_vue_vue_type_style_index_0_id_5fd2028e_lang_css__WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ var __WEBPACK_REEXPORT_OBJECT__ = {};
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_vue_style_loader_index_js_clonedRuleSet_12_use_0_node_modules_css_loader_dist_cjs_js_clonedRuleSet_12_use_1_node_modules_vue_loader_dist_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_12_use_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_App_vue_vue_type_style_index_0_id_5fd2028e_lang_css__WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== "default") __WEBPACK_REEXPORT_OBJECT__[__WEBPACK_IMPORT_KEY__] = function(key) { return _node_modules_vue_style_loader_index_js_clonedRuleSet_12_use_0_node_modules_css_loader_dist_cjs_js_clonedRuleSet_12_use_1_node_modules_vue_loader_dist_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_12_use_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_App_vue_vue_type_style_index_0_id_5fd2028e_lang_css__WEBPACK_IMPORTED_MODULE_0__[key]; }.bind(0, __WEBPACK_IMPORT_KEY__)
/* harmony reexport (unknown) */ __webpack_require__.d(__webpack_exports__, __WEBPACK_REEXPORT_OBJECT__);


/***/ }),

/***/ "./node_modules/vue-style-loader/index.js??clonedRuleSet-12.use[0]!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-12.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-12.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./src/options/App/App.vue?vue&type=style&index=0&id=5fd2028e&lang=css":
/*!**********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-style-loader/index.js??clonedRuleSet-12.use[0]!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-12.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-12.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./src/options/App/App.vue?vue&type=style&index=0&id=5fd2028e&lang=css ***!
  \**********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(/*! !!../../../node_modules/css-loader/dist/cjs.js??clonedRuleSet-12.use[1]!../../../node_modules/vue-loader/dist/stylePostLoader.js!../../../node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-12.use[2]!../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./App.vue?vue&type=style&index=0&id=5fd2028e&lang=css */ "./node_modules/css-loader/dist/cjs.js??clonedRuleSet-12.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-12.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./src/options/App/App.vue?vue&type=style&index=0&id=5fd2028e&lang=css");
if(content.__esModule) content = content.default;
if(typeof content === 'string') content = [[module.id, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var add = (__webpack_require__(/*! !../../../node_modules/vue-style-loader/lib/addStylesClient.js */ "./node_modules/vue-style-loader/lib/addStylesClient.js")["default"])
var update = add("4a2c174d", content, false, {"sourceMap":false,"shadowMode":false});
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
/******/ 			"options": 0
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
/******/ 	var __webpack_exports__ = __webpack_require__.O(undefined, ["chunk-vendors"], function() { return __webpack_require__("./src/options/index.js"); })
/******/ 	__webpack_exports__ = __webpack_require__.O(__webpack_exports__);
/******/ 	
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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O1dBQ0w7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBOzs7OztXQzdCQTtXQUNBO1dBQ0E7V0FDQSxlQUFlLDRCQUE0QjtXQUMzQyxlQUFlO1dBQ2YsaUNBQWlDLFdBQVc7V0FDNUM7V0FDQTs7Ozs7V0NQQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHlDQUF5Qyx3Q0FBd0M7V0FDakY7V0FDQTtXQUNBOzs7OztXQ1BBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EsR0FBRztXQUNIO1dBQ0E7V0FDQSxDQUFDOzs7OztXQ1BELDhDQUE4Qzs7Ozs7V0NBOUM7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7OztXQ05BOztXQUVBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTs7V0FFQTs7V0FFQTs7V0FFQTs7V0FFQTs7V0FFQTs7V0FFQSw4Q0FBOEM7O1dBRTlDO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQSxpQ0FBaUMsbUNBQW1DO1dBQ3BFO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQSxNQUFNLHFCQUFxQjtXQUMzQjtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBOztXQUVBO1dBQ0E7V0FDQTs7Ozs7VUVsREE7VUFDQTtVQUNBO1VBQ0EsMkZBQTJGLHVEQUF1RDtVQUNsSiIsInNvdXJjZXMiOlsid2VicGFjazovL2V4dC8uL3NyYy9vcHRpb25zL0FwcC9BcHAudnVlIiwid2VicGFjazovL2V4dC8uL3NyYy9vcHRpb25zL2luZGV4LmpzIiwid2VicGFjazovL2V4dC8uL3NyYy9vcHRpb25zL0FwcC9BcHAudnVlP2IzMTQiLCJ3ZWJwYWNrOi8vZXh0Ly4vc3JjL29wdGlvbnMvQXBwL0FwcC52dWU/ZjhjMCIsIndlYnBhY2s6Ly9leHQvLi9zcmMvb3B0aW9ucy9BcHAvQXBwLnZ1ZT85Yzc4Iiwid2VicGFjazovL2V4dC8uL3NyYy9vcHRpb25zL0FwcC9BcHAudnVlP2I0YWUiLCJ3ZWJwYWNrOi8vZXh0Ly4vc3JjL29wdGlvbnMvQXBwL0FwcC52dWU/ZDdjMiIsIndlYnBhY2s6Ly9leHQvLi9zcmMvb3B0aW9ucy9BcHAvQXBwLnZ1ZT84ZDBlIiwid2VicGFjazovL2V4dC93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9leHQvd2VicGFjay9ydW50aW1lL2NodW5rIGxvYWRlZCIsIndlYnBhY2s6Ly9leHQvd2VicGFjay9ydW50aW1lL2NvbXBhdCBnZXQgZGVmYXVsdCBleHBvcnQiLCJ3ZWJwYWNrOi8vZXh0L3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9leHQvd2VicGFjay9ydW50aW1lL2dsb2JhbCIsIndlYnBhY2s6Ly9leHQvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9leHQvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9leHQvd2VicGFjay9ydW50aW1lL2pzb25wIGNodW5rIGxvYWRpbmciLCJ3ZWJwYWNrOi8vZXh0L3dlYnBhY2svYmVmb3JlLXN0YXJ0dXAiLCJ3ZWJwYWNrOi8vZXh0L3dlYnBhY2svc3RhcnR1cCIsIndlYnBhY2s6Ly9leHQvd2VicGFjay9hZnRlci1zdGFydHVwIl0sInNvdXJjZXNDb250ZW50IjpbIlxuPHRlbXBsYXRlPlxuICA8ZWwtY2FyZCBzdHlsZT1cIndpZHRoOiAzMCVcIj5cbiAgICA8dGVtcGxhdGUgI2hlYWRlcj5cbiAgICAgIDxoMz7lt6XkvZzmqKHlvI/kuIvpu5HlkI3ljZXliJfooag8L2gzPlxuICAgIDwvdGVtcGxhdGU+XG4gICAgPGVsLXRhYmxlIDpkYXRhPVwiRGF0YVwiPlxuICAgICAgPGVsLXRhYmxlLWNvbHVtbiBwcm9wPVwia2V5d29yZFwiIGxhYmVsPVwi5YWz6ZSu5a2XXCIgd2lkdGg9XCIxMjBcIiAvPlxuICAgICAgPGVsLXRhYmxlLWNvbHVtbiBhbGlnbj1cInJpZ2h0XCI+XG4gICAgICAgIDx0ZW1wbGF0ZSAjZGVmYXVsdD1cInNjb3BlXCI+XG4gICAgICAgICAgPGVsLWJ1dHRvbiB0eXBlPVwiZGFuZ2VyXCIgQGNsaWNrPVwiZGVsZXRlQmxvY2tMaXN0KHNjb3BlLiRpbmRleClcIj7liKDpmaQ8L2VsLWJ1dHRvbj5cbiAgICAgICAgPC90ZW1wbGF0ZT5cbiAgICAgIDwvZWwtdGFibGUtY29sdW1uPlxuICAgIDwvZWwtdGFibGU+ICBcbiAgICA8ZWwtcm93IGp1c3RpZnk9XCJzcGFjZS1iZXR3ZWVuXCI+XG4gICAgICA8ZWwtY29sIDpzcGFuPVwiMTZcIj5cbiAgICAgICAgPGVsLWlucHV0IHYtbW9kZWw9XCJrZXl3b3JkXCIgcGxhY2Vob2xkZXI9XCLlhbPplK7lrZdcIj48L2VsLWlucHV0PlxuICAgICAgPC9lbC1jb2w+XG4gICAgICA8ZWwtY29sIDpzcGFuPVwiNFwiPlxuICAgICAgICA8ZWwtYnV0dG9uIEBjbGljaz1cImFkZEJsb2NrTGlzdCgpXCI+5re75YqgPC9lbC1idXR0b24+XG4gICAgICA8L2VsLWNvbD5cbiAgICA8L2VsLXJvdz5cbiAgPC9lbC1jYXJkPlxuICA8ZWwtZGl2aWRlci8+XG4gIDxlbC1yb3cgc3R5bGU9XCJwYWRkaW5nOiAxMHB4XCI+XG4gICAgPGVsLWJ1dHRvbiBzaXplPVwibGFyZ2VcIiAgQGNsaWNrPVwicmVzZXRcIj7muIXnqbrnvJPlrZg8L2VsLWJ1dHRvbj4gIFxuICA8L2VsLXJvdz5cblxuXG48L3RlbXBsYXRlPlxuXG5cblxuXG48c2NyaXB0PlxuICBleHBvcnQgZGVmYXVsdCB7XG4gICAgbmFtZTogJ2FwcCcsXG4gICAgZGF0YSgpIHtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIGtleXdvcmQ6ICcnLFxuICAgICAgICBEYXRhOiBbXSxcbiAgICAgIH07XG4gICAgfSxcbiAgICBjcmVhdGVkICgpIHtcbiAgICAgIHRoaXMuZ2V0QmxvY2tMaXN0KCk7XG4gICAgfSxcbiAgICBtZXRob2RzOiB7XG4gICAgICBnZXRCbG9ja0xpc3QgKCkge1xuICAgICAgICBjaHJvbWUuc3RvcmFnZS5sb2NhbC5nZXQoXCJibG9ja0xpc3RcIiwgKGVudHJ5KSA9PiB7XG4gICAgICAgICAgdGhpcy5EYXRhID0gKHR5cGVvZihlbnRyeS5ibG9ja0xpc3QpID09ICd1bmRlZmluZWQnKSA/IFtdIDogT2JqZWN0LnZhbHVlcyhlbnRyeS5ibG9ja0xpc3QpO1xuICAgICAgICB9KTtcbiAgICAgIH0sXG4gICAgICBzYXZlQmxvY2tMaXN0ICgpIHtcbiAgICAgICAgY2hyb21lLnN0b3JhZ2UubG9jYWwuc2V0KHtcImJsb2NrTGlzdFwiOnRoaXMuRGF0YX0pO1xuICAgICAgfSxcbiAgICAgIGRlbGV0ZUJsb2NrTGlzdCAoaW5kZXgpIHtcbiAgICAgICAgdGhpcy5EYXRhLnNwbGljZShpbmRleCwgMSk7XG4gICAgICAgIHRoaXMuc2F2ZUJsb2NrTGlzdCgpO1xuICAgICAgfSxcbiAgICAgIGFkZEJsb2NrTGlzdCAoKSB7XG4gICAgICAgIHRoaXMuRGF0YS5wdXNoKHsna2V5d29yZCc6IHRoaXMua2V5d29yZH0pO1xuICAgICAgICB0aGlzLmtleXdvcmQ9Jyc7XG4gICAgICAgIHRoaXMuc2F2ZUJsb2NrTGlzdCgpO1xuICAgICAgfSxcbiAgICAgIHJlc2V0ICgpIHtcbiAgICAgICAgY2hyb21lLnN0b3JhZ2UubG9jYWwuY2xlYXIoKCkgPT4ge2NvbnNvbGUubG9nKFwiY2xlYXJcIil9KVxuICAgICAgICB0aGlzLmdldEJsb2NrTGlzdCgpO1xuICAgICAgfSxcbiAgICB9XG4gIH07XG48L3NjcmlwdD5cblxuPHN0eWxlPlxuLm1haW5fYXBwIHtcbiAgZm9udC1mYW1pbHk6ICdBdmVuaXInLCBIZWx2ZXRpY2EsIEFyaWFsLCBzYW5zLXNlcmlmO1xuICAtd2Via2l0LWZvbnQtc21vb3RoaW5nOiBhbnRpYWxpYXNlZDtcbiAgLW1vei1vc3gtZm9udC1zbW9vdGhpbmc6IGdyYXlzY2FsZTtcbiAgLyogdGV4dC1hbGlnbjogY2VudGVyOyAqL1xuICBjb2xvcjogIzJjM2U1MDtcbiAgbWFyZ2luLXRvcDogMHB4O1xufVxuXG4ucGxhbl9pdGVtcyBwe1xuICBjb2xvcjogIzQ0NDtcbiAgZm9udC1zaXplOiAyMnB4O1xuICBtYXJnaW46IDBweCAwcHggNXB4IDBweDtcbn1cbi5wbGFuX2l0ZW1zIC5lbC1yb3d7XG4gIG1hcmdpbjogMHB4IDBweCA1cHggMHB4O1xuICBjb2xvcjogIzY2NjtcbiAgZm9udC1zaXplOiAxNnB4O1xufVxuLnBsYW5faXRlbXMgLmVsLXJvdyAuZWwtaW5wdXQtbnVtYmVye1xuICBtYXgtd2lkdGg6IDEwMCU7XG59XG48L3N0eWxlPlxuIiwiLy8gaW1wb3J0IFZ1ZSBmcm9tIFwidnVlXCI7XG4vLyBpbXBvcnQgQXBwQ29tcG9uZW50IGZyb20gXCIuL0FwcC9BcHAudnVlXCI7XG4vLyBpbXBvcnQgRWxlbWVudFVJIGZyb20gJ2VsZW1lbnQtdWknO1xuLy8gaW1wb3J0ICdlbGVtZW50LXVpL2xpYi90aGVtZS1jaGFsay9pbmRleC5jc3MnO1xuLy8gLy8gaW1wb3J0IGF4aW9zIGZyb20gJ2F4aW9zJ1xuLy8gLy8gaW1wb3J0IFZ1ZUF4aW9zIGZyb20gJ3Z1ZS1heGlvcydcblxuLy8gVnVlLmNvbXBvbmVudChcImFwcC1jb21wb25lbnRcIiwgQXBwQ29tcG9uZW50KTtcbi8vIFZ1ZS51c2UoRWxlbWVudFVJKVxuLy8gLy8gVnVlLnVzZShWdWVBeGlvcywgYXhpb3MpXG5cbi8vIG5ldyBWdWUoe1xuLy8gICBlbDogXCIjYXBwXCIsXG4vLyAgIHJlbmRlcjogY3JlYXRlRWxlbWVudCA9PiB7XG4vLyAgICAgcmV0dXJuIGNyZWF0ZUVsZW1lbnQoQXBwQ29tcG9uZW50KTtcbi8vICAgfVxuLy8gfSk7XG5pbXBvcnQgeyBjcmVhdGVBcHAgfSBmcm9tICd2dWUnXG5pbXBvcnQgQXBwIGZyb20gJy4vQXBwL0FwcC52dWUnXG5pbXBvcnQgRWxlbWVudFBsdXMgZnJvbSAnZWxlbWVudC1wbHVzJ1xuaW1wb3J0ICdlbGVtZW50LXBsdXMvZGlzdC9pbmRleC5jc3MnO1xuXG5jcmVhdGVBcHAoQXBwKS51c2UoRWxlbWVudFBsdXMpLm1vdW50KCcjYXBwJykiLCIvLyBJbXBvcnRzXG5pbXBvcnQgX19fQ1NTX0xPQURFUl9BUElfTk9fU09VUkNFTUFQX0lNUE9SVF9fXyBmcm9tIFwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL25vU291cmNlTWFwcy5qc1wiO1xuaW1wb3J0IF9fX0NTU19MT0FERVJfQVBJX0lNUE9SVF9fXyBmcm9tIFwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL2FwaS5qc1wiO1xudmFyIF9fX0NTU19MT0FERVJfRVhQT1JUX19fID0gX19fQ1NTX0xPQURFUl9BUElfSU1QT1JUX19fKF9fX0NTU19MT0FERVJfQVBJX05PX1NPVVJDRU1BUF9JTVBPUlRfX18pO1xuLy8gTW9kdWxlXG5fX19DU1NfTE9BREVSX0VYUE9SVF9fXy5wdXNoKFttb2R1bGUuaWQsIFwiXFxuLm1haW5fYXBwIHtcXG4gIGZvbnQtZmFtaWx5OiAnQXZlbmlyJywgSGVsdmV0aWNhLCBBcmlhbCwgc2Fucy1zZXJpZjtcXG4gIC13ZWJraXQtZm9udC1zbW9vdGhpbmc6IGFudGlhbGlhc2VkO1xcbiAgLW1vei1vc3gtZm9udC1zbW9vdGhpbmc6IGdyYXlzY2FsZTtcXG4gIC8qIHRleHQtYWxpZ246IGNlbnRlcjsgKi9cXG4gIGNvbG9yOiAjMmMzZTUwO1xcbiAgbWFyZ2luLXRvcDogMHB4O1xcbn1cXG4ucGxhbl9pdGVtcyBwe1xcbiAgY29sb3I6ICM0NDQ7XFxuICBmb250LXNpemU6IDIycHg7XFxuICBtYXJnaW46IDBweCAwcHggNXB4IDBweDtcXG59XFxuLnBsYW5faXRlbXMgLmVsLXJvd3tcXG4gIG1hcmdpbjogMHB4IDBweCA1cHggMHB4O1xcbiAgY29sb3I6ICM2NjY7XFxuICBmb250LXNpemU6IDE2cHg7XFxufVxcbi5wbGFuX2l0ZW1zIC5lbC1yb3cgLmVsLWlucHV0LW51bWJlcntcXG4gIG1heC13aWR0aDogMTAwJTtcXG59XFxuXCIsIFwiXCJdKTtcbi8vIEV4cG9ydHNcbmV4cG9ydCBkZWZhdWx0IF9fX0NTU19MT0FERVJfRVhQT1JUX19fO1xuIiwiaW1wb3J0IHsgcmVuZGVyIH0gZnJvbSBcIi4vQXBwLnZ1ZT92dWUmdHlwZT10ZW1wbGF0ZSZpZD01ZmQyMDI4ZVwiXG5pbXBvcnQgc2NyaXB0IGZyb20gXCIuL0FwcC52dWU/dnVlJnR5cGU9c2NyaXB0Jmxhbmc9anNcIlxuZXhwb3J0ICogZnJvbSBcIi4vQXBwLnZ1ZT92dWUmdHlwZT1zY3JpcHQmbGFuZz1qc1wiXG5cbmltcG9ydCBcIi4vQXBwLnZ1ZT92dWUmdHlwZT1zdHlsZSZpbmRleD0wJmlkPTVmZDIwMjhlJmxhbmc9Y3NzXCJcblxuaW1wb3J0IGV4cG9ydENvbXBvbmVudCBmcm9tIFwiL1VzZXJzL3dhbmd6Zi9Eb2N1bWVudHMvQ2hyb21lLWF2YS9leHQvbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvZGlzdC9leHBvcnRIZWxwZXIuanNcIlxuY29uc3QgX19leHBvcnRzX18gPSAvKiNfX1BVUkVfXyovZXhwb3J0Q29tcG9uZW50KHNjcmlwdCwgW1sncmVuZGVyJyxyZW5kZXJdLFsnX19maWxlJyxcInNyYy9vcHRpb25zL0FwcC9BcHAudnVlXCJdXSlcbi8qIGhvdCByZWxvYWQgKi9cbmlmIChtb2R1bGUuaG90KSB7XG4gIF9fZXhwb3J0c19fLl9faG1ySWQgPSBcIjVmZDIwMjhlXCJcbiAgY29uc3QgYXBpID0gX19WVUVfSE1SX1JVTlRJTUVfX1xuICBtb2R1bGUuaG90LmFjY2VwdCgpXG4gIGlmICghYXBpLmNyZWF0ZVJlY29yZCgnNWZkMjAyOGUnLCBfX2V4cG9ydHNfXykpIHtcbiAgICBhcGkucmVsb2FkKCc1ZmQyMDI4ZScsIF9fZXhwb3J0c19fKVxuICB9XG4gIFxuICBtb2R1bGUuaG90LmFjY2VwdChcIi4vQXBwLnZ1ZT92dWUmdHlwZT10ZW1wbGF0ZSZpZD01ZmQyMDI4ZVwiLCAoKSA9PiB7XG4gICAgYXBpLnJlcmVuZGVyKCc1ZmQyMDI4ZScsIHJlbmRlcilcbiAgfSlcblxufVxuXG5cbmV4cG9ydCBkZWZhdWx0IF9fZXhwb3J0c19fIiwiZXhwb3J0IHsgZGVmYXVsdCB9IGZyb20gXCItIS4uLy4uLy4uL25vZGVfbW9kdWxlcy9iYWJlbC1sb2FkZXIvbGliL2luZGV4LmpzPz9jbG9uZWRSdWxlU2V0LTQwLnVzZVswXSEuLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9kaXN0L2luZGV4LmpzPz9ydWxlU2V0WzBdLnVzZVswXSEuL0FwcC52dWU/dnVlJnR5cGU9c2NyaXB0Jmxhbmc9anNcIjsgZXhwb3J0ICogZnJvbSBcIi0hLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2JhYmVsLWxvYWRlci9saWIvaW5kZXguanM/P2Nsb25lZFJ1bGVTZXQtNDAudXNlWzBdIS4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2Rpc3QvaW5kZXguanM/P3J1bGVTZXRbMF0udXNlWzBdIS4vQXBwLnZ1ZT92dWUmdHlwZT1zY3JpcHQmbGFuZz1qc1wiIiwiZXhwb3J0ICogZnJvbSBcIi0hLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2JhYmVsLWxvYWRlci9saWIvaW5kZXguanM/P2Nsb25lZFJ1bGVTZXQtNDAudXNlWzBdIS4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2Rpc3QvdGVtcGxhdGVMb2FkZXIuanM/P3J1bGVTZXRbMV0ucnVsZXNbM10hLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvZGlzdC9pbmRleC5qcz8/cnVsZVNldFswXS51c2VbMF0hLi9BcHAudnVlP3Z1ZSZ0eXBlPXRlbXBsYXRlJmlkPTVmZDIwMjhlXCIiLCJleHBvcnQgKiBmcm9tIFwiLSEuLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLXN0eWxlLWxvYWRlci9pbmRleC5qcz8/Y2xvbmVkUnVsZVNldC0xMi51c2VbMF0hLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9janMuanM/P2Nsb25lZFJ1bGVTZXQtMTIudXNlWzFdIS4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2Rpc3Qvc3R5bGVQb3N0TG9hZGVyLmpzIS4uLy4uLy4uL25vZGVfbW9kdWxlcy9wb3N0Y3NzLWxvYWRlci9kaXN0L2Nqcy5qcz8/Y2xvbmVkUnVsZVNldC0xMi51c2VbMl0hLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvZGlzdC9pbmRleC5qcz8/cnVsZVNldFswXS51c2VbMF0hLi9BcHAudnVlP3Z1ZSZ0eXBlPXN0eWxlJmluZGV4PTAmaWQ9NWZkMjAyOGUmbGFuZz1jc3NcIiIsIi8vIHN0eWxlLWxvYWRlcjogQWRkcyBzb21lIGNzcyB0byB0aGUgRE9NIGJ5IGFkZGluZyBhIDxzdHlsZT4gdGFnXG5cbi8vIGxvYWQgdGhlIHN0eWxlc1xudmFyIGNvbnRlbnQgPSByZXF1aXJlKFwiISEuLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L2Nqcy5qcz8/Y2xvbmVkUnVsZVNldC0xMi51c2VbMV0hLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvZGlzdC9zdHlsZVBvc3RMb2FkZXIuanMhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Bvc3Rjc3MtbG9hZGVyL2Rpc3QvY2pzLmpzPz9jbG9uZWRSdWxlU2V0LTEyLnVzZVsyXSEuLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9kaXN0L2luZGV4LmpzPz9ydWxlU2V0WzBdLnVzZVswXSEuL0FwcC52dWU/dnVlJnR5cGU9c3R5bGUmaW5kZXg9MCZpZD01ZmQyMDI4ZSZsYW5nPWNzc1wiKTtcbmlmKGNvbnRlbnQuX19lc01vZHVsZSkgY29udGVudCA9IGNvbnRlbnQuZGVmYXVsdDtcbmlmKHR5cGVvZiBjb250ZW50ID09PSAnc3RyaW5nJykgY29udGVudCA9IFtbbW9kdWxlLmlkLCBjb250ZW50LCAnJ11dO1xuaWYoY29udGVudC5sb2NhbHMpIG1vZHVsZS5leHBvcnRzID0gY29udGVudC5sb2NhbHM7XG4vLyBhZGQgdGhlIHN0eWxlcyB0byB0aGUgRE9NXG52YXIgYWRkID0gcmVxdWlyZShcIiEuLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLXN0eWxlLWxvYWRlci9saWIvYWRkU3R5bGVzQ2xpZW50LmpzXCIpLmRlZmF1bHRcbnZhciB1cGRhdGUgPSBhZGQoXCI0YTJjMTc0ZFwiLCBjb250ZW50LCBmYWxzZSwge1wic291cmNlTWFwXCI6ZmFsc2UsXCJzaGFkb3dNb2RlXCI6ZmFsc2V9KTtcbi8vIEhvdCBNb2R1bGUgUmVwbGFjZW1lbnRcbmlmKG1vZHVsZS5ob3QpIHtcbiAvLyBXaGVuIHRoZSBzdHlsZXMgY2hhbmdlLCB1cGRhdGUgdGhlIDxzdHlsZT4gdGFnc1xuIGlmKCFjb250ZW50LmxvY2Fscykge1xuICAgbW9kdWxlLmhvdC5hY2NlcHQoXCIhIS4uLy4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvY2pzLmpzPz9jbG9uZWRSdWxlU2V0LTEyLnVzZVsxXSEuLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9kaXN0L3N0eWxlUG9zdExvYWRlci5qcyEuLi8uLi8uLi9ub2RlX21vZHVsZXMvcG9zdGNzcy1sb2FkZXIvZGlzdC9janMuanM/P2Nsb25lZFJ1bGVTZXQtMTIudXNlWzJdIS4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2Rpc3QvaW5kZXguanM/P3J1bGVTZXRbMF0udXNlWzBdIS4vQXBwLnZ1ZT92dWUmdHlwZT1zdHlsZSZpbmRleD0wJmlkPTVmZDIwMjhlJmxhbmc9Y3NzXCIsIGZ1bmN0aW9uKCkge1xuICAgICB2YXIgbmV3Q29udGVudCA9IHJlcXVpcmUoXCIhIS4uLy4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvY2pzLmpzPz9jbG9uZWRSdWxlU2V0LTEyLnVzZVsxXSEuLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9kaXN0L3N0eWxlUG9zdExvYWRlci5qcyEuLi8uLi8uLi9ub2RlX21vZHVsZXMvcG9zdGNzcy1sb2FkZXIvZGlzdC9janMuanM/P2Nsb25lZFJ1bGVTZXQtMTIudXNlWzJdIS4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2Rpc3QvaW5kZXguanM/P3J1bGVTZXRbMF0udXNlWzBdIS4vQXBwLnZ1ZT92dWUmdHlwZT1zdHlsZSZpbmRleD0wJmlkPTVmZDIwMjhlJmxhbmc9Y3NzXCIpO1xuICAgICBpZihuZXdDb250ZW50Ll9fZXNNb2R1bGUpIG5ld0NvbnRlbnQgPSBuZXdDb250ZW50LmRlZmF1bHQ7XG4gICAgIGlmKHR5cGVvZiBuZXdDb250ZW50ID09PSAnc3RyaW5nJykgbmV3Q29udGVudCA9IFtbbW9kdWxlLmlkLCBuZXdDb250ZW50LCAnJ11dO1xuICAgICB1cGRhdGUobmV3Q29udGVudCk7XG4gICB9KTtcbiB9XG4gLy8gV2hlbiB0aGUgbW9kdWxlIGlzIGRpc3Bvc2VkLCByZW1vdmUgdGhlIDxzdHlsZT4gdGFnc1xuIG1vZHVsZS5ob3QuZGlzcG9zZShmdW5jdGlvbigpIHsgdXBkYXRlKCk7IH0pO1xufSIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0aWQ6IG1vZHVsZUlkLFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4vLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuX193ZWJwYWNrX3JlcXVpcmVfXy5tID0gX193ZWJwYWNrX21vZHVsZXNfXztcblxuIiwidmFyIGRlZmVycmVkID0gW107XG5fX3dlYnBhY2tfcmVxdWlyZV9fLk8gPSBmdW5jdGlvbihyZXN1bHQsIGNodW5rSWRzLCBmbiwgcHJpb3JpdHkpIHtcblx0aWYoY2h1bmtJZHMpIHtcblx0XHRwcmlvcml0eSA9IHByaW9yaXR5IHx8IDA7XG5cdFx0Zm9yKHZhciBpID0gZGVmZXJyZWQubGVuZ3RoOyBpID4gMCAmJiBkZWZlcnJlZFtpIC0gMV1bMl0gPiBwcmlvcml0eTsgaS0tKSBkZWZlcnJlZFtpXSA9IGRlZmVycmVkW2kgLSAxXTtcblx0XHRkZWZlcnJlZFtpXSA9IFtjaHVua0lkcywgZm4sIHByaW9yaXR5XTtcblx0XHRyZXR1cm47XG5cdH1cblx0dmFyIG5vdEZ1bGZpbGxlZCA9IEluZmluaXR5O1xuXHRmb3IgKHZhciBpID0gMDsgaSA8IGRlZmVycmVkLmxlbmd0aDsgaSsrKSB7XG5cdFx0dmFyIGNodW5rSWRzID0gZGVmZXJyZWRbaV1bMF07XG5cdFx0dmFyIGZuID0gZGVmZXJyZWRbaV1bMV07XG5cdFx0dmFyIHByaW9yaXR5ID0gZGVmZXJyZWRbaV1bMl07XG5cdFx0dmFyIGZ1bGZpbGxlZCA9IHRydWU7XG5cdFx0Zm9yICh2YXIgaiA9IDA7IGogPCBjaHVua0lkcy5sZW5ndGg7IGorKykge1xuXHRcdFx0aWYgKChwcmlvcml0eSAmIDEgPT09IDAgfHwgbm90RnVsZmlsbGVkID49IHByaW9yaXR5KSAmJiBPYmplY3Qua2V5cyhfX3dlYnBhY2tfcmVxdWlyZV9fLk8pLmV2ZXJ5KGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXy5PW2tleV0oY2h1bmtJZHNbal0pOyB9KSkge1xuXHRcdFx0XHRjaHVua0lkcy5zcGxpY2Uoai0tLCAxKTtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdGZ1bGZpbGxlZCA9IGZhbHNlO1xuXHRcdFx0XHRpZihwcmlvcml0eSA8IG5vdEZ1bGZpbGxlZCkgbm90RnVsZmlsbGVkID0gcHJpb3JpdHk7XG5cdFx0XHR9XG5cdFx0fVxuXHRcdGlmKGZ1bGZpbGxlZCkge1xuXHRcdFx0ZGVmZXJyZWQuc3BsaWNlKGktLSwgMSlcblx0XHRcdHZhciByID0gZm4oKTtcblx0XHRcdGlmIChyICE9PSB1bmRlZmluZWQpIHJlc3VsdCA9IHI7XG5cdFx0fVxuXHR9XG5cdHJldHVybiByZXN1bHQ7XG59OyIsIi8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcblx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG5cdFx0ZnVuY3Rpb24oKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG5cdFx0ZnVuY3Rpb24oKSB7IHJldHVybiBtb2R1bGU7IH07XG5cdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsIHsgYTogZ2V0dGVyIH0pO1xuXHRyZXR1cm4gZ2V0dGVyO1xufTsiLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBkZWZpbml0aW9uKSB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18uZyA9IChmdW5jdGlvbigpIHtcblx0aWYgKHR5cGVvZiBnbG9iYWxUaGlzID09PSAnb2JqZWN0JykgcmV0dXJuIGdsb2JhbFRoaXM7XG5cdHRyeSB7XG5cdFx0cmV0dXJuIHRoaXMgfHwgbmV3IEZ1bmN0aW9uKCdyZXR1cm4gdGhpcycpKCk7XG5cdH0gY2F0Y2ggKGUpIHtcblx0XHRpZiAodHlwZW9mIHdpbmRvdyA9PT0gJ29iamVjdCcpIHJldHVybiB3aW5kb3c7XG5cdH1cbn0pKCk7IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqLCBwcm9wKSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKTsgfSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5iID0gZG9jdW1lbnQuYmFzZVVSSSB8fCBzZWxmLmxvY2F0aW9uLmhyZWY7XG5cbi8vIG9iamVjdCB0byBzdG9yZSBsb2FkZWQgYW5kIGxvYWRpbmcgY2h1bmtzXG4vLyB1bmRlZmluZWQgPSBjaHVuayBub3QgbG9hZGVkLCBudWxsID0gY2h1bmsgcHJlbG9hZGVkL3ByZWZldGNoZWRcbi8vIFtyZXNvbHZlLCByZWplY3QsIFByb21pc2VdID0gY2h1bmsgbG9hZGluZywgMCA9IGNodW5rIGxvYWRlZFxudmFyIGluc3RhbGxlZENodW5rcyA9IHtcblx0XCJvcHRpb25zXCI6IDBcbn07XG5cbi8vIG5vIGNodW5rIG9uIGRlbWFuZCBsb2FkaW5nXG5cbi8vIG5vIHByZWZldGNoaW5nXG5cbi8vIG5vIHByZWxvYWRlZFxuXG4vLyBubyBITVJcblxuLy8gbm8gSE1SIG1hbmlmZXN0XG5cbl9fd2VicGFja19yZXF1aXJlX18uTy5qID0gZnVuY3Rpb24oY2h1bmtJZCkgeyByZXR1cm4gaW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdID09PSAwOyB9O1xuXG4vLyBpbnN0YWxsIGEgSlNPTlAgY2FsbGJhY2sgZm9yIGNodW5rIGxvYWRpbmdcbnZhciB3ZWJwYWNrSnNvbnBDYWxsYmFjayA9IGZ1bmN0aW9uKHBhcmVudENodW5rTG9hZGluZ0Z1bmN0aW9uLCBkYXRhKSB7XG5cdHZhciBjaHVua0lkcyA9IGRhdGFbMF07XG5cdHZhciBtb3JlTW9kdWxlcyA9IGRhdGFbMV07XG5cdHZhciBydW50aW1lID0gZGF0YVsyXTtcblx0Ly8gYWRkIFwibW9yZU1vZHVsZXNcIiB0byB0aGUgbW9kdWxlcyBvYmplY3QsXG5cdC8vIHRoZW4gZmxhZyBhbGwgXCJjaHVua0lkc1wiIGFzIGxvYWRlZCBhbmQgZmlyZSBjYWxsYmFja1xuXHR2YXIgbW9kdWxlSWQsIGNodW5rSWQsIGkgPSAwO1xuXHRpZihjaHVua0lkcy5zb21lKGZ1bmN0aW9uKGlkKSB7IHJldHVybiBpbnN0YWxsZWRDaHVua3NbaWRdICE9PSAwOyB9KSkge1xuXHRcdGZvcihtb2R1bGVJZCBpbiBtb3JlTW9kdWxlcykge1xuXHRcdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKG1vcmVNb2R1bGVzLCBtb2R1bGVJZCkpIHtcblx0XHRcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tW21vZHVsZUlkXSA9IG1vcmVNb2R1bGVzW21vZHVsZUlkXTtcblx0XHRcdH1cblx0XHR9XG5cdFx0aWYocnVudGltZSkgdmFyIHJlc3VsdCA9IHJ1bnRpbWUoX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cdH1cblx0aWYocGFyZW50Q2h1bmtMb2FkaW5nRnVuY3Rpb24pIHBhcmVudENodW5rTG9hZGluZ0Z1bmN0aW9uKGRhdGEpO1xuXHRmb3IoO2kgPCBjaHVua0lkcy5sZW5ndGg7IGkrKykge1xuXHRcdGNodW5rSWQgPSBjaHVua0lkc1tpXTtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oaW5zdGFsbGVkQ2h1bmtzLCBjaHVua0lkKSAmJiBpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF0pIHtcblx0XHRcdGluc3RhbGxlZENodW5rc1tjaHVua0lkXVswXSgpO1xuXHRcdH1cblx0XHRpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF0gPSAwO1xuXHR9XG5cdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fLk8ocmVzdWx0KTtcbn1cblxudmFyIGNodW5rTG9hZGluZ0dsb2JhbCA9IHNlbGZbXCJ3ZWJwYWNrQ2h1bmtleHRcIl0gPSBzZWxmW1wid2VicGFja0NodW5rZXh0XCJdIHx8IFtdO1xuY2h1bmtMb2FkaW5nR2xvYmFsLmZvckVhY2god2VicGFja0pzb25wQ2FsbGJhY2suYmluZChudWxsLCAwKSk7XG5jaHVua0xvYWRpbmdHbG9iYWwucHVzaCA9IHdlYnBhY2tKc29ucENhbGxiYWNrLmJpbmQobnVsbCwgY2h1bmtMb2FkaW5nR2xvYmFsLnB1c2guYmluZChjaHVua0xvYWRpbmdHbG9iYWwpKTsiLCIiLCIvLyBzdGFydHVwXG4vLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbi8vIFRoaXMgZW50cnkgbW9kdWxlIGRlcGVuZHMgb24gb3RoZXIgbG9hZGVkIGNodW5rcyBhbmQgZXhlY3V0aW9uIG5lZWQgdG8gYmUgZGVsYXllZFxudmFyIF9fd2VicGFja19leHBvcnRzX18gPSBfX3dlYnBhY2tfcmVxdWlyZV9fLk8odW5kZWZpbmVkLCBbXCJjaHVuay12ZW5kb3JzXCJdLCBmdW5jdGlvbigpIHsgcmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oXCIuL3NyYy9vcHRpb25zL2luZGV4LmpzXCIpOyB9KVxuX193ZWJwYWNrX2V4cG9ydHNfXyA9IF9fd2VicGFja19yZXF1aXJlX18uTyhfX3dlYnBhY2tfZXhwb3J0c19fKTtcbiIsIiJdLCJuYW1lcyI6WyJuYW1lIiwiZGF0YSIsImtleXdvcmQiLCJEYXRhIiwiY3JlYXRlZCIsImdldEJsb2NrTGlzdCIsIm1ldGhvZHMiLCJjaHJvbWUiLCJzdG9yYWdlIiwibG9jYWwiLCJnZXQiLCJlbnRyeSIsImJsb2NrTGlzdCIsIk9iamVjdCIsInZhbHVlcyIsInNhdmVCbG9ja0xpc3QiLCJzZXQiLCJkZWxldGVCbG9ja0xpc3QiLCJpbmRleCIsInNwbGljZSIsImFkZEJsb2NrTGlzdCIsInB1c2giLCJyZXNldCIsImNsZWFyIiwiY29uc29sZSIsImxvZyIsIl9jcmVhdGVFbGVtZW50Vk5vZGUiLCJfY3JlYXRlVk5vZGUiLCJfY29tcG9uZW50X2VsX2NhcmQiLCJzdHlsZSIsImhlYWRlciIsIl9ob2lzdGVkXzEiLCJfY29tcG9uZW50X2VsX3RhYmxlIiwiJGRhdGEiLCJfY29tcG9uZW50X2VsX3RhYmxlX2NvbHVtbiIsInByb3AiLCJsYWJlbCIsIndpZHRoIiwiYWxpZ24iLCJkZWZhdWx0Iiwic2NvcGUiLCJfY29tcG9uZW50X2VsX2J1dHRvbiIsInR5cGUiLCJvbkNsaWNrIiwiJG9wdGlvbnMiLCIkaW5kZXgiLCJfY29tcG9uZW50X2VsX3JvdyIsImp1c3RpZnkiLCJfY29tcG9uZW50X2VsX2NvbCIsInNwYW4iLCJfY29tcG9uZW50X2VsX2lucHV0IiwiJGV2ZW50IiwicGxhY2Vob2xkZXIiLCJfY29tcG9uZW50X2VsX2RpdmlkZXIiLCJzaXplIiwiY3JlYXRlQXBwIiwiQXBwIiwiRWxlbWVudFBsdXMiLCJ1c2UiLCJtb3VudCJdLCJzb3VyY2VSb290IjoiIn0=