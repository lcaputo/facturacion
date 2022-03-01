#!/bin/bash/
pm2 start "ng serve --host 0.0.0.0 --port 80 --disable-host-check --live-reload false" --name 'og23-app'
