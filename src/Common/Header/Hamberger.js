import React, { useState } from "react";

import styles from "./Hamberger.module.css";

const Hamberger = (props) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleHandler = () => {
    setIsOpen(!isOpen);
    props.navOpener();
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
