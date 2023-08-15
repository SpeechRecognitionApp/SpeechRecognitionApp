import React, { useState, useEffect, useRef } from "react";
import PinInput from "react-pin-input";
import moment from "moment";
import swal from "sweetalert";
import Keyboard from "react-simple-keyboard";
import "react-simple-keyboard/build/css/index.css";
import "./EnterPin.css";
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

function EnterPin() {
  const [value, setValue] = useState("");
  const [pinTime, setPinTime] = useState(new Date());
  const pinRef = useRef(null);
  useEffect(() => {
    const timerID = setInterval(() => setPinTime(new Date()), 1000);
    return () => clearInterval(timerID);
  }, []);

  useEffect(() => {
    if (value.length === 4) {
      onSubmitHandler();
    }
  }, [value]);

  const onChange = (newVal) => {
    console.log("Current Input Value:", newVal);
    setValue(newVal);
  };

  const onKeyPress = (button) => {
    if (button === "{clear}" || button === "{bksp}") {
      handleClear();
    } else {
      let elements = pinRef.current.elements;
      if (elements[2].state.value) {
        elements[3].state.value = button;
        setTimeout(onSubmitHandler, 1000);
        return;
      }
      if (elements[1].state.value) {
        elements[2].state.value = button;
        return;
      }
      if (elements[0].state.value) {
        elements[1].state.value = button;
        return;
      }
      elements[0].state.value = button;
    }
  };

  const handleClear = () => {
    setValue("");
    let elements = pinRef.current.elements;
    elements[0].state.value = "";
    elements[1].state.value = "";
    elements[2].state.value = "";
    elements[3].state.value = "";
    keyboardRef.current.clearInput();
  };

  const onSubmitHandler = () => {
    console.log("Submitting PIN, current value:", value);

    if (value === "1234") {
      window.location.href = "/";
    } else {
      swal("Invalid PIN!", "Pin you entered didn't match. Try again", "error");
      handleClear();
    }
  };

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
          borderRadius: 10,
          overflowY: "auto", // Add vertical scroll if content overflows
        }}
      >
        <PinInput
          length={4}
          ref={pinRef}
          type="numeric"
          inputMode="number"
          onChange={onChange}
          onComplete={onSubmitHandler}
        />
        <Keyboard
          theme={
            "hg-theme-default hg-theme-numeric hg-layout-numeric numeric-theme"
          }
          layout={{
            default: ["1 2 3", "4 5 6", "7 8 9", "{clear} 0 {bksp}"],
          }}
          mergeDisplay
          display={{ "{clear}": "Clear", "{bksp}": "&#8592" }}
          maxLength={4}
          onChange={onChange}
          onKeyPress={onKeyPress}
        />
      </Box>

      <Footer />
    </Box>
  );
}

export default EnterPin;
