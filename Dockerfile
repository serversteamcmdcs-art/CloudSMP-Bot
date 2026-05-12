FROM node:20-alpine

WORKDIR /app

# Копируем зависимости отдельно для кэширования слоёв
COPY package*.json ./

RUN npm install --omit=dev

# Копируем исходники
COPY . .

EXPOSE 8080

CMD ["node", "deploy.js"]

CMD ["node", "index.js"]
