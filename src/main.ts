import './index.css'
import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import CInput from '@/components/General/CInput.vue'
import CButton from '@/components/General/CButton.vue'
import CSelect from '@/components/General/CSelect.vue'
import CIcon from '@/components/General/CIcon.vue'
import CCheckBox from '@/components/General/CCheckBox.vue'
import CSelectSearch from '@/components/General/CSelectSearch.vue'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import Vue3Toasity, { toast, type ToastContainerOptions } from 'vue3-toastify'
import 'vue3-toastify/dist/index.css'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(Vue3Toasity, {
    autoClose: 3000,
    position: toast.POSITION.TOP_RIGHT,
    closeButton: false,
    theme: 'auto',
    bodyClassName: 'text-base',
    style: {
        opacity: '1',
        userSelect: 'initial'
    }
    // ...
} as ToastContainerOptions)

// Define component
app.component('CInput', CInput)
app.component('CButton', CButton)
app.component('CSelect', CSelect)
app.component('CIcon', CIcon)
app.component('CCheckBox', CCheckBox)
app.component('CSelectSearch', CSelectSearch)
app.component('FontAwesomeIcon', FontAwesomeIcon)

app.mount('#app')
