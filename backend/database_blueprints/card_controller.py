from flask import Blueprint, request, jsonify
from .models import Card

card_controller = Blueprint('card_controller', __name__)

@card_controller.route('/card', methods=['POST'])
def create_card():
    data = request.get_json()
    new_card = Card(
        user_id=data['user_id'],
        card_number=data['card_number'],
        cvv=data['cvv'],
        expiry_date=data['expiry_date']
    )
    new_card.save()
    return jsonify({'message': 'Card created successfully'}), 201

@card_controller.route('/card/<card_number>', methods=['GET'])
def get_card(card_number):
    card = Card.objects(card_number=card_number).first()
    if not card:
        return jsonify({'message': 'Card not found'}), 404
    return jsonify(card.to_json()), 200

@card_controller.route('/card/<card_number>', methods=['PUT'])
def update_card(card_number):
    data = request.get_json()
    Card.objects(card_number=card_number).update_one(set__cvv=data['cvv'], set__expiry_date=data['expiry_date'])
    return jsonify({'message': 'Card updated successfully'}), 200

@card_controller.route('/card/<card_number>', methods=['DELETE'])
def delete_card(card_number):
    Card.objects(card_number=card_number).delete()
    return jsonify({'message': 'Card deleted successfully'}), 200
