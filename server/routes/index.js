const express = require('express');
const router = express.Router();
const controller = require('../controllers');

router.get('/oauth', controller.oauth);

router.get('/oauth_callback', controller.oauth_callback);

router.get('/clear', controller.clear);

router.get('/index', controller.index);

module.exports = router;
