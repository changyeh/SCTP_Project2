const express = require("express");
const { Cat } = require("../models");
const router = express.Router();
const { bootstrapField, createCatForm } = require('../forms');

router.get('/', async (req,res)=>{
    let cats = await Cat.collection().fetch();
    res.render('cats/index', {
        cats: cats.toJSON()
    })
})

router.get('/create', async (req, res) => {
    const catForm = createCatForm();
    res.render('cats/create',{
        'form': catForm.toHTML(bootstrapField)
    })
})

router.post('/create', async(req,res)=>{
    const catForm = createCatForm();
    catForm.handle(req, {
        'success': async (form) => {
            const cat = new Cat();
            cat.set(form.data);
            await cat.save();
            res.redirect('/cats');

        },
        'error': async (form) => {
            res.render('cats/create', {
                'form': form.toHTML(bootstrapField)
            })
        }
    })
})

module.exports = router;