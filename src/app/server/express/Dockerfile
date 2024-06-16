FROM node:latest

WORKDIR /app

COPY package*.json ./

COPY . .

RUN yarn install

RUN yarn start

EXPOSE 8000

CMD ["node", "src/index.js"]
