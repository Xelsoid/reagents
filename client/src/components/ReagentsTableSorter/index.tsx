// @ts-nocheck
import * as React from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";

const OPTIONS = [
  {
    label: "По возрастанию ID",
    value: "id_asc",
  },
  {
    label: "По убыванию ID",
    value: "id_desc",
  },
  {
    label: "По алфавиту А-Я",
    value: "alphabet_asc",
  },
  {
    label: "По алфавиту Я-А",
    value: "alphabet_desc",
  },
];

const ReagentsTableSorter = ({ sorting, setSorting }: any) => {
  const handleChange = (event: SelectChangeEvent) => {
    setSorting(event.target.value);
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
