import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import Paper from "@mui/material/Paper";

const columns = [
  { field: "id", headerName: "ID", width: 140 },
  { field: "name", headerName: "Наименование", width: 250 },
  {
    field: "amount",
    headerName: "Количество",
    type: "number",
    width: 70,
    editable: true,
  },
  { field: "unit", headerName: "Единица измерения", width: 70 },
  { field: "producer", headerName: "Производитель", width: 130 },
  { field: "supplier", headerName: "Поставщик", width: 130 },
  { field: "storageConditions", headerName: "Условия хранения", width: 130 },
  { field: "storagePlace", headerName: "Полка хранения реактива", width: 70 },
  { field: "writeOff", headerName: "Списание", width: 130 },
];

// const paginationModel = { page: 0, pageSize: 15 };

export default function DataTable() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async (url) => {
      const response = await fetch(url);
      if (response.ok) {
        const json = await response.json();
        setData(json?.data?.reagents);
        return;
      }
      alert(`Ошибка HTTP: ${response.status}`);
    };

    fetchData("/api/getReagents");
  }, [setData]);
  console.log(data);

  return (
    <Paper sx={{ height: 800, width: "100%" }}>
      <DataGrid
        rows={data}
        columns={columns}
        // initialState={{ pagination: { paginationModel } }}
        // pageSizeOptions={[5, 10]}
        // checkboxSelection
        sx={{ border: 0 }}
      />
    </Paper>
  );
}
