const express = require("express");
const Booking = require('../models/Booking');
const router = express.Router();
router.post("/", async (req, res) => {
    try {
        console.log("📩 Incoming Booking Request:", req.body);

        const { name, email, phone, pickupaddress, dropaddress, carModel, pickupDate, returnDate, message } = req.body;

        // Update this validation to check for the correct fields
        if (!name || !email || !phone || !pickupaddress || !dropaddress || !carModel || !pickupDate || !returnDate) {
            console.log("❌ Missing required fields!");
            return res.status(400).json({ error: "All fields are required!" });
        }

        const newBooking = new Booking({
            name,
            email,
            phone,
            pickupaddress,
            dropaddress,
            carModel,
            pickupDate: new Date(pickupDate),
            returnDate: new Date(returnDate),
            message
        });

        await newBooking.save();
        console.log("✅ Booking saved:", newBooking);
        res.status(201).json({ message: "Booking successful!", booking: newBooking });

    } catch (error) {
        console.error("❌ Error saving booking:", error);
        res.status(500).json({ error: "Failed to book car. Please try again." });
    }
});
module.exports = router;