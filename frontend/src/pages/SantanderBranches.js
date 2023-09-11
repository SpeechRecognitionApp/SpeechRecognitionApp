import React, { useState, useEffect } from "react";
import axios from "axios";
import { DataGrid } from "@mui/x-data-grid";
import { Box, Typography } from "@mui/material";
import Header from "../components/Header";
import Footer from "../components/Footer";
import TitleBox from "../components/TitleBox";

const SantanderBranches = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [branches, setBranches] = useState([]);
  const [rows, setRows] = useState([]);

  useEffect(() => {
    const getBranches = async () => {
      try {
        const response = await axios.get(
          "http://127.0.0.1:5000/proxy/sanuk/external/open-banking/v2.2/branches"
        );

        setData(response.data.data);
      } catch (err) {
        setError(err.message);
      }
    };

    getBranches();
  }, []);

  useEffect(() => {
    const newRows = [];

    data.forEach((branch, index) => {
      branch.Brand.forEach((brand) => {
        brand.Branch.forEach((branchDetail) => {
          newRows.push({
            id: newRows.length,
            brandName: brand.BrandName,
            branchName: branchDetail.Name,
            type: branchDetail.Type,
            phone: branchDetail.ContactInfo[0].ContactContent,
            address: `${branchDetail.PostalAddress.StreetName}, ${branchDetail.PostalAddress.TownName}`,
          });
        });
      });
    });
    setRows(newRows);
  }, [data]);

  const columns = [
    { field: "brandName", headerName: "Brand Name", flex: 1 },
    { field: "branchName", headerName: "Branch Name", flex: 1 },
    { field: "type", headerName: "Type", flex: 1 },
    { field: "phone", headerName: "Phone", flex: 1 },
    { field: "address", headerName: "Address", flex: 2 },
  ];

  if (error) {
    return <div>Error: {error}</div>;
  }

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
          <TitleBox buttonText="Branches" />
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
            columns={columns}
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
};

export default SantanderBranches;
