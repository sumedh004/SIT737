# Deploying Node.js Application to Kubernetes

## Prerequisites

Before you begin, ensure that you have the following tools installed:

- **Docker Desktop** (with Kubernetes enabled)
- **Google Cloud SDK** (gcloud)
- **kubectl** (Kubernetes CLI)
- A **Google Cloud project** with an Artifact Registry setup.

### Step 1: Set Up Kubernetes Cluster on Docker Desktop**

1. **Enable Kubernetes on Docker Desktop**:
    - Open **Docker Desktop** and go to the Settings window.
    - In the Settings window, select the **Kubernetes** tab.
    - Check the option Enable Kubernetes.
    - Click on **Apply & Restart** to start the Kubernetes cluster.
2. **Verify Kubernetes Cluster**:
    - Open a terminal and verify that Kubernetes is running with the following command:

```bash

kubectl cluster-info
```

- - This should output information about the Kubernetes cluster, confirming it's up and running.

### Step 2: Build the Docker Image

You will need to create a Docker image of the Node.js application and push it to Google Artifact Registry.

1. **Dockerfile**: In your project directory, create a Dockerfile as shown below:

```dockerfile

# Use the official Node.js image from the Docker Hub

FROM node:16

# Set the working directory inside the container

WORKDIR /usr/src/app

# Copy package.json and package-lock.json to install dependencies

COPY package\*.json ./

# Install dependencies

RUN npm install

# Copy the rest of the application code

COPY server.js .

COPY public /usr/src/app/public

# Expose the application port

EXPOSE 3040

# Command to run the application

CMD \["node", "server.js"\]
```

1. **Authenticate Docker with Google Cloud**:
    - Use gcloud to authenticate Docker to Google Artifact Registry:

```bash



gcloud auth configure-docker
```

1. **Build Docker Image**:
    - Build the Docker image using the following command in the project directory (where the Dockerfile is located):

```bash



docker build -t australia-southeast2-docker.pkg.dev/sit737-25t1-vartak-29a614e/sumedh-sit737-task5hd/nodeapp-week5:latest .
```

1. **Push Docker Image to Artifact Registry**:
    - After building the image, push it to the Artifact Registry with the following command:

```bash


docker push australia-southeast2-docker.pkg.dev/sit737-25t1-vartak-29a614e/sumedh-sit737-task5hd/nodeapp-week5:latest
```

### Step 3: Create Kubernetes Deployment

You will now create a Kubernetes Deployment YAML file that will deploy the Docker image onto your Kubernetes cluster.

1. **Create the Deployment YAML**:
    - In the project directory, create a file called deployment.yaml with the following content:

```yaml



apiVersion: apps/v1
kind: Deployment
metadata:
  name: nodeapp
spec:
  replicas: 3
  selector:
    matchLabels:
      app: nodeapp
  template:
    metadata:
      labels:
        app: nodeapp
    spec:
      imagePullSecrets:
       - name: gcr
      containers:
      - name: nodeapp
        image: australia-southeast2-docker.pkg.dev/sit737-25t1-vartak-29a614e/sumedh-sit737-task5hd/nodeapp-week5:latest
        ports:
        - containerPort: 3040


```

1. **Deploy the Application**:
    - Run the following command to deploy the app:

```bash



kubectl apply -f deployment.yaml
```

1. **Verify Deployment**:
    - To check if the deployment was successful, use the following command:

```bash



kubectl get deployments
```

- - The output should show the node-app-deployment along with the number of replicas.

### Step 4: Create Kubernetes Service

Now that the deployment is running, you will expose your application via a Kubernetes Service to allow access to the app from outside the cluster.

1. **Create the Service YAML**:
    - Create a file called service.yaml with the following content:

```yaml

apiVersion: v1
kind: Service
metadata:
  name: nodeapp-service
spec:
  selector:
    app: nodeapp
  ports:
    - protocol: TCP
      port: 80
      targetPort: 3040
  type: NodePort

```

1. **Apply the Service**:
    - To create the service, run:

```bash



kubectl apply -f service.yaml
```

1. **Verify the Service**:
    - After the service is created, check the status using:

```bash



kubectl get services
```

- - You should see the node-app-service in the output with a CLUSTER-IP.

### Step 5: Access the Application

1. **Access the Application**:
    - Now, open your browser and visit <http://localhost:nodeport Port>. Your Node.js app should be accessible.