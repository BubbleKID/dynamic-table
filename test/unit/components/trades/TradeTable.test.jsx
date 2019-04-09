import React from 'react';
import ReactDOM from 'react-dom';
import TradeTable from '../../../../src/components/trades/TradeTable';
import Select from '@material-ui/core/Select';
import { shallow, mount } from 'enzyme';
import { desc, stableSort, getSorting } from '../../../../src/components/trades/TradeTable';
import axios from 'axios';
import '../../../../src/components/api/server';
import App from '../../../../src/App';
import sinon from 'sinon';
import TradeTableToolbar from '../../../../src/components/trades/TradeTableToolbar';
import Pagination from 'material-ui-flat-pagination';
import { expect as chai_expect } from 'chai';

describe('Test TradeTable', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<TradeTable />, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  it("shoud call event handler when select changes", () => {
    const mockMyEventHandler = jest.fn();
    let wrapper = shallow(
      <TradeTable />
    ).dive();
    wrapper.setProps({ onChange: mockMyEventHandler });
    wrapper.find(Select).at(0).simulate('change', {target:{value:5}});
    expect(mockMyEventHandler).toHaveBeenCalledOnce;
  })

  it("desc function should work correctly", () => {
    expect(desc({price: 10},{price:20}, 'price')).toBe(1);
    expect(desc({price: 20},{price:10}, 'price')).toBe(-1);
    expect(desc('a', 'b', 'price')).toBe(0);
  })

  it("stableSort function should work correctly", () => {
    expect(stableSort([{price: 10},{price:20}],getSorting('desc', 'price'))).toEqual([{"price": 20}, {"price": 10}]);
    expect(stableSort([{price: 10},{price:20}],getSorting(0, 'price'))).toEqual([{"price": 10}, {"price": 20}]);
    expect(stableSort(['', ''],getSorting('', ''))).toEqual(['','']);
  });

  it('simulates click events', () => {
    const handleSearchChange = sinon.spy();
    const wrapper = mount(<TradeTable handleSearchChange={handleSearchChange} />);
    wrapper.find('#searchBar').at(0).simulate('change');
    expect(handleSearchChange).toHaveBeenCalledOnce;
  });
});