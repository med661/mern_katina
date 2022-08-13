

const vm = require("v-response");
const { body, validationResult ,check} = require('express-validator');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User=require('../models/UserModels')
const ValidateUser =require('../validation/Users.validation')
   
const UserController={
AddUser :async (req,res)=>{
    const {errors,isValid}=ValidateUser(req.body)
    const { name, email, password, mobile ,adress} = req.body;
console.log({ name, email, password, mobile ,adress});
try {
    if (!isValid) {
        res.status(404).json(vm.ApiResponse(false,404,errors))

    }else{
     await   User.findOne({email:req.body.email}).then(async(exist)=>{
            if ((exist)) {
                errors.email="email already exist"
                res.status(404).json(vm.ApiResponse(false,404,errors))

            }
            else{

              const passwordHash = await bcrypt.hash(password, 12);
           
              console.log(passwordHash);

              const newUser = new User({
                name:name,
                email:email,
                password:passwordHash,
                mobile:mobile,
                adress:adress,
              })
              newUser
              .save()
              .then((insc) => {
                return res.status(201).json(vm.ApiResponse(true, 201, insc));
              })
              .catch((err) => {
                return res.status(500).json(vm.ApiResponse(false, 500, err));
              });         
            }
        })
       
    }

   
} catch (err) {
    res.status(500).json({"mmm":err})
    
}

},



login: async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user)
      return res.status(400).json({ msg: "This email does not exist." });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ msg: "Password is incorrect." });

    const refresh_token = createRefreshToken({ id: user._id });


    res.json({ msg: "Login success!", refresh_token: refresh_token });
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
},

profil:async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    console.log({user});
    res.status(200).json(vm.ApiResponse(true,200,user));
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
},

logout: async (req, res) => {
  try {
    res.clearCookie("refreshtoken", { path: "/user/refresh_token" });
    return res.json({ msg: "Logged out." });
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
},


getalluser:async (req, res) => {
  try {
    const users = await User.find().select("-password");

    res.json(users);
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }

}




 }


    const createRefreshToken = (payload) => {
      return jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, {
        expiresIn: "7d",
      });


   
    };


    
    module.exports = UserController;
