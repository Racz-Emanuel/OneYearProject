FROM node:22.20.0-alpine3.22
RUN apk add --no-cache git
RUN corepack enable yarn
WORKDIR /app
COPY app/package.json app/yarn.lock ./
RUN yarn install
COPY app/ ./app/
WORKDIR /app/app