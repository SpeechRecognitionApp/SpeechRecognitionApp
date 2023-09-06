import React, { useEffect } from "react";
import axios from "axios";
import { Box, Typography, Button, Grid } from "@mui/material";
import { useNavigate } from "react-router-dom";

function InsertCard() {
  // Image source (replace this with the actual image you have)
  const imgSrc = "/insert-card.png";
  const navigate = useNavigate();

  // On component mount, trigger logout API
  useEffect(() => {
    axios
      .delete("http://127.0.0.1:5000/logout")
      .then((response) => {
        console.log("Logged out successfully");
      })
      .catch((error) => {
        console.error("Failed to log out:", error);
      });
  }, []);

  // Handle Confirm button click
  const handleConfirm = () => {
    axios
      .post("http://127.0.0.1:5000/insert_card", {
        card_id: "1",
        user_id: "1",
      })
      .then((response) => {
        console.log("Card inserted successfully");
        navigate("/");
      })
      .catch((error) => {
        console.error("Failed to insert card:", error);
      });
  };

  return (
    <Grid container direction="column" style={{ height: "100vh" }}>
      <Grid
        item
        container
        justifyContent="center"
        alignItems="center"
        style={{ flex: 1 }}
      >
        {/* Title */}
        <Typography variant="h4" gutterBottom>
          Please Insert Your Card
        </Typography>
      </Grid>
      <Grid
        item
        container
        justifyContent="center"
        alignItems="center"
        style={{ flex: 1 }}
      >
        {/* Image */}
        <Box>
          <img src={imgSrc} alt="Insert Card" />
        </Box>
      </Grid>
      <Grid
        item
        container
        justifyContent="center"
        alignItems="center"
        style={{ flex: 1 }}
      >
        {/* Confirm Button */}

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
          onClick={handleConfirm}
        >
          Confirm
        </Button>
      </Grid>
    </Grid>
  );
}

export default InsertCard;
