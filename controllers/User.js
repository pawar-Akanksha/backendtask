const User = require("../modules/UserModel");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const secret = "Akanksha"


module.exports.userRagister = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const existingUser = await User.findOne({ email: email });

        if (existingUser) {
            return res.status(400).json({ message: "User is already exist with given email" });
        } else {
            const hash = await bcrypt.hash(password, 10);
            const newUser = new User({
                name: name,
                email: email,
                password: hash
            });

            newUser.save()
                .then((user) => {
                    res.status(201).json(user);
                })
                .catch((err) => {
                    console.log(err);
                    res.status(400).json({ message: err.message });
                });
        }
    } catch (e) {
        res.status(400).json({ message: e.message });
    }
};
module.exports.userLogin = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email: email });

        if (!user) {
            return res.status(400).json({
                status: 400,
                message: "Wrong email"
            });
        } else {
            const passwordMatch = await bcrypt.compare(password, user.password);
            if (passwordMatch) {
                const token = jwt.sign({
                    exp: Math.floor(Date.now() / 1000) + (60 * 60),
                    data: user._id
                }, secret);
                return res.status(200).json({
                    "Message": "Logged In",
                    "name": user.name,
                    "token": token
                });
            } else {
                return res.status(400).json({
                    status: 401,
                    message: "Invalid credentials"
                });
            }
        }
    } catch (e) {
        return res.status(400).json({
            message: e.message
        });
    }
};