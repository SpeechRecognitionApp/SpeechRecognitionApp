import React from "react";
import Button from "@mui/material/Button";
import { Box, Typography } from "@mui/material";
import "./Footer.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import YouTube from 'react-youtube';
import FooterRecorder from "../AudioRecorders/FooterRecorder";

const Footer = () => {
  const [showYouTubePlayer, setShowYouTubePlayer] = useState(false);
  const navigate = useNavigate();

  function handleClick() {
    navigate("/welcome");
  }
  function handleClick2() {
    axios
      .delete("http://127.0.0.1:5000/logout")
      .then((response) => {
        console.log("Logged out successfully");
      })
      .catch((error) => {
        console.error("Failed to log out:", error);
      });
    navigate("/insertcard");
  }

  function openYouTubePlayer() {
    setShowYouTubePlayer(true);
  }

  // Function to close the YouTube player
  function closeYouTubePlayer() {
    setShowYouTubePlayer(false);
  }


  return (
    <div className="footer">
      <Box
        className="app-footer"
        sx={{
          width: "100%",
          boxShadow: "0px -2px 10px rgba(0, 0, 0, 0.1)",
          borderTop: "1px solid rgba(0, 0, 0, 0.1)",
          display: "flex",
          justifyContent: "space-around",
          marginTop: "auto",
        }}
      >
        <Button
          className="footer-button"
          style={{ textTransform: "none" }}
          onClick={handleClick}
        >
          <Typography
            variant="h6"
            sx={{
              flexGrow: 1,
              textAlign: "center",
              color: "#000000",
            }}
          >
            Accessibility
          </Typography>
        </Button>
        <Button className="footer-button" style={{ textTransform: "none" }} onClick={openYouTubePlayer}>
          <Typography
            variant="h6"
            sx={{
              flexGrow: 1,
              textAlign: "center",
              color: "#000000",
            }}
          >
            Tutorials
          </Typography>
        </Button>
        <Button
          className="footer-button"
          style={{ textTransform: "none" }}
          onClick={handleClick2}
        >
          <Typography
            variant="h6"
            sx={{
              flexGrow: 1,
              textAlign: "center",
              color: "#000000",
            }}
          >
            Log Out
          </Typography>
        </Button>
      </Box>
      {showYouTubePlayer && (
        <div className="youtube-player" onClick={closeYouTubePlayer}>
          <YouTube
            videoId="DoDO7xozJt4" // Replace with your video ID
            opts={{
              width: '200%', // Width of the player
              height: '60vh', // Height of the player
              playerVars: {
                autoplay: 1, // Auto-play the video
              },
            }}
            onEnd={closeYouTubePlayer} // Close the player when the video ends
          />
        </div>
      )}
      <FooterRecorder 
  handleClick={handleClick}
  handleClick2={handleClick2}
  openYouTubePlayer={openYouTubePlayer}
  closeYouTubePlayer={closeYouTubePlayer} />
    </div>
  );
};

export default Footer;
