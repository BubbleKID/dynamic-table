import React from 'react';
import dayjs from 'dayjs';
import PropTypes from 'prop-types';
import { TableCell, TableRow } from '@material-ui/core';
import Highlighter from 'react-highlight-words';
import { stableSort, getSorting } from '../../Helper';


const CustomTableContent = (props) => {
  const {
    order, orderBy, data, timeString, searchString,
  } = props;
  let displayDate;
  let table = '';
  if (data.length === 0) {
    table = <TableRow hover role="checkbox" tabIndex={-1} />;
  } else {
    table = stableSort(data, getSorting(order, orderBy))
      .map((n) => {
        displayDate = dayjs(n[timeString]).format('YYYY-MM-DD');
        return (
          <TableRow hover role="checkbox" tabIndex={-1} key={n.uuid}>
            <TableCell padding="checkbox" />
            <TableCell component="th" scope="row" padding="none">
              <Highlighter searchWords={[searchString]} textToHighlight={n.uuid} />
            </TableCell>
            <TableCell align="right">{displayDate}</TableCell>
            {
              Object.values(n).map((item, index) => {
                let otherRows;
                if (index > 1 && (typeof item !== 'object')) {
                  otherRows = <TableCell key={item} align="right"><Highlighter searchWords={[searchString]} textToHighlight={item} /></TableCell>;
                }
                if (typeof item === 'object') {
                  otherRows = <TableCell key={item} align="right">{Object.values(item)[Object.values(item).length - 1]}</TableCell>;
                }
                return otherRows;
              })
            }
          </TableRow>
        );
      });
  }
  return <React.Fragment>{table}</React.Fragment>;
};


CustomTableContent.propTypes = {
  data: PropTypes.instanceOf(Array).isRequired,
  timeString: PropTypes.string.isRequired,
  order: PropTypes.string.isRequired,
  orderBy: PropTypes.string.isRequired,
  searchString: PropTypes.string.isRequired,
};

export default CustomTableContent;
