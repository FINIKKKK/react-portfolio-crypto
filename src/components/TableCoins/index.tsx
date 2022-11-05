import React from "react";
import { useSelector, useDispatch } from "react-redux";

import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@mui/material";

import { coinsSliceSelector } from "../../redux/coins/selectors";

import ss from "./Table.module.scss";
import { TCoin } from "../../redux/coins/types";
import { TableItem } from "../TableItem";
import { fetchCoins } from "../../redux/coins/slice";
import { useAppDispatch } from "../../redux/store";

type TableProps = {};

const tableLabels = [
  "Название",
  "Цена",
  "Объем (24 ч)",
  "% за 1ч",
  "% за 24ч",
  "Последние 7д",
];

export const TableCoins: React.FC<TableProps> = () => {
  const dispatch = useAppDispatch();
  const { items } = useSelector(coinsSliceSelector);

  React.useEffect(() => {
    try {
      dispatch(fetchCoins());
    } catch (error) {
      alert("Ошибка!");
      console.log(error, "Ошибка при получении ...");
    }
  }, []);

  console.log(items);

  return (
    <TableContainer className={ss.table}>
      <div className="container">
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead className={ss.head}>
            <TableRow>
              {tableLabels.map((label, index) => (
                <TableCell key={index} align={index !== 0 ? "right" : "left"}>
                  {label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody className={ss.body}>
            {items.map((obj: TCoin) => (
              <TableItem key={obj.id} {...obj} />
            ))}
          </TableBody>
        </Table>
      </div>
    </TableContainer>
  );
};
