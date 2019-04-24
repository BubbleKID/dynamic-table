import React from 'react';
import CustomTable from './TableComponents/CustomTable/CustomTable';

const tableRows = [
  {
    id: 'uuid', numeric: false, disablePadding: true, label: 'Uuid',
  },
  {
    id: 'updatedAt', numeric: true, disablePadding: false, label: 'Updated at',
  },
  {
    id: 'volume', numeric: true, disablePadding: false, label: 'Volume',
  },
  {
    id: 'price', numeric: true, disablePadding: false, label: 'Price',
  },
  {
    id: 'side', numeric: true, disablePadding: false, label: 'Side',
  },
  {
    id: 'tradingPairSymbol', numeric: true, disablePadding: false, label: 'Trading Pair Symbol',
  },
];

const filterItem = {
  ASK: 'side',
  BID: 'side',
  'BTC/AUD': 'symbol',
  'ETH/AUD': 'symbol',
  'ETH/BTC': 'symbol',
};

const TradeTable = () => (
  <CustomTable
    name="trades"
    tableRows={tableRows}
    filterItem={filterItem}
    timeString="updatedAt"
    searchPlaceHolder="Uuid, Volume, Price"
  />
);

export default TradeTable;
