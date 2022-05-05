import { createApp } from 'vue'
import App from './App/App.vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css';
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

const app = createApp(App)
for(const icon in ElementPlusIconsVue) {
    app.component(icon, ElementPlusIconsVue[icon])
}
app.use(ElementPlus).mount('#app')