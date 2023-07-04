import React, { useState, useRef } from "react";
import "./AudioRecorder.css";

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

        // 提取返回的 text 字段
        const text = data.text;
        console.log("Text:", text);

        // 检查 text 字段中是否包含 "transfer" 这个单词
        if (text && text.includes("transfer")) {
          // 如果包含 "transfer" 这个单词，打开一个新的网页
          window.location.href = "/transfer";
        }
        if (text && text.includes("withdraw")) {
          // 如果包含 "transfer" 这个单词，打开一个新的网页
          window.location.href = "/withdraw";
        }
      })
      .catch((error) => console.error("Error:", error));
  };

  return (
    <div className="container">
      {recording ? (
        <button className="record-button stop" onClick={stopRecording}>
          Stop Recording
        </button>
      ) : (
        <button className="record-button start" onClick={startRecording}>
          Start Recording
        </button>
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
