# Create Node App dev startup script

# Create docker-compose.yaml file and pipe to stdin to bring up dependencies
./node_modules/.bin/deploy-node-app --config=compose | docker-compose up -f -

# Start node app
./node_modules/.bin/concurrently \
  --names "www,api" \
  --handle-input true \
  --default-input-target 1 \
  --prefix-colors "bgBlue.bold,bgMagenta.bold" \
  "bash ./bin/dev_www.sh" \
  "bash ./bin/dev_api.sh"
