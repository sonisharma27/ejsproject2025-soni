const User =require("./models/User");
async function makeAdmin(){
    try{
        let user = await User.findOne({email: "soni123@gmail.com"})
        if(user){
            console.log('user updated...');

        }else{
        let user = new User();
        user.firstName = "Soni",
        user.lastName = "Sharma",
        user.email = "soni123@gmail.com";
        let validPassword =bcrypt.hashSync('1234',10);
        user.password =validPassword;
        await user.save();
        console.log("user save sucessfully...");
        
        }
    }catch(err){

    }
}
module.exports=makeAdmin;