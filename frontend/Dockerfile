# Use an official Node.js runtime as the base image
FROM node:14

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to the container's working directory
COPY package*.json ./

# Install project dependencies
RUN npm install

# Copy the entire project to the container's working directory
COPY . .

# Build the frontend application (if you use any build command like `npm run build`)
# Replace "build" with the command you use to build your frontend app, if needed.
RUN npm run build

# Expose the port on which your frontend app runs (if you have defined one)
# Replace 3000 with the port number used by your frontend app, if needed.
EXPOSE 3000

# Define the command to run your frontend app (serve the built files)
CMD ["npm", "run", "start"]
