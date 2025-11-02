const File = require('../models/File');
const bcrypt = require('bcrypt');

exports.showDownloadPage = async (req, res) => {
  try {
    const file = await File.findOne({ fileId: req.params.fileId });
    if (!file) {
      return res.status(404).render('error', {
        title: 'File Not Found',
        message: 'This file does not exist or has been deleted.',
        statusCode: 404
      });
    }

    // Check if file has expired
    if (new Date() > file.expiresAt) {
      return res.render('error', {
        title: 'File Expired',
        message: 'This file has expired and is no longer available.',
        statusCode: 410
      });
    }

    // Check download limit
    if (file.maxDownloads && file.downloadCount >= file.maxDownloads) {
      return res.render('error', {
        title: 'Download Limit Reached',
        message: 'This file has reached its maximum download limit.',
        statusCode: 410
      });
    }

    // If password protected
    if (file.password) {
      return res.render('password', { fileId: file.fileId, error: null });
    }

    // Increment download count
    file.downloadCount += 1;
    await file.save();

    res.render('download', { file });
  } catch (error) {
    console.error('Download page error:', error);
    res.status(500).render('error', {
      title: 'Error',
      message: 'Unable to load download page',
      statusCode: 500
    });
  }
};

exports.verifyPassword = async (req, res) => {};
