#!/bin/zsh

# Portainer Stack Update Script
# Updates a Portainer stack with a new image version from localhost:5001 registry

set -e

# Configuration
PORTAINER_URL="${PORTAINER_URL:-https://docker.local:9443}"
PORTAINER_TOKEN="${PORTAINER_TOKEN:-}"
STACK_NAME="${STACK_NAME:-yyclang}"
IMAGE_NAME="yyc-languages"
REGISTRY="localhost:5001"

# Check if version parameter is provided
if [ -z "$1" ]; then
    echo "Usage: $0 <version>"
    echo "Example: $0 v0.2.14"
    exit 1
fi

NEW_VERSION="$1"
NEW_IMAGE="${REGISTRY}/${IMAGE_NAME}:${NEW_VERSION}"

echo "🔄 Updating Portainer stack: $STACK_NAME"
echo "   New image: $NEW_IMAGE"
echo ""

# Check if jq is installed
if ! command -v jq &> /dev/null; then
    echo "❌ Error: jq is not installed"
    echo ""
    echo "jq is required to parse JSON responses from Portainer API"
    echo ""
    echo "To install jq:"
    echo "  Ubuntu/Debian: sudo apt-get install -y jq"
    echo "  CentOS/RHEL:   sudo yum install -y jq"
    echo "  macOS:         brew install jq"
    echo ""
    exit 1
fi

# Check if PORTAINER_TOKEN is set
if [ -z "$PORTAINER_TOKEN" ]; then
    echo "❌ Error: PORTAINER_TOKEN environment variable is not set"
    echo ""
    echo "To create an API token:"
    echo "1. Login to Portainer at https://docker.local:9443"
    echo "2. Go to User menu > My account"
    echo "3. Navigate to 'Access tokens' section"
    echo "4. Click 'Add access token'"
    echo "5. Export the token: export PORTAINER_TOKEN='your-token-here'"
    echo "6. Add to ~/.bashrc or ~/.zshrc to persist"
    exit 1
fi

# Function to call Portainer API
portainer_api() {
    local method="$1"
    local endpoint="$2"
    local data="$3"

    if [ -n "$data" ]; then
        curl -s -k -X "$method" \
            -H "X-API-Key: $PORTAINER_TOKEN" \
            -H "Content-Type: application/json" \
            -d "$data" \
            "${PORTAINER_URL}${endpoint}"
    else
        curl -s -k -X "$method" \
            -H "X-API-Key: $PORTAINER_TOKEN" \
            "${PORTAINER_URL}${endpoint}"
    fi
}

# Step 0: Check Portainer connectivity
echo "0️⃣  Checking Portainer connectivity..."
echo "   URL: $PORTAINER_URL"

# Try to connect to Portainer (with timeout)
HEALTH_CHECK=$(curl -s -k --connect-timeout 5 --max-time 10 -o /dev/null -w "%{http_code}" "${PORTAINER_URL}/api/system/status" 2>/dev/null)

if [ "$HEALTH_CHECK" = "000" ]; then
    echo "❌ Error: Cannot reach Portainer at $PORTAINER_URL"
    echo ""
    echo "Possible issues:"
    echo "  - Portainer is not running"
    echo "  - URL is incorrect"
    echo "  - Network/firewall blocking access"
    echo "  - SSL certificate issues (using -k flag to bypass)"
    echo ""
    echo "Try manually:"
    echo "  curl -k $PORTAINER_URL/api/system/status"
    exit 1
elif [ "$HEALTH_CHECK" = "401" ] || [ "$HEALTH_CHECK" = "403" ]; then
    echo "✅ Portainer is reachable (HTTP $HEALTH_CHECK - auth required, which is expected)"
elif [ "$HEALTH_CHECK" = "200" ]; then
    echo "✅ Portainer is reachable (HTTP $HEALTH_CHECK)"
else
    echo "⚠️  Portainer responded with HTTP $HEALTH_CHECK"
fi
echo ""

# Step 1: Get stack ID by name
echo "1️⃣  Finding stack '$STACK_NAME'..."
STACKS_RESPONSE=$(portainer_api GET "/api/stacks")

# Check if response is valid JSON
if ! echo "$STACKS_RESPONSE" | jq empty 2>/dev/null; then
    echo "❌ Error: Invalid response from Portainer API"
    echo ""
    echo "Response received:"
    echo "$STACKS_RESPONSE"
    echo ""
    exit 1
fi

# Check if response is an error object
if echo "$STACKS_RESPONSE" | jq -e 'has("message")' > /dev/null 2>&1; then
    ERROR_MSG=$(echo "$STACKS_RESPONSE" | jq -r '.message')
    echo "❌ Error from Portainer API: $ERROR_MSG"
    echo ""
    echo "Response details:"
    echo "$STACKS_RESPONSE" | jq .
    echo ""
    echo "Possible issues:"
    echo "  - PORTAINER_TOKEN is invalid or expired"
    echo "  - PORTAINER_URL is incorrect (currently: $PORTAINER_URL)"
    echo "  - Insufficient permissions for the API token"
    exit 1
fi

# Check if response is an array
if ! echo "$STACKS_RESPONSE" | jq -e 'type == "array"' > /dev/null 2>&1; then
    echo "❌ Error: Unexpected response format from Portainer API"
    echo ""
    echo "Expected an array of stacks, got:"
    echo "$STACKS_RESPONSE" | jq .
    exit 1
fi

STACK_ID=$(echo "$STACKS_RESPONSE" | jq -r ".[] | select(.Name==\"$STACK_NAME\") | .Id")

if [ -z "$STACK_ID" ] || [ "$STACK_ID" = "null" ]; then
    echo "❌ Error: Stack '$STACK_NAME' not found"
    echo ""
    STACK_COUNT=$(echo "$STACKS_RESPONSE" | jq 'length')
    if [ "$STACK_COUNT" -eq 0 ]; then
        echo "No stacks found in Portainer"
    else
        echo "Available stacks:"
        echo "$STACKS_RESPONSE" | jq -r '.[].Name'
    fi
    exit 1
fi

echo "✅ Found stack ID: $STACK_ID"
echo ""

# Step 2: Get stack details
echo "2️⃣  Fetching stack details..."
STACK_DETAILS=$(portainer_api GET "/api/stacks/$STACK_ID")
ENDPOINT_ID=$(echo "$STACK_DETAILS" | jq -r '.EndpointId')
STACK_FILE=$(echo "$STACK_DETAILS" | jq -r '.StackFileContent')
ENV_VARS=$(echo "$STACK_DETAILS" | jq -c '.Env // []')

if [ -z "$ENDPOINT_ID" ] || [ "$ENDPOINT_ID" = "null" ]; then
    echo "❌ Error: Could not retrieve endpoint ID"
    exit 1
fi

echo "✅ Endpoint ID: $ENDPOINT_ID"
echo ""

# Step 3: Update image version in stack file
echo "3️⃣  Updating image version..."
echo "   Current stack file preview:"
echo "$STACK_FILE" | grep -A 2 -B 2 "image:" || echo "   (no image line found)"
echo ""

# Replace the image line with new version
UPDATED_STACK_FILE=$(echo "$STACK_FILE" | sed "s|image: ${REGISTRY}/${IMAGE_NAME}:v[0-9\.]*|image: ${NEW_IMAGE}|g")

# Check if replacement was successful
if [ "$STACK_FILE" = "$UPDATED_STACK_FILE" ]; then
    echo "⚠️  Warning: No image line matched the pattern"
    echo "   Looking for: image: ${REGISTRY}/${IMAGE_NAME}:vX.X.X"
    echo "   Trying alternative patterns..."

    # Try without registry prefix
    UPDATED_STACK_FILE=$(echo "$STACK_FILE" | sed "s|image: ${IMAGE_NAME}:v[0-9\.]*|image: ${NEW_IMAGE}|g")

    if [ "$STACK_FILE" = "$UPDATED_STACK_FILE" ]; then
        echo "❌ Error: Could not find image line to update"
        echo ""
        echo "Stack file content:"
        echo "$STACK_FILE"
        exit 1
    fi
fi

echo "✅ Updated to: $NEW_IMAGE"
echo ""

# Step 4: Prepare JSON payload
echo "4️⃣  Preparing update payload..."

# Escape the stack file for JSON
ESCAPED_STACK_FILE=$(echo "$UPDATED_STACK_FILE" | jq -Rs .)

# Create JSON payload
JSON_PAYLOAD=$(jq -n \
    --argjson stackFile "$ESCAPED_STACK_FILE" \
    --argjson env "$ENV_VARS" \
    '{
        StackFileContent: $stackFile,
        Env: $env,
        Prune: false,
        PullImage: true
    }')

echo "✅ Payload prepared"
echo "   - PullImage: true (will pull from registry)"
echo "   - Prune: false (keeps existing resources)"
echo ""

# Step 5: Update the stack
echo "5️⃣  Updating stack via API..."
RESPONSE=$(portainer_api PUT "/api/stacks/$STACK_ID?endpointId=$ENDPOINT_ID" "$JSON_PAYLOAD")

# Check if response contains error
if echo "$RESPONSE" | jq -e '.message' > /dev/null 2>&1; then
    ERROR_MSG=$(echo "$RESPONSE" | jq -r '.message')
    echo "❌ Error updating stack: $ERROR_MSG"
    exit 1
fi

echo "✅ Stack updated successfully"
echo ""

# Step 6: Trigger stack redeploy with image pull
echo "6️⃣  Stack will pull image and redeploy..."
echo "   Portainer is now:"
echo "   - Pulling image: $NEW_IMAGE"
echo "   - Redeploying containers"
echo ""

echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "🎉 Portainer stack update complete!"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "Stack: $STACK_NAME"
echo "Image: $NEW_IMAGE"
echo ""
echo "Check status at: ${PORTAINER_URL}/#!/stacks"
