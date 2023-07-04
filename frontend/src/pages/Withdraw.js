import React from "react";
import { Box, Button, TextField, Typography } from "@mui/material";

function WithdrawPage() {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        padding: "16px",
      }}
    >
      <Typography variant="h4" component="h1" gutterBottom>
        Withdraw Money
      </Typography>
      <Box
        component="form"
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "16px",
          width: "100%",
          maxWidth: "400px",
        }}
      >
        <TextField label="Owner's Account Number" variant="outlined" required />

        <TextField label="Amount" variant="outlined" type="number" required />
        <Button variant="contained" type="submit" color="primary">
          Withdraw
        </Button>
      </Box>
    </Box>
  );
}

export default WithdrawPage;
