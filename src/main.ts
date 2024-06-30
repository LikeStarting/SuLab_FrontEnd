import { createApp } from 'vue'
import router from './router'
import { setupStore } from '@/store'

import './style.css'
import App from './App.vue'

import SvgIcon from '@/components/SvgIcon/index.vue'
import HappyButton from '@/components/HappyButton/index.vue'
import '@/assets/iconfont/iconfont.js'

const app = createApp(App)

setupStore(app)
app.component('SvgIocn', SvgIcon)
app.component('HappyButton', HappyButton)


// console.log('当前地址',process.env.VUE_APP_URL)
app.use(router).mount('#app')
