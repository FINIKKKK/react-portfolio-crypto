import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { TCoinsSlice, TCoin, CoinStatus } from "./types";

export const fetchCoins = createAsyncThunk<TCoin[]>(
  "coin/fetchCoinsStatus",
  async () => {
    const { data } = await axios.get<TCoin[]>(
      "https://min-api.cryptocompare.com/data/top/totalvolfull?limit=10&tsym=USD"
    );

    // @ts-ignore
    const coins: TCoin[] = data.Data.map((obj: any) => {
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

    return coins;
  }
);

const initialState: TCoinsSlice = {
  status: CoinStatus.LOADING,
  items: [],
};

const coinSlice = createSlice({
  name: "coin",
  initialState,
  reducers: {
    setCoins(state, { payload }: PayloadAction<TCoin[]>) {
      state.items = payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchCoins.pending, (state) => {
      state.status = CoinStatus.LOADING;
      state.items = [];
    });
    builder.addCase(fetchCoins.fulfilled, (state, { payload }) => {
      state.status = CoinStatus.SUCCESS;
      state.items = payload;
    });
    builder.addCase(fetchCoins.rejected, (state) => {
      state.status = CoinStatus.ERROR;
      state.items = [];
    });
  },
});

export const { setCoins } = coinSlice.actions;

export default coinSlice.reducer;
