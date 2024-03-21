const express = require('express')
const router = express.Router();
const catServiceLayer = require('../../services/cats');
const { Cat } = require("../../models");
const { createCatForm } = require('../../forms');

router.get('/', async(req,res)=>{
    try {
        res.send(await catServiceLayer.retriveAllCat());
    } catch (error) {
        res.status(500).json({ message: 'Error fetching cats', error: error.message });
    }
})

router.get('/:cat_id', async(req,res)=>{
    try {
        const catId = req.params.cat_id;
        const cat = await catServiceLayer.retriveCat(catId);
        res.send(await cat);
    } catch (error) {
        res.status(500).json({ message: `Error fetching cat number ${req.params.cat_id}`, error: error.message });
    }
})

router.post('/', async(req,res)=>{
    try {
        const catForm = createCatForm();
        catForm.handle(req, {
            'success': async (form) => {
                const cat = new Cat();
                cat.set(form.data);
                await cat.save();
                res.send(cat);

            },
            'error': async (form) => {
                let errors = {};
                for (let key in form.fields) {
                    if (form.fields[key].error) {
                        errors[key] = form.fields[key].error;
                    }
                }
                res.send(JSON.stringify(errors));
            }
        })
    } catch (error) {
        res.status(500).json({ message: 'Error adding new cat', error: error.message });
    }
})

router.put('/:cat_id', async (req, res) => {
    try {
        const catId = req.params.cat_id;
        const cat = await catServiceLayer.retriveCat(catId);

        // process the form
        const catForm = createCatForm();
        catForm.handle(req, {
            'success': async (form) => {
                cat.set(form.data);
                await cat.save();
                res.send(cat);
            },
            'error': async (form) => {
                let errors = {};
                for (let key in form.fields) {
                    if (form.fields[key].error) {
                        errors[key] = form.fields[key].error;
                    }
                }
                res.send(JSON.stringify(errors));
            }
        })
    } catch (error) {
        res.status(500).json({ message: 'Error updating cat', error: error.message });
    }
})

router.delete('/:cat_id', async(req,res)=>{
    try {
        const catId = req.params.cat_id;
        const cat = await catServiceLayer.retriveCat(catId);

        await cat.destroy();
        res.json({ message: `Cat deleted successfully` });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting cat', error: error.message });
    }
})

module.exports = router;