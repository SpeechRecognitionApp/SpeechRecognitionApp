import React, { useState, useRef, useEffect } from "react";
import { Box, Grid, Typography, TextField, Button, Paper, Avatar } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import SmartToyRoundedIcon from '@mui/icons-material/SmartToyRounded';
import PersonRoundedIcon from '@mui/icons-material/PersonRounded';
import MicRoundedIcon from '@mui/icons-material/MicRounded';
import InputAdornment from "@mui/material/InputAdornment";
import WatsonRecorder from "../AudioRecorders/WatsonRecorder";



function WatsonChatBot() {
  const [recording, setRecording] = useState(false);
  const [audioUrl, setAudioUrl] = useState(null);
  const [transcribedText, setTranscribedText] = useState("");
  const mediaRecorder = useRef(null);
  const audioChunks = useRef([]);
  const [chatHistory, setChatHistory] = useState([]);
  const [inputMessage, setInputMessage] = useState("");
  const [sessionID, setSessionID] = useState(null);
  const chatContainerRef = useRef(null);

  const handleSendButtonClick = () => {
    handleSendMessage(); // Call your existing send message function
  };

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

  const handleMicButtonClick = () => {
    if (!recording) {
      // Start recording
      startRecording();
    } else {
      // Stop recording
      stopRecording();
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
        console.log("Response from server:", data.text);

        const transcribedText = data.text;
        setInputMessage(transcribedText);
        

      })
      .catch((error) => console.error("Error:", error));
  };



  useEffect(() => {
    // Generate a new session ID when the component mounts
    const fetchSessionID = async () => {
      try {
        const response = await fetch("http://127.0.0.1:5000/new_session");
        const data = await response.json();
        setSessionID(data.session_id);
      } catch (error) {
        console.error("Error fetching session ID:", error);
      }
    };

    fetchSessionID();
  }, []);

  const handleSendMessage = async () => {
    if (inputMessage.trim() !== "" && sessionID) {
      // Add user message to chat history
      setChatHistory(prevHistory => [
        ...prevHistory,
        { user: true, message: inputMessage }
      ]);
      
      // Make an API request to the backend
      try {
        const response = await fetch("http://127.0.0.1:5000/send_message", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ message: inputMessage, session_id: sessionID }),
        });
        const data = await response.json();

        // Add Watson's response to chat history
        setChatHistory(prevHistory => [
            ...prevHistory,
            { user: false, message: data.response.text } // Extract text property from response
          ]);
        
          if (data.response.text.includes("Redirecting you to the deposit page...")) {
            setTimeout(() => {
              window.location.href = "/depositamount"; // Redirect to deposit page
            }, 2000); // 2 seconds delay
          } else if (data.response.text.includes("Redirecting you to the withdraw page...")) {
            setTimeout(() => {
              window.location.href = "/withdrawamount"; // Redirect to withdraw page
            }, 2000); // 2 seconds delay
          } else if (data.response.text.includes("Redirecting you to the transfer page...")) {
            setTimeout(() => {
              window.location.href = "/transfer"; // Redirect to transfer page
            }, 2000); // 2 seconds delay
          } else if (data.response.text.includes("Redirecting you to the ATM locator page...")) {
            setTimeout(() => {
              window.location.href = "/atms"; // Redirect to ATM page
            }, 2000); // 2 seconds delay
          } else if (data.response.text.includes("Redirecting you to the products page....")) {
            setTimeout(() => {
              window.location.href = "/products"; // Redirect to products page
            }, 2000); // 2 seconds delay
          } else if (data.response.text.includes("Redirecting you to the branches page...")) {
            setTimeout(() => {
              window.location.href = "/branches"; // Redirect to branches page
            }, 2000); // 2 seconds delay
          }

          
        
      } catch (error) {
        console.error("Error sending message:", error);
      }

      setInputMessage("");
    }
  };

  useEffect(() => {
    // Scroll to the bottom of the chat container
    chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
  }, [chatHistory]);

  return (
    <Grid container sx={{ bgcolor: '#FFFF', mt: 3, height: '90%', width: 1450, borderRadius: '16px', boxShadow: 3, mx: 'auto' }}>
      <Grid item xs={12}>
        <Box sx={{ bgcolor: "#F5F5F9", height: 75, width: 1300, mt: 3, mx: 'auto', borderRadius: '16px', display: "flex", justifyContent: "center", alignItems: "center", boxShadow: 5 }}>
          <img src="ibmwatson.png" alt="IBM Watson Logo" style={{ height: 50, width: 50, marginRight: '10px' }} />
          <Typography variant='h4' sx={{ fontWeight: 'bold' }}>
            IBM Watson Chat
          </Typography>
        </Box>
      </Grid>
      {/* Chat history */}
      <Grid item xs={12}>
        <Box
          ref={chatContainerRef}
          sx={{
            flexDirection: "column",
            alignItems: "stretch",
            mx: 'auto',
            mt: 1,
            width: 1000,
            height: 250,
            overflowY: "auto",
          }}
        >
          {chatHistory.map((message, index) => (
            <Box
              key={index}
              sx={{
                display: "flex",
                justifyContent: message.user ? "flex-end" : "flex-start",
                mb: 1,
                p: "8px",
              }}
            >
              <Paper
                sx={{
                  maxWidth: "70%",
                  p: "8px",
                  display: "flex",
                  alignItems: "center",
                }}
                style={{
                  marginLeft: message.user ? "auto" : 0,
                  marginRight: message.user ? 0 : "auto",
                }}
              >
                {message.user ? (
                  <>
                    <Typography sx={{ ml: 1, mr: 1 }}>{message.message}</Typography>
                    <Avatar sx={{ mr: 1 }}><PersonRoundedIcon/></Avatar>
                  </>
                ) : (
                  <>
                    <Avatar sx={{ mr: 1 }}><SmartToyRoundedIcon /></Avatar>
                    <Typography>{message.message}</Typography>
                  </>
                )}
              </Paper>
            </Box>
          ))}
        </Box>
      </Grid>
      <Grid item xs={12}>
        <Box sx={{ display: "flex", alignItems: "center", mx: "auto", mt: 5, width: 1000 }}>
          <TextField
            label="Type your message"
            variant="outlined"
            fullWidth
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <Button
                    variant="contained"
                    color="primary"
                    size="large"
                    onClick={handleSendMessage}
                    sx={{ textTransform: "none" }}
                  >
                    <SendIcon />
                  </Button>
                
                </InputAdornment>
              ),
            }}
          />
                      <Button
            variant="outlined"
            sx={{
              width: 50,
              height: 56,
              ml: 2,
              borderColor: recording ? "red" : "#BFBFBF",
              "&:hover": {
                borderColor: "red",
              },
            }}
            onClick={handleMicButtonClick} // Call the updated button click handler
          >
            <MicRoundedIcon sx={{ color: recording ? "red" : "black" }} />
            </Button>
            
        </Box>
      </Grid>
      <WatsonRecorder onSendButtonClick={handleSendButtonClick} />
    </Grid>
   
  );
}

export default WatsonChatBot;
