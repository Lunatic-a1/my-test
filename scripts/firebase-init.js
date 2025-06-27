import { initializeApp, getApps } from "https://www.gstatic.com/firebasejs/11.9.1/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.9.1/firebase-analytics.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/11.9.1/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyAdc-uOw-RkwioP-GFf1BouVu4JBkfGFnU",
  authDomain: "login-4cb47.firebaseapp.com",
  projectId: "login-4cb47",
  storageBucket: "login-4cb47.firebasestorage.app",
  messagingSenderId: "866437023451",
  appId: "1:866437023451:web:c41f1a1b07accf50ae2efe",
  measurementId: "G-EW136C5LGV"
};

const app = getApps().length ? getApps()[0] : initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);

export { app, analytics, auth }; 