import "./App.css";
import { Navigate, Route, Routes } from "react-router-dom";
import Navbar from "./components/navbar";
import Home from "./components/Home";
import { useEffect, useState } from "react";
import funcion from "../Funciones";
import Details from "./components/itemDetail";
import List from "./components/List";
import Checkout from "./components/Checkout";
import dataContext from "../Funciones/dataContext.js";

function App() {
  const { getItems } = funcion;
  const [itemsMuestra, setItemsMuestra] = useState([]);
  const [updateStorage, setUpdateStorage] = useState([]);

  useEffect(() => {
    getData();
  }, []);

  async function getData() {
    const items = await getItems();
    setItemsMuestra(items);
  }
  return (
    <dataContext.Provider
      value={{
        updateStorage: updateStorage,
        setUpdateStorage: setUpdateStorage,
      }}
    >
      <div>
        <Navbar />
        <Routes>
          <Route
            path="/"
            element={<Home itemsMuestra={itemsMuestra} />}
          ></Route>
          <Route
            path="/:order"
            element={<Home itemsMuestra={itemsMuestra} />}
          ></Route>
          <Route
            path="/products"
            element={<List itemsMuestra={itemsMuestra} />}
          ></Route>
          <Route
            path="/products/:category"
            element={<List itemsMuestra={itemsMuestra} />}
          ></Route>
          <Route
            path="/products/:category/:id"
            element={<Details itemsMuestra={itemsMuestra} />}
          ></Route>
          <Route path="/checkout" element={<Checkout />}></Route>
          <Route path="/404" element={<h2>404 Not Found</h2>} />
          <Route path="*" element={<Navigate to="/404" />} />
        </Routes>
      </div>
    </dataContext.Provider>
  );
}

export default App;
