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
