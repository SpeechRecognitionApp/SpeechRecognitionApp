import os
import wave
import json
import subprocess
import time
from vosk import Model, KaldiRecognizer

# Load the Vosk model
model = Model(lang="en-us")


def transcribe_audio(file):
    # Printing file name and MIME type
    print("File name:", file.filename)
    print("MIME type:", file.mimetype)

    # Adding a timestamp to the filename to make it unique
    timestamp = int(time.time())
    unique_filename = f"received_audio_{timestamp}.webm"
    converted_filename = f"converted_audio_{timestamp}.wav"

    # Save the file to disk with the unique filename
    file_path = os.path.join("/Users/junwei/Downloads", unique_filename)
    file.save(file_path)

    # Convert audio format using ffmpeg
    output_path = os.path.join("/Users/junwei/Downloads", converted_filename)
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

    result = extract_text_and_check_for_transfer(final_result)
    print(result)
    if result:
        return result
    return None


def extract_text_and_check_for_transfer(data_json):
    # 解析 JSON 数据
    data = json.loads(data_json)
    print(data)
    # 提取 text 字段的内容
    text = data.get("text", "")

    # 将 text 字段的内容分割成单词
    words = text.split()
    print(words)

    # 检查是否包含 "transfer" 这个单词
    if "transfer" in words:
        return json.dumps({"text": "transfer"})
    if "withdraw" in words:
        return json.dumps({"text": "withdraw"})
    else:
        return None
