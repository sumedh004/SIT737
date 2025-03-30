# Use the official Node.js image from the Docker Hub

FROM node:16

# Set the working directory inside the container

WORKDIR /usr/src/app

# Copy package.json and package-lock.json to install dependencies

COPY package*.json ./

# Install dependencies

RUN npm install

# Copy the rest of the application code

COPY server.js .

COPY public /usr/src/app/public

# Expose the application port

EXPOSE 3040

# Command to run the application

CMD ["node","server.js"]