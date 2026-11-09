import { auth, db } from "./firebase.js";

import {
  onAuthStateChanged,
  signOut
} from "https://www.gstatic.com/firebasejs/13.2.0/firebase-auth.js";

import {
  doc,
  getDoc
} from "https://www.gstatic.com/firebasejs/13.2.0/firebase-firestore.js";

const translations = {
  en: {
    brand: "Worker Booking",
    home: "Home",
    workers: "Workers",
    dashboard: "Dashboard",
    profile: "Profile",
    logout: "Logout",
    language: "اردو"
  },
  ur: {
    brand: "ورکر بکنگ",
    home: "ہوم",
    workers: "کاریگر",
    dashboard: "ڈیش بورڈ",
    profile: "پروفائل",
    logout: "لاگ آؤٹ",
    language: "English"
  }
};

export function setLanguage(lang) {
  const selected = lang === "ur" ? "ur" : "en";

  localStorage.setItem("appLanguage", selected);

  document.documentElement.lang = selected;
  document.documentElement.dir =
    selected === "ur" ? "rtl" : "ltr";

  const words = translations[selected];

  document.querySelectorAll("[data-i18n]").forEach(element => {
    const key = element.dataset.i18n;

    if (words[key]) {
      element.textContent = words[key];
    }
  });

  const languageButton = document.getElementById("languageButton");

  if (languageButton) {
    languageButton.textContent = words.language;
  }

  const brand = document.querySelector(".brand");

  if (brand) brand.textContent = words.brand;

  document.querySelectorAll("[data-nav]").forEach(element => {
    const key = element.dataset.nav;

    if (words[key]) {
      element.textContent = words[key];
    }
  });
}

export function applyLanguage() {
  const saved = localStorage.getItem("appLanguage") || "en";
  setLanguage(saved);
}

export function setHeader() {
  const header = document.querySelector("header");

  if (!header) return;

  header.innerHTML = `
    <div class="brand">Worker Booking</div>

    <nav>
      <a href="index.html" data-nav="home">Home</a>
      <a href="workers.html" data-nav="workers">Workers</a>
      <a href="dashboard.html" data-nav="dashboard">Dashboard</a>
      <a href="profile.html" data-nav="profile">Profile</a>
      <a href="#" id="logoutLink" data-nav="logout">Logout</a>

      <button id="languageButton" type="button">
        اردو
      </button>
    </nav>
  `;

  document.getElementById("logoutLink").onclick =
    async function(e) {
      e.preventDefault();

      try {
        await signOut(auth);
        location.href = "index.html";
      } catch(error) {
        alert(error.message);
      }
    };

  document.getElementById("languageButton").onclick =
    function() {
      const current =
        localStorage.getItem("appLanguage") || "en";

      setLanguage(current === "en" ? "ur" : "en");
    };

  applyLanguage();
}

export function requireUser() {
  return new Promise((resolve, reject) => {

    let unsubscribe;

    unsubscribe = onAuthStateChanged(auth, async user => {

      if (!user) {
        if (unsubscribe) unsubscribe();
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

        if (unsubscribe) unsubscribe();

      } catch(error) {
        reject(error);

        if (unsubscribe) unsubscribe();
      }

    });

  });
}