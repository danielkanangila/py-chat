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
from jsonschema.exceptions import ValidationError

# Loading environment variables from .env file
load_dotenv(find_dotenv())


def create_app():
    ON_MESSAGE_SENT = "ON_MESSAGE_SENT"
    ON_MESSAGES_ON_ = "ON_MESSAGES_ON_"
    # variables
    '''
    users variable contain the list of all registered users
    schema { id: int, display_name: string }
    '''
    users = Users()

    '''
    channels variable contain the list of channels.
    schema { id: int, name: string } 
    '''
    channels = Channels()

    '''
    messages variable contain the list of messages
    schema {id: int, from: User, to: Channel,  message: string, created_at: data}
    '''
    messages = Messages()

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
    @app.route("/channels/<string:channel_id>")
    def index(channel_id=None):
        return render_template("index.html")

    @socketio.on(ON_MESSAGE_SENT)
    def received(data):
        try:
            messages.create(data)
            msg = messages.find_where("to", data["to"])
            socketio.emit(f"{ON_MESSAGES_ON_}{data['to']['id']}", msg)
        except Exception as e:
            print(sys.exc_info())
            raise

    @login_required
    @app.route("/api/channels/<string:channel_id>")
    def retrieve_channel_by_id(channel_id):
        try:
            channel = channels.find_where("id", int(channel_id))
            msg = messages.find_where("to", channel[0])
            return jsonify({
                "channel": channel[0],
                "messages": msg
            }), 200
        except Exception as e:
            print(sys.exc_info())
            return jsonify({"message": "An error occurred while trying retrieve channel"}), 500

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
            return jsonify({"message": "An error occurred while trying create a new channel"}), 500
        except Exception as e:
            print(sys.exc_info())
            return jsonify({"message": str(e)}), 500

    @app.route("/api/auth/register", methods=["POST"])
    def register():
        try:
            user = users.create(payload=request.json)
            session["user"] = user
            return user, 201
        except ValidationError as v:
            return jsonify({"message": v.message}), 400

        except Exception as e:
            print(sys.exc_info())
            raise

    @app.route("/api/auth/login", methods=["POST"])
    def login():
        try:
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
