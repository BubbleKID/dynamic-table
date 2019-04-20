import React from 'react';
import { shallow } from 'enzyme';
import { getFilterUrl } from '../../../src/components/WithdrawTable';
import CustomTable from '../../../src/components/tableComponents/CustomTable/CustomTable';


it('handleFilterChange() works correctly', () => {
  const wrapper = shallow(
    <CustomTable
      tableRows={[
        {
          id: 'uuid', numeric: false, disablePadding: true, label: 'Uuid',
        },
        {
          id: 'updatedAt', numeric: true, disablePadding: false, label: 'Updated at',
        },
        {
          id: 'volume', numeric: true, disablePadding: false, label: 'Volume',
        },
        {
          id: 'price', numeric: true, disablePadding: false, label: 'Price',
        },
        {
          id: 'side', numeric: true, disablePadding: false, label: 'Side',
        },
        {
          id: 'tradingPairSymbol', numeric: true, disablePadding: false, label: 'Trading Pair Symbol',
        },
      ]}
      filterItem={{
        ASK: 'side',
        BID: 'side',
        'BTC/AUD': 'symbol',
        'ETH/AUD': 'symbol',
        'ETH/BTC': 'symbol',
      }}
      timeString="updatedAt"
      dbName="trades"
      name="Trade"
      keyword1="uuid"
      keyword2="volume"
      keyword3="price"
      getFilterUrl={getFilterUrl}
      searchPlaceHolder="Uuid, Volume, Price"
    />,
  );
  const event = { target: { value: ['PROCESSED', 'REJECTED'] } };
  wrapper.instance().handleFilterChange(event);
  expect(wrapper.state('selectedFilter')).toEqual(['PROCESSED', 'REJECTED']);
});
