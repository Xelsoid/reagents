// @ts-nocheck
import { styled } from "@mui/material/styles";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";

export const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
  padding: "8px",
  width: "auto",
}));

export const StyledTableRow = styled(TableRow)(({ theme, alertRow }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: !alertRow && theme.palette.action.hover,
  },
  // color row in red if amount < 100
  backgroundColor: alertRow && theme.palette.error.light,

  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));
