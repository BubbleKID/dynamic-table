import React from 'react';
import TradeTable from './TradeTable';
import Container from '../../container/Container';

const Trade = () => (
  <div>
    <Container name="Trades" table={<TradeTable />} />
  </div>
);

export default Trade;
