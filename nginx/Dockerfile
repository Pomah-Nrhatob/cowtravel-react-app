FROM nginx:latest

COPY . /usr/share/nginx/html

COPY nginx.conf /etc/nginx/conf.d/defauilt.conf

CMD ["nginx", "-g", "daemon off;"]