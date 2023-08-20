from mongoengine import *
from mongoengine.signals import pre_save
import datetime
import certifi

# connect('bank_app')  # 连接到MongoDB数据库，数据库名为'bank_app'
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

    # Try to retrieve the counter object
    counter = Counter.objects(name="user_id").first()
    # If counter object does not exist, initialize it
    if not counter:
        counter = Counter(name="user_id", value=0)
        counter.save()

    # Increment the counter
    counter.update(inc__value=1)
    counter.reload()  # Refresh the object after updating

    document.user_id = str(counter.value)


class User(Document):
    user_id = StringField(unique=True)
    first_name = StringField(required=True)
    second_name = StringField(required=True)
    email = StringField(required=True)
    house_name = StringField()
    street_line = StringField()
    postcode = StringField()


@pre_save.connect
def pre_save_contact(sender, document, **kwargs):
    # Check if the sender is the Contact model
    if sender != Contact:
        return

    # Try to retrieve the counter object for contact_id
    counter = Counter.objects(name="contact_id").first()
    # If counter object does not exist, initialize it
    if not counter:
        counter = Counter(name="contact_id", value=0)
        counter.save()

    # Increment the counter
    counter.update(inc__value=1)
    counter.reload()  # Refresh the object after updating

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
    # Check if the sender is the Card model
    if sender != Card:
        return

    # Try to retrieve the counter object for card_id
    counter = Counter.objects(name="card_id").first()
    # If counter object does not exist, initialize it
    if not counter:
        counter = Counter(name="card_id", value=0)
        counter.save()

    # Increment the counter
    counter.update(inc__value=1)
    counter.reload()  # Refresh the object after updating

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
    # Check if the sender is the Transaction model
    if sender != Transaction:
        return

    # Try to retrieve the counter object for card_id
    counter = Counter.objects(name="transaction_id").first()
    # If counter object does not exist, initialize it
    if not counter:
        counter = Counter(name="transaction_id", value=0)
        counter.save()

    # Increment the counter
    counter.update(inc__value=1)
    counter.reload()  # Refresh the object after updating

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
