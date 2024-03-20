const express = require("express");
const { Cat } = require("../models");
const router = express.Router();
const { bootstrapField, createCatForm } = require('../forms');
const dataLayer = require('../dal/cats')

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

router.get('/:cat_id/update', async (req, res) => {
    const catId = req.params.cat_id;
    const cat = await dataLayer.getCatByID(catId);

    const catForm = createCatForm();

    // fill in the existing values
    catForm.fields.name.value = cat.get('name');
    catForm.fields.cost.value = cat.get('cost');
    catForm.fields.description.value = cat.get('description');

    res.render('cats/update', {
        'form': catForm.toHTML(bootstrapField),
        'product': cat.toJSON()
    })
})

router.post('/:cat_id/update', async (req, res) => {
    const catId = req.params.cat_id;
    const cat = await dataLayer.getCatByID(catId);

    // process the form
    const catForm = createCatForm();
    catForm.handle(req, {
        'success': async (form) => {
            cat.set(form.data);
            cat.save();
            res.redirect('/cats');
        },
        'error': async (form) => {
            res.render('cats/update', {
                'form': form.toHTML(bootstrapField),
                'cat': cat.toJSON()
            })
        }
    })
})

router.get('/:cat_id/delete', async(req,res)=>{
    const catId = req.params.cat_id;
    const cat = await dataLayer.getCatByID(catId);

    res.render('cats/delete', {
        'cat': cat.toJSON()
    })
});

router.post('/:cat_id/delete', async(req,res)=>{
    const catId = req.params.cat_id;
    const cat = await dataLayer.getCatByID(catId);

    await cat.destroy();
    res.redirect('/cats')
})

module.exports = router;