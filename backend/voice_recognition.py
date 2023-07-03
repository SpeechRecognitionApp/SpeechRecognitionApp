import os
import wave
import json
import subprocess
from vosk import Model, KaldiRecognizer

# Load the Vosk model
model = Model(lang="en-us")

def transcribe_audio(file):

    # Printing file name and MIME type
    print("File name:", file.filename)
    print("MIME type:", file.mimetype)

    # Save the file to disk
    file_path = os.path.join("/Users/junwei/Downloads", "received_audio.webm")
    file.save(file_path)

    # Convert audio format using ffmpeg
    output_path = os.path.join("/Users/junwei/Downloads", 'converted_audio.wav')
    subprocess.run(['ffmpeg', '-i', file_path, output_path])

    # Process the audio file with Vosk
    wf = wave.open(output_path, "rb")
    recognizer = KaldiRecognizer(model, wf.getframerate())
    recognizer.SetWords(True)
    recognizer.SetPartialWords(True)

    while True:
        data = wf.readframes(4000)
        if len(data) == 0:
            break
        if recognizer.AcceptWaveform(data):
            print(recognizer.Result())
        else:
            print(recognizer.PartialResult())

    final_result = recognizer.FinalResult()
    print(final_result)

    return final_result
