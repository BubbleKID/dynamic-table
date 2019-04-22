import React from 'react';
import PropTypes from 'prop-types';
import {
  TableCell, TableHead, TableRow, TableSortLabel,
} from '@material-ui/core';
import './CustomTableHead.sass';

const CustomTableHead = (props) => {
  const { onRequestSort } = props;
  const createSortHandler = property => (event) => {
    onRequestSort(event, property);
  };
  const {
    order, orderBy, tableRows,
  } = props;

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox" />
        {tableRows.map(
          row => (
            <TableCell
              key={row.id}
              align={row.numeric ? 'right' : 'left'}
              padding={row.disablePadding ? 'none' : 'default'}
              sortDirection={orderBy === row.id ? order : false}
            >
              <TableSortLabel
                className="tooltip"
                active={orderBy === row.id}
                direction={order}
                onClick={createSortHandler(row.id)}
              >
                <span className="tooltiptext">{`Sort by ${row.label}`}</span>
                {row.label}
              </TableSortLabel>
            </TableCell>
          ),
          this,
        )}
      </TableRow>
    </TableHead>
  );
};

CustomTableHead.propTypes = {
  onRequestSort: PropTypes.func.isRequired,
  order: PropTypes.string.isRequired,
  orderBy: PropTypes.string.isRequired,
  tableRows: PropTypes.instanceOf(Array).isRequired,
};

export default CustomTableHead;
