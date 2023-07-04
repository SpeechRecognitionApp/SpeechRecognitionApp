import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";

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
    <div>
      <Button variant="contained" sx={{ mt: 2 }}>
        Deposit
      </Button>
      <Button
        variant="contained"
        sx={{ mt: 2, ml: 2 }}
        onClick={(e) => handleClick2()}
      >
        Withdraw
      </Button>
      <Button
        variant="contained"
        sx={{ mt: 2, ml: 2 }}
        onClick={(e) => handleClick()}
      >
        Transfer
      </Button>
      <Button variant="contained" sx={{ mt: 2, ml: 2 }}>
        More
      </Button>
    </div>
  );
}

export default Banking_Buttons;
