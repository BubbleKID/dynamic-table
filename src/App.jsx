import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import TradeTable from './components/trades/TradeTable';
import WithDrawTable from './components/withdraws/WithDrawTable';

const App = () => (
  <Router>
    <Route exact path="/" component={TradeTable} />
    <Route path="/trades" component={TradeTable} />
    <Route path="/withdraws" component={WithDrawTable} />
  </Router>
);


export default App;
