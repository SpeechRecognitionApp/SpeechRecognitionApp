import React from "react";
import CardSelector from "../components/CardSelector";
import { Typography } from "@mui/material";
import { Button,TextField } from "@mui/material";

function DepositPage() {
    return(
        <div>
            <Typography variant='h4'>Deposit</Typography>
            <Typography variant='h4'>Please select a card</Typography>
            <CardSelector/>
            <TextField sx={{mt:2}} label="Amount" variant="outlined" type="number" required />
            <Button sx={{mt:3,ml:2}} variant="contained" type="submit" color="primary">
            Deposit
            </Button>
        </div>
    );
}

export default DepositPage;