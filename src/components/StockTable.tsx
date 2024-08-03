import React,{useEffect} from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import DataTable, {TableColumn} from 'react-data-table-component';
interface StockData {
    curr_value: number;
    max_value: number;
    min_value: number;
    timestamp: string;
  }
  const columns: TableColumn<StockData>[] = [
    {
      name: 'Current Value ($)',
      selector: (row: StockData) => row.curr_value,
    },
    {
      name: 'Max Value ($)',
      selector: (row: StockData) => row.max_value,
    },
    {
      name: 'Min Value ($)',
      selector: (row: StockData) => row.min_value,
    },
    {
      name: 'Timestamp',
      selector: (row: StockData) => new Date(row.timestamp).toLocaleString(),
    },
  ];
const StockTable: React.FC = () => {
  const stockData = useSelector((state: RootState) => state.stock.data);
  const stockSymbol = useSelector((state: RootState) => state.stock.stockSymbol);
  return (

      <div style={{ height: '600px', overflow: 'auto', border: '1px solid black', margin: '20px' }}>
          {stockData[stockSymbol] ? <DataTable
              columns={columns}
              data={stockData[stockSymbol] ? stockData[stockSymbol].map((data) => {
                  return {
                      curr_value: data.curr_value,
                      max_value: data.max_value,
                      min_value: data.min_value,
                      timestamp: new Date(data.timestamp).toLocaleString()
                  }
              }) : []}
              highlightOnHover
          /> : <div style={{margin:'10px'}}>fetching...</div> }
          
      </div>
  );
};

export default StockTable;
