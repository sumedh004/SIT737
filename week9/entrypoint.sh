#!/usr/bin/env bash
set -e

export MONGO_URI="mongodb://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_HOST:-mongo-svc}:${MONGO_PORT:-27017}/?authSource=admin"

echo "Starting app with URI: $MONGO_URI"

exec node server.js
