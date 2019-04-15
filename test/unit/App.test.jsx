import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { mount } from 'enzyme';
import App from '../../src/App';
import TradeTable from '../../src/components/trades/TradeTable';


it('it render Trade correctly', () => {
  const wrapper = mount(
    <MemoryRouter initialEntries={['/']}>
      <App />
    </MemoryRouter>,
  );
  expect(wrapper.find(TradeTable)).toHaveLength(1);
});
