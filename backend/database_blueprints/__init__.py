from flask import Blueprint

from .user_controller import user_controller
from .contact_controller import contact_controller
from .account_controller import account_controller
from .card_controller import card_controller
from .transaction_controller import transaction_controller

controllers = Blueprint('controllers', __name__)

controllers.register_blueprint(user_controller)
controllers.register_blueprint(contact_controller)
controllers.register_blueprint(account_controller)
controllers.register_blueprint(card_controller)
controllers.register_blueprint(transaction_controller)
