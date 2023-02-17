import {
  configureStore,
  ThunkAction,
  Action,
} from '@reduxjs/toolkit';
import convertorSlice from '../features/convertorSlice';
import currencySlice from '../features/currencySlice';

export const store = configureStore({
  reducer: {
    currency: currencySlice,
    convertor: convertorSlice,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
