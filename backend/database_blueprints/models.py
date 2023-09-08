from mongoengine import *
from mongoengine.signals import pre_save
import datetime
import certifi

connect(db='VoiceBank',
        host='mongodb+srv://junweizhang530:Zjw530293@cluster0.9dvhmyd.mongodb.net/?retryWrites=true&w=majority',
        authentication_source='admin',
        tlsCAFile=certifi.where())
class Counter(Document):
    name = StringField(required=True, unique=True)
    value = IntField(required=True)
@pre_save.connect
def pre_save_user(sender, document, **kwargs):
    if sender != User:
        return
    counter = Counter.objects(name="user_id").first()
    if not counter:
        counter = Counter(name="user_id", value=0)
        counter.save()
    counter.update(inc__value=1)
    counter.reload()
    document.user_id = str(counter.value)

class User(Document):
    user_id = StringField(unique=True)
    first_name = StringField(required=True)
    second_name = StringField(required=True)
    email = StringField(required=True)
    house_name = StringField(required=True)
    street_line = StringField(required=True)
    postcode = StringField(required=True)

@pre_save.connect
def pre_save_contact(sender, document, **kwargs):
    if sender != Contact:
        return
    counter = Counter.objects(name="contact_id").first()
    if not counter:
        counter = Counter(name="contact_id", value=0)
        counter.save()
    counter.update(inc__value=1)
    counter.reload()
    document.contact_id = str(counter.value)

class Contact(Document):
    contact_id = StringField(unique=True)
    first_name = StringField(required=True)
    second_name = StringField(required=True)
    account_number = StringField(required=True)
    sort_code = StringField(required=True)
    description = StringField()
    reference = StringField()
    user_id = StringField(required=True)

@pre_save.connect
def pre_save_card(sender, document, **kwargs):
    if sender != Card:
        return
    counter = Counter.objects(name="card_id").first()
    if not counter:
        counter = Counter(name="card_id", value=0)
        counter.save()
    counter.update(inc__value=1)
    counter.reload()
    document.card_id = str(counter.value)

class Card(Document):
    card_id = StringField(required=True)
    card_number = StringField(required=True)
    balance = StringField(required=True)
    pin = IntField(required=True)
    expiry_date = DateTimeField(required=True)
    user_id = StringField(required=True)

@pre_save.connect
def pre_save_transaction(sender, document, **kwargs):
    if sender != Transaction:
        return
    counter = Counter.objects(name="transaction_id").first()
    if not counter:
        counter = Counter(name="transaction_id", value=0)
        counter.save()
    counter.update(inc__value=1)
    counter.reload()
    document.transaction_id = str(counter.value)

class Transaction(Document):
    transaction_id = StringField(required=True)
    timestamp = DateTimeField(default=datetime.datetime.now)
    type = StringField(required=True)
    receiver = StringField()
    description = StringField()
    reference = StringField()
    amount = FloatField(required=True)
    user_id = StringField(required=True)

class Authentication(Document):
    user_id = StringField(required=True)
    card_id = StringField(required=True)
    is_login = StringField(default="0")
    isFrozen = StringField(default="0")
    fail_count = StringField(default="0")
