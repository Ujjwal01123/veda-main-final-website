const express = require("express");
const {
  createOrder,
  verifyPayment,
} = require("../controllers/razorpay.controller");
// const { accessController } = require("../middlewares/AuthMiddleware");

const paymentRouter = express.Router();

paymentRouter.post(
  "/create-order",
  //  accessController("user"),
  createOrder
);
paymentRouter.post(
  "/verify-payment",
  //  accessController("user"),
  verifyPayment
);

module.exports = paymentRouter;
