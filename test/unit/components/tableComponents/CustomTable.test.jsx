import React from 'react';
import Select from '@material-ui/core/Select';
import TableRow from '@material-ui/core/TableRow';
import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';
import '../../../../src/components/api/server';
import { createShallow } from '@material-ui/core/test-utils';
import CustomTable from '../../../../src/components/tableComponents/CustomTable';
import { getFilterUrl } from '../../../../src/components/TradeTable';

let wrapper;
beforeEach(() => {
  const shallowNew = createShallow({ dive: true });
  wrapper = shallowNew(
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

  it('handleFromDateChange() works correctly', () => {
    wrapper.instance().handleFromDateChange(new Date('2010-10-10T10:10:10'));
    const dateString = wrapper.state('selectedFromDate');
    const convertDate = new Date(dateString).toLocaleDateString('en-US');
    expect(convertDate).toEqual('10/10/2010');
  });

  it('handleToDateChange() works correctly', () => {
    wrapper.instance().handleToDateChange(new Date('2010-10-10T10:10:10'));
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

  it('handleCreateTable() works correctly', () => {
    const mockData1 = [
      {
        uuid: '20e31aef-b718-46a5-a7ee-77982e093786',
        updatedAt: 1526397461000,
        volume: '8.72005',
        price: '4874.44',
        side: 'ASK',
        tradingPair: {
          uuid: 'c5229898-0afe-4b87-87e0-de451f6c1f30',
          symbol: 'ETH/AUD',
        },
      },
    ];
    wrapper.instance().handleCreateTable(mockData1);
    expect(wrapper.find(TableRow)).toBeTruthy();

    const mockData2 = [];
    wrapper.instance().handleCreateTable(mockData2);
    expect(wrapper.find(TableRow)).toBeTruthy();
  });
});

describe('handleTableUpdate() is called', () => {
  describe('when searchString is empty', () => {
    let mockData;
    beforeEach(() => {
      mockData = {
        trades: [
          {
            uuid: '20e31aef-b718-46a5-a7ee-77982e093786',
            updatedAt: 1526397461000,
            volume: '8.72005',
            price: '4874.44',
            side: 'ASK',
            tradingPair: {
              uuid: 'c5229898-0afe-4b87-87e0-de451f6c1f30',
              symbol: 'ETH/AUD',
            },
          },
        ],
        pagination: {
          number: 1,
          size: 10,
          total: 42,
        },
      };
    });

    it('when filterString changes and offset < currentTotal (nomral)', async () => {
      wrapper.setState({
        searchString: '',
        total: 42,
      });
      const spyHandleTableUpdate = jest.spyOn(wrapper.instance(), 'handleTableUpdate');
      const mock = new MockAdapter(axios);
      mock
        .onGet('https://dynamic-server.herokuapp.com/trades.json?[pagination][number]=1&&[pagination][size]=5')
        .reply(200, mockData);
      await wrapper.instance().handleTableUpdate();
      expect(spyHandleTableUpdate).toHaveBeenCalled();
    });

    it('when filterString changes and offset > currentTotal ', async () => {
      wrapper.setState({
        searchString: '',
        total: 42,
        offset: 50,
      });
      const spyHandleTableUpdate = jest.spyOn(wrapper.instance(), 'handleTableUpdate');
      const mock = new MockAdapter(axios);
      mock
        .onGet('https://dynamic-server.herokuapp.com/trades.json?[pagination][number]=1&&[pagination][size]=5')
        .reply(200, mockData);
      await wrapper.instance().handleTableUpdate();
      expect(spyHandleTableUpdate).toHaveBeenCalled();
    });

    it('when filterString changes and currentPage > total page ', async () => {
      const spyHandleTableUpdate = jest.spyOn(wrapper.instance(), 'handleTableUpdate');
      const mock = new MockAdapter(axios);
      wrapper.setState({
        searchString: '',
        size: 5,
        currentPage: 99,
      });
      mock.onAny().reply(200, mockData);
      await wrapper.instance().handleTableUpdate();
      expect(spyHandleTableUpdate).toHaveBeenCalled();
    });

    it('when it cant fetch data and throw error ', async () => {
      const mock = new MockAdapter(axios);
      wrapper.setState({ searchString: '' });
      window.console.error = jest.fn();
      mock.onAny().reply(500);
      await wrapper.instance().handleTableUpdate();
      expect(mock.handlers.get[0][3]).toEqual(500);
    });
  });

  describe('when searchString is not empty ', () => {
    it('when filterString changes and offset > total', async () => {
      const mockData = {
        trades: [
          {
            uuid: '20e31aef-b718-46a5-a7ee-77982e093786',
            updatedAt: 1526397461000,
            volume: '8.72005',
            price: '4874.44',
            side: 'ASK',
            tradingPair: {
              uuid: 'c5229898-0afe-4b87-87e0-de451f6c1f30',
              symbol: 'ETH/AUD',
            },
          },
        ],
        pagination: {
          number: 1,
          size: 5,
          total: 10,
        },
      };
      wrapper.setState({
        searchString: 'aaa',
        total: 42,
        size: 5,
        offset: 50,
      });
      const spyHandleTableUpdate = jest.spyOn(wrapper.instance(), 'handleTableUpdate');
      const mock = new MockAdapter(axios);
      mock.onAny().reply(200, mockData);
      await wrapper.instance().handleTableUpdate();
      expect(spyHandleTableUpdate).toHaveBeenCalled();
    });


    it('when filterString changes and currentPage > total page', async () => {
      const mockData = {
        trades: [
          {
            uuid: '20e31aef-b718-46a5-a7ee-77982e093786',
            updatedAt: 1526397461000,
            volume: '8.72005',
            price: '4874.44',
            side: 'ASK',
            tradingPair: {
              uuid: 'c5229898-0afe-4b87-87e0-de451f6c1f30',
              symbol: 'ETH/AUD',
            },
          },
        ],
        pagination: {
          number: 1,
          size: 5,
          total: 10,
        },
      };
      wrapper.setState({
        searchString: 'aaa',
        total: 42,
        size: 5,
        currentPage: 20,
      });
      const spyHandleTableUpdate = jest.spyOn(wrapper.instance(), 'handleTableUpdate');
      const mock = new MockAdapter(axios);
      mock.onAny().reply(200, mockData);
      await wrapper.instance().handleTableUpdate();
      expect(spyHandleTableUpdate).toHaveBeenCalled();
    });
    it('when it cant fetch data and throw error', async () => {
      const mock = new MockAdapter(axios);
      wrapper.setState({ searchString: 'aaa' });
      window.console.error = jest.fn();
      mock.reset();
      mock.onAny().reply(500);
      await wrapper.instance().handleTableUpdate();
      expect(mock.handlers.get[0][3]).toEqual(500);
    });

    it('handleTableUpdate() throw error when it fetches data searchString!=""', async () => {
      const mock = new MockAdapter(axios);
      const mockData = {
        trades: [
          {
            uuid: '20e31aef-b718-46a5-a7ee-77982e093786',
            updatedAt: 1526397461000,
            volume: '8.72005',
            price: '4874.44',
            side: 'ASK',
            tradingPair: {
              uuid: 'c5229898-0afe-4b87-87e0-de451f6c1f30',
              symbol: 'ETH/AUD',
            },
          },
        ],
        pagination: {
          number: 1,
          size: 10,
          total: 10,
        },
      };
      wrapper.setState({ searchString: 'aaa' });
      window.console.error = jest.fn();
      localStorage.setItem = jest.fn();
      mock.reset();
      mock.onAny().reply(200, mockData);
      await wrapper.instance().handleTableUpdate();
      expect(wrapper.state('total')).not.toBe('');
    });
  });
});
