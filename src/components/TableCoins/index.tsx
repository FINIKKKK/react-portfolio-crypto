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
import axios from "axios";

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
  // const { items } = useSelector(coinsSliceSelector);

  const [fetching, setFetching] = React.useState(true);
  const [currentPage, setCurrentPage] = React.useState(0);
  const [coins, setCoins] = React.useState([]);

  React.useEffect(() => {
    try {
      if (fetching) {
        axios
          .get(
            `https://min-api.cryptocompare.com/data/top/totalvolfull?limit=10&page=${currentPage}&tsym=USD`
          )
          .then(({ data }) => {
            const items: TCoin[] = data.Data.map((obj: any) => {
              return {
                id: obj.CoinInfo.id,
                img: `https://www.cryptocompare.com${obj.CoinInfo.ImageUrl}`,
                fullName: obj.CoinInfo.FullName,
                name: obj.CoinInfo.Name,
                price: obj.DISPLAY.USD.PRICE,
                volume24hour: obj.DISPLAY.USD.VOLUME24HOUR,
                marketCap: obj.DISPLAY.USD.MKTCAP,
                changeHour: obj.DISPLAY.USD.CHANGEPCTHOUR,
                change24hour: obj.DISPLAY.USD.CHANGEPCT24HOUR,
              };
            });
            // @ts-ignore
            setCoins([...coins, ...items]);
            setCurrentPage((prevState) => prevState + 1);
          })
          .finally(() => setFetching(false));
      }
      // dispatch(fetchCoins(currentPage));
    } catch (error) {
      alert("Ошибка!");
      console.log(error, "Ошибка при получении ...");
    }
  }, [fetching]);

  const scrollHandler = (e: any) => {
    if (
      e.target.documentElement.scrollHeight -
        (e.target.documentElement.scrollTop + window.innerHeight) <
        100 &&
      coins.length !== 100
    ) {
      setFetching(true);
    }
  };

  React.useEffect(() => {
    document.addEventListener("scroll", scrollHandler);
    return () => {
      document.removeEventListener("scroll", scrollHandler);
    };
  }, []);

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
            {coins.map((obj: TCoin) => (
              <TableItem key={`${obj.name}_${obj.id}`} {...obj} />
            ))}
          </TableBody>
        </Table>
      </div>
    </TableContainer>
  );
};
