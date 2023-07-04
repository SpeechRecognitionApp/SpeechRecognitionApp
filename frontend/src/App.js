import React from "react";
import "./App.css";
import Dashboard from "./pages/Dashboard";
import TransferPage from "./pages/Transfer";
import WithdrawPage from "./pages/Withdraw";
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/transfer" element={<TransferPage />} />
        <Route path="/withdraw" element={<WithdrawPage />} />
      </Routes>
    </div>
  );
}

export default App;
