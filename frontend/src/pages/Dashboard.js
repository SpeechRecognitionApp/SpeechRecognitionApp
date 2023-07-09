import React from "react";
import Banking_Buttons from "../components/BankingButtons";
import AudioRecorder from "../components/AudioRecorder.js";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import Grid from "@mui/material/Grid";

function Dashboard() {
  return (
    <Grid container direction="column">
      <Grid item>
        <Header />
      </Grid>
      <Grid item container>
        <Grid item xs={2}>
          {/* <Sidebar /> */}
          <Sidebar />
        </Grid>
        <Grid item xs={10} container direction="column">
          <Banking_Buttons />
          <AudioRecorder />
        </Grid>
      </Grid>
    </Grid>
  );
}

export default Dashboard;
