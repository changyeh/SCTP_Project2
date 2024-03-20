const { Cat } = require('../models');

const getCatByID = async (catId) => {
    return await Cat.where({
        'id': parseInt(catId)
    }).fetch({
        require: true
    });
}

module.exports = {
    getCatByID
}