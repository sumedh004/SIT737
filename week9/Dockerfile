# Use the official Node.js image from the Docker Hub

FROM node:16

# Set the working directory inside the container

WORKDIR /usr/src/app

# Copy package.json and package-lock.json to install dependencies

COPY package*.json ./

# Install dependencies

RUN npm install

RUN npm install mongodb


# Copy the rest of the application code

COPY server.js .

COPY public /usr/src/app/public

COPY entrypoint.sh ./

RUN chmod +x entrypoint.sh


# Expose the application port

EXPOSE 3040

# Command to run the application

ENTRYPOINT ["./entrypoint.sh"]

CMD []

#australia-southeast2-docker.pkg.dev/sit737-25t1-vartak-29a614e/sumedh-sit737-task5hd/nodeapp-week5:latest