import React from 'react';
import { mount } from 'enzyme';
import Highlighter from 'react-highlight-words';
import CustomTableContent from '../../../src/Components/TableComponents/CustomTableContent/CustomTableContent';


describe('render CustomTableContent correctly', () => {
  it('when data lenth !== 0', () => {
    window.console.error = jest.fn();
    const data = [{
      uuid: '20e31aef-b718-46a5-a7ee-77982e093786',
      updatedAt: 'Wed May 16 2018 01:17:41 GMT+1000 (AEST)',
      volume: '8.72005',
      price: '4874.44',
      side: 'ASK',
      tradingPair: {
        uuid: 'c5229898-0afe-4b87-87e0-de451f6c1f30',
        symbol: 'ETH/AUD',
      },
    }, {
      uuid: '26eb5b0d-751b-4e7b-83da-28c9ae2b3c4b',
      updatedAt: 'Sat May 05 2018 05:20:31 GMT+1000 (AEST)',
      volume: '7.14398',
      price: '2349.92',
      side: 'ASK',
      tradingPair: {
        uuid: '493746ad-2269-4fce-8e4a-c2be0f60bebe',
        symbol: 'ETH/AUD',
      },
    }];
    const wrapper = mount(
      <CustomTableContent
        data={data}
        timeString="updatedAt"
        searchString=""
        order="desc"
        orderBy="price"
      />,
    );
    expect(wrapper.find(Highlighter)).toBeTruthy();
  });
});
