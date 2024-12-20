require("dotenv").config();
const User = require("../models/user");
const bcrypt = require('bcrypt')
const saltRound = 10
const jwt = require('jsonwebtoken')
const createUserService = async (name, email, password) => {
    try {
        //check email tồn tại
        const emailExit = await User.findOne({ email })
        if (emailExit) {
            console.log(`chọn một email khác ${emailExit?.email}`)
            return null
        }
        //hash password
        const hashPassword = await bcrypt.hash(password, saltRound)
        //save password
        let result = await User.create({
            name: name,
            // address: customerData.address,
            // phone: customerData.phone,
            email: email,
            password: hashPassword,
            role: "hoidanit"
        })
        return result;

    } catch (error) {
        console.log(error);
        return null;
    }
}

const loginUserService = async (email, password) => {
    try {
        //fetch user by email
        const user = await User.findOne({ email: email });
        if (user) {
            //compare password
            const isMatchPassword = await bcrypt.compare(password, user.password)
            if (!isMatchPassword) {
                return {
                    EC: 2,
                    EM: "Password không hợp lệ"
                }
            } else {
                // tạo access token
                const payload = {
                    email: user.email,
                    name: user.name
                }
                const access_token = jwt.sign(payload, process.env.JWT_SECRET, {
                    expiresIn: process.env.JWT_EXPIRE
                })
                return {
                    EC: 0,
                    access_token,
                    payload
                }
            }
        } else {
            return {
                EC: 1,
                EM: "Email không hợp lệ"
            }
        }
    } catch (error) {
        console.log(error);
        return null;
    }
}

const getUserService = async () => {
    try {
        let result = await User.find({}).select("-password")
        return result;

    } catch (error) {
        console.log(error);
        return null;
    }
}


module.exports = {
    createUserService,
    loginUserService,
    getUserService
}