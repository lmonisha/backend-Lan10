const mongoose = require('mongoose');



const staffdetails=new mongoose.Schema({



	Name:{
		type:String,
		required:true
	},   
	Date_Of_Birth: Date,
	Age :{
		type:String,
		required:true
	},
	Gender :{
		type:String,
		required:true
	},
	Mobile_Number:{
		type:String,
		required:true
	},
	emailId:{
		type:String,
		required:true
	},
	isActive: Boolean,
	// Created_Date: Date,
	Created_By:{
		type:String,
		required:true
	} ,
	// Updated_Date: {
	// 	type:Date,
	// 	default:Date.now
	// },
	Updated_By:{
		type:String,
		required:false
	} ,
},{ timestamps: true })

const staff_DetailsModel=mongoose.model('staff_details',staffdetails)

module.exports.staff_DetailsModel=staff_DetailsModel