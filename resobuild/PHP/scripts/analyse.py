import sys
import pyloudnorm
import soundfile as sf
import json
import librosa
import numpy as np

def normalize_audio(input_file, target_loudness, frame_length=2048,hop_length=512):
    
    # Load the audio file
    audio, sr = sf.read(input_file)
    
   
    meter = pyloudnorm.Meter(sr)
    current_loudness = meter.integrated_loudness(audio)
    gain_adjustment = target_loudness - current_loudness
    normalized_audio = audio * (10 ** (gain_adjustment / 20))
    
    true_peak = abs(audio).max()
    
    with sf.SoundFile(input_file) as f:
        # Read the entire file
        data = f.read()
        # Calculate the bit depth
        bit_depth = data.dtype.itemsize * 8
    
    normalized_file = "/output/normalized_output.wav"
    sf.write(normalized_file, normalized_audio, sr)
    
    
    final_loudness = float(meter.integrated_loudness(normalized_audio))
    
    #Calculate gain reduction in dB
    true_peak2 = abs(normalized_audio).max()
    gain_reduction =true_peak2-true_peak
    
    

    result = {
        'original_loudness': current_loudness,
        'final_loudness': final_loudness,
        'normalized_file': normalized_file,
        'true_peak' : true_peak,
        'gain_reduction' : gain_reduction,
        'sample_rate' : sr,
        'bit_depth' : bit_depth
       }

    return result

if __name__ == "__main__":
    if len(sys.argv) != 3:
        print("Usage: script.py <input_audio_file> <target_loudness>")
        sys.exit(1)

    input_audio_file = sys.argv[1]
    target_loudness = float(sys.argv[2])
   
    output_result = normalize_audio(input_audio_file, target_loudness)

    # Print the result as JSON to be captured by PHP
    print(json.dumps(output_result))

