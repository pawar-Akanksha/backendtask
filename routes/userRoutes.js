const {userRagister,userLogin} = require("../controllers/User");

const express = require("express");

const router = express.Router();

router.post("/user",userRagister);
router.post("user/login",userLogin);