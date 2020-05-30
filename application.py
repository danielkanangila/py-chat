import os

from dotenv import load_dotenv, find_dotenv
from flask import Flask, render_template
from flask_socketio import SocketIO, emit

# Loading environment variables from .env file
load_dotenv(find_dotenv())

def create_app():

    app = Flask(__name__)
    app.config["SECRET_KEY"] = os.getenv("SECRET_KEY")
    socketio = SocketIO(app)


    @app.route("/")
    @app.route("/login")
    @app.route("/channels")
    @app.route("/channels/<name>")
    def index():
        return render_template("index.html")


    @app.route("/api/login", methods=["POST"])
    def login():
        return

    return app
