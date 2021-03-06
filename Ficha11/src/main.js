import Vue from 'vue';
//import './plugins/vuetify';
import App from './App.vue';
import router from './router';
import VueCookies from "vue-cookies";
import Ionic from '@ionic/vue';
import '@ionic/core/css/ionic.bundle.css';
import './registerServiceWorker'

Vue.use(VueCookies);
Vue.use(Ionic);
Vue.config.productionTip = false;

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
