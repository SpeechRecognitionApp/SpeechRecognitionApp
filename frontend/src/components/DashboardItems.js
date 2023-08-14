import React from "react";
import { Grid, Button, Box, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import MonetizationOnRoundedIcon from "@mui/icons-material/MonetizationOnRounded";
import MoneyOffRoundedIcon from "@mui/icons-material/MoneyOffRounded";
import SwapHorizontalCircleRoundedIcon from "@mui/icons-material/SwapHorizontalCircleRounded";
import HistoryRoundedIcon from "@mui/icons-material/HistoryRounded";
import SmartToyRoundedIcon from "@mui/icons-material/SmartToyRounded";
import AccountCircleRoundedIcon from "@mui/icons-material/AccountCircleRounded";

function KioskDashboard() {
  const navigate = useNavigate();

  function handleClick() {
    navigate("/transfer");
  }

  function handleClick2() {
    navigate("/withdraw");
  }

  function handleClick3() {
    navigate("/deposit");
  }

  function handleClick4() {
    navigate("/transactions");
  }

  function handleClick5() {
    navigate("/accountmanage");
  }

  function handleClick6() {
    navigate("/chatbot");
  }

  return (
    <Grid container spacing={2} sx={{ mt: 2 }}>
      <Grid item xs={4}>
        <Button
          variant="contained"
          size="large"
          sx={{ height: 200, width: 200, borderRadius: 10, marginTop: 5,bgcolor:'#ffff' }}
          fullWidth
          onClick={handleClick3}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              
            }}
          >
            <MonetizationOnRoundedIcon sx={{ fontSize: 100,color:'black' }} />{" "}
            {/* Adjust this to change the icon size */}
            <Typography variant="body1" sx={{color:'black',fontWeight:'bold'}}>Deposit</Typography>
          </Box>
        </Button>
      </Grid>

      <Grid item xs={4}>
        <Button
          variant="contained"
          size="large"
          sx={{ height: 200, width: 200, borderRadius: 10, marginTop: 5,bgcolor:'#ffff' }}
          fullWidth
          onClick={handleClick2}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <MoneyOffRoundedIcon sx={{ fontSize: 100,color:'black'}} />{" "}
            {/* Adjust this to change the icon size */}
            <Typography variant="body1" sx={{color:'black',fontWeight:'bold'}}>Withdraw</Typography>
          </Box>
        </Button>
      </Grid>

      <Grid item xs={4}>
        <Button
          variant="contained"
          size="large"
          sx={{ height: 200, width: 200, borderRadius: 10, marginTop: 5,bgcolor:'#ffff' }}
          fullWidth
          onClick={handleClick}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <SwapHorizontalCircleRoundedIcon sx={{ fontSize: 100,color:'black' }} />{" "}
            {/* Adjust this to change the icon size */}
            <Typography variant="body1" sx={{color:'black',fontWeight:'bold'}}>Transfer</Typography>
          </Box>
        </Button>
      </Grid>

      <Grid item xs={4}>
        <Button
          variant="contained"
          size="large"
          sx={{ height: 200, width: 200, borderRadius: 10, marginTop: 10,bgcolor:'#ffff' }}
          fullWidth
          onClick={handleClick4}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <HistoryRoundedIcon sx={{ fontSize: 100,color:'black' }} />{" "}
            {/* Adjust this to change the icon size */}
            <Typography variant="body1" sx={{color:'black',fontWeight:'bold'}}>Transaction History</Typography>
          </Box>
        </Button>
      </Grid>

      <Grid item xs={4}>
        <Button
          variant="contained"
          size="large"
          sx={{ height: 200, width: 200, borderRadius: 10, marginTop: 10,bgcolor:'#ffff' }}
          fullWidth
          onClick={handleClick6}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <SmartToyRoundedIcon sx={{ fontSize: 100,color:'black' }} />{" "}
            {/* Adjust this to change the icon size */}
            <Typography variant="body1" sx={{color:'black',fontWeight:'bold'}}>AI Assistant</Typography>
          </Box>
        </Button>
      </Grid>

      <Grid item xs={4}>
        <Button
          variant="contained"
          size="large"
          sx={{ height: 200, width: 200, borderRadius: 10, marginTop: 10,bgcolor:'#ffff' }}
          fullWidth
          onClick={handleClick5}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <AccountCircleRoundedIcon sx={{ fontSize: 100,color:'black' }} />{" "}
            {/* Adjust this to change the icon size */}
            <Typography variant="body1" sx={{color:'black',fontWeight:'bold'}}>Account Management</Typography>
          </Box>
        </Button>
      </Grid>
    </Grid>
  );
}

export default KioskDashboard;
