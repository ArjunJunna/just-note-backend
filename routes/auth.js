const router = require('express').Router();
const { createNewUser, userLogin } = require('../controllers/user');

router.route('/signup').post(createNewUser);
router.route('/login').post(userLogin);

module.exports = router;
