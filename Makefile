# Makefile for YYC Languages Website
# Controls npm and Docker build operations

# Variables
REGISTRY := localhost:5001
IMAGE_BASE_NAME := yyc-languages
CONTAINER_NAME := yyc-languages
PORT := 8080
COMPOSE_SERVICE := yycl

# Git branch detection
GIT_BRANCH := $(shell git rev-parse --abbrev-ref HEAD 2>/dev/null || echo "unknown")
GIT_COMMIT := $(shell git rev-parse --short HEAD 2>/dev/null || echo "unknown")

# Image tagging
IMAGE_TAG := $(GIT_BRANCH)

# Full image names
IMAGE_NAME := $(IMAGE_BASE_NAME):$(IMAGE_TAG)
IMAGE_LATEST := $(IMAGE_BASE_NAME):latest

.PHONY: help install dev build clean docker-build docker-run docker-stop docker-logs docker-clean docker-push

# Default target
help:
	@echo "Available commands:"
	@echo ""
	@echo "Current Git Context:"
	@echo "  Branch: $(GIT_BRANCH)"
	@echo "  Commit: $(GIT_COMMIT)"
	@echo "  Images: $(IMAGE_NAME) and $(IMAGE_LATEST)"
	@echo ""
	@echo "Development:"
	@echo "  install     - Install npm dependencies"
	@echo "  dev         - Start development server"
	@echo "  build       - Build production bundle"
	@echo "  clean       - Clean build artifacts"
	@echo ""
	@echo "Docker:"
	@echo "  docker-build     - Build Docker image (latest and branch tags)"
	@echo "  docker-run       - Run Docker container"
	@echo "  docker-stop      - Stop Docker container"
	@echo "  docker-logs      - Show Docker container logs"
	@echo "  docker-clean     - Remove Docker image and container"
	@echo "  docker-push      - Push latest and branch tags to registry"
	@echo "  images           - Show all available images"
	@echo ""
	@echo "Compose:"
	@echo "  compose-up   - Start with docker-compose"
	@echo "  compose-down - Stop with docker-compose"
	@echo "  compose-logs - Show docker-compose logs"
	@echo ""
	@echo "Full Deployment:"
	@echo "  deploy       - Build locally and create Docker image"

# Development Commands
install:
	@echo "Installing npm dependencies..."
	npm install

dev:
	@echo "Starting development server..."
	npm run dev

build:
	@echo "Building production bundle..."
	npm run build

clean:
	@echo "Cleaning build artifacts..."
	rm -rf build
	npm run clean 2>/dev/null || true

# Docker Commands
docker-build:
	@echo "Building Docker image..."
	@echo "  Branch: $(GIT_BRANCH)"
	@echo "  Images: $(IMAGE_NAME) and $(IMAGE_LATEST)"
	docker build -t $(IMAGE_NAME) -t $(IMAGE_LATEST) .

docker-run:
	@echo "Running Docker container $(CONTAINER_NAME) on port $(PORT)..."
	docker run -d --name $(CONTAINER_NAME) -p $(PORT):80 $(IMAGE_NAME)

docker-stop:
	@echo "Stopping Docker container $(CONTAINER_NAME)..."
	docker stop $(CONTAINER_NAME) 2>/dev/null || true

docker-logs:
	@echo "Showing logs for $(CONTAINER_NAME)..."
	docker logs -f $(CONTAINER_NAME)

docker-clean:
	@echo "Cleaning up Docker resources..."
	-docker stop $(CONTAINER_NAME) 2>/dev/null
	-docker rm $(CONTAINER_NAME) 2>/dev/null
	-docker rmi $(IMAGE_NAME) 2>/dev/null
	-docker rmi $(IMAGE_LATEST) 2>/dev/null


docker-push:
	@echo "Pushing Docker images to registry..."
	@echo "  Registry: $(REGISTRY)"
	@echo "  Images: $(IMAGE_NAME) and $(IMAGE_LATEST)"
	# Tag and push branch image
	docker tag $(IMAGE_NAME) $(REGISTRY)/$(IMAGE_NAME)
	docker push $(REGISTRY)/$(IMAGE_NAME)
	# Tag and push latest image
	docker tag $(IMAGE_LATEST) $(REGISTRY)/$(IMAGE_LATEST)
	docker push $(REGISTRY)/$(IMAGE_LATEST)

# Docker Compose Commands
compose-up:
	@echo "Starting services with docker compose..."
	docker compose up -d

compose-down:
	@echo "Stopping services with docker compose..."
	docker compose down

compose-logs:
	@echo "Showing docker compose logs..."
	docker compose logs -f $(COMPOSE_SERVICE)

# Full Deployment Workflow
deploy: build docker-build docker-push
	@echo "Deployment complete!"
	@echo "Run 'make docker-run' to start the container"
	@echo "Or 'make compose-up' to use docker-compose"

# Quick Development Workflow
dev-full: install dev
	@echo "Development environment ready!"

# Production Build Workflow
prod-build: install build docker-build
	@echo "Production build complete!"

# Status Commands
status:
	@echo "Container status:"
	@docker ps -a --filter "name=$(CONTAINER_NAME)" 2>/dev/null || echo "No containers found"
	@echo ""
	@echo "Image status:"
	@docker images $(IMAGE_BASE_NAME) 2>/dev/null || echo "No images found"

images:
	@echo "Available $(IMAGE_BASE_NAME) images:"
	@docker images $(IMAGE_BASE_NAME) 2>/dev/null || echo "No images found"

# Clean Everything
clean-all: clean docker-clean compose-down
	@echo "All cleaned up!"

# Interactive Development
watch:
	@echo "Starting development with auto-reload..."
	npm run dev

# Test Commands (if you add tests later)
test:
	@echo "Running tests..."
	npm test 2>/dev/null || echo "No test script configured"

lint:
	@echo "Running linting..."
	npm run lint 2>/dev/null || echo "No lint script configured"

sync:
    rsync -avu --exclude node_modules ./ andi@192.168.1.10:/home/andi/docker/yyc-languages/
