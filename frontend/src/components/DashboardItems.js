import React from "react";
import { Grid, Button } from "@mui/material";
import DepositIcon from "@mui/icons-material/AttachMoney";
import WithdrawIcon from "@mui/icons-material/MoneyOff";
import TransferIcon from "@mui/icons-material/SwapHoriz";
import HistoryIcon from "@mui/icons-material/History";
import AIIcon from "@mui/icons-material/Assistant";
import AccountIcon from "@mui/icons-material/AccountBox";
import SmartToyIcon from "@mui/icons-material/SmartToy";
import { useNavigate } from "react-router-dom";

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
  return (
    <Grid container spacing={2} sx={{ mt: 2 }}>
      <Grid item xs={4}>
        <Button
          variant="contained"
          size="large"
          sx={{ height: 200, width: 200 }}
          fullWidth
          startIcon={<DepositIcon />}
          onClick={handleClick3}
        >
          Deposit
        </Button>
      </Grid>
      <Grid item xs={4}>
        <Button
          variant="contained"
          size="large"
          sx={{ height: 200, width: 200 }}
          fullWidth
          startIcon={<WithdrawIcon />}
          onClick={handleClick2}
        >
          Withdraw
        </Button>
      </Grid>
      <Grid item xs={4}>
        <Button
          variant="contained"
          size="large"
          sx={{ height: 200, width: 200 }}
          fullWidth
          startIcon={<TransferIcon />}
          onClick={handleClick}
        >
          Transfer
        </Button>
      </Grid>
      <Grid item xs={4}>
        <Button
          variant="contained"
          size="large"
          sx={{ height: 200, width: 200 }}
          fullWidth
          startIcon={<HistoryIcon />}
          onClick={() => console.log("Transaction history clicked")}
        >
          Transaction History
        </Button>
      </Grid>
      <Grid item xs={4}>
        <Button
          variant="contained"
          size="large"
          sx={{ height: 200, width: 200 }}
          fullWidth
          startIcon={<AIIcon />}
          onClick={() => console.log("AI assistant clicked")}
        >
          AI Assistant
        </Button>
      </Grid>
      <Grid item xs={4}>
        <Button
          variant="contained"
          size="large"
          sx={{ height: 200, width: 200 }}
          fullWidth
          startIcon={<AccountIcon />}
          onClick={() => console.log("Account management clicked")}
        >
          Account Management
        </Button>
      </Grid>
    </Grid>
  );
}

export default KioskDashboard;
