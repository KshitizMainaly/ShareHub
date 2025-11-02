const express = require('express');
const router = express.Router();
const deleteController = require('../controllers/deleteController');

router.delete('/:fileId', deleteController.deleteFile);

module.exports = router;
