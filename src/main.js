import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import './registerServiceWorker';

import VueTimeago from 'vue-timeago';
import 'vue-awesome/icons';
import Icon from 'vue-awesome/components/Icon';

Vue.config.productionTip = false;

Vue.use(VueTimeago, {
  name: 'timeago', // component name, `timeago` by default
  locale: 'en-US',
});

Vue.component('v-icon', Icon);

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
