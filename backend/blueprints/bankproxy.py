# blueprints/bankproxy.py
import requests
from flask import Blueprint, request, Response

bankproxy = Blueprint('bankproxy', __name__)


@bankproxy.route('/proxy/<path:url>', methods=['GET', 'POST', 'PUT', 'DELETE'])
def proxy(url):
    try:
        if request.method == 'GET':
            resp = requests.get(f'https://openbanking.santander.co.uk/{url}',
                                headers={'Accept': 'application/prs.openbanking.opendata.v2.2+json'})
        elif request.method == 'POST':
            resp = requests.post(f'https://openbanking.santander.co.uk/{url}', json=request.json,
                                 headers=request.headers)
        elif request.method == 'PUT':
            resp = requests.put(f'https://openbanking.santander.co.uk/{url}', json=request.json,
                                headers=request.headers)
        elif request.method == 'DELETE':
            resp = requests.delete(f'https://openbanking.santander.co.uk/{url}', headers=request.headers)
    except Exception as e:
        return Response(f"An error occurred: {str(e)}", status=500)

    headers = {k: v for k, v in resp.headers.items() if k.lower() not in ('transfer-encoding', 'content-length')}
    return resp.text, 200
