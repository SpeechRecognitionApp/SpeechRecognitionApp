from flask import Blueprint, request, jsonify
import subprocess

trigger_facial = Blueprint('trigger_facial', __name__)
@trigger_facial.route('/trigger_facial', methods=['POST'])
def trigger_facial():
    try:
        #  .exe
        result = subprocess.run(['path_to_your_exe_file'], stdout=subprocess.PIPE)
        #
        return jsonify({'message': 'Exe file executed successfully', 'output': result.stdout.decode('utf-8')})
    except Exception as e:
        return jsonify({'message': 'An error occurred', 'error': str(e)})
