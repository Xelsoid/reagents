// @ts-nocheck
import React from "react";
import { FormGroup, FormControlLabel, Checkbox } from "@mui/material";
import "../../style/home_page.css";

const ReagentsTableFilter = ({
  filterSequence,
  tableConfiguration,
  setTableConfiguration,
}: any) => {
  return (
    <FormGroup row>
      {filterSequence.map((key) => {
        const { label, checked } = tableConfiguration[key];
        const handleOnChange = () => {
          setTableConfiguration({
            ...tableConfiguration,
            [key]: { ...tableConfiguration[key], checked: !checked },
          });
        };
        return (
          <FormControlLabel
            control={<Checkbox checked={checked} onChange={handleOnChange} />}
            label={label}
            key={key}
          />
        );
      })}
    </FormGroup>
  );
};

export { ReagentsTableFilter };
