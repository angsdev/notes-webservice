FROM php:8.1.0-alpine
RUN mkdir /var/www/html/webservice
COPY . /var/www/html/webservice/
WORKDIR /var/www/html/webservice/
RUN curl -sS https://getcomposer.org/installer -o /tmp/composer-setup.php \
    HASH=`curl -sS https://composer.github.io/installer.sig` \
    php -r "if (hash_file('SHA384', '/tmp/composer-setup.php') === '$HASH') { echo 'Installer verified'; } else { echo 'Installer corrupt'; unlink('composer-setup.php'); } echo PHP_EOL;"
RUN sudo php /tmp/composer-setup.php --install-dir=/usr/local/bin --filename=composer
RUN composer install
EXPOSE 8000
CMD php artisan serve

