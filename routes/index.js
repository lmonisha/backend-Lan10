const express = require('express')
const router=express.Router()

const validation=require('../middlewares/customValidation')

const controller = require('../controller/userController')

router.post('/insert', validation.insertValidation,controller.insertLoginDetails)
router.get('/getallData',controller.getallDatas)
router.get('/:staffId',controller.getStaffDetailsById)
router.post('/updatestaffDetails',validation.updateValidation,controller.updateStaffData)
router.post('/deletestaffDetails',validation.deleteValidation,controller.deleteStaffData)
router.post('/loginverify',validation.loginValidation,controller.loginVerify)
router.post('/forgotPassword',validation.forgotPassValidation,controller.forgotPassword)

module.exports = router