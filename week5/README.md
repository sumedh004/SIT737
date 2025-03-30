# Docker Project

## Overview

This project involves containerizing a Node.js web application using Docker. The application will be set up to run within Docker containers, with health checks configured to ensure automatic restarts in case of failures.

## Prerequisites

- [Node.js](https://nodejs.org/) installed on your machine.
- Basic understanding of Node.js and Express.js.
- - **Docker:** Platform for developing, shipping, and running applications in containers.

## Project Setup

### 1. Clone the Repository

Begin by cloning this repository to your local machine:

```bash
git clone https://github.com/sumedh004/SIT737.git
cd SIT737/week5
```

### 2. Install dependencies
Navigate to the project directory and install the necessary Node.js dependencies:​



```bash
npm install
```


### 3. Creating the Dockerfile

 Create a file named Dockerfile with the following content:

 ```dockerfile

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

```


### 4. Creating Docker compose file:

In the same directory, create a docker-compose.yml file to define and manage the  Docker application:​

```yaml
version: '3.8'

services:
  web:
    image: sumedh004/nodeapp-week5
    ports:
      - "3040:3040"
    healthcheck:
      test: ["CMD", "curl", "-i", "http://localhost:3040/ || exit 1"] 
      interval: 30s
      timeout: 10s
      retries: 10
    restart: unless-stopped



```

### 5. Implementing helath check

We are using curl command in the docker compose file to check the health of the application

### 6. Build and run the application



- **Build docker image:**

In the terminal, run the following command to build the Docker image:​

```bash
docker build -t sumedh004/nodeapp-week5 .

```

- **Start the application:**
  Launch the application in detached mode:​

```bash
docker-compose up -d
``` 


- **Verify that app is running:**
 Access http://localhost:3040 in  browser to ensure the application is running

### 7. Push image to dockerhub
```bash
docker push your_dockerhub_username/your_image_name:tag
```






   


