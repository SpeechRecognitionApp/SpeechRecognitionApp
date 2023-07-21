import React from "react";
import { Grid, TextField, Button, Box, Container } from "@mui/material";

function PersonalInformationPage() {
  const textFieldStyle = {
    backgroundColor: "white",
    width: "80%",
    borderRadius: "8px",
  };

  return (
    <div style={{ backgroundColor: "#F5F5F9 " }}>
      <Container maxWidth="lg">
        <Box
          sx={{
            justifyContent: "center",
            alignItems: "center",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Grid
            container
            spacing={2}
            sx={{ mt: 5, mx: "auto", height: "55vh" }}
            justify="space-between"
            alignItems="center"
          >
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
                label="Card Number"
                fullWidth
                InputProps={{ style: textFieldStyle }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Account Number"
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
          </Grid>
        </Box>
      </Container>
    </div>
  );
}

export default PersonalInformationPage;
