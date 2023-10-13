const router = require('express').Router();

const { getUserProfile } = require('../controllers/user');

router.route('/').get(getUserProfile);

module.exports = router;
