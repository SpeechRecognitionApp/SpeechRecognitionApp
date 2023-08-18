import React, { useState, useRef, useEffect } from "react";
import io from "socket.io-client";

const DepositAudioRecorder = ({ detectedNumber, setDetectedNumber }) => {
  const [recognizedText, setRecognizedText] = useState("");


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
        // Stop recording when "confirm" is detected and redirect to the "/insertmoney" page
        console.log("Confrmation detected");
        window.location.href = "/insertmoney";
      }
    });

    return () => {
      socket.disconnect();
    };
  }, []);
};

export default DepositAudioRecorder;
