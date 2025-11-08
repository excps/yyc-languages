#!/bin/sh

# Environment variable substitution for React app
# This script replaces placeholders in the built index.html with actual environment variables

set -e

# Default environment variables if not set
: "${APP_TITLE:=YYC Languages}"
: "${APP_DESCRIPTION:=German Language Tutoring Service}"
: "${API_URL:=/api}"
: "${CONTACT_EMAIL:=info@yyc-languages.com}"

# Create a temporary file for environment variables
ENV_FILE="/tmp/react-env.js"

# Generate JavaScript file with environment variables
cat > "$ENV_FILE" <<EOF
window.env = {
  APP_TITLE: "${APP_TITLE}",
  APP_DESCRIPTION: "${APP_DESCRIPTION}",
  API_URL: "${API_URL}",
  CONTACT_EMAIL: "${CONTACT_EMAIL}"
};
EOF

# Copy the environment file to the HTML directory
cp "$ENV_FILE" /usr/share/nginx/html/env.js

# Log environment setup
echo "Environment variables set:"
echo "  APP_TITLE: ${APP_TITLE}"
echo "  APP_DESCRIPTION: ${APP_DESCRIPTION}"
echo "  API_URL: ${API_URL}"
echo "  CONTACT_EMAIL: ${CONTACT_EMAIL}"

# Execute the main command (nginx)
exec "$@"