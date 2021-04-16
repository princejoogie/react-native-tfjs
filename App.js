import React from "react";
import Home from "./src/Home";
import { DataProvider } from "./src/DataContext";

export default function App() {
  return (
    <DataProvider>
      <Home />
    </DataProvider>
  );
}
