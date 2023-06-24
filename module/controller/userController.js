const bcrypt = require("../utils/bcrypt")
const User = require("../model/user")
const Response = require("../model/Response")
const httpStatus = require("http-status")
const userValidator = require("../utils/userValidator")
const loginValidator = require("../utils/loginUserValidator")
const jwt = require("jsonwebtoken")

const regUser = async (req, res) => {
    try {
        const request = await userValidator.validateAsync(req.body)
        const userByUsername = await User.findOne({ username: request.username })
        const userByEmail = await User.findOne({ email: request.email })

        if (userByUsername) {
            const response = new Response.Error(true, "Username Already Exist")
            return res.status(httpStatus.BAD_REQUEST).json(response)
        }
        if (userByEmail) {
            const response = new Response.Error(true, "Email Already Exist")
            return res.status(httpStatus.BAD_REQUEST).json(response)
        }

        const hash = await bcrypt.hash(request.password)
        request.password = hash

        const user = new User(request)
        const result = await user.save()

        const response = new Response.Success(false, "Success Register User", result)
        res.status(httpStatus.OK).json(response)
    } catch (error) {
        const response = new Response.Error(true, error.message)
        res.status(httpStatus.BAD_REQUEST).json(response)
    }
}

const loginUser = async (req, res) => {
    const secretKey = process.env.SECRET_KEY
    try {
        const request = await loginValidator.validateAsync(req.body)
        const user = await User.findOne({
            $or: [
                { email: request.email },
                { username: request.username }
            ]
        })

        if (!user) {
            const response = new Response.Error(true, "Email or Username Invalid")
            return res.status(httpStatus.BAD_REQUEST).json(response)
        }

        const validPassword = await bcrypt.compare(
            request.password, user.password
        )

        if (!validPassword) {
            const response = new Response.Error(true, "Password Invalid")
            return res.status(httpStatus.BAD_REQUEST).json(response)
        }

        const createToken = jwt.sign({ id: user._id }, secretKey)
        const result = { token: createToken, username: user.username }
        const response = new Response.Success(false, `Hallo ${user.username}`, result)
        res.status(httpStatus.OK).json(response)
    } catch (error) {
        const response = new Response.Error(true, error.message)
        res.status(httpStatus.BAD_REQUEST).json(response)
    }
}

module.exports = { regUser, loginUser }
