#!/bin/bash

cd /var/www/app/backend

# Load env vars
source /var/www/app/scripts/load_env.sh

# Install deps (safe to run multiple times)
npm install

# Start or restart backend
pm2 start server.js --name backend --update-env || pm2 restart backend

# Save PM2 process (auto-start on reboot)
pm2 save
