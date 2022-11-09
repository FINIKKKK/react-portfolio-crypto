import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { TCoinPriceSlice, TCoinPrice, CoinPriceStatus } from './types';

export const fetchCoinPrice = createAsyncThunk<TCoinPrice[], string>(
  'coinprice/fetchCoinPriceStatus',
  async (coinName) => {
    const { data } = await axios.get<TCoinPrice[]>(
      `https://min-api.cryptocompare.com/data/price?fsym=${coinName}&tsyms=USD,RUB,EUR`
    );
    return data;
  }
);

const initialState: TCoinPriceSlice = {
  status: CoinPriceStatus.LOADING,
  coinPrice: [],
};

const coinpriceSlice = createSlice({
  name: 'coinprice',
  initialState,
  reducers: {
    setCoinPrice(state, { payload }: PayloadAction<TCoinPrice[]>) {
      state.coinPrice = payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchCoinPrice.pending, (state) => {
      state.status = CoinPriceStatus.LOADING;
      state.coinPrice = [];
    });
    builder.addCase(fetchCoinPrice.fulfilled, (state, { payload }) => {
      state.status = CoinPriceStatus.SUCCESS;
      state.coinPrice = payload;
    });
    builder.addCase(fetchCoinPrice.rejected, (state) => {
      state.status = CoinPriceStatus.ERROR;
      state.coinPrice = [];
    });
  },
});

export const { setCoinPrice } = coinpriceSlice.actions;

export default coinpriceSlice.reducer;