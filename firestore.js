const firebase = require('firebase');
const firebaseConfig = {
    apiKey: "AIzaSyBp1qEtkUusgKv1jPkPFv0bMifvdjoDU9U",
    authDomain: "mguelpa-lab-iv-tp-clinica.firebaseapp.com",
    projectId: "mguelpa-lab-iv-tp-clinica",
    storageBucket: "mguelpa-lab-iv-tp-clinica.appspot.com",
    messagingSenderId: "833475649362",
    appId: "1:833475649362:web:4d2b25e34469ddd214248b",
    measurementId: "G-L7P9FRJFF9"
};
  
const db = firebase.default.initializeApp(firebaseConfig);

module.exports = db;
