#!/bin/bash
# scripts/renew_ssl.sh
# SSL Auto-Renewal & Nginx Reload Protocol

echo "--- Initializing SSL Renewal Sequence at $(date) ---"

# 1. Attempt certificate renewal via Certbot
certbot renew --quiet

# 2. Reload Nginx to apply new certificates
# This configuration assumes Nginx is running in the Docker stack defined in docker-compose.yml
if docker ps | grep -q "ai-empire-nginx-1"; then
    echo "Reloading Docker Nginx container..."
    docker exec ai-empire-nginx-1 nginx -s reload
else
    echo "Docker Nginx not found. Attempting local system reload..."
    systemctl reload nginx
fi

echo "--- SSL Renewal Sequence Terminated Successfully ---"
