import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import 'date-fns';
import { MuiPickersUtilsProvider, DatePicker } from 'material-ui-pickers';
import DateFnsUtils from '@date-io/date-fns';
import FormControl from '@material-ui/core/FormControl';
import Button from '@material-ui/core/Button';
import SearchBar from './toolBarComponents/SerachBar';
import Filter from './toolBarComponents/Filter';

const toolbarStyles = theme => ({
  root: {
    paddingRight: theme.spacing.unit,
    backgroundColor: '#e0e0e0',
  },
  spacer: {
    flex: '1 1 200px',
  },
  actions: {
    color: theme.palette.text.secondary,
  },
  title: {
    flex: '0 0 auto',

  },
  datepicker: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    marginRight: theme.spacing.unit * 3,
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginRight: theme.spacing.unit * 3,
      width: 120,
    },
    minWidth: 120,
    margin: 0,
  },
  buttonContainer: {
    position: 'relative',
    marginRight: theme.spacing.unit * 2,
    marginLeft: 0,
  },
  button: {
    backgroundColor: '#2196f3',
  },
  iconButton: {
    padding: 10,
  },
  divider: {
    width: 1,
    height: 28,
    margin: 4,
  },
});

let TradeTableToolbar = (props) => {
  const {
    classes,
    title,
    handleFromDateChange,
    handleToDateChange,
    handleSearchChange,
    handleFilterChange,
    searchString,
    selectedFromDate,
    selectedToDate,
    filterItem,
    selectedFilter,
    handleReset,
    searchPlaceHolder,
  } = props;

  return (
    <Toolbar
      className={classes.root}
    >
      <div className={classes.title}>
        <Typography variant="h6" id="tableTitle">
          { title }
        </Typography>
      </div>
      <div className={classes.spacer} />
      <SearchBar
        searchPlaceHolder={searchPlaceHolder}
        searchString={searchString}
        handleSearchChange={handleSearchChange}
      />
      <div className={classes.datepicker}>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <DatePicker
            label="From"
            value={new Date(selectedFromDate)}
            onChange={handleFromDateChange}
            format="yyyy-MM-dd"
          />
        </MuiPickersUtilsProvider>
      </div>
      <div className={classes.datepicker}>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <DatePicker
            label="To"
            value={new Date(selectedToDate)}
            onChange={handleToDateChange}
            format="yyyy-MM-dd"
          />
        </MuiPickersUtilsProvider>
      </div>
      <Filter
        handleFilterChange={handleFilterChange}
        filterItem={filterItem}
        selectedFilter={selectedFilter}
      />
      <div className={classes.buttonContainer}>
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
  classes: PropTypes.instanceOf(Object).isRequired,
  title: PropTypes.string.isRequired,
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

export default TradeTableToolbar = withStyles(toolbarStyles)(TradeTableToolbar);
