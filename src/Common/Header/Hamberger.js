import React from "react";

import styles from "./Hamberger.module.css";

const Hamberger = ({ navOpener, isOpen }) => {

  const toggleHandler = () => {
    navOpener();
  };

  return (
    <div
      id={styles.navicon}
      className={`nav-icon3 ${isOpen ? styles.open : ""}`}
      onClick={toggleHandler}
    >
      <span></span>
      <span></span>
      <span></span>
      <span></span>
    </div>
  );
};

export default Hamberger;
