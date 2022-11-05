import React from "react";
import classNames from "classnames";

import { TableRow, TableCell } from "@mui/material";

import { TCoin } from "../../redux/coins/types";

import ss from "./TableItem.module.scss";

type TableItemProps = {};

export const TableItem: React.FC<TCoin> = ({
  id,
  img,
  fullName,
  name,
  price,
  volume24hour,
  marketCap,
  changeHour,
  change24hour,
}) => {
  return (
    <TableRow className={ss.item}>
      <TableCell scope="row" className={ss.row}>
        <img src={img} alt={fullName} />
        <div className={ss.info}>
          <div className={ss.fullName}>{fullName}</div>
          <div className={ss.name}>{name}</div>
        </div>
      </TableCell>
      <TableCell align="right">{price}</TableCell>
      <TableCell align="right">{volume24hour}</TableCell>
      <TableCell align="right">{marketCap}</TableCell>
      <TableCell
        className={classNames({
          [ss.red]: Number(changeHour) < 0,
          [ss.green]: Number(changeHour) > 0,
        })}
        align="right"
      >
        {`${Number(changeHour) > 0 ? "+" : ""} ${changeHour} `}%
      </TableCell>
      <TableCell
        className={classNames({
          [ss.red]: Number(change24hour) < 0,
          [ss.green]: Number(change24hour) > 0,
        })}
        align="right"
      >
        {`${Number(change24hour) > 0 ? "+" : ""} ${change24hour} `}%
      </TableCell>
    </TableRow>
  );
};
