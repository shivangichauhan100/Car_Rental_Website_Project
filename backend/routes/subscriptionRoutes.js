const express = require("express");
const Subscription = require("../models/Subscription");  // ✅ Import the correct model
const router = express.Router();
router.post("/", async (req, res) => {
    try {
        const newSubscription = new Subscription(req.body);
        await newSubscription.save();
        res.status(201).json({ message: "Subscription added successfully!", subscription: newSubscription });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});
module.exports = router;