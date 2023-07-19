import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import TitleBox from "../components/TitleBox";
import { useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Box, Radio, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

function SelectContact() {
  const navigate = useNavigate();

  function handleClick() {
    navigate("/selectamount");
  }

  const [selectedValue, setSelectedValue] = useState(null);

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
      field: "cardNumber",
      headerName: "Card Number",
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

  const rows = [
    { id: 1, lastName: "Snow", firstName: "Jon", age: 35 },
    { id: 2, lastName: "Lannister", firstName: "Cersei", age: 42 },
    { id: 3, lastName: "Lannister", firstName: "Jaime", age: 45 },
    { id: 4, lastName: "Stark", firstName: "Arya", age: 16 },
    { id: 5, lastName: "Targaryen", firstName: "Daenerys", age: null },
    { id: 6, lastName: "Melisandre", firstName: null, age: 150 },
    { id: 7, lastName: "Clifford", firstName: "Ferrara", age: 44 },
    { id: 8, lastName: "Frances", firstName: "Rossini", age: 36 },
    { id: 9, lastName: "Roxie", firstName: "Harvey", age: 65 },
  ];
  return (
    <div style={{ backgroundColor: "#F5F5F9 " }}>
      <Header />
      <TitleBox buttonText="Select A Payee" />
      <Box
        sx={{
          height: 400,
          width: "90%",
          mx: "auto",
          mt: 3,
          bgcolor: "#ffff",
          boxShadow: 3,
          mb: 2,
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
      <Footer />
    </div>
  );
}

export default SelectContact;
