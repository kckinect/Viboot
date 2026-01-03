#!/bin/bash

# AutoPlay Video Control - Chrome Extension Deployment Package Script
# This script creates a clean deployment-ready ZIP file for Chrome Web Store submission

set -e  # Exit on any error

echo "🚀 AutoPlay Deployment Package Creator"
echo "===================================="

# Configuration
EXTENSION_NAME="autoplay"
VERSION="2.0.0"
EXTENSION_DIR="extension"
OUTPUT_DIR="dist"
OUTPUT_FILE="${EXTENSION_NAME}-v${VERSION}.zip"

# Check if extension directory exists
if [ ! -d "$EXTENSION_DIR" ]; then
    echo "❌ Error: $EXTENSION_DIR directory not found!"
    exit 1
fi

# Clean previous builds
echo ""
echo "🧹 Cleaning previous builds..."
rm -rf "$OUTPUT_DIR"
mkdir -p "$OUTPUT_DIR"

# Create temporary directory for staging
TEMP_DIR=$(mktemp -d)
echo "📁 Created temporary staging directory: $TEMP_DIR"

# Copy extension files
echo ""
echo "📦 Copying extension files from $EXTENSION_DIR/..."

# Copy folders
cp -r "$EXTENSION_DIR/assets" "$TEMP_DIR/"
cp -r "$EXTENSION_DIR/background" "$TEMP_DIR/"
cp -r "$EXTENSION_DIR/content" "$TEMP_DIR/"
cp -r "$EXTENSION_DIR/popup" "$TEMP_DIR/"
cp -r "$EXTENSION_DIR/utils" "$TEMP_DIR/"

# Copy manifest
cp "$EXTENSION_DIR/manifest.json" "$TEMP_DIR/"

# Remove any .DS_Store files (macOS)
echo "🧹 Removing macOS system files..."
find "$TEMP_DIR" -name ".DS_Store" -delete

# Remove any .map files (source maps)
echo "🧹 Removing source maps..."
find "$TEMP_DIR" -name "*.map" -delete

# List of files being packaged
echo ""
echo "📋 Files included in package:"
echo "-----------------------------"
(cd "$TEMP_DIR" && find . -type f | sort)

# Count files
FILE_COUNT=$(cd "$TEMP_DIR" && find . -type f | wc -l)
echo "-----------------------------"
echo "Total files: $FILE_COUNT"

# Create ZIP file
echo ""
echo "🗜️  Creating ZIP archive..."
(cd "$TEMP_DIR" && zip -r -q "$OLDPWD/$OUTPUT_DIR/$OUTPUT_FILE" .)

# Get file size
FILE_SIZE=$(du -h "$OUTPUT_DIR/$OUTPUT_FILE" | cut -f1)
echo "✅ Created: $OUTPUT_DIR/$OUTPUT_FILE ($FILE_SIZE)"

# Cleanup
echo ""
echo "🧹 Cleaning up temporary files..."
rm -rf "$TEMP_DIR"

# Verify ZIP contents
echo ""
echo "🔍 Verifying ZIP contents..."
echo "-----------------------------"
unzip -l "$OUTPUT_DIR/$OUTPUT_FILE" | head -20
echo "... (use 'unzip -l $OUTPUT_DIR/$OUTPUT_FILE' to see full list)"

# Check file size limit (Chrome Web Store limit is 100MB)
FILE_SIZE_BYTES=$(stat -f%z "$OUTPUT_DIR/$OUTPUT_FILE" 2>/dev/null || stat -c%s "$OUTPUT_DIR/$OUTPUT_FILE" 2>/dev/null)
MAX_SIZE=$((100 * 1024 * 1024))  # 100MB in bytes

echo ""
if [ "$FILE_SIZE_BYTES" -gt "$MAX_SIZE" ]; then
    echo "⚠️  WARNING: ZIP file exceeds 100MB limit! ($FILE_SIZE)"
    echo "   Chrome Web Store requires extensions to be under 100MB."
else
    echo "✅ File size check passed: $FILE_SIZE (under 100MB limit)"
fi

# Final instructions
echo ""
echo "✅ Deployment package created successfully!"
echo ""
echo "📤 Next steps:"
echo "   1. Test the extension: Load '$OUTPUT_DIR/$OUTPUT_FILE' as unpacked in Chrome"
echo "   2. Take screenshots of the extension in action"
echo "   3. Create promotional images (440x280, 920x680, or 1400x560)"
echo "   4. Host your privacy policy at a public URL"
echo "   5. Go to: https://chrome.google.com/webstore/devconsole"
echo "   6. Upload '$OUTPUT_DIR/$OUTPUT_FILE'"
echo ""
echo "📖 See DEPLOYMENT_CHECKLIST.md for complete submission guide"
echo ""
