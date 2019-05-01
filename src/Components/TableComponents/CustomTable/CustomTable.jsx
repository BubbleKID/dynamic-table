import React from 'react';
import PropTypes from 'prop-types';
import {
  Table, TableBody, Paper, LinearProgress, Select, MenuItem, Typography, TableCell, TableRow,
} from '@material-ui/core';
import Pagination from 'material-ui-flat-pagination';
import CustomTableHead from '../CustomTableHead/CustomTableHead';
import CustomTableToolbar from '../CustomTableToolbar/CustomTableToolbar';
import Container from '../../../Container/Container';
import CustomTableContent from '../CustomTableContent/CustomTableContent';
import serverUrl from '../../api/server';
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
      selectedFromDate: new Date('2018-01-01'),
      selectedToDate: new Date(),
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
      searchString, selectedFromDate, selectedToDate, selectedFilter, currentPage, size, isReset,
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

  handleSearchChange = event => this.setState({ searchString: event.target.value })

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

  handleFromDateChange = date => this.setState({ selectedFromDate: date })

  handleDateChange = (date, name) => this.setState({ [name]: date })

  handleFilterChange = event => this.setState({ selectedFilter: event.target.value })

  handleTableUpdate = () => {
    const {
      searchString, currentPage, size, selectedFilter, selectedFromDate, selectedToDate, offset,
    } = this.state;
    const { name, createQuery } = this.props;
    const query = createQuery(
      searchString, selectedFilter, selectedFromDate, selectedToDate, currentPage, size,
    );
    this.setState({ isLoading: true });
    fetch(`${serverUrl}/${name}?query=${query}`)
      .then(response => response.json())
      .then((dataJson) => {
        const currentTotal = dataJson.data.mainQuery.pageInfo.total;
        this.setState({
          data: dataJson.data.mainQuery[name],
          total: dataJson.data.mainQuery.pageInfo.total,
          offset: offset > currentTotal ? 0 : offset,
          currentPage: currentPage > Math.ceil(currentTotal / size) ? 1 : currentPage,
          isLoading: false,
          isReset: false,
        });
        localStorage.setItem(`${name}State`, JSON.stringify(this.state));
      })
      .catch((err) => {
        this.setState({
          isLoading: false,
          isReset: false,
        });
        window.console.error(err);
      });
  }

  handleReset = () => {
    this.setState({
      isReset: true,
      selectedFromDate: new Date('2018-01-01'),
      selectedToDate: new Date(),
      searchString: '',
      selectedFilter: [],
      currentPage: 1,
      offset: 0,
      size: 5,
    }, () => this.handleTableUpdate());
  }

  render() {
    const { tableRows, name, timeString } = this.props;
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
            handleDateChange={this.handleDateChange}
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
                <CustomTableContent
                  data={data}
                  order={order}
                  orderBy={orderBy}
                  timeString={timeString}
                  searchString={searchString}
                />
                {emptyRows > 0 && (
                  <TableRow style={{ height: 48 * emptyRows }}>
                    <TableCell colSpan={7} />
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
