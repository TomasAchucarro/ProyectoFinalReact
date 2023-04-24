import React, { useContext, useEffect, useState } from "react";
import dataContext from "../../../Funciones/dataContext.js";
import styles from "./checkout.module.scss";
import ModalUser from "../ModalUser/index.jsx";
import { FaRegTrashAlt } from "react-icons/all";
import { Button } from "@mui/material";

const Checkout = () => {
  const { updateStorage, setUpdateStorage } = useContext(dataContext);
  const [data, setData] = useState([]);
  const [open, setOpen] = React.useState(false);

  const [listProducts, setListProducts] = useState({});

  useEffect(() => {
    const data = localStorage.getItem("orden");
    if (data) {
      setData(JSON.parse(data));
    }
  }, [updateStorage]);

  useEffect(() => {
    if (data) {
      const grupoProductos = data.reduce((acc, item) => {
        if (!acc[item.name]) {
          acc[item.name] = {
            price: item.price,
            quantity: 1,
          };
        } else {
          acc[item.name].quantity++;
        }
        return acc;
      }, {});
      setListProducts(grupoProductos);
    }else{
      setListProducts({})
    }
  }, [data]);

  const total = data.reduce((acc, item) => acc + item.price, 0);

  const handleClose = () => {
    setOpen(false);
  };
  const handleDelete = () => {
    localStorage.clear();
    setUpdateStorage(JSON.parse(localStorage.getItem("orden")));
    setListProducts({});
    setData([]);
  };

  return (
    <div className={styles.containerMain}>
      <div className={styles.box}>
        {listProducts.length !== 0 &&
          Object.keys(listProducts).map((item, index) => {
            return (
              <div className={styles.detail} key={`${item}-${index}`}>
                <h1>{item}</h1>
                <div className={styles.attribute}>
                  <p>{listProducts[item].quantity} x</p>
                  <input
                    type="text"
                    readOnly
                    value={`$${listProducts[item].price}`}
                  />
                </div>
              </div>
            );
          })}
        <div className={styles.divider}></div>
        <div className={styles.resumen}>
          <h1>Resumen</h1>
          <div className={styles.total}>
            <h1>Total</h1>
            <input type="text" readOnly value={`$${total.toFixed(2)}`} />
          </div>
        </div>
      </div>
      <div className={styles.btnConfirm}>
        <button onClick={() => setOpen(!open)}>Confirmar</button>
        <button onClick={() => handleDelete()}>Eliminar carrito</button>
        <ModalUser open={open} handleClose={handleClose} />
      </div>
    </div>
  );
};

export default Checkout;
