// server.js
require("dotenv").config();
const path = require("path");
const express = require("express");
const cors = require("cors");
const connectDb = require("./connectToDb");
const baseRouter = require("./routes/base.routes");
const userRouter = require("./routes/user.routes");
const bookingRouter = require("./routes/booking.routes");
const rudrakshaRouter = require("./routes/rudraksha.routes");
const braceletRouter = require("./routes/bracelet.routes");
const paymentRouter = require("./routes/payment.routes");
const orderRouter = require("./routes/order.routes");
const blogRoutes = require("./routes/blogRoutes");
const bannerRouter = require("./routes/bannerRoutes");
const { accessController } = require("./middlewares/AuthMiddleware");

const app = express();
const PORT = 5000;

const allowedOrigins = [
  "http://localhost:3000",
  "http://localhost:3001",
  "http://127.0.0.1:5500",
];
// app.use(cors());
app.use(cors({ origin: allowedOrigins, credentials: true })); // allow React frontend
app.use(express.json());
app.use("./uploads", express.static("uploads"));
// Other middlewares here...
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Connect to MongoDB
const mongoUrl = process.env.MONGO_URL;
connectDb(mongoUrl)
  .then(() => console.log(" MongoDB connected"))
  .catch((err) => console.error("MongoDB error:", err));

// new routes
app.use("/", baseRouter);
app.use("/api/users", userRouter);
// app.use("/api/v1/bookings", bookingRouter);
app.use("/api/product/rudraksha", rudrakshaRouter);
app.use("/api/product/bracelet", braceletRouter);
app.use("/api/payments", paymentRouter);
app.use("/api/orders", orderRouter);
app.use("/api/banners", bannerRouter);
// ----------------- ROUTES -----------------
app.use("/api/blogs", blogRoutes);
app.use("/api/pujas", require("./routes/pujaRoutes"));
app.use("/api/categories", require("./routes/categoryRoutes"));
app.use("/api/bookings", require("./routes/bookingRoutes"));
app.use(
  "/api/participate/bookings",
  require("./routes/participateBookingRoutes")
);

// product section 


// ----------------- CRON JOB -----------------
require("./scheduler/reminderJob"); //  start the reminder job

// ----------------- START SERVER -----------------
app.listen(PORT, () => {
  console.log(` Server running at http://localhost:${PORT}`);
});
