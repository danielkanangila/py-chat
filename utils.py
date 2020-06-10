def is_exists(store, key, value):
    item = list(filter(lambda item: (item != None) & (item[key] == value), store))
    if item:
        return True
    return False