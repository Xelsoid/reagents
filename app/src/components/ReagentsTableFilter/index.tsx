// @ts-nocheck
import React from "react";
import { FormGroup, FormControlLabel, Checkbox } from "@mui/material";
import "../../style/home_page.css";

const filterFields = [
  { id: 0, label: "Id", defaultChecked: true },
  { id: 1, label: "Наименование", defaultChecked: true },
  { id: 2, label: "Количество", defaultChecked: true },
  { id: 3, label: "Единицы измерения", defaultChecked: true },
  { id: 4, label: "Номер серии", defaultChecked: false },
  { id: 5, label: "Поставщик", defaultChecked: false },
  { id: 6, label: "Условия хранения", defaultChecked: true },
  { id: 7, label: "Полка хранения реактива", defaultChecked: true },
];

const ReagentsTableFilter = () => {
  return (
    <div className="checkbox_wraper">
      <p>Выберите отображаемые столбцы</p>
      <FormGroup>
        {filterFields.map(({ defaultChecked, label, id }) => (
          <FormControlLabel
            key={id}
            control={<Checkbox defaultChecked={defaultChecked} />}
            label={label}
          />
        ))}
      </FormGroup>
    </div>
  );
};

export { ReagentsTableFilter };
