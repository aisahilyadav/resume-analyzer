const express = require('express');
const router = express.Router();
const searchController = require('../controllers/searchController');
const authMiddleware = require('../middleware/auth');

router.post('/name', authMiddleware, searchController.searchByName);

module.exports = router; 