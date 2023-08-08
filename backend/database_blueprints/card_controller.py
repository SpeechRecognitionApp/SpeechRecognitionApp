from flask import Blueprint, request, jsonify
from .models import Card, Contact
import json

card_controller = Blueprint('card_controller', __name__)

@card_controller.route('/card/verify_pin', methods=['POST'])
def verify_pin():
    data = request.get_json()
    card_number = data.get('card_number')
    pin = int(data.get('pin'))

    # 查找与给定卡号匹配的卡
    card = Card.objects(card_number=card_number).first()

    if not card:
        return jsonify({'message': 'Card not found'}), 404

    # 检查PIN是否匹配
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
    return jsonify(card.to_json()), 200

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
    # Extract card_number and deposit_amount from request data
    card_number = data.get('card_number')
    deposit_amount = float(data.get('deposit_amount'))  # Convert deposit amount to float

    # Fetch the card based on card_number
    card = Card.objects(card_number=card_number).first()
    if not card:
        return jsonify({'message': 'Card not found'}), 404

    # Update the balance
    new_balance = float(card.balance) + deposit_amount  # Convert card balance to float and add deposit amount
    card.update(balance=str(new_balance))  # Convert back to string if you want to keep balance as string in DB

    return jsonify({'message': 'Deposit successful', 'new_balance': new_balance}), 200


@card_controller.route('/withdraw', methods=['POST'])
def withdraw():
    data = request.get_json()

    # Extract card_number and withdraw_amount from request data
    card_number = data.get('card_number')
    withdraw_amount = float(data.get('withdraw_amount'))  # Convert withdraw amount to float

    # Fetch the card based on card_number
    card = Card.objects(card_number=card_number).first()
    if not card:
        return jsonify({'message': 'Card not found'}), 404

    current_balance = float(card.balance)  # Convert card balance to float

    # Check if there's enough balance
    if withdraw_amount > current_balance:
        return jsonify({'message': 'Insufficient balance'}), 400

    # Update the balance
    new_balance = current_balance - withdraw_amount
    card.update(balance=str(new_balance))  # Convert back to string if you want to keep balance as string in DB

    return jsonify({'message': 'Withdrawal successful', 'new_balance': new_balance}), 200


@card_controller.route('/transfer', methods=['POST'])
def transfer():
    data = request.get_json()

    # Extract card_number, contact_id and transfer_amount from request data
    card_number = data.get('card_number')
    contact_id = data.get('contact_id')
    transfer_amount = float(data.get('transfer_amount'))  # Convert transfer amount to float

    # Fetch the card based on card_number
    card = Card.objects(card_number=card_number).first()
    if not card:
        return jsonify({'message': 'Card not found'}), 404

    # Check if the contact_id exists in the Contact collection
    contact = Contact.objects(contact_id=contact_id).first()
    if not contact:
        return jsonify({'message': 'Contact not found'}), 404

    current_balance = float(card.balance)  # Convert card balance to float

    # Check if there's enough balance
    if transfer_amount > current_balance:
        return jsonify({'message': 'Insufficient balance'}), 400

    # Update the balance
    new_balance = current_balance - transfer_amount
    card.update(balance=str(new_balance))  # Convert back to string if you want to keep balance as string in DB

    # In this example, we don't add the transferred amount to the contact's card.
    # But if needed, you can fetch the contact's card and update its balance here.

    return jsonify({'message': 'Transfer successful', 'new_balance': new_balance}), 200
