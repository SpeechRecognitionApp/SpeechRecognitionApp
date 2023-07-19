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
    <div style={{ backgroundColor: "#F5F5F9 " }}>
      <Header />
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
            sx={{ mt: 5, mx: "auto", height: "55vh" }}
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
                label="Surname"
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
            <Grid item xs={12}>
              <Button style={confirmButtonStyle} onClick={handleClick}>
                Confirm
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Container>
      <Footer />
    </div>
  );
}

export default CreateNewPayee;
