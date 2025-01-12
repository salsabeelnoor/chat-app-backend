import jwt from 'jsonwebtoken';
import User from '../models/user.model.js';

export const protectRoute = async (req, res, next) => {
    try {
        const token = req.cookies?.jwt;

        if(!token) {
            return res.status(401).json({message: "Unauthorized - No token Provided"});
        }

        //verify the token with JWT_SECRET
        const decode = jwt.verify(token, process.env.JWT_SECRET);

        if(!decode) {
            return res.status(401).json({message: "Unauthorized - Invalid token"});
        }

        //after being verified, we can access the user from database and get everything except the password
        const user = await User.findById(decode.userId).select("-password");

        if(!user) {
            return res.status(404).json({message: "User not found"});
        }

        req.user = user;

        next()

    } catch (error) {
        console.log("Error in protectRoute: ", error.message);
        res.status(500).json({message: "Internal server error"});
    }
}