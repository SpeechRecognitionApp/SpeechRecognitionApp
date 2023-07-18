import React from "react";
import { Grid, TextField, Button } from "@mui/material";

function PersonalInformationPage() {
  const textFieldStyle = {
    backgroundColor: "white",
    width: "80%",
    borderRadius: "8px",
  };

  const resetButtonStyle = {
    backgroundColor: "#6B6BFF",
    color: "white",
    marginRight: "10px",
    textTransform: "none",
    borderRadius: "8px",
  };

  const confirmButtonStyle = {
    backgroundColor: "#7AFF6F",
    color: "white",
    textTransform: "none",
    borderRadius: "8px",
  };

  return (
    <Grid container spacing={2} sx={{mt:5,mx:'auto'}}>
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
        <Button style={resetButtonStyle}>Reset changes</Button>
        <Button style={confirmButtonStyle}>Confirm</Button>
      </Grid>
    </Grid>
  );
}

export default PersonalInformationPage;
