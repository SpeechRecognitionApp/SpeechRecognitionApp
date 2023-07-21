import React from "react";
import { Grid, Button, Box, Typography } from "@mui/material";
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';


function TitleBox({buttonText}) {
    return (
        <Box sx={{bgcolor:"#ffff",height:75,width:1100,mx:'auto',borderRadius:'16px', display: "flex",
        justifyContent: "center",
        alignItems: "center", boxShadow:5}}>
            <Typography variant='h4' sx={{ textAlign: "center" }}>
                {buttonText}
            </Typography>
        </Box>
    );
}

export default TitleBox;