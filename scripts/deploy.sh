#!/bin/bash
set -e

APP_DIR="/var/www/app"

echo "Starting deployment..."

cd $APP_DIR

############################
# FRONTEND DEPLOY
############################

echo "Deploying frontend..."
cd frontend
npm install
npm run build

sudo rm -rf /usr/share/nginx/html/*
sudo cp -r dist/* /usr/share/nginx/html/

############################
# BACKEND DEPLOY
############################

echo "Deploying backend..."
cd ../backend

# Load env from SSM
source ../scripts/load_env.sh

npm install

# Start / restart backend with PM2
if pm2 describe backend > /dev/null 2>&1; then
  export HOME=/home/ubuntu
  pm2 restart backend --update-env
else
  export HOME=/home/ubuntu
  pm2 start server.js --name backend
fi

pm2 save
sudo systemctl reload nginx

echo "Deployment completed successfully"
