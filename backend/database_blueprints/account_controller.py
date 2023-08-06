from flask import Blueprint, request, jsonify
from .models import Account

account_controller = Blueprint('account_controller', __name__)

@account_controller.route('/account', methods=['POST'])
def create_account():
    data = request.get_json()
    new_account = Account(
        user_id=data['user_id'],
        account_number=data['account_number'],
        balance=data['balance']
    )
    new_account.save()
    return jsonify({'message': 'Account created successfully'}), 201

@account_controller.route('/account/<account_number>', methods=['GET'])
def get_account(account_number):
    account = Account.objects(account_number=account_number).first()
    if not account:
        return jsonify({'message': 'Account not found'}), 404
    return jsonify(account.to_json()), 200

@account_controller.route('/account/<account_number>', methods=['PUT'])
def update_account(account_number):
    data = request.get_json()
    Account.objects(account_number=account_number).update_one(set__balance=data['balance'])
    return jsonify({'message': 'Account updated successfully'}), 200

@account_controller.route('/account/<account_number>', methods=['DELETE'])
def delete_account(account_number):
    Account.objects(account_number=account_number).delete()
    return jsonify({'message': 'Account deleted successfully'}), 200
