export type TCoinPrice = {
  [key: string]: number;
};

export interface TCoinPriceSlice {
  status: CoinPriceStatus;
  coinPrice: TCoinPrice[];
}

export enum CoinPriceStatus {
  LOADING = "loading",
  SUCCESS = "success",
  ERROR = "error",
}
