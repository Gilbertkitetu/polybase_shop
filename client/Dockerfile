FROM node:v18.12.1 as build
WORKDIR /client

COPY package*.json .
RUN npm install
COPY . .

RUN npm run build
FROM nginx:1.22.1
COPY ./nginx/nginx.conf /etc/nginx/nginx.conf
COPY --from=build /lit-clothing/build /usr/share/nginx/html
