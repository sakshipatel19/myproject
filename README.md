Steps to deploy in kubernetes cluster:

1. Build the docker image with the below command:
   docker build -t eu.gcr.io/publicismedia-cortex-216901/comint-ui:v1 .
   docker images

2. Try testing the application in a local container:
   docker run -d --name comint-ui -p 8080:80 eu.gcr.io/publicismedia-cortex-216901/comint-ui:v1
   docker ps -a

3. Push the docker image to Google Container Registry
   docker push eu.gcr.io/publicismedia-cortex-216901/comint-ui:v1

   gcloud auth configure-docker (Required to run for the first time to configure docker to use gcloud as credential helper)

4.

gcloud init
gcloud config set project project-id
gcloud container clusters create cluster-name
gcloud container clusters list
gcloud container clusters get-credentials uat1-cluster --region europe-west1
gcloud container clusters get-credentials dev01-cluster --region europe-west1

kubectl config current-context
gke_publicismedia-cortex-216901_europe-west1_dev-services-ui-cluster

kubectl create deployment commerce-intelligence-ui --image=eu.gcr.io/publicismedia-cortex-216901/comint-ui:v1
kubectl create deployment commerce-intelligence-ui --image=eu.gcr.io/publicismedia-cortex-216901/comint-ui-uat:v2

kubectl expose deployment commerce-intelligence-ui --type LoadBalancer --port 80 --target-port 8080 --name=commerce-intelligence-ui-service

<!-- Passing in the --type LoadBalancer flag creates a Compute Engine load balancer for your container. The --port flag initializes public port 80 to the internet and the --target-port flag routes the traffic to port 8080 of the application. -->

You can also use the declarative way of deploying the react application to kubernetes cluster.
i.e. via deployment.yaml
Steps:-

1. Create a deployment.yaml file putting all the pod details and then expose it via Service's NodePort or LoadBalancer type.

2.

kubectl create -f .\deployment.yaml
kubectl get pods
kubectl describe deployments commerce-intelligence-ui-deployment
kubectl describe services commerce-intelligence-ui-service

kubectl apply -f deployment.yaml
kubectl delete
