import { initializeApp } from "https://www.gstatic.com/firebasejs/13.2.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/13.2.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/13.2.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyAQrAk-4IgEsTkyO3vn_uRTgYpwoe8FZyo",
  authDomain: "workerbookingapp-f0a88.firebaseapp.com",
  projectId: "workerbookingapp-f0a88",
  storageBucket: "workerbookingapp-f0a88.firebasestorage.app",
  messagingSenderId: "900391466387",
  appId: "1:900391466387:web:3ddf0a6c4ea191b987a466"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);