<h1 align="center">Notes Web Service</h1>
<p align="center">
  <img src="https://cdn.iconscout.com/icon/free/png-256/php-28-226043.png" alt="PHP">
</p>

### It's a fancy, optimal, minimalist and organized PHP "Notes Web Service" project; made with Laravel and has the following features:

- Layered/Hexagonal architecture implementation.
- High cohesion and separation of concerns levels.
- App core independent from frameworks/libraries.
- Separated app and server logic.
- Central error handling with rotative file log system.
- Extendable base error.
- Base extendable environment config.
- Single and group testable modules.
- API versioning.
- Database:
  - MariaDB/MySQL, PosgreSQL, SQLServer y SQLite:
    - Seeders.
    - Migrations.
    - Factories.
- JWT authentication.
- Google authentication.
- Mail handling.
- Containerizable (docker-compose and dockerfile working soon).
- Flexible search module.
- Soft deleting and more...

To initialize the project run ```composer install```.

The base relational model looks like:
<p align="center">
  <img src="reference-relational-model.png" alt="Relational Model">
</p>

There's a graph of structure or dependencies through the application (from the JS version):
<p align="center">
  <img src="dependency-graph.svg" alt="Graph">
</p>

Also the project contain in the root a postman collection with every application endpoint, ready to import and test.

To start the application once initialized you only have to run ```php artisan serve``` and the application will be served, the rest of commands work as usual in laravel.

<h1 align="center">Other versions</h1>

If you want to check the JavaScript version [click here](https://github.com/angsdev/notes_web_service/tree/JavaScript)

If you want to check the TypeScript version [click here](https://github.com/angsdev/notes_web_service/tree/TypeScript)
