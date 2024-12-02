// @ts-nocheck
import * as React from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { reagentSorter } from "../../helpers/reagentSorter";

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

const ReagentsTableSorter = ({ data, setData }: any) => {
  const [sortOption, setSortOption] = React.useState(OPTIONS[0].value);

  const handleChange = (event: SelectChangeEvent) => {
    const selectedOption = event.target.value;
    setSortOption(selectedOption);
    const sortedData = reagentSorter([...data], selectedOption);
    setData(sortedData);
  };

  return (
    <FormControl fullWidth size="small">
      <InputLabel id="reagents-sort-label">Сортировка</InputLabel>
      <Select
        labelId="reagents-sort-label"
        id="reagents-sort"
        value={sortOption}
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
