const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../model/User');

exports.signup = async(req,res) => {
    try{
        const {fname, lname, age, phone, email, password} = req.body;
        
        const existing = await User.findOne({email});
        if(existing){
            return res.status(400).json({message:'User Already Exists'});
        }
        const hashedPassword = await bcrypt.hash(password,10);

        const newUser = new User({
            fname,lname,age,phone,email,password:hashedPassword
        })
        await newUser.save();
        res.status(200).json({message:'User Created Succesfully'});
    }
    catch(err){
        res.status(500).json({message:'User Creation Failed',err});
    }
}

exports.login = async(req,res) => {
    try{
        const {email,password} = req.body;
        const existing = await User.findOne({email});
        if(!existing){
            return res.status(400).json({message:'User does not Exists'});
        }
        const isMatch = await bcrypt.compare(password,existing.password);
        if(!isMatch){
            return res.status(400).json({message:'Invalid Password'});
        }
        const token = jwt.sign(
            {id:existing._id,email:existing.email},
            process.env.JWT_SECRET,
            {expiresIn:'7d'}    
        );
        res.status(200).json({message:'Login Succesful',token,user:{
            id:existing._id,
            fname:existing.fname,
            email:existing.email
        }})
    }
    catch(err){
        res.status(500).json({message:'Login Failed'});
    }
}

exports.getUser = async(req,res) => {
    try{
        const userId = req.user.id;
        const user = await User.findById(userId).select('-password');
        if(!user){
            return res.status(401).json({message:'User Not Found'});
        }
        res.status(200).json(user);
    }
    catch(err){
        res.status(500).json({message:'Failed to Fetch User'});
    }
}

exports.uploadImage = async(req,res) => {
    try{
        const imagePath = req.file.path

        const user = await User.findByIdAndUpdate(req.user.id,{profileImage:imagePath},{new:true});
        res.status(200).json(user);
    }
    catch(err){
        res.status(500).json({ message: 'Upload failed' });
    }
}