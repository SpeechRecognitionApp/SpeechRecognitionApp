from flask import Blueprint, request, jsonify
from .models import User
import json

user_controller = Blueprint('user_controller', __name__)

@user_controller.route('/user', methods=['POST'])
def create_user():
    data = request.get_json()
    new_user = User(
        first_name=data['first_name'],
        second_name = data['second_name'],
        email=data['email'],
        house_name=data.get('house_name', None),
        street_line=data.get('street_line', None),
        postcode=data.get('postcode', None)
    )
    new_user.save()
    return jsonify({'message': 'User created successfully'}), 201

@user_controller.route('/user/<user_id>', methods=['GET'])
def get_user(user_id):
    user = User.objects(user_id=user_id).first()
    if not user:
        return jsonify({'message': 'User not found'}), 404
    user_dict = json.loads(user.to_json())
    return jsonify(user_dict), 200

@user_controller.route('/user/<user_id>', methods=['PUT'])
def update_user(user_id):
    data = request.get_json()
    User.objects(user_id=user_id).update_one(set__name=data['name'], set__email=data['email'])
    return jsonify({'message': 'User updated successfully'}), 200

@user_controller.route('/user/<user_id>', methods=['DELETE'])
def delete_user(user_id):
    User.objects(user_id=user_id).delete()
    return jsonify({'message': 'User deleted successfully'}), 200
