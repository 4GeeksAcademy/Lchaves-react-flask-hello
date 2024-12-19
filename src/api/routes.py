from flask import Blueprint, request, jsonify
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity
from .models import User, db
from werkzeug.security import generate_password_hash, check_password_hash

# Create a Blueprint for the API
api = Blueprint('api', __name__)

# SIGNUP Route
@api.route('/signup', methods=['POST'])
def signup():
    """
    Creates a new user account by hashing the provided password
    and storing the email and password hash in the database.
    """
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')

    if not email or not password:
        return jsonify({"error": "Email and password are required"}), 400

    # Check if user already exists
    if User.query.filter_by(email=email).first():
        return jsonify({"error": "User already exists"}), 400

    # Create a new user
    new_user = User(email=email)
    new_user.set_password(password)  # Hash the password
    db.session.add(new_user)
    db.session.commit()

    return jsonify({"message": "User created successfully"}), 201


# LOGIN Route
@api.route('/login', methods=['POST'])
def login():
    """
    Authenticates the user using their email and password.
    Returns a JWT token upon successful authentication.
    """
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')

    # Find the user by email
    user = User.query.filter_by(email=email).first()
    if not user or not user.check_password(password):
        return jsonify({"error": "Invalid email or password"}), 401

    # Create a JWT token
    token = create_access_token(identity={"id": user.id, "email": user.email})
    return jsonify({"token": token}), 200


# PRIVATE Route
@api.route('/private', methods=['GET'])
@jwt_required()
def private():
    """
    Validates the JWT token and allows access to private data
    for authenticated users only.
    """
    current_user = get_jwt_identity()  # Get user identity from JWT
    return jsonify({"message": f"Welcome {current_user['email']}! This is a private route."}), 200


@api.route('/logout', methods=['POST'])
@jwt_required()
def logout():
    """
    Invalidate the token on the client-side (no server-side action here).
    """
    return jsonify({"message": "Logout successful. Delete your token from sessionStorage."}), 200


# Token Validation Route (Optional)
@api.route('/validate', methods=['GET'])
@jwt_required()
def validate():
    """
    Validates the current JWT token and returns the user's information.
    """
    current_user = get_jwt_identity()
    return jsonify({"user": current_user}), 200
