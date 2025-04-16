const mongoose = require('mongoose');
const BookingSchema = new mongoose.Schema({
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true, lowercase: true },
    phone: { type: String, required: true, trim: true },
    pickupaddress: { type: String, required: true, trim: true },
    dropaddress: {type: String, required: true, trim: true},
    carModel: { type: String, required: true },
    pickupDate: { type: Date, required: true },
    returnDate: { type: Date, required: true },
    message: { type: String, trim: true },
    createdAt: { type: Date, default: Date.now }
});
module.exports = mongoose.model('Booking', BookingSchema);
