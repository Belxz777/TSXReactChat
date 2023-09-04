const {Router, application} = require('express')
const controller = require('./controller')
const router = Router()
//получение данных
/*router.get('/profile/',controller.getPrizoners)
router.get('/:id',controller.findUser)*/
//отправка данных 
router.post('/',controller.addNewUser)
router.get('/profile/:token',controller.takeAllbyToken )
router.post("/login",controller.login)
router.get('/getId/:id',controller.findUserById)
//удаление данных
/*router.delete('/:id',controller.deleteUser)
router.put('/:id',controller.updateUser)
router.get('/profile/:id',controller.userEnter)
//router.get('/nodemail/',controller.sendEmail)*/
module.exports = router