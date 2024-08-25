from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Hardcoded user information
USER_ID = "john_doe_17091999"
EMAIL = "john@xyz.com"
ROLL_NUMBER = "ABCD123"

@app.route('/bfhl', methods=['GET'])
def handle_get():
    """
    Handle GET requests to /bfhl route
    """
    response = {
        "operation_code": 1
    }
    return jsonify(response), 200

@app.route('/bfhl', methods=['POST'])
def handle_post():
    """
    Handle POST requests to /bfhl route
    """
    try:
        data = request.json.get('data', [])
        print(data)

        if not isinstance(data, list):
            return jsonify({"is_success": False, "error": "Invalid input, data should be an array"}), 400

        numbers = [item for item in data if item.isdigit()]
        alphabets = [item for item in data if item.isalpha()]

        # Extract the highest lowercase alphabet
        lowercase_alphabets = [item for item in alphabets if item.islower()]
        highest_lowercase_alphabet = sorted(lowercase_alphabets)[-1] if lowercase_alphabets else None
        
        response = {
            "is_success": True,
            "user_id": USER_ID,
            "email": EMAIL,
            "roll_number": ROLL_NUMBER,
            "numbers": numbers,
            "alphabets": alphabets,
            "highest_lowercase_alphabet": [highest_lowercase_alphabet] if highest_lowercase_alphabet else []
        }
        return jsonify(response), 200
    except Exception as e:
        return jsonify({"is_success": False, "error": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
