import { auth, db } from "./firebase.js";

import {
  onAuthStateChanged,
  signOut
} from "https://www.gstatic.com/firebasejs/13.2.0/firebase-auth.js";

import {
  doc,
  getDoc
} from "https://www.gstatic.com/firebasejs/13.2.0/firebase-firestore.js";

export function setHeader() {

  const header = document.querySelector("header");

  header.innerHTML = `
    <div class="brand">Worker Booking</div>

    <nav>
      <a href="index.html">Home</a>
      <a href="workers.html">Workers</a>
      <a href="dashboard.html">Dashboard</a>
      <a href="profile.html">Profile</a>
      <a href="#" id="logoutLink">Logout</a>
    </nav>
  `;

  document.getElementById("logoutLink").onclick =
    async function(e) {
      e.preventDefault();
      await signOut(auth);
      location.href = "index.html";
    };
}

export function requireUser() {

  return new Promise((resolve, reject) => {

    onAuthStateChanged(auth, async user => {

      if (!user) {
        location.href = "login.html";
        return;
      }

      try {

        const snap = await getDoc(
          doc(db, "users", user.uid)
        );

        resolve({
          user,
          profile: snap.exists() ? snap.data() : {}
        });

      } catch(error) {
        reject(error);
      }

    });

  });
}