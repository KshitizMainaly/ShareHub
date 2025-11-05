const cron = require("node-cron");
const File = require("../models/File");
const cloudinary = require("../config/cloudinary");

// Run every hour at minute 0
const startCleanupJob = () => {
  cron.schedule("0 * * * *", async () => {
    console.log("🧹 Running cleanup job...");
    try {
      const expiredFiles = await File.find({ expiresAt: { $lt: new Date() } });
      if (!expiredFiles || expiredFiles.length === 0) {
        console.log("No expired files found");
        return;
      }

      let removedCount = 0;

      for (const file of expiredFiles) {
        // Delete Cloudinary resource (resource_type 'auto' ensures non-image files are handled)
        try {
          if (file.cloudinaryPublicId) {
            await cloudinary.uploader.destroy(file.cloudinaryPublicId, {
              resource_type: "auto",
            });
          } else {
            console.warn(
              `Skipping cloud delete: missing cloudinaryPublicId for file ${file._id}`
            );
          }
        } catch (err) {
          console.error(
            `Failed to delete Cloudinary resource for ${
              file._id || file.fileId
            }:`,
            err
          );
          // Skip DB deletion if cloud delete failed; move to next file
          continue;
        }

        // Delete DB record
        try {
          const res = await File.deleteOne({ _id: file._id });
          if (res.deletedCount && res.deletedCount > 0) {
            removedCount += 1;
            console.log(
              `Deleted expired file record: ${file.originalName} (${file._id})`
            );
          } else {
            console.warn(
              `Cloudinary resource deleted but DB record not removed for ${file._id}`
            );
          }
        } catch (err) {
          console.error(
            `Failed to delete DB record for ${file._id || file.fileId}:`,
            err
          );
        }
      }

      if (removedCount > 0) {
        console.log(
          `✅ Cleanup complete. Successfully removed ${removedCount} expired files.`
        );
      } else {
        console.log("Cleanup run finished. No DB records removed this run.");
      }
    } catch (error) {
      console.error("❌ Cleanup job error:", error);
    }
  });
  console.log("⏰ Cleanup cron job started");
};

module.exports = { startCleanupJob };
