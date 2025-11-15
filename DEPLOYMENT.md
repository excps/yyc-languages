# Docker Deployment Guide

This guide explains how to deploy the YYC Languages website using Docker.

## Quick Start

### Using Makefile (Recommended)

1. **Install dependencies and start development:**
   ```bash
   make dev-full
   ```

2. **Build and deploy to Docker:**
   ```bash
   make deploy
   make compose-up
   ```

3. **Access the application:**
   Open http://localhost:8080 in your browser

4. **Stop the application:**
   ```bash
   make compose-down
   ```

### Prerequisites
1. **Build the React application locally:**
   ```bash
   npm run build
   ```

### Using Docker Compose

1. **Build and run the application:**
   ```bash
   docker-compose up -d
   ```

2. **Access the application:**
   Open http://localhost:8080 in your browser

3. **Stop the application:**
   ```bash
   docker-compose down
   ```

### Using Docker Directly

1. **Build the image:**
   ```bash
   docker build -t yyc-languages-website .
   ```

2. **Run the container:**
   ```bash
   docker run -p 8080:80 --name yyc-languages-website yyc-languages-website
   ```

## Environment Variables

The following environment variables can be customized:

- `APP_TITLE`: Website title (default: "YYC Languages")
- `APP_DESCRIPTION`: Website description (default: "German Language Tutoring Service")
- `API_URL`: API endpoint URL (default: "/api")
- `CONTACT_EMAIL`: Contact email address (default: "info@yyc-languages.com")

### Customizing Environment Variables

**Using Docker Compose:**
```bash
APP_TITLE="My Language School" docker-compose up -d
```

**Using Docker Run:**
```bash
docker run -p 8080:80 -e APP_TITLE="My Language School" yyc-languages-website
```

**Using .env file:**
Create a `.env` file:
```env
APP_TITLE=My Language School
APP_DESCRIPTION=Custom Language Tutoring
API_URL=/api/v1
CONTACT_EMAIL=contact@myschool.com
```
Then run:
```bash
docker-compose --env-file .env up -d
```

## Production Deployment

### 1. Build for Production
```bash
# Build the optimized production image
docker build -t yyc-languages-website:latest .
```

### 2. Deploy to Production
```bash
# Run with production settings
docker run -d \
  --name yyc-languages-website \
  -p 80:80 \
  -e NODE_ENV=production \
  -e APP_TITLE="YYC Languages" \
  --restart unless-stopped \
  yyc-languages-website:latest
```

### 3. Using Docker Compose in Production

Create a `docker-compose.prod.yml`:
```yaml
version: '3.8'
services:
  language-tutoring-website:
    image: yyc-languages-website:latest
    container_name: yyc-languages-website
    ports:
      - "80:80"
    restart: unless-stopped
    environment:
      - NODE_ENV=production
      - APP_TITLE=YYC Languages
      - APP_DESCRIPTION=German Language Tutoring Service
    deploy:
      resources:
        limits:
          memory: 512M
          cpus: '1.0'
```

Deploy:
```bash
docker-compose -f docker-compose.prod.yml up -d
```

## Features

### Security
- Runs as non-root user
- Security headers configured
- Content Security Policy enabled
- HTTPS ready (when used with reverse proxy)

### Performance
- Gzip compression enabled
- Static asset caching (1 year)
- Optimized nginx configuration
- Multi-stage Docker build

### Monitoring
- Health checks included
- Resource limits configured
- Logging enabled

## Troubleshooting

### Check Container Status
```bash
docker ps
docker logs yyc-languages-website
```

### Health Check
```bash
docker inspect --format='{{.State.Health.Status}}' yyc-languages-website
```

### Environment Variables
```bash
docker exec yyc-languages-website env
```

## SSL/HTTPS Setup (Optional)

For production deployment with SSL:

1. **Set up reverse proxy** with SSL termination
2. **Use Let's Encrypt** for free SSL certificates
3. **Configure nginx** to redirect HTTP to HTTPS

Example nginx proxy configuration available in `docker-compose.yml` comments.