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
import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import swal from "sweetalert";
import io from "socket.io-client";
import TransferAudioRecorder from "../AudioRecorders/TransferAudioRecorder";

function SelectAmount() {
  const navigate = useNavigate();
  const [card, setCard] = useState(null);
  const [detectedNumber, setDetectedNumber] = useState(null); 
  const [manualInput, setManualInput] = useState("");
  const location = useLocation();
  const contactName = location.state.contactName;
  const cardNumber = "1252452125167000"; 
  

  async function handleWithdraw(onSuccess) {
    try {
      const response = await axios.post("http://127.0.0.1:5000/withdraw", {
        card_number: cardNumber,
        withdraw_amount: parseFloat(transferAmount),
      });

      if (response.status === 200) {
        handleCreateTransaction();
        swal("Success", "The Money Has been Transfered", "success");
        setTimeout(() => {
          swal.close();
        }, 3000);
        onSuccess();
        console.error("Error in withdrawal:", response.data.message);
      }
    } catch (error) {
      if (error.response && error.response.status === 400) {
        swal("Oops!", "Insufficient balance. Withdrawal failed.", "error");
        setTimeout(() => {
          swal.close();
        }, 3000);
      } else {
        console.error("Failed to withdraw:", error);
      }
    }
  }

  async function handleCreateTransaction() {
    try {
      const response = await axios.post("http://127.0.0.1:5000/transaction", {
        user_id: "1",
        amount: parseFloat(transferAmount),
        type: "transfer",
        receiver: contactName,
        // Add other fields if necessary
      });

      if (response.status === 201) {
      } else {
        // Handle error
        console.error("Error in transaction creation:", response.data.message);
      }
    } catch (error) {
      console.error("Failed to create transaction:", error);
    }
  }

  useEffect(() => {
    const fetchCardData = async () => {
      try {
        const response = await axios.get(
          `http://127.0.0.1:5000/card/${cardNumber}`
        );
        setCard(response.data);
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

  const transferAmount = manualInput || detectedNumber;

  function formatDate(timestamp) {
    const date = new Date(timestamp);
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear().toString().substr(-2);
    return `${month}/${year}`;
  }
  const handleClick = async () => {

    if (transferAmount <= 0) {
      swal("Oops!", "Transfer amount should be greater than 0", "error");
      setTimeout(() => {
        swal.close();
      }, 2000);
      return;
    }

    handleWithdraw(() => {
      navigate("/dashboard");
    });
  }

  return (
    <>
      <Box
        sx={{
          display: "grid",
          backgroundColor: "#F5F5F9",
          gridTemplateRows: "auto 1fr auto",
          height: "100vh",
          flexDirection: "column",
          overflow: "hidden",
        }}
      >
        <Header />

        <Box
          sx={{
            display: "grid", 
            gridTemplateRows: "auto auto auto", 
            gap: "20px",
            padding: "20px", 
          }}
        >
          <Box sx={{ margin: "auto" }}>
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
            {card ? (
              <Typography variant="h6">
                Current Card Balance: £{card.balance}
              </Typography>
            ) : (
              <Typography variant="h6" color="textSecondary">
                Loading Card Information...
              </Typography>
            )}
          </Box>
          <Box
            sx={{
              padding: "10px 20px 30px 200px",
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
                  Transfer To:
                </Typography>
              </Grid>
              <Grid item>
                <Typography variant="h6" sx={{ marginRight: "120px" }}>
                  {contactName}
                </Typography>
              </Grid>
            </Grid>
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
                  Enter Amount to Transfer:
                </Typography>
              </Grid>
              <Grid item>
                <TextField
                  variant="outlined"
                  type="number"
                  value={manualInput || detectedNumber || ""} 
                  onChange={(e) => setManualInput(e.target.value)}
                  sx={{ maxWidth: 200 }} 
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
                margin: "auto",
                textAlign: "center",
                fontSize: 28,
              }}
              onClick={handleClick}
            >
              Confirm
            </Button>
          </Box>
        </Box>
        <TransferAudioRecorder detectedNumber={detectedNumber} 
       setDetectedNumber={setDetectedNumber} handleClick={handleClick} />
        <Footer />
      </Box>
    </>
  );
}

export default SelectAmount;
