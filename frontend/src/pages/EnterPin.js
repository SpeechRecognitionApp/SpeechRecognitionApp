import React, { useState, useEffect, useRef } from "react";
import PinInput from "react-pin-input";
import moment from "moment";
import swal from "sweetalert";
import Keyboard from "react-simple-keyboard";
import "react-simple-keyboard/build/css/index.css";
import "./EnterPin.css";
import axios from "axios";
import { Box } from "@mui/material";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";

function EnterPin() {
  const [value, setValue] = useState("");
  const [pinTime, setPinTime] = useState(new Date());
  const pinRef = useRef(null);
  const keyboardRef = useRef(null);
  const navigate = useNavigate();

  // Add a new state variable to keep track of failed attempts
  const [failedAttempts, setFailedAttempts] = useState(0);

  useEffect(() => {
    const timerID = setInterval(() => setPinTime(new Date()), 1000);
    return () => clearInterval(timerID);
  }, []);

  useEffect(() => {
    console.log("useEffect triggered, current value:", value);
    if (value.length === 4) {
      console.log("value length is 4, calling onSubmitHandler");
      onHandleComplete();
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
        // setTimeout(onSubmitHandler, 1000);
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
    // keyboardRef.current.clearInput();
    console.log("Cleared value:", value);
    setTimeout(() => {
      window.location.href = "/";
    }, 700);
  };

  const onHandleComplete = async () => {
    onSubmitHandler(() => {
      navigate("/insertcard");
    });
  };

  const onSubmitHandler = (onSuccess) => {
    // First check if the user is frozen
    axios
      .get("http://127.0.0.1:5000/check_frozen_status")
      .then((response) => {
        if (response.data.isFrozen === "1") {
          // Redirect to the insert card page if the account is frozen
          swal(
            "Frozen Card!",
            "Your Card has been frozen. Please Re-Insert Your Card",
            "error"
          );
          setTimeout(() => {
            swal.close();
          }, 3000);
          onSuccess();
          return;
        }

        // Fetch the current card_id and user_id
        axios
          .get("http://127.0.0.1:5000/get_current_card")
          .then((response) => {
            const { card_id, user_id } = response.data;

            // Continue with PIN verification if the account is not frozen
            if (value.length !== 4) {
              return; // Exit early if PIN is incomplete
            }

            const requestData = {
              card_id: card_id,
              user_id: user_id,
              pin: value,
            };

            axios
              .post("http://127.0.0.1:5000/card/verify_pin", requestData, {
                headers: {
                  "Content-Type": "application/json",
                },
              })
              .then((response) => {
                if (response.data.match) {
                  // Login successful, update is_login status
                  axios.put("http://127.0.0.1:5000/login_success");
                  window.location.href = "/welcome";
                } else {
                  // Login failed, increment fail_count
                  axios.put("http://127.0.0.1:5000/login_fail");
                  swal(
                    "Invalid PIN!",
                    "Pin you entered didn't match. Try again",
                    "error"
                  );
                  handleClear();
                }
              })
              .catch((error) => {
                console.error("API request failed:", error);
                swal(
                  "Error",
                  "Failed to verify PIN. Please try again later.",
                  "error"
                );
                handleClear();
              });
          })
          .catch((error) => {
            console.error("Could not fetch current card:", error);
            swal(
              "Error",
              "Failed to fetch current card. Please try again later.",
              "error"
            );
          });
      })
      .catch((error) => {
        console.error("Could not check frozen status:", error);
        swal(
          "Error",
          "Failed to check frozen status. Please try again later.",
          "error"
        );
      });
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
          onComplete={onHandleComplete}
        />
        <Keyboard
          ref={keyboardRef}
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
