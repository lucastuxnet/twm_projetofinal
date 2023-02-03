from flask import Flask
from src.routes import urls_blueprint
from flask_cors import CORS

app = Flask(__name__)
cors = CORS(app)

app.register_blueprint(urls_blueprint)

if __name__ == "__main__":
    app.run(host='0.0.0.0', debug=True)