import React from 'react';
import TradeTableHead from '../../../../src/components/trades/TradeTableHead';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import { mount } from 'enzyme';

it("handle changing an sort label", () => {
  const mockOnRequestSort = jest.fn();
  const wrapper = mount(<TradeTableHead onRequestSort={mockOnRequestSort} />)
  expect(wrapper.find(TableSortLabel)).toHaveLength(6);
  wrapper.find(TableSortLabel).at(1).simulate('click');
  expect(mockOnRequestSort.mock.calls.length).toBe(1);
})