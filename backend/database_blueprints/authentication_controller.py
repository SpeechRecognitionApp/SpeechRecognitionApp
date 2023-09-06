from flask import Blueprint, request, jsonify
from .models import Authentication
import json

authentication_controller = Blueprint('authentication_controller', __name__)

@authentication_controller.route('/insert_card', methods=['POST'])
def insert_card():
    data = request.json
    user_id = data['user_id']
    card_id = data['card_id']
    auth = Authentication(user_id=user_id, card_id=card_id)
    auth.save()
    return jsonify({"message": "Card inserted successfully"}), 201

@authentication_controller.route('/check_login_status/', methods=['GET'])
def check_login_status():
    auth = Authentication.objects().first()
    return jsonify({"is_login": auth.is_login}), 200

@authentication_controller.route('/login_success', methods=['PUT'])
def login_success():
    auth = Authentication.objects().first()
    auth.update(set__is_login="1")
    return jsonify({"message": "Login successful"}), 200

@authentication_controller.route('/login_fail', methods=['PUT'])
def login_fail():
    auth = Authentication.objects().first()
    fail_count = int(auth.fail_count) + 1
    if fail_count >= 4:
        auth.update(set__isFrozen="1", set__fail_count="0")
    else:
        auth.update(set__fail_count=str(fail_count))
    return jsonify({"message": "Login failed"}), 200

@authentication_controller.route('/check_frozen_status', methods=['GET'])
def check_frozen_status():
    auth = Authentication.objects().first()
    return jsonify({"isFrozen": auth.isFrozen}), 200


@authentication_controller.route('/get_current_card', methods=['GET'])
def get_current_card():
    auth = Authentication.objects().first()
    if auth:
        return jsonify({"user_id": auth.user_id, "card_id": auth.card_id}), 200
    else:
        return jsonify({"message": "No card found"}), 404

@authentication_controller.route('/logout', methods=['DELETE'])
def logout():
    Authentication.objects().delete()
    return jsonify({"message": "Logged out and card removed"}), 200
