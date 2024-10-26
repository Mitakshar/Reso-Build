// WaveformComponent.js
import React, { useState } from "react";
import WaveSurfer from "react-wavesurfer";

const WaveformComponent = ({audioFile}) => {
  const [playing, setPlaying] = useState(false);

  const handleTogglePlay = () => {
    setPlaying(!playing);
  };

  return (
    <div>
      <h1>React Wavesurfer Example</h1>
      <WaveSurfer
        audioFile={audioFile} // Use the imported audio file
        playing={playing}
        onTogglePlay={handleTogglePlay}
        options={{
          waveColor: "violet",
          progressColor: "purple",
          cursorWidth: 1,
          barWidth: 2,
          barRadius: 3,
          cursorColor: "navy",
        }}
      />
      <button onClick={handleTogglePlay}>
        {playing ? "Pause" : "Play"}
      </button>
    </div>
  );
};

export default WaveformComponent;
