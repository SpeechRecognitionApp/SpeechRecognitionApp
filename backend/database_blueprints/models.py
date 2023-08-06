from mongoengine import *
import datetime

connect('bank_app')  # 连接到MongoDB数据库，数据库名为'bank_app'

class User(Document):
    user_id = StringField(required=True, unique=True)
    name = StringField(required=True)
    email = StringField(required=True)
    password = StringField(required=True)

class Contact(Document):
    user_id = StringField(required=True)
    contact_id = StringField(required=True)
    name = StringField(required=True)
    email = StringField(required=True)

class Account(Document):
    user_id = StringField(required=True)
    account_number = StringField(required=True)
    balance = FloatField(required=True)

class Card(Document):
    user_id = StringField(required=True)
    card_number = StringField(required=True)
    cvv = IntField(required=True)
    expiry_date = DateTimeField(required=True)

class Transaction(Document):
    user_id = StringField(required=True)
    transaction_id = StringField(required=True)
    type = StringField(required=True)
    amount = FloatField(required=True)
    timestamp = DateTimeField(default=datetime.datetime.now)
