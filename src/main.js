import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import './registerServiceWorker';

import VueFire from 'vuefire';
import firebase from 'firebase';
import VueTimeago from 'vue-timeago';
import 'vue-awesome/icons';
import Icon from 'vue-awesome/components/Icon';

Vue.config.productionTip = false;

Vue.use(VueFire)

Vue.use(VueTimeago, {
  name: 'timeago', // component name, `timeago` by default
  locale: 'en-US'
});

Vue.component('v-icon', Icon);

// Initialize Firebase
var config = {
  apiKey: "AIzaSyAVRTxsNkDNq0En_0uAPmhUA_P_5hk6erA",
  authDomain: "fmly-fcfc0.firebaseapp.com",
  databaseURL: "https://fmly-fcfc0.firebaseio.com",
  projectId: "fmly-fcfc0",
  storageBucket: "fmly-fcfc0.appspot.com",
  messagingSenderId: "466327690780"
};
var firebaseApp = firebase.initializeApp(config);
var db = firebaseApp.database();

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
