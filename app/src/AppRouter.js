import React from "react";
import { Route, Routes } from "react-router-dom";
import { LoginPage } from "./page/LoginPage";
import { HomePage } from "./page/HomePage";

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/main" element={<HomePage />} />
    </Routes>
  );
};

export { AppRouter };
