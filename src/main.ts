import { createApp } from 'vue'
import i18n from './locales/i18n'
import { router } from "./router/index"
import App from './App.vue'
import './index.css'

const app = createApp(App)
app.use(i18n)
app.use(router)
app.mount('#app')
