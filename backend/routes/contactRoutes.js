const express = require("express");
const Contact = require("../models/Contact");
const router = express.Router();
router.post("/", async (req, res) => {
    try {
        const { name, email, message } = req.body;
        if (!name || !email || !message) {
            return res.status(400).json({ error: "All fields are required." });
        }
        const newContact = new Contact({ name, email, message });
        await newContact.save();

        res.status(201).json({ message: "Message sent successfully!", contact: newContact });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});
module.exports = router;
