import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import config from '../config';
interface StockData {
  symbol: string;
  curr_value: number;
  max_value: number;
  min_value: number;
  timestamp: string;
}

interface StockState {
  stockSymbol: string;
  data: { [key: string]: StockData[] };
  symbols: string[];
}

const initialState: StockState = {
  stockSymbol: 'AAPL',
  data: {},
  symbols: [],
};

export const fetchStockSymbols = createAsyncThunk<string[]>(
    'stock/fetchSymbols',
    async () => {
      const response = await axios.get<string[]>(config.appUrl+'/symbols');
      return response.data;
    }
);

const stockSlice = createSlice({
  name: 'stock',
  initialState,
  reducers: {
    setStockSymbol(state, action: PayloadAction<string>) {
      state.stockSymbol = action.payload;
    },
    updateStockData(state, action: PayloadAction<{ [key: string]: StockData[] }>) {
      state.data = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchStockSymbols.fulfilled, (state, action) => {
      state.symbols = action.payload;
    });
  },
});

export const { setStockSymbol, updateStockData } = stockSlice.actions;
export default stockSlice.reducer;
