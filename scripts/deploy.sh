#!/bin/bash
set -e

APP_DIR="/var/www/app"
export HOME=/home/ubuntu

echo "Starting deployment..."

cd $APP_DIR

############################
# FRONTEND
############################

echo "Deploying frontend..."
cd frontend
npm install
npm run build

sudo rm -rf /usr/share/nginx/html/*
sudo cp -r dist/* /usr/share/nginx/html/

############################
# BACKEND
############################

echo "Deploying backend..."
cd ../backend

# Load backend env from SSM
source ../scripts/load_env.sh

npm install

# Start or restart backend safely
if pm2 list | grep -q "backend"; then
  echo "Restarting backend..."
  pm2 restart backend --update-env
else
  echo "Starting backend..."
  pm2 start server.js --name backend
fi

pm2 save
sudo systemctl reload nginx

echo "Deployment completed successfully"
