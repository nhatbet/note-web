import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import './index.css'
import CInput from '@/components/General/CInput.vue'
import CButton from '@/components/General/CButton.vue'
import CIcon from '@/components/General/CIcon.vue'

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.component('CInput', CInput);
app.component('CButton', CButton);
app.component('CIcon', CIcon);

app.mount('#app')
