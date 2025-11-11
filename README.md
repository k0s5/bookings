# Запуск prod сборки приложения в Docker контейнерах:

Создайте файл .env.production в корневой директории приложения, скопируйте код из .env.example и подставьте свои значения

Запустите контейнеры:

```
docker-compose --env-file .env.production up -d --build
```

# Запуск приложения в dev режиме:

Перед первым запуском приложения, убедитесь, что у вас установлены все необходимые зависимости. Вы можете установить их с помощью команды:

```bash
pnpm install
```

Запустите Docker контейнер с Базой данных Postgres

```
pnpm docker:postgres-data:dev
```

Сгенерируйте клиент Prisma ORM

```
pnpm prisma:generate
```

Создайте таблицы в БД

```
pnpm prisma:db:push
```

Затем запустите приложение с помощью команды:

```bash
pnpm start:dev
```

## API едпоинты:

#### Bookings

- **GET /api/bookings** - получение всех бронирований
- **GET /api/bookings/1** - получение бронирования по id бронирования
- **GET /api/bookings/user/user1** - получение бронирований по id пользователя
- **GET /api/bookings/event/1** - получение бронирований по id события
- **PUT /api/bookings/reserve** - бронирование места
- **DELETE /api/bookings/:id** - удаление бронирования

#### Events

- **GET /api/events** - получение всех событий
- **GET /api/events/1** - получение события по id события
- **PUT /api/events** - создание события
- **PATCH /api/events/1** - обновление данных события
- **DELETE /api/events/:id** - удаление события
