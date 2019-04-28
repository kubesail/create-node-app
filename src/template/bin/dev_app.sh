#!/usr/bin/env bash -e

# Commented out until module system is working
# Create docker-compose.yaml file and pipe to stdin to bring up dependencies
# ./node_modules/.bin/deploy-node-app --no-build --format compose | docker-compose up -f -

./node_modules/.bin/nodemon src/api/index.js
