# Use an official Node.js runtime as a parent image
FROM node:14-alpine

# Set the working directory to /app
WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code to the container
COPY . .

# Build the production-ready assets
RUN npm run build

# Set environment variable to serve application on port 80
ENV PORT=80

# Expose port 80 for the container
EXPOSE 80

# Start the application
CMD [ "npm", "run", "dev" ]