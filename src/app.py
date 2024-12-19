import os
from flask import Flask, request, jsonify, url_for, send_from_directory
from flask_migrate import Migrate
from api.models import db
from api.routes import api
from api.admin import setup_admin
from api.commands import setup_commands

# Create the Flask app
app = Flask(__name__)

# Database configuration
db_url = os.getenv("DATABASE_URL")
if db_url is not None:
    app.config['SQLALCHEMY_DATABASE_URI'] = db_url.replace("postgres://", "postgresql://")
else:
    app.config['SQLALCHEMY_DATABASE_URI'] = "sqlite:////tmp/test.db"

app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

# Initialize the Flask-Migrate
migrate = Migrate(app, db)

# Initialize database
db.init_app(app)

# Register the blueprint for API routes
app.register_blueprint(api, url_prefix='/api')

# Setup Flask-Admin and custom commands
setup_admin(app)
setup_commands(app)

# Setup error handler
@app.errorhandler(Exception)
def handle_invalid_usage(error):
    return jsonify({"error": str(error)}), 500

# Serve static files
static_file_dir = os.path.join(os.path.dirname(os.path.realpath(__file__)), '../public/')

@app.route('/')
def sitemap():
    return send_from_directory(static_file_dir, 'index.html')

@app.route('/<path:path>', methods=['GET'])
def serve_any_other_file(path):
    if not os.path.isfile(os.path.join(static_file_dir, path)):
        path = 'index.html'
    response = send_from_directory(static_file_dir, path)
    response.cache_control.max_age = 0  # avoid cache memory
    return response

# Main entry point
if __name__ == '__main__':
    PORT = int(os.environ.get('PORT', 3001))
    app.run(host='0.0.0.0', port=PORT, debug=True)
