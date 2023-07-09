import React from "react";
import Banking_Buttons from "../components/BankingButtons";
import AudioRecorder from "../components/AudioRecorder.js";
import Header from "../components/Header";
import MenuItem from "../components/MenuItems";

function Dashboard() {
  return (
    <div>
      <Header />
      <MenuItem />
      <AudioRecorder />
    </div>
  );
}

export default Dashboard;
