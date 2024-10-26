import axios from "axios";
import { useState, useEffect } from "react";
import './analysis.css';
import HashLoader from "react-spinners/HashLoader";
import Waveform from "./Waveform";
import audioo from "./one.wav";

const Analysis = () => {
    const [file, setFile] = useState(null);
    const [originalLoudness, setOriginalLoudness] = useState(null);
    const [integratedLoudness, setIntegratedLoudness] = useState(null);
    const [audioUrl, setAudioUrl] = useState(null);
    const [truepeak, setTruepeak] = useState(null);
    const [gainreduction, setGainreduction] = useState(null);
    const [samplerate, setSamplerate] = useState(null);
    const [bitdepth, setBitdepth] = useState(null);
    const [finurl, setFinurl] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [showResult, setShowResult] = useState(false);
    
    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
    };

    const baseul = "http://localhost:8000";

    useEffect(() => {
        if (finurl) {
            setShowResult(true); // Show result component when finurl is set
        }
    }, [finurl]);

    const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent page reload
    const formData = new FormData();
    formData.append("audio_file", file);
    setIsLoading(true);
    setShowResult(false);

    try {
        const response = await axios.post("http://localhost:8000/server.php", formData, { mode: 'no-cors' });
        console.log("Response:", response);

        const data = response.data;

        if (data) {
            const finalLoudness = data.output.final_loudness;
            const normalizedFile = data.output.normalized_file;
            const originalLoudness = data.output.original_loudness;
            const truepeak = data.output.true_peak;
            const gainreduction = data.output.gain_reduction;
            const samplerate = data.output.sample_rate;
            const bitdepth = data.output.bit_depth;
            
            setAudioUrl(process.env.PUBLIC_URL + '/output/normalized_output.wav');
            setIntegratedLoudness(finalLoudness);
            setOriginalLoudness(originalLoudness);
            setTruepeak(truepeak);
            setGainreduction(gainreduction);
            setSamplerate(samplerate);
            setBitdepth(bitdepth);

            setFinurl(baseul + normalizedFile);
            console.log(finurl);
        } else {
            console.error("No data received");
        }
    } catch (error) {
        console.error("Error:", error);
    } finally {
        setIsLoading(false);
    }
    const aud = process.env.PUBLIC_URL + '/output/normalized_output.wav';
};
    

    return (
        <>
            <h1>LUFS Analysis</h1>
            <div className="containerbox">
                {isLoading && (
                    <div className="loader">
                        <HashLoader
                            color="hsla(169, 93%, 54%, 1)"
                            size={100}
                            speedMultiplier={1}
                        />
                    </div>
                )}
                {!isLoading && !showResult && (
                    <div className="Upload">
                        <h2>Upload your song (wav/mp3)</h2>
                        <form onSubmit={handleSubmit} encType="multipart/form-data">
                            <label htmlFor="audio_file">Select an audio file:</label>
                            <input type="file" id="audio_file" accept=".mp3, .wav" onChange={handleFileChange} required />
                            <button type="submit">Upload</button>
                        </form>
                    </div>
                )}
                {!isLoading && showResult && (
                    <div className="Result">
                        <div className="Resultblock">
                            <p>Original Loudness(LUFS) :<a> {originalLoudness}</a></p>
                        </div>
                        <div className="Resultblock">
                            <p>Integrated Loudness(LUFS): <a>{integratedLoudness}</a></p>
                        </div>
                        <div className="Resultblock">
                            <p>True peak (dBTP):<a> {truepeak}</a></p>
                        </div>
                        <div className="Resultblock">
                            <p>Gain Reduction (dB):<a> {gainreduction}</a></p>
                        </div>
                        <div className="Resultblock">
                            <p>Sample rate :<a> {samplerate / 1000 + 'kHz'}</a></p>
                        </div>
                        <div className="Resultblock">
                            <p>Bit Depth:<a> {bitdepth + "bit"}</a></p>
                        </div>
                    </div>
                )}
                {finurl && (
                    <div className="audio-player"><p>normalized audio</p>
                        <Waveform audio={audioo} />
                    </div>
                )}
            </div>
        </>
    );
};

export default Analysis;