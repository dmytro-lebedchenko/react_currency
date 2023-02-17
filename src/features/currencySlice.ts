import {
  createSlice,
  PayloadAction,
  createAsyncThunk,
} from '@reduxjs/toolkit';
import { getCurrency } from '../api/getCurrency';
import { Currency } from '../types/Currency';

type State = {
  currency: Currency[];
  loaded: boolean;
  hasError: boolean;
};

const initialState: State = {
  currency: [],
  loaded: false,
  hasError: false,
};

export const currencyInit = createAsyncThunk(
  'currency/fetch', () => getCurrency(),
);

const currencySlice = createSlice({
  name: 'currency',
  initialState,
  reducers: {
    setCurrency: (state, action: PayloadAction<Currency[]>) => ({
      ...state,
      currency: action.payload,
    }),
  },
  extraReducers: (builder) => {
    builder.addCase(currencyInit.pending, (state) => ({
      ...state,
      loaded: false,
      hasError: false,
    }));

    builder.addCase(currencyInit.fulfilled, (state, action) => ({
      ...state,
      currency: action.payload,
      loaded: true,
      hasError: false,
    }));

    builder.addCase(currencyInit.rejected, (state) => ({
      ...state,
      loaded: true,
      hasError: true,
    }));
  },
});

export default currencySlice.reducer;
export const { setCurrency } = currencySlice.actions;
