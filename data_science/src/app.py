from fastapi import FastAPI, Request
import uvicorn
import argparse
from model import predict, recommend_wrapper
from pydantic import BaseModel
from typing import List
from fastapi.encoders import jsonable_encoder

class Item(BaseModel):
    sku: str
    amount: int
    a: float
    b: float
    c: float
    weight: float
    cargotypes: List[int]

class Order(BaseModel):
    order_id: str
    items: List[Item]

app = FastAPI()


@app.get("/health")
def health():
    return {"status": "ok"}


@app.get("/pack")
def get_prediction(request: Order):
    y = predict(jsonable_encoder(request))
    w = recommend_wrapper(jsonable_encoder(request))
    return {"orderId": request.order_id,
            "carton": y,
            "wrappers": w,
            # "status": "ok"
            }

# @app.post("/pack")
# def get_prediction(request: Order):
#     y = predict(jsonable_encoder(request))
#     w = recomend_wraper(jsonable_encoder(request))
#     return {"order_id": request.orderId,
#             "carton": y,
#             "wrappers": w,
#             "status": "ok"}


if __name__ == "__main__":
    parser = argparse.ArgumentParser()
    parser.add_argument("--port", default=8000, type=int, dest="port")
    parser.add_argument("--host", default="0.0.0.0", type=str, dest="host")
    parser.add_argument("--debug", action="store_true", dest="debug")
    args = vars(parser.parse_args())

    uvicorn.run(app, **args)
    uvicorn.run(app, host="0.0.0.0", port=8000, debug=True)