import time
import calendar
from utils import *


class Model:

    def __init__(self):
        self.store = []

    def find_all(self):
        return self.store

    def find_by_id(self, item_id):
        return list(filter(lambda item: item['id'] == item_id, self.store))

    def find_where(self, key, value):
        return list(filter(lambda item: item[key] == value, self.store))

    def create(self, payload):
        payload = {
            "id": calendar.timegm(time.gmtime()),
            **self.before_create(payload)
        }
        self.store.append(payload)
        return self.after_create(payload)

    def update(self, item_id, payload):
        self.store = list(map(lambda item: payload if item["id"] == item_id else item, self.store))
        return self.find_by_id(item_id)

    def remove(self, item_id):
        self.store = list(filter(lambda item: item["id"] != item_id, self.store))
        return item_id

    def before_create(self, payload):
        return playload

    def after_create(self, result):
        return result


class Users(Model):
    def __init__(self):
        super().__init__()

    def before_create(self, payload):
        if (not payload) | (not payload["displayName"]):
            raise Exception("user is required")
        if is_exists(self.store, key="displayName", value=payload["displayName"]):
            raise Exception("display name already exists.")
        return payload


class Channels(Model):
    def __init__(self):
        super().__init__()

    def before_create(self, payload):
        if (not payload) | (not payload["name"]):
            raise Exception("`name` is required")
        if is_exists(self.store, key="name", value=payload["name"]):
            raise Exception("`channel name` already exists.")
        return payload


