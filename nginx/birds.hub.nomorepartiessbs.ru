server {
    listen 80; # Принимаем запросы с порта 80
    server_name birds.hub.nomorepartiessbs.ru; # Указываем название домена

    root /usr/share/nginx/html; # путь к папке со статическими файлами внутри контейнера

    location / {
      try_files $uri $uri/ /index.html;
    }
}