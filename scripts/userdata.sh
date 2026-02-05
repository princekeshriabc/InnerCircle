#!/bin/bash
set -e

# Update system
apt update -y

# Install required packages
apt install -y curl unzip nginx

# Install Node.js 20
curl -fsSL https://deb.nodesource.com/setup_20.x | bash -
apt install -y nodejs

# Install PM2
npm install -g pm2

# Install AWS CLI v2
curl "https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip" -o awscliv2.zip
unzip -q awscliv2.zip
./aws/install

# Start services
systemctl start nginx
systemctl enable nginx

# Create app directory
mkdir -p /var/www/app
chown -R ubuntu:ubuntu /var/www/app

# PM2 startup
su - ubuntu -c "pm2 startup systemd"
