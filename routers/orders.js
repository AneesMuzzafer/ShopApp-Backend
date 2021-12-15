const express = require("express");
const auth = require("../auth/auth");
const Order = require("../models/orderModel");
const router = new express.Router();



router.post("/orders/me", auth, (req, res) => {
    // const userId = req.params.userId;
    const userId = req.user._id;

    const order = new Order({
        userId: userId,
        items: req.body.items,
        sum: req.body.sum,
    });
    order.save((err, result) => {
        if (!err) {
            res.send(result._id);
        } else {
            res.send(err);
        }
    });
});

router.get("/orders/me", auth, (req, res) => {

    const userId = req.user._id;

    try {
        Order.find({ userId: userId }, (err, foundOrders) => {
            res.send(foundOrders);
        });
    } catch (err) {
        console.log(err);
    }
});

module.exports = router;