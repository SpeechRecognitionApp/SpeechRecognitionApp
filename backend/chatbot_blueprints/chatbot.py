from flask import Blueprint, request, jsonify
import json
from . import config
from ibm_watson import AssistantV2, ApiException
from ibm_cloud_sdk_core.authenticators import IAMAuthenticator



chatbot = Blueprint('chatbot', __name__)



environment_id ='d7424110-25f5-41cc-b36f-2125ac788404'

authenticator = IAMAuthenticator(config.api_key)
assistant = AssistantV2(
    version='2018-09-20',
    authenticator=authenticator
)

assistant.set_service_url('https://api.eu-gb.assistant.watson.cloud.ibm.com')

global_session_id = None

@chatbot.route("/new_session", methods=["GET"])
def new_session():
    global global_session_id
    session = assistant.create_session(
        assistant_id=environment_id
    ).get_result()
    global_session_id = session['session_id']
    return jsonify({"session_id": global_session_id})


@chatbot.route("/send_message",methods=["POST"])
def send_message():
    data = request.get_json()
    user_message = data["message"]
    session_id = data["session_id"] if "session_id" in data else global_session_id

    if not session_id:
        return jsonify({"response": "No session ID"}), 400
    print("Received message:", user_message)
    print("This is the session id:",session_id)
    # Send user message to the chatbot
    response = assistant.message(
        assistant_id=environment_id,
        session_id=session_id,
        input={
            'message_type': 'text',
            'text': user_message
        }
    ).get_result()

    # Get chatbot's response
    watson_response = response['output']['generic'][0]
    print(watson_response)

 
    return jsonify({"response":watson_response})






