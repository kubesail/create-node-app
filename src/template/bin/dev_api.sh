#!/usr/bin/env bash

set -e
# Determine docker-compose port mapping and set environment variables
./node_modules/.bin/deploy-node-app --generate-default-env --overwrite

# Bring up required dependencies
./node_modules/.bin/deploy-node-app dev --skip app --format compose --no-build --no-push --overwrite

# Determine docker-compose port mapping and set environment variables
./node_modules/.bin/deploy-node-app --generate-local-ports-env --format compose --overwrite

# Use nodemon to watch and reload our app codebase
./node_modules/.bin/nodemon --ignore src/www src/api/index.js
