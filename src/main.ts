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
import CLoading from '@/components/General/CLoading.vue'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import PrimeVue from 'primevue/config'
import Aura from '@primevue/themes/aura'
import ToastService from 'primevue/toastservice'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(ToastService)

// Define component
app.component('CInput', CInput)
app.component('CButton', CButton)
app.component('CSelect', CSelect)
app.component('CIcon', CIcon)
app.component('CCheckBox', CCheckBox)
app.component('CSelectSearch', CSelectSearch)
app.component('CLoading', CLoading)
app.component('FontAwesomeIcon', FontAwesomeIcon)

app.use(PrimeVue, {
    theme: {
        preset: Aura,
        options: {
            darkModeSelector: '.dark'
        }
    }
})

app.mount('#app')
