const cron = require('node-cron');
const File = require('../models/File');
const cloudinary = require('../config/cloudinary');

// Run every hour
const startCleanupJob = () => {
  cron.schedule('0 * * * *', async () => {
    console.log('🧹 Running cleanup job...');
    try {
      const expiredFiles = await File.find({ expiresAt: { $lt: new Date() } });
      for (const file of expiredFiles) {
        await cloudinary.uploader.destroy(file.cloudinaryPublicId);
        await File.deleteOne({ _id: file._id });
        console.log(`Deleted expired file: ${file.originalName}`);
      }
      if (expiredFiles.length > 0) {
        console.log(`✅ Cleanup complete. Removed ${expiredFiles.length} expired files.`);
      }
    } catch (error) {
      console.error('❌ Cleanup job error:', error);
    }
  });
  console.log('⏰ Cleanup cron job started');
};

module.exports = { startCleanupJob };
