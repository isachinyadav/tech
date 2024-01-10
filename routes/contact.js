const express = require('express');
const ContactModel = require('../models/contact');

const router = express.Router();

// Route to store contact information
router.post('/submitContact', async (req, res) => {
    try {
        const { name, email, query, phone } = req.body;

        // Create a new instance of the ContactModel
        const newContact = new ContactModel({
            name,
            email,
            query,
            phone
        });

        // Save the contact information to the database
        const savedContact = await newContact.save();

        // Respond with the saved contact information
        res.status(201).json({
            message: 'Contact information saved successfully',
            contact: savedContact
        });
    } catch (error) {
        console.error('Error saving contact information:', error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;
