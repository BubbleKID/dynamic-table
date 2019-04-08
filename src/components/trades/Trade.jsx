import React from 'react';
import TradeTable from './TradeTable';
import Container from '../../container/Container';

const Trade = () => (
  <React.Fragment>
    <Container name="Trades" table={<TradeTable />} />
  </React.Fragment>
);

export default Trade;
