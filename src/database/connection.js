const dbConfig = require('../../knexfile');

const knex = require('knex');

let db;

if (process.env.NODE_ENV !== 'production') {
    db = knex(dbConfig.development);
} else {
    db = knex(dbConfig.production);
}

module.exports = db;