import React from "react";
import Button from "@mui/material/Button";
import { Box, Typography } from "@mui/material";
import "./Footer.css";

const Footer = () => {
  return (
    <div className="footer">
      <Box
        className="app-footer"
        sx={{
          position: "fixed",
          bottom: 0,
          width: "100%",
          boxShadow: "0px -2px 10px rgba(0, 0, 0, 0.1)",
          borderTop: "1px solid rgba(0, 0, 0, 0.1)",
          display: "flex", // Enable Flexbox layout
          justifyContent: "space-around", // Distribute the buttons evenly
        }}
      >
        <Button className="footer-button" style={{ textTransform: "none" }}>
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
        <Button className="footer-button" style={{ textTransform: "none" }}>
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
        <Button className="footer-button" style={{ textTransform: "none" }}>
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
    </div>
  );
};

export default Footer;
