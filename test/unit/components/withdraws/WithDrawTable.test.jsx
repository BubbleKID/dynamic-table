import React from 'react';
import ReactDOM from 'react-dom';
import WithDrawTable from '../../../../src/components/withdraws/WithDrawTable';
import Select from '@material-ui/core/Select';
import { shallow, mount } from 'enzyme';
import { desc, stableSort, getSorting } from '../../../../src/components/withdraws/WithDrawTable';

describe('Test TradeTable', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<WithDrawTable />, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  it("shoud call event handler when select changes", () => {
    const mockMyEventHandler = jest.fn();
    let wrapper = shallow(
      <WithDrawTable />
    ).dive();
    wrapper.setProps({ onChange: mockMyEventHandler });
    wrapper.find(Select).at(0).simulate('change', {target:{value:5}});
    expect(mockMyEventHandler).toHaveBeenCalledOnce;
  })

  it("desc function should work correctly", () => {
    expect(desc({amount: 100},{amount:200}, 'amount')).toBe(1);
    expect(desc({amount: 200},{amount:100}, 'amount')).toBe(-1);
    expect(desc('a', 'b', 'amount')).toBe(0);
  })

  it("stableSort function should work correctly", () => {
    expect(stableSort([{amount: 100},{amount:200}],getSorting('desc', 'amount'))).toEqual([{"amount": 200}, {"amount": 100}]);
    expect(stableSort([{amount: 100},{amount:200}],getSorting(0, 'amount'))).toEqual([{"amount": 100}, {"amount": 200}]);
    expect(stableSort(['', ''],getSorting('', ''))).toEqual(['','']);
  });
});