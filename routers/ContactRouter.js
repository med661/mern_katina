const router = require('express').Router()
const ContactController = require('../controllers/ContactController')
const auth = require('../middleware/auth')
const authUser = require('../middleware/authUser')
const authAdmin = require('../middleware/authadmin')

router.post('/addContact',auth,authAdmin,ContactController.AddContact)
router.get('/contactListe',auth,authAdmin,ContactController.getallcontact)





module.exports = router