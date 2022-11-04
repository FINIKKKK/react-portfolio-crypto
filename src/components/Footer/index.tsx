import React from "react";

import ss from "./Footer.module.scss";

type FooterProps = {};

export const Footer: React.FC<FooterProps> = () => {
  return <div className={ss.footer}>Создатель макета Dmitriy Bozhko</div>;
};
