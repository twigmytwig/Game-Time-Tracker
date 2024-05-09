from flask import Flask, request, jsonify

app = Flask(__name__)

# Define a sample route
@app.route('/api/data', methods=['GET'])
def get_data():
    data = {'message': 'Hello from Flask!'}
    return jsonify(data)

# POST route to receive JSON data
@app.route('/api/post-data', methods=['POST'])
def post_data():
    # Check if request contains JSON data
    if request.is_json:
        data = request.get_json()  # Parse JSON data
        print(data)  # Output JSON data to console (for demonstration)
        
        # Example response
        response = {'status': 'success', 'message': 'Data received'}
        return jsonify(response), 200  # Return JSON response with HTTP status code 200
    else:
        # If request does not contain JSON data
        return jsonify({'error': 'Invalid JSON'}), 400  # Return error with HTTP status code 400


if __name__ == '__main__':
    app.run(debug=True)