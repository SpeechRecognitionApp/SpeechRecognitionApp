import os
import wave
import json
import subprocess
import time
import pyaudio
from vosk import Model, KaldiRecognizer
from word2number import w2n

# Load the Vosk model
model = Model(lang="en-us")


def constant_voice():
    recognizer = KaldiRecognizer(model,16000)
    mic = pyaudio.PyAudio()
    stream = mic.open(format=pyaudio.paInt16, channels=1, rate=16000, input=True, frames_per_buffer=8192)

    while True:
        data = stream.read(4096)
        if recognizer.AcceptWaveform(data):
            text = recognizer.Result()
            result = extract_text_and_check_for_keywords(text)
            print(result)
            yield result  # use yield instead of print
            # if result:
            #     # Emit recognized text to frontend via WebSocket
            #     socketio.emit('recognized_text', result)

def transcribe_audio(file):
    # Printing file name and MIME type
    print("File name:", file.filename)
    print("MIME type:", file.mimetype)

    # Adding a timestamp to the filename to make it unique
    timestamp = int(time.time())
    unique_filename = f"received_audio_{timestamp}.webm"
    converted_filename = f"converted_audio_{timestamp}.wav"

    # Save the file to disk with the unique filename
    file_path = os.path.join("C:/Users/minha/Downloads", unique_filename)
    file.save(file_path)

    # Convert audio format using ffmpeg
    output_path = os.path.join("C:/Users/minha/Downloads", converted_filename)
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

    # result = extract_text_and_check_for_keywords(final_result)
    # print(result)
    if final_result:
        return final_result
    return None


def extract_text_and_check_for_keywords(data_json):
    data = json.loads(data_json)
    # print(data)
    text = data.get("text", "")
    words = text.split()
    # print(words)

    # 尝试将输入文本转换为数字
    try:
        number = w2n.word_to_num(text)
        return json.dumps({"text": number})
    except ValueError:
        # 输入文本无法转换为数字
        pass

    if "transfer" in words:
        return json.dumps({"text": "transfer"})
    if "select" in words:
        return json.dumps({"text": "select"})
    if "confirm" in words:
        return json.dumps({"text": "confirm"})
    if "withdraw" in words:
        return json.dumps({"text": "withdraw"})
    if "deposit" in words:
        return json.dumps({"text": "deposit"})
    if "before" in words:
        return json.dumps({"text": "before"})
    if "create" in words:
        return json.dumps({"text": "create"})
    if "transaction" in words:
        return json.dumps({"text":"transaction"})
    if "assistant" in words:
        return json.dumps({"text": "assistant"})
    if "back" in words:
        return json.dumps({"text": "back"})
    if "forward" in words:
        return json.dumps({"text": "forward"})
    if "home" in words:
        return json.dumps({"text": "home"})
    if "send" in words:
        return json.dumps({"text": "send"})
    if "first" in words:
        return json.dumps({"text": "first"})
    if "last" in words:
        return json.dumps({"text": "last"})
    if "email" in words:
        return json.dumps({"text": "email"})
    if "line" in words:
        return json.dumps({"text": "line"})
    if "house" in words:
        return json.dumps({"text": "house"})
    if "post" in words:
        return json.dumps({"text": "post"})
    if "reset" in words:
        return json.dumps({"text": "reset"})
    if "code" in words:
        return json.dumps({"text": "code"})
    if "account" in words:
        return json.dumps({"text": "account"})
    if "account" in words:
        return json.dumps({"text": "account"})
    if "reference" in words:
        return json.dumps({"text": "reference"})
    if "description" in words:
        return json.dumps({"text": "description"})

    transactions_command = ["transaction", "history", "records", "transaction history"]
    transfer_commands = ["send", "money", "to"]
    account_commands = ["account", "management", "account management", "manage"]

    if any(command in words for command in transactions_command):
        return json.dumps({"text": "transaction"})
    if all(command in words for command in transfer_commands):
        return json.dumps({"text": "transfer"})
    if any(command in words for command in account_commands):
        return json.dumps({"text": "account"})

    # 如果以上条件都不满足，返回一个错误消息
    return json.dumps({"error": f"You said {words} - incorrect voice command"})
