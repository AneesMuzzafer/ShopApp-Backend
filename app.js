const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");


const products = require("./routers/products");
const orders = require("./routers/orders");
const images = require("./routers/images");
const users = require("./routers/users");



const app = express();

app.use(bodyParser.json({ type: "application/json" }));

mongoose.connect("mongodb+srv://admin:12345@shop-app.ylpul.mongodb.net/ShopApp?retryWrites=true&w=majority", { useNewUrlParser: true });

app.get("/", (req, res) => {
    res.send("Bismillah! It works");
})

app.use(products);
app.use(orders);
app.use(images);
app.use(users);


app.listen(process.env.PORT || 4000, () => {
    console.log("Server started at port 4000");
});
