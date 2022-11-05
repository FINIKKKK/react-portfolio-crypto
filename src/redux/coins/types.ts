export type TCoin = {
  id: number;
  img: string;
  fullName: string;
  name: string;
  price: string;
  volume24hour: string;
  changeHour: string;
  change24hour: string;
};

export interface TCoinsSlice {
  status: CoinStatus;
  items: TCoin[];
}

export enum CoinStatus {
  LOADING = "loading",
  SUCCESS = "success",
  ERROR = "error",
}
