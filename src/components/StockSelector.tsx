import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setStockSymbol } from '../redux/stockSlice';
import { AppDispatch, RootState } from '../redux/store';
import './customSelect.css'
import { fetchStockSymbols } from '../redux/stockSlice';

const StockSelector: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const stockSymbol = useSelector((state: RootState) => state.stock.stockSymbol);
  const symbols = useSelector((state: RootState) => state.stock.symbols);
  const handleSymbolChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(setStockSymbol(e.target.value));
  };
  useEffect(() => {
    dispatch(fetchStockSymbols());
    
  }, [dispatch]);
  
  return (
    <div style={{display: "flex", gap:"10px", marginLeft:"20px"}}>
      <label htmlFor="stock-selector" style={{display:"flex", alignItems:"center"}}>Select Stock: </label>
      <div className='custom-select'>
      { <select id="stock-selector" value={stockSymbol} onChange={handleSymbolChange}>
        {symbols.map(symbol => (
          <option key={symbol} value={symbol}>
            {symbol}
          </option>
        ))}
      </select>}
      </div>
    </div>
  );
};

export default StockSelector;
