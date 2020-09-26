
module.exports = {

    development: {
      client: 'mysql2',
      connection: {
        host: '192.168.99.100', // my IP Linux Vm Host for Docker toolbox
        database: 'db_nlw02',
        user: 'root',
        password: 'nlw02'
      },
      migrations: {
        tableName: 'knex_migrations',
        directory: `${__dirname}/src/database/migrations`
      },
      seeds: {
        directory: `${__dirname}/src/database/seeds`
      }
    },
  
    // production: {
    //   client: 'mysql2',
    //   connection: {
    //     database: '',
    //     user:     '',
    //     password: ''
    //   },
    //   pool: {
    //     min: 2,
    //     max: 10
    //   },
    //   migrations: {
    //     tableName: 'knex_migrations'
    //   }
    // }
  
  };
  