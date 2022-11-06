import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { TCoinsSlice, TCoin, TFetchParams, CoinStatus } from "./types";

export const fetchCoins = createAsyncThunk<TCoin[], TFetchParams>(
  "coin/fetchCoinsStatus",
  async ({ currentPage, currency }) => {
    const { data } = await axios.get<TCoin[]>(
      `https://min-api.cryptocompare.com/data/top/totalvolfull?limit=10&page=${currentPage}&tsym=${currency}`
    );

    // @ts-ignore
    const coins: TCoin[] = data.Data.map((obj: any) => {
      return {
        id: obj.CoinInfo.id,
        img: `https://www.cryptocompare.com${obj.CoinInfo.ImageUrl}`,
        fullName: obj.CoinInfo.FullName,
        name: obj.CoinInfo.Name,
        price: obj.DISPLAY ? obj.DISPLAY[currency].PRICE : "??",
        volume24hour: obj.DISPLAY ? obj.DISPLAY[currency].VOLUME24HOUR : "??",
        marketCap: obj.DISPLAY ? obj.DISPLAY[currency].MKTCAP : "??",
        changeHour: obj.DISPLAY ? obj.DISPLAY[currency].CHANGEPCTHOUR : "??",
        change24hour: obj.DISPLAY
          ? obj.DISPLAY[currency].CHANGEPCT24HOUR
          : "??",
      };
    });

    return coins;
  }
);

const initialState: TCoinsSlice = {
  status: CoinStatus.LOADING,
  items: [],
  isFetching: true,
};

const coinSlice = createSlice({
  name: "coin",
  initialState,
  reducers: {
    setFetching(state, { payload }: PayloadAction<boolean>) {
      state.isFetching = payload;
    },
    clearCoins(state) {
      state.items = [];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchCoins.pending, (state) => {
      state.status = CoinStatus.LOADING;
    });
    builder.addCase(fetchCoins.fulfilled, (state, { payload }) => {
      state.status = CoinStatus.SUCCESS;
      state.items = [...state.items, ...payload];
      state.isFetching = false;
    });
    builder.addCase(fetchCoins.rejected, (state) => {
      state.status = CoinStatus.ERROR;
    });
  },
});

export const { setFetching, clearCoins } = coinSlice.actions;

export default coinSlice.reducer;
