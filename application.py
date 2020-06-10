import os
import sys
import calendar
import time

from dotenv import load_dotenv, find_dotenv
from flask import Flask, render_template, jsonify, request
from flask_socketio import SocketIO, emit
from utils import *
from models import *

# Loading environment variables from .env file
load_dotenv(find_dotenv())


def create_app():
    # variables
    '''
    users variable contain the list of all registered users
    schema { id: int, display_name: string }
    '''
    users = Users()

    '''
    channels variable contain the list of channels.
    schema { id: init, name: string } 
    '''
    channels = Channels()

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
        return jsonify(channels.find_all())

    @socketio.on("create_channel")
    def set_channel(data):
        try:
            channels.create(data)
            emit("created_channel", channels.find_all(), broadcast=True)
        except Exception as e:
            print(sys.exc_info())
            raise
            #return emit("channel_creation_error", {"message": str(e)}, broadcast=True)

    @app.route("/api/auth/register", methods=["POST"])
    def register():
        try:
            user = users.create(payload=request.json)
            return user, 201

        except Exception as e:
            print(sys.exc_info())
            return jsonify({"message": str(e)}), 500

    @app.route("/api/auth/login", methods=["POST"])
    def login():
        try:
            print(request.json)
            user = users.find_where(key="displayName", value=request.json["displayName"])
            if not user:
                raise Exception("Invalid credentials")

            return user[0], 200

        except Exception as e:
            print(sys.exc_info())
            return jsonify({"message": str(e)}), 500

    return app
