import React from "react";
import { Box, Typography, Button, Card, CardContent } from "@mui/material";
import Header from "../components/Header";
import Footer from "../components/Footer";
import CreditCard from "../components/CreditCard";
import GroupRoundedIcon from "@mui/icons-material/GroupRounded";
import PersonAddAltRoundedIcon from "@mui/icons-material/PersonAddAltRounded";
import { useNavigate } from "react-router-dom";

function SelectPayee() {
  const navigate = useNavigate();

  function handleClick() {
    navigate("/selectcontact");
  }
  return (
    <>
      <Box sx={{ backgroundColor: "#F5F5F9" }}>
        <Header />
        <Box
          sx={{
            padding: "10px",
            width: "80%",
            margin: "40px auto",
            borderRadius: "10px",
            boxShadow: "2px 2px 5px rgba(0, 0, 0, 0.3)",
            textAlign: "center",
            lineHeight: "2",
            backgroundColor: "#fff",
          }}
        >
          <Typography variant="h4">Pay Or Move Money</Typography>
        </Box>
        <Box>
          {/* 标题 */}
          <Box sx={{ marginBottom: "20px" }}>
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
                marginTop: "30px",
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
                marginTop: "30px",
                display: "flex", // Enable Flexbox layout
                justifyContent: "flex-start", // Align content to the left
                alignItems: "center", // Center content vertically
                padding: "10px", // Add some padding
              }}
              onClick={handleClick}
            >
              <PersonAddAltRoundedIcon sx={{ marginRight: "10px" }} />A new
              person or company
            </Button>
          </Box>
        </Box>

        <Footer />
      </Box>
    </>
  );
}

export default SelectPayee;
