import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import '@mdi/font/css/materialdesignicons.css'


// Vuetify
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import '@mdi/font/css/materialdesignicons.css';
import 'vue3-easy-data-table/dist/style.css';

const vuetify = createVuetify({
  components,
  directives,
})

const app = createApp(App)

app.use(store);
app.use(router);
app.use(vuetify);


app.mount('#app')

export { app };