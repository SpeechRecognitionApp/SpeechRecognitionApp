import React, { useEffect } from "react";
import axios from "axios";
import { Box, Typography, Button, Grid } from "@mui/material";
import { useNavigate } from "react-router-dom";

function InsertCard() {
  const imgSrc = "/insert-card.png";
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .delete("http://127.0.0.1:5000/logout")
      .then((response) => {
      })
      .catch((error) => {
        console.error("Failed to log out:", error);
      });
  }, []);

  const handleConfirm = () => {
    axios
      .post("http://127.0.0.1:5000/insert_card", {
        card_id: "1",
        user_id: "1",
      })
      .then((response) => {
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
