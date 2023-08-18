import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import axios from "axios";
import TitleBox from "../components/TitleBox";
import { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Box, Radio, Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import io from "socket.io-client";

function SelectContact() {
  const navigate = useNavigate();

  function handleClick() {
    navigate("/selectamount");
  }

  const [contacts, setContacts] = useState([]); // Step 1: State to hold contacts
  const [selectedValue, setSelectedValue] = useState(null);

  useEffect(() => {
    const userId = "1"; // Replace with actual user ID
    axios
      .get(`http://127.0.0.1:5000/contacts/user/${userId}`)
      .then((response) => {
        setContacts(response.data);
      })
      .catch((error) => {
        console.error("Failed to fetch contacts:", error);
      });
  }, []);

  useEffect(() => {
    const socket = io("http://127.0.0.1:5000"); // Replace the URL with your backend URL

    const isNumeric = (str) => {
      return !isNaN(str) && !isNaN(parseFloat(str));
    };

    socket.on("recognized_text", (data) => {
      const text = JSON.parse(data).text;
      // setRecognizedText(text);
      console.log("Number detected:", text);
      if (isNumeric(text)) {
        // If the recognized text is a number, update the state with the numeric value
        setSelectedValue(parseFloat(text));
        console.log("Number detected:", text);
        return; // Exit early as we've handled the numeric case
      }

      if (text && text.includes("select")) {
        // Stop recording when "withdraw" is detected and redirect to the "/withdraw" page
        console.log("Withdraw detected");
        window.location.href = "/selectamount";
      }
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  // Step 2: Format the contacts data for the DataGrid
  const rows = contacts.map((contact, index) => ({
    id: index,
    firstName: contact.first_name,
    lastName: contact.second_name,
    sort_code: contact.sort_code,
    accountNumber: contact.account_number,
  }));
  console.log(rows);

  const columns = [
    {
      field: "id",
      headerName: "ID",
      flex: 1,
      align: "left",
      renderCell: (params) => (
        <Radio
          checked={selectedValue === params.value}
          onChange={() => setSelectedValue(params.value)}
          value={params.value}
          name="select-row-radio-button"
          inputProps={{ "aria-label": `Select row ${params.value}` }}
        />
      ),
    },
    {
      field: "withdraw",
      headerName: "Withdrawals",
      description: "This column has a value getter and is not sortable.",
      sortable: false,
      align: "left",
      flex: 1,
      valueGetter: (params) =>
        `${params.row.firstName || ""} ${params.row.lastName || ""}`,
    },
    {
      field: "sort_code",
      headerName: "Sort Code",
      flex: 1,
      editable: false,
      align: "left",
    },
    {
      field: "accountNumber",
      headerName: "Account Number",
      type: "number",
      flex: 1,
      editable: false,
      align: "left",
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
          display: "grid", // Make this Box a grid container
          gridTemplateRows: "auto auto auto", // Divide the container into three equal rows
          // Divide the container into three equal rows
          gap: "20px", // Add some gap between rows
          padding: "20px", // Add some padding around the Box
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
          <TitleBox buttonText="Choose Contact" />
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
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100%",
          }}
        >
          <Button
            variant="contained"
            sx={{
              backgroundColor: "#fff",
              color: "#000",
              borderRadius: "20px",
              width: "20%",
              padding: "10px",
              textAlign: "center",
              fontSize: 28,
            }}
            onClick={handleClick}
          >
            Select
          </Button>
        </Box>
      </Box>
      <Footer />
    </Box>
  );
}

export default SelectContact;
