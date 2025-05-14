# Этап сборки
FROM node:18 AS builder

WORKDIR /app

# Копируем только package.json и package-lock.json для установки зависимостей
COPY package*.json ./
RUN npm install

# Копируем остальные файлы и строим проект
COPY . .
COPY .env.local ./
RUN npm run build

# Этап с финальным образом
FROM node:18-alpine

WORKDIR /app

# Установка зависимостей только для продакшн-режима
COPY --from=builder /app/package*.json ./
RUN npm install --omit=dev

# Копирование необходимых файлов из предыдущего этапа сборки
COPY --from=builder /app/.next .next
COPY --from=builder /app/public public
COPY --from=builder /app/next.config.js ./ 
COPY --from=builder /app/.env.local .env.local

EXPOSE 3000
CMD ["npm", "start"]