import React from "react";
import { Route, Routes } from "react-router-dom";
import { HomePage } from "./page/HomePage";

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
    </Routes>
  );
};

export { AppRouter };
