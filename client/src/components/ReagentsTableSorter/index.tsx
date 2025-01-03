import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { SORTING_METHODS } from '../../constants';

const OPTIONS = [
  {
    label: 'По возрастанию ID',
    value: SORTING_METHODS.ID_ASC,
  },
  {
    label: 'По убыванию ID',
    value: SORTING_METHODS.ID_DESC,
  },
  {
    label: 'По алфавиту А-Я',
    value: SORTING_METHODS.ALPHABET_ASC,
  },
  {
    label: 'По алфавиту Я-А',
    value: SORTING_METHODS.ALPHABET_DESC,
  },
];

const ReagentsTableSorter = ({
  sorting,
  setSorting,
}: {
  sorting: SORTING_METHODS;
  setSorting: (a: SORTING_METHODS) => void;
}) => {
  const handleChange = (event: SelectChangeEvent) => {
    const value = event.target.value as SORTING_METHODS;
    setSorting(value);
  };

  return (
    <FormControl fullWidth size="small">
      <InputLabel id="reagents-sort-label">Сортировка</InputLabel>
      <Select
        labelId="reagents-sort-label"
        id="reagents-sort"
        value={sorting}
        label="Сортировка"
        onChange={handleChange}
      >
        {OPTIONS.map(({ label, value }) => {
          return (
            <MenuItem value={value} key={value}>
              {label}
            </MenuItem>
          );
        })}
      </Select>
    </FormControl>
  );
};

export { ReagentsTableSorter };
