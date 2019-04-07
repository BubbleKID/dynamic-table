import React from 'react';
import PropTypes from 'prop-types';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Tooltip from '@material-ui/core/Tooltip';


const rows = [
  {
    id: 'uuid', numeric: false, disablePadding: true, label: 'Uuid',
  },
  {
    id: 'updatedAt', numeric: true, disablePadding: false, label: 'Updated at',
  },
  {
    id: 'side', numeric: true, disablePadding: false, label: 'Side',
  },
  {
    id: 'volume', numeric: true, disablePadding: false, label: 'Volume',
  },
  {
    id: 'price', numeric: true, disablePadding: false, label: 'Price',
  },
  {
    id: 'tradingPairSymbol', numeric: true, disablePadding: false, label: 'Trading Pair Symbol',
  },
];

class TradeTableHead extends React.Component {
  createSortHandler = property => (event) => {
    const { onRequestSort } = this.props;
    onRequestSort(event, property);
  };

  render() {
    const {
      order, orderBy,
    } = this.props;

    return (
      <TableHead>
        <TableRow>
          <TableCell padding="checkbox" />
          {rows.map(
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
                    onClick={this.createSortHandler(row.id)}
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
  }
}

TradeTableHead.propTypes = {
  onRequestSort: PropTypes.func.isRequired,
  order: PropTypes.string.isRequired,
  orderBy: PropTypes.string.isRequired,
};

export default TradeTableHead;
