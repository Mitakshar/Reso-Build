import sys
import os
from spleeter.separator import Separator

def separate_stems(input_audio, output_directory, num_stems):
    # Create output directory if it doesn't exist
    if not os.path.exists(output_directory):
     os.makedirs(output_directory)
    
    # Initialize Spleeter separator
    separator = Separator(f"spleeter:{num_stems}stems")
    
    # Perform separation
    separator.separate_to_file(input_audio, output_directory)

   

if __name__ == "__main__":
    input_audio_file = sys.argv[1]
    output_directory = sys.argv[2]
    # input_audio_file = r'D:\BEATS\My Beats\Swastik Rap.mp3'
    # output_directory = r'D:\Mitakshara Ramananda Hegde'

    num_stems = 4  # Modify to separate 4 stems
    
    separate_stems(input_audio_file, output_directory, num_stems)

    


    
