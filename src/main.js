import { createApp } from 'vue'
import App from './App.vue'
import '../node_modules/bulma/css/bulma.css'
import './assets/styles/style.css';
import mitt from 'mitt';
const emitter = mitt();

const app = createApp(App)
app.config.globalProperties.emitter = emitter;
app.mount('#app')
