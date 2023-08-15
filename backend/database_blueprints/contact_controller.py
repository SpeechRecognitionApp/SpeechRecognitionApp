from flask import Blueprint, request, jsonify
from .models import Contact
import json

contact_controller = Blueprint('contact_controller', __name__)


@contact_controller.route('/contact', methods=['POST'])
def create_contact():
    data = request.get_json()
    new_contact = Contact(
        first_name=data['first_name'],
        second_name=data['second_name'],
        account_number=data['account_number'],
        user_id=data['user_id'],
        sort_code=data['sort_code'],
        description=data.get('description', None),
        reference=data.get('reference', None)
    )
    new_contact.save()
    return jsonify({'message': 'Contact created successfully'}), 201


@contact_controller.route('/contact/<contact_id>', methods=['GET'])
def get_contact(contact_id):
    contact = Contact.objects(contact_id=contact_id).first()
    if not contact:
        return jsonify({'message': 'Contact not found'}), 404
    return jsonify(json.loads(contact.to_json())), 200

@contact_controller.route('/contacts/user/<user_id>', methods=['GET'])
def get_contacts_by_user(user_id):
    if not user_id:
        return jsonify({'message': 'user_id parameter is required'}), 400
    contacts = Contact.objects(user_id=user_id)
    if not contacts:
        return jsonify({'message': 'No contacts found for this user'}), 404
    return jsonify([json.loads(contact.to_json()) for contact in contacts]), 200


@contact_controller.route('/contact/<contact_id>', methods=['PUT'])
def update_contact(contact_id):
    data = request.get_json()
    Contact.objects(contact_id=contact_id).update_one(set__name=data['name'], set__email=data['email'])
    return jsonify({'message': 'Contact updated successfully'}), 200


@contact_controller.route('/contact/<contact_id>', methods=['DELETE'])
def delete_contact(contact_id):
    Contact.objects(contact_id=contact_id).delete()
    return jsonify({'message': 'Contact deleted successfully'}), 200
