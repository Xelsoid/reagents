// @ts-nocheck
import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import { StyledTableCell, StyledTableRow } from './parts';
import { SkeletonTableBody } from './SkeletonTableBody';

const REAGENT_MIN_ALERT_AMOUNT = 100;

const ReagentsTable = ({
  data,
  columnsSequence,
  tableConfiguration,
  handleReagentDelete,
  handleChangeAmount,
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
            <StyledTableCell component="th" align="center" />
            {showDeleteBtn && <StyledTableCell component="th" align="center" />}
          </TableRow>
        </TableHead>

        <TableBody>
          {data.length < 1 && <SkeletonTableBody />}

          {data?.map((reagent) => {
            const handleDelete = () => {
              handleReagentDelete(reagent);
            };

            const handleAmount = () => {
              handleChangeAmount(reagent);
            };

            return (
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
                <StyledTableCell align="center">
                  <IconButton
                    aria-label="write-off"
                    size="large"
                    title="Списать"
                    onClick={handleAmount}
                  >
                    <RemoveCircleOutlineIcon />
                  </IconButton>
                </StyledTableCell>
                {showDeleteBtn && (
                  <StyledTableCell align="center">
                    <IconButton
                      aria-label="delete"
                      size="large"
                      title="Удалить"
                      onClick={handleDelete}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </StyledTableCell>
                )}
              </StyledTableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export { ReagentsTable };
