# Use the official Alpine Linux image as the base image
FROM node:18.12.1-alpine

# Create a directory for your Node.js application
WORKDIR /app

# Copy your Node.js application code into the container
COPY . .

# Install Node.js dependencies
RUN npm install

# Expose the port on which your Node.js application will listen
EXPOSE 7777

# Run your Node.js application from index.js
CMD ["node", "index.js"]
