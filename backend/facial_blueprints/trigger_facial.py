from flask import Blueprint, request, jsonify
import subprocess

trigger_facial = Blueprint('trigger_facial', __name__)



def trigger_facial():
    try:
        # Use raw string literal to handle backslashes
        exe_path = r'C:\Users\minha\AppData\Roaming\Microsoft\Windows\Start Menu\Programs\UCL MotionInput v3.lnk'
        result = subprocess.run([exe_path], stdout=subprocess.PIPE)

        return jsonify({'message': 'Exe file executed successfully', 'output': result.stdout.decode('utf-8')})
    except Exception as e:
        return jsonify({'message': 'An error occurred', 'error': str(e)})
