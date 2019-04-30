#!/usr/bin/env bash -e

# Create Node App dev startup script

# Start node app
./node_modules/.bin/concurrently \
  --names "www,app" \
  --handle-input true \
  --default-input-target 1 \
  --prefix-colors "bgBlue.bold,bgMagenta.bold" \
  "bash ./bin/dev_www.sh" \
  "bash ./bin/dev_app.sh"
