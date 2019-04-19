import React from 'react';
import PropTypes from 'prop-types';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Tooltip from '@material-ui/core/Tooltip';

const CustomTableHead = (props) => {
  const createSortHandler = property => (event) => {
    const { onRequestSort } = props;
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
              <Tooltip
                title="Sort"
                placement={row.numeric ? 'bottom-end' : 'bottom-start'}
                enterDelay={300}
              >
                <TableSortLabel
                  active={orderBy === row.id}
                  direction={order}
                  onClick={createSortHandler(row.id)}
                >
                  {row.label}
                </TableSortLabel>
              </Tooltip>
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
