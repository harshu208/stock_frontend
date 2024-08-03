import React, { useEffect } from 'react';
import { Provider, useDispatch, useSelector } from 'react-redux';
import store, { RootState } from './redux/store';
// import WebSocketService from './services/websocketService';
import webSocketService from './services/webSocketService';
import config from './config';
import StockSelector from './components/StockSelector';
import StockTable from './components/StockTable';
const App: React.FC = () => {
  const dispatch = useDispatch();
  const stockSymbol = useSelector((state: RootState) => state.stock.stockSymbol);

  useEffect(() => {
    webSocketService.connect(config.webSocketUrl+'/websocket')
  }, [stockSymbol]);

  return (
    <div className="App">
      <h1 style={{marginLeft:"20px"}}>Real-Time Stock Data</h1>
      <StockSelector />
      <StockTable />
    </div>
  );
};

const AppWithProvider: React.FC = () => (
  <Provider store={store}>
    <App />
  </Provider>
);

export default AppWithProvider;
