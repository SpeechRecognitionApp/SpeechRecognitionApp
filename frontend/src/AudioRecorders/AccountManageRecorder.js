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

  useEffect(() => {
    const socket = io("http://127.0.0.1:5000"); // Replace the URL with your backend URL

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
        // Stop recording when "confirm" is detected and redirect to the "/takecash" page
        window.location.reload();
      }

      if (text && text.includes("confirm")) {
        // Call the function prop to simulate clicking the "Confirm" button
        onConfirmKeywordDetected();
      }


      // if (text && text.includes("okay")) {
      //   // Simulate a click on the SweetAlert "OK" button
      //   if (sweetAlertRef.current) {
      //     console.log("okay received")
      //     sweetAlertRef.current.clickConfirm();
      //   }
      // }
    });

    return () => {
      socket.disconnect();
    };
  }, []);
};

export default AccountManageRecorder;
