import { createApp } from 'vue'
import App from './App.vue'
import '../node_modules/bulma/css/bulma.css'
import './assets/styles/style.css';
import mitt from 'mitt';
const emitter = mitt();
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faUserSecret } from '@fortawesome/free-solid-svg-icons'
import { Vue3Mq } from "vue3-mq";
library.add(faUserSecret)

const app = createApp(App)
app.config.globalProperties.emitter = emitter;

app
    .use(Vue3Mq, {
        breapoimts: {
            'sm': 576,
            'md': 768,
            'lg': 992,
            'xl': 1200,
            'xxl': 1400,
        } 
        
    })
    .component('font-awesome-icon', FontAwesomeIcon)
    .mount('#app')
