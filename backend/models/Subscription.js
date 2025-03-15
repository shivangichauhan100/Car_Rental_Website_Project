const mongoose = require("mongoose");
const SubscriptionSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true
    },
    plan: {
        type: String,
        required: true,
        enum: ["Silver", "Gold", "Premium"]
    },
    discount: {
        type: Number,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    cardLast4Digits: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});
const Subscription = mongoose.model("Subscription", SubscriptionSchema);
module.exports = Subscription; 