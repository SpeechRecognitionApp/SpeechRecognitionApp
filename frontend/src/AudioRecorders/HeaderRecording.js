import React, { useState, useRef, useEffect } from "react";
import io from "socket.io-client";
import { useNavigate } from "react-router-dom";

const HeaderRecorder = () => {
const navigate = useNavigate();
  const [recognizedText, setRecognizedText] = useState("");
  const [selectedValue, setSelectedValue] = useState(null);

  const goBack = () => {
    navigate(-1);
  };

  const goForward = () => {
    navigate(1);
  };

  function returnHome() {
    navigate("/dashboard");
  }
  

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



      if (text && text.includes("back")) {
        console.log("back detected");
        goBack();
      }

      if (text && text.includes("forward")) {
        console.log("forward detected");
        goForward();
      }

      if (text && text.includes("home")) {
        console.log("Home detected");
        returnHome();
      }
    });

    return () => {
      socket.disconnect();
    };
  }, []);
};

export default HeaderRecorder;
