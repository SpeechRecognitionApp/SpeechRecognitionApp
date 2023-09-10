from flask import Blueprint, request, jsonify
from .models import Card, Contact
import json

card_controller = Blueprint('card_controller', __name__)

@card_controller.route('/card/verify_pin', methods=['POST'])
def verify_pin():
    data = request.get_json()
    print(data)
    card_id = data.get('card_id')
    pin = int(data.get('pin'))
    card = Card.objects(card_id=card_id).first()
    if not card:
        return jsonify({'message': 'Card not found'}), 404
    if card.pin == pin:
        return jsonify({'match': True}), 200
    else:
        return jsonify({'match': False}), 200

@card_controller.route('/card', methods=['POST'])
def create_card():
    data = request.get_json()
    new_card = Card(
        card_number=data['card_number'],
        pin=data['pin'],
        expiry_date=data['expiry_date'],
        user_id=data['user_id'],
        balance=data['balance']
    )
    new_card.save()
    return jsonify({'message': 'Card created successfully'}), 201

@card_controller.route('/card/<card_number>', methods=['GET'])
def get_card(card_number):
    card = Card.objects(card_number=card_number).first()
    if not card:
        return jsonify({'message': 'Card not found'}), 404
    return jsonify(json.loads(card.to_json())), 200

@card_controller.route('/cards/user/<user_id>', methods=['GET'])
def get_cards_by_user(user_id):
    cards = Card.objects(user_id=user_id)
    if not cards:
        return jsonify({'message': 'No cards found for this user'}), 404
    return jsonify([json.loads(card.to_json()) for card in cards]), 200

@card_controller.route('/card/<card_number>', methods=['PUT'])
def update_card(card_number):
    data = request.get_json()
    Card.objects(card_number=card_number).update_one(set__cvv=data['cvv'], set__expiry_date=data['expiry_date'])
    return jsonify({'message': 'Card updated successfully'}), 200

@card_controller.route('/card/<card_number>', methods=['DELETE'])
def delete_card(card_number):
    Card.objects(card_number=card_number).delete()
    return jsonify({'message': 'Card deleted successfully'}), 200

@card_controller.route('/deposit', methods=['POST'])
def deposit():
    data = request.get_json()
    card_number = data.get('card_number')
    deposit_amount = float(data.get('deposit_amount'))
    card = Card.objects(card_number=card_number).first()
    if not card:
        return jsonify({'message': 'Card not found'}), 404
    new_balance = float(card.balance) + deposit_amount
    card.update(balance=str(new_balance))
    return jsonify({'message': 'Deposit successful', 'new_balance': new_balance}), 200

@card_controller.route('/withdraw', methods=['POST'])
def withdraw():
    data = request.get_json()
    card_number = data.get('card_number')
    withdraw_amount = float(data.get('withdraw_amount'))  # Convert withdraw amount to float
    card = Card.objects(card_number=card_number).first()
    if not card:
        return jsonify({'message': 'Card not found'}), 404
    current_balance = float(card.balance)
    if withdraw_amount > current_balance:
        return jsonify({'message': 'Insufficient balance'}), 400
    new_balance = current_balance - withdraw_amount
    card.update(balance=str(new_balance))
    return jsonify({'message': 'Withdrawal successful', 'new_balance': new_balance}), 200

@card_controller.route('/transfer', methods=['POST'])
def transfer():
    data = request.get_json()
    card_number = data.get('card_number')
    contact_id = data.get('contact_id')
    transfer_amount = float(data.get('transfer_amount'))
    card = Card.objects(card_number=card_number).first()
    if not card:
        return jsonify({'message': 'Card not found'}), 404
    contact = Contact.objects(contact_id=contact_id).first()
    if not contact:
        return jsonify({'message': 'Contact not found'}), 404
    current_balance = float(card.balance)
    if transfer_amount > current_balance:
        return jsonify({'message': 'Insufficient balance'}), 400
    new_balance = current_balance - transfer_amount
    card.update(balance=str(new_balance))
    return jsonify({'message': 'Transfer successful', 'new_balance': new_balance}), 200
