#!/bin/sh
# Docker entrypoint script for YYC Languages
# Handles environment variable substitution in static files if needed

set -e

# If there are any environment variables that need to be substituted
# into the built files, do it here. For now, we just pass through.

# Execute the CMD passed to the container
exec "$@"
