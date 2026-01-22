#!/bin/sh

echo "Preparando aplicação..."

touch /var/www/html/database/database.sqlite

echo "Executando migrations..."
php artisan migrate --force

echo "Executando seeders..."
php artisan db:seed --force

echo "Limpando caches..."
php artisan config:clear
php artisan route:clear
php artisan cache:clear

echo "Aplicação pronta!"

exec "$@"
