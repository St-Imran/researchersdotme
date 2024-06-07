
import React, { useState } from "react";

import styles from "./Hamberger.module.css";

const Hamberger = (props) => {
    
  const [isOpen, setIsOpen] = useState(false);

  const toggleHandler = () => {
    setIsOpen(!isOpen);
    props.navOpener();
  };

  return (
    <div id="nav-icon3" className={isOpen ? styles.open : ""} onClick={toggleHandler}>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
    </div>
  );
};

export default Hamberger;
