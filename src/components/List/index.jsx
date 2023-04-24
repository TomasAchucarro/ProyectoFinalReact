import React from "react";
import { useParams } from "react-router-dom";
import { GridLoader } from "react-spinners";
import Card from "../Card";
import styles from "./itemlist.module.scss";

const List = ({ itemsMuestra }) => {
  const { category } = useParams();
  if (itemsMuestra?.length === 0) {
    return (
      <div className={styles.component}>
        <h1>Cargando</h1>
        <GridLoader color="#ffff" size={20} />
      </div>
    );
  }
  if (typeof category === "undefined") {
    return (
      <div className={styles.cardContainer}>
        {itemsMuestra.map((producto, index) => {
          return <Card item={producto} key={index} />;
        })}
      </div>
    );
  }
  const categoryFilter = itemsMuestra.filter(
    (producto) => category === producto.category
  );

  return (
    <div className={styles.cardContainer}>
      {categoryFilter.map((producto, index) => {
        return <Card item={producto} key={index} />;
      })}
    </div>
  );
};

export default List;
