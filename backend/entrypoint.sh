#!/bin/sh

python manage.py migrate --no-input

python manage.py collectstatic --no-input

python manage.py makemessages -l es

python manage.py compilemessages

gunicorn config.wsgi --bind 0.0.0.0:8000