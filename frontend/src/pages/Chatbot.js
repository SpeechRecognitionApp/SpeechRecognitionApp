import React from "react";
import WatsonChatBot from "../components/WatsonChatbot";
import { Box } from "@mui/material";
import Header from "../components/Header";
import Footer from "../components/Footer";
function Chatbot() {
    return (
        <Box
        sx={{
            display: "grid",
            backgroundColor: "#F5F5F9",
            gridTemplateRows: "auto 1fr auto",
            height: "100vh",
            flexDirection: "column",
            overflow: "hidden",
          }}>
            <Header />
            <Box >
                <WatsonChatBot />
            </Box>
        <Footer />
        </Box>
        
    )
}

export default Chatbot;