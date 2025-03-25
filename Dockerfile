FROM nginx:alpine
WORKDIR /var/www/html/
COPY nginx/ /etc/nginx/conf.d/
COPY  dist/ /var/www/html/