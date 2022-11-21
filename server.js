import express from "express";
// import * as paypal from "./paypal.js";

import * as paypal from "./paypal.js";
var app = express()

app.use(express.static("public"));

app.post("/api/orders", async (req, res, next) => {
    const order = await paypal.createOrder();
    console.log("ssss server order: "+JSON.stringify(order));
    res.json(order);
});

app.post("/api/orders/:orderId/authorize", async (req, res, next) => {
    const {
        orderId
    } = req.params;
    const authorizeData = await paypal.authorizePayment(orderId);
    console.log("ssss server authorizeData: "+JSON.stringify(authorizeData));
    res.json(authorizeData);
});

app.post("/api/orders/:orderId/capture", async (req, res, next) => {
    const {
        orderId
    } = req.params;
    const captureData = await paypal.capturePayment(orderId);
    res.json(captureData);
});

app.get("/", function (request, response) {
    response.send("Hello World!")
})
app.listen(1001, function () {
    console.log("Started application on port %d", 1001)
});