import React from 'react';
import CustomTable from './tableComponents/CustomTable/CustomTable';

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

export function getFilterUrl(event) {
  let tempUrl = '';
  event.target.value.forEach((item) => {
    if ((filterItem[item]) === 'side') {
      tempUrl += `filter[side]=${item}&&`;
    }
    if ((filterItem[item]) === 'symbol') {
      tempUrl += `filter[tradingPair][symbol][inq]=${item}&&`;
    }
  });
  return tempUrl;
}

const TradeTable = () => (
  <CustomTable
    name="trades"
    tableRows={tableRows}
    filterItem={filterItem}
    timeString="updatedAt"
    keyword1="uuid"
    keyword2="volume"
    keyword3="price"
    searchPlaceHolder="Uuid, Volume, Price"
    getFilterUrl={getFilterUrl}
  />
);

export default TradeTable;
