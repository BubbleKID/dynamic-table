import React from 'react';
import PropTypes from 'prop-types';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';
import axios from 'axios';
import { format } from 'date-fns';
import LinearProgress from '@material-ui/core/LinearProgress';
import Pagination from 'material-ui-flat-pagination';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Typography from '@material-ui/core/Typography';
import serverUrl from '../api/server';
import WithDrawTableHead from './WithDrawTableHead';
import WithDrawTableToolbar from './WithDrawTableToolbar';

export function desc(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

export function stableSort(array, cmp) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = cmp(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map(el => el[0]);
}

export function getSorting(order, orderBy) {
  return order === 'desc' ? (a, b) => desc(a, b, orderBy) : (a, b) => -desc(a, b, orderBy);
}

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
  },
  table: {
    minWidth: 1020,
  },
  tableWrapper: {
    overflowX: 'auto',
  },
  pagination: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '56px',

  },
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 200,
    maxWidth: 200,
    height: '24px',
    display: 'flex',
  },
  label: {
    lineHeight: '1.8em',
    marginRight: theme.spacing.unit * 2,
    width: '200px',
  },
  sizeSelect: {
    lineHeight: '1.8em',
    borderBottom: 0,
    fontSize: '12px',
    '&:before': {
      borderBottom: 0,
    },
    '&:after': {
      borderBottom: 0,
    },
  },
});
const rowsPerPage = [5, 10, 15, 20];

class WithDrawTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      order: 'asc',
      orderBy: 'price',
      data: [],
      offset: 0,
      size: 5,
      currentPage: 1,
      total: '',
      selectedFromDate: new Date('2010-10-10T10:10:10').toString(),
      selectedToDate: new Date().toString(),
      searchString: '',
      filterString: [],
      filterItem: {
        PROCESSED: 'status',
        REJECTED: 'status',
      },
      selectedFilter: [],
      dateRange: '',
      isLoading: true,
    };

    const localState = localStorage.getItem('withdrawState');
    if (localState !== null && localState !== undefined) {
      this.state = JSON.parse(localState);
    } else {
      localStorage.setItem('withdrawState', JSON.stringify(this.state));
    }
  }

  componentDidMount() {
    const { currentPage, size } = this.state;
    const localState = localStorage.getItem('withdrawState');

    if (localState !== null && localState !== undefined) {
      this.handleTableUpdate();
    } else {
      axios
        .get(`${serverUrl}/withdraws.json?[pagination][number]=${currentPage}&&[pagination][size]=${size}`)
        .then((responese) => {
          this.setState({
            total: responese.data.pagination.total,
            data: responese.data.trades,
            isLoading: false,
          });
        }).catch((err) => {
          this.setState({ isLoading: false });
          window.console.error(err);
        });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const {
      searchString,
      filterString,
      selectedFromDate,
      selectedToDate,
      selectedFilter,
      currentPage,
      size,
    } = this.state;

    if (searchString !== prevState.searchString) {
      this.handleTableUpdate();
    }
    if (selectedFilter !== prevState.selectedFilter) {
      this.handleTableUpdate();
    }
    if (selectedFromDate !== prevState.selectedFromDate
      || selectedToDate !== prevState.selectedToDate) {
      this.handleTableUpdate();
    }
    if (filterString !== prevState.filterString) {
      this.handleTableUpdate();
    }
    if (currentPage !== prevState.currentPage) {
      this.handleTableUpdate();
    }
    if (size !== prevState.size) {
      this.handleTableUpdate();
    }
  }

  handlePageClick= (event, _offset, _currentPage) => {
    this.setState({
      offset: _offset,
      currentPage: _currentPage,
    });
  }

  handleSearchChange = (event) => {
    this.setState({ searchString: event.target.value });
  }

  handleRequestSort = (event, property) => {
    const newOrderBy = property;
    let newOrder = 'desc';

    const { orderBy, order } = this.state;
    if (orderBy === property && order === 'desc') {
      newOrder = 'asc';
    }

    this.setState({ order: newOrder, orderBy: newOrderBy });
  };

  handleChangeRowsPerPage = (event) => {
    this.setState({
      size: event.target.value,
    });
  };

  handleFromDateChange = (date) => {
    const { selectedToDate } = this.state;

    this.setState({
      selectedFromDate: date.toString(),
      dateRange: `filter[createdAt][gte]=${format(date, 'yyyy-MM-dd')}&&filter[createdAt][lte]=${format(new Date(selectedToDate), 'yyyy-MM-dd')}`,
    });
  };

  handleToDateChange = (date) => {
    const { selectedFromDate } = this.state;

    this.setState({
      selectedToDate: date.toString(),
      dateRange: `filter[createdAt][gte]=${format(new Date(selectedFromDate), 'yyyy-MM-dd')}&&filter[createdAt][lte]=${format(date, 'yyyy-MM-dd')}`,
    });
  };

  handleFilterChange = (event) => {
    const newFilterString = event.target.value.map(item => (`filter[status]=${item.toUpperCase()}`));
    this.setState({
      selectedFilter: event.target.value,
      filterString: newFilterString,
    });
  }

  handleTableUpdate = () => {
    const {
      searchString,
      dateRange,
      filterString,
      currentPage,
      size,
    } = this.state;
    this.setState({ isLoading: true });
    let newUrl = '';

    filterString.forEach((item, i) => {
      if (i === 0) {
        newUrl += `${item}`;
      } else {
        newUrl += `&&${item}`;
      }
    });

    if (searchString === '') {
      axios.get(`${serverUrl}/withdraws.json?${newUrl}${dateRange}&&[pagination][number]=${currentPage}&&[pagination][size]=${size}`)
        .then((responese) => {
          this.setState({
            total: responese.data.pagination.total,
            data: responese.data.trades,
            isLoading: false,
          });
          localStorage.setItem('withdrawState', JSON.stringify(this.state));
        }).catch((err) => {
          this.setState({ isLoading: false });
          window.console.error(err);
        });
    } else {
      axios.all([
        axios.get(`${serverUrl}/withdraws.json?filter[uuid]=${searchString}&&${newUrl}${dateRange}`),
        axios.get(`${serverUrl}/withdraws.json?filter[amount]=${searchString}&&${newUrl}${dateRange}`),
        axios.get(`${serverUrl}/withdraws.json?filter[bankReferenceNumber]=${searchString}&&${newUrl}${dateRange}`),
      ]).then(axios.spread((uuidRes, volumeRes, priceRes) => {
        const searchResult = uuidRes.data.trades
          .concat(priceRes.data.trades)
          .concat(volumeRes.data.trades);
        this.setState({
          total: uuidRes.data.pagination.total
          + volumeRes.data.pagination.total
          + priceRes.data.pagination.total,
          data: searchResult,
          isLoading: false,
        });
        localStorage.setItem('withdrawState', JSON.stringify(this.state));
      })).catch((err) => {
        this.setState({ isLoading: false });
        window.console.error(err);
      });
    }
  }

  handleReset = () => {
    this.setState({
      selectedFromDate: new Date('2010-10-10T10:10:10').toString(),
      selectedToDate: new Date().toString(),
      searchString: '',
      filterString: [],
      selectedFilter: [],
      dateRange: '',
      currentPage: 1,
      offset: 0,
      size: 5,
    });
    this.handleTableUpdate();
  }

  render() {
    const { classes } = this.props;
    const {
      data,
      order,
      orderBy,
      selectedFromDate,
      selectedToDate,
      searchString,
      filterString,
      side,
      symbol,
      filterItem,
      selectedFilter,
      isLoading,
      offset,
      size,
      total,
    } = this.state;
    const emptyRows = size - data.length;

    return (
      <Paper className={classes.root}>
        <WithDrawTableToolbar
          handleFromDateChange={this.handleFromDateChange}
          handleToDateChange={this.handleToDateChange}
          handleSearchChange={this.handleSearchChange}
          handleFilterChange={this.handleFilterChange}
          selectedFromDate={selectedFromDate}
          selectedToDate={selectedToDate}
          searchString={searchString}
          filterString={filterString}
          side={side}
          symbol={symbol}
          filterItem={filterItem}
          selectedFilter={selectedFilter}
          handleReset={this.handleReset}
        />
        <div className={classes.tableWrapper}>
          <Table className={classes.table} aria-labelledby="tableTitle">
            <WithDrawTableHead
              order={order}
              orderBy={orderBy}
              onRequestSort={this.handleRequestSort}
              rowCount={data.length}
            />
            <TableBody>
              { data.length !== 0 ? (stableSort(data, getSorting(order, orderBy))
                .map((n) => {
                  const displayDate = format((n.createdAt), 'dd/MM/yyyy');
                  return (
                    <TableRow
                      hover
                      role="checkbox"
                      tabIndex={-1}
                      key={n.uuid}
                    >
                      <TableCell padding="checkbox" />
                      <TableCell component="th" scope="row" padding="none">
                        {n.uuid}
                      </TableCell>
                      <TableCell align="right">{displayDate}</TableCell>
                      <TableCell align="right">{n.status}</TableCell>
                      <TableCell align="right">{n.amount}</TableCell>
                      <TableCell align="right">{n.bankReferenceNumber}</TableCell>
                    </TableRow>
                  );
                })) : (
                  <TableRow
                    hover
                    role="checkbox"
                    tabIndex={-1}
                  />)
              }
              {emptyRows > 0 && (
                <TableRow style={{ height: 48 * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
        <div className={classes.pagination}>
          <div className={classes.formControl}>
            <Typography variant="caption" align="center" color="textPrimary" className={classes.label}>
              Rows per page:
            </Typography>
            <Select
              className={classes.sizeSelect}
              value={size}
              onChange={e => this.handleChangeRowsPerPage(e)}
            >
              {
                rowsPerPage.map(item => (
                  <MenuItem key={item} value={item}>
                    {item}
                  </MenuItem>
                ))
              }
            </Select>
          </div>
          <Pagination
            limit={size}
            offset={offset}
            total={total}
            onClick={
              (event, _offset, _currentPage) => this.handlePageClick(event, _offset, _currentPage)
            }
          />
        </div>
        { isLoading ? (<LinearProgress color="secondary" />) : null }
      </Paper>
    );
  }
}

WithDrawTable.propTypes = {
  classes: PropTypes.instanceOf(Object).isRequired,
};

export default withStyles(styles)(WithDrawTable);
