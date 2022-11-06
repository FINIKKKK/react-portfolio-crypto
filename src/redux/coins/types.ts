export type TCoin = {
  id: number;
  img: string;
  fullName: string;
  name: string;
  price: string;
  volume24hour: string;
  marketCap: string;
  changeHour: string;
  change24hour: string;
};

export type TFetchParams = {
  currentPage: number;
  currency: string;
};

export interface TCoinsSlice {
  status: CoinStatus;
  items: TCoin[];
  isFetching: boolean;
}

export enum CoinStatus {
  LOADING = "loading",
  SUCCESS = "success",
  ERROR = "error",
}

export const currencies = ["USD", "RUB", "EUR"];
