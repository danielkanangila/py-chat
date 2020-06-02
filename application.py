import os

from dotenv import load_dotenv, find_dotenv
from flask import Flask, render_template, jsonify
from flask_socketio import SocketIO, emit

# Loading environment variables from .env file
load_dotenv(find_dotenv())


def create_app():
    # variables
    '''
    users variable contain the list of all registered users
    schema { id: int, display_name: string }
    '''
    users = []

    '''
    channels variable contain the list of channels.
    schema { id: init, name: string } 
    '''
    channels = []

    '''
    messages variable contain the list of messages
    schema {channel_name: string, messages: list}
    messages item schema {display_name: string, message: string, created_at}
    '''
    messages = []

    app = Flask(__name__)
    app.config["SECRET_KEY"] = os.getenv("SECRET_KEY")
    socketio = SocketIO(app)

    @app.route("/")
    @app.route("/login")
    @app.route("/channels")
    @app.route("/channels/<name>")
    def index():
        return render_template("index.html")

    @app.route("/api/channels")
    def get_channels():
        return jsonify(channels);

    @socketio.on("create channel")
    def set_channel(data):
        if not data.name:
            emit("channel creation error", {message: "no channel name specified."}, broadcast=true)


    @app.route("/api/login", methods=["POST"])
    def login():
        return

    return app
