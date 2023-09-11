import React, { useState, useRef, useEffect } from "react";
import Button from "@mui/material/Button";
import KeyboardVoiceIcon from "@mui/icons-material/KeyboardVoice";
import io from "socket.io-client";

const AudioRecorder = () => {
  const [recording, setRecording] = useState(false);
  const [audioUrl, setAudioUrl] = useState(null);
  const [recognizedText, setRecognizedText] = useState("");
  const [selectedValue, setSelectedValue] = useState(null);
  const mediaRecorder = useRef(null);
  const audioChunks = useRef([]);

  useEffect(() => {
    const socket = io("http://127.0.0.1:5000"); 

    socket.on("recognized_text", (data) => {
      const parsedData = JSON.parse(data);
      const text = parsedData.text;
    
      if (typeof text === "number") {
        setSelectedValue(parseFloat(text));
        return; 
      }
    
      setRecognizedText(text);

      if (text && text.includes("deposit")) {
        window.location.href = "/depositamount";
      }
      if (text && text.includes("withdraw")) {
        window.location.href = "/withdrawamount";
      }

      if (text && text.includes("transfer")) {
        window.location.href = "/selectpayee";
      }

      if (text && text.includes("assistant")) {
        window.location.href = "/chatbot";
      }

      if (text && text.includes("transaction")) {
        window.location.href = "/transactions";
      }

      if (text && text.includes("account")) {
        window.location.href = "/accountmanage";
      }
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  const startRecording = () => {
    navigator.mediaDevices.getUserMedia({ audio: true }).then((stream) => {
      mediaRecorder.current = new MediaRecorder(stream);
      mediaRecorder.current.ondataavailable = (event) => {
        audioChunks.current.push(event.data);
      };
      mediaRecorder.current.onstop = saveAudioToDisk;
      mediaRecorder.current.start();
      setRecording(true);
    });
  };

  const stopRecording = () => {
    if (mediaRecorder.current) {
      mediaRecorder.current.stop();
      setRecording(false);
    }
  };

  const saveAudioToDisk = () => {
    const audioBlob = new Blob(audioChunks.current, { type: "audio/wav" });
    const audioUrl = URL.createObjectURL(audioBlob);
    setAudioUrl(audioUrl);
    sendAudioToServer(audioBlob);
  };


  const sendAudioToServer = (audioBlob) => {
    const formData = new FormData();
    formData.append("audio", audioBlob);
    fetch("http://127.0.0.1:5000/transcribe", {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        const text = data.text;
        if (text && text.includes("transfer")) {
          window.location.href = "/transfer";
        }
        if (text && text.includes("withdraw")) {
          window.location.href = "/withdraw";
        }
        if (text && text.includes("deposit")) {
          window.location.href = "/deposit";
        }
        if (text && text.includes("transaction")) {
          window.location.href = "/transactions";
        }
        if (text && text.includes("account")) {
          window.location.href = "/accountmanage";
        }
      })
      .catch((error) => console.error("Error:", error));
  };

 
};

export default AudioRecorder;
