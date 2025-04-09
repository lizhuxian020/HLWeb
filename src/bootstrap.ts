import App from './App.vue'
import {createApp} from 'vue'
import store from './store'

//需要引入ElementPlus和以下这句, 来实现引用对应组件的css
import 'element-plus/dist/index.css'
import './assets/css/global.less'

import router from './router'
import ElementPlus from 'element-plus'

const app = createApp(App)

app.config.errorHandler = (err) => {
    console.log("捕获到全局错误: " + err)
}

app.use(router).use(store).use(ElementPlus)
app.mount('#emp-root')

window.addEventListener('unhandledrejection', event => {
    console.log('全局未捕获 Promise 错误：', event.reason)
    event.preventDefault()
})