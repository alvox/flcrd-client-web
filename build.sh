#!/bin/bash

rm -rf dist
npm run build
docker build -t docker.pkg.github.com/alvox/flcrd-client-web/flcrd-webapp:latest .
docker push docker.pkg.github.com/alvox/flcrd-client-web/flcrd-webapp:latest