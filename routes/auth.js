const express = require('express');
const UserModel= require('../models/user');

const router = express.Router();

router.post('/register', async (req, res) => {
    try {
        console.log(req.body);
        const { name, email, password } = req.body;

        const user = new UserModel({ name, email, password });

      
        const savedUser = await user.save();

        if (savedUser) {
            console.log("Data saved");
            res.status(201).json({ message: 'Registration successful', user: savedUser });
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// login call back 
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        
        const user = await UserModel.findOne({ email });
         console.log(user);
        if (!user) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }
         
       
        if (password !== user.password) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }
       
        res.json({ message: 'Login successful', user: { name: user.name, email: user.email } });
    } catch (error) {
        console.error('Login error:', error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }


  });

module.exports = router;