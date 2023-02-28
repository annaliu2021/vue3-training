import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import axios from 'axios'
import VueAxios from 'vue-axios'
import { LoadingPlugin } from 'vue-loading-overlay'
import 'vue-loading-overlay/dist/css/index.css'

import './assets/all.scss'

import { defineRule, configure } from 'vee-validate'
import { localize, setLocale } from '@vee-validate/i18n'
import AllRules from '@vee-validate/rules'
import zhTW from './assets/utils/zh_TW.json'

Object.keys(AllRules).forEach((rule) => {
    defineRule(rule, AllRules[rule])
})
configure({
    generateMessage: localize({
        zhTW
    })
})
setLocale('zhTW')

const app = createApp(App)

// 全域註冊
app.use(createPinia())
app.use(VueAxios, axios)
app.use(LoadingPlugin, {
    loader: 'dots',
    canCancel: true,
    color: '#36495e'
})

app.use(router)
app.mount('#app')
