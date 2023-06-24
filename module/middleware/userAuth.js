const jwt = require("jsonwebtoken")
const httpStatus = require("http-status")
const User = require("../model/user")
const Response = require("../model/Response")
const clearToken = require("../utils/clearToken")

const userAuth = async (req, res, next) => {
  const token = req.headers.authorization;
  const response = new Response.Error(true, "Anda Harus Login")
  const secretKey = process.env.SECRET_KEY
  if (!token) {
    return res.status(httpStatus.UNAUTHORIZED).json(response)
  }
  try {
    const myToken = clearToken(token)
    const decodeToken = jwt.verify(myToken, secretKey)
    const userID = decodeToken.id
    const user = await User.findById(userID)

    if (!user) {
      return res.status(httpStatus.UNAUTHORIZED).json(response)
    }

    req.userID = userID
    req.user = user
    next()
  } catch (error) {
    res.status(httpStatus.UNAUTHORIZED).json(response)
  }
}

module.exports = userAuth
