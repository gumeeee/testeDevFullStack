FROM php:8.5-fpm-alpine

RUN apk add --no-cache \
    git \
    curl \
    zip \
    unzip \
    sqlite \
    sqlite-dev \
    libpng-dev \
    oniguruma-dev \
    libxml2-dev

RUN docker-php-ext-install pdo pdo_sqlite mbstring exif pcntl bcmath gd

COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

WORKDIR /var/www/html

COPY . .

RUN composer install --no-dev --optimize-autoloader --no-interaction

RUN mkdir -p database && \
    touch database/database.sqlite && \
    chown -R www-data:www-data /var/www/html && \
    chmod -R 755 /var/www/html/storage && \
    chmod -R 755 /var/www/html/bootstrap/cache && \
    chmod 664 /var/www/html/database/database.sqlite

RUN php artisan key:generate --force || true

RUN php artisan migrate --force || true

EXPOSE 8000

CMD ["php", "artisan", "serve", "--host=0.0.0.0", "--port=8000"]
