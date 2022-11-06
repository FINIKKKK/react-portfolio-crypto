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
  const { items: coins, isFetching } = useSelector(coinsSliceSelector);

  const [currentPage, setCurrentPage] = React.useState(0);
  const [isUpdate, setIsUpdate] = React.useState(false);
  const [currency, setCurrency] = React.useState(currencies[0]);

  // const [coins, setCoins] = React.useState([]);
  // const [fetching, setFetching] = React.useState(true);

  console.log("currentPage", currentPage);
  console.log("isFetching", isFetching);
  console.log("itemsLenght", coins.length);

  React.useEffect(() => {
    try {
      if (isFetching) {
        console.log("isFetching");
        dispatch(fetchCoins({ currentPage, currency }));
        setCurrentPage((prevState) => prevState + 1);
        // axios
        //   .get(
        //     `https://min-api.cryptocompare.com/data/top/totalvolfull?limit=10&page=${currentPage}&tsym=USD`
        //   )
        //   .then(({ data }) => {
        //     const items: TCoin[] = data.Data.map((obj: any) => {
        //       return {
        //         id: obj.CoinInfo.id,
        //         img: `https://www.cryptocompare.com${obj.CoinInfo.ImageUrl}`,
        //         fullName: obj.CoinInfo.FullName,
        //         name: obj.CoinInfo.Name,
        //         price: obj.DISPLAY ? obj.DISPLAY.USD.PRICE : "??",
        //         volume24hour: obj.DISPLAY ? obj.DISPLAY.USD.VOLUME24HOUR : "??",
        //         marketCap: obj.DISPLAY ? obj.DISPLAY.USD.MKTCAP : "??",
        //         changeHour: obj.DISPLAY ? obj.DISPLAY.USD.CHANGEPCTHOUR : "??",
        //         change24hour: obj.DISPLAY
        //           ? obj.DISPLAY.USD.CHANGEPCT24HOUR
        //           : "??",
        //       };
        //     });
        //     console.log('конец');
        //     // @ts-ignore
        //     setCoins([...coins, ...items]);
        //     setCurrentPage((prevState) => prevState + 1);
        //   })
        //   .finally(() => setFetching(false));
      } else if (isUpdate) {
        console.log("isUpdate");
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

  const scrollHandler = (e: any) => {
    if (
      e.target.documentElement.scrollHeight -
        (e.target.documentElement.scrollTop + window.innerHeight) <
        100 &&
      coins.length !== 100
    ) {
      console.log("gg");
      // setFetching(true)
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
            onChange={(e) => selectCurrency(e.target.value)}
          >
            {currencies.map((label, index) => (
              <MenuItem key={index} value={label}>
                {label}
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
            {coins.map((obj: TCoin, index) => (
              <TableItem key={`${obj.name}_${index}`} {...obj} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};
