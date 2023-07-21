import React from "react";
import { Grid, TextField, Button, Box, Container } from "@mui/material";

function AccountManageButtons() {
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
        <Grid item xs={12}>
        <Grid container justifyContent="center" alignItems="center">
          <Grid item>
            <Button style={resetButtonStyle}>Reset Changes</Button>
          </Grid>
          <Grid item>
            <Button style={confirmButtonStyle}>Confirm</Button>
          </Grid>
        </Grid>
      </Grid>
    );
}

export default AccountManageButtons;