import React from 'react';
import CustomTable from './tableComponents/CustomTable';

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

export function getFilterUrl(event) {
  let tempUrl = '';
  event.target.value.forEach((item) => {
    tempUrl += `filter[status]=${item}&&`;
  });
  return tempUrl;
}

const WithdrawTable = () => (
  <CustomTable
    name="Withdraws"
    dbName="withdraws"
    tableRows={tableRows}
    filterItem={filterItem}
    keyword1="uuid"
    keyword2="amount"
    keyword3="bankReferenceNumber"
    timeString="createdAt"
    searchPlaceHolder="Uuid, Amount, Bank reference number"
    getFilterUrl={getFilterUrl}
  />
);

export default WithdrawTable;
