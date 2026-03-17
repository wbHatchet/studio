#!/bin/bash
# scripts/assemble_video.sh
# Industrial FFmpeg composition script with System Alert logging.

IMAGE_INPUT=$1
AUDIO_INPUT=$2
OUTPUT_VIDEO=$3
USER_ID=${ADMIN_UID:-"SYSTEM_ADMIN"}
LOG_URL="http://localhost:3000/api/system/log-alert"

# validation
if [ -z "$IMAGE_INPUT" ] || [ -z "$AUDIO_INPUT" ] || [ -z "$OUTPUT_VIDEO" ]; then
    echo "Usage: ./assemble_video.sh <image_path> <audio_path> <output_path>"
    exit 1
fi

echo "--- Starting Industrial Render: $OUTPUT_VIDEO ---"

# Log Start
curl -X POST "$LOG_URL" \
     -H "Content-Type: application/json" \
     -d "{\"userId\": \"$USER_ID\", \"agentId\": \"ffmpeg_worker\", \"success\": true, \"message\": \"Starting render for $OUTPUT_VIDEO\"}"

# Execution: Applying high-retention Ken Burns zoom effect
# Formula: Scale to 8000px height, slow zoom (0.0005), 1080x1920 output
ffmpeg -loop 1 -i "$IMAGE_INPUT" -i "$AUDIO_INPUT" \
  -vf "scale=8000:-1,zoompan=z='min(zoom+0.0005,1.5)':d=125:x='iw/2-(iw/zoom/2)':y='ih/2-(ih/zoom/2)':s=1080x1920" \
  -c:v libx264 \
  -tune stillimage \
  -c:a aac \
  -b:a 192k \
  -pix_fmt yuv420p \
  -shortest \
  -y "$OUTPUT_VIDEO"

EXIT_CODE=$?

# Log Result
if [ $EXIT_CODE -eq 0 ]; then
    curl -X POST "$LOG_URL" \
         -H "Content-Type: application/json" \
         -d "{\"userId\": \"$USER_ID\", \"agentId\": \"ffmpeg_worker\", \"success\": true, \"message\": \"Render complete: $OUTPUT_VIDEO\"}"
else
    curl -X POST "$LOG_URL" \
         -H "Content-Type: application/json" \
         -d "{\"userId\": \"$USER_ID\", \"agentId\": \"ffmpeg_worker\", \"success\": false, \"message\": \"Render FAILED for $OUTPUT_VIDEO\"}"
fi

echo "--- Render Complete: $OUTPUT_VIDEO ---"
