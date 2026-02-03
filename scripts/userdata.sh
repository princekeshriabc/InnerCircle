#!/bin/bash
yum update -y

# Install basic packages
yum install -y git nginx aws-cli

# Install Node.js (LTS)
curl -fsSL https://rpm.nodesource.com/setup_18.x | bash -
yum install -y nodejs

# Install PM2
npm install -g pm2

# Start services
systemctl start nginx
systemctl enable nginx

# Create app directory (IMPORTANT)
mkdir -p /var/www/app
chown -R ec2-user:ec2-user /var/www/app

# Enable PM2 on reboot
su - ec2-user -c "pm2 startup systemd -u ec2-user --hp /home/ec2-user"

# Configure Nginx reverse proxy
cat <<EOF > /etc/nginx/conf.d/app.conf
server {
    listen 80;
    server_name _;

    root /usr/share/nginx/html;
    index index.html;

    location / {
        try_files \$uri /index.html;
    }

    location /api/ {
        proxy_pass http://localhost:3000/;
        proxy_http_version 1.1;
        proxy_set_header Upgrade \$http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host \$host;
        proxy_cache_bypass \$http_upgrade;
    }
}
EOF

systemctl restart nginx
