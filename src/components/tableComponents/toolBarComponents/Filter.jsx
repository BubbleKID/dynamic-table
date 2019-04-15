import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Input from '@material-ui/core/Input';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import FormControl from '@material-ui/core/FormControl';

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

const filterStyles = theme => ({
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
  formControl: {
    marginRight: theme.spacing.unit * 3,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginRight: theme.spacing.unit * 3,
      width: 130,
    },
  },
});

let Filter = (props) => {
  const {
    selectedFilter,
    filterItem,
    handleFilterChange,
    classes,
  } = props;

  return (
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
  );
};

Filter.propTypes = {
  classes: PropTypes.instanceOf(Object).isRequired,
  handleFilterChange: PropTypes.func.isRequired,
  selectedFilter: PropTypes.instanceOf(Array).isRequired,
  filterItem: PropTypes.instanceOf(Object).isRequired,

};

export default Filter = withStyles(filterStyles)(Filter);
