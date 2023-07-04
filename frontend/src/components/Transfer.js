import React from 'react'
import { Box, Button, TextField, Typography } from '@mui/material';

function TransferPage(){
    return (
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '100vh',
            padding: '16px',
          }}
        >
          <Typography variant="h4" component="h1" gutterBottom>
            Transfer Money
          </Typography>
          <Box
            component="form"
            sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: '16px',
              width: '100%',
              maxWidth: '400px',
            }}
          >
            <TextField label="Sender's Account Number" variant="outlined" required />
            <TextField label="Recipient's Account Number" variant="outlined" required />
            <TextField label="Amount" variant="outlined" type="number" required />
            <Button variant="contained" type="submit" color="primary">
              Transfer
            </Button>
          </Box>
        </Box>
      );
    }
    

export default TransferPage;