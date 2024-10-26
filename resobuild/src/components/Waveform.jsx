import React, { useEffect, useRef, useState } from "react";
import WaveSurfer from "wavesurfer.js";
import "./Waveform.css";
import {
  BsFillStopFill,
  BsFillPlayFill,
} from "react-icons/bs";

export default function Home({ audio }) {
  const waveformRef = useRef(null);
  const wavesurferRef = useRef(null);
  const [playPause, setPlayPause] = useState(false);
  const saudio = audio;
  
    

  useEffect(() => {
    wavesurferRef.current = WaveSurfer.create({
      
      container: waveformRef.current,
      waveColor: "#34374B",
      progressColor: "#F90",
      url: saudio,
      dragToSeek: true,
      width: "40vw",
      
      hideScrollbar: true,
      normalize: true,
      barGap: 1,
      height: 60,
      barHeight: 50,
      barRadius: 20,
      barWidth: 3,
      
    });

    // wavesurferRef.current.load(audio);

    wavesurferRef.current.on("finish", () => {
      console.log("song finished");
      setPlayPause(false); // Reset playPause state when song finishes
    });

    wavesurferRef.current.on("ready", () => {
      console.log("Waveform is ready");
    });

    return () => {
      wavesurferRef.current.destroy();
    };
  }, []);


  const handlePause = () => {
    if (wavesurferRef.current) {
      wavesurferRef.current.playPause();
      setPlayPause(!playPause);
    }
  };

  return (
    <div className="cont">
      
         <button onClick={handlePause}>
            {playPause ? <BsFillStopFill /> : <BsFillPlayFill />}
          </button>
          <div ref={waveformRef} className="wavesurfer-container" />
        </div>
      
  );
}
