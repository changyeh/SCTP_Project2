const { Cat } = require('../models');

const getCatByID = async (catId) => {
    return await Cat.where({
        'id': parseInt(catId)
    }).fetch({
        require: true
    });
}

const getAllCats = async () => {
    return await Cat.fetchAll();
}

module.exports = {
    getCatByID, getAllCats
}