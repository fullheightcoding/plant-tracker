const express = require('express');
const router = express.Router();
const User = require('../models/user');
const GET_LIMIT = 10;

//get
router.get('/', async function(req, res) {
    try {
        const users = await User.find().limit(GET_LIMIT);
        if (!users) {
            res.send('Error: unable to find users')
        }
        res.json(users);
    } catch (error) {
        res.send('error: ' + error)
        return;
    }
})

//get by name
router.get('/:name', async function(req, res) {    
    try {
        //do a regex similar to LIKE query with case insensitivity
        const users = await User.find({ name: {$regex: req.params.name, $options: 'i'}})
        if (!users) {
            res.send('Error: no plant user for that name.')
        }
        res.json(plants);
    } catch (error) {
        res.send('error: ' + error)
    }
})

//post
router.post('/', async function(req, res) {
    const user = new User({
        userName: req.body.userName
    })

    try {
        const result = await user.save();
        res.json(result);
    } catch(error) {
        res.send('Error: ' + error)
    }
})

module.exports = router;