# Use an official Node.js runtime with the same version as your host machine
FROM node:16.19.1

# Install necessary packages
RUN apt-get update && apt-get install -y python3 make g++

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to the container's working directory
COPY package*.json ./

# Install project dependencies
RUN npm install

# Rebuild native modules
RUN npm rebuild

# Copy the rest of your project to the container's working directory
COPY . .

# Expose the port on which your backend app runs (if you have defined one)
# Replace 3001 with the port number used by your backend app, if needed.
EXPOSE 3001

# Define the command to run your backend app
CMD ["node", "server.js"]
