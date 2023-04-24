import React, { useContext } from "react";
import styles from "./card.module.scss";
import { BiCartAlt, FiInfo } from "react-icons/all";
import { useNavigate } from "react-router-dom";
import dataContext from "../../../Funciones/dataContext";

const Card = ({ item }) => {
  const { setUpdateStorage } = useContext(dataContext);

  const navigate = useNavigate();
  const handleClick = (category, id) => {
    if (category !== "" && id !== "") {
      return navigate(`/products/${category}/${id}`);
    }
  };
  const addProduct = (price, name) => {
    localStorage.setItem(
      "orden",
      JSON.stringify([
        ...JSON.parse(localStorage.getItem("orden") || "[]"),
        { price, name },
      ])
    );

    setUpdateStorage(JSON.parse(localStorage.getItem("orden")));
  };
  return (
    <div className={styles.card}>
      <img src={item.image} className={styles.cardImg}></img>
      <div className={styles.cardInfo}>
        <p
          className={styles.textTitle}
          style={item.title.length > 35 ? { fontSize: 13 } : { fontSize: 15 }}
        >
          {item.title}
        </p>
      </div>
      <div className={styles.cardFooter}>
        <span className={styles.textTitle}>{`$${item.price}`}</span>
        <FiInfo
          className={styles.infoIcon}
          onClick={() => {
            handleClick(item.category, item.id);
          }}
          style={{ cursor: "pointer" }}
          fontSize={20}
        />
        <div
          className={styles.cardButton}
          onClick={() => addProduct(item.price, item.title)}
        >
          <BiCartAlt />
        </div>
      </div>
    </div>
  );
};

export default Card;
