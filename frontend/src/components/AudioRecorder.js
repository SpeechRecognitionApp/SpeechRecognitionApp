import React, { useState, useRef } from "react";

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
      })
      .catch((error) => console.error("Error:", error));
  };

  return (
    <div>
      {recording ? (
        <button onClick={stopRecording}>Stop Recording</button>
      ) : (
        <button onClick={startRecording}>Start Recording</button>
      )}
      {audioUrl && (
        <div>
          <p>Audio file:</p>
          <audio controls src={audioUrl}></audio>
          <p>
            <a href={audioUrl} download="recording.wav">
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
