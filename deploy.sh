#!/bin/bash

# Deployment script for cinziabrugnola.com
echo "🚀 Deploying to cinziabrugnola.com..."

# Build the application
echo "📦 Building application..."
npm run build

# Deploy to production directory
echo "📂 Copying files to production..."
sudo rm -rf /var/www/cinziabrugnola-app/*
sudo cp -r * /var/www/cinziabrugnola-app/
sudo chown -R www-data:www-data /var/www/cinziabrugnola-app

# Restart the service
echo "🔄 Restarting service..."
sudo systemctl restart cinziabrugnola-app

# Check status
echo "✅ Checking service status..."
sudo systemctl status cinziabrugnola-app --no-pager -l

echo "🎉 Deployment complete! Live at: https://cinziabrugnola.com"