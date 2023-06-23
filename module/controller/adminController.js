const bcrypt = require("../utils/bcrypt")
const httpStatus = require("http-status")
const adminValidator = require("../utils/adminValidator")
const loginValidator = require("../utils/loginValidator")
const jwt = require("jsonwebtoken")
const Admin = require("../model/admin")
const Response = require("../model/Response")

const regAdmin = async (req,res) =>{
    try {
        const request = await adminValidator.validateAsync(req.body)
        const admins = await Admin.findOne({username : request.username})

        if(admins){
            const response = new Response.Error(true, "Username Already Exist")
            return res.status(httpStatus.BAD_REQUEST).json(response)
        }

        const hash = await bcrypt.hash(request.password)
        request.password = hash

        const admin = new Admin(request)
        const result = admin.save()

        const response = new Response.Success(false, "Register Success", result)
        res.status(httpStatus.OK).json(response)
    } catch (error) {
        const response = new Response.Error(true, error.message)
        res.status(httpStatus.BAD_REQUEST).json(response)
    }
}

const loginAdmin = async (req,res) =>{
    const secretKey = process.env.SECRET_KEY;
    try {
        const request = await loginValidator.validateAsync(req.body);

        const admin = await Admin.findOne({username : request.username})

        if(!admin){
            const response = new Response.Error(true, "Invalid Username")
            return res.status(httpStatus.BAD_REQUEST).json(response)
        }

        const validPassword = await bcrypt.compare(
            request.password, admin.password
        )

        if(!validPassword){
            const response = new Response.Error(true, "Invalid Password")
            return res.status(httpStatus.BAD_REQUEST).json(response)
        }

        const createToken = jwt.sign({id : admin._id}, secretKey)
        const result = { token : createToken, username : admin.username}
        const response = new Response.Success(false, `Hallo ${admin.username}`, result)
        res.status(httpStatus.OK).json(response)
    } catch (error) {
        const response = new Response.Error(true, error.message)
        res.status(httpStatus.BAD_REQUEST).json(response)
    }
}

module.exports = { regAdmin, loginAdmin }