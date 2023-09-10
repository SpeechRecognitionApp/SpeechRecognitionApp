import React, { useState, useRef, useEffect } from "react";
import io from "socket.io-client";

const WatsonRecorder = ({ onSendButtonClick }) => {
  const [recognizedText, setRecognizedText] = useState("");
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

      if (text && text.includes("send")) {
        console.log("Send detected");
        onSendButtonClick(); 
      }
    });

    return () => {
      socket.disconnect();
    };
  }, [onSendButtonClick]);
};

export default WatsonRecorder;


