const User = require("../modules/UserModel");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const secret = "Akanksha"


module.exports.userRagister = async(req,res)=>{
    
    try{
        const {name,email,password} = req.body;
        const isUser = await User.findOne({email:email});
        if(isUser){
            return res.status(400).json({massage:"User is already exist with given email"})
        }else{
            bcrypt.hash(password,10, async function(err,hash){
                if(err){
                    return res.status(400).json({massage:err.message})
                }else{
                    const user = new User({
                        name:name,
                        email:email,
                        password:hash
                    })
                    user.save().then((user)=>{
                       res.status(201).json(user)
                    }).catch((err)=>{
                        console.log(err);
                        res.status(400).json({massage:err.massage})
                    })
                }
            })
        }
    }
    catch(e){
        res.status(400).json({massage:e.massage})
    }
}

module.exports.userLogin = async(req,res)=>{
    try{
        const {email , password} = req.body
        const Isuser = await User.findOne({email:email})
        // console.log(Isuser)

        if(!Isuser){
            return res.status(400).json({
                status: 400,
                message: "Wrong email"
            })
        }else{
            bcrypt.compare(password , Isuser.password, function(err,result){
                if(err){
                    return res.status(400).json({
                        "message":err.message
                    })
                }

                if(result){
                const token = jwt.sign({
                        exp:Math.floor(Date.now() / 1000)+(60*60),
                        data:Isuser._id
                    },secret);
                    return res.status(200).json({
                        "Message":"Logged In",
                        "name": Isuser.name,
                        "token":token
                    })
                }else{
                    return res.status(400).json({
                        status: 401,
                        message: "Invalid credentials"
                    })
                }
            })

        }

    }catch(e){
        return res.status(400).json({
            message:e.message
        })
    }

}

