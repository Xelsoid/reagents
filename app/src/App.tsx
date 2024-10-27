import React from "react";
import { HashRouter } from "react-router-dom";
import { AppRouter } from "./AppRouter";

function App() {
  return (
    <HashRouter>
      <AppRouter />
    </HashRouter>
  );
}

export { App };
