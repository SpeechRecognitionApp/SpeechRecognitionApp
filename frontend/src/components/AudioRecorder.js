import React, { useState, useRef, useEffect } from "react";
import Button from '@mui/material/Button';
import KeyboardVoiceIcon from '@mui/icons-material/KeyboardVoice';


const AudioRecorder = () => {
  const [recording, setRecording] = useState(false);
  const [audioUrl, setAudioUrl] = useState(null);
  const mediaRecorder = useRef(null);
  const audioChunks = useRef([]);
  const mediaStream = useRef(null);
  const threshold = 0.2; // Adjust this threshold as needed

  useEffect(() => {
    const initSpeechRecognition = () => {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      const recognition = new SpeechRecognition();
      recognition.continuous = true;

      recognition.onstart = () => {
        setRecording(true);
      };

      recognition.onend = () => {
        setRecording(false);
        stopRecording();
      };

      recognition.onresult = (event) => {
        // Check the volume level and start/stop recording based on the threshold
        const volume = event.results[event.results.length - 1][0].volume;
        if (volume > threshold && !recording) {
          startRecording();
        } else if (volume <= threshold && recording) {
          stopRecording();
        }
      };

      recognition.onerror = (event) => {
        console.error("Speech recognition error:", event.error);
      };

      recognition.start();
      return recognition;
    };

    const recognition = initSpeechRecognition();

    // Clean up the recognition when the component unmounts
    return () => {
      if (recognition) {
        recognition.stop();
      }
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
      mediaStream.current = stream;
    });
  };

  const stopRecording = () => {
    if (mediaRecorder.current) {
      mediaRecorder.current.stop();
      mediaStream.current.getTracks().forEach(track => track.stop());
    }
  };

  const saveAudioToDisk = () => {
    const audioBlob = new Blob(audioChunks.current, { type: "audio/wav" });
    const audioUrl = URL.createObjectURL(audioBlob);
    setAudioUrl(audioUrl);
    // Send audio to server
    sendAudioToServer(audioBlob);
  };

  const sendAudioToServer = (audioBlob) => {
    // Your server code here
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
    
  };

  return (
    <div className="container">
      {recording ? (
        <Button variant='contained' size='large' sx={{ textTransform: 'none', bgcolor: '#ffff', color: 'black', fontWeight: 'black' }} onClick={stopRecording}>
          Stop Recording
        </Button>
      ) : (
        <Button variant='contained' size='large' sx={{ textTransform: 'none', size: 'large', bgcolor: '#ffff', color: 'black', fontWeight: 'bold' }} startIcon={<KeyboardVoiceIcon />} onClick={startRecording}>
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
