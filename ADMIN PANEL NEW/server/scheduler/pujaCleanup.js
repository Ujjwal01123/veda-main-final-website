// cronJobs/pujaCleanup.js
const cron = require("node-cron");
const fs = require("fs");
const path = require("path");
const Puja = require("../models/Puja");

// 🕒 Schedule: Runs every day at midnight (00:00)
cron.schedule("0 0 * * *", async () => {
  console.log("⏰ Running daily Puja cleanup job...");

  try {
    const cutoff = new Date();
    cutoff.setDate(cutoff.getDate() - 30); // 30 days ago

    // Find pujas marked as deleted & older than 30 days
    const oldPujas = await Puja.find({
      isDeleted: true,
      deletedAt: { $lte: cutoff },
    });

    for (const puja of oldPujas) {
      // Delete image if exists
      if (puja.image) {
        const imagePath = path.join(process.cwd(), puja.image);
        fs.unlink(imagePath, (err) => {
          if (err) console.error("🖼️ Error deleting image:", err.message);
        });
      }

      await Puja.findByIdAndDelete(puja._id);
      console.log(`🗑️ Deleted expired Puja: ${puja.title}`);
    }

    console.log("✅ Daily Puja cleanup completed.");
  } catch (error) {
    console.error("❌ Puja cleanup error:", error.message);
  }
});
