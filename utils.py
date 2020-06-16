def is_exists(store, key, value):
    if any(key in item for item in store):
        for i in store:
          if i[key] == value:
            return True
    return False