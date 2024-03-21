const { Cat } = require('../models');
const dataLayer = require('../dal/cats');

const retriveCat = async (catId) => {
    return await dataLayer.getCatByID(catId);
}

const retriveAllCat = async () => {
    return await dataLayer.getAllCats();
}

module.exports = {
    retriveCat, retriveAllCat
}