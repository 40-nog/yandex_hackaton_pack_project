import requests

data = {"order_id": "unique_order_id",
 "items": [
    {"sku": "unique_sku_1", "amount": 1, "a": 2, "b": 3, "c": 5,
     "weight": 0.34, "cargotypes": [20, 960]},
    {"sku": "unique_sku_2", "amount": 5, "a": 3, "b": 8, "c": 13,
    "weight": 7.34, "cargotypes": [320, 440]},
    {"sku": "unique_sku_3", "amount": 2, "a": 20, "b": 30, "c": 5,
    "weight": 7.34, "cargotypes": [160, 100]},
    {"sku": "unique_sku_3", "amount": 1, "a": 20, "b": 30, "c": 5,
    "weight": 7.34, "cargotypes": [160, 100]},
   ]
}


r = requests.get("http://localhost:8000/pack", json=data)

print(r.json())