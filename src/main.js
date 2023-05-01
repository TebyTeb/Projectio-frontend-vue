// Components
import App from './App.vue'
import VueDatePicker from '@vuepic/vue-datepicker'

// Composables
import { createApp } from 'vue'
const app = createApp(App)

// Plugins
import { createPinia } from 'pinia'
import router from './router'
import vuetify from './plugins/vuetify'

// Styles
import '@vuepic/vue-datepicker/dist/main.css'
import './assets/base.css'

app
  .component('VueDatePicker', VueDatePicker)
  .use(createPinia())
  .use(router)
  .use(vuetify)
  .mount('#app')
