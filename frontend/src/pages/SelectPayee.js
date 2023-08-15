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

function SelectPayee() {
  const navigate = useNavigate();

  function handleClick() {
    navigate("/selectcontact");
  }

  function handleClick2() {
    navigate("/createnewpayee");
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
          display: "grid", // Make this Box a grid container
          gridTemplateRows: "1fr 1fr 1fr", // Divide the container into three equal rows
          padding: "20px", // Add some padding around the Box
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
            <CreditCard
              cardnumber={"4321123412341234"}
              cardname={"Morgan Bush"}
              carddate={"09/30"}
              cardcvc={"454"}
            />
          </div>
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
            height: "100%",
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
              display: "flex", // Enable Flexbox layout
              justifyContent: "flex-start", // Align content to the left
              alignItems: "center", // Center content vertically
              padding: "10px", // Add some padding
            }}
            onClick={handleClick2}
          >
            <PersonAddAltRoundedIcon sx={{ marginRight: "10px" }} />A new person
            or company
          </Button>
        </Box>
      </Box>
      <Footer />
    </Box>
  );
}

export default SelectPayee;
