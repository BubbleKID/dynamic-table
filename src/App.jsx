import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import TradeTable from './Components/TradeTable';
import WithdrawTable from './Components/WithdrawTable';

const App = () => (
  <Router>
    <Route exact path="/" component={TradeTable} />
    <Route path="/trades" component={TradeTable} />
    <Route path="/withdraws" component={WithdrawTable} />
  </Router>
);

export default App;
