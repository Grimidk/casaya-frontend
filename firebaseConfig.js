import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAuH2vV0xDjRMCTqO163HSlz8wNqIBrrNw",
  authDomain: "metrolabs-47f2a.firebaseapp.com",
  projectId: "metrolabs-47f2a",
  storageBucket: "metrolabs-47f2a.appspot.com", // Hardcodeado temporalmente
  messagingSenderId: "477224253016",
  appId: "1:477224253016:web:5b42dced42e50074547c2d",
  measurementId: "G-7LVDLR8SCN",
};

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

export { storage };