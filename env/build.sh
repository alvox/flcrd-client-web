#!/bin/bash

rm -rf dist
cp -r ../dist ./
docker build -t registry.gitlab.com/alvox-env/registry/flcrd-client-web:latest .
docker push registry.gitlab.com/alvox-env/registry/flcrd-client-web:latest
rm -rf dist