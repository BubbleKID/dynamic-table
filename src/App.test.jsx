import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { mount } from 'enzyme';
import App from './App';
import TradeTable from './components/TradeTable';

it('it render Trade correctly', () => {
  const wrapper = mount(
    <MemoryRouter initialEntries={['/']}>
      <App />
    </MemoryRouter>,
  );
  expect(wrapper.find(TradeTable)).toHaveLength(1);
});
