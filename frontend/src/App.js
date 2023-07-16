import React from "react";
import "./App.css";
import Dashboard from "./pages/Dashboard";
import TransferPage from "./pages/Transfer";
import WithdrawPage from "./pages/Withdraw";
import { Route, Routes } from "react-router-dom";
import WelcomePage from "./pages/Welcome";
import { Login } from "./pages/Login";
import DepositPage from "./pages/Deposit";
import TransferPage2 from "./pages/Transfer2";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<WelcomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/transfer" element={<TransferPage />} />
        <Route path="/transfer2" element={<TransferPage2 />} />

        <Route path="/withdraw" element={<WithdrawPage />} />
        <Route path="/deposit" element={<DepositPage />} />
      </Routes>
    </div>
  );
}

export default App;
