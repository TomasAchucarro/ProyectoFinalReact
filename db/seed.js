import { collection, addDoc, getDocs } from "firebase/firestore";
import products from "../products.js";
import db from "./firebase-config.js";

const categories = [
  { id: "electronics" },
  { id: "jewelery" },
  { id: "men's clothing" },
  { id: "women's clothing" },
];

// const orderCollection = collection(db, "orders");
// const listOrders = addDoc(orderCollection, item);

// const categoryCollection = collection(db, "categories");
// const listCategories = categories.map((item) =>
//   addDoc(categoryCollection, item)
// );

const itemCollection = collection(db, "items");
const listItem = products.map((product) => addDoc(itemCollection, product));

Promise.all(listItem).then(() => {
  process.exit(0);
});
