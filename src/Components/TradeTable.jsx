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
    id: 'tradingPair', numeric: true, disablePadding: false, label: 'Trading Pair Symbol',
  },
];

const filterItem = {
  ASK: 'side',
  BID: 'side',
  'BTC/AUD': 'symbol',
  'ETH/AUD': 'symbol',
  'ETH/BTC': 'symbol',
};

export function createQuery(
  searchString, selectedFilter, selectedFromDate, selectedToDate, currentPage, size,
) {
  return `
  {
    mainQuery (
      searchString: "${searchString}",
      filter: ["${selectedFilter.join('","')}"],
      fromDate: "${selectedFromDate}",
      toDate: "${selectedToDate}",
      number: ${currentPage},
      size: ${size},
    ){
      trades {
        uuid
        updatedAt
        volume
        price
        side
        tradingPair {
          uuid
          symbol
        }
      }
      pageInfo {
        total
      }
    }
  }
  `;
}

const TradeTable = () => (
  <CustomTable
    name="trades"
    tableRows={tableRows}
    filterItem={filterItem}
    timeString="updatedAt"
    searchPlaceHolder="Uuid, Volume, Price"
    createQuery={createQuery}
  />
);

export default TradeTable;
