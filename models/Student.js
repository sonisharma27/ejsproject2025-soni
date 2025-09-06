const mongoose = require('mongoose');
const timestamps = require('mongoose-timestamps');
const Schema = mongoose.Schema;

const studentSchema = new Schema({
        rollNo : {type : String , required : true},
        name : {type : String , required : true},
        emailId : {type : String },
        fatherName : {type  : String},
        motherName : {type  : String},
        course : {type : String, required : true},
        branch : {type : String},
        yearOfAdmission: {type : String},
        studentImage: {type : String},
        createdAt : Date,
        updatedAt : Date
});

studentSchema.plugin(timestamps , {index : true});
module.exports = mongoose.model('Student' , studentSchema)