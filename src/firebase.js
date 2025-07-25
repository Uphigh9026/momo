import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyC87D3HVsWND_6MVOpO0gCemEwRzVXBvDE",
  authDomain: "momo-platform-1.firebaseapp.com",
  projectId: "momo-platform-1",
  storageBucket: "momo-platform-1.firebasestorage.app",
  messagingSenderId: "698654314314",
  appId: "1:698654314314:web:895d0f93ae1ab8be987bb3",
  measurementId: "G-36M76VFCF7"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app); 