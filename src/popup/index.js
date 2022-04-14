import Vue from "vue";
import AppComponent from "./App/App.vue";
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import axios from 'axios'
import VueAxios from 'vue-axios'

Vue.component("app-component", AppComponent);
Vue.use(ElementUI)
Vue.use(VueAxios, axios)

new Vue({
  el: "#app",
  render: createElement => {
    return createElement(AppComponent);
  }
});
