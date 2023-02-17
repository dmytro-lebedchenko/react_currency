import {
  createSlice,
  PayloadAction,
} from '@reduxjs/toolkit';
import { Currency } from '../types/Currency';

type State = {
  from: {
    selectorValue: Currency,
    inputValue: string,
  };
  to: {
    selectorValue: Currency,
    inputValue: string,
  };
};

const defaultCurrency: Currency = {
  ccy: 'UAH',
  base_ccy: 'UAH',
  buy: '1',
  sale: '1'
};

const initialState: State = {
  from: {
    selectorValue: defaultCurrency,
    inputValue: '0',
  },
  to: {
    selectorValue: defaultCurrency,
    inputValue: '0',
  },
};

const convertorSlice = createSlice({
  name: 'convertor',
  initialState,
  reducers: {
    setSelectorFrom: (state, action: PayloadAction<Currency>) => ({
      ...state,
      from: {
        ...state.from,
        selectorValue: action.payload,
      },
    }),
    setSelectorTo: (state, action: PayloadAction<Currency>) => ({
      ...state,
      to: {
        ...state.to,
        selectorValue: action.payload,
      },
    }),
    setInputFrom: (state, action: PayloadAction<string>) => ({
      ...state,
      from: {
        ...state.from,
        inputValue: action.payload,
      },
    }),
    setInputTo: (state, action: PayloadAction<string>) => ({
      ...state,
      to: {
        ...state.to,
        inputValue: action.payload,
      },
    }),
    setConvertorSwap: (state) => ({
      ...state,
      from: state.to,
      to: state.from,
    }),
  },
});

export default convertorSlice.reducer;
export const {
  setSelectorFrom,
  setSelectorTo,
  setInputFrom,
  setInputTo,
  setConvertorSwap,
} = convertorSlice.actions;
