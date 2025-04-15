# Interacting with Kubernetes via Dashboard


## Part I: Interact with the Deployed Application

### Step 1: Access the Kubernetes Dashboard

To start interacting with your Kubernetes cluster using the Dashboard:


1. **Start the Kubernetes Proxy:**:
    - Ensure your Kubernetes cluster is running on Docker Desktop
    - Open a terminal and start the kubectl proxy to expose the Kubernetes API server to your local machine:

    ```bash
    kubectl proxy
    ```
    This command starts a proxy to access Kubernetes resources through localhost.


    - Check the option Enable Kubernetes.
    - Click on **Apply & Restart** to start the Kubernetes cluster.

2. **Create access token**:
   - Create a temporary access token that would be needed to enter to access the dashboard 

```bash
kubectl -n kubernetes-dashboard create token admin-user
```


3. **Access the Dashboard**:
    - Open a browser and navigate to the following URL:

```bash
http://localhost:8001/api/v1/namespaces/kubernetes-dashboard/services/https:kubernetes-dashboard:/proxy/
```


### Step 2: Verify the Application is Running


You will first want to check that the Node.js application is running successfully in the cluster.


1. **Verify pods:**:
    - In the Kubernetes Dashboard, navigate to Workloads > Pods.
    - This section lists all the pods running in your Kubernetes cluster.
    - Ensure you see the pod for your Node.js application in the Running state

2. **Verify service:**:
    - In the Kubernetes Dashboard, go to Networking > Services.
    - Ensure you see your node-app-service listed.
    - The service should have an associated ClusterIP 


### Step 3: Access the application
  Now, open your browser and visit <http://localhost:nodeport Port>. Your Node.js app should be accessible.

You will now create a Kubernetes Deployment YAML file that will deploy the Docker image onto your Kubernetes cluster.


## Part II: Update the Application

### Step 1: Access the Kubernetes Dashboard

  Make the necessary changes to the application code (e.g., server.js or any other source files).

### Step2: Build and Push a New Docker Image::

1. **Build the docker image:**:
  - After modifying the code, you need to create a new Docker image with a new version tag (e.g., v2).
  - In your terminal, navigate to your project directory and run: 

 ```bash
    docker build -t australia-southeast2-docker.pkg.dev/sit737-25t1-vartak-29a614e/sumedh-sit737-task5hd/nodeapp-week5:v2 .
 ```

2. **Push the Image to Google Artifact Registry::**:
  - Once the image is built, push it to Google Artifact Registry:

 ```bash
docker push australia-southeast2-docker.pkg.dev/sit737-25t1-vartak-29a614e/sumedh-sit737-task5hd/nodeapp-week5:v2

 ```

### Step3: Update the Kubernetes Deployment to Use the New Image:

1. **Navigate to the Deployment in the Dashboard::**
  - In the Kubernetes Dashboard, go to Workloads > Deployments..
  - Find your node-app-deployment and click on it.

2. **Edit the deployment:**
  - Click the Edit button at the top-right of the deployment page..
  - In the editor, locate the image field under the containers section.
  - Update the image version to the new tag (v2)
  - Click Save to update the deployment.

3. **Monitor the rolling update:**
  - Kubernetes will automatically begin a rolling update to replace the old pods with new ones running the updated image.
  - You can track the progress by going to Workloads > Pods. You should see the new pods being created with the v2 image.

 ### Step4: Verify the update:
1. **Check pods:**
  - In the Kubernetes Dashboard, navigate to Workloads > Pods.
  - You should see the new pods running with the updated image (v2). The old pods should be terminated after the update is complete

2. **Access the Application:**
  - Open the browser and refresh http://localhost:nodeport port to see the updated version of the application






