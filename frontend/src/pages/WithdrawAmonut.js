import React from "react";
import {
  Box,
  Typography,
  Button,
  Grid,
  TextField,
  InputAdornment,
} from "@mui/material";
import Header from "../components/Header";
import Footer from "../components/Footer";
import CreditCard from "../components/CreditCard";
import { useNavigate } from "react-router-dom";

function WithdrawAmount() {
  const navigate = useNavigate();

  function handleClick() {
    navigate("/insertmoney");
  }

  // Mock data for card balance
  const cardBalance = "£500.00";

  return (
    <Box
      sx={{
        display: "flex",
        backgroundColor: "#F5F5F9",
        flexDirection: "column",
        // gridTemplateRows: "auto 1fr auto",
        height: "100vh",
        overflow: "hidden",
      }}
    >
      <Header />

      <Box
        sx={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "40px",
          overflowY: "auto", // Add vertical scroll if content overflows
        }}
      >
        {/* 标题 */}
        <Box
          sx={{
            marginBottom: "20px",
            mt: "auto",
          }}
        >
          <CreditCard
            cardnumber={"4321123412341234"}
            cardname={"Morgan Bush"}
            carddate={"09/30"}
            cardcvc={"454"}
          />
          {/* Display Card Balance */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              padding: "20px 0", // Add some vertical padding
            }}
          >
            <Typography variant="h6">
              Current Card Balance: {cardBalance}
            </Typography>
          </Box>
        </Box>

        <Box
          sx={{
            padding: "10px",
            width: "80%",
            margin: "auto",
            borderRadius: "10px",
            textAlign: "center",
            lineHeight: "2",
            backgroundColor: "#F5F5F9",
          }}
        >
          <Grid
            container
            alignItems="center"
            justifyContent="center"
            spacing={2}
          >
            <Grid item>
              <Typography variant="h6" sx={{ marginRight: "120px" }}>
                Enter Amount to Withdraw:
              </Typography>
            </Grid>
            <Grid item>
              <TextField
                variant="outlined"
                type="number"
                sx={{ maxWidth: 200 }} // Limit the width of the TextField
                InputProps={{
                  inputProps: {
                    min: 0,
                  },
                  startAdornment: (
                    <InputAdornment position="start">£</InputAdornment>
                  ),
                  style: { backgroundColor: "white" },
                }}
              />
            </Grid>
          </Grid>
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
              marginBottom: "auto",
              mt: "auto",
            }}
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

export default WithdrawAmount;
