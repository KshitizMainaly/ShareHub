const express = require('express');
const router = express.Router();
const upload = require('../middleware/upload');
const { uploadLimiter } = require('../middleware/rateLimiter');
const uploadController = require('../controllers/uploadController');

router.post('/', uploadLimiter, upload.single('file'), uploadController.uploadFile);
router.get('/success/:fileId', uploadController.showSuccess);

module.exports = router;
