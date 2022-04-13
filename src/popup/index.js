import Vue from "vue";
import AppComponent from "./App/App.vue";
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

Vue.component("app-component", AppComponent);
Vue.use(ElementUI)

new Vue({
  el: "#app",
  render: createElement => {
    return createElement(AppComponent);
  }
});
