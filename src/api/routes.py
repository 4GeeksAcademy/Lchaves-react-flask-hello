from flask import Blueprint, request, jsonify
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity
from .models import User, db

api = Blueprint('api', __name__)

@api.route('/signup', methods=['POST'])
def signup():
    data = request.get_json()

    email = data.get('email')
    username = data.get('username')  
    password = data.get('password')

    if not email or not username or not password:
        return jsonify({"error": "Email, username, and password are required"}), 400

    if User.query.filter_by(email=email).first():
        return jsonify({"error": "User with this email already exists"}), 400

    if User.query.filter_by(username=username).first():
        return jsonify({"error": "Username already exists"}), 400

    new_user = User(email=email, username=username)
    new_user.set_password(password)  
    db.session.add(new_user)
    db.session.commit()

    return jsonify({"message": "User created successfully"}), 201

@api.route('/login', methods=['POST'])
def login():
    data = request.get_json()

    email = data.get('email')
    password = data.get('password')
    if not email or not password:
        return jsonify({"error": "Email and password are required"}), 400

    user = User.query.filter_by(email=email).first()
    if not user or not user.check_password(password):
        return jsonify({"error": "Invalid email or password"}), 401

    token = create_access_token(identity={"id": user.id, "email": user.email, "username": user.username})
    return jsonify({"token": token}), 200

@api.route('/private', methods=['GET'])
@jwt_required()
def private():
    current_user = get_jwt_identity()
    return jsonify({"message": f"Welcome {current_user['username']}! This is a private route."}), 200

@api.route('/logout', methods=['POST'])
@jwt_required()
def logout():
    return jsonify({"message": "Logout successful. Delete your token from sessionStorage."}), 200

@api.route('/validate', methods=['GET'])
@jwt_required()
def validate():
    current_user = get_jwt_identity()
    return jsonify({"user": current_user}), 200
