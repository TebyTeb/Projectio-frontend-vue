// Components
import App from './App.vue'

// Composables
import { createApp } from 'vue'
const app = createApp(App)

// Plugins
import { createPinia } from 'pinia'
import router from './router'
import vuetify from './plugins/vuetify'

// Styles
import './assets/main.css'

app
  .use(createPinia())
  .use(router)
  .use(vuetify)
  .mount('#app')
