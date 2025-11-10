const express = require("express");
const baseRouter = express.Router();

baseRouter.get("/", (req, res) => {
  res.send("Veda Structure API: Started successfully");
});

module.exports = baseRouter;
