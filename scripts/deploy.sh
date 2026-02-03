#!/bin/bash
set -e

APP_DIR="/var/www/app"
BUILD_DIR="/tmp/build"

echo "Starting deployment..."

# Clean previous build
rm -rf $APP_DIR/backend
rm -rf $APP_DIR/frontend

# Copy new build
mkdir -p $APP_DIR
cp -r $BUILD_DIR/backend $APP_DIR/
cp -r $BUILD_DIR/frontend $APP_DIR/
cp -r $BUILD_DIR/scripts $APP_DIR/

# Frontend deploy (Nginx)
echo "Deploying frontend..."
rm -rf /usr/share/nginx/html/*
cp -r $APP_DIR/frontend/dist/* /usr/share/nginx/html/

# Backend deploy
echo "Deploying backend..."
cd $APP_DIR/backend

# Load env from SSM
source $APP_DIR/scripts/load_env.sh

# Install deps (safe)
npm install

# Start / Restart backend
pm2 describe backend >/dev/null 2>&1
if [ $? -eq 0 ]; then
  pm2 restart backend --update-env
else
  pm2 start server.js --name backend
fi

pm2 save
systemctl reload nginx

echo "Deployment completed successfully"
