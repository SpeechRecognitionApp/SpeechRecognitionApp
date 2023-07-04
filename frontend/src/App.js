import React from "react";
import "./App.css";
import Dashboard from "./components/Dashboard";
import TransferPage from "./components/Transfer";
import {Route,Routes} from 'react-router-dom';


function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element = {<Dashboard/>} />  
        <Route path="/transfer" element = {<TransferPage/>} />
      </Routes>
    </div>
    
  );
}

export default App;
