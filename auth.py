from flask import session, jsonify
from functools import wraps


def login_required(f):
    @wraps(f)
    def decorated_function(*args, **kwargs):
        user = session.get("user", None)
        if not user:
            return jsonify({"message": "Access forbidden"})
        return f(*args, **kwargs)
    return decorated_function
