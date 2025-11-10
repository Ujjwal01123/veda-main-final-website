const express = require("express");
const { allOrders } = require("../controllers/order.controller");
const { accessController } = require("../middlewares/AuthMiddleware");

const orderRouter = express.Router();

orderRouter.get(
  "/",
  //  accessController("admin"),
  allOrders
);

module.exports = orderRouter;
