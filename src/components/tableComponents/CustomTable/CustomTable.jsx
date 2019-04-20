import React from 'react';
import PropTypes from 'prop-types';
import {
  Table, TableBody, TableCell, TableRow, Paper, LinearProgress, Select, MenuItem, Typography,
} from '@material-ui/core';
import axios from 'axios';
import Pagination from 'material-ui-flat-pagination';
import serverUrl from '../../api/server';
import CustomTableHead from '../CustomTableHead/CustomTableHead';
import CustomTableToolbar from '../CustomTableToolbar/CustomTableToolbar';
import Container from '../../../container/Container';
import { stableSort, getSorting, dateFormat } from '../../Helper';
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
      currentPage: 1,
      total: '',
      selectedFromDate: new Date('2010-10-10T10:10:10').toString(),
      selectedToDate: new Date().toString(),
      searchString: '',
      filterUrl: '',
      selectedFilter: [],
      dateUrl: '',
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
    const { selectedToDate } = this.state;
    const { timeString } = this.props;
    this.setState({
      selectedFromDate: date.toString(),
      dateUrl: `filter[${timeString}][gte]=${dateFormat(date)}&&filter[${timeString}][lte]=${dateFormat(new Date(selectedToDate))}&&`,
    });
  }

  handleToDateChange = (date) => {
    const { selectedFromDate } = this.state;
    const { timeString } = this.props;

    this.setState({
      selectedToDate: date.toString(),
      dateUrl: `filter[${timeString}][gte]=${dateFormat(new Date(selectedFromDate))}&&filter[${timeString}][lte]=${dateFormat(date)}&&`,
    });
  }

  handleFilterChange = (event) => {
    const { getFilterUrl } = this.props;
    const tempUrl = getFilterUrl(event);

    this.setState({
      selectedFilter: event.target.value,
      filterUrl: tempUrl,
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
          displayDate = dateFormat(n[timeString]);
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

                  if (index > 1 && (typeof (item) !== 'object')) {
                    otherRows = <TableCell key={item} align="right">{item}</TableCell>;
                  }
                  if (typeof (item) === 'object') {
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
      searchString, dateUrl, currentPage, size, offset, filterUrl,
    } = this.state;
    const {
      name, keyword1, keyword2, keyword3,
    } = this.props;

    this.setState({ isLoading: true });
    if (searchString === '') {
      axios.get(`${serverUrl}/${name}.json?${filterUrl}${dateUrl}[pagination][number]=${currentPage}&&[pagination][size]=${size}`)
        .then((responese) => {
          const currentTotal = responese.data.pagination.total;

          this.setState({
            total: currentTotal,
            data: responese.data.trades,
            offset: offset > currentTotal ? 0 : offset,
            currentPage: currentPage > Math.ceil(currentTotal / size) ? 1 : currentPage,
            // Update pagination (offset, currentPage) manually
            // if 'Rows per page' , 'Filter' etc changes
            isLoading: false,
            isReset: false,
          });
          localStorage.setItem(`${name}State`, JSON.stringify(this.state));
        }).catch((err) => {
          this.setState({
            isLoading: false,
            isReset: false,
          });
          window.console.error(err);
        });
    } else {
      axios.all([
        axios.get(`${serverUrl}/${name}.json?filter[${keyword1}]=${searchString}&&${filterUrl}${dateUrl}[pagination][number]=${currentPage}&&[pagination][size]=${size}`),
        axios.get(`${serverUrl}/${name}.json?filter[${keyword2}]=${searchString}&&${filterUrl}${dateUrl}[pagination][number]=${currentPage}&&[pagination][size]=${size}`),
        axios.get(`${serverUrl}/${name}.json?filter[${keyword3}]=${searchString}&&${filterUrl}${dateUrl}[pagination][number]=${currentPage}&&[pagination][size]=${size}`),
      ]).then(axios.spread((uuidRes, volumeRes, priceRes) => {
        const searchResult = uuidRes.data.trades
          .concat(priceRes.data.trades)
          .concat(volumeRes.data.trades);
        const currentTotal = uuidRes.data.pagination.total
        + volumeRes.data.pagination.total
        + priceRes.data.pagination.total;

        this.setState({
          total: currentTotal,
          offset: offset > currentTotal ? 0 : offset,
          currentPage: currentPage > Math.ceil(currentTotal / size) ? 1 : currentPage,
          // Update pagination (offset, currentPage) manually
          // if 'Rows per page' , 'Filter' etc changes
          data: searchResult,
          isLoading: false,
          isReset: false,
        });
        localStorage.setItem(`${name}State`, JSON.stringify(this.state));
      })).catch((err) => {
        this.setState({
          isLoading: false,
          isReset: false,
        });
        window.console.error(err);
      });
    }
  }

  handleReset = () => {
    this.setState({
      isReset: true,
      selectedFromDate: new Date('2010-10-10T10:10:10').toString(),
      selectedToDate: new Date().toString(),
      searchString: '',
      filterUrl: '',
      selectedFilter: [],
      dateUrl: '',
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
  keyword1: PropTypes.string.isRequired,
  keyword2: PropTypes.string.isRequired,
  keyword3: PropTypes.string.isRequired,
  searchPlaceHolder: PropTypes.string.isRequired,
  getFilterUrl: PropTypes.func.isRequired,
};

export default CustomTable;
