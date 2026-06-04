FROM node:22.20.0-alpine3.22
RUN apk add --no-cache git bash curl
RUN corepack enable yarn
WORKDIR /languages/api
COPY api/package.json api/yarn.lock ./
RUN yarn install
COPY api/ .
ENV NODE_ENV=development