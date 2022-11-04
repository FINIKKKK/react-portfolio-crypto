import React from "react";

import ss from "./Table.module.scss";

type TableProps = {};

export const Table: React.FC<TableProps> = () => {
  return <div className={ss.table}></div>;
};
