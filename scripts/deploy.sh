#!/bin/bash
set -e

APP_DIR="/var/www/app"
export HOME=/home/ubuntu

echo "Starting deployment..."

############################
# CLONE OR UPDATE REPO
############################

if [ ! -d "$APP_DIR/.git" ]; then
  echo "Cloning repository..."
  rm -rf $APP_DIR
  git clone https://github.com/<OWNER>/<REPO>.git $APP_DIR
else
  echo "Updating repository..."
  cd $APP_DIR
  git pull origin main
fi

############################
# FRONTEND
############################

echo "Deploying frontend..."
cd $APP_DIR/frontend

npm install
npm run build

sudo rm -rf /usr/share/nginx/html/*
sudo cp -r dist/* /usr/share/nginx/html/

############################
# BACKEND
############################

echo "Deploying backend..."
cd $APP_DIR/backend

# Load backend env from SSM (fail loudly if missing)
if [ ! -f "../scripts/load_env.sh" ]; then
  echo "ERROR: load_env.sh not found"
  exit 1
fi

source ../scripts/load_env.sh

npm install

# Start or restart backend safely
if pm2 describe backend >/dev/null 2>&1; then
  echo "Restarting backend..."
  pm2 restart backend --update-env
else
  echo "Starting backend..."
  pm2 start server.js --name backend
fi

pm2 save
sudo systemctl reload nginx

echo "Deployment completed successfully"
