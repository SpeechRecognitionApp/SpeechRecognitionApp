import React, { useState, useEffect } from "react";
import io from "socket.io-client";

const AccountManageRecorder = ({
  onFirstKeywordDetected,
  onLastKeywordDetected,
  onEmailKeywordDetected,
  onStreetKeywordDetected,
  onHouseKeywordDetected,
  onPostKeywordDetected,
  onConfirmKeywordDetected }) => {
  const [selectedValue, setSelectedValue] = useState(null);
  const [confirmed, setConfirmed] = useState(false);

  useEffect(() => {
    const socket = io("http://127.0.0.1:5000"); 

    socket.on("recognized_text", (data) => {
      const parsedData = JSON.parse(data);
      const text = parsedData.text;

      // Handle recognized numbers
      if (typeof text === "number") {
        // Handle the number value here
        console.log("Number detected:", text);
        setSelectedValue(parseFloat(text));
        return; // Exit early, as we've handled the number case
      }

      if (text && text.includes("first")) {
        onFirstKeywordDetected();
        console.log("first name detected");
      }

      if (text && text.includes("last")) {
        onLastKeywordDetected();
        console.log("last name detected");
      }

      if (text && text.includes("email")) {
        onEmailKeywordDetected();
        console.log("email detected");
      }

      if (text && text.includes("line")) {
        onStreetKeywordDetected();
        console.log("street line detected");
      }
      if (text && text.includes("house")) {
        onHouseKeywordDetected();
        console.log("House name detected");
      }
      if (text && text.includes("post")) {
        onPostKeywordDetected();
        console.log("post code detected");
      }

      if (text && text.includes("reset")) {
        window.location.reload();
      }

      if (text && text.includes("confirm")) {
        setConfirmed(true);
        
      }
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  useEffect(() => {
    if (confirmed) {
      onConfirmKeywordDetected()
    }
  }, [confirmed, onConfirmKeywordDetected]);

  return null;
};

export default AccountManageRecorder;
