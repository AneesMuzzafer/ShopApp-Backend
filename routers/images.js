const express = require("express");
const router = new express.Router();
const Image = require("../models/imageModel");
const multer = require('multer');
const ip = require("../utils");


const storage = multer.memoryStorage();
const upload = multer({ storage: storage });


router.post("/images", upload.single("image"), async (req, res) => {
    const image = new Image({
        name: req.file.filename,
        img: {
            data: req.file.buffer,
            contentType: req.file.mimetype
        }
    });


    Image.create(image, (err, done) => {
        res.send(`https://anees-shop-app.herokuapp.com/images/${done._id}`);
    });

});

router.get("/images/:imageId", (req, res) => {
    Image.findById(req.params.imageId, (err, foundOne) => {
        if (err) {
            console.log(err)
        } else {
            res.setHeader("content-type", "image/png");
            res.send(foundOne.img.data);

        }
    });
});

module.exports = router;