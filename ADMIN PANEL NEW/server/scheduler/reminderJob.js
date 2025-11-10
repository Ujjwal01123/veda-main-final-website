const cron = require("node-cron");
const Booking = require("../models/Booking");
const sendEmail = require("../utils/sendEmail");
require("dotenv").config();

// Run every day at 01:01 PM
cron.schedule("05 13 * * *", async () => {
  // your booking reminder logic...

  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  // console.log(tomorrow);

  const startOfDay = new Date(tomorrow.setHours(0, 0, 0, 0));
  // console.log(startOfDay);
  const endOfDay = new Date(tomorrow.setHours(23, 59, 59, 999));
  // console.log(endOfDay);

  try {
    const bookings = await Booking.find({
      bookingDate: { $gte: startOfDay, $lte: endOfDay },
      status: "confirmed", // only confirmed bookings
    }).populate("puja");
    // console.log(bookings);

    for (const booking of bookings) {
      const userMsg = `
Dear ${booking.name},

This is a friendly reminder that your puja "${booking.puja.title}" 
is scheduled on ${booking.bookingDate.toDateString()}.

Regards,
Puja Booking Team
`;

      // console.log(userMsg);

      const ownerMsg = `
Dear Puja Owner,

Reminder: You have a confirmed booking tomorrow.

Customer: ${booking.name}
Puja: ${booking.puja.title}
Date: ${booking.bookingDate.toDateString()}
`;

      // console.log(ownerMsg);

      // Send email to user
      await sendEmail(booking.email, "📌 Puja Reminder - Tomorrow", userMsg);

      // Send email to owner (from .env)
      // console.log(process.env.OWNER_EMAIL);
      await sendEmail(
        process.env.OWNER_EMAIL,
        "📌 Booking Reminder - Tomorrow",
        ownerMsg
      );
    }
  } catch (error) {
    console.error("❌ Error running reminder job:", error);
  }
});
