import jwt from "jsonwebtoken"

const generateTempToken = (payload) => {
  return jwt.sign(
    payload,
    process.env.JWT_SECRET,
    { expiresIn: "2m" }
  )
}

export default generateTempToken
