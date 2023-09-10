import React, { useState, useEffect } from "react";
import io from "socket.io-client";

const CreateNewPayeeRecorder = ({
  onFirstNameDetected,
  onLastNameDetected,
  onSortCodeDetected,
  onAccountNumberDetected,
  onReferenceDetected,
  onDescriptionDetected,
}) => {
  const [selectedValue, setSelectedValue] = useState(null);

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
        onFirstNameDetected();
        console.log("First name detected");
      }

      if (text && text.includes("last")) {
        onLastNameDetected();
        console.log("Last name detected");
      }

      if (text && text.includes("code")) {
        onSortCodeDetected();
        console.log("Sort code detected");
      }

      if (text && text.includes("account")) {
        onAccountNumberDetected();
        console.log("Account number detected");
      }

      if (text && text.includes("reference")) {
        onReferenceDetected();
        console.log("Reference detected");
      }

      if (text && text.includes("description")) {
        onDescriptionDetected();
        console.log("Description detected");
      }

      if (text && text.includes("reset")) {
        // Stop recording when "reset" is detected and reload the page
        window.location.reload();
      }

      if (text && text.includes("confirm")) {
        // Handle the "confirm" keyword here
        console.log("Confirmation detected");
      }
    });

    return () => {
      socket.disconnect();
    };
  }, []);
};

export default CreateNewPayeeRecorder;
