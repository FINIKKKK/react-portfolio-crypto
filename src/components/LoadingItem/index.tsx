import { TableRow, TableCell } from "@mui/material";
import React from "react";

import ss from "./LoadingItem.module.scss";

type LoadingItemProps = {};

export const LoadingItem: React.FC<LoadingItemProps> = () => {
  return (
    <TableRow className={ss.item}>
      <TableCell></TableCell>
      <TableCell></TableCell>
      <TableCell></TableCell>
      <TableCell></TableCell>
      <TableCell></TableCell>
      <TableCell></TableCell>
    </TableRow>
  );
};
