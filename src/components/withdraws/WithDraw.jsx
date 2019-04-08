import React from 'react';
import WithDrawTable from './WithDrawTable';
import Container from '../../container/Container';

const Trade = () => (
  <React.Fragment>
    <Container name="Withdraws" table={<WithDrawTable />} />
  </React.Fragment>
);

export default Trade;
