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
import WithdrawAmount from "./pages/WithdrawAmonut";
import DepositAmount from "./pages/DepositAmount";
import SantanderBranches from "./pages/SantanderBranches";
import TakeCash from "./pages/TakeCash";
import InsertMoney from "./pages/InsertMoney";
import Chatbot from "./pages/Chatbot";
import EnterPin from "./pages/EnterPin";

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
        <Route path="/selectamount" element={<SelectAmount />} />
        <Route path="/withdraw" element={<WithdrawPage />} />
        <Route path="/withdrawamount" element={<WithdrawAmount />} />
        <Route path="/deposit" element={<DepositPage />} />
        <Route path="/depositamount" element={<DepositAmount />} />
        <Route path="/accountmanage" element={<AccountManagePage />} />
        <Route path="/transactions" element={<TransactionsPage />} />
        <Route path="/createnewpayee" element={<CreateNewPayee />} />
        <Route path="/branches" element={<SantanderBranches />} />
        <Route path="/takecash" element={<TakeCash />} />
        <Route path="/insertmoney" element={<InsertMoney />} />
        <Route path="/chatbot" element={<Chatbot />} />
        <Route path="/enterpin" element={<EnterPin />} />
      </Routes>
    </div>
  );
}

export default App;
