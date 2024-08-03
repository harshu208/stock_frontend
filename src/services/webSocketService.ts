import store from '../redux/store';
import { updateStockData } from '../redux/stockSlice';

type StockData = {
  symbol: string;
  curr_value: number;
  max_value: number;
  min_value: number;
  timestamp: string;
};

class WebSocketService {
  private ws: WebSocket | null = null;

  connect(url: string) {
    this.ws = new WebSocket(url);

    this.ws.onopen = () => {
      console.log('Connected to WebSocket server');
    };

    this.ws.onclose = () => {
      console.log('Disconnected from WebSocket server');
    };

    this.ws.onmessage = (event: MessageEvent) => {
        const data: { [key: string]: StockData[] } = JSON.parse(event.data);
      store.dispatch(updateStockData(data));
    };
  }
}

export default new WebSocketService();
