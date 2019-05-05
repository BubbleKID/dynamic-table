import React from 'react';
import '../../../src/Components/api/server';
import { shallow } from 'enzyme';
import { DatePicker } from 'material-ui-pickers';
import CustomTableToolbar from '../../../src/Components/TableComponents/CustomTableToolbar/CustomTableToolbar';

it('data picker work correctly', () => {
  window.console.error = jest.fn();
  const handleDateChange = jest.fn();
  const wrapper = shallow(
    <CustomTableToolbar handleDateChange={handleDateChange} />,
  ).dive();

  wrapper.find(DatePicker).at(0).simulate('change');
  wrapper.find(DatePicker).at(1).simulate('change');
  expect(handleDateChange).toHaveBeenCalledTimes(2);
});
