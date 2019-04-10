import React from 'react';
import ReactDOM from 'react-dom';
import Select from '@material-ui/core/Select';
import TableRow from '@material-ui/core/TableRow';
import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';
import '../../../../src/components/api/server';
import { createShallow } from '@material-ui/core/test-utils';
import TradeTable, { desc, stableSort, getSorting } from '../../../../src/components/trades/TradeTable';

describe('Test TradeTable', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<TradeTable />, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  describe('desc() function', () => {
    describe('given three values', () => {
      it('it should get compare result 1, -1 or 0', () => {
        expect(desc({ price: 10 }, { price: 20 }, 'price')).toBe(1);
        expect(desc({ price: 20 }, { price: 10 }, 'price')).toBe(-1);
        expect(desc('a', 'b', 'price')).toBe(0);
      });
    });
  });

  describe('stableSort() function', () => {
    describe('given two values', () => {
      it('it should get sorted result', () => {
        expect(stableSort([{ price: 10 }, { price: 20 }], getSorting('desc', 'price')))
          .toEqual([{ price: 20 }, { price: 10 }]);
        expect(stableSort([{ price: 10 }, { price: 20 }], getSorting(0, 'price')))
          .toEqual([{ price: 10 }, { price: 20 }]);
        expect(stableSort(['', ''], getSorting('', ''))).toEqual(['', '']);
      });
    });
  });

  describe('handleChangeRowsPerPage() is called', () => {
    it("when RowsPerPage 'select' changes", () => {
      const shallowNew = createShallow({ dive: true });
      const wrapper = shallowNew(<TradeTable />);
      const handleChangeRowsPerPage = jest.spyOn(wrapper.instance(), 'handleChangeRowsPerPage');
      wrapper.find(Select).at(0).simulate('change', { target: { value: 5 } });
      expect(handleChangeRowsPerPage).toHaveBeenCalled();
    });
  });

  describe('handleTableUpdate() is called', () => {
    describe('when click the pagination is clicked', () => {
      let wrapper;
      let shallowNew;
      let handleTableUpdate;

      beforeEach(() => {
        shallowNew = createShallow({ dive: true });
        wrapper = shallowNew(<TradeTable />);
        handleTableUpdate = jest.spyOn(wrapper.instance(), 'handleTableUpdate');
      });

      it('when searchString = "" ', () => {
        wrapper.setState({ searchString: '' });
        wrapper.find('#pagination').simulate('click');
        expect(handleTableUpdate).toHaveBeenCalled();
      });
    });
  });

  describe('handlePageClick() is called', () => {
    it('when pagination is changed', () => {
      const shallowNew = createShallow({ dive: true });
      const wrapper = shallowNew(<TradeTable />);
      const handlePageClick = jest.spyOn(wrapper.instance(), 'handlePageClick');
      wrapper.find('#pagination').simulate('click');
      expect(handlePageClick).toHaveBeenCalled();
    });
  });

  it('handleReset() works correctly', () => {
    const shallowNew = createShallow({ dive: true });
    const wrapper = shallowNew(<TradeTable />);
    wrapper.setState({ size: 10 });
    wrapper.instance().handleReset();
    expect(wrapper.state('size')).toEqual(5);
  });

  it('handleSearchChange() works correctly', () => {
    const shallowNew = createShallow({ dive: true });
    const wrapper = shallowNew(<TradeTable />);
    const event = { target: { value: 'good' } };
    wrapper.setState({ searchString: 'not good' });
    wrapper.instance().handleSearchChange(event);
    expect(wrapper.state('searchString')).toEqual('good');
  });

  it('handleFromDateChange() works correctly', () => {
    const shallowNew = createShallow({ dive: true });
    const wrapper = shallowNew(<TradeTable />);
    wrapper.instance().handleFromDateChange(new Date('2010-10-10T10:10:10'));
    expect(wrapper.state('selectedFromDate')).toEqual('Sun Oct 10 2010 10:10:10 GMT+1100 (澳大利亚东部夏令时)');
  });

  it('handleToDateChange() works correctly', () => {
    const shallowNew = createShallow({ dive: true });
    const wrapper = shallowNew(<TradeTable />);
    wrapper.instance().handleToDateChange(new Date('2010-10-10T10:10:10'));
    expect(wrapper.state('selectedToDate')).toEqual('Sun Oct 10 2010 10:10:10 GMT+1100 (澳大利亚东部夏令时)');
  });

  it('handleFilterChange() works correctly', () => {
    const shallowNew = createShallow({ dive: true });
    const wrapper = shallowNew(<TradeTable />);
    const event = { target: { value: ['BID', 'BID/AUD', 'ETH/AUD'] } };
    wrapper.instance().handleFilterChange(event);
    expect(wrapper.state('selectedFilter')).toEqual(['BID', 'BID/AUD', 'ETH/AUD']);
  });

  it('handleRequestSort function works correctly', () => {
    const shallowNew = createShallow({ dive: true });
    const wrapper = shallowNew(<TradeTable />);
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
    const shallowNew = createShallow({ dive: true });
    const wrapper = shallowNew(<TradeTable />);
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
    it('when filterString changes ', async () => {
      const shallowNew = createShallow({ dive: true });
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
          total: 42,
        },
      };
      const wrapper = shallowNew(<TradeTable />);
      wrapper.setState({
        searchString: '',
        total: 42,
      });
      const spyHandleTableUpdate = jest.spyOn(wrapper.instance(), 'handleTableUpdate');
      const mock = new MockAdapter(axios);
      mock
        .onGet('https://dynamic-server.herokuapp.com/trades.json?&&[pagination][number]=1&&[pagination][size]=5')
        .reply(200, mockData);
      await wrapper.instance().handleTableUpdate();
      expect(spyHandleTableUpdate).toHaveBeenCalled();
    });

    it('when it cant fetch data and throw error ', async () => {
      const shallowNew = createShallow({ dive: true });
      const wrapper = shallowNew(<TradeTable />);
      const mock = new MockAdapter(axios);
      wrapper.setState({ searchString: '' });
      window.console.error = jest.fn();
      mock.onAny().reply(500);
      await wrapper.instance().handleTableUpdate();
      expect(mock.handlers.get[0][3]).toEqual(500);
    });
  });

  describe('when searchString is valid ', () => {
    it('when it cant fetch data and throw error', async () => {
      const shallowNew = createShallow({ dive: true });
      const wrapper = shallowNew(<TradeTable />);
      const mock = new MockAdapter(axios);
      wrapper.setState({ searchString: 'aaa' });
      window.console.error = jest.fn();
      mock.reset();
      mock.onAny().reply(500);
      await wrapper.instance().handleTableUpdate();
      expect(mock.handlers.get[0][3]).toEqual(500);
    });
    it('handleTableUpdate() throw error when it fetches data searchString!=""', async () => {
      const shallowNew = createShallow({ dive: true });
      const wrapper = shallowNew(<TradeTable />);
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
