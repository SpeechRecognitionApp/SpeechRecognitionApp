import requests




def authenticate_with_open_bank_project(username, password, consumer_key):
    api_url = "https://apisandbox.openbankproject.com/my/logins/direct"

    headers = {
        "Content-Type": "application/json",
        "DirectLogin": f"username={username}, password={password}, consumer_key={consumer_key}",
    }

    try:
        response = requests.post(api_url, headers=headers)
        response_data = response.json()
        return response_data.get("token")  # Return the authentication token
    except requests.exceptions.RequestException as e:
        print("Error authenticating:", str(e))
        return None
    
def create_user(email,username,password,first_name,last_name,token):
    api_url = "https://apisandbox.openbankproject.com/obp/v4.0.0/users"
    headers = {
        "Content-Type": "application/json",
        "Authorization": f"DirectLogin token={token}"
    }

    payload = {
        "email": email,
        "username": username,
        "password": password,
        "first_name": first_name,
        "last_name": last_name
    }

    try:
        response = requests.post(api_url, headers=headers, json=payload)
        response_data = response.json()
        return response_data.get("user_id")  # Return the user_id of the created user
    except requests.exceptions.RequestException as e:
        print("Error creating user:", str(e))
        return None
