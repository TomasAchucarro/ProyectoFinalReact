import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCuxA08rMW1Fh6lWlNqYac1HtQnDFDn-uk",
  authDomain: "coderhouse-ecommerce-4799c.firebaseapp.com",
  projectId: "coderhouse-ecommerce-4799c",
  storageBucket: "coderhouse-ecommerce-4799c.appspot.com",
  messagingSenderId: "1047271931986",
  appId: "1:1047271931986:web:2613b40f04c63b0d255f8b",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export default db;
