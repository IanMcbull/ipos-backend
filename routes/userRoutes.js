const express = require('express');
const router = express.Router();
const {registerUser,loginUser,getMe,getUsers,updateUser,deleteUser,getAdminUsers,changedefaultPin}  = require('../controllers/userController')
const {protect} = require('../middleware/authMiddleware');
router.route('/').get(getUsers).post(registerUser)
router.route('/admin').get(getAdminUsers)
router.route('/').put(updateUser).delete(deleteUser)
router.post('/login', loginUser)
router.post('/password', changedefaultPin)
router.get('/me', protect, getMe)

module.exports = router;