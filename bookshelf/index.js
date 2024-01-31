const knex = require('knex')({
    client: 'mysql',
    connection: {
        user: 'changyeh',
        password: 'verylongandcomplicatedpassword',
        database: 'meowshop',
        host: '127.0.0.1'
    }
})
const bookshelf = require('bookshelf')(knex)

module.exports = bookshelf;