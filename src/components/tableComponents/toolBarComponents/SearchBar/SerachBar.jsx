import React from 'react';
import PropTypes from 'prop-types';
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from './SearchIcon';
import './SearchBar.sass';

const SearchBar = (props) => {
  const {
    searchString, handleSearchChange, searchPlaceHolder,
  } = props;
  return (
    <div className="search">
      <div className="searchIcon">
        <SearchIcon />
      </div>
      <InputBase
        placeholder={searchPlaceHolder}
        className="inputRoot"
        value={searchString}
        onChange={handleSearchChange}
        id="searchBar"
      />
    </div>
  );
};

SearchBar.propTypes = {
  handleSearchChange: PropTypes.func.isRequired,
  searchString: PropTypes.string.isRequired,
  searchPlaceHolder: PropTypes.string.isRequired,
};

export default SearchBar;
