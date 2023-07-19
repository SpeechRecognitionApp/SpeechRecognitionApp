import React from "react";
import "./App.css";
import Dashboard from "./pages/Dashboard";
import TransferPage from "./pages/Transfer";
import WithdrawPage from "./pages/Withdraw";
import { Route, Routes } from "react-router-dom";
import WelcomePage from "./pages/Welcome";
import { Login } from "./pages/Login";
import DepositPage from "./pages/Deposit";
import AccountManagePage from "./pages/AccountManagement";
import SelectContact from "./pages/SelectContact";
import SelectPayee from "./pages/SelectPayee";
import SelectAmount from "./pages/SelectAmount";
import TransactionsPage from "./pages/Transactions";
import CreateNewPayee from "./pages/CreateNewPayee";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<WelcomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/transfer" element={<TransferPage />} />
        <Route path="/selectpayee" element={<SelectPayee />} />
        <Route path="/selectcontact" element={<SelectContact />} />
        <Route path="/withdraw" element={<WithdrawPage />} />
        <Route path="/transactions" element={<TransactionsPage />} />
        <Route path="/deposit" element={<DepositPage />} />
        <Route path="/selectamount" element={<SelectAmount />} />
        <Route path="/accountmanage" element={<AccountManagePage />} />
        <Route path="/selectcontact" element={<SelectContact />} />
        <Route path="/createnewpayee" element={<CreateNewPayee />} />
      </Routes>
    </div>
  );
}

export default App;
