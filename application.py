import os
import sys
import calendar
import time

from dotenv import load_dotenv, find_dotenv
from flask import Flask, render_template, jsonify, request, session
from flask_session import Session
from flask_socketio import SocketIO, emit
from utils import *
from models import *
from auth import *

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
    # Configure session to use filesystem
    app.config["SESSION_PERMANENT"] = False
    app.config["SESSION_TYPE"] = "filesystem"
    Session(app)
    socketio = SocketIO(app)

    @app.route("/")
    @app.route("/login")
    @app.route("/channels")
    @app.route("/channels/<string:message_id>")
    def index(message_id=None):
        return render_template("index.html")

    @login_required
    @app.route("/api/channels")
    def get_channels():
        return jsonify(channels.find_all())

    @login_required
    @app.route("/api/channels", methods=["POST"])
    def create_channel():
        try:
            channels.create(request.json)
            return jsonify(channels.find_all()), 200
        except KeyError:
            print(sys.exc_info())
            return jsonify({"message": "An error occurred while trying create a new channel"})
        except Exception as e:
            print(sys.exc_info())
            return jsonify({"message": str(e)}), 500

    @app.route("/api/auth/register", methods=["POST"])
    def register():
        try:
            user = users.create(payload=request.json)
            session["user"] = user
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

            session["user"] = user[0]
            return user[0], 200

        except Exception as e:
            print(sys.exc_info())
            return jsonify({"message": str(e)}), 500

    @app.route("/api/auth/logout")
    def logout():
        session["user"] = None
        return "ok", 200

    return app
