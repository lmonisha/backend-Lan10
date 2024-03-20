const { app_accessModel } = require('../models/app_access')
const { staff_DetailsModel } = require('../models/staff_details')
const moment = require('moment');
const nodemailer = require('nodemailer');

module.exports.insertLoginDetails = async function (req, res) {
    try {
        console.log('req.body------->', req.body)

        let dob = moment(req.body.dob, "DD/MM/YYYY").toDate();


        let obj = {
            Name: req.body.name,
            Date_Of_Birth: dob,
            Age: req.body.age,
            Gender: req.body.gender,
            Mobile_Number: req.body.mobileNo,
            emailId: req.body.email,
            isActive: true,
            Created_By: req.body.createdby,

        }
        console.log('obj---->', obj)

        let staffDetails = new staff_DetailsModel(obj)
        staffDetails = await staffDetails.save()

        if (staffDetails) {
            const password = await generatePassword(8); // Generate an 8-character password
            console.log(password);
            let obj1 = {
                staffId: staffDetails._id,
                Username: req.body.name,
                Password: password
            }
            let app = new app_accessModel(obj1)

            app = app.save()

            if (app) {
                let userEmail = await generateUsermail(req.body.email, password, req.body.name).then((info) => {
                    console.log('Email sent:', info.response);
                }).catch    ((error) => {
                    console.error('Error sending email:', error);
                })
            }

            console.log('staffdetails after save----->', staffDetails)
            res.json({ status: 200, success: true, message: 'Object received successfully', data: obj });
        }

    } catch (err) {
        console.log('error in catch block', err)
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }

}

async function generateUsermail(email, password,userName) {
    try {
        // Create a transporter
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'lmonisha12@gmail.com', // your email address
                pass: 'ylsj qsiw biwe zdtq' // your email password
            }
        });

        // Define email options
        const mailOptions = {
            from: 'lmonisha12@gmail.com', // sender address
            to: email, // recipient's email address
            subject: 'Test Email', // Subject line
            text: `Welcome to this platform. Your mailId is ${email},${userName} and autogenerate password is ${password}` // Plain text body
        };

        // Send email and return a promise
        return await transporter.sendMail(mailOptions);
    } catch (error) {
        // If an error occurs, reject the promise with the error
        throw error;
    }
}

function generatePassword(length) {
    const charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let password = '';
    for (let i = 0; i < length; i++) {
        password += charset.charAt(Math.floor(Math.random() * charset.length));
    }
    return password;
}

module.exports.getallDatas = async function (req, res) {

    try {
        const page = parseInt(req.query.page) || 1;

        // Set the number of records per page
        const limit = 10;


        // Calculate the number of records to skip
        const skip = (page - 1) * limit;

        const appAccess = await app_accessModel.find({})
            .populate('staffId') // Populate the referenced documents from the staff_details collection
            .skip(skip)
            .limit(limit)
            .exec()

        console.log('App Access:', appAccess);
        res.json({
            message: 'employee updated successfully',
            status: 200,
            success: true,
            data: appAccess
        })


    } catch (err) {
        console.log('error in catch block', err)
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
}


const mongoose = require('mongoose');

module.exports.getStaffDetailsById = async function (req, res) {
    try {
        console.log('req.params---------->', req.params)
        const staffId = req.params.staffId; // Assuming staff ID is passed as a route parameter
        const objectIdStaffId = mongoose.Types.ObjectId.createFromHexString(staffId);

        console.log('objectIdStaffId------------->', objectIdStaffId)
        // Query the StaffDetailsModel with the staff ID
        const staffDetails = await staff_DetailsModel.findOne({ _id: objectIdStaffId }).exec();

        if (!staffDetails) {
            return res.status(404).json({ error: 'Staff details not found' });
        }
        res.json({
            message: 'employee updated successfully',
            status: 200,
            success: true, data: staffDetails

        })
    } catch (err) {
        console.log('error in catch block', err)
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
};


module.exports.updateStaffData = async function (req, res) {

    console.log('req.body------>', req.body)
    const staffId = req.body._id
    const objectIdStaffId = mongoose.Types.ObjectId.createFromHexString(staffId);
    console.log('objectIdStaffId---->', objectIdStaffId)

    let updatedata = {
        Name: req.body.name,
        Date_Of_Birth: req.body.dob,
        Age: req.body.age,
        Gender: req.body.gender,
        Mobile_Number: req.body.mobileNo,
        emailId: req.body.email,
    }
    console.log('objectIdStaffId-------->', objectIdStaffId)
    console.log('updateData-------->', updatedata)

    staff_DetailsModel.findByIdAndUpdate(objectIdStaffId, { $set: updatedata }).then((resp) => {
        console.log('response from updaate', resp)
        res.json({
            message: 'employee updated successfully',
            status: 200,
            success: true
        })
    }).catch((err) => {
        console.log('error in catch block', err)
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    })
}


module.exports.deleteStaffData = async function (req, res) {
    try {


        console.log('indelete', req.body)
        const staffId = req.body._id
        const objectIdStaffId = mongoose.Types.ObjectId.createFromHexString(staffId);
        // console.log('objectIdStaffId---->', objectIdStaffId)
        await staff_DetailsModel.findByIdAndDelete(objectIdStaffId)
        await app_accessModel.deleteOne({ _id: staffId });
        return res.json({ status: 200, success: true, message: 'Staff and associated access deleted successfully' });
    } catch (err) {
        console.log('error in catch block', err)
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
}


module.exports.loginVerify = async function (req, res) {
    console.log('req.body------------>', req.body)
    try {
        const { userName, password } = req.body
        const user = await app_accessModel.findOne({ Username: userName, Password: password });

        if (!user) {
            throw new Error('Invalid username or password');
        }
        res.json({ status: 200, message: 'Login successfullyy!!!', data: user });
    } catch (error) {
        console.log('error in catch block', err)
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }


}



module.exports.forgotPassword = async function (req, res) {
    console.log('req.body------------------------>', req.body)

    try {
        const { userName, passwordNew, confrmPasswrd } = req.body

        let updatedata = {
            Password: passwordNew
        }
        await app_accessModel.findOneAndUpdate({ Username: userName }, { $set: updatedata }).then((response) => {
            console.log('response from table', response)
            res.json({ status: 200, success: true, message: 'Login successfullyy!!!' });

        })


    } catch (err) {
        console.log('error in catch block', err)
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }

}