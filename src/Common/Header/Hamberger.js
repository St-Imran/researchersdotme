import React from "react";

import styles from "./Hamberger.module.css";

const Hamberger = ({ navOpener, isOpen }) => {

  const toggleHandler = () => {
    navOpener();
  };

  return (
    <div
      className={`${styles.navicon} ${isOpen ? styles.open : ""}`}
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
