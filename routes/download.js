const express = require('express');
const router = express.Router();
const downloadController = require('../controllers/downloadController');

router.get('/:fileId', downloadController.showDownloadPage);
router.post('/:fileId/verify', downloadController.verifyPassword);

module.exports = router;
