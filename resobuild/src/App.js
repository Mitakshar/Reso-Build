import { useState } from "react";
import "./App.css";
import Isolation from "./components/Isolation";
import Analysis from "./components/Analysis";
import Navbar from "./components/Navbar";

import styled from 'styled-components';
// const audioUrl = process.env.PUBLIC_URL + "/one.wav";

function App() {
    const [selectedOption, setSelectedOption] = useState(null);

    return (
      <div className="App">
        
        <Navbar />
        
        <div className="container">
        
          <h2></h2>
        {selectedOption === null ? (
          <div className="Cont">
          <div className="option-selector">
            <div className="content">
    
    <p>Unlock the full potential of your audio with our advanced analysis tools and stem isolation feature. Whether you're a seasoned musician or a sound engineer, our platform offers a comprehensive solution for assessing the loudness and dynamics of your audio files with precision and ease.</p>

    </div>   
    <div className="butons">
            <h2>Choose Between Isolation and Analysis:</h2>
            <button className="Selectbuton" onClick={() => setSelectedOption("analysis")}>Analysis</button>
            <button className="Selectbuton" onClick={() => setSelectedOption("isolation")}>Isolation</button>
            </div>
          </div>
          </div>
        ) : (
          <div className="selected-component">
            {selectedOption === "analysis" && <Analysis />}
            {selectedOption === "isolation" && <Isolation />}
          </div>
          
        )}
        
        </div>
       </div>
        
    );
  }
  const Link = styled.a`
  --primary: #61dbff;
  color: rgba(0, 0, 0, 0.9);
  text-decoration: none;
  padding: 0 1px;
  box-shadow: inset 0 -6px 0 0 var(--primary);
  transition: box-shadow 0.3s ease-in;

  &:hover {
    box-shadow: inset 0 -40px 0 0 var(--primary);
  }

  &:active {
    box-shadow: inset 0 -40px 0 0 var(--primary);
  }
`;
  
  export default App;