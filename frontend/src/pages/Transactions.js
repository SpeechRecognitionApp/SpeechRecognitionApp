import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import TitleBox from "../components/TitleBox";
import { Box, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useState, useEffect } from "react";
import axios from "axios";

function TransactionsPage() {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const userId = "1"; 
    axios
      .get(`http://127.0.0.1:5000/transactions/user/${userId}`)
      .then((response) => {
        const sortedData = response.data.sort(
          (a, b) => new Date(b.timestamp.$date) - new Date(a.timestamp.$date)
        );
        setTransactions(sortedData);
      })
      .catch((error) => {
        console.error("Failed to fetch contacts:", error);
      });
  }, []);

  const rows = transactions.map((transaction, index) => ({
    id: index,
    date: new Date(transaction.timestamp.$date),
    type: transaction.type,
    receiver: transaction.receiver, 
    description: transaction.description, 
    ref: transaction.reference, 
    amount: transaction.amount, 
  }));


  const columns = [
    {
      field: "id",
      headerName: "ID",
      flex: 1,
      editable: true,
    },
    {
      field: "date",
      headerName: "Date",
      flex: 1,
      editable: true,
      type: "dateTime", 
    },
    {
      field: "description",
      headerName: "Description",
      flex: 2,
      editable: true,
    },
    {
      field: "ref",
      headerName: "Reference",
      flex: 1,
      editable: true,
    },
    {
      field: "type",
      headerName: "Type",
      flex: 1,
      editable: true,
    },
    {
      field: "receiver",
      headerName: "Receiver",
      flex: 1,
      editable: true,
    },
    {
      field: "amount",
      headerName: "Amount",
      type: "number",
      flex: 1,
      editable: true,
    },
   
  ];

  return (
    <Box
      sx={{
        display: "grid",
        backgroundColor: "#F5F5F9",
        gridTemplateRows: "auto 1fr auto",
        height: "100vh",
        flexDirection: "column",
        overflow: "hidden",
      }}
    >
      <Header />
      <Box
        sx={{
          display: "grid", 
          gridTemplateRows: "auto auto auto", 
          gap: "20px", 
          padding: "20px", 
        }}
      >
        <Box
          sx={{
            padding: "20px",
            width: "80%",
            margin: "auto",

            textAlign: "center",
            lineHeight: "2",
          }}
        >
          <TitleBox buttonText="Transactions History" />
        </Box>
        <Box
          sx={{
            height: 400,
            width: "90%",
            bgcolor: "#ffff",
            boxShadow: 3,
            margin: "auto",
          }}
        >
          <DataGrid
            rows={rows}
            columns={columns.map((column) => ({
              ...column,
              disableClickEventBubbling: true,
            }))}
            pageSize={5}
            rowsPerPageOptions={[5, 10, 15]}
            checkboxSelection={false}
            disableSelectionOnClick
          />
        </Box>
      </Box>
      <Footer />
    </Box>
  );
}

export default TransactionsPage;
