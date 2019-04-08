import React from 'react';
import WithDrawTable from './WithDrawTable';
import Container from '../../container/Container';

const Trade = () => (
  <div>
    <Container name="Withdraws" table={<WithDrawTable />} />
  </div>
);

export default Trade;
