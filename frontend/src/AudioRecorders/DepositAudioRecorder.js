import React, { useState, useRef, useEffect } from "react";
import io from "socket.io-client";

const DepositAudioRecorder = ({ detectedNumber, setDetectedNumber,handleClick}) => {
  const [recognizedText, setRecognizedText] = useState("");
  const [confirmed, setConfirmed] = useState(false);


  useEffect(() => {
    const socket = io("http://127.0.0.1:5000"); 

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
        // Stop recording when "confirm" is detected and redirect to the "/insertmoney" page
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

export default DepositAudioRecorder;
