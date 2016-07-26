Выполнять всё в Package Manager Console, перейдя в папку, где лежит project.json

Настройка typings

npm install -g typings﻿   установка самого typings

typings install dt~core-js --save --global    установка пакета core-js




Настройка миграций базы данных.
набираем в таком порядке:

dotnet restore - восстанавливает библиотеки dot.net
dotnet build - компилирует инструменты
dotnet ef - проверить единорога

dotnet ef --help - показать справку

Добавление миграции с именем Identity с нужным контекстом и в каталог Data/Migrations
dotnet ef migrations add Identity -c AppDbContext -o Data\Migrations

Обновление базы данных
dotnet ef database update


База данных: kpma-ext
user: ext-user
pass: !u$eR-ex7



reCapcha

public:
6LdF3yUTAAAAAFsMvObZkKSwKaS0NRzcjCAUmPmA

secret:
6LdF3yUTAAAAABg6JcyyfaUae1nv5R5cnSXoooQD

