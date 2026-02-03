#!/bin/bash

REGION="us-east-1"

export PORT=$(aws ssm get-parameter \
  --region $REGION \
  --name "/prod/backend/PORT" \
  --query "Parameter.Value" \
  --output text)

export MONGO_URI=$(aws ssm get-parameter \
  --region $REGION \
  --name "/prod/backend/MONGO_URI" \
  --with-decryption \
  --query "Parameter.Value" \
  --output text)

export JWT_SECRET=$(aws ssm get-parameter \
  --region $REGION \
  --name "/prod/backend/JWT_SECRET" \
  --with-decryption \
  --query "Parameter.Value" \
  --output text)

export REDIS_HOST=$(aws ssm get-parameter \
  --region $REGION \
  --name "/prod/backend/REDIS_HOST" \
  --with-decryption \
  --query "Parameter.Value" \
  --output text)

export REDIS_PORT=$(aws ssm get-parameter \
  --region $REGION \
  --name "/prod/backend/REDIS_PORT" \
  --query "Parameter.Value" \
  --output text)

export REDIS_PASSWORD=$(aws ssm get-parameter \
  --region $REGION \
  --name "/prod/backend/REDIS_PASSWORD" \
  --with-decryption \
  --query "Parameter.Value" \
  --output text)

export GOOGLE_AI_KEY=$(aws ssm get-parameter \
  --region $REGION \
  --name "/prod/backend/GOOGLE_AI_KEY" \
  --with-decryption \
  --query "Parameter.Value" \
  --output text)

export EMAIL_HOST=$(aws ssm get-parameter \
  --region $REGION \
  --name "/prod/backend/EMAIL_HOST" \
  --query "Parameter.Value" \
  --output text)

export EMAIL_PORT=$(aws ssm get-parameter \
  --region $REGION \
  --name "/prod/backend/EMAIL_PORT" \
  --query "Parameter.Value" \
  --output text)

export EMAIL_SECURE=$(aws ssm get-parameter \
  --region $REGION \
  --name "/prod/backend/EMAIL_SECURE" \
  --query "Parameter.Value" \
  --output text)

export EMAIL_USER=$(aws ssm get-parameter \
  --region $REGION \
  --name "/prod/backend/EMAIL_USER" \
  --with-decryption \
  --query "Parameter.Value" \
  --output text)

export EMAIL_PASS=$(aws ssm get-parameter \
  --region $REGION \
  --name "/prod/backend/EMAIL_PASS" \
  --with-decryption \
  --query "Parameter.Value" \
  --output text)

export EMAIL_FROM=$(aws ssm get-parameter \
  --region $REGION \
  --name "/prod/backend/EMAIL_FROM" \
  --query "Parameter.Value" \
  --output text)
