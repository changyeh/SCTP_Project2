const bookshelf = require('../bookshelf')

const Cat = bookshelf.model('Cat', {
    tableName:'cats'
});

module.exports = { Cat };