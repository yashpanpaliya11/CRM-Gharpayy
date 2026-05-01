import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAJuUnFRzYaehwd6BHc6weadhK3MLJRcX4",
  authDomain: "gharpayy-b7b23.firebaseapp.com",
  projectId: "gharpayy-b7b23",
  storageBucket: "gharpayy-b7b23.firebasestorage.app",
  messagingSenderId: "901867683730",
  appId: "1:901867683730:web:59559cfb209fd5ce27cb4b"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
