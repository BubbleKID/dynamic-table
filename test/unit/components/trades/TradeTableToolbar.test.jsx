import React from 'react';
import TradeTableToolbar from '../../../../src/components/trades/TradeTableToolbar';
import Select from '@material-ui/core/Select';
import { shallow, mount } from 'enzyme';
import sinon from 'sinon';

it("shoud call event handler when select changes", () => {
  const mockMyEventHandler = jest.fn();
  const renderValueHandler = jest.fn();
  let wrapper = shallow(
    <TradeTableToolbar
      handleFilterChange={mockMyEventHandler}
      handleFromDateChange={jest.fn()}
      handleToDateChange={jest.fn()}
      handleSearchChange={jest.fn()}
      selectedFromDate={''}
      selectedToDate={''}
      searchString={''}
      handleReset={jest.fn()}
      filterItem={{
        ASK: 'side',
        BID: 'side',
        'BTC/AUD': 'symbol',
        'ETH/AUD': 'symbol',
        'ETH/BTC': 'symbol',
      }}
      selectedFilter={['BID', 'ASK']}
    />
  ).dive();
  wrapper.setProps({ onChange: mockMyEventHandler });
  wrapper.find('#filter-select').at(0).simulate('change');
  expect(mockMyEventHandler).toHaveBeenCalledOnce;
})