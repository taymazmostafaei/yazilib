# Use the official Alpine Linux image as the base image
FROM node:18.12.1-alpine

# Install MongoDB
RUN apk --update --no-cache add mongodb-tools

# Install Redis
RUN apk --update --no-cache add redis

# Create a directory for your Node.js application
WORKDIR /app

# Copy your Node.js application code into the container
COPY . .

# Install Node.js dependencies
RUN npm install

# Start MongoDB and create the 'yazilib' database
RUN mkdir -p /data/db
CMD ["mongod", "--dbpath=/data/db"] && \
    sleep 5 && \
    mongo yazilib --eval "db.getCollectionNames()"

# Expose the port on which your Node.js application will listen
EXPOSE 3000

# Run your Node.js application from index.js
CMD ["node", "index.js"]
