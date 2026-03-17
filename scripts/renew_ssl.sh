
#!/bin/bash
# scripts/renew_ssl.sh
# SSL Auto-Renewal & Nginx Reload Protocol with Industrial Logging

echo "--- Initializing SSL Renewal Sequence at $(date) ---"

# 1. Attempt certificate renewal via Certbot
CERT_OUTPUT=$(certbot renew --quiet 2>&1)
EXIT_CODE=$?

# 2. Reload Nginx to apply new certificates
if docker ps | grep -q "ai-empire-nginx-1"; then
    echo "Reloading Docker Nginx container..."
    docker exec ai-empire-nginx-1 nginx -s reload
else
    echo "Docker Nginx not found. Attempting local system reload..."
    systemctl reload nginx
fi

# 3. Log to Firestore Correction Ledger (via logSystemAlert API)
# Note: Replace <USER_ID> with your admin UID or pass as env var
USER_ID=${ADMIN_UID:-"SYSTEM_ADMIN"}
LOG_URL="http://localhost:3000/api/system/log-alert"

if [ $EXIT_CODE -eq 0 ]; then
    SUCCESS=true
    MSG="SSL Heartbeat Nominal. Nginx reloaded."
else
    SUCCESS=false
    MSG="SSL Renewal Failed: $CERT_OUTPUT"
fi

curl -X POST "$LOG_URL" \
     -H "Content-Type: application/json" \
     -d "{\"userId\": \"$USER_ID\", \"agentId\": \"ssl_worker\", \"success\": $SUCCESS, \"message\": \"$MSG\"}"

echo "--- SSL Renewal Sequence Terminated Successfully ---"
