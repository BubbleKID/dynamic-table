import React from 'react';
import ReactDOM from 'react-dom';
import TradeTable from '../../../../src/components/trades/TradeTable';
import WithDrawTable from '../../../../src/components/withdraws/WithDrawTable';


describe('Test TradeTable', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<TradeTable />, div);
    ReactDOM.unmountComponentAtNode(div);
  });
});