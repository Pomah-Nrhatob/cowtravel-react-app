FROM nginx:stable-alpine

COPY /usr/src/app/build /usr/share/nginx/html

COPY nginx.conf /etc/nginx/conf.d/defauilt.conf

CMD ["nginx", "-g", "daemon off;"]