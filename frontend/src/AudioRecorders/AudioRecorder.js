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
    
      setRecognizedText(text);

      if (text && text.includes("deposit")) {
        // Stop recording when "deposit" is detected
        console.log("Deposit detected");
        window.location.href = "/depositamount";
      }
      if (text && text.includes("withdraw")) {
        // Stop recording when "withdraw" is detected and redirect to the "/withdraw" page
        console.log("Withdraw detected");
        window.location.href = "/withdrawamount";
      }

      if (text && text.includes("transfer")) {
        // Stop recording when "withdraw" is detected and redirect to the "/withdraw" page
        console.log("Withdraw detected");
        window.location.href = "/transfer";
      }

      if (text && text.includes("assistant")) {
        // Stop recording when "withdraw" is detected and redirect to the "/withdraw" page
        console.log("Withdraw detected");
        window.location.href = "/chatbot";
      }

      if (text && text.includes("transaction")) {
        // Stop recording when "withdraw" is detected and redirect to the "/withdraw" page
        console.log("Withdraw detected");
        window.location.href = "/transactions";
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
    console.log(audioBlob);
    console.log(audioBlob.size, audioBlob.type);
    // Send audio to server
    sendAudioToServer(audioBlob);
  };

  // const sendAudioToServer = (audioBlob) => {
  //   const formData = new FormData();
  //   formData.append("audio", audioBlob);
  //   for (let [key, value] of formData.entries()) {
  //     console.log(key, value);
  //   }
  //   fetch("http://127.0.0.1:5000/transcribe", {
  //     method: "POST",
  //     body: formData,
  //   })
  //     .then((response) => response.json())
  //     .then((data) => {
  //       console.log("Response from server:", data);
  //     })
  //     .catch((error) => console.error("Error:", error));
  // };

  const sendAudioToServer = (audioBlob) => {
    const formData = new FormData();
    formData.append("audio", audioBlob);
    for (let [key, value] of formData.entries()) {
      console.log(key, value);
    }
    fetch("http://127.0.0.1:5000/transcribe", {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Response from server:", data);

        const text = data.text;
        console.log("Text:", text);

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

  // return (
  //   <div className="container">
  //     {recording ? (
  //       <Button
  //         variant="contained"
  //         size="large"
  //         sx={{
  //           textTransform: "none",
  //           bgcolor: "#ffff",
  //           color: "black",
  //           fontWeight: "black",
  //         }}
  //         onClick={stopRecording}
  //       >
  //         Stop Recording
  //       </Button>
  //     ) : (
  //       <Button
  //         variant="contained"
  //         size="large"
  //         sx={{
  //           textTransform: "none",
  //           size: "large",
  //           bgcolor: "#ffff",
  //           color: "black",
  //           fontWeight: "bold",
  //         }}
  //         startIcon={<KeyboardVoiceIcon />}
  //         onClick={startRecording}
  //       >
  //         Click to Start Voice Navigation
  //       </Button>
  //     )}
  //     {audioUrl && (
  //       <div className="audio-wrapper">
  //         <p>Audio file:</p>
  //         <audio controls src={audioUrl}></audio>
  //         <p>
  //           <a
  //             href={audioUrl}
  //             download="recording.wav"
  //             className="download-link"
  //           >
  //             Download
  //             {audioUrl}
  //           </a>
  //         </p>
  //       </div>
  //     )}
  //   </div>
  // );
};

export default AudioRecorder;