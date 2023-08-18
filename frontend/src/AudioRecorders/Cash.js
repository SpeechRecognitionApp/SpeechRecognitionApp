import React, { useState, useRef, useEffect } from "react";
import io from "socket.io-client";

const Cash = () => {
  const [recognizedText, setRecognizedText] = useState("");
  useEffect(() => {
    const socket = io("http://127.0.0.1:5000"); // Replace the URL with your backend URL

    socket.on("recognized_text", (data) => {
      const text = JSON.parse(data).text;
      setRecognizedText(text);

      if (text && text.includes("confirm")) {
        console.log("Confirm detected");
        window.location.href = "/dashboard";
      }

    });

    return () => {
      socket.disconnect();
    };
  }, []);
};

export default Cash;
