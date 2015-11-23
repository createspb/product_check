Product Check is a tool aimed at entrepreneurs to help them assess the product’s idea before making huge investments into development.

You can use this project as a base for your own interactive tests.

Demo: http://product-check.createdigital.me/

Hope it will be useful, contributions are welcome.

# Docs

To run in development mode:

    $ npm install
    $ npm i db-migrate -g
    $ npm run dev

To run in production mode:

    $ npm start

Run migrations on localhost

    $ db-migrate up

Run migrations on Heroku

    $ heroku run node node_modules/db-migrate/bin/db-migrate up

Admin password (/admin) on Heroku you can set in "Config Variables", example:

    PASSWORD: admin

You can deploy this to [Heroku](https://www.heroku.com)

    $ heroku login
    $ git push heroku develop:master

# Tech

Webpack, babel, es6, react, redux, sequelize, db-migrate
