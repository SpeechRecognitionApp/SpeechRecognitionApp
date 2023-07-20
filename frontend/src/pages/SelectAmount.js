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

function SelectAmount() {
  const navigate = useNavigate();

  function handleClick() {
    navigate("/dashboard");
  }
  return (
    <>
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
          {/* 标题 */}
          <Box sx={{ marginBottom: "auto", marginTop: "auto" }}>
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
              padding: "10px 20px 30px 200px",
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
                  Transfer To:
                </Typography>
              </Grid>
              <Grid item>
                <Typography variant="h6" sx={{ marginRight: "120px" }}>
                  Money D Luffy
                </Typography>
              </Grid>
            </Grid>
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
                margin: "auto",
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
      </Box>
    </>
  );
}

export default SelectAmount;
