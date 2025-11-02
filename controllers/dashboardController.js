const File = require('../models/File');

exports.showDashboard = async (req, res) => {
  try {
    const uploadedFileIds = req.session.uploadedFiles || [];
    const files = await File.find({
      fileId: { $in: uploadedFileIds }
    }).sort({ createdAt: -1 });
    res.render('dashboard', { files });
  } catch (error) {
    console.error('Dashboard error:', error);
    res.status(500).render('error', {
      title: 'Error',
      message: 'Unable to load dashboard',
      statusCode: 500
    });
  }
};
