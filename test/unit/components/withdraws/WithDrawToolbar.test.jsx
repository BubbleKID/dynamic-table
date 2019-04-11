import React from 'react';
import { createShallow } from '@material-ui/core/test-utils';
import Select from '@material-ui/core/Select';
import WithDrawTableToolbar from '../../../../src/components/withdraws/WithDrawTableToolbar';

describe('WithDrawTableToolbar', () => {
  const mockMyEventHandler = jest.fn();
  let wrapper;
  const shallowNew = createShallow({ dive: true });
  beforeEach(() => {
    wrapper = shallowNew(
      <WithDrawTableToolbar
        handleFilterChange={mockMyEventHandler}
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
    wrapper.setProps({ handleFilterChange: mockMyEventHandler });
    wrapper.find(Select).simulate('change', { target: { value: 'aaaa' } });
    expect(mockMyEventHandler).toHaveBeenCalled();
  });

  it('shoud call renderValue correctlt when select filter', () => {
    expect(wrapper.find('#filter-select').props().renderValue(['PROCESSED', 'REJECTED'])).toEqual('PROCESSED, REJECTED');
  });
});
