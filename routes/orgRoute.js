const express = require('express');
const router = express.Router();
const {registerOrg, loginOrg} = require('../controllers/organizationController')
router.route('/register').post(registerOrg)
router.route('/login').post(loginOrg)

module.exports = router;