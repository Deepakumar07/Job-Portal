FROM node:10-alpine

RUN mkdir -p /app

WORKDIR /app

COPY package.json /app

RUN npm install

COPY . /app

RUN npm run build 

FROM nginx:1.17.1-alpine

COPY /app/dist/Hoitalent /usr/share/nginx/html

EXPOSE 8080