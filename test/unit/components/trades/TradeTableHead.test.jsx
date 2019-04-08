import React from 'react';
import TradeTableHead from '../../../../src/components/trades/TradeTableHead';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Table from '@material-ui/core/Table';
import { mount } from 'enzyme';

it("handle changing an sort label", () => {
  const mockOnRequestSort = jest.fn();
  const wrapper = mount(
    <Table>
      <TradeTableHead onRequestSort={mockOnRequestSort} order={'desc'} orderBy={'uuid'} />
    </Table>
  )
  expect(wrapper.find(TableSortLabel)).toHaveLength(6);
  wrapper.find(TableSortLabel).at(1).simulate('click');
  expect(mockOnRequestSort.mock.calls.length).toBe(1);
})