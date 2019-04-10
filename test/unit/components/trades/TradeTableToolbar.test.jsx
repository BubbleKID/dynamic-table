import React from 'react';
import { shallow } from 'enzyme';
import TradeTableToolbar from '../../../../src/components/trades/TradeTableToolbar';

describe('TradeTableToolbar', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(
      <TradeTableToolbar
        handleFilterChange={jest.fn()}
        handleFromDateChange={jest.fn()}
        handleToDateChange={jest.fn()}
        handleSearchChange={jest.fn()}
        selectedFromDate=""
        selectedToDate=""
        searchString=""
        handleReset={jest.fn()}
        filterItem={{
          ASK: 'side',
          BID: 'side',
          'BTC/AUD': 'symbol',
          'ETH/AUD': 'symbol',
          'ETH/BTC': 'symbol',
        }}
        selectedFilter={['BID', 'ASK']}
      />,
    ).dive();
  });

  it('shoud call event handler when select changes', () => {
    const mockMyEventHandler = jest.fn();
    wrapper.setProps({ onChange: mockMyEventHandler });
    wrapper.find('#filter-select').at(0).simulate('change');
    expect(mockMyEventHandler).toHaveBeenCalledOnce;
  });

  it('shoud call renderValue correctlt when select filter', () => {
    expect(wrapper.find('#filter-select').props().renderValue(['BID', 'ASK'])).toEqual('BID, ASK');
  });
});
