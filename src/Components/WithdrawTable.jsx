import React from 'react';
import CustomTable from './TableComponents/CustomTable/CustomTable';

const tableRows = [
  {
    id: 'uuid', numeric: false, disablePadding: true, label: 'Uuid',
  },
  {
    id: 'createdAt', numeric: true, disablePadding: false, label: 'Created at',
  },
  {
    id: 'amount', numeric: true, disablePadding: false, label: 'Amount',
  },
  {
    id: 'status', numeric: true, disablePadding: false, label: 'Status',
  },
  {
    id: 'bankReferenceNumber', numeric: true, disablePadding: false, label: 'Bank Reference Number',
  },
];

const filterItem = {
  PROCESSED: 'status',
  REJECTED: 'status',
};

function createQuery(
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
      withdraws {
        uuid
        createdAt
        amount
        status
        bankReferenceNumber
      }
      pageInfo {
        total
      }
    }
  }
  `;
}

const WithdrawTable = () => (
  <CustomTable
    name="withdraws"
    tableRows={tableRows}
    filterItem={filterItem}
    keyword1="uuid"
    keyword2="amount"
    keyword3="bankReferenceNumber"
    timeString="createdAt"
    searchPlaceHolder="Uuid, Amount, Bank reference number"
    createQuery={createQuery}
  />
);

export default WithdrawTable;
