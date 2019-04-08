import React from 'react';
import { MemoryRouter } from 'react-router';
import { mount} from 'enzyme';
import App from '../../src/App';
import Trade from '../../src/components/trades/Trade';


it("it render Trade correctly", () => {
  const wrapper = mount(
    <MemoryRouter initialEntries={['/']}>
      <App />
    </MemoryRouter>
  );
  expect(wrapper.find(Trade)).toHaveLength(1);
});
