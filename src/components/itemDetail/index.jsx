// import { Card } from "@mui/material";
// import React from "react";
// import { useParams } from "react-router-dom";

// const Details = ({itemsMuestra}) => {
//   const { category, id } = useParams();
//   const itemsFiltrados = itemsMuestra.filter((item) => item.id === id);
//   itemsFiltrados.map((producto, index) => {
//     return <Card item={producto} key={index} />
//   })
//   return <div></div>;
// };

// export default Details;

import { Card, CardContent, CardMedia, Typography } from "@mui/material";
import React, { useContext } from "react";
import { useParams } from "react-router-dom";
import styles from "./item.module.scss";
import { GridLoader } from "react-spinners";
import { CgEnter } from "react-icons/cg";
import { BiCartAlt } from "react-icons/bi";
import dataContext from "../../../Funciones/dataContext";

const Details = ({ itemsMuestra }) => {
  const { category, id } = useParams();
  const { setUpdateStorage } = useContext(dataContext);
  const itemsFiltrados = itemsMuestra.filter((item) => item.id === id);

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

  if (itemsFiltrados.length === 0) {
    return (
      <div className={styles.component}>
        <h1>Cargando</h1>
        <GridLoader color="#ffff" size={20} />
      </div>
    );
  }

  const producto = itemsFiltrados[0];

  return (
    <div className={styles.cardContainer}>
      <Card
        sx={{
          flexDirection: "column",
          width: 400,
          bgcolor: "#111111",
          display: "flex",
          alignItems: "center",
        }}
      >
        <img
          style={{
            width: "70%",
            height: "50%",
            marginTop: "10px",
            borderRadius: "10px",
          }}
          src={producto.image}
          alt=""
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div" color="white">
            {producto.title}
          </Typography>
          <Typography variant="body2" color="white">
            {producto.description}
          </Typography>
          <div
            className={styles.cardButton}
            onClick={() => addProduct(producto.price, producto.title)}
          >
            <Typography variant="h6" color="white">
              ${producto.price}
            </Typography>
            <div className={styles.iconContainer}>
              <BiCartAlt />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Details;
