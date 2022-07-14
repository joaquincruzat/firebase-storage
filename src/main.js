import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
// Import Bootstrap and BootstrapVue CSS files (order is important)
import { BootstrapVue, IconsPlugin } from "bootstrap-vue";
import "bootstrap";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore/lite";
import { getAuth } from "firebase/auth";
import firebase from "firebase/compat/app";
import "firebase/compat/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDvHnZU8n5FFHQp_RvVUhrFtnmnWz1fvfQ",
  authDomain: "probando-firebase-storage.firebaseapp.com",
  projectId: "probando-firebase-storage",
  storageBucket: "probando-firebase-storage.appspot.com",
  messagingSenderId: "445751382628",
  appId: "1:445751382628:web:26a5b02c5cc7fb38d94571",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
// const storage = firebase.storage();
const storageRef = firebase.storage().ref();
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth();

export { db, auth, storageRef };
// Make BootstrapVue available throughout your project
Vue.use(BootstrapVue);
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
