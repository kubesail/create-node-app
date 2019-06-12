#!/usr/bin/env bash -e

# Bring up required dependencies
./node_modules/.bin/deploy-node-app dev --skip app

# Determine docker-compose port mapping and set environment variables
./node_modules/.bin/deploy-node-app --generate-local-env

# Use nodemon to watch and reload our app codebase
./node_modules/.bin/nodemon src/app/index.js
