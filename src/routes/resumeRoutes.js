const express = require('express');
const router = express.Router();
const resumeController = require('../controllers/resumeController');
const authMiddleware = require('../middleware/auth');

router.post('/process', authMiddleware, resumeController.processResume);

module.exports = router;