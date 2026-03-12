#!/bin/bash

python manage.py migrate
python manage.py collectstatic --no-input
uvicorn configs.asgi:application --host 0.0.0.0 --port 8000