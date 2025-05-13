# Microservice with MongoDB on Kubernetes


## Overview

This project illustrates how to deploy a Node.js Express microservice with a MongoDB backend on a local Kubernetes cluster. Key features:

-	MongoDB with authentication, persistent storage, and a Kubernetes Secret for credentials.
-	Dynamic configuration via an entrypoint.sh script that builds the MongoDB URI at container startup.
-	Full CRUD API (POST, GET, PUT, DELETE) exposed on /items.



**server,js**:
-	Installs mongodb driver and winston for logging.
-	Connects to process.env.MONGO_URI at startup.
-	Defines full CRUD routes on /items.



**Build and deployment steps**:
1.	Build & push Docker image:
2.	docker build -t <your-registry>/your-image:latest . 
- docker push <your-registry>/your-image:latest
3.	Apply Kubernetes manifests:
- kubectl apply -f .
4. Verify pods & services:
- kubectl get pods




**Testing CRUD Operations**:
 Using curl (CLI)
### CREATE
```bash
curl -s "http://localhost:30040/add?n1=3&n2=4" | jq

  ```

### READ ALL
```bash
curl -s http://localhost:30040/calculations | jq

```

### READ ONE (replace `<id>`)
```bash
curl -s http://localhost:30040/calculations/<logId> | jq

```

### UPDATE
```bash
curl -s -X PUT http://localhost:30040/calculations/<logId> \
  -H "Content-Type: application/json" \
  -d '{"note":"checked"}' | jq
  ```

### DELETE
```bash
curl -s -X DELETE http://localhost:30040/calculations/<logId> | jq

```







