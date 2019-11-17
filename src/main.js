import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import * as firebase from "firebase"
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import VueGapi from 'vue-gapi'
import VueCtkDateTimePicker from 'vue-ctk-date-time-picker';
import 'vue-ctk-date-time-picker/dist/vue-ctk-date-time-picker.css';

Vue.component('VueCtkDateTimePicker', VueCtkDateTimePicker);

Vue.config.productionTip = false;

const firebaseConfig = {
    apiKey: "AIzaSyDgz-dW8vkxSj2KQALh3DKGqXUAiGfEM94",
    authDomain: "vuecalendar-a6974.firebaseapp.com",
    databaseURL: "https://vuecalendar-a6974.firebaseio.com",
    projectId: "vuecalendar-a6974",
    storageBucket: "vuecalendar-a6974.appspot.com",
    messagingSenderId: "595917652440",
    appId: "1:595917652440:web:fa7055a5f7343a8b22b2ad",
    measurementId: "G-4Z472VKX0D",

    clientId: "162950825332-5251b6v5ktgjn4br7u7bt1h2ecplh11i.apps.googleusercontent.com",
    scope: "https://www.googleapis.com/auth/calendar",
    discoveryDocs: [
        "https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"
    ]
};

Vue.use(BootstrapVue);
Vue.use(require('vue-moment'));
Vue.use(VueGapi, firebaseConfig);

firebase.initializeApp(firebaseConfig);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
