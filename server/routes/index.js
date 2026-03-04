const express = require('express');
const { get } = require('mongoose');
const router = express.Router();
const mainController = require('../controllers/mainController');

// App route
router.get('/', mainController.homepage);
router.get('/about', mainController.about);

module.exports = router;

