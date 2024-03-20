const mongoose = require('mongoose')
    

const appAccess=new mongoose.Schema({
	staffId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'staff_details' // Reference to the staff_details collection
    },
	Username: String,
	Password: String,
	isLocked: Boolean

})

const app_accessModel=mongoose.model('app_access',appAccess)

module.exports.app_accessModel=app_accessModel
