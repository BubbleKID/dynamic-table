import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Trade from './components/trades/Trade';
import WithDraw from './components/withdraws/WithDraw';

const App = () => (
  <Router>
    <Route exact path="/" component={Trade} />
    <Route path="/trades" component={Trade} />
    <Route path="/withdraws" component={WithDraw} />
  </Router>
);


export default App;
