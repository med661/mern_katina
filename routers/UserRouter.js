const router = require('express').Router()
const UserController = require('../controllers/UserController')
const auth = require('../middleware/auth')
const authUser = require('../middleware/authUser')
const authAdmin = require('../middleware/authadmin')

router.post('/register', UserController.AddUser)
router.post('/login', UserController.login)
router.get('/profil', auth,authUser,UserController.profil)
router.get('/logout', UserController.logout)
router.get('/getalluser',auth,authAdmin, UserController.getalluser)




module.exports = router