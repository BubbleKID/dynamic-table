export function desc(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
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

export function dateFormat(date) {
  const year = (new Date(date)).getFullYear();
  const month = ((new Date(date)).getMonth() < 10 ? '0' : '') + ((new Date(date)).getMonth() + 1);
  const day = ((new Date(date)).getDate() < 10 ? '0' : '') + (new Date(date)).getDate();
  return (`${year}-${month}-${day}`);
}
