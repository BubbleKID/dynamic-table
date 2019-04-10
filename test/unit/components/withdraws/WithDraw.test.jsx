import React from 'react';
import { shallow } from 'enzyme';
import WithDraw from '../../../../src/components/withdraws/WithDraw';
import Container from '../../../../src/container/Container';

it('it render WithDraw page correctly', () => {
  const wrapper = shallow(<WithDraw />);
  expect(wrapper.find(Container).props().name).toEqual('Withdraws');
});
