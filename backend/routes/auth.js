const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../Models/User');
const router = express.Router();

router.post('/register', async(req, res)=>{
    const {name, email, password} = req.body;
    try{
        let user = await User.findOne({email});
        if(user) {
            return res.status(400).json({msg: 'User Already Exists'});
        }
        user = new User({name, email, password});

        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);

        await user.save();
        const payload = {
            user: {
                id: user.id
            },
        };
        jwt.sign(
            payload,
            'yourSecretToken',
            {expiresIn: 3600},(err, token) => {
                if (err) throw err;
                res.json({token})
            }
        );
    } catch(err) {
        console.error(err.message);
        res.status(500).send('Server Error')
    }
})

//login user
router.post('/login', async(req, res)=>{
    const {email, password} = req.body;
    try {
        let user = await User.findOne({email});
        if(!user) {
            return res.status(400).json({msg: "Invalid Credentials"})
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch) {
            return res.status(400).json({msg: "Invaliad Credentials"})
        }
        const payload = {
            user: {
                id: user.id,
            }
        };
        jwt.sign(
            payload,
            'yourSecretToken',
            { expiresIn: 3600}, (err, token) =>{
                if(err) throw err;
                res.json({token})
            }
        )
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error')
    }
});

//Middleware to verify token
const auth = (req, res, next) =>{
    const token = req.header('x-auth-token');
    if(!token){
        return res.status(401).json({msg: "No token, authorzation denied"});
    }
    try {
        const decoded = jwt.verify(token, 'yourSecretToken');
        req.user = decoded.user;
        next();
    } catch (error) {
        res.status(401).json({msg: 'Token is not valid'})
    }
}

module.exports = router;