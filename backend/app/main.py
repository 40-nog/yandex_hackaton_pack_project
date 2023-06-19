import argparse
import os

import uvicorn
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles


from app.api.order import router
from app.core.config import settings

app = FastAPI(title=settings.app_title)

static_dir = os.path.join(
    os.path.dirname(os.path.realpath(__file__)), 'static'
)
app.mount('/static', StaticFiles(directory=static_dir), name='static')

app.include_router(router)

origins = [
    'http://localhost:3000',
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=[
        'GET',
        'POST',
        'PATCH',
        'PUT',
        'DELETE',
        'OPTIONS',
    ],
    allow_headers=[
        'Content-Type',
        'Set-Cookie',
        'Access-Control-Allow-Headers',
        'Access-Control-Allow-Methods',
        'Access-Control-Allow-Origin',
    ],
)

if __name__ == '__main__':
    parser = argparse.ArgumentParser()
    parser.add_argument('--port', default=8000, type=int, dest='port')
    parser.add_argument('--host', default='backend', type=str, dest='host')
    parser.add_argument('--debug', action='store_true', dest='debug')
    args = vars(parser.parse_args())

    uvicorn.run(app, **args)
    uvicorn.run(app, host='backend', port=8000, debug=True)
