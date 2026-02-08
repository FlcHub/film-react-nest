# собрать фронтЭнд
FROM node:20-alpine AS frontend_build

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm ci --omit=optional

RUN npm install @rollup/rollup-linux-x64-musl

COPY . .

RUN npm run build
