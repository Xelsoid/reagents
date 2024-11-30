// @ts-nocheck
import * as React from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
  padding: "8px",
}));

const StyledTableRow = styled(TableRow)(({ theme, alertRow }) => ({
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

const REAGENT_MIN_ALERT_AMOUNT = 100;

const ReagentsTable = ({
  data,
  columnsSequence,
  tableConfiguration,
  showWriteOffBtn = false,
  showDeleteBtn = false,
}: any) => {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            {columnsSequence.map((key) => {
              return (
                tableConfiguration[key].checked && (
                  <StyledTableCell component="th" align="center" key={key}>
                    {tableConfiguration[key].label}
                  </StyledTableCell>
                )
              );
            })}
            {showWriteOffBtn && (
              <StyledTableCell component="th" align="center" />
            )}
            {showDeleteBtn && <StyledTableCell component="th" align="center" />}
          </TableRow>
        </TableHead>

        <TableBody>
          {data.map((reagent) => (
            <StyledTableRow
              key={reagent.uuid}
              alertRow={reagent.amount < REAGENT_MIN_ALERT_AMOUNT}
            >
              {columnsSequence.map((key) => {
                return (
                  tableConfiguration[key].checked && (
                    <StyledTableCell key={key} align="center">
                      {reagent[key]}
                    </StyledTableCell>
                  )
                );
              })}
              {showWriteOffBtn && (
                <StyledTableCell align="center">
                  <IconButton aria-label="write-off" size="large">
                    <RemoveCircleOutlineIcon />
                  </IconButton>
                </StyledTableCell>
              )}
              {showDeleteBtn && (
                <StyledTableCell align="center">
                  <IconButton aria-label="delete" size="large">
                    <DeleteIcon />
                  </IconButton>
                </StyledTableCell>
              )}
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export { ReagentsTable };
