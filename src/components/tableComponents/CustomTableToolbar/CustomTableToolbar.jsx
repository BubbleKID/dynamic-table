import React from 'react';
import PropTypes from 'prop-types';
import {
  Toolbar, Typography, FormControl, Button,
} from '@material-ui/core';
import { MuiPickersUtilsProvider, DatePicker } from 'material-ui-pickers';
import DayjsUtils from '@date-io/dayjs';
import 'dayjs';
import SearchBar from '../toolBarComponents/SearchBar/SerachBar';
import Filter from '../toolBarComponents/Filter/Filter';
import './CustomTableToolbar.sass';

const TradeTableToolbar = (props) => {
  const {
    name, handleFromDateChange, handleToDateChange, handleSearchChange, handleFilterChange,
    searchString, selectedFromDate, selectedToDate, filterItem, selectedFilter, handleReset,
    searchPlaceHolder,
  } = props;

  return (
    <Toolbar className="root">
      <div className="title">
        <Typography variant="h6" id="tableTitle">
          { name }
        </Typography>
      </div>
      <div className="spacer" />
      <SearchBar
        searchPlaceHolder={searchPlaceHolder}
        searchString={searchString}
        handleSearchChange={handleSearchChange}
      />
      <div className="datepicker">
        <MuiPickersUtilsProvider utils={DayjsUtils}>
          <DatePicker
            label="From"
            value={new Date(selectedFromDate)}
            onChange={handleFromDateChange}
            format="YYYY-MM-DD"
          />
        </MuiPickersUtilsProvider>
      </div>
      <div className="datepicker">
        <MuiPickersUtilsProvider utils={DayjsUtils}>
          <DatePicker
            label="To"
            value={new Date(selectedToDate)}
            onChange={handleToDateChange}
            format="YYYY-MM-DD"
          />
        </MuiPickersUtilsProvider>
      </div>
      <Filter
        handleFilterChange={handleFilterChange}
        filterItem={filterItem}
        selectedFilter={selectedFilter}
      />
      <div className="buttonContainer">
        <FormControl>
          <Button id="reset" variant="outlined" color="secondary" onClick={handleReset}>
            Reset
          </Button>
        </FormControl>
      </div>
    </Toolbar>
  );
};

TradeTableToolbar.propTypes = {
  name: PropTypes.string.isRequired,
  handleFromDateChange: PropTypes.func.isRequired,
  handleToDateChange: PropTypes.func.isRequired,
  handleSearchChange: PropTypes.func.isRequired,
  handleFilterChange: PropTypes.func.isRequired,
  selectedFromDate: PropTypes.string.isRequired,
  selectedToDate: PropTypes.string.isRequired,
  searchString: PropTypes.string.isRequired,
  selectedFilter: PropTypes.instanceOf(Array).isRequired,
  filterItem: PropTypes.instanceOf(Object).isRequired,
  handleReset: PropTypes.func.isRequired,
  searchPlaceHolder: PropTypes.string.isRequired,
};

export default TradeTableToolbar;
