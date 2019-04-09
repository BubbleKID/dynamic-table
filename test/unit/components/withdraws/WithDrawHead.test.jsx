import React from 'react';
import WithDrawTableHead from '../../../../src/components/withdraws/WithDrawTableHead';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Table from '@material-ui/core/Table';
import { mount } from 'enzyme';

it("handle changing an sort label", () => {
  const mockOnRequestSort = jest.fn();
  const wrapper = mount(
    <Table>
      <WithDrawTableHead onRequestSort={mockOnRequestSort} order={'desc'} orderBy={'uuid'} />
    </Table>
  )
  wrapper.find(TableSortLabel).at(1).simulate('click');
  expect(mockOnRequestSort.mock.calls.length).toBe(1);
})