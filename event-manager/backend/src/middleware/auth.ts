import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

interface JwtPayload {
 id:string; role:string; name:string; email:string;
}

declare global {
 namespace Express {
     interface Request {
         user?: JwtPayload;
     }
 }
}

export const authMiddleware = (req : Request,res : Response,next : NextFunction) => {
 const token = req.headers.authorization?.split(" ")[1];
 if (!token) return res.status(401).json({message:"No token"});
 try {
     const decoded = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload;
     req.user = decoded;
     next();
 } catch (e) {
     res.status(401).json({message:"Invalid token"});
 }
};