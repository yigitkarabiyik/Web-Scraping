#!/bin/bash

# Apply database migrations
echo "Apply database migrations"
python manage.py migrate
python manage.py makemigrations

# Get last 10 Instagram APK
echo "Get last 10 Instagram APK"
python first_step.py

# Start server
echo "Starting server"
python manage.py runserver 0.0.0.0:8000