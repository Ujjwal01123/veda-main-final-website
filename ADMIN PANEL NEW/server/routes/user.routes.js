const express = require("express");
const {
  register,
  login,
  logout,
  currentUser,
  updateAddress,
} = require("../controllers/user.controller");
// const { accessController } = require("../middlewares/AuthMiddleware");
const { multerUpload } = require("../utils/multer");

const userRouter = express.Router();

userRouter.route("/").post(multerUpload.single("avatar"), register);

userRouter.post(
  "/current-user",
  // accessController("user", "admin"),
  currentUser
);
userRouter.patch(
  "/update-address",
  // accessController("user", "admin"),
  updateAddress
);
userRouter.post("/login", login);
userRouter.post(
  "/logout",
  // accessController("user", "admin"),
  logout
);

module.exports = userRouter;
