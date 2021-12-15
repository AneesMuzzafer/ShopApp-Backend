require("dotenv").config();
const express = require("express");
const User = require("../models/userModel");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');

const router = new express.Router();

router.post("/register", async (req, res) => {
    try {
        const foundUser = await User.findOne({ username: req.body.email });
        if (foundUser) {
            // console.log("a")
            throw new Error("Username already taken");
        }
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        const id = new mongoose.Types.ObjectId();
        const token = jwt.sign({ _id: id }, process.env.SECRET);
        const user = new User({
            _id: id,
            username: req.body.email,
            password: hashedPassword,
            tokens: [{ token: token }]
        });
        await user.save();
        res.send({
            idToken: token,
            localId: user._id,
            expiresIn: 3600
        });

    } catch (err) {
        console.log(err);
    }
});

router.post("/login", async (req, res) => {
    try {
        const foundUser = await User.findOne({ username: req.body.email });
        if (!foundUser) {
            res.send("No username found");
            throw new Error("Invalid username");
        }
        const match = await bcrypt.compare(req.body.password, foundUser.password);
        if (match) {
            const token = jwt.sign({ _id: foundUser._id }, process.env.SECRET );
            foundUser.tokens.push({token: token});
            await foundUser.save();
            res.send({
                idToken: token,
                localId: foundUser._id,
                expiresIn: 3600
            });
        } else {
            res.status(401).send("Incorrect Password");
        }
    } catch (err) {
        console.log(err);
    }
})

module.exports = router;