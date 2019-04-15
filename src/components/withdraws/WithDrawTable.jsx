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
import CustomTableHead from '../tableComponents/CustomTableHead';
import CustomTableToolbar from '../tableComponents/CustomTableToolbar';
import Container from '../../container/Container';

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
const rows = [
  {
    id: 'uuid', numeric: false, disablePadding: true, label: 'Uuid',
  },
  {
    id: 'createdAt', numeric: true, disablePadding: false, label: 'Created at',
  },
  {
    id: 'status', numeric: true, disablePadding: false, label: 'Status',
  },
  {
    id: 'amount', numeric: true, disablePadding: false, label: 'Amount',
  },
  {
    id: 'bankReferenceNumber', numeric: true, disablePadding: false, label: 'Bank Reference Number',
  },
];

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
      dateUrl: '',
      isLoading: true,
      isReset: false,
    };

    const localState = localStorage.getItem('withdrawState');
    if (localState !== null && localState !== undefined) {
      this.state = JSON.parse(localState);
    } else {
      localStorage.setItem('withdrawState', JSON.stringify(this.state));
    }
    this.handlePageClick = this.handlePageClick.bind(this);
    this.handleSearchChange = this.handleSearchChange.bind(this);
    this.handleRequestSort = this.handleRequestSort.bind(this);
    this.handleChangeRowsPerPage = this.handleChangeRowsPerPage.bind(this);
    this.handleFromDateChange = this.handleFromDateChange.bind(this);
    this.handleToDateChange = this.handleToDateChange.bind(this);
    this.handleFilterChange = this.handleFilterChange.bind(this);
    this.handleTableUpdate = this.handleTableUpdate.bind(this);
    this.handleReset = this.handleReset.bind(this);
    this.handleCreateTable = this.handleCreateTable.bind(this);
    this.getFilterUrl = this.getFilterUrl.bind(this);
  }

  componentDidMount() {
    this.handleTableUpdate();
  }

  componentDidUpdate(prevProps, prevState) {
    const {
      searchString,
      selectedFromDate,
      selectedToDate,
      selectedFilter,
      currentPage,
      size,
      isReset,
    } = this.state;

    if (isReset !== true) {
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
      if (currentPage !== prevState.currentPage) {
        this.handleTableUpdate();
      }
      if (size !== prevState.size) {
        this.handleTableUpdate();
      }
    }
  }

  getFilterUrl() {
    const { filterString } = this.state;
    let filterUrl = '';

    filterString.forEach((item, i) => {
      if (i === 0) {
        filterUrl += `${item}`;
      } else {
        filterUrl += `&&${item}`;
      }
    });
    return filterUrl;
  }

  handlePageClick(event, _offset, _currentPage) {
    this.setState({
      offset: _offset,
      currentPage: _currentPage,
    });
  }

  handleSearchChange(event) {
    this.setState({ searchString: event.target.value });
  }

  handleRequestSort(event, property) {
    const newOrderBy = property;
    let newOrder = 'desc';

    const { orderBy, order } = this.state;
    if (orderBy === property && order === 'desc') {
      newOrder = 'asc';
    }

    this.setState({ order: newOrder, orderBy: newOrderBy });
  }

  handleChangeRowsPerPage(event) {
    this.setState({
      size: event.target.value,
    });
  }

  handleFromDateChange(date) {
    const { selectedToDate } = this.state;

    this.setState({
      selectedFromDate: date.toString(),
      dateUrl: `filter[createdAt][gte]=${format(date, 'yyyy-MM-dd')}&&filter[createdAt][lte]=${format(new Date(selectedToDate), 'yyyy-MM-dd')}&&`,
    });
  }

  handleToDateChange(date) {
    const { selectedFromDate } = this.state;

    this.setState({
      selectedToDate: date.toString(),
      dateUrl: `filter[createdAt][gte]=${format(new Date(selectedFromDate), 'yyyy-MM-dd')}&&filter[createdAt][lte]=${format(date, 'yyyy-MM-dd')}&&`,
    });
  }

  handleFilterChange(event) {
    const newFilterString = event.target.value.map(item => (`filter[status]=${item.toUpperCase()}`));
    this.setState({
      selectedFilter: event.target.value,
      filterString: newFilterString,
    });
  }

  handleCreateTable(data) {
    const { order, orderBy } = this.state;
    let displayDate;
    let table = '';

    if (data.length === 0) {
      table = (
        <TableRow
          hover
          role="checkbox"
          tabIndex={-1}
        />
      );
    } else {
      table = stableSort(data, getSorting(order, orderBy))
        .map(
          (n) => {
            displayDate = format((n.createdAt), 'dd/MM/yyyy');
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
          },
        );
    }
    return table;
  }

  handleTableUpdate() {
    const {
      searchString,
      dateUrl,
      currentPage,
      size,
    } = this.state;

    this.setState({ isLoading: true });
    const filterUrl = this.getFilterUrl();

    if (searchString === '') {
      axios.get(`${serverUrl}/withdraws.json?${filterUrl}${dateUrl}[pagination][number]=${currentPage}&&[pagination][size]=${size}`)
        .then((responese) => {
          this.setState({
            total: responese.data.pagination.total,
            data: responese.data.trades,
            isLoading: false,
            isReset: false,
          });
          localStorage.setItem('withdrawState', JSON.stringify(this.state));
        }).catch((err) => {
          this.setState({
            isLoading: false,
            isReset: false,
          });
          window.console.error(err);
        });
    } else {
      axios.all([
        axios.get(`${serverUrl}/withdraws.json?filter[uuid]=${searchString}&&${filterUrl}${dateUrl}`),
        axios.get(`${serverUrl}/withdraws.json?filter[amount]=${searchString}&&${filterUrl}${dateUrl}`),
        axios.get(`${serverUrl}/withdraws.json?filter[bankReferenceNumber]=${searchString}&&${filterUrl}${dateUrl}`),
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
          isReset: false,
        });
        localStorage.setItem('withdrawState', JSON.stringify(this.state));
      })).catch((err) => {
        this.setState({
          isLoading: false,
          isReset: false,
        });
        window.console.error(err);
      });
    }
  }

  handleReset() {
    this.setState({
      isReset: true,
      selectedFromDate: new Date('2010-10-10T10:10:10').toString(),
      selectedToDate: new Date().toString(),
      searchString: '',
      filterString: [],
      selectedFilter: [],
      dateUrl: '',
      currentPage: 1,
      offset: 0,
      size: 5,
    }, () => this.handleTableUpdate());
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
      filterItem,
      selectedFilter,
      isLoading,
      offset,
      size,
      total,
    } = this.state;
    const emptyRows = size - data.length;

    return (
      <Container name="Withdraws">
        <Paper className={classes.root}>
          <CustomTableToolbar
            title="WithDraws"
            searchPlaceHolder="Uuid, Amount, Bank reference number"
            searchString={searchString}
            handleFromDateChange={this.handleFromDateChange}
            handleToDateChange={this.handleToDateChange}
            handleSearchChange={this.handleSearchChange}
            handleFilterChange={this.handleFilterChange}
            handleReset={this.handleReset}
            selectedFromDate={selectedFromDate}
            selectedToDate={selectedToDate}
            filterString={filterString}
            filterItem={filterItem}
            selectedFilter={selectedFilter}
          />
          <div className={classes.tableWrapper}>
            <Table className={classes.table} aria-labelledby="tableTitle">
              <CustomTableHead
                rows={rows}
                order={order}
                orderBy={orderBy}
                onRequestSort={this.handleRequestSort}
                rowCount={data.length}
              />
              <TableBody>
                {this.handleCreateTable(data)}
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
              id="pagination"
            />
          </div>
          { isLoading ? (<LinearProgress color="secondary" />) : null }
        </Paper>
      </Container>
    );
  }
}

WithDrawTable.propTypes = {
  classes: PropTypes.instanceOf(Object).isRequired,
};

export default withStyles(styles)(WithDrawTable);
