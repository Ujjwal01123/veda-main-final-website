const Session = require("../models/session.model.js");
const User = require("../models/user.model.js");
const asyncHandler = require("../utils/asyncHandler.js");
const ErrorResponse = require("../utils/errorResponse.js");

exports.accessController = (...allowedRoles) => {
  return asyncHandler(async (req, res, next) => {
    let sessionToken;

    // -------------------- CHECK TOKEN IN COOKIE OR HEADER --------------------
    if (req.cookies && req.cookies.sessionToken) {
      sessionToken = req.cookies.sessionToken;
    } else if (req.headers.authorization) {
      const authHeader = req.headers.authorization;
      if (authHeader.startsWith("Bearer ")) {
        sessionToken = authHeader.substring(7);
      } else {
        sessionToken = authHeader;
      }
    }

    // -------------------- NO TOKEN FOUND --------------------
    if (!sessionToken) {
      res.clearCookie("sessionToken", {
        httpOnly: true,
        secure: true,
        sameSite: "none",
        path: "/",
      });
      return next(
        new ErrorResponse("Login to continue", 401, "CookieNotFoundError")
      );
    }

    // -------------------- VALIDATE SESSION --------------------
    const session = await Session.findOne({ token: sessionToken });
    if (!session) {
      res.clearCookie("sessionToken", {
        httpOnly: true,
        secure: true,
        sameSite: "none",
        path: "/",
      });
      return next(
        new ErrorResponse(
          "Invalid session. Please log in again",
          401,
          "InvalidSessionError"
        )
      );
    }

    // -------------------- CHECK EXPIRATION --------------------
    if (session.expiresAt < new Date()) {
      await Session.deleteOne({ _id: session._id });
      res.clearCookie("sessionToken", {
        httpOnly: true,
        secure: true,
        sameSite: "none",
        path: "/",
      });
      return next(
        new ErrorResponse(
          "Your session has expired. Please log in again",
          401,
          "SessionExpiredError"
        )
      );
    }

    // -------------------- VALIDATE USER --------------------
    const user = await User.findById(session.userId).select("-password");
    if (!user) {
      res.clearCookie("sessionToken", {
        httpOnly: true,
        secure: true,
        sameSite: "none",
        path: "/",
      });
      return next(new ErrorResponse("Invalid Credentials", 404));
    }

    // -------------------- CHECK ROLE PERMISSIONS --------------------
    if (!allowedRoles.includes(user.role)) {
      return next(new ErrorResponse("You don't have permission.", 403));
    }

    // -------------------- ATTACH USER TO REQUEST --------------------
    req.user = user;
    next();
  });
};
