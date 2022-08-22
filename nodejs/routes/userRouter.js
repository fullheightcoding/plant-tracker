const express = require('express');
const router = express.Router();
const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const GET_LIMIT = 10;

//get
//eg. localhost:9000/users
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
//eg. localhost:9000/users/mark
router.get('/:name', async function(req, res) {    
    try {
        //do a regex similar to LIKE query with case insensitivity
        const users = await User.find({ name: {$regex: req.params.name, $options: 'i'}})
        if (!users) {
            res.send('Error: no user for that name.')
        }
        res.json(users);
    } catch (error) {
        res.send('error: ' + error)
    }
})

//register new user
//eg. localhost:9000/users
//{
//     "name": "mike",
//     "password": "password1"
// }
router.post('/createUser', async function(req, res) {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    const user = new User({
        name: req.body.name,
        password: hashedPassword
    })

    try {
        const result = await user.save();
        res.json(result);
    } catch(error) {
        res.send('Error: ' + error)
    }
})

//authenticate login and return jwt token
//eg. localhost:9000/users/login
//{
//     "name": "mike",
//     "password": "password1"
// }
router.post('/login', async(req, res) => {

    try {
        //do a regex similar to LIKE query with case insensitivity
        //note: user must be unique?
        const user = await User.findOne({ name: {$regex: req.body.name, $options: 'i'}})

        if (user === null) {
            res.status(404).send("User does not exist");
        }
        if (await bcrypt.compare(req.body.password, user.password)) {
            const accessToken = generateAccessToken({user: req.body.name});
            const refreshToken = generateRefreshToken({user: req.body.name});

            res.json({accessToken: accessToken, refreshToken:refreshToken});
            return;
        } else {
            res.status(401).send('Password incorrect.')
        }
        res.send(user);

    } catch (error) {
        res.send('error: ' + error)
    }
})

// accessTokens
function generateAccessToken(user) {
    return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {expiresIn: "15m"}) 
}

// refreshTokens
let refreshTokens = [];

function generateRefreshToken(user) {
    const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET, {expiresIn: "20m"});
    refreshTokens.push(refreshToken);

    return refreshToken;
}

module.exports = router;