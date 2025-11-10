const globalErrorHandler = (err, req, res, next) => {
  let error = { ...err };
  error.message = err.message;

  // Log error for debugging
  console.error(err);

  // -------------------- Mongoose: Invalid ObjectId --------------------
  if (err.name === "CastError") {
    const message = "Resource not found";
    error = { message, statusCode: 404 };
  }

  // -------------------- Mongoose: Duplicate Key --------------------
  if (err.code === 11000) {
    const message = "Duplicate field value entered";
    error = { message, statusCode: 400 };
  }

  // -------------------- Mongoose: Validation Error --------------------
  if (err.name === "ValidationError") {
    const message = Object.values(err.errors).map((val) => val.message);
    error = { message, statusCode: 400 };
  }

  // -------------------- Cookie Parsing Error --------------------
  if (err.name === "CookieParseError") {
    const message = "Invalid cookie format. Please clear cookies and try again";
    error = { message, statusCode: 400 };
  }

  // -------------------- Session Expired --------------------
  if (err.name === "SessionExpiredError") {
    const message = "Your session has expired. Please log in again";
    error = { message, statusCode: 401 };
    res.clearCookie("sessionToken");
  }

  // -------------------- Invalid Session --------------------
  if (err.name === "InvalidSessionError") {
    const message = "Invalid session. Please log in again";
    error = { message, statusCode: 401 };
    res.clearCookie("sessionToken");
  }

  // -------------------- No Session Token --------------------
  if (err.name === "CookieNotFoundError") {
    const message = "Authentication required. Please log in";
    error = { message, statusCode: 401 };
  }

  // -------------------- Final Response --------------------
  res.status(error.statusCode || 500).json({
    success: false,
    error: {
      message: error.message || "Server Error",
      ...(process.env.NODE_ENV === "development" && { stack: err.stack }),
    },
  });
};

module.exports = globalErrorHandler;
