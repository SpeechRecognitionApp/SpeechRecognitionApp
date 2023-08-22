import React, { useState, useRef, useEffect } from "react";
import io from "socket.io-client";

const WithdrawAudioRecorder = ({ detectedNumber, setDetectedNumber, handleClick}) => {
  const [recognizedText, setRecognizedText] = useState("");
  const [confirmed, setConfirmed] = useState(false);
  

  useEffect(() => {
    const socket = io("http://127.0.0.1:5000"); // Replace the URL with your backend URL

    const isNumeric = (str) => {
        return !isNaN(str) && !isNaN(parseFloat(str));
      };
 


    socket.on("recognized_text", (data) => {
      const text = JSON.parse(data).text;
      setRecognizedText(text);

         
    if (isNumeric(text)) {
        // If the recognized text is a number, update the state with the numeric value
        setDetectedNumber(parseFloat(text));
        console.log("Number detected:", text);
        return; // Exit early as we've handled the numeric case
    }

    if (text && text.includes("confirm")) {
      console.log("Confirmation detected");
      setConfirmed(true);
    }
  });

    return () => {
      socket.disconnect();
    };
  }, []);

  useEffect(() => {
    if (confirmed) {
      handleClick();
    }
  }, [confirmed, handleClick]);

  return null;
};

export default WithdrawAudioRecorder;
