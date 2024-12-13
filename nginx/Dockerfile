FROM nginx:latest

COPY /usr/src/app/build /usr/share/nginx/html

# COPY nginx.conf /etc/nginx/conf.d/defauilt.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]