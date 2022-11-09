import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';

import coins from './coins/slice';
import coinPrice from './coinPrice/slice';

export const store = configureStore({
  reducer: {
    coins,
    coinPrice,
  },
});

export type RootState = ReturnType<typeof store.getState>;

type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();