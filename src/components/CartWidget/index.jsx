import React, { useContext, useEffect, useState } from "react";
import styles from "./cart.module.scss";
import { BiCartAlt } from "react-icons/all";
import dataContext from "../../../Funciones/dataContext.js";
import { useNavigate } from "react-router-dom";

const CartWidget = () => {
  const { updateStorage } = useContext(dataContext);
  const [cartItems, setCartItems] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const data = localStorage.getItem("orden");
    if (data) {
      setCartItems(JSON.parse(data));
    } else {
      setCartItems([]);
    }
  }, [updateStorage]);

  useEffect(() => {
    localStorage.setItem("orden", JSON.stringify(cartItems));
  }, [cartItems]);

  return (
    <div onClick={() => navigate("/checkout")} className={styles.cartContainer}>
      <BiCartAlt />
      <div className={styles.badge}>{cartItems?.length}</div>
    </div>
  );
};

export default CartWidget;
