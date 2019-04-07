import React from 'react';
import { Route } from 'react-router-dom';
import Container from './container/Container';
import TradeTable from './components/trades/TradeTable';
import WithDrawTable from './components/withdraws/WithDrawTable';

const App = () => (
  <div>
    <Route exact path="/" component={() => <Container name="Trades" table={<TradeTable />} />} />
    <Route path="/trades" component={() => <Container name="Trades" table={<TradeTable />} />} />
    <Route path="/withdraws" component={() => <Container name="Withdraws" table={<WithDrawTable />} />} />
  </div>
);


export default App;
