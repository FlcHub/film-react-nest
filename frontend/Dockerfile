# собрать фронтЭнд
FROM node:20-alpine AS frontend_build

ARG VITE_API_URL
ARG VITE_CDN_URL

ENV VITE_API_URL=${VITE_API_URL}
ENV VITE_CDN_URL=${VITE_CDN_URL}

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm ci --omit=optional

RUN npm install @rollup/rollup-linux-x64-musl

COPY . .

RUN npm run build

# совсем уменьшает размер образа...
FROM node:20-alpine AS frontend_release

WORKDIR /usr/src/app

COPY --from=frontend_build /usr/src/app/dist /usr/src/app/dist

CMD ["sh", "-c", "tail -f /dev/null"]
