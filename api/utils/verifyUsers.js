import { errorHandler } from "./error.js";
import jwt  from "jsonwebtoken";

export const verifyToken = (req,res,next)=>{
    const token = req.cookies.access_token;

    if(!token) return next(errorHandler(401, 'Unauthorized'));

    jwt.verify(token, process.env.JWT_Secret, (err, user)=>{
        if(err) return next(errorHandler(401, 'Not your id'));

        console.log(user);
        req.user = user;
        next();
    });

}