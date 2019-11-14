import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import * as firebase from "firebase"
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.config.productionTip = false;
Vue.use(BootstrapVue);

const firebaseConfig = {
  apiKey: "AIzaSyDgz-dW8vkxSj2KQALh3DKGqXUAiGfEM94",
  authDomain: "vuecalendar-a6974.firebaseapp.com",
  databaseURL: "https://vuecalendar-a6974.firebaseio.com",
  projectId: "vuecalendar-a6974",
  storageBucket: "vuecalendar-a6974.appspot.com",
  messagingSenderId: "595917652440",
  appId: "1:595917652440:web:fa7055a5f7343a8b22b2ad",
  measurementId: "G-4Z472VKX0D"
};

firebase.initializeApp(firebaseConfig);

firebase.auth().getRedirectResult()
    .then(result => {
      if(result.credential) {
        console.log(result.credential.accessToken);
      }
      router.replace({ name: "home" });
    }).catch(err => {
  console.error(err.message)
});

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
