import React from 'react';
import { shallow } from 'enzyme';
import WithDrawTableToolbar from '../../../../src/components/withdraws/WithDrawTableToolbar';

describe('WithDrawTableToolbar', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(
      <WithDrawTableToolbar
        handleFilterChange={jest.fn()}
        handleFromDateChange={jest.fn()}
        handleToDateChange={jest.fn()}
        handleSearchChange={jest.fn()}
        selectedFromDate=""
        selectedToDate=""
        searchString=""
        handleReset={jest.fn()}
        filterItem={{
          PROCESSED: 'status',
          REJECTED: 'status',
        }}
        selectedFilter={['PROCESSED']}
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
    expect(wrapper.find('#filter-select').props().renderValue(['PROCESSED', 'REJECTED'])).toEqual('PROCESSED, REJECTED');
  });
});
