import React from 'react';
import PropTypes from 'prop-types';
import {
  Table, TableBody, TableCell, TableRow, Paper, LinearProgress, Select, MenuItem, Typography,
} from '@material-ui/core';
import dayjs from 'dayjs';
import Pagination from 'material-ui-flat-pagination';
import CustomTableHead from '../CustomTableHead/CustomTableHead';
import CustomTableToolbar from '../CustomTableToolbar/CustomTableToolbar';
import Container from '../../../Container/Container';
import { stableSort, getSorting } from '../../Helper';
import './CustomTable.sass';

const rowsPerPage = [5, 10, 15, 20];
class CustomTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      order: 'asc',
      orderBy: 'price',
      data: [],
      offset: 0,
      size: 5,
      currentPage: 0,
      total: '',
      selectedFromDate: new Date('2010-10-10T10:10:10').toString(),
      selectedToDate: new Date().toString(),
      searchString: '',
      selectedFilter: [],
      isLoading: true,
      isReset: false,
    };
    const { name } = this.props;
    const localState = localStorage.getItem(`${name}State`);
    if (localState !== null && localState !== undefined) {
      this.state = JSON.parse(localState);
    } else {
      localStorage.setItem(`${name}State`, JSON.stringify(this.state));
    }
  }

  componentDidMount() {
    this.handleTableUpdate();
  }

  componentDidUpdate(prevProps, prevState) {
    const {
      searchString, selectedFromDate, selectedToDate,
      selectedFilter, currentPage, size, isReset,
    } = this.state;

    if (isReset !== true) {
      if (searchString !== prevState.searchString) {
        this.handleTableUpdate();
      }
      if (selectedFilter !== prevState.selectedFilter) {
        this.handleTableUpdate();
      }
      if (selectedFromDate !== prevState.selectedFromDate
        || selectedToDate !== prevState.selectedToDate
      ) {
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

  handlePageClick = (event, _offset, _currentPage) => {
    this.setState({
      offset: _offset,
      currentPage: _currentPage,
    });
  }

  handleSearchChange = (event) => {
    this.setState({ searchString: event.target.value });
  }

  handleRequestSort = (event, property) => {
    let newOrder = 'desc';
    const { orderBy, order } = this.state;
    if (orderBy === property && order === 'desc') {
      newOrder = 'asc';
    }
    this.setState({ order: newOrder, orderBy: property });
  }

  handleChangeRowsPerPage = (event) => {
    const { offset } = this.state;
    this.setState({
      size: event.target.value,
      currentPage: offset !== 0 ? Math.ceil(offset / event.target.value) : 1,
      // Update pagination (offset, currentPage) manually
      // if 'Rows per page' , 'Filter' etc changes
    });
  }

  handleFromDateChange = (date) => {
    this.setState({
      selectedFromDate: date.toString(),
    });
  }

  handleToDateChange = (date) => {
    this.setState({
      selectedToDate: date.toString(),
    });
  }

  handleFilterChange = (event) => {
    this.setState({
      selectedFilter: event.target.value,
    });
  }

  handleCreateTable = (data) => {
    const { order, orderBy } = this.state;
    const { timeString } = this.props;
    let displayDate;
    let table = '';

    if (data.length === 0) {
      table = <TableRow hover role="checkbox" tabIndex={-1} />;
    } else {
      table = stableSort(data, getSorting(order, orderBy))
        .map((n) => {
          displayDate = dayjs(n[timeString]).format('YYYY-MM-DD');
          return (
            <TableRow hover role="checkbox" tabIndex={-1} key={n.uuid}>
              <TableCell padding="checkbox" />
              <TableCell component="th" scope="row" padding="none">
                {n.uuid}
              </TableCell>
              <TableCell align="right">{displayDate}</TableCell>
              {
                Object.values(n).map((item, index) => {
                  let otherRows;

                  if (index > 1 && (typeof item !== 'object')) {
                    otherRows = <TableCell key={item} align="right">{item}</TableCell>;
                  }
                  if (typeof item === 'object') {
                    otherRows = <TableCell key={item} align="right">{Object.values(item)[Object.values(item).length - 1]}</TableCell>;
                  }
                  return otherRows;
                })
              }
            </TableRow>
          );
        });
    }
    return table;
  }

  handleTableUpdate = () => {
    const {
      searchString, currentPage, size, selectedFilter, selectedFromDate, selectedToDate,
    } = this.state;
    const {
      name,
    } = this.props;
    const getTradeQuery = `
      {
        mainQuery (
          searchString: "${searchString}",
          filter: ["${selectedFilter.join('","')}"],
          fromDate: "${selectedFromDate}",
          toDate: "${selectedToDate}",
          number: ${currentPage},
          size: ${size},
        ){
          trades {
            uuid
            updatedAt
            volume
            price
            side
            tradingPair {
              uuid
              symbol
            }
          }
          pageInfo {
            total
          }
        }
      }
    `;
    this.setState({ isLoading: true });
    fetch(`http://localhost:3000/trades?query=${getTradeQuery}`)
      .then(response => response.json())
      .then((dataJson) => {
        window.console.log(dataJson.data.mainQuery.trades);
        this.setState({
          data: dataJson.data.mainQuery.trades,
          total: dataJson.data.mainQuery.pageInfo.total,
          isLoading: false,
          isReset: false,
        });
        localStorage.setItem(`${name}State`, JSON.stringify(this.state));
      });
  }

  handleReset = () => {
    this.setState({
      isReset: true,
      selectedFromDate: new Date('2010-10-10T10:10:10').toString(),
      selectedToDate: new Date().toString(),
      searchString: '',
      selectedFilter: [],
      currentPage: 1,
      offset: 0,
      size: 5,
    }, () => this.handleTableUpdate());
  }

  render() {
    const {
      tableRows, name,
    } = this.props;
    const {
      data, order, orderBy, selectedFromDate, selectedToDate,
      searchString, selectedFilter, isLoading, offset, size, total,
    } = this.state;
    const emptyRows = size - data.length;

    return (
      <Container name={name}>
        <Paper className="root">
          <CustomTableToolbar
            {...this.props}
            searchString={searchString}
            handleFromDateChange={this.handleFromDateChange}
            handleToDateChange={this.handleToDateChange}
            handleSearchChange={this.handleSearchChange}
            handleFilterChange={this.handleFilterChange}
            handleReset={this.handleReset}
            selectedFromDate={selectedFromDate}
            selectedToDate={selectedToDate}
            selectedFilter={selectedFilter}
          />
          <div className="tableWrapper">
            <Table className="table" aria-labelledby="tableTitle">
              <CustomTableHead
                tableRows={tableRows}
                order={order}
                orderBy={orderBy}
                onRequestSort={this.handleRequestSort}
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
          <div className="pagination">
            <div className="formControl">
              <Typography variant="caption" align="center" color="textPrimary" className="label">
                Rows per page:
              </Typography>
              <Select
                className="sizeSelect"
                value={size}
                onChange={e => this.handleChangeRowsPerPage(e)}
              >
                {rowsPerPage.map(item => <MenuItem key={item} value={item}>{item}</MenuItem>)}
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

CustomTable.propTypes = {
  tableRows: PropTypes.instanceOf(Array).isRequired,
  filterItem: PropTypes.instanceOf(Object).isRequired,
  timeString: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  searchPlaceHolder: PropTypes.string.isRequired,
};

export default CustomTable;
