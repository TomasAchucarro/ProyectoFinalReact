import styles from "./home.module.scss";
import { GridLoader } from "react-spinners";
import Card from "../Card";
import { useNavigate, useParams } from "react-router-dom";
import ModalUser from "../ModalUser";
import { useState } from "react";

const Home = ({ itemsMuestra }) => {
  const { order } = useParams();
  const [open, setOpen] = useState(true);

  const handleClose = () => {
    setOpen(false);
  };

  const itemsFiltrados = itemsMuestra.filter(
    (item) =>
      item.price < 15 &&
      item.title !== "Pierced Owl Rose Gold Plated Stainless Steel Double"
  );

  return itemsFiltrados.length === 0 ? (
    <div className={styles.component}>
      <h1>Cargando</h1>
      <GridLoader color="#ffff" size={20} />
    </div>
  ) : (
    <div className={styles.container}>
      <div className={styles.titleContainer}>
        <h1>Bienvenidos a E-Store</h1>
      </div>
      <div className={styles.cardContainer}>
        {itemsFiltrados.map((item, index) => (
          <Card item={item} key={index} />
        ))}
      </div>
      {typeof order !== "undefined" && (
        <ModalUser open={open} handleClose={handleClose} order={order} />
      )}
    </div>
  );
};

export default Home;
