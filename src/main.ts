import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './assets/style/reset.css'
import lazyLoad from './directives/lazy-load'
import scroll from './directives/scroll'

createApp(App).use(router).use(lazyLoad).use(scroll).mount('#app')
