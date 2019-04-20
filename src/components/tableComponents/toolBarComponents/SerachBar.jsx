import React from 'react';
import PropTypes from 'prop-types';
import InputBase from '@material-ui/core/InputBase';
import { withStyles } from '@material-ui/core/styles';
import { lighten } from '@material-ui/core/styles/colorManipulator';
import SearchIcon from './SearchIcon';

const searchBarStyles = theme => ({
  inputRoot: {
    color: 'inherit',
    width: '100%',
  },
  inputInput: {
    paddingTop: theme.spacing.unit,
    paddingRight: theme.spacing.unit,
    paddingBottom: theme.spacing.unit,
    paddingLeft: theme.spacing.unit * 10,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: 300,
    },
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: lighten('#eeeeee', 0.15),
    '&:hover': {
      backgroundColor: lighten('#eeeeee', 0.45),
    },
    marginRight: theme.spacing.unit * 3,
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing.unit * 3,
      width: 'auto',
    },
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
});

const SearchBar = (props) => {
  const {
    classes,
    searchString,
    handleSearchChange,
    searchPlaceHolder,
  } = props;
  return (
    <div className={classes.search}>
      <div className={classes.searchIcon}>
        <SearchIcon />
      </div>
      <InputBase
        placeholder={searchPlaceHolder}
        classes={{
          root: classes.inputRoot,
          input: classes.inputInput,
        }}
        value={searchString}
        onChange={handleSearchChange}
        id="searchBar"
      />
    </div>
  );
};


SearchBar.propTypes = {
  classes: PropTypes.instanceOf(Object).isRequired,
  handleSearchChange: PropTypes.func.isRequired,
  searchString: PropTypes.string.isRequired,
  searchPlaceHolder: PropTypes.string.isRequired,
};

export default withStyles(searchBarStyles)(SearchBar);
