const jwt = require("jsonwebtoken")
const httpStatus = require("http-status")
const Admin = require("../model/admin")
const Response = require("../model/Response")
const clearToken = require("../utils/clearToken")

const requireAuth = async (req, res, next) => {
  const token = req.headers.authorization;
  const response = new Response.Error(true, "Anda Bukan Admin")
  const secretKey = process.env.SECRET_KEY
  if (!token) {
    return res.status(httpStatus.UNAUTHORIZED).json(response)
  }
  try {
    const myToken = clearToken(token)
    const decodeToken = jwt.verify(myToken, secretKey)
    const adminID = decodeToken.id
    const admin = await Admin.findById(adminID)

    if (!admin) {
      return res.status(httpStatus.UNAUTHORIZED).json(response)
    }

    req.adminID = adminID
    req.admin = admin
    next()
  } catch (error) {
    res.status(httpStatus.UNAUTHORIZED).json(response)
  }
}

module.exports = requireAuth
