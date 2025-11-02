const File = require('../models/File');
const { customAlphabet } = require('nanoid');
const bcrypt = require('bcrypt');

const nanoid = customAlphabet('0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz', 10);

exports.uploadFile = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'No file uploaded',
      });
    }

    const { expiration, password, maxDownloads } = req.body;
    // Calculate expiration date
    const expirationHours = parseInt(expiration) || 24;
    const expiresAt = new Date();
    expiresAt.setHours(expiresAt.getHours() + expirationHours);

    // Hash password if provided
    let hashedPassword = null;
    if (password && password.trim() !== '') {
      hashedPassword = await bcrypt.hash(password, 10);
    }

    // Generate unique file ID
    let fileId;
    let existing;
    do {
      fileId = nanoid();
      existing = await File.findOne({ fileId });
    } while (existing);

    // Create file document
    const file = new File({
      filename: req.file.filename,
      originalName: req.file.originalname,
      fileUrl: req.file.path,
      fileId: fileId,
      cloudinaryPublicId: req.file.filename,
      size: req.file.size,
      mimetype: req.file.mimetype,
      password: hashedPassword,
      maxDownloads: maxDownloads ? Number(maxDownloads) : null,
      expiresAt: expiresAt,
    });

    await file.save();

    // Store file ID in session for dashboard
    if (!req.session.uploadedFiles) {
      req.session.uploadedFiles = [];
    }
    req.session.uploadedFiles.push(fileId);

    // Redirect to success page
    res.redirect(`/upload/success/${fileId}`);
  } catch (error) {
    console.error('Upload error:', error);
    res.status(500).json({
      success: false,
      message: 'Upload failed',
    });
  }
};

exports.showSuccess = async (req, res) => {};
