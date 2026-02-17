const jwt = require("jsonwebtoken");

const authJWT = async(req,res,next) => {
    try {
        const token = req.headers.authorization?.split(' ')[1];
        if(!token){
            return res.status(400).json({
                message:"Token are required"
            })
        }
        const decoded = jwt.verify(token,process.env.JWT_KEY)
        req.user = decoded
        next()
    } catch (error) {
        res.status(401).json({
            message:"Invalide or expire token"
        })
    }
}

module.exports = authJWT