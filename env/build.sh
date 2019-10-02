#!/bin/bash

rm -rf dist
cd ..
npm run build
cd env
cp -r ../dist ./
docker build -t docker.pkg.github.com/alvox/flcrd-client-web/flcrd-webapp:latest .
docker push docker.pkg.github.com/alvox/flcrd-client-web/flcrd-webapp:latest
rm -rf dist