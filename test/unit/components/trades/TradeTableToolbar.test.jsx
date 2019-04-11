import React from 'react';
import { createShallow } from '@material-ui/core/test-utils';
import Select from '@material-ui/core/Select';
import TradeTableToolbar from '../../../../src/components/trades/TradeTableToolbar';

describe('TradeTableToolbar', () => {
  const mockMyEventHandler = jest.fn();
  let wrapper;
  const shallowNew = createShallow({ dive: true });
  beforeEach(() => {
    wrapper = shallowNew(
      <TradeTableToolbar
        handleFilterChange={mockMyEventHandler}
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
    wrapper.setProps({ handleFilterChange: mockMyEventHandler });
    wrapper.find(Select).simulate('change', { target: { value: 'aaaa' } });
    expect(mockMyEventHandler).toHaveBeenCalled();
  });


  it('shoud call renderValue correctlt when select filter', () => {
    expect(wrapper.find('#filter-select').props().renderValue(['BID', 'ASK'])).toEqual('BID, ASK');
  });
});
