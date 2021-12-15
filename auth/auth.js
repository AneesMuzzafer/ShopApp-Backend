require("dotenv").config();
const User = require("../models/userModel");
const jwt = require('jsonwebtoken');

const auth = async (req, res, next) => {
    
    if (!req.headers.authorization) {
        throw new Error;
    }
    const token = req.headers.authorization.split(" ").pop();
    try {
        const user = jwt.verify(token, process.env.SECRET);
        const foundUser = await User.findOne({_id: user._id, "tokens.token": token });
        req.user = foundUser;
        next();
    } catch (err) {
        console.log(err);
        res.status(401).send("UnAuthorized Access");
    }

};

module.exports = auth;