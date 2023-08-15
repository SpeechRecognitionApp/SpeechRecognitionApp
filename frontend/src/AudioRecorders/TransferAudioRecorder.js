import React, { useState, useRef, useEffect } from "react";
import io from "socket.io-client";

const TransferAudioRecorder = () => {
  const [recognizedText, setRecognizedText] = useState("");
  useEffect(() => {
    const socket = io("http://127.0.0.1:5000"); // Replace the URL with your backend URL

    socket.on("recognized_text", (data) => {
      const text = JSON.parse(data).text;
      setRecognizedText(text);

      if (text && text.includes("before")) {
        // Stop recording when "withdraw" is detected and redirect to the "/withdraw" page
        console.log("Withdraw detected");
        window.location.href = "/selectcontact";
      }

      if (text && text.includes("create")) {
        // Stop recording when "withdraw" is detected and redirect to the "/withdraw" page
        console.log("Withdraw detected");
        window.location.href = "/createnewpayee";
      }
    });

    return () => {
      socket.disconnect();
    };
  }, []);
};

export default TransferAudioRecorder;
