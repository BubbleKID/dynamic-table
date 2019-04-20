import React from 'react';
import PropTypes from 'prop-types';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Input from '@material-ui/core/Input';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import FormControl from '@material-ui/core/FormControl';
import './Filter.sass';

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

const Filter = (props) => {
  const {
    selectedFilter, filterItem, handleFilterChange,
  } = props;

  return (
    <div className="filter">
      <FormControl className="formControl">
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
  handleFilterChange: PropTypes.func.isRequired,
  selectedFilter: PropTypes.instanceOf(Array).isRequired,
  filterItem: PropTypes.instanceOf(Object).isRequired,

};

export default Filter;
