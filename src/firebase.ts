import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDpNB_WuSU2utIJltFHt6pbB937tJUPrw8",
  authDomain: "zenpet---crm.firebaseapp.com",
  projectId: "zenpet---crm",
  storageBucket: "zenpet---crm.firebasestorage.app",
  messagingSenderId: "277138900652",
  appId: "1:277138900652:web:1de71e55eab1249ffa4109"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);