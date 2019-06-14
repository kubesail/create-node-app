#!/usr/bin/env bash

set -e

# Bring up required dependencies
../../deploy-node-app/src/index.js dev --skip app --format compose --no-build --no-push

# Determine docker-compose port mapping and set environment variables
../../deploy-node-app/src/index.js --generate-local-env --format compose

# Use nodemon to watch and reload our app codebase
./node_modules/.bin/nodemon src/api/index.js
