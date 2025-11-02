const File = require('../models/File');
const cloudinary = require('../config/cloudinary');

exports.deleteFile = async (req, res) => {
  try {
    const { fileId } = req.params;
    const file = await File.findOne({ fileId });
    if (!file) {
      return res.status(404).json({ success: false, message: 'File not found' });
    }

    // Delete from Cloudinary
    await cloudinary.uploader.destroy(file.cloudinaryPublicId);
    // Delete from DB
    await File.deleteOne({ fileId });
    // Remove fileId from session
    if (req.session.uploadedFiles) {
      req.session.uploadedFiles = req.session.uploadedFiles.filter(id => id !== fileId);
    }
    res.json({ success: true, message: 'File deleted successfully' });
  } catch (error) {
    console.error('Delete error:', error);
    res.status(500).json({ success: false, message: 'Failed to delete file' });
  }
};
