import React from 'react';
import { mount } from 'enzyme';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Table from '@material-ui/core/Table';
import WithDrawTableHead from '../../../../src/components/withdraws/WithDrawTableHead';

it('handle changing an sort label', () => {
  const mockOnRequestSort = jest.fn();
  const wrapper = mount(
    <Table>
      <WithDrawTableHead onRequestSort={mockOnRequestSort} order="desc" orderBy="uuid" />
    </Table>,
  );
  wrapper.find(TableSortLabel).at(1).simulate('click');
  expect(mockOnRequestSort.mock.calls.length).toBe(1);
});
