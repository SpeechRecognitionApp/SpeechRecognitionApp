from flask import Blueprint, request, jsonify
from .models import Contact

contact_controller = Blueprint('contact_controller', __name__)

@contact_controller.route('/contact', methods=['POST'])
def create_contact():
    data = request.get_json()
    new_contact = Contact(
        user_id=data['user_id'],
        contact_id=data['contact_id'],
        name=data['name'],
        email=data['email']
    )
    new_contact.save()
    return jsonify({'message': 'Contact created successfully'}), 201

@contact_controller.route('/contact/<contact_id>', methods=['GET'])
def get_contact(contact_id):
    contact = Contact.objects(contact_id=contact_id).first()
    if not contact:
        return jsonify({'message': 'Contact not found'}), 404
    return jsonify(contact.to_json()), 200

@contact_controller.route('/contact/<contact_id>', methods=['PUT'])
def update_contact(contact_id):
    data = request.get_json()
    Contact.objects(contact_id=contact_id).update_one(set__name=data['name'], set__email=data['email'])
    return jsonify({'message': 'Contact updated successfully'}), 200

@contact_controller.route('/contact/<contact_id>', methods=['DELETE'])
def delete_contact(contact_id):
    Contact.objects(contact_id=contact_id).delete()
    return jsonify({'message': 'Contact deleted successfully'}), 200
