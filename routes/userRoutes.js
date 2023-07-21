const {userRagister,userLogin} = require("../controllers/User");
const Authentication = require("../middelware/usermiddleware")
const express = require("express");

const router = express.Router();

router.post("/user",userRagister);
router.post("user/login",userLogin,Authentication);