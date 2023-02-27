import React from "react";
import { useSelector, useDispatch } from "react-redux";

import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Select,
  FormControl,
  MenuItem,
} from "@mui/material";

import { coinsSliceSelector } from "../../redux/coins/selectors";
import { setFetching } from "../../redux/coins/slice";

import ss from "./Table.module.scss";
import { currencies, TCoin } from "../../redux/coins/types";
import { TableItem } from "../TableItem";
import { fetchCoins, clearCoins } from "../../redux/coins/slice";
import { useAppDispatch } from "../../redux/store";
import axios from "axios";
import { LoadingItem } from "../LoadingItem";

type TableProps = {};

const tableLabels = [
  "Название",
  "Цена",
  "Объем (24 ч)",
  "Рыночная капитализация",
  "% за 1ч",
  "% за 24ч",
];

export const TableCoins: React.FC<TableProps> = () => {
  const dispatch = useAppDispatch();
  const {
    items: coins,
    isFetching,
    isLoading,
  } = useSelector(coinsSliceSelector);

  const [currentPage, setCurrentPage] = React.useState(0);
  const [isUpdate, setIsUpdate] = React.useState(false);
  const [currency, setCurrency] = React.useState(currencies[0].name);

  React.useEffect(() => {
    try {
      if (isFetching) {
        dispatch(fetchCoins({ currentPage, currency }));
        setCurrentPage((prevState) => prevState + 1);
      } else if (isUpdate) {
        dispatch(clearCoins());
        setCurrentPage(1);
        dispatch(fetchCoins({ currentPage: 0, currency }));
      }
    } catch (error) {
      alert("Ошибка!");
      console.log(error, "Ошибка при получении валют...");
    } finally {
      setIsUpdate(false);
    }
  }, [isFetching, currency]);

  const totalCount = 30;

  const scrollHandler = (e: any) => {
    if (
      e.target.documentElement.scrollHeight -
        (e.target.documentElement.scrollTop + window.innerHeight) <
        100 &&
      coins.length < totalCount
    ) {
      dispatch(setFetching(true));
    }
  };

  React.useEffect(() => {
    document.addEventListener("scroll", scrollHandler);
    return () => {
      document.removeEventListener("scroll", scrollHandler);
    };
  }, []);

  const selectCurrency = (value: string) => {
    setCurrency(value);
    setIsUpdate(true);
  };

  return (
    <div className="container">
      <div className={ss.select}>
        <FormControl variant="filled">
          <Select
            className={ss.list}
            id="demo-simple-select"
            value={currency}
            onChange={(e: any) => selectCurrency(e.target.value)}
          >
            {currencies.map((obj, index) => (
              <MenuItem key={index} value={obj.name}>
                {obj.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
      <TableContainer className={ss.table}>
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
            {!isLoading
              ? coins.map((obj: TCoin, index) => (
                  <TableItem key={`${obj.name}_${index}`} {...obj} />
                ))
              : Array(10)
                  .fill(0)
                  .map((_, index) => <LoadingItem key={index} />)}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};
