import React from "react";
import { Route, Routes } from "react-router-dom";
import { Main } from "./page/Main";

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Main />} />
    </Routes>
  );
};

export { AppRouter };
