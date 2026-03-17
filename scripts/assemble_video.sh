#!/bin/bash
# scripts/assemble_video.sh
# Industrial FFmpeg composition script for high-retention media assets.

IMAGE_INPUT=$1
AUDIO_INPUT=$2
OUTPUT_VIDEO=$3

# validation
if [ -z "$IMAGE_INPUT" ] || [ -z "$AUDIO_INPUT" ] || [ -z "$OUTPUT_VIDEO" ]; then
    echo "Usage: ./assemble_video.sh <image_path> <audio_path> <output_path>"
    exit 1
fi

echo "--- Starting Industrial Render: $OUTPUT_VIDEO ---"

# Logic:
# 1. Loop 1: Treat image as a stream
# 2. Scale 8000: Preventing pixelation during heavy zoompan
# 3. Zoompan: Subtle 0.0005 factor, 1.5x max, centered (1080x1920)
# 4. Libx264: H.264 encoding for YouTube compatibility
# 5. Shortest: Terminate video when audio ends

ffmpeg -loop 1 -i "$IMAGE_INPUT" -i "$AUDIO_INPUT" \
  -vf "scale=8000:-1,zoompan=z='min(zoom+0.0005,1.5)':d=125:x='iw/2-(iw/zoom/2)':y='ih/2-(ih/zoom/2)':s=1080x1920" \
  -c:v libx264 \
  -tune stillimage \
  -c:a aac \
  -b:a 192k \
  -pix_fmt yuv420p \
  -shortest \
  -y "$OUTPUT_VIDEO"

echo "--- Render Complete: $OUTPUT_VIDEO ---"
