from flask import Blueprint, request, jsonify
from .models import Transaction

transaction_controller = Blueprint('transaction_controller', __name__)

@transaction_controller.route('/transaction', methods=['POST'])
def create_transaction():
    data = request.get_json()
    new_transaction = Transaction(
        user_id=data['user_id'],
        transaction_id=data['transaction_id'],
        type=data['type'],
        amount=data['amount']
    )
    new_transaction.save()
    return jsonify({'message': 'Transaction created successfully'}), 201

@transaction_controller.route('/transaction/<transaction_id>', methods=['GET'])
def get_transaction(transaction_id):
    transaction = Transaction.objects(transaction_id=transaction_id).first()
    if not transaction:
        return jsonify({'message': 'Transaction not found'}), 404
    return jsonify(transaction.to_json()), 200

@transaction_controller.route('/transaction/<transaction_id>', methods=['PUT'])
def update_transaction(transaction_id):
    data = request.get_json()
    Transaction.objects(transaction_id=transaction_id).update_one(set__type=data['type'], set__amount=data['amount'])
    return jsonify({'message': 'Transaction updated successfully'}), 200

@transaction_controller.route('/transaction/<transaction_id>', methods=['DELETE'])
def delete_transaction(transaction_id):
    Transaction.objects(transaction_id=transaction_id).delete()
    return jsonify({'message': 'Transaction deleted successfully'}), 200
