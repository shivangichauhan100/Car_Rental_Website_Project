// backend/routes/feedbackRoutes.js
const express = require("express");
const Feedback = require("../models/Feedback");
const router = express.Router();
router.post("/", async (req, res) => {
    try {
        const { name, email, rating, comments } = req.body;
        const newFeedback = new Feedback({ name, email, rating, comments });
        await newFeedback.save();
        res.status(201).json({ message: "Feedback submitted successfully!", feedback: newFeedback });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});
module.exports = router;