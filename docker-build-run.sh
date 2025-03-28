#!/bin/bash

# Stop and remove any existing container with the same name
docker stop devfolio-container 2>/dev/null || true
docker rm devfolio-container 2>/dev/null || true

# Build the Docker image
echo "Building Docker image..."
docker build -t devfolio-image .

# Run the container
echo "Running container..."
docker run -d -p 3000:3000 --name devfolio-container devfolio-image

echo "Container is now running! Access your portfolio at http://localhost:3000"
