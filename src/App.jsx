import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import TradeTable from './components/trades/TradeTable';
import WithdrawTable from './components/withdraws/WithdrawTable';

const App = () => (
  <Router>
    <Route exact path="/" component={TradeTable} />
    <Route path="/trades" component={TradeTable} />
    <Route path="/withdraws" component={WithdrawTable} />
  </Router>
);


export default App;
