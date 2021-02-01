#!/bin/bash

# Comment the first 2 steps if the image is already pushed to google GCR
# Step-1 : Build the docker image 
docker build -t eu.gcr.io/publicismedia-cortex-216901/comint-ui:v1 .

# Step-2 : Push the docker image to container registry
docker push eu.gcr.io/publicismedia-cortex-216901/comint-ui:v1

# Step-3 : Connect to uat-1 cluster
gcloud container clusters get-credentials uat1-cluster --region europe-west1

# Step-4 : Deploy the latest image to uat environment
kubectl apply -f .\uat1.kubernetes.yaml