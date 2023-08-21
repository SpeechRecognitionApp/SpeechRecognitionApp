import React from "react";
import {
  Box,
  Typography,
  Button,
  Grid,
  TextField,
  InputAdornment,
} from "@mui/material";
import Header from "../components/Header";
import Footer from "../components/Footer";
import CreditCard from "../components/CreditCard";
import { useNavigate } from "react-router-dom";
import { useState,useEffect } from "react";
import WithdrawAudioRecorder from "../AudioRecorders/WithdrawAudioRecorder";
import axios from "axios";

function WithdrawAmount() {
  const navigate = useNavigate();

  
  const [detectedNumber, setDetectedNumber] = useState(null); // New state for detected number
  const [manualInput, setManualInput] = useState("");
  const [card, setCard] = useState(null);
  const [cardBalance, setCardBalance] = useState(null);
  const cardNumber = "1252452125167000";

  

  useEffect(() => {
    const fetchCardData = async () => {
      try {
        const response = await axios.get(
          `http://127.0.0.1:5000/card/${cardNumber}`
        );
        setCard(response.data);
        setCardBalance(response.data.balance);
      } catch (error) {
        if (error.response) {
          console.error("Card not found", error.response.data);
        } else if (error.request) {
          console.error("No response was received", error.request);
        } else {
          console.error("Error", error.message);
        }
      }
    };

    fetchCardData();
  }, [cardNumber]);

  const handleClick = async () => {
    const withdrawAmount = manualInput || detectedNumber;
    
    try {
      const requestBody = {
        card_number: cardNumber,
        withdraw_amount: withdrawAmount,
      };

      await axios.post("http://127.0.0.1:5000/withdraw", requestBody);

      // Navigate to the next page after successful deposit
      navigate("/takecash");
    } catch (error) {
      console.error("Error depositing amount:", error);
    }
  };

  function formatDate(timestamp) {
    const date = new Date(timestamp);
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear().toString().substr(-2);
    return `${month}/${year}`;
  }

  return (
    <Box
      sx={{
        display: "flex",
        backgroundColor: "#F5F5F9",
        flexDirection: "column",
        // gridTemplateRows: "auto 1fr auto",
        height: "100vh",
        overflow: "hidden",
      }}
    >
      <Header />

      <Box
        sx={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "40px",
          overflowY: "auto", // Add vertical scroll if content overflows
        }}
      >
        {/* 标题 */}
        <Box
          sx={{
            marginBottom: "20px",
            mt: "auto",
          }}
        >
            <div>
            {card ? (
              <CreditCard
                cardnumber={card.card_number}
                cardname={"Morgan Bush"}
                carddate={formatDate(card.expiry_date.$date)}
                cardcvc={card.cvc}
              />
            ) : (
              <Typography variant="h6" color="textSecondary">
                Loading Card Information...
              </Typography>
            )}
          </div>
          {/* Display Card Balance */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              padding: "20px 0", // Add some vertical padding
            }}
          >
            <Typography variant="h6">
            Current Card Balance: {cardBalance ? `£${cardBalance}` : "Loading..."}
            </Typography>
          </Box>
        </Box>

        <Box
          sx={{
            padding: "10px",
            width: "80%",
            margin: "auto",
            borderRadius: "10px",
            textAlign: "center",
            lineHeight: "2",
            backgroundColor: "#F5F5F9",
          }}
        >
          <Grid
            container
            alignItems="center"
            justifyContent="center"
            spacing={2}
          >
            <Grid item>
              <Typography variant="h6" sx={{ marginRight: "120px" }}>
                Enter Amount to Withdraw:
              </Typography>
            </Grid>
            <Grid item>
              <TextField
                variant="outlined"
                type="number"
                value={manualInput || detectedNumber || ""} // Use manualInput or detectedNumber
                onChange={(e) => setManualInput(e.target.value)} // Update manualInput state
                sx={{ maxWidth: 200 }} // Limit the width of the TextField
                InputProps={{
                  inputProps: {
                    min: 0,
                  },
                  startAdornment: (
                    <InputAdornment position="start">£</InputAdornment>
                  ),
                  style: { backgroundColor: "white" },
                }}
              />
            </Grid>
          </Grid>
        </Box>

        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100%",
          }}
        >
          <Button
            variant="contained"
            sx={{
              backgroundColor: "#fff",
              color: "#000",
              borderRadius: "20px",
              width: "20%",
              padding: "10px",
              textAlign: "center",
              fontSize: 28,
              marginBottom: "auto",
              mt: "auto",
            }}
            onClick={handleClick}
          >
            Confirm
          </Button>
        </Box>
      </Box>
      <WithdrawAudioRecorder  detectedNumber={detectedNumber} // Pass detectedNumber as prop
       setDetectedNumber={setDetectedNumber} />
      <Footer />
    </Box>
  );
}

export default WithdrawAmount;
