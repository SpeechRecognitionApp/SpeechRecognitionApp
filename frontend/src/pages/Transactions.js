import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import TitleBox from "../components/TitleBox";
import TransactionHistory from "../components/TransactionTable";

function TransactionsPage() {
  return (
    <div style={{ backgroundColor: "#F5F5F9 " }}>
      <Header />
      <TitleBox buttonText="Transaction History" />
      <TransactionHistory />
      <Footer />
    </div>
  );
}

export default TransactionsPage;
