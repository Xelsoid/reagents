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
import { IReagent } from '../../constants';
import { ITableConfiguration } from '../../page/HomePage';

interface IReagentTable {
  data: IReagent[] | null;
  columnsSequence: (keyof ITableConfiguration)[];
  tableConfiguration: any;
  handleReagentDelete: (reagent: IReagent) => void;
  handleChangeAmount: (reagent: IReagent) => void;
  showDeleteBtn?: boolean;
}

const ReagentsTable: React.FC<IReagentTable> = ({
  data,
  columnsSequence,
  tableConfiguration,
  handleReagentDelete,
  handleChangeAmount,
  showDeleteBtn = false,
}) => {
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
          {!data && <SkeletonTableBody />}

          {data?.map((reagent) => {
            const handleDelete = () => {
              handleReagentDelete(reagent);
            };

            const handleAmount = () => {
              handleChangeAmount(reagent);
            };

            return (
              // @ts-expect-error: Can't fix this issue regarding passing custom props
              // https://github.com/emotion-js/emotion/issues/2193
              <StyledTableRow key={reagent.uuid} alertRow={reagent.amount < reagent.minAmount}>
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
