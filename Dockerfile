FROM nginx:alpine
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY app/ /usr/share/nginx/html/app/
COPY admin/ /usr/share/nginx/html/admin/
COPY index.html /usr/share/nginx/html/index.html
EXPOSE 80
