FROM node:lts-alpine as BUILDER

RUN apk add --update make gcc g++ python
WORKDIR /builder

# Docker image cache of packages
COPY package*.json ./
RUN npm i

# Build app
COPY . .
RUN npm run build


# slim image without development deps
FROM node:lts-alpine

RUN apk add --update make gcc g++ python
ENV NODE_ENV production

WORKDIR /app

COPY --from=BUILDER /builder/build .
COPY package*.json ./
RUN npm i

EXPOSE 3000

USER nobody

CMD ["node", "index.js"]
