const mongoose = require("mongoose");

const cartItemSchema = new mongoose.Schema({
    productId: String,
    quantity: Number,
});

const orderSchema = new mongoose.Schema({
    userId: String,
    items: [cartItemSchema],
    sum: Number,
});

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;