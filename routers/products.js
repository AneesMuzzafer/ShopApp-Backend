const express = require("express");
const auth = require("../auth/auth");
const router = new express.Router();

const Product = require("../models/productModel");

router.get("/products", auth, (req, res) => {
    Product.find({}, (err, foundProducts) => {
        if (!err) {
            res.send(foundProducts);
        } else {
            res.send(err);
        }
    });
});

router.post("/products", auth, (req, res) => {
    const { title, price, description, imageUrl, ownerId } = req.body;
    const product = new Product({
        title: title,
        price: price,
        description: description,
        imageUrl: imageUrl,
        ownerId: ownerId,
    });

    product.save((err, result) => {
        if (!err) {
            res.send({ name: result._id });
        }
    });
});

router.patch("/products/:productId", auth, (req, res) => {
    Product.findByIdAndUpdate(
        { _id: req.params.productId },
        { $set: req.body },
        (err) => {
            !err && res.send("updated succesfully");
            err && console.log(err);
        }
    );
});

router.delete("/products/:productId", auth, (req, res) => {
    Product.findByIdAndDelete(req.params.productId, (err) => {
        !err && res.send("deleted successfully");
        err && console.log(err);

    });
});

module.exports = router;