import React from 'react';
import Select from '@material-ui/core/Select';
import '../../../src/Components/api/server';
import { shallow } from 'enzyme';
import CustomTable from '../../../src/Components/TableComponents/CustomTable/CustomTable';
import { createQuery } from '../../../src/Components/TradeTable';


let wrapper;
beforeEach(() => {
  wrapper = shallow(
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
      name="trades"
      searchPlaceHolder="Uuid, Volume, Price"
      createQuery={createQuery}
    />,
  );
});

describe('Test CustomTable', () => {
  describe('handleChangeRowsPerPage() is called', () => {
    it("when RowsPerPage 'select' changes offset equals 0", () => {
      const handleChangeRowsPerPage = jest.spyOn(wrapper.instance(), 'handleChangeRowsPerPage');
      wrapper.find(Select).at(0).simulate('change', { target: { value: 5 } });
      expect(handleChangeRowsPerPage).toHaveBeenCalled();
    });

    it("when RowsPerPage 'select' changes and offset not equal 0", () => {
      const handleChangeRowsPerPage = jest.spyOn(wrapper.instance(), 'handleChangeRowsPerPage');
      wrapper.setState({ offset: 10 });
      wrapper.find(Select).at(0).simulate('change', { target: { value: 5 } });
      expect(handleChangeRowsPerPage).toHaveBeenCalled();
    });
  });

  describe('handleTableUpdate() is called', () => {
    describe('when click the pagination is clicked', () => {
      let handleTableUpdate;

      beforeEach(() => {
        handleTableUpdate = jest.spyOn(wrapper.instance(), 'handleTableUpdate');
      });

      it('when searchString = ""', () => {
        wrapper.setState({ searchString: '' });
        wrapper.find('#pagination').simulate('click');
        expect(handleTableUpdate).toHaveBeenCalled();
      });
    });
  });

  describe('handlePageClick() is called', () => {
    it('when pagination is changed', () => {
      const handlePageClick = jest.spyOn(wrapper.instance(), 'handlePageClick');
      wrapper.find('#pagination').simulate('click');
      expect(handlePageClick).toHaveBeenCalled();
    });
  });

  it('handleReset() works correctly', () => {
    wrapper.setState({ size: 10 });
    wrapper.instance().handleReset();
    expect(wrapper.state('size')).toEqual(5);
  });

  it('handleSearchChange() works correctly', () => {
    const event = { target: { value: 'good' } };
    wrapper.setState({ searchString: 'not good' });
    wrapper.instance().handleSearchChange(event);
    expect(wrapper.state('searchString')).toEqual('good');
  });

  it('handleDateChange() works correctly', () => {
    wrapper.instance().handleDateChange(new Date('2010-10-10T10:10:10'), 'selectedToDate');
    const dateString = wrapper.state('selectedToDate');
    const convertDate = new Date(dateString).toLocaleDateString('en-US');
    expect(convertDate).toEqual('10/10/2010');
  });

  it('handleFilterChange() works correctly', () => {
    const event = { target: { value: ['BID', 'BID/AUD', 'ETH/AUD'] } };
    wrapper.instance().handleFilterChange(event);
    expect(wrapper.state('selectedFilter')).toEqual(['BID', 'BID/AUD', 'ETH/AUD']);
  });

  it('handleRequestSort function works correctly', () => {
    const mockedEvent = { target: {} };
    const proptery = 'price';

    wrapper.setState({ orderBy: 'price', order: 'desc' });
    wrapper.instance().handleRequestSort(mockedEvent, proptery);
    expect(wrapper.state('orderBy')).toEqual('price');

    wrapper.setState({ orderBy: 'price', order: 'asc' });
    wrapper.instance().handleRequestSort(mockedEvent, proptery);
    expect(wrapper.state('order')).toEqual('desc');
  });
});

describe('handleTableUpdate() is called', () => {
  it('when filterString changes and new offset < curent offset, new page < current page', async () => {
    const mockSuccessResponse = {
      data: {
        mainQuery: {
          trades: [
            {
              uuid: '20e31aef-b718-46a5-a7ee-77982e093786',
              updatedAt: 'Wed May 16 2018 01:17:41 GMT+1000 (AEST)',
              volume: '8.72005',
              price: '4874.44',
              side: 'ASK',
              tradingPair: {
                uuid: 'c5229898-0afe-4b87-87e0-de451f6c1f30',
                symbol: 'ETH/AUD',
              },
            },
            {
              uuid: '26eb5b0d-751b-4e7b-83da-28c9ae2b3c4b',
              updatedAt: 'Sat May 05 2018 05:20:31 GMT+1000 (AEST)',
              volume: '7.14398',
              price: '2349.92',
              side: 'ASK',
              tradingPair: {
                uuid: '493746ad-2269-4fce-8e4a-c2be0f60bebe',
                symbol: 'ETH/AUD',
              },
            },
          ],
          pageInfo: {
            total: 2,
          },
        },
      },
    };
    const mockJsonPromise = Promise.resolve(mockSuccessResponse);
    const mockFetchPromise = Promise.resolve({
      json: () => mockJsonPromise,
    });
    jest.spyOn(global, 'fetch').mockImplementation(() => mockFetchPromise);
    const spyHandleTableUpdate = jest.spyOn(wrapper.instance(), 'handleTableUpdate');
    wrapper.instance().handleTableUpdate();
    expect(global.fetch).toHaveBeenCalledTimes(1);
    expect(spyHandleTableUpdate).toHaveBeenCalled();
    global.fetch.mockClear();
  });

  it('when filterString changes and new offset > current offset, new page > current page', async () => {
    const mockSuccessResponse = {
      data: {
        mainQuery: {
          trades: [
            {
              uuid: '20e31aef-b718-46a5-a7ee-77982e093786',
              updatedAt: 'Wed May 16 2018 01:17:41 GMT+1000 (AEST)',
              volume: '8.72005',
              price: '4874.44',
              side: 'ASK',
              tradingPair: {
                uuid: 'c5229898-0afe-4b87-87e0-de451f6c1f30',
                symbol: 'ETH/AUD',
              },
            },
            {
              uuid: '26eb5b0d-751b-4e7b-83da-28c9ae2b3c4b',
              updatedAt: 'Sat May 05 2018 05:20:31 GMT+1000 (AEST)',
              volume: '7.14398',
              price: '2349.92',
              side: 'ASK',
              tradingPair: {
                uuid: '493746ad-2269-4fce-8e4a-c2be0f60bebe',
                symbol: 'ETH/AUD',
              },
            },
          ],
          pageInfo: {
            total: 2,
          },
        },
      },
    };
    const mockJsonPromise = Promise.resolve(mockSuccessResponse);
    const mockFetchPromise = Promise.resolve({
      json: () => mockJsonPromise,
    });
    window.console.error = jest.fn();
    jest.spyOn(global, 'fetch').mockImplementation(() => mockFetchPromise);
    const spyHandleTableUpdate = jest.spyOn(wrapper.instance(), 'handleTableUpdate');
    wrapper.setState({ offset: 50, currentPage: 10 });
    wrapper.instance().handleTableUpdate();
    expect(spyHandleTableUpdate).toHaveBeenCalled();
    global.fetch.mockClear();
  });

  it('when fetch failed', async () => {
    const mockErrorResponse = {
      data: {
        message: '500 Internal Server Error',
      },
    };
    const mockJsonPromise = Promise.resolve(mockErrorResponse);
    const mockFetchPromise = Promise.resolve({
      json: () => mockJsonPromise,
    });
    jest.spyOn(global, 'fetch').mockImplementation(() => mockFetchPromise);
    const spyHandleTableUpdate = jest.spyOn(wrapper.instance(), 'handleTableUpdate');
    wrapper.instance().handleTableUpdate();
    expect(spyHandleTableUpdate).toHaveBeenCalled();
    global.fetch.mockClear();
  });
});
