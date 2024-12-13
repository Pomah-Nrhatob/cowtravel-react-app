FROM node:20-alpine as build

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install --legacy-peer-deps

COPY . .

RUN npm run build

FROM nginx:stable-alpine

COPY --from=build /usr/src/app/build /usr/share/nginx/html

COPY nginx.conf /etc/nginx/conf.d/defauilt.conf
COPY privkey.pem  /etc/letsencrypt/live/cowtravel.ru
COPY fullchain.pem  /etc/letsencrypt/live/cowtravel.ru 

CMD ["nginx", "-g", "daemon off;"]