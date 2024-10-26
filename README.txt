Overview:

Reso-Blend is a powerful tool designed for full-scale LUFS (Loudness Units Relative to Full Scale) analysis and audio stem isolation. With its intuitive user interface, Reso-Blend allows users to analyze audio files in various formats and extract individual stems with precision. The project is built using React for the frontend and PHP for the backend, ensuring seamless integration and robust functionality.

Features:

Full-scale LUFS Analysis:
Perform comprehensive LUFS analysis on audio files to ensure compliance with loudness standards.
Gain insights into the loudness levels of your audio content across different platforms and formats.

Audio Stem Isolation:
Utilize advanced algorithms to isolate individual stems from audio tracks.
Extract vocals, instruments, or other elements from mixed audio with high accuracy.

Installation:
  Frontend : 
    Navigate to the project directory(/resobuild) and install frontend dependencies using npm install command
    make sure to install wavesurfer.js

  Backend :
    Install Python and PHP
    Install FFmpeg and the following python libraries : 1)librosa
                                                        2)pyloudnorm
                                                        3)numpy

Run the Application:
    Navigate to the PHP server folder i.e "/resobuild/PHP" and run the command "php -S localhost:8000 -t public"

    Then Navigate to the Root directory i.e "/resobuild" and run the command "npm start"
  
    Also make sure to run this command before starting the App "python -m http.server 8080"

Credits:
Reso-Blend was created by Mitakshara R Hegde. Special thanks to the open-source community for their invaluable contributions and support.

  