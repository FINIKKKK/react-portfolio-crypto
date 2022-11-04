import React from "react";

import logo from "../../assets/img/logo.png";

import ss from "./Header.module.scss";

type HeaderProps = {};

export const Header: React.FC<HeaderProps> = () => {
  return (
    <div className={ss.header}>
      <div className="container">
        <div className={ss.inner}>
          <img className={ss.logo} src={logo} alt="" />
        </div>
      </div>
    </div>
  );
};
