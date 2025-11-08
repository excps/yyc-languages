#!/bin/bash

# Script to help configure Docker for insecure registry access

echo "Docker Registry Configuration Helper"
echo "=================================="
echo ""
echo "ISSUE: Your registry at 192.168.1.10:5001 is HTTP-only,"
echo "but Docker requires HTTPS or insecure registry configuration."
echo ""
echo "SOLUTION: Add registry to Docker's insecure registries"
echo "------------------------------------------------------"
echo "1. Open Docker Desktop"
echo "2. Go to Settings -> Docker Engine"
echo "3. Add this line to the JSON configuration:"
echo "   \"insecure-registries\": [\"192.168.1.10:5001\"]"
echo "4. Click 'Apply & Restart'"
echo ""
echo "Alternative: Use the hostname instead"
echo "--------------------------------------"
echo "You can also use the hostname:"
echo "   \"insecure-registries\": [\"docker0.local:5001\"]"
echo ""
echo "Current registry test:"
curl -s http://192.168.1.10:5001/v2/_catalog | jq . 2>/dev/null || curl -s http://192.168.1.10:5001/v2/_catalog
echo ""
echo "After configuration, test with:"
echo "make docker-push"