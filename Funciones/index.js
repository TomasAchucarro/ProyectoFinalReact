import { addDoc, getDocs, collection, doc, deleteDoc } from "firebase/firestore";
import db from "../db/firebase-config";

const funcion = [];
const itemC = collection(db, "items");

funcion.getItems = async () => {
  const itemsCollection = await getDocs(itemC);
  const items = itemsCollection.docs.map((doc) => ({
    ...doc.data(),
    id: doc.id,
  }));
  return items;
};

funcion.addItem = async (orden) => {
  const orderCollection = collection(db, "orders");
  await addDoc(orderCollection, { orden });
};

funcion.getOrder = async () => {
  const orderCollection = collection(db, "orders");
  const orderArray = await getDocs(orderCollection);
  const order = orderArray.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
  return order;
};

funcion.deleteItem = async (order) => {
  const docRef = doc(db, "orders", order);
  await deleteDoc(docRef);
};

funcion.updateItem = async (id, inStock) => {
  const docRef = doc(db, "items", id);
  await updateDoc(docRef, { inStock: !inStock });
  getItems();
};

export default funcion;
