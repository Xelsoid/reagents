import React from "react";
import { Route, Routes } from "react-router-dom";
import { LoginPage } from "./page/LoginPage";
import { HomePage } from "./page/HomePage";
import DataTable from "./page/DataTable";

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/main" element={<HomePage />} />
      <Route path="/table" element={<DataTable />} />
    </Routes>
  );
};

export { AppRouter };
