#!/usr/bin/env bash

# Start both react + express apps concurrently
./node_modules/.bin/concurrently \
  --names "www,api" \
  --handle-input true \
  --default-input-target 1 \
  --kill-others \
  --prefix-colors "bgBlue.bold,bgMagenta.bold" \
  "bash ./bin/dev_www.sh" \
  "bash ./bin/dev_api.sh"
