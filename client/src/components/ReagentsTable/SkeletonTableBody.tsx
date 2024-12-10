// @ts-nocheck
import * as React from 'react';
import Skeleton from '@mui/joy/Skeleton';
import { StyledTableCell, StyledTableRow } from './parts';
const TABLE_SIZE = {
  X: 7,
  Y: 20,
};

const SkeletonTableBody = () => {
  return Array.from({ length: TABLE_SIZE.Y }).map((elem, index) => {
    return (
      <StyledTableRow key={index}>
        {Array.from({ length: TABLE_SIZE.X }).map((elem, index) => {
          return (
            <StyledTableCell align="center" key={index}>
              <Skeleton variant="text" width="100%" />
            </StyledTableCell>
          );
        })}
      </StyledTableRow>
    );
  });
};

export { SkeletonTableBody };
