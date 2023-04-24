import { NavLink, useNavigate } from "react-router-dom";
import CartWidget from "../CartWidget";
import styles from "./navbar.module.scss";

const Navbar = () => {
  const navigate = useNavigate() 
  return (
    <div className={styles.container}>
      <div className={styles.containerTitle}>
        <h1 style={{cursor:"pointer"}}onClick={() => navigate("/")}className={styles.title}>E-Store</h1>
      </div>
      <div className={styles.menu}>
        <NavLink to="/products">Todos</NavLink>
        <NavLink to="/products/men's clothing">Prendas Hombre</NavLink>
        <NavLink to="/products/women's clothing">Prendas Mujeres</NavLink>
        <NavLink to="/products/jewelery">Joyas</NavLink>
        <NavLink to="/products/electronics">Productos Electrónicos</NavLink>
      </div>
      <CartWidget />
    </div>
  );
};

export default Navbar;
