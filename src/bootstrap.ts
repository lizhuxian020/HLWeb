import App from './App.vue'
import {createApp} from 'vue'

import './assets/css/global.less'

import router from './router'
const app = createApp(App)
app.use(router)
app.mount('#emp-root')
