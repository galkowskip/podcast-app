# Use the official Node.js 14 image as the base image
FROM node:18

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install project dependencies
RUN npm i -g pnpm
RUN pnpm install

# Copy the rest of the application code to the working directory
COPY . .

# Expose the port that the Nest.js application will run on
EXPOSE 3000

# Start the Nest.js application
CMD [ "npm", "run", "start:dev" ]