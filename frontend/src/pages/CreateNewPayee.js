import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import TitleBox from "../components/TitleBox";
import { Grid, Box, TextField, Button, Container } from "@mui/material";
import { useNavigate } from "react-router-dom";

function CreateNewPayee() {
  const navigate = useNavigate();

  function handleClick() {
    navigate("/selectamount");
  }
  const textFieldStyle = {
    backgroundColor: "white",
    // width: "80%",
    borderRadius: "8px",
  };

  const resetButtonStyle = {
    backgroundColor: "#6B6BFF",
    color: "white",
    marginRight: "10px",
    textTransform: "none",
    borderRadius: "8px",
    width: 150,
  };

  const confirmButtonStyle = {
    backgroundColor: "#7AFF6F",
    color: "white",
    textTransform: "none",
    borderRadius: "8px",
    width: 150,
  };

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
          gap: "20px", // Add some gap between rows
          padding: "20px", // Add some padding around the Box
        }}
      >
        <TitleBox buttonText="Create New Payee" />
        <Container maxWidth="lg">
          <Box
            sx={{
              justifyContent: "center",
              alignItems: "center",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Grid
              container
              spacing={2}
              // sx={{ mt: 5, mx: "auto", height: "55vh" }}
              justify="space-between"
              alignItems="center"
            >
              <Grid item xs={12} sm={6}>
                <TextField
                  label="First Name"
                  fullWidth
                  InputProps={{ style: textFieldStyle }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Sort Code"
                  fullWidth
                  InputProps={{ style: textFieldStyle }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Card Number"
                  fullWidth
                  InputProps={{ style: textFieldStyle }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Account Number"
                  fullWidth
                  InputProps={{ style: textFieldStyle }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Email Address"
                  fullWidth
                  InputProps={{ style: textFieldStyle }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Street Line"
                  fullWidth
                  InputProps={{ style: textFieldStyle }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="House Name"
                  fullWidth
                  InputProps={{ style: textFieldStyle }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Postcode"
                  fullWidth
                  InputProps={{ style: textFieldStyle }}
                />
              </Grid>
            </Grid>
          </Box>
        </Container>
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
              marginBottom: "auto",
            }}
            style={confirmButtonStyle}
            onClick={handleClick}
          >
            Confirm
          </Button>
        </Box>
      </Box>
      <Footer />
    </Box>
  );
}

export default CreateNewPayee;
