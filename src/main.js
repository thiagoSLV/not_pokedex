import Vue from 'vue'
import App from './App.vue'
// import { BootstrapVue } from 'bootstrap-vue'
// import 'bootstrap/dist/css/bootstrap.css'
// import 'bootstrap-vue/dist/bootstrap-vue.css'
import '../node_modules/bulma/css/bulma.css'
import './assets/styles/style.css';

export const eventBus = new Vue();

Vue.config.productionTip = false
const app = Vue.createApp({
  render: h => h(App),
})

// app.use(BootstrapVue)
app.mount('#app')
