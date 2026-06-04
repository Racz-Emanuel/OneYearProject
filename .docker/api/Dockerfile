FROM node:22.20.0-alpine3.22
RUN apk add --no-cache git
RUN corepack enable yarn
WORKDIR /languages/api
COPY api/package.json api/yarn.lock ./
RUN yarn install
COPY api/ ./         
CMD ["node", "api.js"] # ← actually starts the app