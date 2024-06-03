import './index.css'
import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import PrimeVue from 'primevue/config'

import App from './App.vue'
import router from './router'
import CInput from '@/components/General/CInput.vue'
import CButton from '@/components/General/CButton.vue'
import CIcon from '@/components/General/CIcon.vue'
import CCheckBox from '@/components/General/CCheckBox.vue'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import Notifications from 'notiwind'

const app = createApp(App)

app.use(PrimeVue)
app.use(createPinia())
app.use(router)
app.use(Notifications)

// Define component
app.component('CInput', CInput)
app.component('CButton', CButton)
app.component('CIcon', CIcon)
app.component('CCheckBox', CCheckBox)
app.component('FontAwesomeIcon', FontAwesomeIcon)

app.mount('#app')
