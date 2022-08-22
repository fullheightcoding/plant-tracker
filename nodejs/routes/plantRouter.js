const express = require('express');
const router = express.Router();
const Plant = require('../models/plant');
const GET_LIMIT = 10;

//get
router.get('/', async function(req, res) {
    try {
        const plants = await Plant.find().limit(GET_LIMIT);
        if (!plants) {
            res.send('Error: unable to find plants')
        }
        res.json(plants);
    } catch (error) {
        res.send('error: ' + error)
        return;
    }
})

//get by name
router.get('/:name', async function(req, res) {    
    try {
        //do a regex similar to LIKE query with case insensitivity
        const plants = await Plant.find({ name: {$regex: req.params.name, $options: 'i'}})
        if (!plants) {
            res.send('Error: no plant found for that name.')
        }
        res.json(plants);
    } catch (error) {
        res.send('error: ' + error)
    }
})

//post
router.post('/', async function(req, res) {
    const plant = new Plant({
        name: req.body.name,
        location: req.body.location,
        lightingRequirements: req.body.lightingRequirements,
        wateringRequirements: req.body.wateringRequirements
    })

    try {
        const result = await plant.save();
        res.json(result);
    } catch(error) {
        res.send('Error: ' + error)
    }
})

//patch
router.patch('/:id', async function(req, res) {
    try {
        const plant = await Plant.findById(req.params.id);
        //how to check for each param from body?
        plant.commonName = req.body.commonName;
        plant.location = req.body.location;
        plant.lightingRequirements = req.body.lightingRequirements;
        plant.wateringRequirements = req.body.wateringRequirements;

        const result = await plant.save();
        res.json(result);
    } catch(error) {
        res.status(404).send('Error: ' + error)
    }
})

//delete
router.delete('/:id', async function(req, res) {
    try {
        const plant = await Plant.findById(req.params.id);
        const result = await plant.remove();
        res.json(result);
    } catch(error) {
        res.send("Error")
    }
})

module.exports = router;