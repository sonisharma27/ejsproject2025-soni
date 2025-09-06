const Student=require("../models/Student");
const cloudinary=require('cloudinary').v2;
async function addStudent(req, res){
    try{
        //  console.log(req.body , "req.body");
        
        //  console.log(req.file,"req.file");
         let result;
        
         if(req.file){
            cloudinary.config({
                cloud_name: 'dzniuue5i',
                api_key: '816654142678668',
                api_secret: 'UnFYanK7sXs1japoC5F40tTbLtY'
            })
             result=  await cloudinary.uploader.upload(req.file.path);
            // console.log(result);
         }
         let student=new Student(req.body);
         if(req.file){
         student.studentImage = result.secure_url;
         }
         await student.save();
        //  console.log("data base updated...");
         let students=await Student.find({})
         res.render('studentList',{
            students : students
         });
    }catch(err){
        console.log("Error!!..", err);
    }
}
async function showStudent(req, res) {
  try {
    let students = await Student.find({})
    // console.log(students)
    res.render('studentlist', {
      students: students
    });
  } catch (err) {
    console.log(err);
  }
}
async function deleteStudent(req,res) {
    try{
        let studentId=req.params._id;
        // console.log(studentId,"deleteStudent");
        await Student.deleteOne({_id:studentId});
        let students=await Student.find({});
        res.render('welcomeadmin',{
            students: students
        })

    }catch(err){
        console.log(err);
    }
}
async function openEditPage(req,res) {
    try{
        let studentId= req.params._id;
        let student=await Student.findOne({_id:studentId });
        if(student){
            res.render('studenteditpage',{
                student: student
            });
        }else{
            res.render('/');
        }

    }catch(err){
        console.log(err);

    }
    
}
async function editStudent(req,res){
    try{
       const studentId=req.params._id;
    //    console.log(studentId+"studentId");
       let student= await Student.findOne({_id:studentId});
       if(student){
        // console.log(req.body,"req.body");
        student.rollNo =req.body.rollNo;
        student.name = req.body.name;
        student.emailId = req.body.emailId;
        student.fatherName= req.body.fatherName;
        student.motherName= req.body.motherName;
        student.course=req.body.course;
        student.branch=req.body.branch;
        student.yearOfAdmission=req.body.yearOfAdmission;
        await student.save();
        let students=await Student.find({});
        res.render('welcomeAdmin',{
            students:students
        })

       }else{
        console.log("Student not found...");
       }
    }catch(err){
        console.log(err);
    }
}
module.exports = {
    addStudent,
    deleteStudent,
    openEditPage,
    editStudent,
    showStudent
}