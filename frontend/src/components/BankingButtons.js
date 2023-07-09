import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import SwapHorizIcon from '@mui/icons-material/SwapHoriz';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import SwapVertIcon from '@mui/icons-material/SwapVert';
import PersonIcon from '@mui/icons-material/Person';

function Banking_Buttons() {
  const navigate = useNavigate();

  function handleClick() {
    navigate("/transfer");
  }

  function handleClick2() {
    navigate("/withdraw");
  }

  //   useEffect(() => {
  //     // Function to fetch the API data
  //     const fetchData = async () => {
  //       try {
  //         const response = await fetch("http://127.0.0.1:5000/transcribe");
  //         const data = await response.json();
  //         // Check if the result contains the word "Deposit"
  //         if (data.includes("Deposit")) {
  //           // Click on the deposit button
  //           document.getElementById("depositButton").click();
  //         }
  //       } catch (error) {
  //         console.error(error);
  //       }
  //     };

  //     fetchData();
  //   }, []);
  return (
    <div style={{ display: "flex" }}>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Button variant="contained" sx={{ mt: 2,height:125,width: 125,textTransform:'none',flexDirection:'column' }} startIcon = {<AttachMoneyIcon/>}>
          Deposit
        </Button>
        <Button
          variant="contained"
          sx={{ mt: 2, ml: 2, height: 125, width: 125,textTransform:'none',flexDirection:'column' }}
          onClick={handleClick2}
          startIcon ={<SwapVertIcon/>}
        >
          Withdraw
        </Button>
      </div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Button
          variant="contained"
          sx={{ mt: 2,ml:2, height: 125, width: 125,textTransform:'none',flexDirection:'column' }}
          onClick={handleClick}
          startIcon = {<SwapHorizIcon/>}
        >
          Transfer
        </Button>
        <Button variant="contained" sx={{ mt: 2, ml: 2,height: 125, width: 125 ,textTransform:'none',flexDirection:"column"}} startIcon = {<PersonIcon/>}>
          Account Management
        </Button>
      </div>
    </div>
  );
}

export default Banking_Buttons;
