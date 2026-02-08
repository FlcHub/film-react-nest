# nginx
FROM nginx:alpine

COPY ./nginx/birds.hub.nomorepartiessbs.ru /etc/nginx/sites-available/birds.hub.nomorepartiessbs.ru
RUN ln -s /etc/nginx/sites-available/birds.hub.nomorepartiessbs.ru /etc/nginx/sites-enabled/

EXPOSE 80
