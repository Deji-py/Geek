# Use the official Node.js image from Docker Hub
FROM node:18-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

RUN apk add --no-cache \
    vips \
    vips-dev \
    build-base \
    python3

# Install dependencies defined in package.json
RUN npm install

# Install sharp module
RUN npm install sharp

# Copy the rest of the application code
COPY . .

# Build the Next.js application
RUN npm run build

# Expose the port the app runs on
EXPOSE 3000

# Start the application
CMD ["npm", "start"]
