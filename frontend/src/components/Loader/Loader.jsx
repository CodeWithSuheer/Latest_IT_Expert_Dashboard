import React from "react";
import Logo from '../../Images/ITEXPERTS_LOGO.png'
import './Loader.css';

const Loader = () => {
  return (
    <>
      <div className="Container loader">
        <div className="glitch">
          <img src={Logo} alt="Company Logo" />
        </div>
      </div>
    </>
  );
};

export default Loader;
