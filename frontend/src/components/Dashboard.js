import React from 'react'
import Banking_Buttons from './BankingButtons';
import AudioRecorder from './AudioRecorder.js';


function Dashboard() {
    return (
        <div>
            <AudioRecorder />
            <Banking_Buttons />
        </div>
        
    )
}

export default Dashboard;