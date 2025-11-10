const express = require("express");
const { accessController } = require("../middlewares/AuthMiddleware");

const bookingRouter = express.Router();

module.exports = bookingRouter;
