import React from "react";

import {
  TextField,
  Typography,
  FormControl,
  Select,
  MenuItem,
  IconButton,
  Grid,
  ListSubheader,
} from "@mui/material";

import ss from "./Conventor.module.scss";
import { coinsSliceSelector } from "../../redux/coins/selectors";
import { currencies, TCoin } from "../../redux/coins/types";
import { useDispatch, useSelector } from "react-redux";
import { fetchCoinPrice } from "../../redux/coinPrice/slice";
import { coinPriceSliceSelector } from "../../redux/coinPrice/selectors";
import axios from "axios";

type ConventorProps = {};

export type TCoinPrice = {
  [key: string]: number;
};

export const Conventor: React.FC<ConventorProps> = () => {
  const dispatch = useDispatch();
  const { items, isLoading, status } = useSelector(coinsSliceSelector);
  // const { coinPrice } = useSelector(coinPriceSliceSelector);

  const [coinPrice, setCoinPrice] = React.useState<TCoinPrice>({});

  const coins = items.slice(0, 10);

  // const [fromCoin, setFromCoin] = React.useState(
  //   coins[0] ? `${coins[0].fullName} (${coins[0].name})` : ""
  // );
  const [fromCoin, setFromCoin] = React.useState("");
  const [toCoin, setToCoin] = React.useState("");
  const [value, setValue] = React.useState(1);
  const [result, setResult] = React.useState(0);

  // @ts-ignore
  const toCoinName = toCoin && toCoin.match(/\((.*)\)/).pop();
  // @ts-ignore
  const fromCoinName = fromCoin && fromCoin.match(/\((.*)\)/).pop();
  // console.log("fromCoinName", fromCoinName);

  // console.log(coinPrice);

  const inPrice =
    (coins &&
      coins.find((obj) => `${obj.fullName} (${obj.name})` === fromCoin)
        ?.priceCalc) ||
    0;

  const outPrice =
    (coins &&
      coins.find((obj) => `${obj.fullName} (${obj.name})` === toCoin)
        ?.priceCalc) ||
    0;

  // const outPrice = currencies.find((obj) => obj.name === toCoinName)?.name;

  // @ts-ignore`
  const outPrice2 = coinPrice[outPrice];

  // console.log("outPrice", outPrice);
  // console.log("outPrice2", outPrice2);

  const reverseSelects = () => {
    setFromCoin(toCoin);
    setToCoin(fromCoin);
  };

  const isCurrency1 = currencies.find((obj) => obj.name === fromCoinName);
  const isCurrency2 = currencies.find((obj) => obj.name === toCoinName);
  // console.log('isCurrency1', isCurrency1);
  // @ts-ignore
  // console.log("isCurrency", coinPrice[isCurrency?.name]);

  console.log(isLoading);
  console.log(status);

  async function GetPosts() {
    const { data } = await axios.get(
      "https://min-api.cryptocompare.com/data/price?fsym=BTC&tsyms=USD,RUB,EUR"
    );
    return data;
  }

  // React.useEffect(() => {
  //   if (status === "success") {
  //     setFromCoin(coins[0] ? `${coins[0].fullName} (${coins[0].name})` : "");
  //     setToCoin(
  //       currencies[0] ? `${currencies[0].fullName} (${currencies[0].name})` : ""
  //     );
  //     // console.log(fromCoinName);

  //     // axios
  //     //   .get(
  //     //     `https://min-api.cryptocompare.com/data/price?fsym=BTC&tsyms=USD,RUB,EUR`
  //     //   )
  //     //   // @ts-ignore
  //     //   .then((resp) => {
  //     //     setCoinPrice(resp.data);
  //     //     console.log(coinPrice);
  //     //     // @ts-ignore
  //     //     setResult((value * coinPrice[isCurrency2?.name]).toFixed(2));
  //     //   });

  //     const fetch = async () => {
  //       (async () => {
  //         const response = await GetPosts();
  //         console.log(response);
  //         setCoinPrice({ gg: 244 });
  //         console.log("coinPrice", coinPrice);

  //         // setTimeout(() => {
  //         // }, 5000);

  //         // @ts-ignore
  //         // setResult((value * coinPrice[isCurrency2?.name]).toFixed(2));
  //       })();
  //       // const { data } = await axios.get(
  //       //   `https://min-api.cryptocompare.com/data/price?fsym=BTC&tsyms=USD,RUB,EUR`
  //       // );
  //       // setCoinPrice(data);
  //       // console.log(coinPrice);
  //     };
  //     fetch();
  //   }
  // }, [isLoading]);

  React.useEffect(() => {
    (async () => {
      setFromCoin(coins[0] ? `${coins[0].fullName} (${coins[0].name})` : "");
      setToCoin(
        currencies[0] ? `${currencies[0].fullName} (${currencies[0].name})` : ""
      );
      const response = await GetPosts();
      console.log(response);
      setCoinPrice(response);
      console.log("coinPrice", coinPrice);
      // @ts-ignore
      setResult((value * coinPrice[isCurrency2?.name]).toFixed(2));
    })();
  }, [isLoading]);

  // React.useEffect(() => {
  //   try {
  //     if (isCurrency2) {
  //       // @ts-ignore
  //       // dispatch(fetchCoinPrice(fromCoinName));
  //       // @ts-ignore
  //       // setResult((value * coinPrice[isCurrency2?.name]).toFixed(2));
  //     } else if (isCurrency1) {
  //       // @ts-ignore
  //       // dispatch(fetchCoinPrice(toCoinName));
  //       // @ts-ignore
  //       // setResult((value / coinPrice[isCurrency1?.name]).toFixed(6));
  //     } else {
  //       // @ts-ignore
  //       setResult(((value * Number(inPrice)) / Number(outPrice)).toFixed(2));
  //     }
  //     // currencies.map((obj) => {
  //     //   if (obj.name === toCoinName) {
  //     //     console.log("find");
  //     //     // @ts-ignore
  //     //     dispatch(fetchCoinPrice(fromCoinName));
  //     //   }
  //     // });
  //     // if (isFetching) {
  //     // dispatch(fetchCoinPrice(coinName));
  //     // }
  //   } catch (error) {
  //     alert("Ошибка!");
  //     console.log(error, "Ошибка при получении цены валюты...");
  //   }
  // }, [fromCoin, toCoin, value]);

  const onChangeInput = (value: any) => {
    setValue(value);
  };

  return (
    <div className={ss.conventor}>
      <div className="container">
        <Typography className={ss.title} align="center" variant="h5">
          Калькулятор и конвертер криптовалют
        </Typography>

        <TextField
          value={value}
          onChange={(e: any) => onChangeInput(e.target.value)}
          className={ss.input}
          type="number"
          id="outlined-basic"
          placeholder="Введите сумму..."
          variant="outlined"
          fullWidth
        />
        <Grid className={ss.flex} container>
          <Grid xs={5.36} item>
            <FormControl className={ss.select} variant="filled" fullWidth>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                className={ss.list}
                value={fromCoin}
                onChange={(e: any) => setFromCoin(e.target.value)}
              >
                {currencies.map((obj, index) => (
                  <MenuItem key={index} value={`${obj.fullName} (${obj.name})`}>
                    {`${obj.fullName} (${obj.name})`}
                  </MenuItem>
                ))}
                <ListSubheader></ListSubheader>
                {coins.map((obj: TCoin) => (
                  <MenuItem
                    key={`${obj.name}_${obj.id}`}
                    value={`${obj.fullName} (${obj.name})`}
                  >
                    {`${obj.fullName} (${obj.name})`}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid xs={1.23} item>
            <IconButton
              onClick={reverseSelects}
              className={ss.btn}
              aria-label="delete"
            >
              <svg
                width="32"
                height="27"
                viewBox="0 0 32 27"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M1.29984 6.70037H26.4342L24.1007 8.88806C23.5929 9.36411 23.5929 10.1365 24.1007 10.6125C24.6089 11.0886 25.4323 11.0886 25.9406 10.6125L30.4903 6.34716C30.7342 6.11848 30.8716 5.8082 30.8716 5.48473C30.8716 5.16126 30.7342 4.85141 30.4903 4.62273L25.9406 0.357361C25.4323 -0.11912 24.6089 -0.11912 24.1007 0.357361C23.5929 0.833418 23.5929 1.60534 24.1007 2.08183L26.4342 4.26321H1.29984C0.581672 4.26321 0 4.80897 0 5.4818C0 6.15508 0.581695 6.7004 1.29984 6.7004V6.70037Z"
                  fill="white"
                />
                <path
                  d="M29.951 20.1061H4.76444L7.09124 17.9248V17.9243C7.59949 17.4483 7.59949 16.6764 7.09124 16.1999C6.58345 15.7238 5.7596 15.7238 5.25181 16.1999L0.702087 20.4652C0.457708 20.6939 0.320785 21.0042 0.320785 21.3277C0.320785 21.6511 0.457708 21.9614 0.702087 22.1901L5.25181 26.4555C5.7596 26.9315 6.58345 26.9315 7.09124 26.4555C7.59949 25.979 7.59949 25.207 7.09124 24.731L4.75806 22.5433H29.9505C30.6682 22.5433 31.2503 21.9975 31.2503 21.3247C31.2503 20.6514 30.6681 20.1061 29.9505 20.1061L29.951 20.1061Z"
                  fill="white"
                />
              </svg>
            </IconButton>
          </Grid>

          <Grid xs={5.36} item>
            <FormControl className={ss.select} variant="filled" fullWidth>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                className={ss.list}
                value={toCoin}
                onChange={(e: any) => setToCoin(e.target.value)}
              >
                {currencies.map((obj, index) => (
                  <MenuItem key={index} value={`${obj.fullName} (${obj.name})`}>
                    {`${obj.fullName} (${obj.name})`}
                  </MenuItem>
                ))}
                <ListSubheader></ListSubheader>
                {coins.map((obj: TCoin) => (
                  <MenuItem
                    key={`${obj.name}_${obj.id}`}
                    value={`${obj.fullName} (${obj.name})`}
                  >
                    {`${obj.fullName} (${obj.name})`}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
        </Grid>
        <Typography className={ss.result} align="center" variant="h5">
          {value} {fromCoin} = {result} {toCoin}
        </Typography>
      </div>
    </div>
  );
};
