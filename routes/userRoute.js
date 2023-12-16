const express = require('express');
const router = express.Router();
const {signup , signIn , protect , restrictTo} = require('../controllers/authController');
const {getAllUsers } = require('../controllers/userController');
const { getUserTasksLs } = require('../controllers/userController');


router.route('/signup').post(signup);
router.route('/signin').post(signIn);
router.route('/').get( protect, restrictTo('admin'),getAllUsers);
router.route('/usertasklist/:userId').get( getUserTasksLs)

module.exports = router;