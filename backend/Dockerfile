# собрать бЭкенд
FROM node:20-alpine AS backend_build

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm ci --omit=dev

RUN npm install -g @nestjs/cli

COPY . .

RUN npm run build

# по каким-то причинам это уменьшает размер образа в два раза...
FROM node:20-alpine AS backend_release

WORKDIR /usr/src/app

COPY --from=backend_build /usr/src/app/dist /usr/src/app/dist
COPY --from=backend_build /usr/src/app/public /usr/src/app/public

COPY --from=backend_build /usr/src/app/package*.json /usr/src/app/

RUN npm ci --omit=dev

EXPOSE 3000

# перейти к пользователю с правами чуть поменьше
RUN addgroup --system appgroup && adduser --system --ingroup appgroup appuser
RUN chown -R appuser:appgroup /usr/src/app
USER appuser

CMD ["node", "dist/main.js"]
