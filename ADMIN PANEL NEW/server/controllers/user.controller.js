const Session = require("../models/session.model.js");
const User = require("../models/user.model.js");
const ApiResponse = require("../utils/apiResponse.js");
const asyncHandler = require("../utils/asyncHandler.js");
const ErrorResponse = require("../utils/errorResponse.js");
const { generateSessionToken } = require("../utils/sessionUtils.js");

// -------------------- REGISTER --------------------
exports.register = asyncHandler(async (req, res) => {
  const { fullname, email, password } = req.body;
  const user = await User.findOne({ email: email.toLowerCase() });
  if (user) {
    throw new ErrorResponse(
      "Email Already registered",
      400,
      "UserAlreadyExistsError"
    );
  }
  await User.create({
    fullname,
    email,
    password,
  });
  return ApiResponse.created({}, "User registered successfully").send(res);
});

// -------------------- LOGIN --------------------
exports.login = asyncHandler(async (req, res) => {
  const { body } = req;
  const user = await User.findOne({ email: body.email.toLowerCase() });
  if (!user) {
    throw new ErrorResponse(
      "Invalid credentials",
      401,
      "InvalidCredentialsError"
    );
  }

  const isPasswordCorrect = await user.isPasswordCorrect(body.password);
  if (!isPasswordCorrect) {
    throw new ErrorResponse(
      "Invalid credentials",
      401,
      "InvalidCredentialsError"
    );
  }

  const sessionToken = generateSessionToken();

  const allSessions = await Session.find({ userId: user._id });
  if (allSessions.length > 1) {
    await allSessions[0].deleteOne();
  }

  await Session.create({
    userId: user._id,
    token: sessionToken,
    expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
  });

  res.cookie("sessionToken", sessionToken, {
    httpOnly: true,
    secure: true,
    sameSite: "none",
    path: "/",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });

  return ApiResponse.success({ sessionToken }, "Login successful").send(res);
});

// -------------------- CURRENT USER --------------------
exports.currentUser = asyncHandler(async (req, res) => {
  const user = await User.findOne({ _id: req.user._id })
    .populate([
      {
        path: "orders.orderId",
        populate: [
          {
            path: "products.productId",
            select: "productName productImage productPrice productDiscount",
          },
          {
            path: "transactionId",
            select: "paymentId amount currency",
          },
        ],
      },
    ])
    .select("-password");

  return ApiResponse.success(user).send(res);
});

// -------------------- LOGOUT --------------------
exports.logout = asyncHandler(async (req, res) => {
  const sessionToken = req.cookies.sessionToken;
  await Session.deleteOne({ token: sessionToken });
  res.clearCookie("sessionToken", {
    httpOnly: true,
    secure: true,
    sameSite: "none",
    path: "/",
  });
  return ApiResponse.success({}, "Logout successful").send(res);
});

// -------------------- UPDATE --------------------
exports.update = asyncHandler(async (req, res) => {
  const { body } = req;
  await User.findOneAndUpdate({ _id: req.user._id }, body, { new: true });
  return ApiResponse.success({}, "User updated successfully").send(res);
});

// -------------------- UPDATE ADDRESS --------------------
exports.updateAddress = asyncHandler(async (req, res) => {
  const { body } = req;
  console.log(body);
  await User.findOneAndUpdate({ _id: req.user._id }, body, { new: true });
  return ApiResponse.success({}, "User updated successfully").send(res);
});

// -------------------- DELETE USER --------------------
exports.deleteUser = asyncHandler(async (req, res) => {
  // TODO: implement user deletion
});

// -------------------- FORGOT PASSWORD --------------------
exports.forgotPassword = asyncHandler(async (req, res) => {
  // TODO: implement forgot password
});

// -------------------- RESET PASSWORD --------------------
exports.resetPassword = asyncHandler(async (req, res) => {
  // TODO: implement reset password
});

// -------------------- GET ALL USERS --------------------
exports.users = asyncHandler(async (req, res) => {
  const { query } = req;
  const { page = 1, limit = 10 } = query;
  const totalDocs = await User.countDocuments({ role: { $ne: "admin" } });
  const totalPages = Math.ceil(totalDocs / limit);
  const skip = (page - 1) * limit;
  const users = await User.find({ role: { $ne: "admin" } })
    .skip(skip)
    .limit(limit);
  return ApiResponse.success({ users, totalPages }).send(res);
});

// -------------------- GET SINGLE USER --------------------
exports.user = asyncHandler(async (req, res) => {
  const { params } = req;
  const user = await User.findOne({ _id: params.id });
  if (!user) {
    throw new ErrorResponse("Invalid user", 404, "UserNotFoundError");
  }
  return ApiResponse.success({ user }).send(res);
});
