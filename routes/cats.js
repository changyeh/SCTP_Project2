const express = require("express");
const { Cat } = require("../models");
const router = express.Router();

router.get('/', async (req,res)=>{
    let cats = await Cat.collection().fetch();
    res.render('cats/index', {
        cats: cats.toJSON()
    })
})

module.exports = router;