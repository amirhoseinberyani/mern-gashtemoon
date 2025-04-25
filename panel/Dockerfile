# Use the official Node.js 18 image as the base image
FROM node:18

# Set the working directory inside the container
WORKDIR /app

# Copy only package.json and package-lock.json to leverage Docker caching
COPY package*.json ./

# Install dependencies
# RUN npm cache clean --force
RUN npm install --force

# Copy the rest of the application code
COPY . .

# Expose the application port
EXPOSE 4000

# Define the command to run the application
CMD ["npm", "start"]