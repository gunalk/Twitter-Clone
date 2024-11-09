import User from "../models/UserModel.js";
import bycrpt from "bcryptjs"
import generateToken from "../utils/generateToken.js";
export const signup = async (req, res) => {
  try {
    const { username, fullName, email, password } = req.body;
    console.log(req.body);
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: "Invalid email format" });
    }
    const existingUser = await User.findOne({
      email: email,
    });
    const existingUserName = await User.findOne({
      username: username,
    });

    if (existingUser || existingUserName) {
      return res
        .status(400)
        .json({ error: "Username or email already exists" });
    }
    if(password.length > 6){
        return res.status(400).json({ error: "Password must be at least 6 characters length" });
    }
    const salt =await bycrpt.genSalt(10);
    const hashedPassword = await bycrpt.hash(password, salt);
    const newUser =new User({
        username,
        fullName,
        email,
        password: hashedPassword,
      });
    if(newUser){
        generateToken(newUser._id,res)
       await newUser.save()
       res.status(200).json({message:"User Created Successfully",username:newUser.fullName,email:newUser.email,password:newUser.password})
    }
    else{
        res.status(400).json({ error: "Invalid User Data" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
export const login = async (req, res) => {
  try {
   const {username, password} = req.body;
   const user=await User.findOne({username});
   const isPasswordCorrect =await bycrpt.compare(password,user?.password || "")
   if(!user || !isPasswordCorrect) {
    return res.status(401).json({ error: "Invalid credentials" });
   }

   generateToken(User?._id,res)
   res.status(200).json({message:"Logged In Successfully",username:user.username,email:user.email,password:user.password})
  }
  catch(error){
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
export const logout = async (req, res) => {
    try{
        res.cookie("jwt","",{maxAge:0})
        res.json({message:"Logged Out Successfully"})
    }
    catch(error){
        console.log(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
  
};
