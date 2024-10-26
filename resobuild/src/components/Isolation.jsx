import React, { useState } from 'react';
import axios from 'axios';
import './isolation.css';
import Waveform from "./Waveform";
import HashLoader from "react-spinners/HashLoader";
const base = "http://localhost:8000/";

const Isolation = () => {
    const [file, setFile] = useState(null);
    const [audioUrl, setAudioUrl] = useState(null);
    const [outputdir, setOutputDir] = useState(null);
    const [uploadedaudio, setUploadedAudio] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
    };

    const handleUpload = async (event) => {
        event.preventDefault();
        setLoading(true); // Show loading component

        const formData = new FormData();
        formData.append("audio_file", file);

        try {
            const response = await axios.post("http://localhost:8000/isolate.php", formData);
            const data = response.data;

            if (data) {
                setAudioUrl(data.URL);
                setOutputDir(data.Content);
                setUploadedAudio(data.original_audio);
            } else {
                console.log("No data received");
            }
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false); // Hide loading component after processing
        }
    };

    return (
        <>
            <h1>Audio Stem Isolation</h1>
            <div className='Isolation'>
                {!loading && !audioUrl && (
                    <div>
                        <h2>Upload Your Song (wav/mp3)</h2>
                        <form onSubmit={handleUpload} encType="multipart/form-data">
                            <label htmlFor="audio_file">Select an audio file:</label>
                            <input type="file" id="audio_file" accept=".mp3, .wav, .ogg" onChange={handleFileChange} required />
                            <button type="submit">Upload</button>
                        </form>
                    </div>
                )}

                {loading && <div className="loader">
                        <HashLoader
                            color="hsla(169, 93%, 54%, 1)"
                            size={100}
                            speedMultiplier={1}
                        />
                    </div>}

                {audioUrl && (
                    <div className='Audiocontainer'>
                        <p>Original Audio</p>
                        <audio className='player' controls>
                            <source src={`http://localhost:8000/${uploadedaudio}`} type="audio/wav" />
                            Your browser does not support the audio element.
                        </audio>
                        <p>BASS</p>
                   <audio  className='player'controls>
                    <source src={`http://localhost:8000/${audioUrl}${outputdir}/bass.wav`} type="audio/wav" />
                    Your browser does not support the audio element.
                   </audio>
                    
                   <p>DRUMS</p> 
                   <audio className='player' controls>
                   <source src={`http://localhost:8000/${audioUrl}${outputdir}/drums.wav`} type="audio/wav" />
                   Your browser does not support the audio element.
                   </audio>

                   <p>OTHERS</p>
                   <audio className='player'controls>
                   <source src={`http://localhost:8000/${audioUrl}${outputdir}/other.wav`} type="audio/wav" />
                   Your browser does not support the audio element.
                   </audio>

                   <p>VOCALS</p>
                   <audio className='player'controls>
                   <source src={`http://localhost:8000/${audioUrl}${outputdir}/vocals.wav`} type="audio/wav" />
                   Your browser does not support the audio element.
                   </audio>
                    </div>
                )}
            </div>
        </>
    );
};

export default Isolation;
