import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { mount } from 'enzyme';
import App from '../../src/App';
import TradeTable from '../../src/Components/TradeTable';

window.console.error = jest.fn(); // Ignore Material-UI warning
it('it render Trade correctly', async () => {
  const wrapper = mount(
    <MemoryRouter initialEntries={['/']}>
      <App />
    </MemoryRouter>,
  );
  expect(wrapper.find(TradeTable)).toHaveLength(1);
});
