import React from "react";
import { Box, Typography, Button, Card, CardContent } from "@mui/material";
import Header from "../components/Header";
import Footer from "../components/Footer";
import CreditCard from "../components/CreditCard";
import GroupRoundedIcon from "@mui/icons-material/GroupRounded";
import PersonAddAltRoundedIcon from "@mui/icons-material/PersonAddAltRounded";
import { useNavigate } from "react-router-dom";
import TitleBox from "../components/TitleBox";
import TransferAudioRecorder from "../AudioRecorders/TransferAudioRecorder";
import io from "socket.io-client";
import axios from "axios";
import { useState, useEffect } from "react";

function SelectPayee() {
  const navigate = useNavigate();
  const [card, setCard] = useState(null);
  const [recognizedText, setRecognizedText] = useState("");
  const cardNumber = "1252452125167000"; 
  const cardBalance = "£500.00";

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

  function handleClick() {
    navigate("/selectcontact");
  }

  function handleClick2() {
    navigate("/createnewpayee");
  }

  useEffect(() => {
    const socket = io("http://127.0.0.1:5000"); 

    socket.on("recognized_text", (data) => {
      const text = JSON.parse(data).text;
      setRecognizedText(text);

      if (text && text.includes("before")) {
        window.location.href = "/selectcontact";
      }

      if (text && text.includes("create")) {
        window.location.href = "/createnewpayee";
      }
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  function formatDate(timestamp) {
    const date = new Date(timestamp);
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear().toString().substr(-2);
    return `${month}/${year}`;
  }

  return (
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
      <TransferAudioRecorder />
      <Box
        sx={{
          display: "grid", 
          gridTemplateRows: "1fr 1fr 1fr", 
          padding: "10px", 
        }}
      >
        <Box
          sx={{
            padding: "10px",
            margin: "auto",
            textAlign: "center",
            lineHeight: "2",
          }}
        >
          <TitleBox buttonText="Pay or Move Money" />
        </Box>
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
        <Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "50%",
            }}
          >
            <Button
              variant="contained"
              sx={{
                backgroundColor: "#fff",
                color: "#000",
                borderRadius: "10px",
                width: "20%",
                margin: "auto",
                display: "flex",
                justifyContent: "flex-start",
                alignItems: "center",
                padding: "10px",
              }}
              onClick={handleClick}
            >
              <GroupRoundedIcon sx={{ marginRight: "10px" }} />
              Someone You've Paid Before
            </Button>
          </Box>

          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "50%",
            }}
          >
            <Button
              variant="contained"
              sx={{
                backgroundColor: "#fff",
                color: "#000",
                borderRadius: "10px",
                width: "20%",
                marginBottom: "auto",
                display: "flex",
                justifyContent: "flex-start", 
                alignItems: "center", 
                padding: "10px", 
              }}
              onClick={handleClick2}
            >
              <PersonAddAltRoundedIcon sx={{ marginRight: "10px" }} />A new
              person or company
            </Button>
          </Box>
        </Box>
      </Box>
      <Footer />
    </Box>
  );
}

export default SelectPayee;
