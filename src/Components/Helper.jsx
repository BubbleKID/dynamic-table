import dayjs from 'dayjs';

export function desc(a, b, orderBy) {
  if (orderBy === 'updatedAt' || orderBy === 'createdAt') {
    if (dayjs(a[orderBy]).isAfter(dayjs(b[orderBy]))) {
      return -1;
    }
    if (dayjs(b[orderBy]).isAfter(dayjs(a[orderBy]))) {
      return 1;
    }
  } else {
    if (b[orderBy] * 100 < a[orderBy] * 100) {
      return -1;
    }
    if (typeof [orderBy] === 'object' && b[orderBy].symbol < a[orderBy].symbol) {
      return -1;
    }
    if (b[orderBy] * 100 > a[orderBy] * 100) {
      return 1;
    }
  }
  return 0;
}

export function stableSort(array, cmp) {
  const stabilizedThis = array.map((el, index) => [el, index]);

  stabilizedThis.sort((a, b) => {
    const order = cmp(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map(el => el[0]);
}

export function getSorting(order, orderBy) {
  return order === 'desc' ? (a, b) => desc(a, b, orderBy) : (a, b) => -desc(a, b, orderBy);
}
