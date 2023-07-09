import React from "react";
import { Typography } from "@mui/material";
import Box from '@mui/material/Box';
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import SwapHorizIcon from '@mui/icons-material/SwapHoriz';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import SwapVertIcon from '@mui/icons-material/SwapVert';
import PersonIcon from '@mui/icons-material/Person';

function MenuItem() {
  const navigate = useNavigate();

  function handleClick() {
    navigate("/transfer");
  }

  function handleClick2() {
    navigate("/withdraw");
  }

  return (
    <div>
      <Grid container sx={{ mt: 2, ml: 2, width: '95%', justifyContent: 'center', alignItems: 'center' }}>
        <Grid item xs={12} sx={{ bgcolor: 'white', height: 110, width: '60%', p: 2 }}>
          <Typography variant='body1' sx={{ alignSelf: 'flex-start' }}>Account Balance</Typography>
          <Box sx={{ display: 'flex', borderRadius: '16px', flexDirection: 'column', alignItems: 'flex-start', bgcolor: '#d3d3d3', height: 100 }}>
            <Typography variant='subtitle1' sx={{ alignSelf: 'flex-start', ml: 2, mt: 2 }}>
              Your Balance:
            </Typography>
            <Typography variant='h6' sx={{ alignSelf: 'flex-start', ml: 2 }}>£5,700</Typography>
          </Box>
        </Grid>
        <Grid item xs={12} sx={{ height: 110, width: '60%', borderRadius: '16px', p: 2 }}>
          <Box sx={{ display: 'flex', mt: 2, justifyContent: 'center' }}>
            <Button variant="contained" sx={{ height: 125, width: 125, mt: 2, textTransform: 'none' }} startIcon={<AttachMoneyIcon />}>
              Deposit
            </Button>
            <Button
              variant="contained"
              sx={{ height: 125, width: 125, mt: 2, ml: 2, textTransform: 'none' }}
              onClick={handleClick2}
              startIcon={<SwapVertIcon />}
            >
              Withdraw
            </Button>
            <Button
              variant="contained"
              sx={{ height: 125, width: 125, mt: 2, ml: 2, textTransform: 'none' }}
              onClick={handleClick}
              startIcon={<SwapHorizIcon />}
            >
              Transfer
            </Button>
            <Button variant="contained" sx={{ height: 125, width: 125, mt: 2, ml: 2, textTransform: 'none' }} startIcon={<PersonIcon />}>
              Account Management
            </Button>
          </Box>
        </Grid>
      </Grid>
    </div>
  );
}

export default MenuItem;
