import React from 'react';
import { MemoryRouter } from 'react-router';
import { mount } from 'enzyme';
import Container from '../../../src/container/Container';
import WithDrawTable from '../../../src/components/withdraws/WithDrawTable';
import TradeTable from '../../../src/components/trades/TradeTable';
import App from '../../../src/App';

describe('Test Container', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = mount(
      <MemoryRouter initialEntries={['/', '/trades', 'withdraws']} initialIndex={1}>
        <App />
      </MemoryRouter>
    );
  });

  it("it direct to trade page when 'Trades' button clicks", () => {
    wrapper.find('button').at(0).simulate('click');
    expect(wrapper.find('h1').text()).toEqual('Trades');
  });

  it("it direct to withdraw page when 'Withdraws' button clicks", () => {
    wrapper.find('button').at(1).simulate('click');
    expect(wrapper.find('h1').text()).toEqual('Withdraws');
  });
});
