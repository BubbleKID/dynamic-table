import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { lighten } from '@material-ui/core/styles/colorManipulator';
import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';
import 'date-fns';
import { MuiPickersUtilsProvider, DatePicker } from 'material-ui-pickers';
import DateFnsUtils from '@date-io/date-fns';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button';

const toolbarStyles = theme => ({
  root: {
    paddingRight: theme.spacing.unit,
    backgroundColor: '#e0e0e0',
  },
  highlight:
    theme.palette.type === 'light'
      ? {
        color: theme.palette.secondary.main,
        backgroundColor: lighten(theme.palette.secondary.light, 0.85),
      }
      : {
        color: theme.palette.text.primary,
        backgroundColor: theme.palette.secondary.dark,
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
  whiteColor: {
    color: 'white',
  },
  searchRoot: {
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
    width: 400,
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: lighten('#eeeeee', 0.15),
    '&:hover': {
      backgroundColor: lighten('#eeeeee', 0.25),
    },
    marginRight: theme.spacing.unit * 3,
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing.unit * 3,
      width: 'auto',
    },
    maxWidth: 250,
  },
  searchIcon: {
    width: theme.spacing.unit * 9,
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
    width: '100%',
  },
  input: {
    marginLeft: 8,
    flex: 1,
  },
  inputInput: {
    paddingTop: theme.spacing.unit,
    paddingRight: theme.spacing.unit,
    paddingBottom: theme.spacing.unit,
    paddingLeft: theme.spacing.unit * 10,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: 200,
    },
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
  filter: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    marginRight: theme.spacing.unit * 3,
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginRight: theme.spacing.unit * 3,
      width: 130,
    },
  },
  buttonContainer: {
    position: 'relative',
    marginRight: theme.spacing.unit * 2,
    marginLeft: 0,
  },
  button: {
    backgroundColor: '#2196f3',
  },
  formControl: {
    height: 48,
    minHeight: 48,
    paddingRight: 2,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing.unit * 0,
      width: 130,
    },
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

const ITEM_HEIGHT = 64;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

let TradeTableToolbar = (props) => {
  const {
    classes,
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
  } = props;

  return (
    <Toolbar
      className={classes.root}
    >
      <div className={classes.title}>
        <Typography variant="h6" id="tableTitle">
          Trade
        </Typography>
      </div>
      <div className={classes.spacer} />
      <div className={classes.search}>
        <div className={classes.searchIcon}>
          <SearchIcon />
        </div>
        <InputBase
          placeholder="Uuid, Volume, Price"
          classes={{
            root: classes.inputRoot,
            input: classes.inputInput,
          }}
          value={searchString}
          onChange={handleSearchChange}
          id="searchBar"
        />
      </div>
      <div className={classes.datepicker}>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <DatePicker
            label="From"
            value={new Date(selectedFromDate)}
            onChange={handleFromDateChange}
            format="dd-MM-yyyy"
          />
        </MuiPickersUtilsProvider>
      </div>
      <div className={classes.datepicker}>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <DatePicker
            label="To"
            value={new Date(selectedToDate)}
            onChange={handleToDateChange}
            format="dd-MM-yyyy"
          />
        </MuiPickersUtilsProvider>
      </div>
      <div className={classes.filter}>
        <FormControl className={classes.formControl}>
          <InputLabel shrink htmlFor="select-filter">Filter</InputLabel>
          <Select
            multiple
            value={selectedFilter}
            onChange={e => handleFilterChange(e)}
            input={<Input id="select-filter" />}
            renderValue={selected => selected.join(', ')}
            MenuProps={MenuProps}
            id="filter-select"
          >
            {Object.keys(filterItem).map(key => (
              <MenuItem key={key} value={key}>
                <Checkbox checked={selectedFilter.indexOf(key) > -1} />
                <ListItemText primary={key} secondary={filterItem[key]} />
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
      <div className={classes.buttonContainer}>
        <FormControl>
          <Button variant="outlined" color="secondary" onClick={handleReset}>
            Reset
          </Button>
        </FormControl>
      </div>
    </Toolbar>
  );
};

TradeTableToolbar.propTypes = {
  classes: PropTypes.instanceOf(Object).isRequired,
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
};

export default TradeTableToolbar = withStyles(toolbarStyles)(TradeTableToolbar);
