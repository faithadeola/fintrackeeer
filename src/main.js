 import { createApp } from 'vue'
 import { createPinia } from 'pinia'
 import App from './App.vue'
 import router from './router'
import Toast from 'vue-toastification'
import 'vue-toastification/dist/index.css'
import './assets/style.css'
 
const toastOptions = {
  position: 'top-right',
  timeout: 3000,
  closeOnClick: true,
  pauseOnFocusLoss: true,
  pauseOnHover: true,
  draggable: true,
  draggablePercent: 0.6,
  showCloseButtonOnHover: false,
  hideProgressBar: true,
  closeButton: 'button',
  icon: true,
  rtl: false
}

 const app = createApp(App)
 app.use(createPinia())
 app.use(router)
app.use(Toast, toastOptions)
 app.mount('#app')