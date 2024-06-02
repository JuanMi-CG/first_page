#!/bin/bash
# Script para sincronizar archivos con S3

# Define el nombre del bucket
BUCKET_NAME="jmcoll-buket-porfolio"

# Sincroniza los archivos con el bucket de S3, excluyendo el directorio .git
aws s3 sync . s3://$BUCKET_NAME --exclude ".git/*" --delete

echo "Despliegue completado"