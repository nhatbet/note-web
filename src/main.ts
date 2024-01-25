import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import './index.css'
import CInput from '@/components/General/CInput.vue'
import CButton from '@/components/General/CButton.vue'
import CIcon from '@/components/General/CIcon.vue'
/* import font awesome icon component */
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
/* import the fontawesome core */
import { library } from '@fortawesome/fontawesome-svg-core'
/* import specific icons */
import { faUserSecret, faAsterisk } from '@fortawesome/free-solid-svg-icons'
// import axios from 'axios'
// import VueAxios from 'vue-axios'

/* add icons to the library */
library.add({faUserSecret, faAsterisk})

const app = createApp(App)

app.use(createPinia())
app.use(router)
// app.use(VueAxios, axios)

app.component('CInput', CInput);
app.component('CButton', CButton);
app.component('CIcon', CIcon);
app.component('FontAwesomeIcon', FontAwesomeIcon);

app.mount('#app')
