#!/bin/bash

set -e

PROJECT_DIR="$(cd "$(dirname "$0")" && pwd)"
NAMESPACE="chartviewer"
IMAGE_NAME="chartviewer:latest"
NAMESPACE_FILE="$PROJECT_DIR/k8s/chartviewer-namespace.yaml"
DEPLOYMENT_FILE="$PROJECT_DIR/k8s/chartviewer-deployment.yaml"
SERVICE_FILE="$PROJECT_DIR/k8s/chartviewer-service.yaml"
INGRESS_FILE="$PROJECT_DIR/k8s/chartviewer-ingress.yaml"

CHART_DATA_URI="${REACT_APP_CHART_DATA_URI:-http://chart-fields.local}"
SUBSCRIPTION_API_URI="${REACT_APP_SUBSCRIPTION_API_URI:-http://gym.local/api/v1/api/subscriptions}"

cd "$PROJECT_DIR"

echo "=== 🚀 Building chartviewer ==="
docker build \
  --build-arg REACT_APP_CHART_DATA_URI="$CHART_DATA_URI" \
  --build-arg REACT_APP_SUBSCRIPTION_API_URI="$SUBSCRIPTION_API_URI" \
  -t "$IMAGE_NAME" .

echo "📦 Importing image into k3s..."
docker save "$IMAGE_NAME" | sudo k3s ctr images import -

echo "📦 Ensuring namespace '$NAMESPACE' exists..."
kubectl apply -f "$NAMESPACE_FILE"

echo "⚙️ Applying Kubernetes manifests..."
kubectl -n "$NAMESPACE" apply -f "$DEPLOYMENT_FILE"
kubectl -n "$NAMESPACE" apply -f "$SERVICE_FILE"
kubectl -n "$NAMESPACE" apply -f "$INGRESS_FILE"

echo "✅ chartviewer deployed."
