FROM node:latest

WORKDIR /app

COPY package*.json ./
COPY . .

RUN yarn
RUN yarn run build

EXPOSE 3000
CMD ["yarn", "start"]
