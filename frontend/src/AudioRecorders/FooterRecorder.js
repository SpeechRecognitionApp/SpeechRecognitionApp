import React, { useState, useRef, useEffect } from "react";
import io from "socket.io-client";

const FooterRecorder = ({handleClick,handleClick2,openYouTubePlayer,closeYouTubePlayer}) => {
  const [recognizedText, setRecognizedText] = useState("");
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




      if (text && text.includes("log")) {
        handleClick2()
       
      }

      if (text && text.includes("tutorial")) {
        openYouTubePlayer()
       
      }

      if (text && text.includes("close")) {
        closeYouTubePlayer()
       
      }

      if (text && text.includes("mode")) {
        handleClick();
       
      }
    });

    return () => {
      socket.disconnect();
    };
  }, []);

};

export default FooterRecorder;
