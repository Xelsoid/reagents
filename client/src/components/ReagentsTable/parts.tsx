import { styled } from '@mui/material/styles';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';

export const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
  padding: '8px',
  width: 'auto',
}));

// @ts-expect-error: Can't fix this issue regarding passing custom props
// https://github.com/emotion-js/emotion/issues/2193
export const StyledTableRow = styled(TableRow)(({ theme, alertRow }) => ({
  height: '65px',

  '&:nth-of-type(odd)': {
    backgroundColor: !alertRow && theme.palette.action.hover,
  },
  // color row in red if amount < minAmount
  backgroundColor: alertRow && theme.palette.error.light,

  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));
