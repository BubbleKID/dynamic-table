import React from 'react';
import { shallow } from 'enzyme';
import Select from '@material-ui/core/Select';
import Filter from '../../../../../src/Components/TableComponents/ToolBarComponents/Filter/Filter';

describe('TradeTableToolbar', () => {
  const mockMyEventHandler = jest.fn();
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(
      <Filter
        handleFilterChange={mockMyEventHandler}
        filterItem={{
          ASK: 'side',
          BID: 'side',
          'BTC/AUD': 'symbol',
          'ETH/AUD': 'symbol',
          'ETH/BTC': 'symbol',
        }}
        selectedFilter={['BID', 'ASK']}
      />,
    );
  });

  it('shoud call event handler when select changes', () => {
    wrapper.setProps({ handleFilterChange: mockMyEventHandler });
    wrapper.find(Select).simulate('change', { target: { value: 'aaaa' } });
    expect(mockMyEventHandler).toHaveBeenCalled();
  });

  it('shoud call renderValue correctlt when select filter', () => {
    expect(wrapper.find('#filter-select').props().renderValue(['PROCESSED', 'REJECTED'])).toEqual('PROCESSED, REJECTED');
  });
});
