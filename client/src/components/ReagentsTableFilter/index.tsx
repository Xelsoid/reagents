import React from 'react';
import { FormGroup, FormControlLabel, Checkbox } from '@mui/material';
import '../../style/home_page.css';
import { ITableConfiguration } from '../../page/HomePage';

interface IReagentsTableFilterProps {
  filterSequence: (keyof ITableConfiguration)[];
  tableConfiguration: ITableConfiguration;
  setTableConfiguration: (tc: ITableConfiguration) => void;
}

const ReagentsTableFilter: React.FC<IReagentsTableFilterProps> = ({
  filterSequence,
  tableConfiguration,
  setTableConfiguration,
}) => {
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
