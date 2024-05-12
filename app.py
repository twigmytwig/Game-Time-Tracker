from flask import Flask, request, jsonify

from save_to_file import add_new_game

app = Flask(__name__)

# Define a sample route
@app.route('/api/data', methods=['GET'])
def get_data():
    data = {'message': 'Hello from Flask!'}
    return jsonify(data)

# POST route to receive JSON data
@app.route('/api/SubmitNewGame', methods=['POST'])
def post_data():
    # Check if request contains JSON data
    if request.is_json:
        data = request.get_json()  # Parse JSON data
        add_new_game(data)  # Output JSON data to console (for demonstration)

        response = {'status': 'success', 'message': 'Data received'}
        return jsonify(response), 200  # Return JSON response with HTTP status code 200
    else:
        # If request does not contain JSON data
        return jsonify({'error': 'Invalid JSON'}), 400  # Return error with HTTP status code 400


if __name__ == '__main__':
    app.run(debug=False)