import React from "react";
import {
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  Grid,
  TextField,
  InputAdornment,
} from "@mui/material";
import CardSelector from "../components/CardSelector";
import Header from "../components/Header";
import Footer from "../components/Footer";
import CreditCard from "../components/CreditCard";
import { useNavigate } from "react-router-dom";

function TransferPage3() {
  const navigate = useNavigate();

  function handleClick() {
    navigate("/transfer2");
  }
  return (
    <>
      <Header />

      <Box>
        {/* 标题 */}
        <Box sx={{ marginBottom: "20px", marginTop: "80px" }}>
          <div>
            <CreditCard
              cardnumber={"4321123412341234"}
              cardname={"Morgan Bush"}
              carddate={"09/30"}
              cardcvc={"454"}
            />
          </div>
        </Box>

        <Box
          sx={{
            padding: "10px",
            width: "80%",
            margin: "40px auto",
            borderRadius: "10px",
            textAlign: "center",
            lineHeight: "2",
            backgroundColor: "#fff",
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
                Enter Amount to Transfer:
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
              marginTop: "30px",
              textAlign: "center",
              fontSize: 28,
            }}
            onClick={handleClick}
          >
            Confirm
          </Button>
        </Box>
      </Box>

      <Footer />
    </>
  );
}

export default TransferPage3;
