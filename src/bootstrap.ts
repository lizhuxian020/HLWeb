import App from './App.vue'
import {createApp} from 'vue'

//需要引入ElementPlus和以下这句, 来实现引用对应组件的css
import 'element-plus/dist/index.css'
import './assets/css/global.less'

import router from './router'
import ElementPlus from 'element-plus'

const app = createApp(App)

app.use(router).use(ElementPlus)
app.mount('#emp-root')
