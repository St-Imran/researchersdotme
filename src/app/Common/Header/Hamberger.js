
import React, { useState } from "react";

import "./Hamberger.css";

const Hamberger = (props) => {
    
  const [isOpen, setIsOpen] = useState(false);

  const toggleHandler = () => {
    setIsOpen(!isOpen);
    props.navOpener();
  };

  return (
    <div id="nav-icon3" className={isOpen ? "open" : ""} onClick={toggleHandler}>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
    </div>
  );
};

export default Hamberger;
