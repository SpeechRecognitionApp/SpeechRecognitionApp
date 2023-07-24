import React, { useState, useRef } from "react";
import Button from "@mui/material/Button";
import KeyboardVoiceIcon from "@mui/icons-material/KeyboardVoice";

const AudioRecorder = () => {
  const [recording, setRecording] = useState(false);
  const [audioUrl, setAudioUrl] = useState(null);
  const mediaRecorder = useRef(null);
  const audioChunks = useRef([]);

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
      })
      .catch((error) => console.error("Error:", error));
  };

  return (
    <div className="container">
      {recording ? (
        <Button
          variant="contained"
          size="large"
          sx={{
            textTransform: "none",
            bgcolor: "#ffff",
            color: "black",
            fontWeight: "black",
          }}
          onClick={stopRecording}
        >
          Stop Recording
        </Button>
      ) : (
        <Button
          variant="contained"
          size="large"
          sx={{
            textTransform: "none",
            size: "large",
            bgcolor: "#ffff",
            color: "black",
            fontWeight: "bold",
          }}
          startIcon={<KeyboardVoiceIcon />}
          onClick={startRecording}
        >
          Click to Start Voice Navigation
        </Button>
      )}
      {audioUrl && (
        <div className="audio-wrapper">
          <p>Audio file:</p>
          <audio controls src={audioUrl}></audio>
          <p>
            <a
              href={audioUrl}
              download="recording.wav"
              className="download-link"
            >
              Download
              {audioUrl}
            </a>
          </p>
        </div>
      )}
    </div>
  );
};

export default AudioRecorder;
