# Deployment Guide: Node.js Microservice to Google Cloud Container Registry

This guide explains how to prepare and deploy  Node.js microservice by publishing it to a private container registry hosted in Google Cloud.

---

## Table of Contents
- [Prerequisites](#prerequisites)
- [Step 1: Create a Private Container Registry on Google Cloud](#step-1-create-a-private-container-registry-on-google-cloud)
- [Step 2: Authenticate Docker with Google Cloud](#step-2-authenticate-docker-with-google-cloud)
- [Step 3: Build Your Docker Image](#step-3-build-docker-image)
- [Step 4: Tag the Docker Image](#step-4-tag-the-docker-image)
- [Step 5: Push the Image to Google Cloud Container Registry](#step-5-push-the-image-to-google-cloud-container-registry)
- [Step 6: Verify Deployment](#step-6-verify-deployment)


---

## Prerequisites

Ensure the following tools installed and configured:
- **Git**: Version control system ([Download Git](https://git-scm.com/))
- **Visual Studio Code**: Code editor ([Download VS Code](https://code.visualstudio.com/))
- **Node.js**: Runtime environment for JavaScript ([Download Node.js](https://nodejs.org/en/download/))
- **Docker**: Containerization platform ([Install Docker](https://docs.docker.com/get-docker/))
- **Google Cloud SDK (gcloud CLI)**: Command-line interface for Google Cloud ([Install gcloud CLI](https://cloud.google.com/sdk/docs/install))

---

## Step 1: Create a Private Container Registry on Google Cloud

### 1.1 Enable the Container Registry API
1. Log in to  Google Cloud Console at [https://console.cloud.google.com/](https://console.cloud.google.com/).
2. Navigate to **APIs & Services**.
3. Search for "Container Registry API" and click **Enable**.

### 1.2 Set Up Project
1. Open terminal and set your active project:

```bash
gcloud config set project <PROJECT_ID>
```

Replace `<PROJECT_ID>` with  actual Google Cloud project ID.

---

## Step 2: Authenticate Docker with Google Cloud

To push images to the private registry, we need to authenticate Docker with  Google Cloud account.

Run the following command:

```bash
gcloud auth configure-docker
```


## Step 3: Build Docker Image

Build the docker image using the provided `Dockerfile`.

### 3.1 Build the Image Locally
Run this command in the directory containing  `Dockerfile`:

```bash
docker build -t nodeapp-week5 .

```


This will build an image named `nodeapp-week5` based on  `Dockerfile`.

---

## Step 4: Tag the Docker Image

Before pushing the image to the registry, tag it with the correct format for Google Cloud Container Registry.

### 4.1 Tagging Format
The format for tagging is:

```bash
[LOCATION]-docker.pkg.dev/[PROJECT_ID]/[REPOSITORY]/[IMAGE_NAME]:[TAG]
```


Where:
- `[LOCATION]`: The region or multi-region of  registry (e.g., `us-central1`, `eu`, `asia`).
- `[PROJECT_ID]`:  Google Cloud project ID.
- `[REPOSITORY]`: The repository name (e.g., `my-repo`).
- `[IMAGE_NAME]`: The name of  image (e.g., `nodeapp-week5`).
- `[TAG]`: The version tag (e.g., `latest`, `1.0.0`).

### 4.2 Example Tagging Command
Assume:
- Project ID: `my-gcp-project`
- Region: `us-central1`
- Repository Name: `my-repo`
- Image Name: `nodeapp-week5`
- Tag: `1.0.0`

Run:
```bash
docker tag nodeapp-week5 us-central1-docker.pkg.dev/my-gcp-project/my-repo/nodeapp-week5:1.0.0
```


---

## Step 5: Push the Image to Google Cloud Container Registry

Push the tagged image to  private container registry using this command:

```bash
docker push us-central1-docker.pkg.dev/my-gcp-project/my-repo/nodeapp-week5:1.0.0
```




## Step 6: Verify Deployment

After pushing, verify that  application can run using the published image.

### 6.1 Remove Local Image (Optional)
To ensure  pulling from the registry, remove the local image


### 6.2 Run Image from Registry
Run the image directly from Google Cloud Container Registry:

```bash
docker run -p 3040:3040 us-central1-docker.pkg.dev/my-gcp-project/my-repo/nodeapp-week5:1.0.0
```


### 6.3 Test Application
Open a browser or use a tool like `curl` to access  application at:

http://localhost:3040/










