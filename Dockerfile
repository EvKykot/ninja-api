FROM node:18-alpine3.18
RUN apk update && apk add openssl1.1-compat
WORKDIR /app

COPY package*.json ./

RUN npm ci
COPY . .
RUN npm run build

EXPOSE 9001
CMD ["npm", "start"]
